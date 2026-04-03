import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartPulse,
  Mail,
  Pill,
  Ruler,
  Save,
  Stethoscope,
  Video,
  Weight,
  X,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";

const patientSummary = {
  name: "Marie-Louise Lefebvre",
  age: "45 ans",
  bloodType: "Groupe O+",
  lastVisit: "12 mars 2024",
  tension: "12/8",
  weight: "64 kg",
  height: "168 cm",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAPV4nM6Tu7oWwYEsZKzh4EAmbye_ZJvUWvko_6DRbAJK9jnkQbKLPukWiNhdFuD7bhgUI_BZTVEukTRgVC3ehzUpbdARMnkmdt9oqPaV-Zg_OXn1U0Ih2lpvyEIDxw85-jvnxQuUE_BbltTcABGIm0bC3LLi1QHYedxCgWvGrbcIqNFYydmSfc8sfmuVMxXf2lc2O4VfPwQ-UXC0UYq_lRmB8FSQj18lLzFvEfVigvVteuET8udVwR0S8D3mUKSHm7E9zvwHJj7ORI",
};

const recentHistory = [
  {
    date: "15 Jan 2024",
    title: "Infection respiratoire",
    description: "Traitement par antibiotiques complete.",
  },
  {
    date: "02 Nov 2023",
    title: "Bilan sanguin annuel",
    description: "Resultats normaux, cholesterol a surveiller.",
  },
];

const quickActions = [
  { label: "Ordonnance", icon: Pill },
  { label: "Envoyer", icon: Mail },
  { label: "Analyses", icon: FlaskConical },
  { label: "Teleconsult.", icon: Video },
];

export function ConsultationReportNew() {
  const { rdvId } = useParams();
  const navigate = useNavigate();

  // TODO: fetch from API - GET /api/consultation/{rdvId}
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
    prescription: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /api/consultation to create report
    console.log("Rapport cree:", formData);
    navigate("/medecin/dashboard");
  };

  const updateField = (field) => (e) => {
    setFormData((current) => ({ ...current, [field]: e.target.value }));
  };

  return (
    <Navbar userRole="medecin" pageTitle="Nouveau Rapport de Consultation">
      <div className="min-h-full bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
                <span>Consultations</span>
                <ArrowRight className="h-4 w-4" />
                <span className="text-blue-600">Nouvelle fiche</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Nouvelle consultation
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Redigez le compte-rendu, le traitement et les recommandations
                pour cette visite.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-500">
                <Bell className="h-5 w-5" />
              </div>
              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Rendez-vous
                </p>
                <p className="text-sm font-bold text-blue-900">
                  {rdvId ? `#${rdvId}` : "#REF-8829-2024"}
                </p>
              </div>
            </div>
          </header>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={patientSummary.avatar}
                  alt={patientSummary.name}
                  className="h-24 w-24 rounded-3xl object-cover ring-4 ring-slate-100"
                />

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {patientSummary.name}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                      {patientSummary.age}
                    </span>
                    <span className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4 text-blue-600" />
                      {patientSummary.bloodType}
                    </span>
                    <span className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-blue-600" />
                      Derniere visite: {patientSummary.lastVisit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Tension
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {patientSummary.tension}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Poids
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Weight className="h-4 w-4 text-blue-600" />
                    {patientSummary.weight}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Taille
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Ruler className="h-4 w-4 text-blue-600" />
                    {patientSummary.height}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8"
            >
              <div className="space-y-2">
                <label
                  htmlFor="diagnosis"
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500"
                >
                  Diagnostic
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-blue-500 focus-within:bg-white">
                  <div className="mb-3 flex items-center gap-2 text-blue-600">
                    <Stethoscope className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Evaluation clinique
                    </span>
                  </div>
                  <textarea
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={updateField("diagnosis")}
                    rows={5}
                    placeholder="Entrez le diagnostic clinique..."
                    className="min-h-[120px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="treatment"
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500"
                >
                  Traitement
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-blue-500 focus-within:bg-white">
                  <div className="mb-3 flex items-center gap-2 text-blue-600">
                    <Pill className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Traitement recommande
                    </span>
                  </div>
                  <textarea
                    id="treatment"
                    value={formData.treatment}
                    onChange={updateField("treatment")}
                    rows={5}
                    placeholder="Detaillez le traitement et les medicaments..."
                    className="min-h-[120px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="prescription"
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500"
                >
                  Ordonnance
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-blue-500 focus-within:bg-white">
                  <div className="mb-3 flex items-center gap-2 text-blue-600">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Prescription medicale
                    </span>
                  </div>
                  <textarea
                    id="prescription"
                    value={formData.prescription}
                    onChange={updateField("prescription")}
                    rows={4}
                    placeholder="Precisez l'ordonnance medicale..."
                    className="min-h-[110px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500"
                >
                  Notes additionnelles
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-blue-500 focus-within:bg-white">
                  <div className="mb-3 flex items-center gap-2 text-blue-600">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Observations particulieres
                    </span>
                  </div>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={updateField("notes")}
                    rows={4}
                    placeholder="Ajoutez des observations utiles..."
                    className="min-h-[100px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01] hover:shadow-xl"
                >
                  <Save className="h-5 w-5" />
                  Enregistrer la consultation
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/medecin/dashboard")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                  Annuler
                </button>
              </div>
            </form>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    Historique recent
                  </h3>
                  <ClipboardList className="h-5 w-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {recentHistory.map((item) => (
                    <div
                      key={item.date}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                        {item.date}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Voir tout le dossier
                </button>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="mb-5 text-lg font-bold text-slate-900">
                  Outils rapides
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-slate-600 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

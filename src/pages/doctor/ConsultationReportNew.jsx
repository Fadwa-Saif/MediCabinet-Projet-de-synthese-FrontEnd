import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import api from "../../services/api";

const quickActions = [
  { label: "Ordonnance", icon: Pill },
  { label: "Envoyer", icon: Mail },
  { label: "Analyses", icon: FlaskConical },
  { label: "Teleconsult.", icon: Video },
];

const calculateAge = (birthDate) => {
  if (!birthDate) return "—";
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return `${age} ans`;
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (fullName) => {
  if (!fullName) return "PT";
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export function ConsultationReportNew() {
  const { rdvId, patientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPatientId = searchParams.get("patientId");
  const source = searchParams.get("source");

  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
    prescription: "",
  });

  const [patientData, setPatientData] = useState(null);
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // After the existing useState declarations
  const [analysesList, setAnalysesList] = useState([]); // analyses to prescribe

  // Add after the existing analysesList state
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [consultationId, setConsultationId] = useState(null); // track saved consultation

  const addAnalyse = () =>
    setAnalysesList((prev) => [
      ...prev,
      { type_analyse: "", commentaire_medecin: "" },
    ]);

  const removeAnalyse = (idx) =>
    setAnalysesList((prev) => prev.filter((_, i) => i !== idx));

  const updateAnalyse = (idx, field, value) =>
    setAnalysesList((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a)),
    );

  useEffect(() => {
    const fetchConsultationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // ── Case 1: Fetch from rendez-vous (rdvId provided) ──
        if (rdvId && rdvId !== "new") {
          const rdvRes = await api.get(`/rendezvous/${rdvId}`);
          const rdv = rdvRes.data.data || rdvRes.data;

          if (rdv && rdv.patient) {
            const patient = rdv.patient;
            setPatientData({
              id: patient.id,
              name: `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim(),
              age: calculateAge(patient.date_naissance),
              bloodType: patient.groupe_sanguin || "—",
              lastVisit: rdv.date_heure ? formatDateShort(rdv.date_heure) : "—",
              tension: "—",
              weight: patient.poids_kg ? `${patient.poids_kg} kg` : "—",
              height: patient.taille_cm ? `${patient.taille_cm} cm` : "—",
              avatar: patient.user?.photo_profil || null,
            });

            try {
              const consultRes = await api.get("/consultations");
              const all = consultRes.data.data || consultRes.data || [];
              const existing = all.find(
                (c) => String(c.rdv_id) === String(rdvId),
              );
              if (existing) {
                setConsultationId(existing.id);
                const analysesRes = await api.get(
                  `/consultations/${existing.id}/analyses`,
                );
                setSavedAnalyses(
                  analysesRes.data.data || analysesRes.data || [],
                );
              }
            } catch (histErr) {
              if (histErr.response?.status === 401) {
                console.error("Authentication error - token may be expired:", histErr);
                setError("Vous n'êtes pas authentifié. Veuillez vous reconnecter.");
              } else {
                console.warn("Failed to fetch patient history:", histErr);
              }
              setRecentHistory([]);
            }
          }
        }
        // ── Case 2: Fetch from patientId (direct patient page) ──
        else if (patientId) {
          try {
            const patientRes = await api.get(`/patients/${patientId}`);
            const patient = patientRes.data.data || patientRes.data;

            if (patient) {
              setPatientData({
                id: patient.id,
                name: `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim(),
                age: calculateAge(patient.date_naissance),
                bloodType: patient.groupe_sanguin || "—",
                lastVisit: "—",
                tension: "—",
                weight: "—",
                height: "—",
                avatar: "https://via.placeholder.com/150",
              });

              // Fetch existing consultations for this patient
              try {
                const consultRes = await api.get("/consultations");
                const all = consultRes.data.data || consultRes.data || [];
                const existing = all.filter(
                  (c) => String(c.patient_id) === String(patientId),
                );
                if (existing.length > 0) {
                  setSavedAnalyses(existing[0].analyses || []);
                }
              } catch (histErr) {
                if (histErr.response?.status === 401) {
                  console.error("Authentication error - token may be expired:", histErr);
                } else {
                  console.warn("Failed to fetch consultations:", histErr);
                }
              }
            } else {
              setError("Patient introuvable.");
            }
          } catch (err) {
            if (err.response?.status === 401) {
              console.error("Authentication error - token may be expired:", err);
              setError("Vous n'êtes pas authentifié. Veuillez vous reconnecter.");
            } else {
              console.error("Patient fetch error:", err);
              setError("Erreur lors du chargement du patient.");
            }
          }
        }
      } catch (err) {
        console.error("Consultation data fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Erreur lors du chargement des données.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConsultationData();
  }, [rdvId, patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.diagnosis.trim()) {
      setError("Veuillez indiquer un diagnostic.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      // ── 1. Save consultation ──────────────────────────────
      const res = await api.post("/consultations", {
        rdv_id: rdvId === "new" ? null : rdvId,
        patient_id: patientData?.id,
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        diagnostic: formData.diagnosis,
        symptomes: formData.treatment,
        notes_medecin: formData.notes,
      });

      const consultationId = res.data?.data?.id ?? res.data?.id;

      if (!consultationId) {
        throw new Error("Impossible de créer la consultation - identifiant manquant.");
      }

      // ── 2. Create ordonnance if prescription is filled ────
      if (formData.prescription.trim()) {
        await api.post("/ordonnances", {
          consultation_id: consultationId,
          date: new Date().toISOString().split("T")[0],
          instructions: formData.prescription,
        });
      }

      // ── 3. Create prescribed analyses ────────────────────
      const analysePromises = analysesList
        .filter((a) => a.type_analyse)
        .map((a) =>
          api.post("/analyses/prescrire", {
            consultation_id: consultationId,
            type_analyse: a.type_analyse,
            notes_medecin: a.commentaire_medecin,
          }),
        );
      await Promise.all(analysePromises);

      navigate("/medecin/dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      console.error("Response data:", err.response?.data);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erreur lors de la création de la consultation.",
      );
    } finally {
      setSubmitting(false);
    }
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
            {loading ? (
              <div className="animate-pulse">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="h-24 w-24 rounded-3xl bg-slate-200" />
                    <div className="flex-1">
                      <div className="mb-3 h-6 w-1/3 bg-slate-200 rounded" />
                      <div className="mb-2 h-4 w-1/2 bg-slate-200 rounded" />
                      <div className="h-4 w-2/3 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            ) : patientData ? (
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {patientData.avatar ? (
                    <img
                      src={patientData.avatar}
                      alt={patientData.name}
                      className="h-24 w-24 rounded-3xl object-cover ring-4 ring-slate-100"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100 text-2xl font-extrabold text-blue-700 ring-4 ring-slate-100">
                      {getInitials(patientData.name)}
                    </div>
                  )}

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {patientData.name}
                    </h2>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
                        {patientData.age}
                      </span>
                      <span className="flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-blue-600" />
                        {patientData.bloodType}
                      </span>
                      <span className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-blue-600" />
                        Derniere visite: {patientData.lastVisit}
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
                      {patientData.tension}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      Poids
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                      <Weight className="h-4 w-4 text-blue-600" />
                      {patientData.weight}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      Taille
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                      <Ruler className="h-4 w-4 text-blue-600" />
                      {patientData.height}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8"
            >
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
                  {error}
                </div>
              )}
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
                    placeholder="Instructions de l'ordonnance (posologie générale, consignes...)
Ex: Prendre le médicament après les repas, éviter l'alcool..."
                    className="min-h-[110px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-slate-700">
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
              {/* ── Analyses ─────────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    <FlaskConical className="h-4 w-4" />
                    Analyses à prescrire
                  </label>
                  <button
                    type="button"
                    onClick={addAnalyse}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    + Ajouter une analyse
                  </button>
                </div>

                {savedAnalyses.length > 0 && (
                  <div className="mb-2 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Prescrites ({savedAnalyses.length})
                    </p>
                    {savedAnalyses.map((a) => {
                      const hasFichier = !!a.fichier;
                      const typeLabel = [
                        { value: "blood", label: "Analyse Sanguine", icon: "🩸" },
                        { value: "urine", label: "Analyse d'Urine", icon: "💧" },
                        { value: "imaging", label: "Imagerie Médicale", icon: "🩻" },
                        { value: "biopsy", label: "Biopsie", icon: "🔬" },
                        { value: "genetic", label: "Test Génétique", icon: "🧬" },
                        { value: "other", label: "Autre", icon: "📋" },
                      ].find((t) => t.value === a.type_analyse);

                      return (
                        <div
                          key={a.id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{typeLabel?.icon || "📋"}</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {typeLabel?.label || a.type_analyse || `Analyse #${a.id}`}
                              </p>
                              {a.commentaire_medecin && (
                                <p className="text-xs text-slate-500">{a.commentaire_medecin}</p>
                              )}
                            </div>
                          </div>
                          {hasFichier ? (
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              ✓ Résultat reçu
                            </span>
                          ) : (
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                              ⏳ En attente
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {analysesList.length === 0 && savedAnalyses.length === 0 && (
                  <p className="text-sm italic text-slate-400">
                    Aucune analyse prescrite pour cette consultation.
                  </p>
                )}

                {analysesList.map((a, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        Nouvelle analyse #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAnalyse(idx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <select
                      value={a.type_analyse}
                      onChange={(e) => updateAnalyse(idx, "type_analyse", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">-- Type d'analyse --</option>
                      <option value="blood">Analyse Sanguine</option>
                      <option value="urine">Analyse d'Urine</option>
                      <option value="imaging">Imagerie Médicale</option>
                      <option value="biopsy">Biopsie</option>
                      <option value="genetic">Test Génétique</option>
                      <option value="other">Autre</option>
                    </select>

                    <input
                      type="text"
                      value={a.commentaire_medecin}
                      onChange={(e) => updateAnalyse(idx, "commentaire_medecin", e.target.value)}
                      placeholder="Note pour le patient (optionnel)"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-5 w-5" />
                  {submitting
                    ? "Enregistrement..."
                    : "Enregistrer la consultation"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/medecin/dashboard")}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

                {loading ? (
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 rounded-2xl bg-slate-200" />
                    ))}
                  </div>
                ) : recentHistory.length === 0 ? (
                  <p className="text-sm text-slate-600">
                    Aucun historique disponible.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentHistory.map((item, idx) => (
                      <div
                        key={idx}
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
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (patientData?.id) {
                      navigate(`/medecin/medical-record/${patientData.id}`);
                    }
                  }}
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

import { useState, useEffect, useRef, useCallback } from "react";
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
  Search,
  Stethoscope,
  Video,
  Weight,
  X,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const quickActions = [
  { label: "Envoyer", icon: Mail },
  { label: "Analyses", icon: FlaskConical },
  { label: "Teleconsult.", icon: Video },
  { label: "Dossier", icon: ClipboardList },
];

const ANALYSE_TYPES = [
  { value: "blood", label: "Analyse Sanguine", icon: "🩸" },
  { value: "urine", label: "Analyse d'Urine", icon: "💧" },
  { value: "imaging", label: "Imagerie Médicale", icon: "🩻" },
  { value: "biopsy", label: "Biopsie", icon: "🔬" },
  { value: "genetic", label: "Test Génétique", icon: "🧬" },
  { value: "other", label: "Autre", icon: "📋" },
];

const POSOLOGIE_SUGGESTIONS = [
  "1 comprimé matin et soir",
  "1 comprimé 3x/jour après les repas",
  "2 comprimés le soir au coucher",
  "1 mesure (5ml) 3x/jour",
  "1 injection IM par jour",
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const calculateAge = (birthDate) => {
  if (!birthDate) return "—";
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
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
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// ─────────────────────────────────────────────────────────────────────────────
// MedicamentSearch — inline searchable dropdown
// ─────────────────────────────────────────────────────────────────────────────

function MedicamentSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const search = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    setSearching(true);
    try {
      const res = await api.get("/medicaments", { params: { search: q } });
      const data = res.data.data || res.data || [];
      setResults(data);
      setOpen(true);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 300);
  };

  const handleSelect = (med) => {
    onSelect(med);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const formeLabel = {
    comprime: "Cp",
    sirop: "Sirop",
    injection: "Inj.",
    autre: "Autre",
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-blue-500">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher un médicament..."
          className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        {searching && (
          <span className="text-xs text-slate-400 animate-pulse">...</span>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          {results.map((med) => (
            <li key={med.id}>
              <button
                type="button"
                onClick={() => handleSelect(med)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-blue-50"
              >
                <div className="mt-0.5 rounded-lg bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                  {formeLabel[med.forme] || "—"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {med.nom}
                  </p>
                  {med.nom_generique && (
                    <p className="text-xs text-slate-500">
                      {med.nom_generique}
                    </p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && !searching && results.length === 0 && query.trim() && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
          <p className="text-sm text-slate-500">
            Aucun médicament trouvé pour « {query} ».
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PrescriptionItem — one medication row
// ─────────────────────────────────────────────────────────────────────────────

function PrescriptionItem({ item, idx, onChange, onRemove }) {
  const formeLabel = {
    comprime: "Comprimé",
    sirop: "Sirop",
    injection: "Injection",
    autre: "Autre",
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Pill className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              {item.medicament_nom}
            </p>
            {item.forme && (
              <span className="text-xs font-medium text-slate-500">
                {formeLabel[item.forme] || item.forme}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Posologie */}
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Posologie <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={item.posologie}
          onChange={(e) => onChange(idx, "posologie", e.target.value)}
          placeholder="Ex: 1 comprimé matin et soir"
          list={`posologie-suggestions-${idx}`}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <datalist id={`posologie-suggestions-${idx}`}>
          {POSOLOGIE_SUGGESTIONS.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>

      {/* Row: quantite + duree */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Quantité
          </label>
          <input
            type="number"
            min="1"
            value={item.quantite}
            onChange={(e) =>
              onChange(idx, "quantite", parseInt(e.target.value, 10) || 1)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Durée
          </label>
          <input
            type="text"
            value={item.duree_traitement}
            onChange={(e) => onChange(idx, "duree_traitement", e.target.value)}
            placeholder="Ex: 7 jours"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Observation */}
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Observation
        </label>
        <input
          type="text"
          value={item.observation}
          onChange={(e) => onChange(idx, "observation", e.target.value)}
          placeholder="Ex: prendre après les repas, éviter le soleil..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function ConsultationReportNew() {
  const { rdvId, patientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPatientId = searchParams.get("patientId");

  // ── Core form fields ──────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    diagnostic: "",
    traitement: "", // → ordonnances.instructions
    notes: "",
  });

  // ── Prescription list (médicaments) ──────────────────────────────────────
  // Each item: { medicament_id, medicament_nom, forme, posologie, observation, quantite, duree_traitement }
  const [prescriptions, setPrescriptions] = useState([]);

  // ── Analyses ──────────────────────────────────────────────────────────────
  const [analysesList, setAnalysesList] = useState([]);
  const [savedAnalyses, setSavedAnalyses] = useState([]);

  // ── Patient & UI state ────────────────────────────────────────────────────
  const [patientData, setPatientData] = useState(null);
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Prescription helpers ──────────────────────────────────────────────────
  const addPrescription = (med) => {
    // Prevent duplicates
    if (prescriptions.some((p) => p.medicament_id === med.id)) return;
    setPrescriptions((prev) => [
      ...prev,
      {
        medicament_id: med.id,
        medicament_nom: med.nom,
        forme: med.forme,
        posologie: "",
        observation: "",
        quantite: 1,
        duree_traitement: "",
      },
    ]);
  };

  const removePrescription = (idx) =>
    setPrescriptions((prev) => prev.filter((_, i) => i !== idx));

  const updatePrescription = (idx, field, value) =>
    setPrescriptions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    );

  // ── Analyses helpers ──────────────────────────────────────────────────────
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

  // ── Data fetching ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const resolvePatient = (patient, lastVisit = "—") => ({
          id: patient.id,
          name: `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim(),
          age: calculateAge(patient.date_naissance),
          bloodType: patient.groupe_sanguin || "—",
          lastVisit,
          tension: "—",
          weight: patient.poids_kg ? `${patient.poids_kg} kg` : "—",
          height: patient.taille_cm ? `${patient.taille_cm} cm` : "—",
          avatar: patient.user?.photo_profil || null,
        });

        const fetchSavedAnalyses = async (consultId) => {
          try {
            const r = await api.get(`/consultations/${consultId}/analyses`);
            setSavedAnalyses(r.data.data || r.data || []);
          } catch {
            /* non-blocking */
          }
        };

        // Case 1: from rdvId
        if (rdvId && rdvId !== "new") {
          const rdvRes = await api.get(`/rendezvous/${rdvId}`);
          const rdv = rdvRes.data.data || rdvRes.data;
          if (rdv?.patient) {
            setPatientData(
              resolvePatient(rdv.patient, formatDateShort(rdv.date_heure)),
            );
            try {
              const cRes = await api.get("/consultations");
              const all = cRes.data.data || cRes.data || [];
              const existing = all.find(
                (c) => String(c.rdv_id) === String(rdvId),
              );
              if (existing) await fetchSavedAnalyses(existing.id);
            } catch {
              /* non-blocking */
            }
          }
        }
        // Case 2 / 3: from patientId or selectedPatientId
        else {
          const pid = patientId || selectedPatientId;
          if (!pid) return;
          const pRes = await api.get(`/patients/${pid}`);
          const patient = pRes.data.data || pRes.data;
          if (!patient) {
            setError("Patient introuvable.");
            return;
          }
          setPatientData(resolvePatient(patient));
          try {
            const cRes = await api.get("/consultations");
            const all = cRes.data.data || cRes.data || [];
            const existing = all.find(
              (c) => String(c.patient_id) === String(pid),
            );
            if (existing) await fetchSavedAnalyses(existing.id);
          } catch {
            /* non-blocking */
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Erreur lors du chargement.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rdvId, patientId, selectedPatientId]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.diagnostic.trim()) {
      setError("Veuillez indiquer un diagnostic.");
      return;
    }
    if (!patientData?.id) {
      setError("Données patient manquantes. Actualisez la page.");
      return;
    }
    if (prescriptions.some((p) => !p.posologie.trim())) {
      setError(
        "Veuillez renseigner la posologie pour chaque médicament prescrit.",
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Créer la consultation
      const consultRes = await api.post("/consultations", {
        rdv_id: rdvId === "new" ? null : parseInt(rdvId, 10) || null,
        patient_id: parseInt(patientData.id, 10),
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        diagnostic: formData.diagnostic,
        notes_medecin: formData.notes,
      });
      const consultationId = consultRes.data?.data?.id ?? consultRes.data?.id;
      if (!consultationId)
        throw new Error("Identifiant consultation manquant.");

      // 2. Créer l'ordonnance si traitement renseigné ou médicaments prescrits
      if (formData.traitement.trim() || prescriptions.length > 0) {
        const ordRes = await api.post("/ordonnances", {
          consultation_id: consultationId,
          date: new Date().toISOString().split("T")[0],
          instructions: formData.traitement, // traitement → instructions
        });
        const ordonnanceId = ordRes.data?.data?.id ?? ordRes.data?.id;

        // 3. Créer les lignes de prescription (pivot ordonnance ↔ médicament)
        if (ordonnanceId && prescriptions.length > 0) {
          await Promise.all(
            prescriptions.map((p) =>
              api.post("/prescriptions", {
                ordonnance_id: ordonnanceId,
                medicament_id: p.medicament_id,
                posologie: p.posologie,
                observation: p.observation || null,
                quantite: p.quantite,
                duree_traitement: p.duree_traitement || null,
              }),
            ),
          );
        }
      }

      // 4. Prescrire les analyses
      const validAnalyses = analysesList.filter((a) => a.type_analyse);
      await Promise.all(
        validAnalyses.map((a) =>
          api.post("/analyses/prescrire", {
            consultation_id: consultationId,
            type_analyse: a.type_analyse,
            commentaire_medecin: a.commentaire_medecin,
          }),
        ),
      );

      navigate("/medecin/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de la création.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field) => (e) =>
    setFormData((cur) => ({ ...cur, [field]: e.target.value }));

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Navbar userRole="medecin" pageTitle="Nouveau Rapport de Consultation">
      <div className="min-h-full bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* ── Header ─────────────────────────────────────────────────── */}
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
                Rédigez le compte-rendu, l'ordonnance et les analyses pour cette
                visite.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Rendez-vous
                </p>
                <p className="text-sm font-bold text-blue-900">
                  {rdvId ? `#${rdvId}` : "#REF-NEW"}
                </p>
              </div>
            </div>
          </header>

          {/* ── Patient card ───────────────────────────────────────────── */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
            {loading ? (
              <div className="animate-pulse flex gap-6">
                <div className="h-24 w-24 rounded-3xl bg-slate-200" />
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ) : error && !patientData ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
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
                        Dernière visite : {patientData.lastVisit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Tension", value: patientData.tension },
                    {
                      label: "Poids",
                      value: patientData.weight,
                      icon: <Weight className="h-4 w-4 text-blue-600" />,
                    },
                    {
                      label: "Taille",
                      value: patientData.height,
                      icon: <Ruler className="h-4 w-4 text-blue-600" />,
                    },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        {label}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                        {icon}
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          {/* ── Main grid ──────────────────────────────────────────────── */}
          <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            {/* ── Form ─────────────────────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8"
            >
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
              )}

              {/* Diagnostic */}
              <SectionCard
                icon={<Stethoscope className="h-5 w-5" />}
                label="Diagnostic"
                sublabel="Évaluation clinique"
              >
                <textarea
                  id="diagnostic"
                  value={formData.diagnostic}
                  onChange={updateField("diagnostic")}
                  rows={5}
                  placeholder="Entrez le diagnostic clinique..."
                  className="min-h-[120px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                />
              </SectionCard>

              {/* Traitement → ordonnances.instructions */}
              <SectionCard
                icon={<Pill className="h-5 w-5" />}
                label="Traitement"
                sublabel="Instructions générales — seront enregistrées dans l'ordonnance"
                badge="→ ordonnance.instructions"
              >
                <textarea
                  id="traitement"
                  value={formData.traitement}
                  onChange={updateField("traitement")}
                  rows={4}
                  placeholder="Ex: Repos complet 3 jours, éviter les efforts. Prendre les médicaments après les repas..."
                  className="min-h-[110px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                />
              </SectionCard>

              {/* Ordonnance — médicaments */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ordonnance — Médicaments
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Recherchez et ajoutez les médicaments à prescrire
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                    {prescriptions.length} prescrit
                    {prescriptions.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Search */}
                <MedicamentSearch onSelect={addPrescription} />

                {/* Prescription list */}
                {prescriptions.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-sm italic text-slate-400">
                    Aucun médicament ajouté. Utilisez la recherche ci-dessus.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {prescriptions.map((item, idx) => (
                      <PrescriptionItem
                        key={`${item.medicament_id}-${idx}`}
                        item={item}
                        idx={idx}
                        onChange={updatePrescription}
                        onRemove={removePrescription}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <SectionCard
                icon={<ClipboardList className="h-5 w-5" />}
                label="Notes additionnelles"
                sublabel="Observations particulières"
              >
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={updateField("notes")}
                  rows={4}
                  placeholder="Ajoutez des observations utiles..."
                  className="min-h-[100px] w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                />
              </SectionCard>

              {/* Analyses */}
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
                    + Ajouter
                  </button>
                </div>

                {savedAnalyses.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Déjà prescrites ({savedAnalyses.length})
                    </p>
                    {savedAnalyses.map((a) => {
                      const typeInfo = ANALYSE_TYPES.find(
                        (t) => t.value === a.type_analyse,
                      );
                      return (
                        <div
                          key={a.id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {typeInfo?.icon || "📋"}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {typeInfo?.label ||
                                  a.type_analyse ||
                                  `Analyse #${a.id}`}
                              </p>
                              {a.commentaire_medecin && (
                                <p className="text-xs text-slate-500">
                                  {a.commentaire_medecin}
                                </p>
                              )}
                            </div>
                          </div>
                          {a.fichier ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              ✓ Résultat reçu
                            </span>
                          ) : (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
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
                      onChange={(e) =>
                        updateAnalyse(idx, "type_analyse", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">-- Type d'analyse --</option>
                      {ANALYSE_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.icon} {t.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={a.commentaire_medecin}
                      onChange={(e) =>
                        updateAnalyse(
                          idx,
                          "commentaire_medecin",
                          e.target.value,
                        )
                      }
                      placeholder="Note pour le patient (optionnel)"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                  Annuler
                </button>
              </div>
            </form>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="space-y-6">
              {/* Historique */}
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    Historique récent
                  </h3>
                  <ClipboardList className="h-5 w-5 text-slate-400" />
                </div>
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 rounded-2xl bg-slate-200" />
                    ))}
                  </div>
                ) : recentHistory.length === 0 ? (
                  <p className="text-sm text-slate-500">
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
                  onClick={() =>
                    patientData?.id &&
                    navigate(`/medecin/medical-record/${patientData.id}`)
                  }
                  className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Voir tout le dossier
                </button>
              </div>

              {/* Outils rapides */}
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

              {/* Résumé ordonnance (live) */}
              {(formData.traitement.trim() || prescriptions.length > 0) && (
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-700">
                    <FileText className="h-4 w-4" />
                    Aperçu ordonnance
                  </h3>
                  {formData.traitement.trim() && (
                    <p className="mb-3 text-sm text-slate-700 italic">
                      "{formData.traitement.slice(0, 120)}
                      {formData.traitement.length > 120 ? "…" : ""}"
                    </p>
                  )}
                  {prescriptions.length > 0 && (
                    <ul className="space-y-1">
                      {prescriptions.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <Pill className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          <span className="font-medium">
                            {p.medicament_nom}
                          </span>
                          {p.posologie && (
                            <span className="text-slate-500">
                              — {p.posologie}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionCard — reusable field wrapper
// ─────────────────────────────────────────────────────────────────────────────

function SectionCard({ icon, label, sublabel, badge, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </label>
        {badge && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
            {badge}
          </span>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 focus-within:border-blue-500 focus-within:bg-white transition-colors">
        <div className="mb-3 flex items-center gap-2 text-blue-600">
          {icon}
          <span className="text-sm font-semibold">{sublabel}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

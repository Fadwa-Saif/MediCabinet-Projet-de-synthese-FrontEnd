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

const ANALYSIS_CATEGORIES = [
  {
    id: "hematologie",
    label: "Hématologie",
    icon: "🩸",
    tests: [
      "Hémoglobine",
      "Globules Rouges - Hct",
      "Globules Blancs",
      "Formule leucocytaire",
      "Plaquettes",
      "Réticulocytes",
      "Morphologie des GR",
      "Parasites sanguins",
      "Électrophorèse Hb",
      "Sphérocytose",
    ],
  },
  {
    id: "coagulation",
    label: "Coagulation",
    icon: "🩸",
    tests: [
      "Quick-INR",
      "Tps de céphaline activée",
      "Fibrinogène (ou VS)",
      "Temps de thrombine",
      "D-Dimères",
      "PFA (+ 2e tube)",
      "Facteur VIII",
      "Facteur IX",
      "Ag vWF",
      "Activité vWF",
    ],
  },
  {
    id: "thrombophilie",
    label: "Thrombophilie",
    icon: "⚠️",
    tests: [
      "Protéine C",
      "Protéine S",
      "Antithrombine",
      "APC Résistance",
      "Facteur V Leiden",
      "Mut. Prothrombine",
      "Anticoagulant lupique",
      "AC anti-cardiolipine",
      "AC anti-β2 GP1",
      "Anti PF4",
    ],
  },
  {
    id: "immuno-hemato",
    label: "Immuno-Hématologie",
    icon: "🧬",
    tests: [
      "Groupe ABOD",
      "Sous-groupes RH",
      "Carte de groupe",
      "Phénotypage érythrocytaire",
      "Cytométrie de flux",
      "Typage T-B-NK",
      "Typage CD4-CD8",
      "B27",
      "Coombs direct",
      "Agglutinines froides",
    ],
  },
  {
    id: "biochimie",
    label: "Biochimie",
    icon: "🧪",
    tests: [
      "TGO ou TGP",
      "LDH",
      "GGT",
      "Ph. alcalines",
      "Bilirubines Totale + Directe",
      "Amylase ou Lipase",
      "NH3 veineux",
      "NH3 artériel",
      "CRP ou VS",
      "Protéines",
      "Albumine",
      "Cholestérol Total",
      "Triglycérides",
      "HDL (+ LDL calculé)",
      "Lp(a)",
      "CPK",
      "Troponine I",
      "Myoglobine",
      "NT-proBNP",
      "CRP ultrasensible",
    ],
  },
  {
    id: "reins-ions",
    label: "Reins & Électrolytes",
    icon: "💧",
    tests: [
      "Urée",
      "Créatinine (+ GFR)",
      "Acide urique",
      "Na",
      "K",
      "Cl",
      "Ca",
      "Ca corrigé",
      "P",
      "Mg",
      "Osmolalité",
      "HCO3-",
    ],
  },
  {
    id: "chimie-urinaire",
    label: "Chimie Urinaire",
    icon: "🧪",
    tests: [
      "Sédiment + culture",
      "Glucose",
      "Protéines",
      "Urée",
      "Créatinine",
      "Acide urique",
      "Na",
      "K",
      "Cl",
      "Ca",
      "P",
      "Mg",
      "µalbumine",
      "α1 µglobuline",
      "β2 µglobuline",
      "Bence-Jones",
      "Citrate",
      "Oxalate",
    ],
  },
  {
    id: "serologiie-virale",
    label: "Sérologie - Virale",
    icon: "🦠",
    tests: [
      "Hépatite A IgM",
      "Hépatite B Ag surface",
      "Hépatite B Ac core",
      "Hépatite C",
      "Hépatite E IgG+IgM",
      "CMV IgG+ IgM",
      "EBV IgG+IgM",
      "Rubéole IgG",
      "H. simplex IgG/IgM",
      "Varicelle IgG/IgM",
      "Oreillons IgG/IgM",
      "Parvovirus B19",
      "Rougeole IgG/IgM",
      "HIV",
      "HTLV I/II",
      "Influenza A+B",
      "Covid 19",
    ],
  },
  {
    id: "serologie-bacterienne",
    label: "Sérologie - Bactérienne",
    icon: "🧬",
    tests: [
      "Syphilis",
      "ASLO",
      "Borrelia IgG+IgM",
      "Mycoplasme IgG+IgM",
      "Chl. Pneumoniae IgG+IgA",
      "Chl. Trachomatis IgG+IgA",
      "Rickettsies",
      "Brucella",
      "Bartonella IgG+IgM",
      "Bordetella",
      "Coxiella burnetii",
    ],
  },
  {
    id: "hormonologie",
    label: "Hormonologie",
    icon: "⚗️",
    tests: [
      "TSH",
      "T4 libre",
      "T3 libre",
      "AC anti-TPO",
      "AC anti-TG",
      "Thyroglobuline",
      "AC anti-TSI",
      "β-HCG",
      "Oestradiol",
      "Progestérone",
      "LH",
      "FSH",
      "Prolactine",
      "ACTH",
      "hGH (STH)",
      "IgF1",
      "Testostérone",
      "Cortisol",
      "Aldostérone",
    ],
  },
  {
    id: "allergie",
    label: "Allergie",
    icon: "🌾",
    tests: [
      "IgE total",
      "Tryptase",
      "DAO",
      "IgE spécifiques - Poussières",
      "IgE spécifiques - Chat",
      "IgE spécifiques - Chien",
      "IgE spécifiques - Acariens",
      "IgE spécifiques - Moisissures",
      "IgE spécifiques - Blé",
      "IgE spécifiques - Lait",
      "IgE spécifiques - Oeuf",
    ],
  },
  {
    id: "auto-immuns",
    label: "Sérologie Auto-Immune",
    icon: "🧬",
    tests: [
      "AAN + identification",
      "ENA",
      "AC anti-muq. gastrique",
      "AC anti-mitochondries",
      "AC anti-muscles lisses",
      "AC anti-LKM",
      "AC anti-LC1",
      "Panel myosite",
      "AC anti-CCP",
      "F. rhumatoïde",
      "ANCA + identification",
      "AC anti-MPO",
      "AC anti-PR3",
      "AC anti-GBM",
      "ASCA IgG+IgA",
      "AC anti-transglutaminase",
      "AC anti-gliadine",
    ],
  },
  {
    id: "marqueurs",
    label: "Marqueurs Tumoraux",
    icon: "🔬",
    tests: [
      "CEA",
      "CA19.9",
      "CA125",
      "CA15.3",
      "NSE",
      "PSA dépistage",
      "PSA suivi",
      "PSA libre",
      "Chromogranine A",
      "Calcitonine",
      "Thyroglobuline",
      "Angiotensine convertase",
    ],
  },
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

const createAnalysisGroupId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `grp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// CheckboxAnalysisForm — Categorized checkbox analysis selection
// ─────────────────────────────────────────────────────────────────────────────

function CheckboxAnalysisForm({ selectedTests, onChange }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleTestChange = (categoryId, test, checked) => {
    const key = `${categoryId}:${test}`;
    if (checked) {
      onChange([...selectedTests, key]);
    } else {
      onChange(selectedTests.filter((t) => t !== key));
    }
  };

  const isTestSelected = (categoryId, test) => {
    return selectedTests.includes(`${categoryId}:${test}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {ANALYSIS_CATEGORIES.map((category) => (
        <div
          key={category.id}
          className="rounded-2xl border border-slate-200 overflow-hidden"
        >
          {/* Category Header */}
          <button
            type="button"
            onClick={() => toggleCategory(category.id)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="font-semibold text-slate-700 text-sm">
                {category.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                {
                  category.tests.filter((t) => isTestSelected(category.id, t))
                    .length
                }
              </span>
              <span className="text-slate-400 text-sm">
                {expandedCategories[category.id] ? "−" : "+"}
              </span>
            </div>
          </button>

          {/* Tests Grid — 5 per line */}
          {expandedCategories[category.id] && (
            <div className="grid grid-cols-5 gap-2 p-3 bg-white border-t border-slate-200">
              {category.tests.map((test) => (
                <label
                  key={test}
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                  title={test}
                >
                  <input
                    type="checkbox"
                    checked={isTestSelected(category.id, test)}
                    onChange={(e) =>
                      handleTestChange(category.id, test, e.target.checked)
                    }
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-slate-700 line-clamp-2">
                    {test}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

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
  // selectedAnalyses: array of "categoryId:test" strings
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);
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
          // When creating a NEW consultation (not editing), don't fetch saved analyses
          // Only fetch saved analyses when editing an existing consultation (Case 1)
          setSavedAnalyses([]);
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

        // ═══════════════════════════════════════════════════════════════════
        // FIX #1: Validate ordonnanceId extraction to prevent silent failures
        // Problem: If API returns unexpected structure (e.g., { ordonnance: { id: X } }),
        // ordonnanceId becomes undefined and prescriptions are silently skipped
        // Solution: Explicitly validate ordonnanceId and throw error if missing
        // ═══════════════════════════════════════════════════════════════════
        if (!ordonnanceId) throw new Error("Identifiant ordonnance manquant.");

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

      // 4. Prescrire les analyses (one logical form = one shared group_id)
      if (selectedAnalyses.length > 0) {
        const analysisGroupId = createAnalysisGroupId();
        await Promise.all(
          selectedAnalyses.map((analysisKey, index) => {
            const [categoryId, testName] = analysisKey.split(":");
            return api.post("/analyses/prescrire", {
              consultation_id: consultationId,
              type_analyse: testName,
              category: categoryId,
              group_id: analysisGroupId,
              notify_patient: index === 0,
            });
          }),
        );
      }

      sessionStorage.setItem(
        "consultation_save_notice",
        JSON.stringify({
          consultationId,
          savedAt: new Date().toISOString(),
        }),
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
          <div>
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
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="h-5 w-5 text-slate-500" />
                  <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    Analyses à prescrire
                  </label>
                  <span className="ml-auto text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {selectedAnalyses.length} sélection
                    {selectedAnalyses.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {savedAnalyses.length > 0 && (
                  <div className="space-y-2 mb-4 p-4 rounded-xl border border-green-200 bg-green-50">
                    <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                      Déjà prescrites ({savedAnalyses.length})
                    </p>
                    {savedAnalyses.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-2 text-sm text-green-700"
                      >
                        <span>✓</span>
                        <span>{a.type_analyse || `Analyse #${a.id}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                <CheckboxAnalysisForm
                  selectedTests={selectedAnalyses}
                  onChange={setSelectedAnalyses}
                />
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

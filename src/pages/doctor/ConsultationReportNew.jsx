import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  FlaskConical,
  HeartPulse,
  Pill,
  Ruler,
  Save,
  Search,
  Stethoscope,
  Weight,
  X,
  ChevronDown,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

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

const MOTIF_SUGGESTIONS = [
  "Douleur",
  "Fièvre",
  "Toux",
  "Fatigue",
  "Suivi chronique",
  "Renouvellement ordonnance",
  "Bilan",
  "Autre",
];

const TYPE_CONSULTATION = [
  "Première consultation",
  "Suivi",
  "Urgence",
  "Téléconsultation",
  "Contrôle post-opératoire",
];

const TYPE_DOULEUR = [
  "Aiguë",
  "Chronique",
  "Brûlure",
  "Élancement",
  "Pression",
  "Crampe",
];

const SYMPTOMES_CHECKBOX = [
  "Fièvre",
  "Toux",
  "Dyspnée",
  "Nausées",
  "Vomissements",
  "Diarrhée",
  "Vertiges",
  "Céphalées",
  "Palpitations",
  "Œdèmes",
  "Autre",
];

const BIOLOGIE_CHECKBOX = [
  "NFS",
  "CRP",
  "Glycémie",
  "Bilan lipidique",
  "Bilan rénal",
  "Bilan hépatique",
  "HbA1c",
  "TSH",
  "Autre",
];

const IMAGERIE_CHECKBOX = [
  "Radiographie",
  "Échographie",
  "Scanner",
  "IRM",
  "ECG",
  "EFR",
  "Autre",
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

const calculateIMC = (poids, taille) => {
  if (!poids || !taille || taille <= 0) return null;
  const tailleMetres = taille / 100;
  return parseFloat((poids / (tailleMetres * tailleMetres)).toFixed(1));
};

const getIMCColor = (imc) => {
  if (imc < 18.5) return "bg-blue-100 text-blue-700";
  if (imc < 25) return "bg-green-100 text-green-700";
  if (imc < 30) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
};

const getIMCLabel = (imc) => {
  if (imc < 18.5) return "Insuffisance pondérale";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Surpoids";
  return "Obésité";
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
// AllergyBanner Component
// ─────────────────────────────────────────────────────────────────────────────

function AllergyBanner({ allergies }) {
  if (!allergies || allergies.trim() === "") return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 text-white p-4 shadow-lg flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">Allergies détectées</p>
        <p className="text-sm text-red-100">{allergies}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SoapSection Component — Collapsible section with visual indicator
// ─────────────────────────────────────────────────────────────────────────────

function SoapSection({
  title,
  subtitle,
  letter,
  badgeColor,
  expanded,
  onToggle,
  children,
}) {
  const badgeColorMap = {
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    amber: "bg-amber-600 text-white",
    red: "bg-red-600 text-white",
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-50 hover:border-blue-300 hover:from-blue-50 transition-all group"
      >
        {letter && badgeColor && (
          <div
            className={`flex-shrink-0 w-7 h-7 rounded font-bold flex items-center justify-center text-xs ${badgeColorMap[badgeColor]}`}
          >
            {letter}
          </div>
        )}
        <div className="flex-1 text-left">
          <p className="font-bold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {expanded && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          {children}
        </div>
      )}
    </div>
  );
}

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

  const frequenceOptions = [
    "1×/jour",
    "2×/jour",
    "3×/jour",
    "À la demande",
    "Autre",
  ];

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

      {/* Dose + Fréquence */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Dose <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={item.dose || ""}
            onChange={(e) => onChange(idx, "dose", e.target.value)}
            placeholder="Ex: 500 mg"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Fréquence <span className="text-red-500">*</span>
          </label>
          <select
            value={item.frequence || ""}
            onChange={(e) => onChange(idx, "frequence", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sélectionner...</option>
            {frequenceOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Durée + Instructions */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Durée
          </label>
          <input
            type="text"
            value={item.duree || ""}
            onChange={(e) => onChange(idx, "duree", e.target.value)}
            placeholder="Ex: 7 jours"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Instructions spéciales
          </label>
          <input
            type="text"
            value={item.instructions_speciales || ""}
            onChange={(e) =>
              onChange(idx, "instructions_speciales", e.target.value)
            }
            placeholder="Ex: prendre après repas"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
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

  // ── Consultation data — organized by SOAP sections ──────────────────────
  const [consultationData, setConsultationData] = useState({
    // EN-TÊTE (0)
    date_heure: new Date().toISOString().slice(0, 16),
    type_consultation: "",
    medecin: "", // auto-filled from JWT

    // SUBJECTIF (S)
    motif: "",
    histoire_maladie: "",
    douleur_present: false,
    douleur_localisation: "",
    douleur_type: "",
    douleur_intensite_eva: 0,
    symptomes: [],

    // OBJECTIF (O) — Vital signs
    tension_arterielle_sys: "",
    tension_arterielle_dia: "",
    frequence_cardiaque: "",
    temperature: "",
    spo2: "",
    frequence_respiratoire: "",
    poids: "",
    taille: "",
    // imc is calculated

    // OBJECTIF (O) — Clinical exam textareas
    etat_general: "",
    cardiovasculaire: "",
    respiratoire: "",
    abdomen: "",
    neurologique: "",
    osteomusculaire: "",
    peau_muqueuses: "",
    autres_observations: "",

    // ÉVALUATION (A)
    diagnostic_principal_libelle: "",
    diagnostic_principal_code_cim10: "",
    diagnostics_secondaires: [],
    raisonnement_clinique: "",

    // PLAN (P) — Prescriptions
    prescriptions: [],

    // PLAN (P) — Exams complémentaires
    biologie_selected: [],
    imagerie_selected: [],

    // PLAN (P) — Orientation
    refere_specialiste: false,
    specialite_referral: "",
    urgence_referral: "Non urgent",
    hospitalisation: false,
    service_hospitalisation: "",
    arret_travail: false,
    arret_travail_duree_jours: "",
    arret_travail_date_debut: "",
    prochain_rdv: "",
    instructions_patient: "",
  });

  // ── Prescription list ──────────────────────────────────────────────────
  const [prescriptions, setPrescriptions] = useState([]);

  // ── Analyses ──────────────────────────────────────────────────────────
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);
  const [savedAnalyses, setSavedAnalyses] = useState([]);

  // ── Patient & UI state ────────────────────────────────────────────────
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Expanded sections state ───────────────────────────────────────────
  const [expandedSections, setExpandedSections] = useState({
    entete: true,
    subjectif: true,
    objectif: true,
    evaluation: true,
    plan: true,
  });

  // ── IMC calculation ───────────────────────────────────────────────────
  const imc = useMemo(() => {
    return calculateIMC(
      parseFloat(consultationData.poids),
      parseFloat(consultationData.taille),
    );
  }, [consultationData.poids, consultationData.taille]);

  // ── Helpers ───────────────────────────────────────────────────────────
  const updateConsultationData = (field, value) => {
    setConsultationData((prev) => ({ ...prev, [field]: value }));
  };

  const addPrescription = (med) => {
    if (prescriptions.some((p) => p.medicament_id === med.id)) return;
    setPrescriptions((prev) => [
      ...prev,
      {
        medicament_id: med.id,
        medicament_nom: med.nom,
        forme: med.forme,
        dose: "",
        frequence: "",
        duree: "",
        instructions_speciales: "",
      },
    ]);
  };

  const removePrescription = (idx) =>
    setPrescriptions((prev) => prev.filter((_, i) => i !== idx));

  const updatePrescription = (idx, field, value) =>
    setPrescriptions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    );

  const addDiagnosticSecondaire = () => {
    setConsultationData((prev) => ({
      ...prev,
      diagnostics_secondaires: [
        ...prev.diagnostics_secondaires,
        { libelle: "", code_cim10: "" },
      ],
    }));
  };

  const removeDiagnosticSecondaire = (idx) => {
    setConsultationData((prev) => ({
      ...prev,
      diagnostics_secondaires: prev.diagnostics_secondaires.filter(
        (_, i) => i !== idx,
      ),
    }));
  };

  const updateDiagnosticSecondaire = (idx, field, value) => {
    setConsultationData((prev) => ({
      ...prev,
      diagnostics_secondaires: prev.diagnostics_secondaires.map((d, i) =>
        i === idx ? { ...d, [field]: value } : d,
      ),
    }));
  };

  // ── Data fetching ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const resolvePatient = (patient) => ({
          id: patient.id,
          name: `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim(),
          age: calculateAge(patient.date_naissance),
          bloodType: patient.groupe_sanguin || "—",
          weight: patient.poids_kg ? `${patient.poids_kg} kg` : "—",
          height: patient.taille_cm ? `${patient.taille_cm} cm` : "—",
          avatar: patient.user?.photo_profil || null,
          allergies: patient.allergies || "", // Important for banner
        });

        // Case 1: from rdvId
        if (rdvId && rdvId !== "new") {
          const rdvRes = await api.get(`/rendezvous/${rdvId}`);
          const rdv = rdvRes.data.data || rdvRes.data;
          if (rdv?.patient) {
            setPatientData(resolvePatient(rdv.patient));
            // Pre-fill poids and taille if available
            if (rdv.patient.poids_kg) {
              updateConsultationData("poids", rdv.patient.poids_kg);
            }
            if (rdv.patient.taille_cm) {
              updateConsultationData("taille", rdv.patient.taille_cm);
            }
            try {
              const cRes = await api.get("/consultations");
              const all = cRes.data.data || cRes.data || [];
              const existing = all.find(
                (c) => String(c.rdv_id) === String(rdvId),
              );
              if (existing) {
                const aRes = await api.get(
                  `/consultations/${existing.id}/analyses`,
                );
                setSavedAnalyses(aRes.data.data || aRes.data || []);
              }
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
          const resolved = resolvePatient(patient);
          setPatientData(resolved);
          // Pre-fill poids and taille
          if (patient.poids_kg) {
            updateConsultationData("poids", patient.poids_kg);
          }
          if (patient.taille_cm) {
            updateConsultationData("taille", patient.taille_cm);
          }
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

  // ── Validation & Submit ────────────────────────────────────────────────
  const validateForm = () => {
    const errors = [];

    // Check required fields
    if (!consultationData.motif?.trim()) errors.push("Motif requis");
    if (!consultationData.histoire_maladie?.trim())
      errors.push("Histoire de la maladie requise");
    if (!consultationData.diagnostic_principal_libelle?.trim())
      errors.push("Diagnostic principal requis");

    // Check prescriptions have required fields
    for (const p of prescriptions) {
      if (!p.dose?.trim()) {
        errors.push(`Dose manquante: ${p.medicament_nom}`);
      }
      if (!p.frequence?.trim()) {
        errors.push(`Fréquence manquante: ${p.medicament_nom}`);
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(`Erreurs: ${validationErrors.join(" | ")}`);
      return;
    }

    if (!patientData?.id) {
      setError("Données patient manquantes. Actualisez la page.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Créer la consultation avec tous les champs SOAP
      // TODO: Add the following columns to consultations migration:
      // - type_consultation, motif, symptomes_liste
      // - tension_arterielle_sys, tension_arterielle_dia, frequence_cardiaque, temperature, spo2
      // - frequence_respiratoire, poids, taille, imc
      // - etat_general, cardiovasculaire, respiratoire, abdomen, neurologique, osteomusculaire, peau_muqueuses
      // - autres_observations
      // - diagnostic_principal_code_cim10, diagnostics_secondaires_json, raisonnement_clinique
      // - refere_specialiste, specialite_referral, urgence_referral, hospitalisation, service_hospitalisation
      // - arret_travail, arret_travail_duree_jours, arret_travail_date_debut
      // - prochain_rdv, instructions_patient
      // - douleur_present, douleur_localisation, douleur_type, douleur_intensite_eva
      // - biologie_selected_json, imagerie_selected_json

      const consultRes = await api.post("/consultations", {
        rdv_id: rdvId === "new" ? null : parseInt(rdvId, 10) || null,
        patient_id: parseInt(patientData.id, 10),
        date: consultationData.date_heure,
        // SOAP fields — backend must be updated to accept these
        type_consultation: consultationData.type_consultation,
        motif: consultationData.motif,
        histoire_maladie: consultationData.histoire_maladie,
        symptomes: consultationData.symptomes.join(", "),
        douleur_present: consultationData.douleur_present,
        douleur_localisation: consultationData.douleur_localisation,
        douleur_type: consultationData.douleur_type,
        douleur_intensite_eva: consultationData.douleur_intensite_eva,
        tension_arterielle_sys: consultationData.tension_arterielle_sys,
        tension_arterielle_dia: consultationData.tension_arterielle_dia,
        frequence_cardiaque: consultationData.frequence_cardiaque,
        temperature: consultationData.temperature,
        spo2: consultationData.spo2,
        frequence_respiratoire: consultationData.frequence_respiratoire,
        poids: consultationData.poids,
        taille: consultationData.taille,
        imc: imc,
        etat_general: consultationData.etat_general,
        cardiovasculaire: consultationData.cardiovasculaire,
        respiratoire: consultationData.respiratoire,
        abdomen: consultationData.abdomen,
        neurologique: consultationData.neurologique,
        osteomusculaire: consultationData.osteomusculaire,
        peau_muqueuses: consultationData.peau_muqueuses,
        autres_observations: consultationData.autres_observations,
        diagnostic_principal_libelle:
          consultationData.diagnostic_principal_libelle,
        diagnostic_principal_code_cim10:
          consultationData.diagnostic_principal_code_cim10,
        diagnostics_secondaires: JSON.stringify(
          consultationData.diagnostics_secondaires,
        ),
        raisonnement_clinique: consultationData.raisonnement_clinique,
        refere_specialiste: consultationData.refere_specialiste,
        specialite_referral: consultationData.specialite_referral,
        urgence_referral: consultationData.urgence_referral,
        hospitalisation: consultationData.hospitalisation,
        service_hospitalisation: consultationData.service_hospitalisation,
        arret_travail: consultationData.arret_travail,
        arret_travail_duree_jours: consultationData.arret_travail_duree_jours,
        arret_travail_date_debut: consultationData.arret_travail_date_debut,
        prochain_rdv: consultationData.prochain_rdv,
        instructions_patient: consultationData.instructions_patient,
        diagnostic: consultationData.diagnostic_principal_libelle, // legacy compatibility
        notes_medecin: consultationData.autres_observations,
      });

      const consultationId = consultRes.data?.data?.id ?? consultRes.data?.id;
      if (!consultationId)
        throw new Error("Identifiant consultation manquant.");

      // 2. Créer l'ordonnance
      if (
        consultationData.instructions_patient?.trim() ||
        prescriptions.length > 0
      ) {
        const ordRes = await api.post("/ordonnances", {
          consultation_id: consultationId,
          date: new Date().toISOString().split("T")[0],
          instructions: consultationData.instructions_patient,
        });
        const ordonnanceId = ordRes.data?.data?.id ?? ordRes.data?.id;
        if (!ordonnanceId) throw new Error("Identifiant ordonnance manquant.");

        // 3. Créer les lignes de prescription
        if (ordonnanceId && prescriptions.length > 0) {
          await Promise.all(
            prescriptions.map((p) =>
              api.post("/prescriptions", {
                ordonnance_id: ordonnanceId,
                medicament_id: p.medicament_id,
                dose: p.dose,
                frequence: p.frequence,
                duree: p.duree,
                posologie: `${p.dose} - ${p.frequence} - ${p.duree}`,
                instructions_speciales: p.instructions_speciales,
              }),
            ),
          );
        }
      }

      // 4. Prescrire les analyses
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
      let errorMsg = "Erreur lors de la création.";

      if (err.response?.data?.errors) {
        // Parse specific validation errors from backend
        const errors = err.response.data.errors;
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const fieldName = field
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            const msgs = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            return `${fieldName}: ${msgs}`;
          })
          .join("\n");
        errorMsg = errorMessages;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Navbar userRole="medecin" pageTitle="Nouvelle Consultation">
      {/* Allergy Banner */}
      {patientData?.allergies && (
        <AllergyBanner allergies={patientData.allergies} />
      )}

      <div
        className={`min-h-full bg-slate-50 p-6 lg:p-8 ${
          patientData?.allergies ? "pt-24" : ""
        }`}
      >
        <div className="mx-auto max-w-5xl space-y-8">
          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="sticky top-0 z-30 bg-white rounded-3xl shadow-sm ring-1 ring-slate-200 p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Nouvelle consultation
              </h1>
              {patientData && (
                <p className="mt-1 text-sm text-slate-600">
                  Patient:{" "}
                  <span className="font-semibold">{patientData.name}</span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/medecin/dashboard")}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                form="consultation-form"
                disabled={submitting || loading}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {submitting ? "Enregistrement..." : "Valider"}
              </button>
            </div>
          </div>

          {/* ── Patient Card ─────────────────────────────────────────── */}
          {patientData && (
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {patientData.avatar ? (
                  <img
                    src={patientData.avatar}
                    alt={patientData.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                    {getInitials(patientData.name)}
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {patientData.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {patientData.age} • {patientData.bloodType}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Error Alert ────────────────────────────────────────── */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm space-y-1">
              {error.split("\n").map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Main Form ────────────────────────────────────────────── */}
          <form
            id="consultation-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* ══════════════════════════════════════════════════════════════
                SECTION 0: EN-TÊTE
                ══════════════════════════════════════════════════════════════ */}
            <SoapSection
              title="Informations de la consultation"
              subtitle="Date et type de consultation"
              expanded={expandedSections.entete}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  entete: !prev.entete,
                }))
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Date & Heure <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={consultationData.date_heure}
                    onChange={(e) =>
                      updateConsultationData("date_heure", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Type de consultation <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={consultationData.type_consultation}
                    onChange={(e) =>
                      updateConsultationData(
                        "type_consultation",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Sélectionner...</option>
                    {TYPE_CONSULTATION.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </SoapSection>

            {/* ══════════════════════════════════════════════════════════════
                SECTION S: SUBJECTIF
                ══════════════════════════════════════════════════════════════ */}
            <SoapSection
              title="Motif & Symptômes"
              subtitle="Histoire et description du patient"
              letter="S"
              badgeColor="blue"
              expanded={expandedSections.subjectif}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  subjectif: !prev.subjectif,
                }))
              }
            >
              <div className="space-y-4">
                {/* Motif */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Motif de consultation{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={consultationData.motif}
                    onChange={(e) =>
                      updateConsultationData("motif", e.target.value)
                    }
                    placeholder="Ex: Douleur thoracique"
                    list="motif-suggestions"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                  <datalist id="motif-suggestions">
                    {MOTIF_SUGGESTIONS.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>

                {/* Histoire de la maladie */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Histoire de la maladie{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={consultationData.histoire_maladie}
                    onChange={(e) =>
                      updateConsultationData("histoire_maladie", e.target.value)
                    }
                    rows={4}
                    placeholder="Décrivez l'évolution, les circonstances d'apparition..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Douleur */}
                <div className="space-y-3 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consultationData.douleur_present}
                      onChange={(e) =>
                        updateConsultationData(
                          "douleur_present",
                          e.target.checked,
                        )
                      }
                      className="w-4 h-4 rounded border-slate-300 text-blue-600"
                    />
                    <span className="font-semibold text-slate-900">
                      Présence de douleur
                    </span>
                  </label>

                  {consultationData.douleur_present && (
                    <div className="space-y-3 ml-7">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Localisation
                        </label>
                        <input
                          type="text"
                          value={consultationData.douleur_localisation}
                          onChange={(e) =>
                            updateConsultationData(
                              "douleur_localisation",
                              e.target.value,
                            )
                          }
                          placeholder="Ex: Thorax antérieur"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Type de douleur
                        </label>
                        <select
                          value={consultationData.douleur_type}
                          onChange={(e) =>
                            updateConsultationData(
                              "douleur_type",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          {TYPE_DOULEUR.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Intensité (EVA) — 0 = Aucune / 10 = Insupportable
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={consultationData.douleur_intensite_eva}
                            onChange={(e) =>
                              updateConsultationData(
                                "douleur_intensite_eva",
                                parseInt(e.target.value, 10),
                              )
                            }
                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <span className="text-xl font-bold text-blue-600 min-w-[2rem] text-right">
                            {consultationData.douleur_intensite_eva}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Symptômes checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Symptômes
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SYMPTOMES_CHECKBOX.map((symptome) => (
                      <label
                        key={symptome}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={consultationData.symptomes.includes(
                            symptome,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateConsultationData("symptomes", [
                                ...consultationData.symptomes,
                                symptome,
                              ]);
                            } else {
                              updateConsultationData(
                                "symptomes",
                                consultationData.symptomes.filter(
                                  (s) => s !== symptome,
                                ),
                              );
                            }
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600"
                        />
                        <span className="text-sm text-slate-700">
                          {symptome}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </SoapSection>

            {/* ══════════════════════════════════════════════════════════════
                SECTION O: OBJECTIF — SIGNES VITAUX
                ══════════════════════════════════════════════════════════════ */}
            <SoapSection
              title="Examen Clinique"
              subtitle="Signes vitaux et examen physique"
              letter="O"
              badgeColor="green"
              expanded={expandedSections.objectif}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  objectif: !prev.objectif,
                }))
              }
            >
              <div className="space-y-6">
                {/* Vital signs grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Sys (mmHg)
                    </label>
                    <input
                      type="number"
                      value={consultationData.tension_arterielle_sys}
                      onChange={(e) =>
                        updateConsultationData(
                          "tension_arterielle_sys",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: 120"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Dia (mmHg)
                    </label>
                    <input
                      type="number"
                      value={consultationData.tension_arterielle_dia}
                      onChange={(e) =>
                        updateConsultationData(
                          "tension_arterielle_dia",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: 80"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      FC (bpm)
                    </label>
                    <input
                      type="number"
                      value={consultationData.frequence_cardiaque}
                      onChange={(e) =>
                        updateConsultationData(
                          "frequence_cardiaque",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: 72"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Temp (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={consultationData.temperature}
                      onChange={(e) =>
                        updateConsultationData("temperature", e.target.value)
                      }
                      placeholder="Ex: 37.2"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      SpO2 (%)
                    </label>
                    <input
                      type="number"
                      value={consultationData.spo2}
                      onChange={(e) =>
                        updateConsultationData("spo2", e.target.value)
                      }
                      placeholder="Ex: 98"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      FR (cycles/min)
                    </label>
                    <input
                      type="number"
                      value={consultationData.frequence_respiratoire}
                      onChange={(e) =>
                        updateConsultationData(
                          "frequence_respiratoire",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: 16"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Poids (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={consultationData.poids}
                      onChange={(e) =>
                        updateConsultationData("poids", e.target.value)
                      }
                      placeholder="Ex: 70"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Taille (cm)
                    </label>
                    <input
                      type="number"
                      value={consultationData.taille}
                      onChange={(e) =>
                        updateConsultationData("taille", e.target.value)
                      }
                      placeholder="Ex: 175"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* IMC Badge */}
                {imc && (
                  <div className={`rounded-xl p-4 ${getIMCColor(imc)}`}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                      IMC
                    </p>
                    <p className="text-2xl font-bold">
                      {imc}{" "}
                      <span className="text-sm font-semibold">
                        ({getIMCLabel(imc)})
                      </span>
                    </p>
                  </div>
                )}

                {/* Clinical Exam */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Examen clinique
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        field: "etat_general",
                        label: "État général",
                      },
                      {
                        field: "cardiovasculaire",
                        label: "Cardiovasculaire",
                      },
                      {
                        field: "respiratoire",
                        label: "Respiratoire",
                      },
                      {
                        field: "abdomen",
                        label: "Abdomen",
                      },
                      {
                        field: "neurologique",
                        label: "Neurologique",
                      },
                      {
                        field: "osteomusculaire",
                        label: "Ostéomusculaire",
                      },
                      {
                        field: "peau_muqueuses",
                        label: "Peau & Muqueuses",
                      },
                      {
                        field: "autres_observations",
                        label: "Autres observations",
                      },
                    ].map(({ field, label }) => (
                      <div key={field}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          {label}
                        </label>
                        <textarea
                          value={consultationData[field]}
                          onChange={(e) =>
                            updateConsultationData(field, e.target.value)
                          }
                          rows={2}
                          placeholder="Notes..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SoapSection>

            {/* ══════════════════════════════════════════════════════════════
                SECTION A: ÉVALUATION
                ══════════════════════════════════════════════════════════════ */}
            <SoapSection
              title="Diagnostic"
              subtitle="Évaluation clinique et conclusions"
              letter="A"
              badgeColor="amber"
              expanded={expandedSections.evaluation}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  evaluation: !prev.evaluation,
                }))
              }
            >
              <div className="space-y-4">
                {/* Diagnostic Principal */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Diagnostic principal <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={consultationData.diagnostic_principal_libelle}
                      onChange={(e) =>
                        updateConsultationData(
                          "diagnostic_principal_libelle",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: Bronchite aiguë"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={consultationData.diagnostic_principal_code_cim10}
                      onChange={(e) =>
                        updateConsultationData(
                          "diagnostic_principal_code_cim10",
                          e.target.value,
                        )
                      }
                      placeholder="Ex: J20.9"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Diagnostics Secondaires */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Diagnostics secondaires
                    </label>
                    <button
                      type="button"
                      onClick={addDiagnosticSecondaire}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter
                    </button>
                  </div>
                  <div className="space-y-2">
                    {consultationData.diagnostics_secondaires.map(
                      (diag, idx) => (
                        <div key={idx} className="flex items-end gap-2">
                          <input
                            type="text"
                            value={diag.libelle}
                            onChange={(e) =>
                              updateDiagnosticSecondaire(
                                idx,
                                "libelle",
                                e.target.value,
                              )
                            }
                            placeholder="Libellé"
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={diag.code_cim10}
                            onChange={(e) =>
                              updateDiagnosticSecondaire(
                                idx,
                                "code_cim10",
                                e.target.value,
                              )
                            }
                            placeholder="Code ICD10"
                            className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeDiagnosticSecondaire(idx)}
                            className="text-slate-400 hover:text-red-500 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Raisonnement Clinique */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Raisonnement clinique
                  </label>
                  <textarea
                    value={consultationData.raisonnement_clinique}
                    onChange={(e) =>
                      updateConsultationData(
                        "raisonnement_clinique",
                        e.target.value,
                      )
                    }
                    rows={4}
                    placeholder="Expliquez le diagnostic..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </SoapSection>

            {/* ══════════════════════════════════════════════════════════════
                SECTION P: PLAN THÉRAPEUTIQUE
                ══════════════════════════════════════════════════════════════ */}
            <SoapSection
              title="Traitement & Suivi"
              subtitle="Prescriptions, examens et orientation"
              letter="P"
              badgeColor="red"
              expanded={expandedSections.plan}
              onToggle={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  plan: !prev.plan,
                }))
              }
            >
              <div className="space-y-8">
                {/* ──── Prescriptions ──── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        Prescriptions
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Recherchez et ajoutez les médicaments
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                      {prescriptions.length}
                    </span>
                  </div>

                  <MedicamentSearch onSelect={addPrescription} />

                  {prescriptions.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-sm italic text-slate-400">
                      Aucun médicament ajouté.
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

                {/* ──── Examens Complémentaires ──── */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="h-5 w-5 text-slate-500" />
                    <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      Examens complémentaires
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Biologie */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Biologie
                      </p>
                      <div className="space-y-2">
                        {BIOLOGIE_CHECKBOX.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={consultationData.biologie_selected.includes(
                                item,
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateConsultationData("biologie_selected", [
                                    ...consultationData.biologie_selected,
                                    item,
                                  ]);
                                } else {
                                  updateConsultationData(
                                    "biologie_selected",
                                    consultationData.biologie_selected.filter(
                                      (i) => i !== item,
                                    ),
                                  );
                                }
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600"
                            />
                            <span className="text-sm text-slate-700">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Imagerie */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Imagerie
                      </p>
                      <div className="space-y-2">
                        {IMAGERIE_CHECKBOX.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={consultationData.imagerie_selected.includes(
                                item,
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateConsultationData("imagerie_selected", [
                                    ...consultationData.imagerie_selected,
                                    item,
                                  ]);
                                } else {
                                  updateConsultationData(
                                    "imagerie_selected",
                                    consultationData.imagerie_selected.filter(
                                      (i) => i !== item,
                                    ),
                                  );
                                }
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600"
                            />
                            <span className="text-sm text-slate-700">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ──── Orientation ──── */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Orientation
                  </p>

                  {/* Référence Spécialiste */}
                  <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50/40 p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationData.refere_specialiste}
                        onChange={(e) =>
                          updateConsultationData(
                            "refere_specialiste",
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-blue-600"
                      />
                      <span className="font-semibold text-slate-900">
                        Référence à un spécialiste
                      </span>
                    </label>
                    {consultationData.refere_specialiste && (
                      <div className="space-y-2 ml-6">
                        <input
                          type="text"
                          value={consultationData.specialite_referral}
                          onChange={(e) =>
                            updateConsultationData(
                              "specialite_referral",
                              e.target.value,
                            )
                          }
                          placeholder="Ex: Cardiologie"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                        <select
                          value={consultationData.urgence_referral}
                          onChange={(e) =>
                            updateConsultationData(
                              "urgence_referral",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="Non urgent">Non urgent</option>
                          <option value="Urgent">Urgent</option>
                          <option value="Très urgent">Très urgent</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Hospitalisation */}
                  <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50/40 p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationData.hospitalisation}
                        onChange={(e) =>
                          updateConsultationData(
                            "hospitalisation",
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-blue-600"
                      />
                      <span className="font-semibold text-slate-900">
                        Hospitalisation
                      </span>
                    </label>
                    {consultationData.hospitalisation && (
                      <input
                        type="text"
                        value={consultationData.service_hospitalisation}
                        onChange={(e) =>
                          updateConsultationData(
                            "service_hospitalisation",
                            e.target.value,
                          )
                        }
                        placeholder="Ex: Unité de Soins Intensifs"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none ml-6"
                      />
                    )}
                  </div>

                  {/* Arrêt de travail */}
                  <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50/40 p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consultationData.arret_travail}
                        onChange={(e) =>
                          updateConsultationData(
                            "arret_travail",
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-blue-600"
                      />
                      <span className="font-semibold text-slate-900">
                        Arrêt de travail
                      </span>
                    </label>
                    {consultationData.arret_travail && (
                      <div className="space-y-2 ml-6">
                        <input
                          type="date"
                          value={consultationData.arret_travail_date_debut}
                          onChange={(e) =>
                            updateConsultationData(
                              "arret_travail_date_debut",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                          type="number"
                          value={consultationData.arret_travail_duree_jours}
                          onChange={(e) =>
                            updateConsultationData(
                              "arret_travail_duree_jours",
                              e.target.value,
                            )
                          }
                          placeholder="Nombre de jours"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Prochain RDV */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Prochain rendez-vous
                    </label>
                    <input
                      type="date"
                      value={consultationData.prochain_rdv}
                      onChange={(e) =>
                        updateConsultationData("prochain_rdv", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Instructions au patient */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Instructions au patient
                    </label>
                    <textarea
                      value={consultationData.instructions_patient}
                      onChange={(e) =>
                        updateConsultationData(
                          "instructions_patient",
                          e.target.value,
                        )
                      }
                      rows={3}
                      placeholder="Conseils, hygène de vie, signes d'alerte..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* ──── Analyses à prescrire ──── */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="h-5 w-5 text-slate-500" />
                    <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      Analyses détaillées à prescrire
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
              </div>
            </SoapSection>
          </form>
        </div>
      </div>
    </Navbar>
  );
}

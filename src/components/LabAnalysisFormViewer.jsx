import { useRef } from "react";

// ─── Normalisation helper ────────────────────────────────────────────────────
// Normalise a string to match category/type keys from the backend
const norm = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

// ─── Full form definition (mirrors the PDF) ──────────────────────────────────
const FORM = [
  // ── ROW 1 ─ HÉMATOLOGIE / ANÉMIE / COAGULATION / THROMBOPHILIE ──────────
  {
    id: "row1",
    columns: [
      {
        category: "hematologie",
        label: "HÉMATOLOGIE",
        items: [
          "Hémoglobine",
          "Globules Rouges - Hct",
          "Globules Blancs",
          "Formule leucocytaire",
          "Plaquettes",
          "Réticulocytes",
          "Morphologie des GR",
        ],
      },
      {
        category: "anemie",
        label: "ANÉMIE",
        items: [
          "Fer",
          "Transferrine (+ % saturation)",
          "Hémochromatose",
          "Vit B12 (1x/an)",
          "Acide folique (1x/an)",
          "Haptoglobine",
          "Ac. folique érythro.",
        ],
      },
      {
        category: "coagulation",
        label: "COAGULATION",
        items: [
          "Quick-INR",
          "Tps de céphaline activée",
          "Fibrinogène",
          "Temps de thrombine",
          "D-Dimères",
          "Plaquettes (sur citrate)",
          "Anti-Xa HBPM",
          "Anti-Xa Xarelto",
          "Anti-Xa Eliquis",
          "PFA",
          "Facteur VIII",
          "Facteur IX",
          "Ag vWF",
          "Activité vWF",
        ],
      },
      {
        category: "thrombophilie",
        label: "THROMBOPHILIE",
        items: [
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
          "CIVD",
        ],
      },
    ],
  },

  // ── ROW 2 ─ IMMUNO-HÉMATO ────────────────────────────────────────────────
  {
    id: "row2",
    columns: [
      {
        category: "immuno_hemato",
        label: "IMMUNO-HÉMATO",
        items: [
          "Parasites sanguins",
          "Groupe ABOD",
          "Electrophorèse Hb",
          "Sous-groupes RH",
          "Sphérocytose",
          "Carte de groupe",
          "Phénotypage érythrocytaire",
          "Agglutinines irrégulières (RAI)",
          "Typage T-B-NK",
          "Typage CD4-CD8",
          "Gène RHD fœtal",
          "Coombs direct",
          "Agglutinines froides",
          "Cryoglobulines",
          "B27",
        ],
      },
    ],
  },

  // ── ROW 3 ─ BIOCHIMIE ────────────────────────────────────────────────────
  {
    id: "row3",
    columns: [
      {
        category: "biochimie_foie",
        label: "BIOCHIMIE – Foie / Pancréas",
        items: [
          "TGO",
          "TGP",
          "LDH",
          "GGT",
          "Ph. alcalines",
          "Bilirubines Totale + Directe",
          "Acides biliaires",
          "Amylase",
          "Lipase",
          "NH3 veineux",
          "NH3 artériel",
        ],
      },
      {
        category: "biochimie_reins",
        label: "BIOCHIMIE – Reins / Ions",
        items: [
          "Urée",
          "Créatinine (+GFR)",
          "Acide urique",
          "Na",
          "K",
          "Cl",
          "HCO3-",
          "Ca",
          "Ca corrigé",
          "P",
          "Mg",
          "Osmolalité",
          "pH artériel",
          "pH veineux",
        ],
      },
      {
        category: "biochimie_proteines",
        label: "BIOCHIMIE – Protéines spécifiques",
        items: [
          "CRP",
          "VS",
          "Protéines",
          "Albumine",
          "Electro. Protéines",
          "Immunoélectrophorèse",
          "Chaînes légères libres",
          "IgG",
          "IgA",
          "IgM",
          "C3",
          "C4",
          "CH50",
          "β2 microglobuline",
          "Préalbumine",
          "Procalcitonine",
          "CRP ultrasensible",
          "Homocystéine",
        ],
      },
      {
        category: "biochimie_glucides",
        label: "BIOCHIMIE – Glucides / Lipides",
        items: [
          "Glycémie",
          "HbA1c",
          "Insuline",
          "C-peptide",
          "Cholestérol Total",
          "Triglycérides",
          "HDL (+LDL calculé)",
          "ApoA",
          "ApoB",
          "LDL dosé",
          "Lp(a)",
          "CPK",
          "Troponine I",
          "NT-proBNP",
        ],
      },
    ],
  },

  // ── ROW 4 ─ CHIMIE URINAIRE ──────────────────────────────────────────────
  {
    id: "row4",
    columns: [
      {
        category: "chimie_urinaire",
        label: "CHIMIE URINAIRE",
        items: [
          "Sédiment + culture",
          "Glucose urinaire",
          "Protéines urinaires",
          "Urée urinaire",
          "Créatinine urinaire",
          "Acide urique urinaire",
          "Na urinaire",
          "K urinaire",
          "Cl urinaire",
          "Ca urinaire",
          "P urinaire",
          "Mg urinaire",
          "Citrate urinaire",
          "Oxalate urinaire",
          "Electro. Prot. urinaire",
          "Bence-Jones",
          "µAlbumine",
          "α1 µglobuline",
          "β2 µglobuline",
        ],
      },
    ],
  },

  // ── ROW 5 ─ SÉROLOGIE ────────────────────────────────────────────────────
  {
    id: "row5",
    columns: [
      {
        category: "serologie_virale",
        label: "SÉROLOGIE Virale",
        items: [
          "Hépatite A IgM",
          "Hépatite B Ag surface",
          "Hépatite B Ac core",
          "Hépatite C",
          "Hépatite A Ac totaux",
          "Hépatite B Ac surface",
          "Hépatite B Ag e",
          "Hépatite B Ac e",
          "Hépatite D",
          "Hépatite E IgG+IgM",
          "CMV IgG+IgM",
          "EBV IgG+IgM",
          "Rubéole IgG",
          "H. simplex IgG+IgM",
          "Varicelle IgG+IgM",
          "Oreillons IgG+IgM",
          "Parvovirus B19 IgG+IgM",
          "Rougeole IgG+IgM",
          "HIV",
          "HTLV I/II",
          "Covid 19",
        ],
      },
      {
        category: "serologie_bacterienne",
        label: "SÉROLOGIE Bactérienne",
        items: [
          "Syphilis",
          "ASLO",
          "Borrelia IgG+IgM",
          "Brucella",
          "Bartonella IgG+IgM",
          "Bordetella",
          "Mycoplasme IgG+IgM",
          "Chl. Pneumoniae IgG+IgA",
          "Chl. Trachomatis IgG+IgA",
          "Rickettsies",
          "Coxiella burnetii (fièvre Q)",
        ],
      },
      {
        category: "serologie_non_infectieuse",
        label: "SÉROLOGIE Non infectieuse",
        items: [
          "AAN + identification",
          "ENA",
          "DNA",
          "AC anti-muq. gastrique",
          "AC anti-mitochondries",
          "AC anti-muscles lisses",
          "AC anti-LKM",
          "AC anti-LC1",
          "AC anti-SLA",
          "Panel myosite",
          "AC anti-CCP",
          "Facteur rhumatoïde",
          "ANCA + identification",
          "AC anti-MPO",
          "AC anti-PR3",
          "AC anti-GBM",
          "ASCA IgG+IgA",
          "AC anti-transglutaminase IgA",
        ],
      },
    ],
  },

  // ── ROW 6 ─ HORMONOLOGIE ────────────────────────────────────────────────
  {
    id: "row6",
    columns: [
      {
        category: "hormonologie_thyroide",
        label: "HORMONOLOGIE – Thyroïde",
        items: [
          "TSH",
          "T4 libre",
          "T3 libre",
          "AC anti-TPO",
          "AC anti-TG",
          "Thyroglobuline",
          "AC anti-TSI",
        ],
      },
      {
        category: "hormonologie_grossesse",
        label: "HORMONOLOGIE – Grossesse",
        items: [
          "β-HCG",
          "Oestradiol",
          "Progestérone",
          "AMH",
          "PLGF (pré-éclampsie)",
          "sFlt-1/PLGF",
          "TPNI",
        ],
      },
      {
        category: "hormonologie_hypophyse",
        label: "HORMONOLOGIE – Hypophyse",
        items: ["LH", "FSH", "Prolactine", "ACTH", "hGH / IgF1"],
      },
      {
        category: "hormonologie_gonades",
        label: "HORMONOLOGIE – Gonades / Surrénales",
        items: [
          "Testostérone",
          "SHBG",
          "Androstanediol glucuronide",
          "Oestrone",
          "Cortisol",
          "17-OH progestérone",
          "Δ4-androstènedione",
          "DHEA-Sulfate",
          "Aldostérone",
          "Rénine",
        ],
      },
    ],
  },

  // ── ROW 7 ─ MARQUEURS / ALLERGIE / MÉTABOLISME OSSEUX ───────────────────
  {
    id: "row7",
    columns: [
      {
        category: "marqueurs",
        label: "MARQUEURS TUMORAUX",
        items: [
          "CEA",
          "CA19.9",
          "CA125",
          "CA15.3",
          "NSE",
          "β-HCG (marqueur)",
          "AFP",
          "PSA dépistage",
          "PSA libre",
          "PSA suivi",
          "Chromogranine A",
          "Thyrocalcitonine",
          "Thyroglobuline",
          "Angiotensine convertase",
        ],
      },
      {
        category: "allergie",
        label: "ALLERGIE",
        items: [
          "IgE totales",
          "Tryptase (mastocytose)",
          "DAO",
          "IgE phléole",
          "IgE poussières d1",
          "IgE poussières d2",
          "IgE bouleau t3",
          "IgE chat e1",
          "IgE chien e5",
          "IgE armoise w6",
          "IgE plantain w9",
          "IgE moisissures mx1",
          "IgE Asp. fumigatus m3",
          "IgE blanc oeuf f1",
          "IgE lait f2",
          "IgE froment f4",
          "IgE soja f14",
        ],
      },
      {
        category: "metabolisme_osseux",
        label: "MÉTABOLISME OSSEUX",
        items: [
          "Ca osseux",
          "P osseux",
          "Calcium ionisé",
          "PTH",
          "Vit D",
          "Phosph. alcaline osseuse",
          "C-télopeptides (CTX)",
        ],
      },
    ],
  },
];

// ─── Checkbox item ───────────────────────────────────────────────────────────
const CheckItem = ({ label, checked }) => (
  <div
    className={`flex items-center gap-2 py-0.5 px-1.5 rounded transition-colors ${
      checked ? "bg-primary/10" : ""
    }`}
  >
    <span
      className={`shrink-0 w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${
        checked
          ? "bg-primary border-primary"
          : "border-outline-variant/60 bg-transparent"
      }`}
    >
      {checked && (
        <svg
          viewBox="0 0 10 8"
          fill="none"
          className="w-2.5 h-2 text-white"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span
      className={`text-[10px] leading-tight ${
        checked
          ? "text-primary font-semibold"
          : "text-on-surface-variant"
      }`}
    >
      {label}
    </span>
  </div>
);

// ─── Section column ──────────────────────────────────────────────────────────
const FormColumn = ({ col, isChecked }) => {
  const catNorm = norm(col.category);
  const hasSomething = col.items.some((item) =>
    isChecked(col.category, item)
  );

  return (
    <div
      className={`rounded-lg border transition-colors ${
        hasSomething
          ? "border-primary/30 bg-primary/5"
          : "border-outline-variant/20 bg-surface-container-lowest"
      } overflow-hidden flex-1 min-w-0`}
    >
      {/* Column header */}
      <div
        className={`px-3 py-2 border-b text-[9px] font-bold uppercase tracking-wider ${
          hasSomething
            ? "bg-primary/15 border-primary/20 text-primary"
            : "bg-surface-container-high border-outline-variant/15 text-outline"
        }`}
      >
        {col.label}
      </div>
      {/* Items */}
      <div className="px-2 py-2 space-y-0.5">
        {col.items.map((item) => (
          <CheckItem
            key={item}
            label={item}
            checked={isChecked(col.category, item)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
export function LabAnalysisFormViewer({ analyses = [] }) {
  const printRef = useRef(null);

  // Build a "prescribed labels" set using all known item labels
  const checkedByLabel = new Set(
    analyses.map((a) => norm(a.type_analyse ?? ""))
  );

  // Extended isChecked: exact category+type, OR label-only match
  const isChecked = (category, itemLabel) => {
    const catKey = norm(category);
    const itemKey = norm(itemLabel);
    
    // Check exact match: category + type_analyse
    const exactMatch = analyses.some(
      (a) => norm(a.category ?? "") === catKey && norm(a.type_analyse ?? "") === itemKey
    );
    
    if (exactMatch) return true;
    
    // Check label-only match (when type_analyse matches the item)
    return checkedByLabel.has(itemKey);
  };

  // Notes from prescriptions
  const notes = analyses
    .map((a) => a.commentaire_medecin)
    .filter(Boolean);

  // ── Print handler ─────────────────────────────────────────────────────────
  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    if (!printContents) return;
    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Formulaire d'Analyses</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background: white; color: #1a1a1a; padding: 16px; }
            .print-form { display: flex; flex-direction: column; gap: 12px; }
            .print-row { display: flex; gap: 8px; }
            .print-col { flex: 1; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
            .print-col-header { background: #f1f5f9; padding: 5px 10px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; border-bottom: 1px solid #e2e8f0; }
            .print-col-header.active { background: #dbeafe; color: #1d4ed8; border-bottom-color: #bfdbfe; }
            .print-items { padding: 6px 8px; display: flex; flex-direction: column; gap: 2px; }
            .print-item { display: flex; align-items: center; gap: 6px; padding: 1px 4px; border-radius: 3px; }
            .print-item.checked { background: #eff6ff; }
            .print-cb { width: 10px; height: 10px; border: 1px solid #94a3b8; border-radius: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
            .print-cb.checked { background: #2563eb; border-color: #2563eb; }
            .print-cb.checked::after { content: '✓'; color: white; font-size: 7px; line-height: 1; font-weight: 700; }
            .print-label { font-size: 9px; color: #475569; line-height: 1.3; }
            .print-label.checked { color: #1d4ed8; font-weight: 600; }
            .print-title { text-align: center; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #1e293b; padding-bottom: 8px; border-bottom: 2px solid #2563eb; margin-bottom: 4px; }
            .print-subtitle { text-align: center; font-size: 9px; color: #64748b; margin-bottom: 12px; }
            .print-notes { margin-top: 12px; padding: 8px 12px; border: 1px solid #bfdbfe; border-radius: 6px; background: #eff6ff; }
            .print-notes-label { font-size: 8px; font-weight: 700; text-transform: uppercase; color: #1d4ed8; margin-bottom: 4px; }
            .print-notes p { font-size: 9px; color: #1e3a8a; font-style: italic; }
            @page { size: A4; margin: 15mm; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  const prescribedCount = analyses.length;

  return (
    <div>
      {/* ── Actions bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-on-surface-variant">
          <span className="font-semibold text-primary">{prescribedCount}</span>{" "}
          analyse{prescribedCount !== 1 ? "s" : ""} prescrite
          {prescribedCount !== 1 ? "s" : ""}
        </p>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Télécharger / Imprimer
        </button>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary flex-shrink-0" />
          Prescrit
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-outline-variant/60 flex-shrink-0" />
          Non prescrit
        </span>
      </div>

      {/* ── Printable form ─────────────────────────────────────────────── */}
      <div ref={printRef} id="lab-form-print">
        {/* Print-only header */}
        <div className="print-title hidden print:block">
          Formulaire de Demande d'Analyses
        </div>
        <div className="print-subtitle hidden print:block">
          Analyses prescrites — vue patient (lecture seule)
        </div>

        <div className="space-y-3">
          {FORM.map((row) => (
            <div key={row.id} className="flex gap-2 print-row">
              {row.columns.map((col) => (
                <FormColumn
                  key={col.category}
                  col={col}
                  isChecked={isChecked}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Notes section */}
        {notes.length > 0 && (
          <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5 print-notes">
            <p className="text-[9px] font-bold uppercase tracking-wider text-primary mb-2 print-notes-label">
              Notes du médecin
            </p>
            {notes.map((note, i) => (
              <p
                key={i}
                className="text-xs text-primary/80 italic leading-relaxed"
              >
                {note}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ── Print styles injected globally ─────────────────────────────── */}
      <style>{`
        @media print {
          body > *:not(#lab-form-print) { display: none !important; }
          .hidden.print\\:block { display: block !important; }
          .print-row { display: flex !important; gap: 8px; }
        }
      `}</style>
    </div>
  );
}

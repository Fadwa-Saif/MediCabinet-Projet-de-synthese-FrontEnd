import { useRef } from "react";

// ─── Normalisation helper ────────────────────────────────────────────────────
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
        checked ? "text-primary font-semibold" : "text-on-surface-variant"
      }`}
    >
      {label}
    </span>
  </div>
);

// ─── Section column ──────────────────────────────────────────────────────────
const FormColumn = ({ col, isChecked }) => {
  const hasSomething = col.items.some((item) => isChecked(col.category, item));

  return (
    <div
      className={`rounded-lg border transition-colors ${
        hasSomething
          ? "border-primary/30 bg-primary/5"
          : "border-outline-variant/20 bg-surface-container-lowest"
      } overflow-hidden flex-1 min-w-0`}
    >
      <div
        className={`px-3 py-2 border-b text-[9px] font-bold uppercase tracking-wider ${
          hasSomething
            ? "bg-primary/15 border-primary/20 text-primary"
            : "bg-surface-container-high border-outline-variant/15 text-outline"
        }`}
      >
        {col.label}
      </div>
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
export function LabAnalysisFormViewer({
  analyses = [],
  patient = {},
  medecin = {},
  date = null,
}) {
  const printRef = useRef(null);

  const checkedByLabel = new Set(
    analyses.map((a) => norm(a.type_analyse ?? "")),
  );

  const isChecked = (category, itemLabel) => {
    const catKey = norm(category);
    const itemKey = norm(itemLabel);
    const exactMatch = analyses.some(
      (a) =>
        norm(a.category ?? "") === catKey &&
        norm(a.type_analyse ?? "") === itemKey,
    );
    if (exactMatch) return true;
    return checkedByLabel.has(itemKey);
  };

  const notes = analyses.map((a) => a.commentaire_medecin).filter(Boolean);

  // ── Print handler ──────────────────────────────────────────────────────────
  // Generates clean HTML from FORM data — never captures Tailwind DOM innerHTML
  const handlePrint = () => {
    const escapeHtml = (s) =>
      String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const patientName = escapeHtml(
      [patient?.user?.prenom, patient?.user?.nom, patient?.prenom, patient?.nom]
        .filter(Boolean)
        .join(" ")
        .trim(),
    );
    const medecinName = escapeHtml(
      [medecin?.user?.prenom, medecin?.user?.nom, medecin?.prenom, medecin?.nom]
        .filter(Boolean)
        .join(" ")
        .trim(),
    );
    const dateStr = escapeHtml(
      date
        ? new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "",
    );

    const rowsHtml = FORM.map((row) => {
      const colsHtml = row.columns
        .map((col) => {
          const active = col.items.some((item) =>
            isChecked(col.category, item),
          );
          const itemsHtml = col.items
            .map((item) => {
              const on = isChecked(col.category, item);
              return `<div class="item${on ? " on" : ""}">
                <div class="cb${on ? " on" : ""}"></div>
                <span class="lbl${on ? " on" : ""}">${item}</span>
              </div>`;
            })
            .join("");
          return `<div class="col">
            <div class="col-h${active ? " active" : ""}">${col.label}</div>
            <div class="col-b">${itemsHtml}</div>
          </div>`;
        })
        .join("");
      return `<div class="row">${colsHtml}</div>`;
    }).join("");

    const notesHtml =
      notes.length > 0
        ? `<div class="notes">
            <div class="notes-h">Notes du médecin</div>
            ${notes.map((n) => `<p>${n}</p>`).join("")}
          </div>`
        : "";

    const win = window.open("", "_blank", "width=960,height=700");
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Formulaire d'Analyses</title>
  <style>
    @page { size: A4; margin: 12mm 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; }

    .meta {
      display: flex;
      justify-content: center;
      gap: 20px;
      font-size: 8pt;
      margin-bottom: 10px;
      }
    h1 {
      text-align: center; font-size: 12pt; font-weight: 700;
      text-transform: uppercase; letter-spacing: .05em;
      border-bottom: 2px solid #111; padding-bottom: 6px; margin-bottom: 3px;
    }
    .sub { text-align: center; font-size: 8pt; color: #555; margin-bottom: 12px; }

    /* Layout — mirrors the card grid */
    .form { display: flex; flex-direction: column; gap: 7px; }
    .row  { display: flex; gap: 5px; align-items: flex-start; }
    .col  { flex: 1; border: 1px solid #bbb; border-radius: 4px; overflow: hidden; }

    /* Column header — mirrors SectionCard header */
    .col-h {
      background: #ebebeb; border-bottom: 1px solid #bbb;
      padding: 4px 8px; font-size: 7pt; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em; color: #444;
    }
    .col-h.active { background: #d0d0d0; color: #000; }

    /* Items */
    .col-b { padding: 4px 6px; display: flex; flex-direction: column; gap: 1px; }
    .item  { display: flex; align-items: center; gap: 5px; padding: 1px 3px; border-radius: 2px; }
    .item.on { background: #efefef; }

    /* Checkbox — pure CSS, no SVG, no emoji, no giant mark */
    .cb {
      width: 9px; height: 9px; flex-shrink: 0;
      border: 1.5px solid #aaa; border-radius: 1px; position: relative;
    }
    .cb.on { border-color: #111; }
    .cb.on::after {
      content: '';
      display: block;
      width: 3px; height: 5.5px;
      border: 1.5px solid #111;
      border-top: none; border-left: none;
      transform: rotate(44deg);
      position: absolute;
      top: 0; left: 2px;
    }

    /* Labels */
    .lbl    { font-size: 7.5pt; color: #555; line-height: 1.3; }
    .lbl.on { color: #111; font-weight: 600; }

    /* Notes */
    .notes   { margin-top: 10px; border: 1px solid #bbb; border-radius: 4px; padding: 8px 10px; }
    .notes-h { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #333; margin-bottom: 4px; }
    .notes p { font-size: 8pt; color: #222; font-style: italic; line-height: 1.5; }
  </style>
</head>
<body>
  <h1>Formulaire de Demande d'Analyses</h1>
  <p class="sub">Analyses prescrites — lecture seule</p>
  <div class="meta">
    <div><strong>Patient:</strong> ${patientName || "—"}</div>
    <div><strong>Médecin:</strong> ${medecinName || "—"}</div>
    <div><strong>Date:</strong> ${dateStr || "—"}</div>
  </div>
  <div class="form">${rowsHtml}</div>
  ${notesHtml}
</body>
</html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
  };

  const prescribedCount = analyses.length;

  return (
    <div>
      {/* Actions bar */}
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
          Imprimer
        </button>
      </div>

      {/* Legend */}
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

      {/* Printable form (display only — print uses generated HTML) */}
      <div ref={printRef}>
        <div className="space-y-3">
          {FORM.map((row) => (
            <div key={row.id} className="flex gap-2">
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

        {notes.length > 0 && (
          <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-primary mb-2">
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
    </div>
  );
}

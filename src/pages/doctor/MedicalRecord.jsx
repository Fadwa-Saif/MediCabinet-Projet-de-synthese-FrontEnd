import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  AlertCircle,
  CheckCircle,
  FlaskConical,
  Calendar,
  User,
  Droplet,
  AlertTriangle,
  Download,
  Stethoscope,
  ClipboardList,
  Activity,
  ChevronRight,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateShort = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Toast Component ─────────────────────────────────────────────────────────────

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium transition-all animate-fade-in
        ${type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
    >
      {type === "success" ? (
        <CheckCircle size={18} />
      ) : (
        <AlertCircle size={18} />
      )}
      {message}
    </div>
  );
}

// ─── Info Card ────────────────────────────────────────────────────────────────

const InfoCard = ({
  label,
  value,
  icon: Icon,
  colorClass = "text-primary",
}) => (
  <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
    <div
      className={`w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center ${colorClass}`}
    >
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
        {label}
      </p>
      <p className="font-semibold text-on-surface">{value}</p>
    </div>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 animate-pulse">
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-surface-container-high shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-container-high rounded w-1/4" />
        <div className="h-4 bg-surface-container-high rounded w-2/3" />
        <div className="h-3 bg-surface-container-high rounded w-1/3" />
      </div>
    </div>
  </div>
);

// ─── Consultation Card — navigate on click ────────────────────────────────────

const ConsultationCard = ({ consultation, index, onClick }) => {
  const ordonnances = consultation.ordonnances || [];
  const analyses = consultation.analyses || [];
  const doctorName = consultation.admin?.user
    ? `Dr. ${consultation.admin.user.prenom || ""} ${consultation.admin.user.nom || ""}`.trim()
    : consultation.medecin_nom || null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-outline-variant/30 hover:border-primary/30 hover:shadow-md bg-surface-container-lowest transition-all duration-200 group"
    >
      <div className="p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-on-surface-variant flex items-center justify-center text-sm font-bold shrink-0 transition-colors">
          {String(index).padStart(2, "0")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1.5">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-on-surface">
              <Calendar size={14} className="text-primary" />
              {formatDate(consultation.date || consultation.date_heure)}
            </span>
            {doctorName && (
              <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <User size={14} />
                {doctorName}
              </span>
            )}
          </div>

          {consultation.diagnostic && (
            <p className="text-on-surface font-medium text-sm leading-snug line-clamp-2">
              <span className="text-on-surface-variant font-normal">
                Diagnostic :{" "}
              </span>
              {consultation.diagnostic}
            </p>
          )}

          {consultation.symptomes && (
            <p className="text-on-surface-variant text-xs mt-1 line-clamp-1">
              Symptômes : {consultation.symptomes}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2.5 flex-wrap">
            {ordonnances.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-tertiary font-medium bg-tertiary-container/40 px-2 py-0.5 rounded-full">
                <ClipboardList size={11} />
                {ordonnances.length} ordonnance
                {ordonnances.length > 1 ? "s" : ""}
              </span>
            )}
            {analyses.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-secondary font-medium bg-secondary-container/40 px-2 py-0.5 rounded-full">
                <FlaskConical size={11} />
                {analyses.length} analyse{analyses.length > 1 ? "s" : ""}
              </span>
            )}
            {!ordonnances.length && !analyses.length && (
              <span className="text-xs text-outline italic">
                Pas de documents associés
              </span>
            )}
          </div>
        </div>

        <ChevronRight
          size={18}
          className="text-outline group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1"
        />
      </div>
    </button>
  );
};

// ─── PDF: FORM definition (mirrors LabAnalysisFormViewer) ─────────────────────

const PDF_FORM = [
  {
    id: "r1",
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
    id: "r2",
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
    id: "r3",
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
    id: "r4",
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
    id: "r5",
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
    id: "r6",
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
    id: "r7",
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

const pdfNorm = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

// ─── Build checked analysis grid HTML for PDF ─────────────────────────────────

const buildCheckedAnalysisGridHTML = (analyses = []) => {
  if (!analyses.length) {
    return "";
  }

  const selectedAnalyses = new Set(
    analyses
      .filter((a) => a.type_analyse)
      .map((a) => pdfNorm(a.type_analyse ?? "")),
  );

  const isOn = (item) => {
    const itemKey = pdfNorm(item);
    return selectedAnalyses.has(itemKey);
  };

  const rowsHtml = PDF_FORM.map(
    (row) =>
      `<div class="arow">${row.columns
        .map((col) => {
          const active = col.items.some((item) => isOn(item));
          return `<div class="acol">
        <div class="acol-h${active ? " active" : ""}">${col.label}</div>
        <div class="acol-b">${col.items
          .map((item) => {
            const on = isOn(item);
            return `<div class="aitem${on ? " aon" : ""}">
            <div class="acb${on ? " aon" : ""}"></div>
            <span class="albl${on ? " aon" : ""}">${item}</span>
          </div>`;
          })
          .join("")}</div>
      </div>`;
        })
        .join("")}</div>`,
  ).join("");

  return `<div class="aform">${rowsHtml}</div>`;
};

// ─── Build analysis form HTML for PDF ─────────────────────────────────────────

const buildAnalysisFormHTML = (analyses = [], isPatientView = false) => {
  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const displayAnalyses = isPatientView
    ? analyses.filter((a) => a.fichier)
    : analyses;

  if (!displayAnalyses.length) {
    const msg = isPatientView
      ? "Aucune analyse complétée à afficher."
      : "Aucune analyse prescrite pour cette consultation.";
    return `<p class="empty-sub">${msg}</p>`;
  }

  const rowsHtml = buildCheckedAnalysisGridHTML(displayAnalyses);

  const resultsHtml = displayAnalyses
    .filter((a) => a.fichier)
    .map((a) => {
      const fileName = a.fichier.split("/").pop();
      return `<div class="aresult">
        <div class="aresult-label">${esc(a.type_analyse || "Analyse")}</div>
        <div class="aresult-file">📎 ${esc(fileName)}</div>
        ${a.date_resultat ? `<div class="aresult-date">Résultat: ${formatDateShort(a.date_resultat)}</div>` : ""}
        ${a.commentaire_medecin ? `<div class="aresult-note">${esc(a.commentaire_medecin)}</div>` : ""}
      </div>`;
    })
    .join("");

  const notes = displayAnalyses
    .filter((a) => a.commentaire_medecin && !a.fichier)
    .map((a) => a.commentaire_medecin)
    .filter(Boolean);
  const notesHtml = notes.length
    ? `<div class="anotes"><strong>Notes :</strong> ${notes.join(" — ")}</div>`
    : "";

  return `${rowsHtml}${resultsHtml}${isPatientView ? "" : notesHtml}`;
};

// ─── PDF builder with enriched data (from API fetch) ────────────────────────

const buildPDFWithData = (
  consultations,
  fullName,
  patient,
  completedAnalyses = [],
) => {
  const patientInfo = patient?.patient || {};
  const bloodType = patientInfo?.groupe_sanguin || "—";
  const allergies = patientInfo?.allergies || "Aucune connue";
  const birthDate = patientInfo?.date_naissance
    ? formatDate(patientInfo.date_naissance)
    : "—";
  const dossierSince = patientInfo?.date_creation_dossier
    ? new Date(patientInfo.date_creation_dossier).getFullYear()
    : "—";

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const blocks = consultations
    .map((c, idx) => {
      const doctorName = c.admin?.user
        ? `Dr. ${c.admin.user.prenom || ""} ${c.admin.user.nom || ""}`.trim()
        : c.medecin_nom || "—";

      // Use enriched ordonnances and prescriptions from API fetch
      const ordonnances = c._ordonnances || [];
      const prescriptions = c._prescriptions || [];

      const ordRows =
        ordonnances
          .map((ord) => {
            const ordPrescriptions = prescriptions.filter(
              (p) => p.ordonnance_id === ord.id,
            );
            const prescs = ordPrescriptions
              .map(
                (p) => `
        <li>
          <strong>${esc(p.medicament_nom || "Médicament")}</strong>
          ${p.posologie ? ` — ${esc(p.posologie)}` : ""}
          ${p.quantite ? ` · Qté: ${esc(p.quantite)}` : ""}
          ${p.duree_traitement ? ` · Durée: ${esc(p.duree_traitement)}` : ""}
          ${p.observation ? `<br><em>${esc(p.observation)}</em>` : ""}
        </li>`,
              )
              .join("");
            return `<div class="sub-block">
        <div class="sub-label">Ordonnance — ${esc(formatDateShort(ord.date || ord.created_at))}</div>
        ${ord.instructions ? `<p class="sub-text"><em>${esc(ord.instructions)}</em></p>` : ""}
        ${prescs ? `<ul class="med-list">${prescs}</ul>` : `<p class="empty-sub">Aucun médicament prescrit.</p>`}
      </div>`;
          })
          .join("") || `<p class="empty-sub">Aucune ordonnance.</p>`;

      return `<div class="consult-block">
      <div class="consult-head">
        <div class="consult-num">${String(idx + 1).padStart(2, "0")}</div>
        <div>
          <div class="consult-date">${esc(formatDate(c.date || c.date_heure))}</div>
          <div class="consult-doctor">${esc(doctorName)}</div>
        </div>
      </div>
      ${c.motif ? `<div class="detail-row"><span class="detail-label">Motif</span><span>${esc(c.motif)}</span></div>` : ""}
      ${c.symptomes ? `<div class="detail-row"><span class="detail-label">Symptômes</span><span>${esc(c.symptomes)}</span></div>` : ""}
      ${c.diagnostic ? `<div class="diagnostic-box"><strong>Diagnostic :</strong> ${esc(c.diagnostic)}</div>` : ""}
      ${c.notes_medecin || c.notes || c.rapport ? `<div class="detail-row"><span class="detail-label">Notes</span><span class="italic">${esc(c.notes_medecin || c.notes || c.rapport)}</span></div>` : ""}
      <div class="section-title">🧾 Traitement / Ordonnances</div>
      ${ordRows}
      <div class="section-title">🔬 Analyses Complétées</div>
      ${buildAnalysisFormHTML(c._analyses || [], true)}
    </div>`;
    })
    .join("");

  const consultationIds = new Set(
    consultations.map((c) => String(c.id)).filter(Boolean),
  );

  const standaloneAnalyses = completedAnalyses.filter((a) => {
    const cid = a?.consultation_id;
    return !cid || !consultationIds.has(String(cid));
  });

  const standaloneAnalysesHtml = standaloneAnalyses.length
    ? `<div class="global-analyses">
      <div class="global-analyses-title">Analyses déjà faites par le patient</div>
      ${buildCheckedAnalysisGridHTML(standaloneAnalyses)}
      ${standaloneAnalyses
        .map((a) => {
          const fileName = (a.fichier || "").split("/").pop() || "fichier";
          return `<div class="aresult">
            <div class="aresult-label">${esc(a.type_analyse || "Analyse")}</div>
            <div class="aresult-info">
              ${a.date_resultat ? `<div class="aresult-date">📅 ${formatDateShort(a.date_resultat)}</div>` : ""}
              ${a.laboratoire ? `<div class="aresult-lab">🏥 ${esc(a.laboratoire)}</div>` : ""}
            </div>
            <div class="aresult-file">📎 ${esc(fileName)}</div>
            ${a.commentaire_medecin ? `<div class="aresult-note">${esc(a.commentaire_medecin)}</div>` : ""}
          </div>`;
        })
        .join("")}
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<title>Dossier Médical — ${esc(fullName)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
  @page { size: A4; margin: 14mm 16mm; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', Arial, sans-serif; color: #1a2744; background: #fff; font-size: 11px; line-height: 1.6; }

  /* ── Cover — light ── */
  .cover {
    background: linear-gradient(135deg, #fff 0%, #f8fbff 100%);
    border-bottom: 4px solid #1a4fd6;
    padding: 32px 36px 28px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .cover-eyebrow { font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #1a4fd6; margin-bottom: 8px; }
  .cover-title { font-family: 'DM Serif Display', Georgia, serif; font-size: 32px; color: #1a2744; letter-spacing: -.5px; line-height: 1.1; margin-bottom: 12px; font-weight: 700; }
  .cover-name { font-size: 18px; font-weight: 700; color: #1a2744; margin-bottom: 2px; }
  .cover-since { font-size: 10px; color: #6b7da8; }
  .cover-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; text-align: right; }
  .cover-badge {
    background: linear-gradient(135deg, #e8effc 0%, #dce7fb 100%);
    color: #1a4fd6; border: 1.5px solid #b8cdf8;
    border-radius: 8px; padding: 6px 14px;
    font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
  }
  .cover-date { font-size: 10px; color: #8898b8; margin-top: 4px; font-weight: 500; }

  /* ── Patient grid ── */
  .patient-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 2px solid #dce7fb; background: linear-gradient(135deg, #f4f7fd 0%, #eef3fb 100%); }
  .pcell { padding: 14px 20px; border-right: 1px solid #dce7fb; }
  .pcell:last-child { border-right: none; }
  .pcell-label { font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8898b8; margin-bottom: 4px; }
  .pcell-value { font-size: 13px; font-weight: 700; color: #1a2744; }

  /* ── Content ── */
  .content { padding: 28px 36px; }
  .content-title {
    font-family: 'DM Serif Display', Georgia, serif; font-size: 16px; color: #1a2744;
    border-bottom: 3px solid #1a4fd6; padding-bottom: 8px; margin-bottom: 20px;
    display: flex; justify-content: space-between; align-items: baseline;
  }
  .content-title span { font-family: 'DM Sans', Arial, sans-serif; font-size: 10px; color: #8898b8; font-weight: 500; }
  .global-analyses { margin: 0 0 16px; padding: 10px 12px; border: 1px solid #dce7fb; border-radius: 8px; background: #f7faff; }
  .global-analyses-title { font-size: 11px; font-weight: 700; color: #1a4fd6; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.8px; }

  /* ── Consultation block ── */
  .consult-block { margin-bottom: 18px; border: 1.5px solid #dce7fb; border-radius: 10px; overflow: hidden; page-break-inside: avoid; background: #ffffff; box-shadow: 0 1px 3px rgba(26, 79, 214, 0.08); }
  .consult-head { display: flex; align-items: center; gap: 14px; background: linear-gradient(135deg, #eef3fb 0%, #e8effc 100%); padding: 12px 16px; border-bottom: 1.5px solid #dce7fb; }
  .consult-num { width: 36px; height: 36px; background: linear-gradient(135deg, #1a4fd6 0%, #0f3aa3 100%); color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0; }
  .consult-date { font-weight: 700; font-size: 12px; color: #1a2744; }
  .consult-doctor { font-size: 10px; color: #6b7da8; margin-top: 2px; }
  .detail-row { display: flex; gap: 10px; padding: 7px 16px; font-size: 11px; border-bottom: 1px solid #f0f3fa; }
  .detail-label { font-weight: 700; color: #8898b8; width: 85px; flex-shrink: 0; font-size: 9.5px; text-transform: uppercase; letter-spacing: .6px; }
  .italic { font-style: italic; color: #3a4a6a; line-height: 1.4; }
  .diagnostic-box { margin: 10px 16px; padding: 11px 14px; background: linear-gradient(135deg, #eef3fb 0%, #e8effc 100%); border-left: 4px solid #1a4fd6; border-radius: 0 6px 6px 0; font-size: 11px; color: #1a2744; }
  .section-title { font-weight: 700; font-size: 9px; text-transform: uppercase; letter-spacing: 1.6px; color: #1a4fd6; padding: 11px 16px 6px; border-top: 1.5px solid #eef0f7; background: #fafbfd; }
  .sub-block { margin: 6px 16px 10px; padding: 9px 12px; background: linear-gradient(135deg, #f8faff 0%, #f4f7fd 100%); border: 1px solid #dce7fb; border-left: 3px solid #1a4fd6; border-radius: 6px; }
  .sub-label { font-weight: 700; font-size: 11px; color: #1a2744; margin-bottom: 4px; }
  .sub-text { font-size: 10.5px; color: #3a4a6a; margin-bottom: 3px; line-height: 1.4; }
  .med-list { padding-left: 18px; margin: 3px 0; }
  .med-list li { margin-bottom: 4px; font-size: 10.5px; color: #1a2744; line-height: 1.4; }
  .empty-sub { font-size: 10px; color: #9aabc4; font-style: italic; padding: 5px 16px 8px; }

  /* ── Analysis form ── */
  .aform { display: flex; flex-direction: column; gap: 4px; margin: 4px 16px 8px; }
  .arow { display: flex; gap: 4px; align-items: flex-start; }
  .acol { flex: 1; border: 1px solid #d0daf0; border-radius: 4px; overflow: hidden; }
  .acol-h { background: #f0f4fc; border-bottom: 1px solid #d0daf0; padding: 3px 7px; font-size: 6.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #6b7da8; }
  .acol-h.active { background: #dce7fb; color: #1a4fd6; }
  .acol-b { padding: 3px 5px; display: flex; flex-direction: column; gap: 1px; }
  .aitem { display: flex; align-items: center; gap: 4px; padding: 1px 2px; border-radius: 2px; }
  .aitem.aon { background: #eef3fb; }
  .acb { width: 8px; height: 8px; flex-shrink: 0; border: 1.5px solid #b0bdd8; border-radius: 1px; position: relative; }
  .acb.aon { border-color: #1a4fd6; background: #1a4fd6; }
  .acb.aon::after { content: '✓'; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 5pt; font-weight: 900; color: #fff; }
  .albl { font-size: 7pt; color: #7a8eab; line-height: 1.3; }
  .albl.aon { color: #1a2744; font-weight: 600; }
  .aresult { margin: 6px 16px; padding: 9px 12px; background: linear-gradient(135deg, #f0f7ff 0%, #f4f7fd 100%); border: 1px solid #c5d9f1; border-left: 4px solid #0f8643; border-radius: 6px; }
  .aresult-label { font-weight: 700; font-size: 11px; color: #1a2744; margin-bottom: 4px; }
  .aresult-info { display: flex; gap: 12px; margin-bottom: 4px; }
  .aresult-date { font-size: 9px; color: #6b7da8; }
  .aresult-lab { font-size: 9px; color: #6b7da8; }
  .aresult-file { font-size: 10px; color: #0059bb; margin: 3px 0; font-weight: 600; }
  .aresult-note { font-size: 10px; color: #3a4a6a; margin-top: 4px; line-height: 1.4; }
  .anotes { margin: 8px 16px; padding: 8px 12px; background: linear-gradient(135deg, #eef3fb 0%, #e8effc 100%); border: 1px solid #dce7fb; border-left: 3px solid #1a4fd6; border-radius: 6px; font-size: 10px; color: #3a4a6a; line-height: 1.4; }

  /* ── Footer ── */
  .footer { display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #9aabc4; border-top: 2px solid #dce7fb; padding: 16px 36px; margin-top: 28px; background: linear-gradient(135deg, #f4f7fd 0%, #f0f4fc 100%); }
</style>
</head>
<body>
  <div class="cover">
    <div>
      <div class="cover-eyebrow">Dossier Médical</div>
      <div class="cover-title">MediCabinet</div>
      <div class="cover-name">${esc(fullName)}</div>
      <div class="cover-since">Dossier depuis ${esc(String(dossierSince))}</div>
    </div>
    <div class="cover-right">
      <div class="cover-badge">Dossier Complet</div>
      <div class="cover-date">${new Date().toLocaleDateString("fr-FR")}</div>
    </div>
  </div>

  <div class="patient-grid">
    <div class="pcell"><div class="pcell-label">Groupe Sanguin</div><div class="pcell-value">${esc(bloodType)}</div></div>
    <div class="pcell"><div class="pcell-label">Allergies</div><div class="pcell-value">${esc(allergies)}</div></div>
    <div class="pcell"><div class="pcell-label">Date de Naissance</div><div class="pcell-value">${esc(birthDate)}</div></div>
    <div class="pcell"><div class="pcell-label">Consultations</div><div class="pcell-value">${consultations.length}</div></div>
  </div>

  <div class="content">
    <div class="content-title">Historique de Consultations <span>${consultations.length} consultation${consultations.length !== 1 ? "s" : ""}</span></div>
    ${standaloneAnalysesHtml}
    ${blocks || `<p class="empty-sub">Aucune consultation enregistrée.</p>`}
  </div>

  <div class="footer">
    <span>Document généré automatiquement — MediCabinet</span>
    <span>Usage médical uniquement</span>
  </div>

</body>
</html>`;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function MedicalRecord() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const isDoctorView = !!patientId;
  const userRole = isDoctorView ? "medecin" : "patient";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [pdfExporting, setPdfExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState("");
  const [toast, setToast] = useState(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isDoctorView) {
          const { data } = await api.get(`/patients/${patientId}`);
          const pd = data?.data || data;
          setPatient({
            nom: pd?.user?.nom,
            prenom: pd?.user?.prenom,
            patient: pd,
          });
          setConsultations(
            [...(pd?.consultations || [])].sort(
              (a, b) => new Date(b.date || 0) - new Date(a.date || 0),
            ),
          );
          return;
        }

        const meRes = await api.get("/auth/me");
        setPatient(meRes.data.user || meRes.data);

        const consultRes = await api.get("/consultations");
        const raw = consultRes.data?.data || consultRes.data || [];

        // Patient view: avoid /consultations/:id (doctor-only endpoint)
        const [ordRes, anaRes] = await Promise.all([
          api.get("/ordonnances").catch(() => ({ data: {} })),
          api.get("/analyses").catch(() => ({ data: {} })),
        ]);

        const allOrdonnances = Array.isArray(ordRes.data?.data)
          ? ordRes.data.data
          : (ordRes.data ?? []);
        const allAnalyses = Array.isArray(anaRes.data?.data)
          ? anaRes.data.data
          : (anaRes.data ?? []);

        const enriched = raw.map((c) => ({
          ...c,
          ordonnances: allOrdonnances.filter(
            (o) => String(o.consultation_id) === String(c.id),
          ),
          analyses: allAnalyses.filter(
            (a) => String(a.consultation_id) === String(c.id),
          ),
        }));

        setConsultations(
          enriched.sort(
            (a, b) =>
              new Date(b.date || b.date_heure || 0) -
              new Date(a.date || a.date_heure || 0),
          ),
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Impossible de charger le dossier médical.",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isDoctorView, patientId]);

  // ── Navigate to detail page ────────────────────────────────────────────────
  const handleCardClick = (id) => {
    navigate(
      isDoctorView
        ? `/medecin/consultations/${id}`
        : `/patient/consultations/${id}`,
    );
  };

  // ── PDF Export ─────────────────────────────────────────────────────────────
  const handleExportPDF = useCallback(async () => {
    try {
      setPdfExporting(true);
      setExportProgress("Préparation du document...");

      const fullName = patient
        ? `${patient.prenom || ""} ${patient.nom || ""}`.trim()
        : "Patient";

      setExportProgress("Récupération des données...");

      // Fetch ordonnances, prescriptions and analyses in parallel
      const [ordRes, presRes, anaRes] = await Promise.all([
        api.get("/ordonnances").catch(() => ({ data: {} })),
        api.get("/prescriptions").catch(() => ({ data: {} })),
        api.get("/analyses").catch(() => ({ data: {} })),
      ]);

      const allOrdonnances = Array.isArray(ordRes.data?.data)
        ? ordRes.data.data
        : (ordRes.data ?? []);
      const allPrescriptions = Array.isArray(presRes.data?.data)
        ? presRes.data.data
        : (presRes.data ?? []);
      const allAnalyses = Array.isArray(anaRes.data?.data)
        ? anaRes.data.data
        : (anaRes.data ?? []);

      const currentPatientId = patient?.patient?.id || null;
      const completedAnalyses = allAnalyses
        .filter((a) => Boolean(a?.fichier))
        .filter((a) =>
          currentPatientId
            ? String(a?.patient_id) === String(currentPatientId)
            : true,
        )
        .sort(
          (a, b) =>
            new Date(b?.date_resultat || b?.date_analyse || 0) -
            new Date(a?.date_resultat || a?.date_analyse || 0),
        );

      setExportProgress("Enrichissement des données...");

      // Enrich consultations with their ordonnances, prescriptions and analyses
      const enrichedConsultations = consultations.map((c) => {
        const ordonnances = allOrdonnances.filter(
          (o) => String(o.consultation_id) === String(c.id),
        );
        const ordonnanceIds = ordonnances.map((o) => o.id);
        const prescriptions = allPrescriptions.filter((p) =>
          ordonnanceIds.includes(p.ordonnance_id),
        );
        const analyses = allAnalyses.filter(
          (a) => String(a.consultation_id) === String(c.id),
        );

        return {
          ...c,
          _ordonnances: ordonnances,
          _prescriptions: prescriptions,
          _analyses: analyses,
        };
      });

      setExportProgress("Génération du document...");

      // Build HTML content
      const html = buildPDFWithData(
        enrichedConsultations,
        fullName,
        patient,
        completedAnalyses,
      );

      // Create a hidden container with all styles embedded
      const container = document.createElement("div");
      const styledHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');@page{size:A4;margin:14mm 16mm}*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',Arial,sans-serif;color:#1a2744;background:#fff;font-size:11px;line-height:1.6}.cover{background:#fff;border-bottom:3px solid #1a4fd6;padding:26px 32px 20px;display:flex;justify-content:space-between;align-items:flex-start}.cover-eyebrow{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:#1a4fd6;margin-bottom:5px}.cover-title{font-family:'DM Serif Display',Georgia,serif;font-size:26px;color:#1a2744;letter-spacing:-.3px;line-height:1.1;margin-bottom:14px}.cover-name{font-size:16px;font-weight:700;color:#1a2744;margin-bottom:2px}.cover-since{font-size:10px;color:#6b7da8}.cover-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px}.cover-badge{background:#e8effc;color:#1a4fd6;border:1.5px solid #b8cdf8;border-radius:6px;padding:4px 12px;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px}.cover-date{font-size:9px;color:#8898b8;margin-top:3px}.patient-grid{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:2px solid #dce7fb;background:#f4f7fd}.pcell{padding:11px 18px;border-right:1px solid #dce7fb}.pcell:last-child{border-right:none}.pcell-label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#8898b8;margin-bottom:3px}.pcell-value{font-size:12px;font-weight:700;color:#1a2744}.content{padding:20px 32px}.content-title{font-family:'DM Serif Display',Georgia,serif;font-size:15px;color:#1a2744;border-bottom:2px solid #1a4fd6;padding-bottom:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:baseline}.content-title span{font-family:'DM Sans',Arial,sans-serif;font-size:10px;color:#8898b8;font-weight:500}.consult-block{margin-bottom:20px;border:1px solid #d0daf0;border-radius:8px;overflow:hidden;page-break-inside:avoid}.consult-head{display:flex;align-items:center;gap:12px;background:#eef3fb;padding:10px 16px;border-bottom:1px solid #d0daf0}.consult-num{width:30px;height:30px;background:#1a4fd6;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0}.consult-date{font-weight:700;font-size:12px;color:#1a2744}.consult-doctor{font-size:10px;color:#6b7da8;margin-top:1px}.detail-row{display:flex;gap:10px;padding:5px 16px;font-size:11px;border-bottom:1px solid #f0f3fa}.detail-label{font-weight:700;color:#8898b8;width:80px;flex-shrink:0;font-size:10px;text-transform:uppercase;letter-spacing:.5px}.italic{font-style:italic;color:#3a4a6a}.diagnostic-box{margin:8px 16px;padding:9px 12px;background:#eef3fb;border-left:3px solid #1a4fd6;border-radius:0 6px 6px 0;font-size:11px;color:#1a2744}.section-title{font-weight:700;font-size:8.5px;text-transform:uppercase;letter-spacing:1.5px;color:#8898b8;padding:9px 16px 4px;border-top:1px solid #eef0f7}.sub-block{margin:4px 16px 8px;padding:7px 11px;background:#f8faff;border:1px solid #dce7fb;border-radius:6px}.sub-label{font-weight:700;font-size:10.5px;color:#1a2744;margin-bottom:3px}.sub-text{font-size:10.5px;color:#3a4a6a;margin-bottom:3px}.med-list{padding-left:16px}.med-list li{margin-bottom:3px;font-size:10.5px;color:#1a2744}.empty-sub{font-size:10px;color:#9aabc4;font-style:italic;padding:3px 16px 7px}.aform{display:flex;flex-direction:column;gap:4px;margin:4px 16px 8px}.arow{display:flex;gap:4px;align-items:flex-start}.acol{flex:1;border:1px solid #d0daf0;border-radius:4px;overflow:hidden}.acol-h{background:#f0f4fc;border-bottom:1px solid #d0daf0;padding:3px 7px;font-size:6.2pt;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7da8}.acol-h.active{background:#dce7fb;color:#1a4fd6}.acol-b{padding:3px 5px;display:flex;flex-direction:column;gap:1px}.aitem{display:flex;align-items:center;gap:4px;padding:1px 2px;border-radius:2px}.aitem.aon{background:#eef3fb}.acb{width:8px;height:8px;flex-shrink:0;border:1.5px solid #b0bdd8;border-radius:1px;position:relative}.acb.aon{border-color:#1a4fd6;background:#1a4fd6}.acb.aon::after{content:'✓';display:flex;width:100%;height:100%;align-items:center;justify-content:center;font-size:5pt;font-weight:900;color:#fff}.albl{font-size:7pt;color:#7a8eab;line-height:1.3}.albl.aon{color:#1a2744;font-weight:600}.aresult{margin:6px 16px;padding:7px 10px;background:#f8faff;border:1px solid #dce7fb;border-left:3px solid #1a4fd6;border-radius:4px}.aresult-label{font-weight:700;font-size:10px;color:#1a2744;margin-bottom:3px}.aresult-file{font-size:9px;color:#0059bb;margin:2px 0}.aresult-date{font-size:8px;color:#6b7da8;margin-top:2px}.aresult-note{font-size:9px;color:#3a4a6a;font-style:italic;margin-top:3px}.anotes{margin:6px 16px;padding:6px 10px;background:#eef3fb;border-radius:5px;font-size:10px;color:#3a4a6a;font-style:italic}.footer{display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#9aabc4;border-top:1px solid #dce7fb;padding-top:14px;margin-top:30px}</style></head><body>${html
        .replace(/<html[^>]*>/i, "")
        .replace(/<head[^>]*>[\s\S]*?<\/head>/i, "")
        .replace(/<body[^>]*>/, "")
        .replace(/<\/body>/, "")
        .replace(/<\/html>/, "")}</body></html>`;

      const extractedCss =
        html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || "";

      container.innerHTML = styledHtml.replace(
        /<style>[\s\S]*?<\/style>/i,
        `<style>${extractedCss}</style>`,
      );
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "210mm";
      container.style.background = "#fff";
      container.style.top = "0";
      container.style.width = "210mm";
      container.style.background = "#fff";
      document.body.appendChild(container);

      document.body.appendChild(container);

      setExportProgress("Rendu du PDF...");

      // Use html2canvas with scale 3 for higher quality
      const canvas = await html2canvas(container.firstChild, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(container);

      // Calculate page dimensions
      const pageHeightPx = 297 * 3; // A4 height * scale
      const pageWidthPx = 210 * 3; // A4 width * scale
      const canvasHeight = canvas.height;
      const totalPages = Math.ceil(canvasHeight / pageHeightPx);

      setExportProgress("Assemblage des pages...");

      // Create PDF with calculated dimensions
      const pdf = new jsPDF("p", "mm", "A4");
      const imgWidth = 210;
      const imgHeight = (pageHeightPx / pageWidthPx) * imgWidth;

      // Process each page
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        // Create a temporary canvas for this page
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = pageWidthPx;
        pageCanvas.height = pageHeightPx;

        const ctx = pageCanvas.getContext("2d");
        const sourceY = page * pageHeightPx;

        // Draw the relevant portion of the full canvas
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          pageWidthPx,
          Math.min(pageHeightPx, canvasHeight - sourceY),
          0,
          0,
          pageWidthPx,
          Math.min(pageHeightPx, canvasHeight - sourceY),
        );

        // Convert page to image data
        const pageImageData = pageCanvas.toDataURL("image/png");

        // Add to PDF
        pdf.addImage(pageImageData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      setExportProgress("Téléchargement...");

      // Save the PDF
      const filename = `${fullName.replace(/\s+/g, "_")}_MedicalRecord_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(filename);

      // Success
      setToast({ message: "PDF exporté avec succès!", type: "success" });
      setPdfExporting(false);
      setExportProgress("");
    } catch (err) {
      console.error("PDF Export Error:", err);
      setToast({
        message: `Erreur lors de l'export du PDF: ${err.message}`,
        type: "error",
      });
      setPdfExporting(false);
      setExportProgress("");
    }
  }, [patient, consultations]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const fullName = patient
    ? `${patient.prenom || ""} ${patient.nom || ""}`.trim()
    : "Patient";
  const patientInfo = patient?.patient || {};
  const lastConsult = consultations[0]
    ? formatDate(consultations[0].date || consultations[0].date_heure)
    : "Aucune";

  return (
    <Navbar userRole={userRole} pageTitle="Dossier Médical">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Loading Overlay for PDF Export */}
      {pdfExporting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Download className="text-primary" size={28} />
            </div>
            <h2 className="text-xl font-bold text-on-background mb-2">
              Génération du PDF
            </h2>
            <p className="text-on-surface-variant mb-6 min-h-12 flex items-center justify-center">
              {exportProgress}
            </p>
            <div className="w-full bg-outline-variant/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full animate-pulse"
                style={{ width: "100%" }}
              />
            </div>
            <p className="text-xs text-outline mt-4">Veuillez patienter...</p>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main className="pt-6 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
        <header className="mb-8">
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-2">
            Dossier Médical
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
            {isDoctorView ? "Dossier du patient" : "Mon Dossier de Santé"}
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">
            {isDoctorView
              ? "Consultations et documents médicaux complets du patient."
              : "Vos consultations et documents médicaux."}
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3 border border-error/20">
            <AlertCircle size={22} />
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-auto text-sm underline font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Patient card */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden mb-8">
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary" />
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-5 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-primary font-bold text-xl">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-headline font-bold text-on-surface">
                    {fullName}
                  </h2>
                  <p className="text-on-surface-variant text-sm flex items-center gap-1.5 mt-0.5">
                    <Activity size={13} className="text-primary" />
                    {consultations.length} consultation
                    {consultations.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-high hover:bg-secondary-container text-secondary hover:text-on-secondary-container rounded-xl font-semibold text-sm transition-all border border-outline-variant hover:border-secondary/30"
              >
                <Download size={16} />
                Exporter PDF
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <InfoCard
                label="Naissance"
                value={
                  patientInfo?.date_naissance
                    ? formatDate(patientInfo.date_naissance)
                    : "—"
                }
                icon={Calendar}
              />
              <InfoCard
                label="Groupe sanguin"
                value={patientInfo?.groupe_sanguin || "—"}
                icon={Droplet}
                colorClass="text-tertiary"
              />
              <InfoCard
                label="Allergies"
                value={patientInfo?.allergies || "Aucune connue"}
                icon={AlertTriangle}
                colorClass={
                  patientInfo?.allergies ? "text-error" : "text-primary"
                }
              />
              <InfoCard
                label="Dernière consult"
                value={lastConsult}
                icon={Stethoscope}
              />
            </div>
          </div>
        </section>

        {/* Consultations */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
              <Stethoscope size={20} className="text-primary" />
              Consultations
            </h3>
            <span className="text-xs text-outline font-label uppercase tracking-wider">
              {consultations.length} au total
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : consultations.length === 0 ? (
            <div className="bg-surface-container-lowest p-12 rounded-2xl text-center border border-outline-variant/20">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
                <Stethoscope size={32} className="text-outline" />
              </div>
              <p className="text-on-surface-variant text-base mb-1">
                Aucune consultation enregistrée
              </p>
              <p className="text-outline text-sm">
                Les consultations passées apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {consultations.map((c, i) => (
                <ConsultationCard
                  key={c.id || i}
                  consultation={c}
                  index={i + 1}
                  onClick={() => handleCardClick(c.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </Navbar>
  );
}

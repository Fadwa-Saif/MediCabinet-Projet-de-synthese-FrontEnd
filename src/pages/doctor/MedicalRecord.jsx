import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  Download,
  AlertCircle,
  FileText,
  Pill,
  FlaskConical,
  StickyNote,
  ChevronRight,
  Calendar,
  User,
  Droplet,
  AlertTriangle,
  Eye,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("actif") || s.includes("active") || s.includes("confirmé")) {
    return "bg-tertiary-container text-on-tertiary-container";
  }
  if (
    s.includes("complété") ||
    s.includes("completed") ||
    s.includes("terminé")
  ) {
    return "bg-primary-fixed text-on-primary-fixed";
  }
  if (s.includes("annulé") || s.includes("cancelled")) {
    return "bg-error-container text-on-error-container";
  }
  return "bg-surface-variant text-on-surface-variant";
};

// ─── Tab Button Component ───────────────────────────────────────────────────

const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
      active
        ? "text-primary border-primary bg-primary-container/30"
        : "text-on-surface-variant border-transparent hover:text-on-surface hover:bg-surface-container"
    }`}
  >
    <Icon
      size={18}
      className={active ? "text-primary" : "text-on-surface-variant"}
    />
    <span>{label}</span>
    {count > 0 && (
      <span
        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
          active
            ? "bg-primary text-on-primary"
            : "bg-surface-container-high text-on-surface-variant"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// ─── Info Card Component ────────────────────────────────────────────────────

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

// ─── Record Card Component ──────────────────────────────────────────────────

const RecordCard = ({ item, type, onClick, onVoir }) => {
  const icons = {
    historique: FileText,
    prescriptions: Pill,
    analyses: FlaskConical,
    notes: StickyNote,
  };
  const Icon = icons[type] || FileText;
  const isAnalyse = type === "analyses";

  return (
    <div
      onClick={onClick}
      className="group bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md hover:bg-surface transition-all cursor-pointer border border-outline-variant/30 hover:border-primary/20"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary-container transition-colors">
            <Icon size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline font-bold text-lg text-on-surface truncate">
              {item.titre || item.title || item.medicament || "—"}
            </h3>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                <Calendar size={14} />
                {formatDate(
                  item.date || item.created_at || item.date_prescription,
                )}
              </span>
              {item.medecin_nom && (
                <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                  <User size={14} />
                  {item.medecin_nom}
                </span>
              )}
            </div>
            <p className="text-on-surface-variant text-sm mt-2 line-clamp-2">
              {item.description ||
                item.notes ||
                item.resultat ||
                "Pas de description disponible"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(item.statut)}`}
          >
            {item.statut || "Actif"}
          </span>

          {/* ── "Voir" button for analyses ── */}
          {isAnalyse ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVoir?.();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container/50 hover:bg-secondary-container text-secondary text-xs font-bold uppercase tracking-wide transition-all group-hover:shadow-sm"
            >
              <Eye size={14} />
              Voir
            </button>
          ) : (
            <ChevronRight
              size={20}
              className="text-outline group-hover:text-primary group-hover:translate-x-1 transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Loading Skeleton ────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-surface-container-lowest p-5 rounded-xl animate-pulse">
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-surface-container-high shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-surface-container-high rounded w-1/3" />
        <div className="h-4 bg-surface-container-high rounded w-1/4" />
        <div className="h-4 bg-surface-container-high rounded w-3/4" />
      </div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export function MedicalRecord() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "historique",
  );

  // Determine if this is doctor viewing a patient or patient viewing their own record
  const isDoctorView = !!patientId;
  const userRole = isDoctorView ? "medecin" : "patient";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [patient, setPatient] = useState(null);
  const [historique, setHistorique] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [notes, setNotes] = useState([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch patient profile
        const patientRes = await api.get("/auth/me");
        const userData = patientRes.data.user || patientRes.data;
        setPatient(userData);

        const historiqueRes = await api.get("/consultations");
        const allConsultations =
          historiqueRes.data.data || historiqueRes.data || [];
        const pastConsultations = allConsultations
          .map((c) => ({
            id: c.id,
            titre: `Consultation du ${new Date(c.date).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            )}`,
            date: c.date,
            description: c.diagnostic || c.symptomes || "Consultation médicale",
            medecin_nom: c.medecin_nom || "Médecin",
            statut: c.statut || "Complétée",
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistorique(pastConsultations);

        // Fetch prescriptions
        try {
          const ordRes = await api.get("/ordonnances");
          setPrescriptions(ordRes.data.data || ordRes.data || []);
        } catch (err) {
          console.warn("Failed to fetch prescriptions:", err);
          setPrescriptions([]);
        }

        // Fetch analyses
        try {
          const analysesRes = await api.get("/analyses");
          const rawAnalyses = analysesRes.data.data || analysesRes.data || [];
          setAnalyses(
            rawAnalyses.map((a) => ({
              id: a.id,
              titre: a.type_analyse || `Analyse #${a.id}`,
              date: a.created_at,
              description: a.commentaire_medecin || a.description || "",
              statut: a.fichier ? "Résultat reçu" : "En attente",
              fichier: a.fichier ?? null,
              consultation_id: a.consultation_id,
            })),
          );
        } catch (err) {
          console.warn("Failed to fetch analyses:", err);
          setAnalyses([]);
        }

        // Fetch notes (from consultations or dedicated endpoint)
        try {
          const notesRes = await api.get("/consultations");
          const consultations = notesRes.data.data || notesRes.data || [];
          // Extract notes from consultations
          const extractedNotes = consultations
            .filter((c) => c.notes || c.resume)
            .map((c) => ({
              id: c.id,
              titre: `Consultation du ${formatDate(c.date_heure)}`,
              date: c.date_heure,
              description: c.notes || c.resume,
              medecin_nom: c.medecin_nom,
              statut: "Complété",
            }));
          setNotes(extractedNotes);
        } catch (err) {
          console.warn("Failed to fetch notes:", err);
          setNotes([]);
        }
      } catch (err) {
        console.error("Medical record fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Impossible de charger le dossier médical.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, []);

  const getTabData = () => {
    switch (activeTab) {
      case "prescriptions":
        return {
          data: prescriptions,
          count: prescriptions.length,
          label: "Prescriptions",
        };
      case "analyses":
        return { data: analyses, count: analyses.length, label: "Analyses" };
      case "notes":
        return { data: notes, count: notes.length, label: "Notes" };
      default:
        return {
          data: historique,
          count: historique.length,
          label: "Historique",
        };
    }
  };

  const { data: tabData, count, label } = getTabData();

  const handleExportPDF = () => {
    const previousTitle = document.title;
    document.title = `Dossier_Medical_${fullName.replace(/\s+/g, "_")}`;
    window.print();
    document.title = previousTitle;
  };

  const fullName = patient
    ? `${patient.prenom || ""} ${patient.nom || ""}`.trim()
    : "Patient";

  const patientInfo = patient?.patient || {};
  const bloodType = patientInfo.groupe_sanguin || "—";
  const allergies = patientInfo.allergies || "Aucune connue";
  const birthDate = patientInfo.date_naissance
    ? formatDate(patientInfo.date_naissance)
    : "—";

  // ─── Navigate from card ──────────────────────────────────────────────────
  const handleCardClick = (item) => {
    if (activeTab === "prescriptions") {
      navigate(`/patient/ordonnances/${item.id}`);
    } else if (activeTab === "analyses") {
      navigate(
        isDoctorView
          ? `/medecin/analyses/${item.id}`
          : `/patient/analyses/${item.id}`,
      );
    } else {
      navigate(`/patient/rendezvous/${item.id}`);
    }
  };

  return (
    <Navbar userRole={userRole} pageTitle="Dossier Médical">
      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-8">
          <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
            Dossier Médical
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
            Mon Dossier de Santé
          </h1>
          <p className="text-on-surface-variant mt-2">
            Consultez votre historique médical complet et vos documents
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3 border border-error/20">
            <AlertCircle size={24} />
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-auto text-sm underline font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Patient Info Card - Material Design 3 Elevated Card */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden mb-8">
          {/* Card Header with Primary Accent */}
          <div className="h-2 bg-primary-container" />

          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
              {/* Patient Identity */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-primary font-bold text-2xl">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-headline font-bold text-on-surface">
                    {fullName}
                  </h2>
                  <p className="text-on-surface-variant">
                    Patient depuis{" "}
                    {patientInfo.date_creation_dossier
                      ? new Date(
                          patientInfo.date_creation_dossier,
                        ).getFullYear()
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high hover:bg-secondary-container text-secondary hover:text-on-secondary-container rounded-xl font-medium transition-all border border-outline-variant hover:border-secondary/30"
              >
                <Download size={18} />
                Exporter PDF
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <InfoCard
                label="Date de naissance"
                value={birthDate}
                icon={Calendar}
              />
              <InfoCard
                label="Groupe sanguin"
                value={bloodType}
                icon={Droplet}
                colorClass="text-tertiary"
              />
              <InfoCard
                label="Allergies"
                value={allergies}
                icon={AlertTriangle}
                colorClass={
                  allergies !== "Aucune connue" ? "text-error" : "text-primary"
                }
              />
              <InfoCard
                label="Dernière consultation"
                value={
                  historique[0] ? formatDate(historique[0].date) : "Aucune"
                }
                icon={FileText}
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-outline-variant/50 overflow-x-auto">
              <TabButton
                active={activeTab === "historique"}
                onClick={() => setActiveTab("historique")}
                icon={FileText}
                label="Historique"
                count={historique.length}
              />
              <TabButton
                active={activeTab === "prescriptions"}
                onClick={() => setActiveTab("prescriptions")}
                icon={Pill}
                label="Prescriptions"
                count={prescriptions.length}
              />
              <TabButton
                active={activeTab === "analyses"}
                onClick={() => setActiveTab("analyses")}
                icon={FlaskConical}
                label="Analyses"
                count={analyses.length}
              />
              <TabButton
                active={activeTab === "notes"}
                onClick={() => setActiveTab("notes")}
                icon={StickyNote}
                label="Notes"
                count={notes.length}
              />
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
              {activeTab === "historique" && (
                <FileText className="text-primary" size={24} />
              )}
              {activeTab === "prescriptions" && (
                <Pill className="text-tertiary" size={24} />
              )}
              {activeTab === "analyses" && (
                <FlaskConical className="text-secondary" size={24} />
              )}
              {activeTab === "notes" && (
                <StickyNote className="text-primary" size={24} />
              )}
              {label}
            </h3>
            <span className="text-sm font-label text-outline uppercase tracking-wider">
              {count} élément{count !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="grid gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : tabData.length === 0 ? (
            <div className="bg-surface-container-lowest p-12 rounded-2xl text-center border border-outline-variant/20">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
                {activeTab === "historique" && (
                  <FileText size={32} className="text-outline" />
                )}
                {activeTab === "prescriptions" && (
                  <Pill size={32} className="text-outline" />
                )}
                {activeTab === "analyses" && (
                  <FlaskConical size={32} className="text-outline" />
                )}
                {activeTab === "notes" && (
                  <StickyNote size={32} className="text-outline" />
                )}
              </div>
              <p className="text-on-surface-variant text-lg mb-2">
                Aucun {label.toLowerCase()} trouvé
              </p>
              <p className="text-outline text-sm">
                {activeTab === "historique"
                  ? "Vos consultations passées apparaîtront ici."
                  : activeTab === "prescriptions"
                    ? "Vos ordonnances actives et passées seront listées ici."
                    : `Vos ${label.toLowerCase()} seront disponibles ici.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tabData.map((item) => (
                <RecordCard
                  key={item.id}
                  item={item}
                  type={activeTab}
                  onClick={() => handleCardClick(item)}
                  onVoir={() => navigate(`/patient/analyses/${item.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Material Icons Styles */}
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </Navbar>
  );
}

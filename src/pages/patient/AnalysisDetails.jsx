import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  ArrowLeft,
  Calendar,
  User,
  FlaskConical,
  FileText,
  Download,
  AlertCircle,
  Clock,
  MessageSquare,
  Stethoscope,
  ExternalLink,
  CheckCircle2,
  HourglassIcon,
  Tag,
  Building2,
  ClipboardList,
  ImageIcon,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ANALYSIS_TYPE_LABELS = {
  blood: { label: "Analyse Sanguine", icon: "🩸" },
  urine: { label: "Analyse d'Urine", icon: "💧" },
  imaging: { label: "Imagerie Médicale", icon: "🩻" },
  biopsy: { label: "Biopsie", icon: "🔬" },
  genetic: { label: "Test Génétique", icon: "🧬" },
  other: { label: "Autre", icon: "📋" },
};

const getTypeInfo = (typeKey) =>
  ANALYSIS_TYPE_LABELS[typeKey] || { label: typeKey || "Analyse", icon: "🔬" };

const getStatusConfig = (statut, fichier) => {
  if (fichier) {
    return {
      label: "Résultat reçu",
      icon: CheckCircle2,
      className: "bg-tertiary-container text-on-tertiary-container",
      dot: "bg-tertiary",
    };
  }
  return {
    label: "En attente",
    icon: HourglassIcon,
    className: "bg-surface-variant text-on-surface-variant",
    dot: "bg-outline",
  };
};

// ─── Info Row Component ──────────────────────────────────────────────────────

const InfoRow = ({ icon: Icon, label, value, colorClass = "text-primary" }) => (
  <div className="flex items-start gap-3 py-3 border-b border-outline-variant/20 last:border-0">
    <div
      className={`w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 mt-0.5 ${colorClass}`}
    >
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-outline uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-on-surface font-medium break-words">{value || "—"}</p>
    </div>
  </div>
);

// ─── Section Card ────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  icon: Icon,
  iconColorClass = "text-primary",
  children,
}) => (
  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/20 bg-surface-container-low/50">
      <div
        className={`w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center ${iconColorClass}`}
      >
        <Icon size={18} />
      </div>
      <h2 className="font-headline font-bold text-on-surface text-base">
        {title}
      </h2>
    </div>
    <div className="px-6 py-4">{children}</div>
  </div>
);

// ─── File Viewer ─────────────────────────────────────────────────────────────

const FileViewer = ({ fichierUrl, fichier }) => {
  if (!fichierUrl) return null;

  const ext = fichierUrl.split(".").pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  const isPdf = ext === "pdf";

  return (
    <div className="space-y-4">
      {/* Preview */}
      {isImage ? (
        <div className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container">
          <img
            src={fichierUrl}
            alt="Résultat d'analyse"
            className="w-full max-h-[480px] object-contain"
          />
        </div>
      ) : isPdf ? (
        <div className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container">
          <iframe
            src={`${fichierUrl}#view=FitH`}
            title="Résultat PDF"
            className="w-full h-[480px]"
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low border border-outline-variant/20">
          <div className="w-14 h-14 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
            <FileText size={28} className="text-secondary" />
          </div>
          <div>
            <p className="font-medium text-on-surface">
              {fichier?.split("/").pop() || "Document"}
            </p>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Cliquez sur le bouton ci-dessous pour télécharger
            </p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <a
          href={fichierUrl}
          download
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-medium shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <Download size={18} />
          Télécharger le fichier
        </a>
        <a
          href={fichierUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high hover:bg-secondary-container text-secondary hover:text-on-secondary-container rounded-xl font-medium transition-all border border-outline-variant"
        >
          <ExternalLink size={18} />
          Ouvrir dans un onglet
        </a>
      </div>
    </div>
  );
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

const SkeletonSection = () => (
  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6 animate-pulse space-y-4">
    <div className="h-5 bg-surface-container-high rounded w-1/3" />
    <div className="h-4 bg-surface-container-high rounded w-2/3" />
    <div className="h-4 bg-surface-container-high rounded w-1/2" />
    <div className="h-4 bg-surface-container-high rounded w-3/4" />
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export function AnalysisDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analyse, setAnalyse] = useState(null);
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all analyses and find the target
        const res = await api.get("/analyses");
        const all = res.data.data || res.data || [];
        const found = all.find((a) => String(a.id) === String(id));

        if (!found) {
          setError("Analyse introuvable.");
          return;
        }

        setAnalyse(found);

        // Fetch linked consultation if available
        if (found.consultation_id) {
          try {
            const cRes = await api.get(
              `/consultations/${found.consultation_id}`,
            );
            setConsultation(cRes.data.data || cRes.data);
          } catch {
            // Consultation fetch is optional – silently skip
          }
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Impossible de charger les détails de l'analyse.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const typeInfo = getTypeInfo(analyse?.type_analyse);
  const statusConfig = getStatusConfig(analyse?.statut, analyse?.fichier);
  const StatusIcon = statusConfig.icon;

  return (
    <Navbar userRole="patient" pageTitle="Détail de l'Analyse">
      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Back navigation */}
        <button
          onClick={() => navigate("/patient/dossier?tab=analyses")}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium text-sm">Retour au dossier médical</span>
        </button>

        {/* Header */}
        <header className="mb-8">
          <p className="text-secondary font-label text-sm uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
            <FlaskConical size={14} />
            Résultat d'analyse
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
              {analyse ? typeInfo.icon + " " + typeInfo.label : "Chargement…"}
            </h1>
            {analyse && (
              <span
                className={`self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${statusConfig.className}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`}
                />
                <StatusIcon size={14} />
                {statusConfig.label}
              </span>
            )}
          </div>
          {analyse && (
            <p className="text-on-surface-variant mt-2">
              Prescrite le{" "}
              {formatDate(analyse.date_analyse || analyse.created_at)}
            </p>
          )}
        </header>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3 border border-error/20">
            <AlertCircle size={24} />
            {error}
            <button
              onClick={() => navigate("/patient/dossier?tab=analyses")}
              className="ml-auto text-sm underline font-semibold"
            >
              Retour
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
          </div>
        ) : (
          analyse && (
            <div className="space-y-6">
              {/* ── Analyse Info ─────────────────────────────────────── */}
              <SectionCard
                title="Informations de l'analyse"
                icon={FlaskConical}
                iconColorClass="text-secondary"
              >
                <InfoRow
                  icon={Tag}
                  label="Type d'analyse"
                  value={typeInfo.icon + "  " + typeInfo.label}
                  colorClass="text-secondary"
                />
                <InfoRow
                  icon={Calendar}
                  label="Date de prescription"
                  value={formatDate(analyse.date_analyse || analyse.created_at)}
                />
                {analyse.date_resultat && (
                  <InfoRow
                    icon={CheckCircle2}
                    label="Date du résultat"
                    value={formatDate(analyse.date_resultat)}
                    colorClass="text-tertiary"
                  />
                )}
                {analyse.laboratoire && (
                  <InfoRow
                    icon={Building2}
                    label="Laboratoire"
                    value={analyse.laboratoire}
                    colorClass="text-primary"
                  />
                )}
              </SectionCard>

              {/* ── Doctor's Note ─────────────────────────────────────── */}
              {analyse.commentaire_medecin && (
                <SectionCard
                  title="Note du médecin"
                  icon={Stethoscope}
                  iconColorClass="text-primary"
                >
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-primary/40 shrink-0" />
                    <p className="text-on-surface leading-relaxed">
                      {analyse.commentaire_medecin}
                    </p>
                  </div>
                </SectionCard>
              )}

              {/* ── Patient's Note ─────────────────────────────────────── */}
              {analyse.commentaire_patient && (
                <SectionCard
                  title="Votre commentaire"
                  icon={MessageSquare}
                  iconColorClass="text-tertiary"
                >
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-tertiary/40 shrink-0" />
                    <p className="text-on-surface leading-relaxed">
                      {analyse.commentaire_patient}
                    </p>
                  </div>
                </SectionCard>
              )}

              {/* ── Linked Consultation ───────────────────────────────── */}
              {consultation && (
                <SectionCard
                  title="Consultation liée"
                  icon={ClipboardList}
                  iconColorClass="text-primary"
                >
                  <InfoRow
                    icon={Calendar}
                    label="Date de consultation"
                    value={formatDate(
                      consultation.date_heure || consultation.date,
                    )}
                  />
                  {(consultation.medecin_nom || consultation.admin?.user) && (
                    <InfoRow
                      icon={User}
                      label="Médecin"
                      value={
                        consultation.medecin_nom ||
                        [
                          consultation.admin?.user?.prenom,
                          consultation.admin?.user?.nom,
                        ]
                          .filter(Boolean)
                          .join(" ") ||
                        "—"
                      }
                    />
                  )}
                  {(consultation.diagnostic || consultation.symptomes) && (
                    <InfoRow
                      icon={Stethoscope}
                      label="Diagnostic / Symptômes"
                      value={consultation.diagnostic || consultation.symptomes}
                      colorClass="text-secondary"
                    />
                  )}
                  {consultation.notes && (
                    <div className="mt-4 pt-3 border-t border-outline-variant/20">
                      <p className="text-xs font-medium text-outline uppercase tracking-wider mb-2">
                        Notes de consultation
                      </p>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {consultation.notes}
                      </p>
                    </div>
                  )}

                  {/* Link to consultation detail */}
                  <button
                    onClick={() =>
                      navigate(`/patient/rendezvous/${consultation.id}`)
                    }
                    className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
                  >
                    <ExternalLink size={14} />
                    Voir la consultation complète
                  </button>
                </SectionCard>
              )}

              {/* ── File / Result ─────────────────────────────────────── */}
              <SectionCard
                title={
                  analyse.fichier
                    ? "Fichier de résultat"
                    : "Résultat en attente"
                }
                icon={analyse.fichier ? FileText : Clock}
                iconColorClass={
                  analyse.fichier ? "text-tertiary" : "text-outline"
                }
              >
                {analyse.fichier ? (
                  <FileViewer
                    fichierUrl={analyse.fichier_url}
                    fichier={analyse.fichier}
                  />
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-surface-container-low border border-dashed border-outline-variant">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                      <HourglassIcon size={24} className="text-outline" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-on-surface">
                        Résultat non encore envoyé
                      </p>
                      <p className="text-sm text-on-surface-variant mt-1">
                        Votre médecin attend le fichier de résultat de cette
                        analyse.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          `/patient/analyses/upload?prescribedId=${analyse.id}`,
                        )
                      }
                      className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-medium shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      <FileText size={16} />
                      Envoyer le résultat
                    </button>
                  </div>
                )}
              </SectionCard>
            </div>
          )
        )}
      </main>
    </Navbar>
  );
}

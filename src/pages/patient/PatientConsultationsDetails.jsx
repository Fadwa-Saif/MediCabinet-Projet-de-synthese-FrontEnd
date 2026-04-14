import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── Section Card ────────────────────────────────────────────────────────────

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-surface-container-high">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <h2 className="font-headline font-bold text-lg text-on-surface">
        {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ─── Info Row ────────────────────────────────────────────────────────────────

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-surface-container-high last:border-0">
    <span className="text-xs font-label font-bold uppercase tracking-wider text-outline w-40 shrink-0">
      {label}
    </span>
    <span className="text-sm text-on-surface font-medium">{value || "—"}</span>
  </div>
);

// ─── Skeleton ────────────────────────────────────────────────────────────────

const Skeleton = ({ className }) => (
  <div
    className={`bg-surface-container-high rounded animate-pulse ${className}`}
  />
);

// ─── Main Component ──────────────────────────────────────────────────────────

export function PatientConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [consultation, setConsultation] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [ordonnances, setOrdonnances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all consultations and find by id (patient endpoint)
        const res = await api.get("/consultations");
        const all = Array.isArray(res.data?.data)
          ? res.data.data
          : (res.data ?? []);
        const found = all.find((c) => String(c.id) === String(id));
        if (!found) throw new Error("Consultation introuvable.");
        setConsultation(found);

        // Fetch analyses for this consultation
        try {
          const analysesRes = await api.get(`/consultations/${id}/analyses`);
          const aData = Array.isArray(analysesRes.data?.data)
            ? analysesRes.data.data
            : (analysesRes.data ?? []);
          setAnalyses(aData);
        } catch {
          setAnalyses([]);
        }

        // Fetch ordonnances
        try {
          const ordRes = await api.get("/ordonnances");
          const oData = Array.isArray(ordRes.data?.data)
            ? ordRes.data.data
            : (ordRes.data ?? []);
          setOrdonnances(
            oData.filter((o) => String(o.consultation_id) === String(id)),
          );
        } catch {
          setOrdonnances([]);
        }
      } catch (err) {
        setError(err.message || "Impossible de charger la consultation.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // ─── Loading State ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <Navbar userRole="patient" pageTitle="Détails consultation">
        <main className="pt-6 pb-12 px-6  max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-64 h-8 rounded" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6 space-y-3"
              >
                <Skeleton className="w-40 h-5" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ))}
          </div>
        </main>
      </Navbar>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────
  if (error) {
    return (
      <Navbar userRole="patient" pageTitle="Détails consultation">
        <main className="pt-6 pb-12 px-6  max-w-7xl mx-auto">
          <div className="p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
            <button
              onClick={() => navigate(-1)}
              className="ml-auto text-sm underline"
            >
              Retour
            </button>
          </div>
        </main>
      </Navbar>
    );
  }

  const c = consultation;

  return (
    <Navbar userRole="patient" pageTitle="Détails consultation">
      <main className="pt-6 pb-12 px-6  max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6 font-medium"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Retour aux consultations
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
                Consultation #{c.id}
              </p>
              <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-background">
                {formatDate(c.date ?? c.created_at)}
              </h1>
              <p className="text-on-surface-variant mt-1">
                {formatTime(c.date ?? c.created_at)}
              </p>
            </div>

            {/* Status badge */}
            <span className="self-start md:self-auto px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-label font-bold uppercase tracking-wider">
              Complétée
            </span>
          </div>
        </header>

        <div className="space-y-6">
          {/* Informations générales */}
          <SectionCard icon="info" title="Informations générales">
            <InfoRow label="Date" value={formatDate(c.date ?? c.created_at)} />
            <InfoRow label="Heure" value={formatTime(c.date ?? c.created_at)} />
            <InfoRow
              label="Médecin"
              value={
                (c.medecin_nom ?? c.admin?.user)
                  ? `Dr. ${c.admin.user.prenom} ${c.admin.user.nom}`
                  : "—"
              }
            />
            <InfoRow label="Spécialité" value={c.admin?.specialite ?? "—"} />
          </SectionCard>

          {/* Motif & Symptômes */}
          <SectionCard icon="symptoms" title="Motif & Symptômes">
            <div className="space-y-4">
              {c.motif && (
                <div>
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                    Motif de consultation
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low rounded-lg p-4">
                    {c.motif}
                  </p>
                </div>
              )}
              {c.symptomes && (
                <div>
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                    Symptômes
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low rounded-lg p-4">
                    {c.symptomes}
                  </p>
                </div>
              )}
              {!c.motif && !c.symptomes && (
                <p className="text-sm text-on-surface-variant italic">
                  Aucune information renseignée.
                </p>
              )}
            </div>
          </SectionCard>

          {/* Diagnostic & Notes */}
          <SectionCard icon="diagnosis" title="Diagnostic & Notes">
            <div className="space-y-4">
              {c.diagnostic && (
                <div>
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                    Diagnostic
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low rounded-lg p-4">
                    {c.diagnostic}
                  </p>
                </div>
              )}
              {(c.notes ?? c.rapport) && (
                <div>
                  <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-2">
                    Notes du médecin
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low rounded-lg p-4 italic">
                    {c.notes ?? c.rapport}
                  </p>
                </div>
              )}
              {!c.diagnostic && !c.notes && !c.rapport && (
                <p className="text-sm text-on-surface-variant italic">
                  Aucun diagnostic renseigné.
                </p>
              )}
            </div>
          </SectionCard>

          {/* Ordonnances */}
          <SectionCard
            icon="medication"
            title={`Ordonnances (${ordonnances.length})`}
          >
            {ordonnances.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Aucune ordonnance associée.
              </p>
            ) : (
              <div className="space-y-3">
                {ordonnances.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Ordonnance #{o.id}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Émise le {formatDateShort(o.created_at)}
                      </p>
                      {o.medicaments && (
                        <div className="mt-2 space-y-1">
                          {Array.isArray(o.medicaments) ? (
                            o.medicaments.map((m) => (
                              <p
                                key={m.id}
                                className="text-sm text-on-surface-variant"
                              >
                                {m.nom} {m.forme ? `— ${m.forme}` : ""}{" "}
                                {m.pivot?.posologie
                                  ? `· ${m.pivot.posologie}`
                                  : ""}
                              </p>
                            ))
                          ) : (
                            <p className="text-sm text-on-surface-variant">
                              {o.medicaments}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-primary shrink-0">
                      prescription
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Analyses */}
          <SectionCard icon="biotech" title={`Analyses (${analyses.length})`}>
            {analyses.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Aucune analyse associée.
              </p>
            ) : (
              <div className="space-y-3">
                {analyses.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 bg-surface-container-low rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="text-sm font-bold text-on-surface">
                        {a.type ?? `Analyse #${a.id}`}
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider
                        ${
                          a.resultat
                            ? "bg-primary-fixed text-on-primary-fixed-variant"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {a.resultat ? "Résultat disponible" : "En attente"}
                      </span>
                    </div>
                    {a.description && (
                      <p className="text-xs text-on-surface-variant">
                        {a.description}
                      </p>
                    )}
                    {a.resultat && (
                      <div className="mt-3 pt-3 border-t border-surface-container-high">
                        <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-1">
                          Résultat
                        </p>
                        <p className="text-sm text-on-surface">{a.resultat}</p>
                      </div>
                    )}
                    {a.annotation && (
                      <div className="mt-2">
                        <p className="text-xs font-label font-bold uppercase tracking-wider text-outline mb-1">
                          Annotation médecin
                        </p>
                        <p className="text-sm text-on-surface-variant italic">
                          {a.annotation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </main>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .signature-gradient {
          background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
        }
      `}</style>
    </Navbar>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { LabAnalysisFormViewer } from "../../components/LabAnalysisFormViewer";
import api from "../../services/api";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FlaskConical,
  Upload,
} from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const analysisDate = (a) => a?.date_analyse || a?.created_at || null;

const buildAnalysisGroups = (analyses) => {
  const map = new Map();

  analyses.forEach((a) => {
    const groupKey = a.group_id
      ? `group:${a.group_id}`
      : a.consultation_id
        ? `consultation:${a.consultation_id}`
        : `single:${a.id}`;

    const current = map.get(groupKey) || {
      key: groupKey,
      groupId: a.group_id || null,
      consultationId: a.consultation_id || null,
      analyses: [],
    };

    current.analyses.push(a);
    map.set(groupKey, current);
  });

  return Array.from(map.values())
    .map((group) => {
      const ordered = [...group.analyses].sort((a, b) => {
        const da = analysisDate(a) ? new Date(analysisDate(a)).getTime() : 0;
        const db = analysisDate(b) ? new Date(analysisDate(b)).getTime() : 0;
        return db - da;
      });

      const representative = ordered.find((a) => !a.fichier) || ordered[0];
      const allHaveFile = ordered.every((a) => Boolean(a.fichier));
      const hasAnyFile = ordered.some((a) => Boolean(a.fichier));
      const prescribedAt = analysisDate(representative);

      return {
        ...group,
        analyses: ordered,
        representative,
        allHaveFile,
        hasAnyFile,
        testsCount: ordered.length,
        prescribedAt,
      };
    })
    .sort((a, b) => {
      const da = a.prescribedAt ? new Date(a.prescribedAt).getTime() : 0;
      const db = b.prescribedAt ? new Date(b.prescribedAt).getTime() : 0;
      return db - da;
    });
};

export function AnalysisDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [consultationsById, setConsultationsById] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [analysesRes, consultationsRes] = await Promise.all([
          api.get("/analyses"),
          api.get("/consultations").catch(() => null),
        ]);

        const analysesData = Array.isArray(analysesRes.data?.data)
          ? analysesRes.data.data
          : analysesRes.data || [];

        if (id && !analysesData.some((a) => String(a.id) === String(id))) {
          setError("Analyse introuvable.");
        }

        setAllAnalyses(analysesData);

        const consultationsData = Array.isArray(consultationsRes?.data?.data)
          ? consultationsRes.data.data
          : consultationsRes?.data || [];

        const byId = consultationsData.reduce((acc, c) => {
          acc[String(c.id)] = c;
          return acc;
        }, {});
        setConsultationsById(byId);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Impossible de charger les details de l'analyse.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const groups = useMemo(() => buildAnalysisGroups(allAnalyses), [allAnalyses]);

  const selectedGroup = useMemo(() => {
    if (!groups.length) return null;

    if (id) {
      return (
        groups.find((g) =>
          g.analyses.some((a) => String(a.id) === String(id)),
        ) || null
      );
    }

    return groups.find((g) => !g.allHaveFile) || groups[0];
  }, [groups, id]);

  const selectedAnalyse = selectedGroup?.representative || null;
  const consultation = selectedGroup?.consultationId
    ? consultationsById[String(selectedGroup.consultationId)]
    : null;

  const status = useMemo(() => {
    if (!selectedGroup) {
      return {
        label: "-",
        Icon: Clock,
        cls: "bg-slate-200 text-slate-700",
      };
    }

    if (selectedGroup.allHaveFile) {
      return {
        label: "Resultat envoye",
        Icon: CheckCircle2,
        cls: "bg-emerald-100 text-emerald-700",
      };
    }

    if (selectedGroup.hasAnyFile) {
      return {
        label: "Resultat partiel",
        Icon: Clock,
        cls: "bg-amber-100 text-amber-700",
      };
    }

    return {
      label: "En attente",
      Icon: Clock,
      cls: "bg-slate-200 text-slate-700",
    };
  }, [selectedGroup]);

  const StatusIcon = status.Icon;

  return (
    <Navbar userRole="patient" pageTitle="Analyse prescrite">
      <main className="pt-6 pb-12 px-6 max-w-6xl mx-auto min-h-screen">
        <button
          onClick={() => navigate("/patient/dossier?tab=analyses")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Retour au dossier
        </button>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-80 animate-pulse rounded-xl bg-slate-200" />
          </div>
        ) : !selectedGroup || !selectedAnalyse ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Aucune analyse prescrite pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <header className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <FlaskConical size={16} />
                Formulaire d'analyses
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Formulaire #{selectedAnalyse.id}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedGroup.testsCount} type
                    {selectedGroup.testsCount > 1 ? "s" : ""} prescrit
                    {selectedGroup.testsCount > 1 ? "s" : ""} le{" "}
                    {formatDate(selectedGroup.prescribedAt)}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${status.cls}`}
                >
                  <StatusIcon size={14} />
                  {status.label}
                </span>
              </div>
            </header>

            {groups.length > 1 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mes formulaires d'analyses
                </p>
                <div className="flex flex-wrap gap-2">
                  {groups.map((group) => {
                    const active = group.key === selectedGroup.key;
                    const representativeId = group.representative?.id;
                    return (
                      <button
                        key={group.key}
                        onClick={() =>
                          representativeId &&
                          navigate(`/patient/analyses/${representativeId}`)
                        }
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                          active
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Formulaire #{representativeId} ({group.testsCount})
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <LabAnalysisFormViewer
                analyses={selectedGroup.analyses}
                patient={consultation?.patient ?? {}}
                medecin={consultation?.admin?.user ?? {}}
                date={
                  consultation?.date ?? selectedGroup.prescribedAt ?? selectedAnalyse.created_at
                }
              />
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
              <h2 className="text-lg font-bold text-slate-900">
                Envoyer le document de resultat
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Un seul fichier est attendu (document du laboratoire contenant tous les resultats).
              </p>
              <button
                onClick={() =>
                  navigate(`/patient/analyses/upload?prescribedId=${selectedAnalyse.id}`)
                }
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Upload size={16} />
                Aller vers l'upload
              </button>
            </section>
          </div>
        )}
      </main>
    </Navbar>
  );
}

import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  Cloud,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Upload,
  FlaskConical,
} from "lucide-react";

const MAX_FILE_MB = 10;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

const analysisDate = (a) => a?.date_analyse || a?.created_at || null;

const buildPendingGroups = (analyses) => {
  const map = new Map();

  analyses.forEach((a) => {
    const groupKey = a.group_id
      ? `group:${a.group_id}`
      : a.consultation_id
        ? `consultation:${a.consultation_id}`
        : `single:${a.id}`;

    const current = map.get(groupKey) || {
      key: groupKey,
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

      const pending = ordered.filter((a) => !a.fichier);
      if (pending.length === 0) return null;

      const representative = pending[0] || ordered[0];

      return {
        ...group,
        analyses: ordered,
        representative,
        testsCount: ordered.length,
        tests: ordered
          .map((a) => a.type_analyse)
          .filter(Boolean)
          .slice(0, 4),
        notes: ordered.map((a) => a.commentaire_medecin).filter(Boolean),
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const da = analysisDate(a.representative)
        ? new Date(analysisDate(a.representative)).getTime()
        : 0;
      const db = analysisDate(b.representative)
        ? new Date(analysisDate(b.representative)).getTime()
        : 0;
      return db - da;
    });
};

const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  return (
    <div className="flex items-center gap-4 p-4 bg-primary-container/30 rounded-xl border border-primary/20">
      <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary shrink-0">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <FileText size={24} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-on-surface truncate">{file.name}</p>
        <p className="text-sm text-on-surface-variant">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-2 hover:bg-error-container rounded-lg text-error transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export function PatientUploadAnalysis() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);

  const [prescribedGroups, setPrescribedGroups] = useState([]);
  const [selectedGroupKey, setSelectedGroupKey] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api
      .get("/analyses")
      .then((res) => {
        const all = res.data.data || res.data || [];
        setPrescribedGroups(buildPendingGroups(all));
      })
      .catch(() => {
        setPrescribedGroups([]);
      });
  }, []);

  useEffect(() => {
    const idFromUrl = searchParams.get("prescribedId");
    if (!idFromUrl || prescribedGroups.length === 0) return;

    const targetGroup = prescribedGroups.find((group) =>
      group.analyses.some((a) => String(a.id) === String(idFromUrl)),
    );

    if (targetGroup) {
      handleSelectPrescribed(targetGroup);
    }
  }, [searchParams, prescribedGroups]);

  const handleSelectPrescribed = (group) => {
    setSelectedGroupKey(group.key);
    setSelectedGroup(group);
    setSuccess(false);
    setTimeout(
      () =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
      100,
    );
  };

  const handleFileSelect = (file) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file.size > MAX_FILE_BYTES) {
      setError(`Max ${MAX_FILE_MB} Mo`);
      return;
    }
    if (!allowed.includes(file.type)) {
      setError("Format accepte : PDF, JPG, PNG, WEBP, DOC, DOCX");
      return;
    }
    setUploadedFile(file);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prescribedId = selectedGroup?.representative?.id;

    if (!prescribedId) {
      setError("Veuillez selectionner un formulaire d'analyse.");
      return;
    }

    if (!uploadedFile) {
      setError("Veuillez joindre le fichier de resultat.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("fichier", uploadedFile);
      await api.post(`/analyses/${prescribedId}/fichier`, fd);
      setSuccess(true);
      setTimeout(() => navigate("/patient/dossier?tab=analyses"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar userRole="patient" pageTitle="Envoyer une Analyse">
      <main className="pt-6 pb-12 px-6 max-w-3xl mx-auto min-h-screen">
        <header className="mb-8">
          <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
            Resultat d'analyse
          </p>
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-background">
            Envoyer un resultat
          </h1>
          <p className="text-on-surface-variant mt-2">
            Selectionnez un formulaire d'analyse puis envoyez un seul document du laboratoire.
          </p>
        </header>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-primary-fixed text-on-primary-fixed font-medium flex items-center gap-3">
            <CheckCircle2 size={24} />
            <div>
              <p className="font-semibold">Resultat envoye avec succes.</p>
              <p className="text-sm opacity-90">Redirection vers votre dossier...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <AlertCircle size={24} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6">
            <h2 className="font-bold text-on-surface mb-4 flex items-center gap-2">
              <FlaskConical size={20} className="text-secondary" />
              Formulaires d'analyses en attente ({prescribedGroups.length})
            </h2>

            {prescribedGroups.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Aucun formulaire en attente de resultat.
              </p>
            ) : (
              <div className="space-y-3">
                {prescribedGroups.map((group) => {
                  const isSelected = selectedGroupKey === group.key;
                  const representativeId = group.representative?.id;

                  return (
                    <div
                      key={group.key}
                      className={`p-4 rounded-xl transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary-container/40 border border-primary/30"
                          : "bg-surface-container-low hover:bg-surface-container"
                      }`}
                      onClick={() => handleSelectPrescribed(group)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-on-surface">
                            Formulaire #{representativeId}
                          </p>
                          <p className="text-sm text-on-surface-variant mt-1">
                            {group.testsCount} type
                            {group.testsCount > 1 ? "s" : ""} d'analyse prescrit
                            {group.testsCount > 1 ? "s" : ""}
                          </p>
                          {group.tests.length > 0 && (
                            <p className="text-xs text-on-surface-variant mt-1">
                              {group.tests.join(", ")}
                              {group.testsCount > group.tests.length ? " ..." : ""}
                            </p>
                          )}
                        </div>
                        {isSelected ? (
                          <CheckCircle2 size={20} className="text-primary shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-outline shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedGroup && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6">
              <h2 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                <Upload size={20} className="text-primary" />
                Joindre le fichier de resultat
              </h2>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-primary bg-primary-container/20"
                      : "border-outline-variant hover:border-primary/50 hover:bg-surface-container-low"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileSelect(f);
                    }}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="pointer-events-none">
                    <Cloud size={40} className="mx-auto mb-3 text-outline" />
                    <p className="font-semibold text-on-surface mb-1">
                      {isDragging ? "Deposez ici" : "Glissez votre fichier ici"}
                    </p>
                    <p className="text-sm text-outline">
                      PDF, JPG, PNG, WEBP, DOC, DOCX - Max {MAX_FILE_MB} Mo
                    </p>
                  </div>
                </div>
              ) : (
                <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
              )}
            </div>
          )}

          <div className="flex gap-4 justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate("/patient/dossier?tab=analyses")}
              disabled={loading}
              className="px-8 py-3 border-2 border-outline-variant text-on-surface rounded-xl font-medium hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || success || !selectedGroup}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-medium disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />{" "}
                  Envoi...
                </>
              ) : (
                <>
                  <Upload size={20} /> Envoyer le resultat
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </Navbar>
  );
}

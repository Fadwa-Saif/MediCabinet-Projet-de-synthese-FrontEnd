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

const ANALYSIS_TYPES = [
  { value: "blood", label: "Analyse Sanguine", icon: "🩸" },
  { value: "urine", label: "Analyse d'Urine", icon: "💧" },
  { value: "imaging", label: "Imagerie Médicale", icon: "🩻" },
  { value: "biopsy", label: "Biopsie", icon: "🔬" },
  { value: "genetic", label: "Test Génétique", icon: "🧬" },
  { value: "other", label: "Autre", icon: "📋" },
];

const MAX_FILE_MB = 10;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

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

  const [prescribed, setPrescribed] = useState([]);
  const [prescribedId, setPrescribedId] = useState(null);
  const [selectedAnalyse, setSelectedAnalyse] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load pending prescribed analyses (no file yet)
  useEffect(() => {
    api
      .get("/analyses")
      .then((res) => {
        const all = res.data.data || res.data || [];
        setPrescribed(all.filter((a) => !a.fichier));
      })
      .catch(() => {});
  }, []);

  // Auto-select if navigated with ?prescribedId=X
  useEffect(() => {
    const idFromUrl = searchParams.get("prescribedId");
    if (!idFromUrl || prescribed.length === 0) return;
    const target = prescribed.find((a) => String(a.id) === String(idFromUrl));
    if (target) handleSelectPrescribed(target);
  }, [searchParams, prescribed]);

  const handleSelectPrescribed = (a) => {
    setPrescribedId(a.id);
    setSelectedAnalyse(a);
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
      setError("Format accepté : PDF, JPG, PNG, WEBP, DOC, DOCX");
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
    if (!prescribedId) {
      setError("Veuillez sélectionner une analyse prescrite.");
      return;
    }
    if (!uploadedFile) {
      setError("Veuillez joindre le fichier de résultat.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("fichier", uploadedFile);
      await api.post(`/analyses/${prescribedId}/fichier`, fd);
      setSuccess(true);
      setTimeout(() => navigate("/patient/dossier"), 2000);
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
            Résultat d'analyse
          </p>
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-background">
            Envoyer un résultat
          </h1>
          <p className="text-on-surface-variant mt-2">
            Sélectionnez l'analyse prescrite par votre médecin et joignez le
            fichier.
          </p>
        </header>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-primary-fixed text-on-primary-fixed font-medium flex items-center gap-3">
            <CheckCircle2 size={24} />
            <div>
              <p className="font-semibold">Résultat envoyé avec succès !</p>
              <p className="text-sm opacity-90">
                Redirection vers votre dossier...
              </p>
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
          {/* Step 1 — Pick prescribed analyse */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6">
            <h2 className="font-bold text-on-surface mb-4 flex items-center gap-2">
              <FlaskConical size={20} className="text-secondary" />
              Analyses prescrites en attente ({prescribed.length})
            </h2>

            {prescribed.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Aucune analyse en attente de résultat.
              </p>
            ) : (
              <div className="space-y-3">
                {prescribed.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer ${
                      prescribedId === a.id
                        ? "bg-primary-container/40 border border-primary/30"
                        : "bg-surface-container-low hover:bg-surface-container"
                    }`}
                    onClick={() => handleSelectPrescribed(a)}
                  >
                    <div>
                      <p className="font-medium text-on-surface">
                        {ANALYSIS_TYPES.find((t) => t.value === a.type_analyse)
                          ?.label ||
                          a.type_analyse ||
                          `Analyse #${a.id}`}
                      </p>
                      {a.commentaire_medecin && (
                        <p className="text-sm text-on-surface-variant mt-1">
                          Note médecin : {a.commentaire_medecin}
                        </p>
                      )}
                    </div>
                    {prescribedId === a.id ? (
                      <CheckCircle2
                        size={20}
                        className="text-primary shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-outline shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2 — Upload file (only shown after selecting) */}
          {prescribedId && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-6">
              <h2 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                <Upload size={20} className="text-primary" />
                Joindre le fichier de résultat
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
                      {isDragging ? "Déposez ici" : "Glissez votre fichier ici"}
                    </p>
                    <p className="text-sm text-outline">
                      PDF, JPG, PNG, WEBP — Max {MAX_FILE_MB} Mo
                    </p>
                  </div>
                </div>
              ) : (
                <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate("/patient/dossier")}
              disabled={loading}
              className="px-8 py-3 border-2 border-outline-variant text-on-surface rounded-xl font-medium hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || success || !prescribedId}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-medium disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />{" "}
                  Envoi...
                </>
              ) : (
                <>
                  <Upload size={20} /> Envoyer le résultat
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </Navbar>
  );
}

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  Cloud,
  Camera,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Upload,
  Calendar,
  Building2,
  Microscope,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const ANALYSIS_TYPES = [
  { value: "blood", label: "Analyse Sanguine", icon: "🩸" },
  { value: "urine", label: "Analyse d'Urine", icon: "💧" },
  { value: "imaging", label: "Imagerie Médicale", icon: "🩻" },
  { value: "biopsy", label: "Biopsie", icon: "🔬" },
  { value: "genetic", label: "Test Génétique", icon: "🧬" },
  { value: "other", label: "Autre", icon: "📋" },
];

// ─── Form Input Component ───────────────────────────────────────────────────

const FormField = ({ label, icon: Icon, children, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-on-surface-variant mb-2 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-outline" />}
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-sm text-error flex items-center gap-1">
        <AlertCircle size={14} />
        {error}
      </p>
    )}
  </div>
);

// ─── File Preview Component ─────────────────────────────────────────────────

const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");

  return (
    <div className="relative group">
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
          title="Supprimer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────

export function PatientUploadAnalysis() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    analysisType: "",
    laboratory: "",
    analysisDate: "",
    resultDate: "",
    comment: "",
    isUrgent: false,
    consultationId: "", // Optional: link to existing consultation
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleFileSelect = (file) => {
    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (file.size > maxSize) {
      setError("Le fichier ne doit pas dépasser 10 Mo");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Format accepté : PDF, JPG, PNG, GIF, WEBP, DOC, DOCX");
      return;
    }

    setUploadedFile(file);
    setError(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
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
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    if (!formData.analysisType)
      return "Veuillez sélectionner le type d'analyse";
    if (!formData.laboratory.trim()) return "Veuillez indiquer le laboratoire";
    if (!formData.analysisDate) return "Veuillez indiquer la date de l'analyse";
    if (!uploadedFile) return "Veuillez joindre un fichier";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create FormData for multipart upload
      const submitData = new FormData();
      submitData.append("fichier", uploadedFile);
      submitData.append("type", formData.analysisType);
      submitData.append("laboratoire", formData.laboratory);
      submitData.append("date_analyse", formData.analysisDate);
      submitData.append(
        "date_resultat",
        formData.resultDate || formData.analysisDate,
      );
      submitData.append("commentaire", formData.comment);
      submitData.append("is_urgent", formData.isUrgent ? "1" : "0");
      if (formData.consultationId) {
        submitData.append("consultation_id", formData.consultationId);
      }

      // API call to upload analysis
      const response = await api.post("/analyses", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);

      // Reset form after short delay
      setTimeout(() => {
        navigate("/patient/analyses");
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.fichier?.[0] ||
          "Erreur lors de l'envoi de l'analyse. Veuillez réessayer.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/patient/analyses");
  };

  const selectedType = ANALYSIS_TYPES.find(
    (t) => t.value === formData.analysisType,
  );

  return (
    <Navbar userRole="patient" pageTitle="Envoyer une Analyse">
      <main className="pt-6 pb-12 px-6 max-w-4xl mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-8">
          <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
            Nouvelle Analyse
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
            Envoyer un résultat d'analyse
          </h1>
          <p className="text-on-surface-variant mt-2">
            Téléchargez vos résultats d'analyses médicales pour les partager
            avec votre médecin
          </p>
        </header>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-primary-fixed text-on-primary-fixed font-medium flex items-center gap-3 border border-primary/20 animate-in slide-in-from-top-2">
            <CheckCircle2 size={24} />
            <div>
              <p className="font-semibold">Analyse envoyée avec succès !</p>
              <p className="text-sm opacity-90">
                Redirection vers vos analyses...
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !success && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3 border border-error/20">
            <AlertCircle size={24} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
            {/* Card Header */}
            <div className="h-1 bg-primary-container" />

            <div className="p-6 lg:p-8">
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                  <Cloud size={20} />
                </div>
                <h2 className="text-xl font-headline font-bold text-on-surface">
                  Informations sur l'analyse
                </h2>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {/* Type d'analyse */}
                <FormField
                  label="Type d'analyse"
                  icon={Microscope}
                  error={error && !formData.analysisType ? error : null}
                >
                  <div className="relative">
                    <select
                      name="analysisType"
                      value={formData.analysisType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Sélectionner le type</option>
                      {ANALYSIS_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {selectedType && (
                    <p className="mt-2 text-sm text-on-surface-variant flex items-center gap-2">
                      <span>{selectedType.icon}</span>
                      {selectedType.label}
                    </p>
                  )}
                </FormField>

                {/* Laboratoire */}
                <FormField
                  label="Laboratoire"
                  icon={Building2}
                  error={error && !formData.laboratory ? error : null}
                >
                  <input
                    type="text"
                    name="laboratory"
                    value={formData.laboratory}
                    onChange={handleInputChange}
                    placeholder="Nom du laboratoire"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </FormField>

                {/* Date de l'analyse */}
                <FormField
                  label="Date de l'analyse"
                  icon={Calendar}
                  error={error && !formData.analysisDate ? error : null}
                >
                  <input
                    type="date"
                    name="analysisDate"
                    value={formData.analysisDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </FormField>

                {/* Date du résultat */}
                <FormField label="Date du résultat (optionnel)" icon={Calendar}>
                  <input
                    type="date"
                    name="resultDate"
                    value={formData.resultDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </FormField>
              </div>

              {/* Commentaire - Full width */}
              <FormField
                label="Commentaire (optionnel)"
                icon={MessageSquare}
                className="mt-6"
              >
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Ajoutez des précisions utiles pour votre médecin..."
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </FormField>

              {/* Urgent Checkbox */}
              <div className="mt-6 flex items-center gap-3 p-4 bg-tertiary-container/10 rounded-xl border border-tertiary/20">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleInputChange}
                  id="urgent"
                  className="w-5 h-5 rounded border-2 border-tertiary text-tertiary focus:ring-tertiary/30 cursor-pointer"
                />
                <label
                  htmlFor="urgent"
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <AlertTriangle size={18} className="text-tertiary" />
                  <span className="font-medium text-on-surface">
                    Marquer comme urgent
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    — Votre médecin sera notifié prioritairement
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* File Upload Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
            <div className="p-6 lg:p-8">
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                  <Upload size={20} />
                </div>
                <h2 className="text-xl font-headline font-bold text-on-surface">
                  Fichier
                </h2>
              </div>

              {/* File Upload Zone */}
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
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="pointer-events-none">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                        isDragging
                          ? "bg-primary-container text-primary"
                          : "bg-surface-container-high text-outline"
                      }`}
                    >
                      <Cloud size={32} />
                    </div>

                    <p className="font-headline font-semibold text-lg text-on-surface mb-2">
                      {isDragging
                        ? "Déposez le fichier ici"
                        : "Glissez votre fichier ici"}
                    </p>
                    <p className="text-on-surface-variant mb-4">ou</p>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-secondary-container text-secondary hover:text-on-secondary-container rounded-xl font-medium transition-colors border border-outline-variant"
                    >
                      Parcourir les fichiers
                    </button>

                    <p className="text-xs text-outline mt-4">
                      PDF, JPG, PNG, GIF, WEBP — Max 10 Mo
                    </p>
                  </div>
                </div>
              ) : (
                <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
              )}

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-surface-container-lowest text-sm text-outline">
                    ou
                  </span>
                </div>
              </div>

              {/* Camera Button */}
              <div className="text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-tertiary-container text-on-surface-variant hover:text-on-tertiary-container rounded-xl font-medium transition-colors border border-outline-variant"
                >
                  <Camera size={20} />
                  Prendre une photo
                </button>
                <p className="text-xs text-outline mt-2">
                  Utilisez la caméra de votre appareil
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-8 py-3 border-2 border-outline-variant text-on-surface rounded-xl font-medium hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary-container hover:text-on-primary-container transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <>
                  <span className="animate-spin">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                  </span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Envoyer l'analyse
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Material Icons Styles */}
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
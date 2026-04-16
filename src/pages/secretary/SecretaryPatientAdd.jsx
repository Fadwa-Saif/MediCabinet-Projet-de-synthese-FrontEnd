import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import { UserPlus, ArrowLeft, Save, AlertCircle, CheckCircle2, Camera, X } from "lucide-react";

export function SecretaryPatientAdd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    telephone: "",
    cin: "",
    date_naissance: "",
    adresse: "",
    ville: "",
    groupe_sanguin: "",
    allergies: "",
    antecedents: "",
    antecedents_familiaux: "",
    poids_kg: "",
    taille_cm: "",
    traitement_en_cours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide.");
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 2 Mo.");
      return;
    }
    
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError(null);
  };

  // Remove selected photo
  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData to handle file upload
      const data = new FormData();
      
      // Add all text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      
      // Add photo if selected
      if (photoFile) {
        data.append("photo_profil", photoFile);
      }
      
      await api.post("/patients", data);
      setSuccess(true);
      setTimeout(() => navigate("/secretaire/patients"), 2000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstValidationError = errors
        ? Object.values(errors).flat()[0]
        : null;
      setError(
        firstValidationError ||
          err.response?.data?.message ||
          "Une erreur est survenue lors de l'enregistrement.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar userRole="secretaire" pageTitle="Nouveau Patient">
      <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
            <div className="text-right">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nouveau Patient</h1>
              <p className="text-slate-500 text-sm">Enregistrement d'un nouveau dossier médical</p>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
              <CheckCircle2 size={20} className="shrink-0" />
              <p className="text-sm font-medium">Patient enregistré avec succès ! Redirection...</p>
            </div>
          )}

          {/* Form Card */}
          <form onSubmit={handleSubmit} autoComplete="off" className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Photo Upload Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <Camera size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Photo du patient (optionnel)</h2>
                </div>
                
                <div className="flex flex-col items-center gap-6">
                  {/* Photo Preview or Upload Area */}
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="preview"
                        className="w-32 h-32 rounded-2xl object-cover border-2 border-blue-200 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition"
                        title="Supprimer la photo"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-32 h-32 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition"
                    >
                      <Camera size={32} className="text-blue-400 mb-1" />
                      <span className="text-xs text-blue-600 font-medium text-center px-2">Cliquez pour ajouter une photo</span>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoSelect}
                  />
                  
                  {photoFile && (
                    <p className="text-xs text-gray-600 text-center">
                      Fichier sélectionné: <span className="font-semibold">{photoFile.name}</span>
                    </p>
                  )}
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Identity Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <UserPlus size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Identité & Contact</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nom</label>
                    <input
                      required
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Alami"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Prénom</label>
                    <input
                      required
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Ex: Ahmed"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="patient@exemple.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mot de passe</label>
                    <input
                      required
                      type="password"
                      minLength={6}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      placeholder="Mot de passe du patient"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Téléphone</label>
                    <input
                      required
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="06XXXXXXXX"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Personal Details Section */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">CIN</label>
                    <input
                      name="cin"
                      value={formData.cin}
                      onChange={handleChange}
                      placeholder="Ex: AB123456"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date de naissance</label>
                    <input
                      type="date"
                      name="date_naissance"
                      value={formData.date_naissance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Adresse</label>
                    <input
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder="Adresse complète"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ville</label>
                    <input
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      placeholder="Ex: Casablanca"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <UserPlus size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Informations médicales (optionnel)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Groupe sanguin</label>
                    <select
                      name="groupe_sanguin"
                      value={formData.groupe_sanguin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Non renseigné</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Allergies</label>
                    <input
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Ex: Pénicilline"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Poids (kg)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="poids_kg"
                      value={formData.poids_kg}
                      onChange={handleChange}
                      placeholder="Ex: 70.5"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Taille (cm)</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      name="taille_cm"
                      value={formData.taille_cm}
                      onChange={handleChange}
                      placeholder="Ex: 175"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Antécédents</label>
                    <textarea
                      name="antecedents"
                      value={formData.antecedents}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Antécédents médicaux"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Antécédents familiaux</label>
                    <textarea
                      name="antecedents_familiaux"
                      value={formData.antecedents_familiaux}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Antécédents familiaux"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Traitement en cours</label>
                    <textarea
                      name="traitement_en_cours"
                      value={formData.traitement_en_cours}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Traitement en cours"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
              >
                {loading ? "Chargement..." : <><Save size={18} /> Enregistrer le patient</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Navbar>
  );
}

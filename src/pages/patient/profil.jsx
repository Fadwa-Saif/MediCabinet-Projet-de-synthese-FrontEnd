import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import {
  Camera,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Pencil,
} from "lucide-react";
import api from "../../services/api";
import { normalizePhotoUrl } from "../../services/photoUrl";

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
      {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {message}
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        <Icon size={13} className="text-blue-400" />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function PatientProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const [profile, setProfile] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    photo_profil: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profil");
        const data = res.data.data || res.data;
        setProfile({
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",
          photo_profil: normalizePhotoUrl(data.photo_profil) || "",
        });
      } catch {
        const stored = JSON.parse(
          localStorage.getItem("medicabinet_user") || "{}"
        );
        setProfile({
          nom: stored.lastName || "",
          prenom: stored.firstName || "",
          email: stored.email || "",
          telephone: stored.phone || stored.telephone || "",
          photo_profil: normalizePhotoUrl(
            stored.photo_profil || stored.raw?.photo_profil || null,
          ) || "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const avatarSrc = normalizePhotoUrl(previewPhoto || profile.photo_profil || null);
  const resolvedAvatarSrc = avatarLoadFailed ? null : avatarSrc;
  const initials =
    profile.prenom && profile.nom
      ? `${profile.prenom[0]}${profile.nom[0]}`.toUpperCase()
      : "?";

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [avatarSrc]);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Format d'image invalide.", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("L'image ne doit pas dépasser 2 Mo.", "error");
      return;
    }
    setPhotoFile(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;
    setSavingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("photo_profil", photoFile);
      const res = await api.post("/profil/photo", formData);
      const newUrl = normalizePhotoUrl(
        res.data.photo_profil || res.data.data?.photo_profil,
      );
      setProfile((p) => ({ ...p, photo_profil: newUrl || "" }));
      const stored = JSON.parse(
        localStorage.getItem("medicabinet_user") || "{}"
      );
      localStorage.setItem(
        "medicabinet_user",
        JSON.stringify({
          ...stored,
          photo_profil: newUrl || "",
          raw: {
            ...stored.raw,
            photo_profil: newUrl || "",
          },
        })
      );
      setPhotoFile(null);
      setPreviewPhoto(null);
      showToast("Photo de profil mise à jour !");
    } catch {
      showToast("Erreur lors de l'upload de la photo.", "error");
    } finally {
      setSavingPhoto(false);
    }
  };

  const handleSaveInfo = async () => {
    if (!profile.nom.trim() || !profile.prenom.trim()) {
      showToast("Le nom et le prénom sont obligatoires.", "error");
      return;
    }
    setSaving(true);
    try {
      await api.put("/profil", {
        nom: profile.nom,
        prenom: profile.prenom,
        telephone: profile.telephone,
      });
      const stored = JSON.parse(
        localStorage.getItem("medicabinet_user") || "{}"
      );
      localStorage.setItem(
        "medicabinet_user",
        JSON.stringify({
          ...stored,
          firstName: profile.prenom,
          lastName: profile.nom,
          telephone: profile.telephone,
        })
      );
      showToast("Informations mises à jour !");
    } catch {
      showToast("Erreur lors de la mise à jour.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async () => {
    const errors = {};
    if (!passwords.current) errors.current = "Mot de passe actuel requis.";
    if (!passwords.new || passwords.new.length < 8)
      errors.new = "Minimum 8 caractères.";
    if (passwords.new !== passwords.confirm)
      errors.confirm = "Les mots de passe ne correspondent pas.";
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    setPasswordErrors({});
    setSavingPassword(true);
    try {
      await api.put("/profil/password", {
        current_password: passwords.current,
        password: passwords.new,
        password_confirmation: passwords.confirm,
      });
      setPasswords({ current: "", new: "", confirm: "" });
      showToast("Mot de passe modifié avec succès !");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Erreur. Vérifiez votre mot de passe actuel.";
      showToast(msg, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const goBack = () => navigate(-1);

  if (loading) {
    return (
      <Navbar userRole="patient" pageTitle="Mon profil">
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar userRole="patient" pageTitle="Mon profil">
      <div className="min-h-full bg-gray-50 p-4 lg:p-8">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={goBack}
            className="p-2 rounded-lg hover:bg-gray-200 transition text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Mon profil</h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Photo + Name Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                  {resolvedAvatarSrc ? (
                    <img
                      src={resolvedAvatarSrc}
                      alt="avatar"
                      className="w-full h-full object-cover"
                      onError={() => setAvatarLoadFailed(true)}
                    />
                  ) : (
                    initials
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md transition"
                  title="Changer la photo"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoSelect}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xl font-bold text-gray-800">
                  {profile.prenom} {profile.nom}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">{profile.email}</p>

                {photoFile && (
                  <div className="mt-3 flex items-center gap-3 justify-center sm:justify-start">
                    <span className="text-xs text-gray-500 truncate max-w-[160px]">
                      {photoFile.name}
                    </span>
                    <button
                      onClick={handleUploadPhoto}
                      disabled={savingPhoto}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition disabled:opacity-60"
                    >
                      {savingPhoto ? (
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Save size={13} />
                      )}
                      Enregistrer la photo
                    </button>
                    <button
                      onClick={() => {
                        setPhotoFile(null);
                        setPreviewPhoto(null);
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 transition"
                    >
                      Annuler
                    </button>
                  </div>
                )}

                {!photoFile && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium mx-auto sm:mx-0"
                  >
                    <Pencil size={12} />
                    Changer la photo de profil
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
              <User size={17} className="text-blue-500" />
              Informations personnelles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Prénom" icon={User}>
                <input
                  type="text"
                  value={profile.prenom}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, prenom: e.target.value }))
                  }
                  className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Prénom"
                />
              </Field>

              <Field label="Nom" icon={User}>
                <input
                  type="text"
                  value={profile.nom}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, nom: e.target.value }))
                  }
                  className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Nom de famille"
                />
              </Field>

              <Field label="Email" icon={Mail}>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="px-3 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </Field>

              <Field label="Téléphone" icon={Phone}>
                <input
                  type="tel"
                  value={profile.telephone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, telephone: e.target.value }))
                  }
                  className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="+212 6XX XXX XXX"
                />
              </Field>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSaveInfo}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-60"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                Sauvegarder
              </button>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Lock size={17} className="text-blue-500" />
              Changer le mot de passe
            </h2>

            <div className="space-y-4">
              <Field label="Mot de passe actuel" icon={Lock}>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, current: e.target.value }))
                    }
                    className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      passwordErrors.current
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((p) => ({ ...p, current: !p.current }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
                {passwordErrors.current && (
                  <p className="text-xs text-red-500 mt-0.5">
                    {passwordErrors.current}
                  </p>
                )}
              </Field>

              <Field label="Nouveau mot de passe" icon={Lock}>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, new: e.target.value }))
                    }
                    className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      passwordErrors.new
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200"
                    }`}
                    placeholder="Minimum 8 caractères"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((p) => ({ ...p, new: !p.new }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
                {passwordErrors.new && (
                  <p className="text-xs text-red-500 mt-0.5">
                    {passwordErrors.new}
                  </p>
                )}
                {passwords.new && (
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3, 4].map((i) => {
                      const len = passwords.new.length;
                      const strength =
                        len >= 12
                          ? 4
                          : len >= 10
                          ? 3
                          : len >= 8
                          ? 2
                          : 1;
                      const colors = [
                        "bg-red-400",
                        "bg-orange-400",
                        "bg-yellow-400",
                        "bg-green-500",
                      ];
                      return (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            i <= strength ? colors[strength - 1] : "bg-gray-200"
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </Field>

              <Field label="Confirmer le mot de passe" icon={Lock}>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((p) => ({ ...p, confirm: e.target.value }))
                    }
                    className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                      passwordErrors.confirm
                        ? "border-red-400 bg-red-50"
                        : passwords.confirm && passwords.confirm === passwords.new
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
                {passwordErrors.confirm && (
                  <p className="text-xs text-red-500 mt-0.5">
                    {passwordErrors.confirm}
                  </p>
                )}
                {passwords.confirm &&
                  passwords.confirm === passwords.new &&
                  !passwordErrors.confirm && (
                    <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                      <CheckCircle size={11} /> Les mots de passe correspondent.
                    </p>
                  )}
              </Field>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSavePassword}
                disabled={savingPassword}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-60"
              >
                {savingPassword ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Lock size={15} />
                )}
                Modifier le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

export function SecretaryPatientEdit() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [patient, setPatient] = useState(null);

  const [formData, setFormData] = useState({
    date_naissance: "",
    cin: "",
    adresse: "",
    ville: "",
    groupe_sanguin: "",
    antecedents: "",
    antecedents_familiaux: "",
    allergies: "",
    poids_kg: "",
    taille_cm: "",
    traitement_en_cours: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/patients/${patientId}`);
        const payload = response.data?.data || response.data || null;

        if (!payload) {
          throw new Error("Patient introuvable.");
        }

        setPatient(payload);
        setFormData({
          date_naissance: payload.date_naissance || "",
          cin: payload.cin || "",
          adresse: payload.adresse || "",
          ville: payload.ville || "",
          groupe_sanguin: payload.groupe_sanguin || "",
          antecedents: payload.antecedents || "",
          antecedents_familiaux: payload.antecedents_familiaux || "",
          allergies: payload.allergies || "",
          poids_kg: payload.poids_kg ?? "",
          taille_cm: payload.taille_cm ?? "",
          traitement_en_cours: payload.traitement_en_cours || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Impossible de charger le patient.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await api.patch(`/patients/${patientId}`, {
        ...formData,
        poids_kg: formData.poids_kg === "" ? null : Number(formData.poids_kg),
        taille_cm:
          formData.taille_cm === "" ? null : Number(formData.taille_cm),
      });

      setSuccess(true);
      setTimeout(() => navigate(`/secretaire/patients/${patientId}`), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la mise à jour.",
      );
    } finally {
      setSaving(false);
    }
  };

  const fullName = patient
    ? `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim() ||
      "Patient"
    : "Patient";

  return (
    <Navbar userRole="secretaire" pageTitle="Modifier Patient">
      <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
            <div className="text-right">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Modifier Patient
              </h1>
              <p className="text-slate-500 text-sm">Mise à jour du dossier médical</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
              <CheckCircle2 size={20} className="shrink-0" />
              <p className="text-sm font-medium">Patient mis à jour avec succès !</p>
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-slate-500">
              Chargement du patient...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <UserPlus size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Aperçu du patient</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nom complet</label>
                      <input
                        value={fullName}
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                      <input
                        value={patient.user?.email || ""}
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Téléphone</label>
                      <input
                        value={patient.user?.telephone || ""}
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-500"
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
                    <h2 className="text-lg font-bold text-slate-900">Informations médicales & dossier</h2>
                  </div>

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
                        value={formData.date_naissance || ""}
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
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Allergies</label>
                      <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Allergies connues"
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
                        placeholder="Traitement actuel"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>
              </div>

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
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
                >
                  {saving ? "Chargement..." : <><Save size={18} /> Enregistrer les modifications</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Navbar>
  );
}
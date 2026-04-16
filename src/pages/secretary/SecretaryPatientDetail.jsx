import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import { normalizePhotoUrl } from "../../services/photoUrl";

export function SecretaryPatientDetail() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/patients/${patientId}`);
        setPatient(response.data?.data || response.data || null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Impossible de charger les informations du patient.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const fullName = patient
    ? `${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim() ||
      "Patient"
    : "Patient";

  const appointmentHistory = Array.isArray(patient?.rendezVous)
    ? patient.rendezVous
    : [];

  const avatarUrl = avatarLoadFailed
    ? null
    : normalizePhotoUrl(patient?.user?.photo_profil || null);

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [patient?.user?.photo_profil]);

  return (
    <Navbar userRole="secretaire" pageTitle="Détail Patient">
      <div className="min-h-full p-4 md:p-8">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <button onClick={() => navigate("/secretaire/patients")} className="hover:underline">Patients</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-blue-600 font-medium">Fiche Patient</span>
            </nav>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {loading ? "Chargement..." : fullName}
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/secretaire/patients/${patientId}/modifier`)}
              className="px-6 py-3 bg-slate-100 text-blue-700 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined">edit</span>
              Modifier le profil
            </button>
            <button
              onClick={() => navigate(`/secretaire/rendezvous/nouveau?patientId=${patientId}`)}
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">add</span>
              Nouveau RDV
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-500">
            Chargement du dossier patient...
          </div>
        ) : patient ? (
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column: Patient Profile Card */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-blue-700 to-blue-600 opacity-5 rounded-bl-full"></div>
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-100 p-1 mb-4 flex items-center justify-center bg-blue-50 text-blue-700 font-bold text-3xl overflow-hidden">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={fullName}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setAvatarLoadFailed(true)}
                      />
                    ) : (
                      (patient.user?.prenom?.[0] || "") + (patient.user?.nom?.[0] || "")
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{fullName}</h3>
                  <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">Patient</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined">cake</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Date de naissance</p>
                      <p className="text-sm font-semibold">{patient.date_naissance || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Téléphone</p>
                      <p className="text-sm font-semibold">{patient.user?.telephone || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Email</p>
                      <p className="text-sm font-semibold">{patient.user?.email || "—"}</p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-sm mb-4 text-slate-900">Informations médicales</h4>
                <div className="space-y-3 text-sm text-slate-700">
                  <p><span className="font-semibold">Groupe sanguin:</span> {patient.groupe_sanguin || "—"}</p>
                  <p><span className="font-semibold">Poids:</span> {patient.poids_kg ? `${patient.poids_kg} kg` : "—"}</p>
                  <p><span className="font-semibold">Taille:</span> {patient.taille_cm ? `${patient.taille_cm} cm` : "—"}</p>
                  <p><span className="font-semibold">Allergies:</span> {patient.allergies || "—"}</p>
                  <p><span className="font-semibold">Antécédents:</span> {patient.antecedents || "—"}</p>
                  <p><span className="font-semibold">Traitement en cours:</span> {patient.traitement_en_cours || "—"}</p>
                </div>
              </section>
            </div>

            {/* Right Column: Appointment History */}
            <div className="col-span-12 lg:col-span-8">
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                <div className="p-8 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-xl font-bold">Historique des Rendez-vous</h3>
                </div>
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-slate-200 bg-slate-50">
                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Motif</th>
                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointmentHistory.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-8 py-10 text-center text-slate-500">
                            Aucun rendez-vous trouvé.
                          </td>
                        </tr>
                      ) : (
                        appointmentHistory.map((rdv) => (
                          <tr key={rdv.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-6">
                              <p className="font-semibold text-sm">{rdv.date_heure || "—"}</p>
                            </td>
                            <td className="px-8 py-6 text-sm font-medium">{rdv.motif || "—"}</td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-full">
                                {rdv.statut || "—"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </div>
    </Navbar>
  );
}
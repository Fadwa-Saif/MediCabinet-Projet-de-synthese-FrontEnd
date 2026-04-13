import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export function SecretaryAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/rendezvous");
        const data = Array.isArray(response.data?.data) ? response.data.data : response.data || [];
        setAppointments(
          data.map((rdv) => ({
            id: rdv.id,
            date: new Date(rdv.date_heure).toLocaleDateString('fr-FR'),
            time: new Date(rdv.date_heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            patient: rdv.patient?.user?.prenom + " " + rdv.patient?.user?.nom || "—",
            doctor: rdv.admin?.user?.prenom + " " + rdv.admin?.user?.nom || "—",
            status: rdv.statut === 'en_attente' ? 'En attente' : rdv.statut === 'confirme' ? 'Confirmé' : 'Terminé',
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Navbar userRole="secretaire" pageTitle="Gestion des Rendez-vous">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Rendez-vous
          </h1>
          <button
            onClick={() => navigate("/secretaire/rendezvous/nouveau")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-100"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
            Nouveau Rendez-vous
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Aujourd'hui</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.date === new Date().toLocaleDateString('fr-FR')).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Confirmés</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.status === "Confirmé").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">En attente</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.status === "En attente").length}
            </p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Date/Heure
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Médecin
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Chargement...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-red-500">{error}</td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Aucun rendez-vous</td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-900">
                        <div className="font-semibold">{apt.date}</div>
                        <div className="text-gray-600 text-xs">{apt.time}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{apt.patient}</td>
                      <td className="px-6 py-4 text-gray-900">{apt.doctor}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.status === "Confirmé"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Navbar>
  );
}


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function SecretaireDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    appointmentsToday: 0,
    totalPatients: 0,
    waitingPatients: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch dashboard stats from admin endpoint
        const statsRes = await api.get("/admin/dashboard");
        const statsData = statsRes.data || {};
        
        // Fetch today's appointments
        const today = new Date().toISOString().split('T')[0];
        const rdvRes = await api.get(`/rendezvous?date=${today}`);
        const rdvData = Array.isArray(rdvRes.data?.data) ? rdvRes.data.data : rdvRes.data || [];

        setStats({
          appointmentsToday: statsData.rdv_aujourd_hui || rdvData.length,
          totalPatients: statsData.total_patients || 0,
          waitingPatients: statsData.rdv_en_attente || 0,
        });

        setTodayAppointments(
          rdvData.slice(0, 5).map((rdv) => ({
            id: rdv.id,
            time: new Date(rdv.date_heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            patientName: rdv.patient?.user?.prenom + " " + rdv.patient?.user?.nom || "—",
            doctor: rdv.admin?.user?.prenom + " " + rdv.admin?.user?.nom || "—",
            reason: rdv.motif || "—",
            status: rdv.statut === 'en_attente' ? 'En attente' : rdv.statut === 'confirme' ? 'Confirmé' : 'En cours',
          }))
        );
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  
  const recentActivity = [];

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const secretaryName = userData.firstName ? userData.firstName : "Secrétaire";

  return (
    <Navbar userRole="secretaire" pageTitle="Tableau de Bord Secrétaire">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Tableau de Bord Secrétaire
            </h2>
            <p className="text-gray-600 mt-1">
              Bienvenue, voici le récapitulatif de votre journée.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {secretaryName}
            </p>
            <p className="text-xs text-gray-600">Secrétaire Principale</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              Rendez-vous Aujourd'hui
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.appointmentsToday}
            </p>
            <p className="text-xs text-green-600 mt-2">+2 par rapport à hier</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              Total des Patients
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalPatients}
            </p>
            <p className="text-xs text-gray-600 mt-2">Mis à jour il y a 5 min</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              En Attente
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.waitingPatients}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Temps d'attente moyen: 15 min
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Rendez-vous de la journée
            </h3>
            {loading ? (
              <div className="text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : todayAppointments.length === 0 ? (
              <div className="text-gray-500">Aucun rendez-vous aujourd'hui</div>
            ) : (
              <div className="space-y-4">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-blue-600 w-16">
                            {apt.time}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {apt.patientName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {apt.doctor} • {apt.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          apt.status === "En cours"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">bolt</span>
                Actions Rapides
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/secretaire/patients/nouveau")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl text-blue-700 font-bold transition-all border border-transparent hover:border-blue-100 group"
                >
                  <span className="material-symbols-outlined text-blue-500 group-hover:scale-110 transition-transform">person_add</span>
                  Nouveau Patient
                </button>
                <button
                  onClick={() => navigate("/secretaire/rendezvous/nouveau")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl text-blue-700 font-bold transition-all border border-transparent hover:border-blue-100 group"
                >
                  <span className="material-symbols-outlined text-blue-500 group-hover:scale-110 transition-transform">calendar_add_on</span>
                  Nouveau Rendez-vous
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl text-slate-600 font-bold transition-all border border-transparent hover:border-slate-100 group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:scale-110 transition-transform">call</span>
                  Appels à faire
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Activité Récente</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="text-sm border-l-2 border-gray-200 pl-3">
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

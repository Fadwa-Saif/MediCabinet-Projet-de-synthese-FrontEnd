import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function SecretaireDashboard() {
  // TODO: fetch from API — GET /api/secretary/dashboard-stats
  const [stats, setStats] = useState({
    appointmentsToday: 12,
    totalPatients: 842,
    waitingPatients: 4,
  });

  // TODO: fetch from API — GET /api/secretary/today-appointments
  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: 1,
      time: "09:00",
      patientName: "Mme. Sophie Martin",
      doctor: "Dr. Lefebvre",
      reason: "Consultation générale",
      status: "Confirmé",
    },
    {
      id: 2,
      time: "10:30",
      patientName: "M. Pierre Durand",
      doctor: "Dr. Antoine",
      reason: "Suivi cardiaque",
      status: "En cours",
    },
  ]);

  // TODO: fetch from API — GET /api/secretary/recent-activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "appointment",
      message: "Rendez-vous confirmé: Sophie Martin",
      time: "Il y a 2 heures",
    },
    {
      id: 2,
      type: "patient",
      message: "Nouveau patient enregistré: Jean Dupuis",
      time: "Il y a 4 heures",
    },
  ]);

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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Actions Rapides</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  ➕ Nouveau Patient
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  📅 Nouveau Rendez-vous
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  📞 Appels à faire
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

import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export function DoctorDashboard() {
  const navigate = useNavigate();

  // TODO: fetch from API — GET /api/doctor/appointments-today
  const [appointments] = useState([
    {
      id: 1,
      time: "09:00",
      duration: "30 MIN",
      patientInitials: "ML",
      patientName: "Marc Laurent",
      reason: "Suivi post-opératoire",
      status: "Confirmé",
    },
    {
      id: 2,
      time: "09:45",
      duration: "45 MIN",
      patientInitials: "SB",
      patientName: "Sophie Bernard",
      reason: "Première consultation cardiologie",
      status: "En cours",
    },
  ]);

  // TODO: fetch from API — GET /api/doctor/dashboard-stats
  const [stats] = useState({
    appointmentsToday: 12,
    totalPatients: 156,
    consultationsThisMonth: 48,
  });

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const doctorName = userData.firstName ? `Dr. ${userData.firstName}` : "Médecin";
  const specialization = userData.specialization || "Généraliste";

  return (
    <Navbar userRole="medecin" pageTitle="Tableau de Bord Médecin">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de Bord Médecin
            </h1>
            <p className="text-gray-600 mt-1">
              Lundi 24 Mai 2024 — Vous avez {stats.appointmentsToday} rendez-vous aujourd'hui.
            </p>
          </div>
          <button
            onClick={() => navigate("/medecin/rapport/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <span>+</span> Nouvelle Consultation
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Rendez-vous aujourd'hui</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {stats.appointmentsToday}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Total des patients</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {stats.totalPatients}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium">Consultations ce mois</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              {stats.consultationsThisMonth}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Rendez-vous du jour
              </h2>
              <button className="text-blue-600 hover:underline text-sm font-medium">
                Voir l'agenda complet
              </button>
            </div>

            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 text-center">
                      <p className="text-lg font-bold text-blue-600">{apt.time}</p>
                      <p className="text-xs text-gray-500 font-semibold">
                        {apt.duration}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold text-blue-600">
                      {apt.patientInitials}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{apt.patientName}</h3>
                      <p className="text-sm text-gray-600 italic">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        apt.status === "En cours"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Doctor Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3">Informations</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600 uppercase">Nom</p>
                  <p className="font-semibold text-gray-900">{doctorName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase">Spécialité</p>
                  <p className="font-semibold text-gray-900">{specialization}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3">Actions Rapides</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/medecin/rapport/new")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition"
                >
                  📝 Nouveau Rapport
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  📋 Voir Patients
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

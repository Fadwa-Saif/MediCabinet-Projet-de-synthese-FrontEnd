import { useState } from "react";
import { Navbar } from "../../components/Navbar.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export function PatientAppointmentsList() {
  const { language, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("tous");
  const [dateFilter, setDateFilter] = useState("");

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      date: "15 Avril 2026",
      time: "10:30",
      description: "Consultation de suivi • Tension artérielle",
      status: "confirmé",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      date: "22 Avril 2026",
      time: "14:00",
      description: "Contrôle général annuel",
      status: "en_attente",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      date: "10 Mars 2026",
      time: "11:00",
      status: "terminé",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const getStatusLabel = (status) => {
    const labels = {
      confirmé: language === "ar" ? "مؤكد" : "Confirmé",
      en_attente: language === "ar" ? "قيد الانتظار" : "En attente",
      terminé: language === "ar" ? "منتهي" : "Terminé",
      annulé: language === "ar" ? "ملغى" : "Annulé",
    };
    return labels[status] || status;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            📅 {language === "ar" ? "مواعيدي" : "Mes Rendez-vous"}
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
            + {language === "ar" ? "موعد جديد" : "Nouveau Rendez-vous"}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Filter Section */}
          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
            <div className="flex gap-4 items-end flex-wrap">
              {/* Status Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "الحالة" : "Statut"}
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tous">
                    {language === "ar" ? "الكل" : "Tous"}
                  </option>
                  <option value="confirmé">
                    {language === "ar" ? "مؤكد" : "Confirmé"}
                  </option>
                  <option value="en_attente">
                    {language === "ar" ? "قيد الانتظار" : "En attente"}
                  </option>
                  <option value="terminé">
                    {language === "ar" ? "منتهي" : "Terminé"}
                  </option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "من التاريخ" : "À partir du"}
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="mm/dd/yyyy"
                />
              </div>

              {/* Filter Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold text-sm">
                {language === "ar" ? "تصفية" : "Filtrer"}
              </button>
            </div>
          </div>

          {/* Upcoming Appointments Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {language === "ar" ? "قادمة" : "À venir"}
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                        📅 {appointment.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        🕐 {appointment.time}
                      </div>
                      <p className="text-gray-700">{appointment.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${appointment.statusColor}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-1 rounded-lg font-semibold text-sm">
                      {language === "ar" ? "تعديل" : "Modifier"}
                    </button>
                    <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-4 py-1 rounded-lg font-semibold text-sm">
                      {language === "ar" ? "إلغاء" : "Annuler"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {language === "ar" ? "السجل" : "Historique"}
            </h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white border-l-4 border-gray-300 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 font-semibold mb-1">
                        📅 {appointment.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        🕐 {appointment.time}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${appointment.statusColor}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

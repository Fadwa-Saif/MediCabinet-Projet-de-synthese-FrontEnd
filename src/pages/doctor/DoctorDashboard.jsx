import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { Navbar } from "../../components/Navbar";

export function DoctorDashboard() {
  const { language } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [notes, setNotes] = useState("");

  // Today's appointments
  const todayAppointments = [
    {
      id: 1,
      patient: "Khadja Bennis",
      time: "09:00",
      status: "confirmé",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      patient: "Youssef Bennani",
      time: "10:30",
      status: "en_attente",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      patient: "Leila Chafik",
      time: "11:15",
      status: "confirmé",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      patient: "Omar Boukhari",
      time: "14:00",
      status: "annulé",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 5,
      patient: "Siham El Idrisi",
      time: "15:30",
      status: "confirmé",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const patients = [
    "Khadja Bennis",
    "Youssef Bennani",
    "Leila Chafik",
    "Omar Boukhari",
    "Siham El Idrisi",
  ];

  const getStatusLabel = (status) => {
    const labels = {
      confirmé: language === "ar" ? "مؤكد" : "Confirmé",
      en_attente: language === "ar" ? "قيد الانتظار" : "En attente",
      annulé: language === "ar" ? "ملغى" : "Annulé",
    };
    return labels[status] || status;
  };

  const getDateLabel = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString(
      language === "ar" ? "ar-TN" : "fr-FR",
      options,
    );
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (selectedPatient && diagnostic) {
      console.log("Adding consultation report:", {
        patient: selectedPatient,
        diagnostic,
        notes,
      });
      setSelectedPatient("");
      setDiagnostic("");
      setNotes("");
      alert(
        language === "ar" ? "تم حفظ التقرير" : "Rapport ajouté avec succès",
      );
    }
  };

  const pageContent = (
    <div className="bg-gray-50 p-4 lg:p-8">
      {/* Today's Appointments Section */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 font-medium">
            {language === "ar" ? "مواعيد اليوم" : "Rendez-vous du jour"}
          </h3>
          <p className="text-gray-500 text-sm">{getDateLabel()}</p>
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {language === "ar" ? "المريض" : "Patient"}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {language === "ar" ? "الوقت" : "Heure"}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {language === "ar" ? "الحالة" : "Statut"}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {language === "ar" ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-gray-700">
                    {appointment.patient}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {appointment.time}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.statusColor}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                      {language === "ar" ? "عرض التفاصيل" : "Voir détails"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Consultation Report Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            {language === "ar"
              ? "إضافة تقرير استشارة"
              : "Ajouter un rapport de consultation"}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {language === "ar"
              ? "ملء تفاصيل الاستشارة"
              : "Remplissez les détails de la consultation"}
          </p>
        </div>

        <form onSubmit={handleAddReport} className="space-y-6">
          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === "ar" ? "المريض" : "Patient"}
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {language === "ar" ? "اختر مريضاً" : "Sélectionner un patient"}
              </option>
              {patients.map((patient) => (
                <option key={patient} value={patient}>
                  {patient}
                </option>
              ))}
            </select>
          </div>

          {/* Diagnostic Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === "ar" ? "التشخيص" : "Diagnostic"}
            </label>
            <input
              type="text"
              value={diagnostic}
              onChange={(e) => setDiagnostic(e.target.value)}
              placeholder={
                language === "ar" ? "أدخل التشخيص" : "Entrez le diagnostic"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === "ar"
                ? "ملاحظات الاستشارة"
                : "Notes de consultation"}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                language === "ar" ? "أدخل ملاحظاتك" : "Entrez vos notes..."
              }
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
          >
            {language === "ar" ? "حفظ التقرير" : "Enregistrer le rapport"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Navbar
      userRole="medecin"
      pageTitle={language === "ar" ? "الرئيسية" : "Tableau de bord"}
    >
      {pageContent}
    </Navbar>
  );
}

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export function PatientDashboard() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const firstName = userData.firstName || "Patient";
  const lastName = userData.lastName || "";

  // Sample data for consultations
  const consultationsPassed = [
    {
      id: 1,
      date: "05 Oct 2025",
      diagnostic: "Examen de routine",
      status: "Complète",
    },
    {
      id: 2,
      date: "12 Sep 2025",
      diagnostic: "Contrôle de la vue",
      status: "Complète",
    },
    {
      id: 3,
      date: "28 Août 2025",
      diagnostic: "Bilan cardiaque",
      status: "Complète",
    },
    {
      id: 4,
      date: "15 Juil 2025",
      diagnostic: "Consultation générale",
      status: "Complète",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("medicabinet_user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-48 bg-blue-600 text-white flex flex-col shadow-lg ${language === "ar" ? "rtl" : ""}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500 flex items-center justify-center">
          <img
            src="/MediCabinet-Logo.png"
            alt="MediCabinet"
            width="40"
            height="40"
          />
          <span className="ml-2 font-bold text-lg">MediCabinet</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/patient/dashboard"
            className="w-full px-4 py-3 rounded-lg bg-blue-700 flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>{language === "fr" ? "Tableau de bord" : "لوحة التحكم"}</span>
          </a>
          <a
            href="/patient/rendezvous"
            className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>{language === "fr" ? "Rendez-vous" : "المواعيد"}</span>
          </a>
          <a
            href="/patient/consultations"
            className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>{language === "fr" ? "Consultations" : "الاستشارات"}</span>
          </a>
          <a
            href="/patient/dossier"
            className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>{language === "fr" ? "Dossier médical" : "الملف الطبي"}</span>
          </a>
          <a
            href="/patient/analyses"
            className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>{language === "fr" ? "Analyses" : "التحليلات"}</span>
          </a>
          <a
            href="/patient/assistant"
            className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
          >
            <span></span>
            <span>
              {language === "fr" ? "Assistant virtuel" : "المساعد الافتراضي"}
            </span>
          </a>
        </nav>

        {/* Language Toggle */}
        <div className="p-4 border-t border-blue-500">
          <button className="w-full px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-xs font-medium transition">
            {language === "fr" ? "العربية" : "Français"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm px-8 py-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {language === "fr"
                ? `Bienvenue, ${firstName}`
                : `أهلا, ${firstName}`}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {language === "fr"
                ? "Voici un aperçu de vos rendez-vous et consultations"
                : "إليك نظرة عامة على مواعيدك والاستشارات"}
            </p>
          </div>

          {/* Profile Section - Top Right */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="text-right">
                <p className="font-semibold text-sm text-gray-800">
                  {firstName} {lastName}
                </p>
                <p className="text-xs text-gray-600">
                  {language === "fr" ? "Patient" : "مريض"}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {firstName.charAt(0).toUpperCase()}
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {firstName} {lastName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {userData.email || "email@example.com"}
                  </p>
                  {userData.phone && (
                    <p className="text-xs text-gray-600">{userData.phone}</p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 transition text-red-600 font-medium"
                >
                  {language === "fr" ? "Déconnexion" : "تسجيل الخروج"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Consultations Totales Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-medium mb-2">
                {language === "fr"
                  ? "Consultations totales"
                  : "إجمالي الاستشارات"}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold text-gray-800">4</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {language === "fr" ? "Actif" : "نشط"}
                </span>
              </div>
            </div>

            {/* Status Overview Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-medium mb-2">
                {language === "fr" ? "Status" : "الحالة"}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {language === "fr" ? "À jour" : "محدث"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === "fr"
                      ? "Tous les examens effectués"
                      : "جميع الفحوصات مكتملة"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultations Passées Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                {language === "fr"
                  ? "Consultations passées"
                  : "الاستشارات السابقة"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {language === "fr"
                  ? "Historique de vos consultations médicales"
                  : "سجل استشاراتك الطبية"}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {language === "fr" ? "Date" : "التاريخ"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {language === "fr" ? "Diagnostic" : "التشخيص"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {language === "fr" ? "Statut" : "الحالة"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {language === "fr" ? "Actions" : "الإجراءات"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {consultationsPassed.map((consultation) => (
                    <tr
                      key={consultation.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {consultation.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {consultation.diagnostic}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          {consultation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {language === "fr" ? "Voir détails" : "عرض التفاصيل"}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

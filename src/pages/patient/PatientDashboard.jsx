import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export function PatientDashboard() {
  const { language } = useLanguage();
  const navigate = useNavigate();

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

  const pageContent = (
    <div className="p-4 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          {language === "fr" ? `Bienvenue, ${firstName}` : `أهلا, ${firstName}`}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {language === "fr"
            ? "Voici un aperçu de vos rendez-vous et consultations"
            : "إليك نظرة عامة على مواعيدك والاستشارات"}
        </p>
      </div>
      {/* Consultations Totales Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium mb-2">
            {language === "fr" ? "Consultations totales" : "إجمالي الاستشارات"}
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
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-base lg:text-lg font-semibold text-gray-800">
            {language === "fr" ? "Consultations passées" : "الاستشارات السابقة"}
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
  );

  return <Navbar userRole="patient">{pageContent}</Navbar>;
}

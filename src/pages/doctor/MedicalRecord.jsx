import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const historicalData = [
  {
    id: 1,
    titleFr: "Bilan cardiaque complet",
    titleAr: "الفحص القلبي الشامل",
    date: "15 Oct 2025",
    statusFr: "Complétée",
    statusAr: "مكتمل",
    descriptionFr: "Résultats normaux, suivi dans 6 mois",
    descriptionAr: "النتائج طبيعية، متابعة خلال 6 أشهر",
  },
  {
    id: 2,
    titleFr: "Consultation dermatologique",
    titleAr: "استشارة الجلدية",
    date: "22 Sep 2025",
    statusFr: "Complétée",
    statusAr: "مكتمل",
    descriptionFr: "Traitement prescrit pour 2 semaines",
    descriptionAr: "تم وصف العلاج لمدة أسبوعين",
  },
];

const prescriptionsData = [
  {
    id: 1,
    titleFr: "Amoxicilline",
    titleAr: "أموكسيسيلين",
    date: "10 Apr 2026",
    statusFr: "Actif",
    statusAr: "نشط",
    descriptionFr: "500mg, 3 fois par jour pendant 7 jours",
    descriptionAr: "500 ملغ، 3 مرات يوميًا لمدة 7 أيام",
  },
  {
    id: 2,
    titleFr: "Ibuprofène",
    titleAr: "الإيبوبروفين",
    date: "05 Apr 2026",
    statusFr: "Actif",
    statusAr: "نشط",
    descriptionFr: "400mg, au besoin pour la douleur",
    descriptionAr: "400 ملغ، حسب الحاجة للألم",
  },
];

const analysesData = [
  {
    id: 1,
    titleFr: "Analyse de sang complète",
    titleAr: "تحليل الدم الشامل",
    date: "20 Mar 2026",
    statusFr: "Complétée",
    statusAr: "مكتمل",
    descriptionFr: "Tous les résultats dans les normes",
    descriptionAr: "جميع النتائج ضمن المعايير الطبيعية",
  },
  {
    id: 2,
    titleFr: "Radiographie thoracique",
    titleAr: "الأشعة السينية للصدر",
    date: "15 Mar 2026",
    statusFr: "Complétée",
    statusAr: "مكتمل",
    descriptionFr: "Aucune anomalie détectée",
    descriptionAr: "لم يتم الكشف عن أي شذوذ",
  },
];

const notesData = [
  {
    id: 1,
    titleFr: "Suivi post-consultation",
    titleAr: "المتابعة بعد الاستشارة",
    date: "01 Apr 2026",
    statusFr: "Actif",
    statusAr: "نشط",
    descriptionFr:
      "Patient en bonne santé générale. Continuer le traitement prescrit.",
    descriptionAr: "المريض بحالة صحية عامة جيدة. استمر في العلاج الموصوف.",
  },
  {
    id: 2,
    titleFr: "Observation clinique",
    titleAr: "الملاحظة السريرية",
    date: "28 Mar 2026",
    statusFr: "Actif",
    statusAr: "نشط",
    descriptionFr: "Tension artérielle normale. Fréquence cardiaque stable.",
    descriptionAr: "ضغط الدم طبيعي. معدل ضربات القلب مستقر.",
  },
];

export function MedicalRecord() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("historique");

  const isArabic = language === "ar";

  const translations = {
    fr: {
      title: "Dossier médical",
      subtitle: "Consultez votre historique médical complet",
      alertTitle: "Information manquante:",
      alertMessage: "Veuillez mettre à jour vos informations d'assurance",
      patient: "Patient:",
      birthDate: "Date de naissance:",
      allergies: "Allergies:",
      exportPDF: "Exporter PDF",
      tabs: {
        historique: "Historique",
        prescriptions: "Prescriptions",
        analyses: "Analyses & Radiologies",
        notes: "Notes",
      },
    },
    ar: {
      title: "الملف الطبي",
      subtitle: "راجع سجلك الطبي الكامل",
      alertTitle: "معلومات مفقودة:",
      alertMessage: "يرجى تحديث معلومات التأمين الخاصة بك",
      patient: "المريض:",
      birthDate: "تاريخ الميلاد:",
      allergies: "الحساسيات:",
      exportPDF: "تصدير PDF",
      tabs: {
        historique: "السجل",
        prescriptions: "الوصفات الطبية",
        analyses: "التحليلات والأشعات",
        notes: "الملاحظات",
      },
    },
  };

  const t = translations[isArabic ? "ar" : "fr"];

  const getTabData = () => {
    switch (activeTab) {
      case "prescriptions":
        return prescriptionsData;
      case "analyses":
        return analysesData;
      case "notes":
        return notesData;
      default:
        return historicalData;
    }
  };

  const pageContent = (
    <div className={`space-y-6 p-4 lg:p-8 ${isArabic ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          {t.title}
        </h1>
        <p className="text-gray-600 text-sm">{t.subtitle}</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
        <span className="text-red-700">
          <span className="font-semibold">{t.alertTitle}</span> {t.alertMessage}
        </span>
      </div>

      {/* Patient Info Card with Left Blue Border */}
      <div className="bg-white rounded-lg shadow border-l-4 border-blue-600 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-6 gap-4 lg:gap-6 flex-wrap">
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="text-gray-500 text-sm font-medium">{t.patient}</p>
              <p className="text-gray-800 font-semibold">Omar Kamali</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{t.birthDate}</p>
              <p className="text-gray-800 font-semibold">15/03/1985</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-sm">
                A+
              </span>
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {t.allergies}
                </p>
                <p className="text-red-600 font-semibold">Pénicilline</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
            <Download size={18} />
            {t.exportPDF}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 lg:gap-8 border-b-2 border-gray-200 overflow-x-auto py-2">
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === key
                  ? "text-blue-600 border-b-2 border-blue-600 -mb-2"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 space-y-4">
          {getTabData().map((item) => (
            <div
              key={item.id}
              className="bg-blue-50 rounded-lg p-4 space-y-2 border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {isArabic ? item.titleAr : item.titleFr}
                  </h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                  {isArabic ? item.statusAr : item.statusFr}
                </span>
              </div>
              <p className="text-gray-700">
                {isArabic ? item.descriptionAr : item.descriptionFr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return <Navbar userRole="medecin">{pageContent}</Navbar>;
}

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { Navbar } from "../../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AppointmentBooking() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("2026-04");

  const translations = {
    fr: {
      title: "Prendre un rendez-vous",
      subtitle: "Remplissez le formulaire pour réserver votre consultation",
      appointmentInfo: "Informations du rendez-vous",
      appointmentSubtitle: "Veuillez fournir tous les détails nécessaires",
      reason: "Motif de consultation",
      reasonPlaceholder:
        "Décrivez brièvement la raison de votre consultation...",
      reasonRequired: "*",
      date: "Date du rendez-vous",
      timeSlots: "Créneaux horaires disponibles",
      selectTime: "Sélectionnez une heure",
      book: "Confirmer le rendez-vous",
      cancel: "Annuler",
    },
    ar: {
      title: "حجز موعد",
      subtitle: "املأ النموذج لحجز استشارتك",
      appointmentInfo: "معلومات الموعد",
      appointmentSubtitle: "يرجى تقديم جميع التفاصيل اللازمة",
      reason: "سبب الاستشارة",
      reasonPlaceholder: "اصف بإيجاز سبب استشارتك...",
      reasonRequired: "*",
      date: "تاريخ الموعد",
      timeSlots: "الفترات الزمنية المتاحة",
      selectTime: "اختر وقتًا",
      book: "تأكيد الموعد",
      cancel: "إلغاء",
    },
  };

  const t = translations[isArabic ? "ar" : "fr"];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const getDaysInMonth = (yearMonth) => {
    const [year, month] = yearMonth.split("-");
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (yearMonth) => {
    const [year, month] = yearMonth.split("-");
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split("-");
    const prevDate = new Date(year, parseInt(month) - 2);
    setCurrentMonth(
      `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(
        2,
        "0",
      )}`,
    );
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-");
    const nextDate = new Date(year, parseInt(month));
    setCurrentMonth(
      `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(
        2,
        "0",
      )}`,
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Add empty cells for days before the month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = isArabic
    ? [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

  const dayNames = isArabic
    ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const [year, month] = currentMonth.split("-");

  const pageContent = (
    <div
      className={`p-4 lg:p-8 bg-gray-50 min-h-screen ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            {t.title}
          </h1>
          <p className="text-gray-600 text-sm mt-1">{t.subtitle}</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800">
              {t.appointmentInfo}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {t.appointmentSubtitle}
            </p>
          </div>

          {/* Reason of Consultation */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              {t.reason}
              <span className="text-red-500 ml-1">{t.reasonRequired}</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t.reasonPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Calendar */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                {t.date}
              </label>
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="font-bold text-center text-lg">
                    {monthNames[parseInt(month) - 1]} {year}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-gray-600 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => day && setSelectedDate(day)}
                      disabled={!day}
                      className={`py-2 rounded-lg text-sm font-medium transition ${
                        !day
                          ? "cursor-default"
                          : selectedDate === day
                            ? "bg-gray-800 text-white"
                            : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                {t.timeSlots}
              </label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">{t.selectTime}</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                {timeSlots.map((time, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 lg:py-3 text-sm lg:text-base rounded-lg font-semibold text-white transition ${
                      selectedTime === time
                        ? time === "10:00"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                        : time === "10:00"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-end mt-8">
            <button className="px-4 lg:px-6 py-2 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition text-sm lg:text-base">
              {t.cancel}
            </button>
            <button
              disabled={!reason || !selectedTime}
              className="px-6 lg:px-8 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              {t.book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return <Navbar userRole="patient">{pageContent}</Navbar>;
}

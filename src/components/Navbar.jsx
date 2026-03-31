import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Navbar({ userRole = "patient" }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const userName = userData.firstName
    ? `${userData.firstName} ${userData.lastName}`
    : "User";

  // Get menu items based on user role
  const getMenuItems = () => {
    const baseMenus = {
      patient: [
        { label: t("dashboard"), icon: "📊", path: "/patient/dashboard" },
        { label: t("appointments"), icon: "📅", path: "/patient/rendezvous" },
        {
          label: t("consultations"),
          icon: "📋",
          path: "/patient/consultations",
        },
        { label: t("medicalRecord"), icon: "📄", path: "/patient/dossier" },
        { label: t("analysis"), icon: "🔬", path: "/patient/analyses" },
        {
          label: t("virtualAssistant"),
          icon: "🤖",
          path: "/patient/assistant",
        },
      ],
      medecin: [
        { label: t("dashboard"), icon: "📊", path: "/medecin/dashboard" },
        { label: t("appointments"), icon: "📅", path: "/medecin/rendezvous" },
        { label: t("reports"), icon: "📑", path: "/medecin/rapports" },
        { label: t("patients"), icon: "👥", path: "/medecin/patients" },
      ],
      secretaire: [
        { label: t("dashboard"), icon: "📊", path: "/secretaire/dashboard" },
        { label: t("patients"), icon: "👥", path: "/secretaire/patients" },
        {
          label: t("appointments"),
          icon: "📅",
          path: "/secretaire/rendezvous",
        },
        {
          label: t("notifications"),
          icon: "🔔",
          path: "/secretaire/notifications",
        },
      ],
    };
    return baseMenus[userRole] || baseMenus.patient;
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem("medicabinet_user");
    navigate("/login");
  };

  const getRoleLabel = () => {
    const roleLabels = {
      patient: t("patient"),
      medecin: t("doctor"),
      secretaire: t("secretary"),
    };
    return roleLabels[userRole] || "User";
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

        {/* Profile Section - Clickable Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full p-4 border-b border-blue-500 hover:bg-blue-700 transition flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{userName}</p>
              <p className="text-xs text-blue-100">{getRoleLabel()}</p>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute top-full left-0 right-0 bg-blue-700 border-t border-blue-500 shadow-lg z-50">
              <div className="p-4 border-b border-blue-500">
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-xs text-blue-100">
                  {userData.email || "email@example.com"}
                </p>
                {userData.phone && (
                  <p className="text-xs text-blue-100">{userData.phone}</p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm hover:bg-blue-800 transition text-red-200 font-medium"
              >
                {language === "fr" ? "Déconnexion" : "تسجيل الخروج"}
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setShowProfileMenu(false);
              }}
              className="w-full px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 text-left text-sm font-medium"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Language Toggle - At Bottom */}
        <div className="p-4 border-t border-blue-500">
          <button
            onClick={() => {
              // Language toggle will be handled by main app
              // This is just for UI
            }}
            className="w-full px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded text-xs font-medium transition"
          >
            {language === "fr" ? "العربية" : "Français"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {language === "fr" ? "Bienvenue" : "أهلا و سهلا"},{" "}
              {userName.split(" ")[0]}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {language === "fr"
                ? "Voici un aperçu de vos rendez-vous et consultations"
                : "إليك نظرة عامة على مواعيدك والاستشارات"}
            </p>
          </div>
        </div>

        {/* Placeholder for page content */}
        <div className="p-8" id="page-content">
          {/* Content will be rendered here */}
        </div>
      </div>
    </div>
  );
}

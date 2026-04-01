import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar({ userRole = "patient", children, pageTitle = null }) {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const userName = userData.firstName
    ? `${userData.firstName} ${userData.lastName}`
    : "Utilisateur";
  const initials = userData.firstName
    ? `${userData.firstName[0]}${userData.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const getMenuItems = () => {
    const menus = {
      patient: [
        {
          label: "Tableau de bord",
          labelAr: "الرئيسية",
          path: "/patient/dashboard",
        },
        {
          label: "Rendez-vous",
          labelAr: "المواعيد",
          path: "/patient/rendezvous",
        },
        {
          label: "Consultations",
          labelAr: "الاستشارات",
          path: "/patient/consultations",
        },
        {
          label: "Dossier médical",
          labelAr: "الملف الطبي",
          path: "/patient/dossier",
        },
        {
          label: "Analyses",
          labelAr: "التحاليل",
          path: "/patient/analyses",
        },
      ],
      medecin: [
        {
          label: "Tableau de bord",
          labelAr: "الرئيسية",
          path: "/medecin/dashboard",
        },
        {
          label: "Rendez-vous",
          labelAr: "المواعيد",
          path: "/medecin/rendezvous",
        },
        {
          label: "Patients",
          labelAr: "المرضى",
          path: "/medecin/patients",
        },
        {
          label: "Rapports",
          labelAr: "التقارير",
          path: "/medecin/rapports",
        },
      ],
      secretaire: [
        {
          label: "Tableau de bord",
          labelAr: "الرئيسية",
          path: "/secretaire/dashboard",
        },
        {
          label: "Patients",
          labelAr: "المرضى",
          path: "/secretaire/patients",
        },
        {
          label: "Rendez-vous",
          labelAr: "المواعيد",
          path: "/secretaire/rendezvous",
        },
        {
          label: "Notifications",
          labelAr: "الإشعارات",
          path: "/secretaire/notifications",
        },
      ],
    };
    return menus[userRole] || menus.patient;
  };

  const getRoleLabel = () =>
    ({
      patient: language === "fr" ? "Patient" : "مريض",
      medecin: language === "fr" ? "Médecin" : "طبيب",
      secretaire: language === "fr" ? "Secrétaire" : "سكرتيرة",
    })[userRole] || "Utilisateur";

  const handleLogout = () => {
    localStorage.removeItem("medicabinet_user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="flex h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* ── Sidebar (Collapsible) ── */}
      <aside
        className={`w-56 bg-blue-600 text-white flex flex-col shadow-xl flex-shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "translate-x-0"
            : language === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        } fixed lg:static h-screen z-50 lg:z-auto left-0 lg:left-auto top-0 ${language === "ar" ? "right-0 lg:right-auto" : ""}`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-blue-500 flex items-center gap-3">
          <img
            src="/MediCabinet-Logo.png"
            alt="MediCabinet"
            className="w-9 h-9 object-contain"
          />
          <span className="font-bold text-base tracking-wide">MediCabinet</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {getMenuItems().map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                ${
                  isActive(item.path)
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{language === "ar" ? item.labelAr : item.label}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </nav>

        {/* Language toggle */}
        <div className="px-4 py-4 border-t border-blue-500">
          <button
            onClick={toggleLanguage}
            className="w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-xs font-semibold tracking-wide transition"
          >
            {language === "fr" ? "🌐 العربية" : "🌐 Français"}
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar — toggle button (mobile only) + title + profile */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 flex justify-between items-center flex-shrink-0">
          {/* Left side: toggle button + page title */}
          <div className="flex items-center gap-4 flex-1">
            {/* Toggle sidebar button - show on mobile only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 flex-shrink-0"
              title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Page title - if provided */}
            {pageTitle && (
              <div className="text-xl font-bold text-gray-800">{pageTitle}</div>
            )}
          </div>

          {/* Right side: profile */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {userName}
                </p>
                <p className="text-xs text-gray-400">{getRoleLabel()}</p>
              </div>
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {initials}
              </div>
              <span className="text-gray-400 text-xs">▾</span>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <>
                {/* overlay to close by clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData.email || ""}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 font-medium transition flex items-center gap-2"
                  >
                    <span></span>
                    {language === "fr" ? "Deconnexion" : "تسجيل الخروج"}
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

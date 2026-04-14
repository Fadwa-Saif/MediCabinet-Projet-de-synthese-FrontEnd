import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  FlaskConical,
  Calendar,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import api from "../services/api";

// ── Parse notification contenu (stored as JSON string) ───────────────────────
function parseContenu(contenu) {
  try {
    return JSON.parse(contenu);
  } catch {
    return { message: contenu };
  }
}

// ── Icon per notification type ────────────────────────────────────────────────
function NotifIcon({ type }) {
  const cls = "w-8 h-8 rounded-full flex items-center justify-center shrink-0";
  if (type === "nouvelle_analyse")
    return (
      <div className={`${cls} bg-blue-100`}>
        <FlaskConical size={16} className="text-blue-600" />
      </div>
    );
  if (type === "rdv_rappel" || type === "confirmation")
    return (
      <div className={`${cls} bg-green-100`}>
        <Calendar size={16} className="text-green-600" />
      </div>
    );
  if (type === "annulation")
    return (
      <div className={`${cls} bg-red-100`}>
        <AlertCircle size={16} className="text-red-600" />
      </div>
    );
  return (
    <div className={`${cls} bg-slate-100`}>
      <Bell size={16} className="text-slate-500" />
    </div>
  );
}

// ── Format relative time ──────────────────────────────────────────────────────
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
  return `Il y a ${Math.floor(diff / 86400)} j`;
}

export function Navbar({ userRole = "patient", children, pageTitle = null }) {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifLoading, setNotifLoading] = useState(false);

  const notifRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const userName = userData.firstName
    ? `${userData.firstName} ${userData.lastName}`
    : "Utilisateur";
  const initials = userData.firstName
    ? `${userData.firstName[0]}${userData.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  // ── Fetch notifications ───────────────────────────────────────────────────
  const fetchNotifications = async () => {
    try {
      setNotifLoading(true);
      const res = await api.get("/notifications");
      const all = res.data.data || res.data || [];
      setNotifications(all);
      setUnreadCount(all.filter((n) => !n.lu).length);
    } catch {
      // silently fail — notifications are non-critical
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Mark one notification as read + navigate ──────────────────────────────
  const handleNotifClick = async (notif) => {
    // Mark as read
    if (!notif.lu) {
      try {
        await api.patch(`/notifications/${notif.id}/lire`);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, lu: 1 } : n)),
        );
        setUnreadCount((c) => Math.max(0, c - 1));
      } catch {
        /* ignore */
      }
    }

    setShowNotifPopup(false);

    // Navigate based on type
    const data = parseContenu(notif.contenu);
    if (notif.type === "nouvelle_analyse" && data.analyse_id) {
      if (userRole === "medecin") {
        navigate(`/medecin/analyses/${data.analyse_id}`);
      } else {
        navigate(`/patient/analyses/${data.analyse_id}`);
      }
    } else if (notif.type === "rdv_rappel" || notif.type === "confirmation") {
      navigate(
        userRole === "medecin" ? "/medecin/rendezvous" : "/patient/rendezvous",
      );
    }
  };

  // ── Mark all as read ──────────────────────────────────────────────────────
  const handleMarkAllRead = async () => {
    try {
      await api.post("/notifications/tout-lire");
      setNotifications((prev) => prev.map((n) => ({ ...n, lu: 1 })));
      setUnreadCount(0);
    } catch {
      /* ignore */
    }
  };

  // ── Menu items ────────────────────────────────────────────────────────────
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
        { label: "Analyses", labelAr: "التحاليل", path: "/patient/analyses" },
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
        { label: "Patients", labelAr: "المرضى", path: "/medecin/patients" },
        { label: "Rapports", labelAr: "التقارير", path: "/medecin/rapports" },
      ],
      secretaire: [
        {
          label: "Tableau de bord",
          labelAr: "الرئيسية",
          path: "/secretaire/dashboard",
        },
        { label: "Patients", labelAr: "المرضى", path: "/secretaire/patients" },
        {
          label: "Rendez-vous",
          labelAr: "المواعيد",
          path: "/secretaire/rendezvous",
        },
      ],
    };
    return menus[userRole] || menus.patient;
  };

  const getRoleLabel = () =>
    ({ patient: "Patient", medecin: "Médecin", secretaire: "Secrétaire" })[
      userRole
    ] || "Utilisateur";

  const handleLogout = () => {
    ["token", "user", "role", "profile", "medicabinet_user"].forEach((k) =>
      localStorage.removeItem(k),
    );
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="flex h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`w-56 bg-blue-600 text-white flex flex-col shadow-xl flex-shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "translate-x-0"
            : language === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        } fixed lg:static h-screen z-50 lg:z-auto left-0 lg:left-auto top-0 ${language === "ar" ? "right-0 lg:right-auto" : ""}`}
      >
        <div className="px-5 py-5 border-b border-blue-500 flex items-center gap-3">
          <img
            src="/MediCabinet-Logo.png"
            alt="MediCabinet"
            className="w-9 h-9 object-contain"
          />
          <span className="font-bold text-base tracking-wide">MediCabinet</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {getMenuItems().map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                isActive(item.path)
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-blue-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span>{language === "ar" ? item.labelAr : item.label}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </nav>

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
        {/* ── Top bar ── */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 flex-shrink-0"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {pageTitle && (
              <div className="text-xl font-bold text-gray-800">{pageTitle}</div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* ── Profile ── */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifPopup(false);
                }}
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

              {showProfileMenu && (
                <>
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
                      {language === "fr" ? "Déconnexion" : "تسجيل الخروج"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

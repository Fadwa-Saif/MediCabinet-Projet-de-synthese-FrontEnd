import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import ChatBot from "../shared/ChatBot";

// ─── Helpers ────────────────────────────────────────────────────────────────

const getInitials = (name = "") =>
  name
    .replace("Dr.", "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── Professional Appointment Card ───────────────────────────────────────────

const AppointmentCard = ({ rdv, onDetails, isNext }) => (
  <div
    onClick={() => onDetails(rdv.id)}
    className="group bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer"
  >
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          {/* Clean Avatar */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
              isNext ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            {rdv.medecin_nom ? getInitials(rdv.medecin_nom) : "M"}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900">
                {rdv.medecin_nom ?? "—"}
              </h3>
              {isNext && (
                <span className="px-2 py-0.5 bg-slate-900 text-white text-xs font-medium rounded">
                  Prochain
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm">
              {rdv.medecin_specialite ?? "Médecin"} •{" "}
              {rdv.cabinet ?? "Cabinet Central"}
            </p>

            <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                {formatDate(rdv.date_heure)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                {formatTime(rdv.date_heure)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded text-xs font-medium ${
              rdv.statut?.toLowerCase().includes("confirm")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {rdv.statut ?? "Confirmé"}
          </span>
          <span className="text-slate-400 text-sm group-hover:text-slate-600 transition-colors">
            Détails →
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Clean Loading Skeletons ─────────────────────────────────────────────────

const AppointmentSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-5">
    <div className="flex gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-100 rounded w-1/3" />
        <div className="h-3 bg-slate-100 rounded w-1/4" />
        <div className="flex gap-4 mt-2">
          <div className="h-3 bg-slate-100 rounded w-24" />
          <div className="h-3 bg-slate-100 rounded w-20" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Stat Box Component ─────────────────────────────────────────────────────

const StatBox = ({ label, value, subtext }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-4">
    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="text-2xl font-semibold text-slate-900">{value}</p>
    {subtext && <p className="text-slate-400 text-xs mt-1">{subtext}</p>}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────

export function PatientDashboard() {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const fullName =
    user.prenom && user.nom
      ? `${user.prenom} ${user.nom}`
      : (user.prenom ?? "Patient");

  // State
  const [rdvAVenir, setRdvAVenir] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    dernierCheckup: "Aucun",
    ordonnancesActives: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const rdvResponse = await api.get("/rendezvous");
        const allRendezVous = rdvResponse.data.data ?? rdvResponse.data ?? [];

        const now = new Date();

        const avenir = allRendezVous
          .filter((r) => {
            const rdvDate = new Date(r.date_heure);
            return (
              rdvDate > now &&
              (r.statut?.toLowerCase() === "confirmé" ||
                r.statut?.toLowerCase() === "confirme")
            );
          })
          .sort((a, b) => new Date(a.date_heure) - new Date(b.date_heure));

        const passes = allRendezVous
          .filter((r) => {
            const rdvDate = new Date(r.date_heure);
            return (
              rdvDate <= now ||
              r.statut?.toLowerCase() === "terminé" ||
              r.statut?.toLowerCase() === "termine" ||
              r.statut?.toLowerCase() === "annulé" ||
              r.statut?.toLowerCase() === "annule"
            );
          })
          .sort((a, b) => new Date(b.date_heure) - new Date(a.date_heure))
          .slice(0, 5);

        setRdvAVenir(avenir);
        setConsultations(passes);

        setStats({
          dernierCheckup: passes[0]
            ? formatDate(passes[0].date_heure)
            : "Aucun",
          ordonnancesActives: 0,
        });

        try {
          const notifResponse = await api.get("/notifications/non-lues");
          const notifData = notifResponse.data.data ?? notifResponse.data ?? [];
          setNotifications(Array.isArray(notifData) ? notifData : []);
        } catch (notifErr) {
          console.warn("Failed to fetch notifications:", notifErr);
          setNotifications([]);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.message ??
            "Impossible de charger les données du tableau de bord.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Navbar userRole="patient" pageTitle="Tableau de Bord">
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Clean Header */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Bonjour, {fullName}
                </h1>
                <p className="text-slate-500 mt-1">
                  Voici un résumé de vos informations médicales
                </p>
              </div>
              <button
                onClick={() => navigate("/patient/rendezvous/nouveau")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span>+</span>
                Nouveau rendez-vous
              </button>
            </div>
          </header>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => window.location.reload()}
                className="text-red-700 font-medium hover:underline"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatBox
              label="Rendez-vous à venir"
              value={loading ? "—" : rdvAVenir.length}
            />
            <StatBox
              label="Consultations passées"
              value={loading ? "—" : consultations.length}
            />
            <StatBox
              label="Dernier check-up"
              value={
                loading ? "—" : stats.dernierCheckup === "Aucun" ? "—" : "✓"
              }
              subtext={
                !loading && stats.dernierCheckup !== "Aucun"
                  ? formatDateShort(consultations[0]?.date_heure)
                  : null
              }
            />
            <StatBox
              label="Notifications"
              value={loading ? "—" : notifications.length}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Appointments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Rendez-vous à venir
                  </h2>
                  <span className="text-sm text-slate-500">
                    {rdvAVenir.length} confirmé
                    {rdvAVenir.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    <>
                      <AppointmentSkeleton />
                      <AppointmentSkeleton />
                    </>
                  ) : rdvAVenir.length === 0 ? (
                    <div className="bg-white border border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <p className="text-slate-500 mb-3">
                        Aucun rendez-vous à venir
                      </p>
                      <button
                        onClick={() => navigate("/patient/rendezvous/nouveau")}
                        className="text-slate-900 font-medium hover:underline text-sm"
                      >
                        Prendre un rendez-vous →
                      </button>
                    </div>
                  ) : (
                    rdvAVenir.map((rdv, index) => (
                      <AppointmentCard
                        key={rdv.id}
                        rdv={rdv}
                        isNext={index === 0}
                        onDetails={(id) =>
                          navigate(`/patient/rendezvous/${id}`)
                        }
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Consultation History */}
              <section className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Historique des consultations
                  </h2>
                  <button
                    onClick={() => navigate("/patient/rendezvous")}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Voir tout →
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Date
                        </th>
                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Praticien
                        </th>
                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Motif
                        </th>
                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loading ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-8 text-center text-slate-400 text-sm"
                          >
                            Chargement...
                          </td>
                        </tr>
                      ) : consultations.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-8 text-center text-slate-400 text-sm"
                          >
                            Aucune consultation passée
                          </td>
                        </tr>
                      ) : (
                        consultations.map((c) => (
                          <tr
                            key={c.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                              {formatDateShort(c.date_heure)}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                                  {c.medecin_nom
                                    ? getInitials(c.medecin_nom)
                                    : "M"}
                                </div>
                                <span className="text-sm font-medium text-slate-900">
                                  {c.medecin_nom ?? "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              {c.motif ?? "Consultation"}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() =>
                                  navigate(`/patient/rendezvous/${c.id}`)
                                }
                                className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors"
                              >
                                Voir
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="space-y-6">
              {/* Notifications */}
              <div className="bg-white border border-slate-200 rounded-lg">
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Rappels</h3>
                  {notifications.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {loading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-12 bg-slate-100 rounded" />
                      <div className="h-12 bg-slate-100 rounded" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">
                      Aucun rappel pour le moment
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notif, index) => (
                        <div
                          key={notif.id ?? index}
                          className="p-3 rounded-lg bg-slate-50 border-l-2 border-slate-300"
                        >
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            {notif.titre ?? notif.title ?? "Notification"}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {notif.message ?? notif.contenu ?? ""}
                          </p>
                          {notif.created_at && (
                            <p className="text-xs text-slate-400 mt-2">
                              {formatDateShort(notif.created_at)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {notifications.length > 3 && (
                    <button
                      onClick={() => navigate("/patient/notifications")}
                      className="w-full mt-4 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Voir tous les rappels →
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white border border-slate-200 rounded-lg">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Accès rapide</h3>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-50 transition-colors text-left">
                    <span className="text-slate-400">→</span>
                    <span className="text-sm text-slate-700">
                      Mes documents
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-50 transition-colors text-left">
                    <span className="text-slate-400">→</span>
                    <span className="text-sm text-slate-700">
                      Contacter le cabinet
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-50 transition-colors text-left">
                    <span className="text-slate-400">→</span>
                    <span className="text-sm text-slate-700">
                      Aide & Support
                    </span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <ChatBot userName={fullName} userRole="Patient" />
      </main>
    </Navbar>
  );
}

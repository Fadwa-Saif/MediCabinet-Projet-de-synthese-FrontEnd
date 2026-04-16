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

const AppointmentCard = ({ rdv, isNext }) => (
  <div
    className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl transition-all duration-200"
  >
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          {/* Avatar with primary color */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
              isNext
                ? "bg-primary text-on-primary"
                : "bg-secondary-container text-on-secondary-container"
            }`}
          >
            {rdv.medecin_nom ? getInitials(rdv.medecin_nom) : "M"}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-headline font-semibold text-lg text-on-surface">
                {rdv.medecin_nom ?? "—"}
              </h3>
              {isNext && (
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-medium rounded-md">
                  Prochain
                </span>
              )}
            </div>
            <p className="text-on-surface-variant text-sm">
              {rdv.medecin_specialite ?? "Médecin"} •{" "}
              {rdv.cabinet ?? "Cabinet Central"}
            </p>

            <div className="flex items-center gap-4 mt-3 text-sm text-on-surface">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {formatDate(rdv.date_heure)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {formatTime(rdv.date_heure)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              rdv.statut?.toLowerCase().includes("confirm")
                ? "bg-primary-container/10 text-primary border border-primary/20"
                : "bg-tertiary-fixed text-on-tertiary-fixed-variant border border-tertiary/20"
            }`}
          >
            {rdv.statut ?? "Confirmé"}
          </span>
          <span className="text-on-surface-variant text-sm font-medium transition-all">
            Confirmé
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Clean Loading Skeletons ─────────────────────────────────────────────────

const AppointmentSkeleton = () => (
  <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5">
    <div className="flex gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-surface-container-high shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-container-high rounded w-1/3" />
        <div className="h-3 bg-surface-container-high rounded w-1/4" />
        <div className="flex gap-4 mt-2">
          <div className="h-3 bg-surface-container-high rounded w-24" />
          <div className="h-3 bg-surface-container-high rounded w-20" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Stat Box Component ─────────────────────────────────────────────────────

const StatBox = ({ label, value, subtext, icon }) => (
  <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 hover:border-primary/20 transition-colors">
    <div className="flex items-start justify-between mb-2">
      <p className="text-on-surface-variant text-xs font-label font-medium uppercase tracking-wide">
        {label}
      </p>
      {icon && <span className="text-primary text-lg">{icon}</span>}
    </div>
    <p className="text-3xl font-headline font-bold text-on-surface">{value}</p>
    {subtext && (
      <p className="text-on-surface-variant text-xs mt-1">{subtext}</p>
    )}
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

        const [rdvResponse, consultationsResponse] = await Promise.all([
          api.get("/rendezvous"),
          api.get("/consultations").catch(() => ({ data: [] })),
        ]);

        const allRendezVous = rdvResponse.data.data ?? rdvResponse.data ?? [];
        const allConsultations =
          consultationsResponse.data?.data ?? consultationsResponse.data ?? [];

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

        const passes = allConsultations
          .filter((c) => !!c)
          .sort(
            (a, b) =>
              new Date(b.date || b.date_heure || 0) -
              new Date(a.date || a.date_heure || 0),
          )
          .slice(0, 5);

        setRdvAVenir(avenir);
        setConsultations(passes);

        setStats({
          dernierCheckup: passes[0]
            ? formatDate(passes[0].date || passes[0].date_heure)
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
      <main className="min-h-screen bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header with signature gradient */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-primary font-label text-sm font-medium uppercase tracking-wider mb-1">
                  Espace Patient
                </p>
                <h1 className="text-3xl font-headline font-bold text-on-background">
                  Bonjour, {fullName}
                </h1>
              </div>
              <button
                onClick={() => navigate("/patient/rendezvous/nouveau")}
                className="inline-flex items-center gap-2 px-6 py-3 signature-gradient text-on-primary text-sm font-label font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                <span>+</span>
                Nouveau rendez-vous
              </button>
            </div>
          </header>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span>!</span>
                {error}
              </span>
              <button
                onClick={() => window.location.reload()}
                className="font-medium hover:underline"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Stats Row with design system colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatBox
              label="Rendez-vous à venir"
              value={loading ? "—" : rdvAVenir.length}
              icon="●"
            />
            <StatBox
              label="Consultations passées"
              value={loading ? "—" : consultations.length}
              icon="●"
            />
            <StatBox
              label="Dernier check-up"
              value={
                loading ? "—" : stats.dernierCheckup === "Aucun" ? "—" : "✓"
              }
              subtext={
                !loading && stats.dernierCheckup !== "Aucun"
                  ? formatDateShort(
                      consultations[0]?.date || consultations[0]?.date_heure,
                    )
                  : null
              }
              icon="●"
            />
            <StatBox
              label="Notifications"
              value={loading ? "—" : notifications.length}
              icon="●"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Appointments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-headline font-bold text-on-surface">
                    Rendez-vous à venir
                  </h2>
                  <span className="text-sm font-label text-on-surface-variant">
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
                    <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-10 text-center">
                      <p className="text-on-surface-variant mb-3">
                        Aucun rendez-vous à venir
                      </p>
                      <button
                        onClick={() => navigate("/patient/rendezvous/nouveau")}
                        className="text-primary font-medium hover:underline text-sm"
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
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Consultation History */}
              <section className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-headline font-bold text-on-surface">
                    Historique des consultations
                  </h2>
                  <button
                    onClick={() => navigate("/patient/consultations")}
                    className="text-sm font-medium text-primary hover:text-on-primary-fixed-variant transition-colors"
                  >
                    Voir tout →
                  </button>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container border-b border-outline-variant/30">
                      <tr>
                        <th className="px-5 py-3 text-xs font-label font-medium text-on-surface-variant uppercase tracking-wide">
                          Date
                        </th>
                        <th className="px-5 py-3 text-xs font-label font-medium text-on-surface-variant uppercase tracking-wide">
                          Praticien
                        </th>
                        <th className="px-5 py-3 text-xs font-label font-medium text-on-surface-variant uppercase tracking-wide">
                          Motif
                        </th>
                        <th className="px-5 py-3 text-xs font-label font-medium text-on-surface-variant uppercase tracking-wide text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {loading ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-8 text-center text-on-surface-variant text-sm"
                          >
                            Chargement...
                          </td>
                        </tr>
                      ) : consultations.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-8 text-center text-on-surface-variant text-sm"
                          >
                            Aucune consultation passée
                          </td>
                        </tr>
                      ) : (
                        consultations.map((c) => (
                          <tr
                            key={c.id}
                            className="hover:bg-surface-container-low transition-colors"
                          >
                            <td className="px-5 py-4 text-sm text-on-surface-variant whitespace-nowrap">
                              {formatDateShort(c.date || c.date_heure)}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-xs font-semibold text-on-secondary-container">
                                  {c.admin?.user
                                    ? getInitials(
                                        `${c.admin.user.prenom || ""} ${c.admin.user.nom || ""}`,
                                      )
                                    : c.medecin_nom
                                      ? getInitials(c.medecin_nom)
                                    : "M"}
                                </div>
                                <span className="text-sm font-medium text-on-surface">
                                  {c.admin?.user
                                    ? `Dr. ${c.admin.user.prenom || ""} ${c.admin.user.nom || ""}`.trim()
                                    : c.medecin_nom ?? "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-on-surface-variant">
                              {c.motif ?? c.diagnostic ?? "Consultation"}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() =>
                                  navigate(`/patient/consultations/${c.id}`)
                                }
                                className="text-primary hover:text-on-primary-fixed-variant text-sm font-medium transition-colors"
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

            {/* Right Column: Sidebar - Only Notifications */}
            <aside>
              {/* Notifications with tertiary/butter yellow accents */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
                <div className="px-5 py-4 border-b border-outline-variant/30 flex items-center justify-between">
                  <h3 className="font-headline font-bold text-lg text-on-surface">
                    Rappels
                  </h3>
                  {notifications.length > 0 && (
                    <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary text-xs font-bold flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {loading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-16 bg-surface-container-high rounded-lg" />
                      <div className="h-16 bg-surface-container-high rounded-lg" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center mx-auto mb-3">
                        <span className="text-on-tertiary-fixed-variant text-lg">
                          ✓
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-sm">
                        Aucun rappel pour le moment
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map((notif, index) => (
                        <div
                          key={notif.id ?? index}
                          className={`p-4 rounded-lg border-l-4 ${
                            notif.type === "urgent" ||
                            notif.priorite === "haute"
                              ? "bg-error-container/30 border-error"
                              : "bg-tertiary-fixed/50 border-tertiary"
                          }`}
                        >
                          <p className="text-sm font-semibold text-on-surface mb-1">
                            {notif.titre ?? notif.title ?? "Notification"}
                          </p>
                          <p className="text-xs text-on-surface-variant line-clamp-2">
                            {notif.message ?? notif.contenu ?? ""}
                          </p>
                          {notif.created_at && (
                            <p className="text-xs text-on-surface-variant/70 mt-2">
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
                      className="w-full mt-4 text-sm font-medium text-primary hover:text-on-primary-fixed-variant transition-colors"
                    >
                      Voir tous les rappels →
                    </button>
                  )}
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

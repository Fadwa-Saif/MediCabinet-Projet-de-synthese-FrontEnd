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

// ─── Appointment Card Component ───────────────────────────────────────────────

const AppointmentCard = ({ rdv, onDetails }) => (
  <div
    onClick={() => onDetails(rdv.id)}
    className="bg-surface-container-lowest p-6 rounded-lg shadow-sm group hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-primary/10"
  >
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-3xl">
            {rdv.medecin_specialite?.toLowerCase().includes("cardio")
              ? "cardiology"
              : rdv.medecin_specialite?.toLowerCase().includes("derma")
                ? "psychiatry"
                : "medical_services"}
          </span>
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">
            {rdv.medecin_nom ?? "—"}
          </h3>
          <p className="text-on-surface-variant text-sm">
            {rdv.medecin_specialite ?? "Médecin"} •{" "}
            {rdv.cabinet ?? "Cabinet Central"}
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm font-medium text-on-surface">
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              {formatDate(rdv.date_heure)}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-on-surface">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              {formatTime(rdv.date_heure)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col justify-between items-end gap-2 shrink-0">
        <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-label font-bold uppercase tracking-wider">
          {rdv.statut ?? "Confirmé"}
        </span>
        <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
          Détails{" "}
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  </div>
);

// ─── Loading Skeletons ────────────────────────────────────────────────────────

const AppointmentSkeleton = () => (
  <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm animate-pulse">
    <div className="flex gap-4">
      <div className="w-14 h-14 rounded-xl bg-surface-container-high shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-surface-container-high rounded w-1/3" />
        <div className="h-4 bg-surface-container-high rounded w-1/4" />
        <div className="flex gap-3 mt-2">
          <div className="h-4 bg-surface-container-high rounded w-24" />
          <div className="h-4 bg-surface-container-high rounded w-20" />
        </div>
      </div>
    </div>
  </div>
);

const ReminderSkeleton = () => (
  <div className="flex gap-3 items-start border-l-4 border-surface-container-high pl-4 animate-pulse">
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-surface-container-high rounded w-3/4" />
      <div className="h-3 bg-surface-container-high rounded w-full" />
    </div>
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

        // Fetch appointments
        const rdvResponse = await api.get("/rendezvous");
        const allRendezVous = rdvResponse.data.data ?? rdvResponse.data ?? [];

        const now = new Date();

        // Filter upcoming appointments (confirmed + future)
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

        // Filter past consultations (completed/cancelled/past dates)
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

        // Update stats based on actual data
        setStats({
          dernierCheckup: passes[0]
            ? formatDate(passes[0].date_heure)
            : "Aucun",
          ordonnancesActives: 0, // Will be updated by separate fetch
        });

        // Fetch notifications/non-lues
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
      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
              Bienvenue, {fullName}
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
              Mon Tableau de Bord
            </h1>
          </div>
          <button
            onClick={() => navigate("/patient/rendezvous/nouveau")}
            className="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-3"
          >
            <span className="material-symbols-outlined"></span>
            Prendre un nouveau rendez-vous
          </button>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-auto text-sm underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1: Next Appointments */}
          <section className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary"></span>
                Prochains Rendez-vous
              </h2>
              <span className="text-sm font-label text-outline uppercase tracking-wider">
                {rdvAVenir.length} Confirmé{rdvAVenir.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid gap-4">
              {loading ? (
                <>
                  <AppointmentSkeleton />
                  <AppointmentSkeleton />
                </>
              ) : rdvAVenir.length === 0 ? (
                <div className="bg-surface-container-lowest p-10 rounded-lg text-center text-on-surface-variant border border-outline-variant/15">
                  <span className="material-symbols-outlined text-4xl mb-3 block text-outline"></span>
                  <p className="mb-4">Aucun rendez-vous à venir.</p>
                  <button
                    onClick={() => navigate("/patient/rendezvous/nouveau")}
                    className="text-primary font-semibold hover:underline text-sm"
                  >
                    Prendre un rendez-vous →
                  </button>
                </div>
              ) : (
                rdvAVenir.map((rdv) => (
                  <AppointmentCard
                    key={rdv.id}
                    rdv={rdv}
                    onDetails={(id) => navigate(`/patient/rendezvous/${id}`)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Column 2: Health Snapshot & Notifications */}
          <aside className="md:col-span-4 space-y-8">
            {/* Health Snapshot */}
            <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-headline font-bold text-lg mb-4">
                  Votre Santé en un coup d'œil
                </h3>
                <div className="space-y-4">
                  <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4">
                    <span className="material-symbols-outlined text-tertiary">
                      monitor_heart
                    </span>
                    <div>
                      <p className="text-xs font-label text-outline uppercase tracking-tight">
                        Dernier Check-up
                      </p>
                      <p className="font-bold text-on-surface">
                        {loading ? "..." : stats.dernierCheckup}
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4">
                    <span className="material-symbols-outlined text-surface-tint">
                      medication
                    </span>
                    <div>
                      <p className="text-xs font-label text-outline uppercase tracking-tight">
                        Traitements Actifs
                      </p>
                      <p className="font-bold text-on-surface">
                        {loading
                          ? "..."
                          : `${stats.ordonnancesActives} ordonnance${stats.ordonnancesActives !== 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Notifications/Reminders */}
            <div className="bg-white rounded-xl border border-outline-variant/15 p-6 shadow-sm">
              <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">
                  notifications
                </span>
                Rappels
              </h3>

              {loading ? (
                <div className="space-y-4">
                  <ReminderSkeleton />
                  <ReminderSkeleton />
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic">
                  Aucun rappel pour le moment.
                </p>
              ) : (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notif, index) => (
                    <div
                      key={notif.id ?? index}
                      className={`flex gap-3 items-start border-l-4 pl-4 ${
                        notif.type === "urgent" || notif.priorite === "haute"
                          ? "border-tertiary"
                          : "border-primary"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          {notif.titre ?? notif.title ?? "Notification"}
                        </p>
                        <p className="text-xs text-on-surface-variant line-clamp-2">
                          {notif.message ?? notif.contenu ?? ""}
                        </p>
                        {notif.created_at && (
                          <p className="text-xs text-outline mt-1">
                            {formatDateShort(notif.created_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {notifications.length > 3 && (
                <button
                  onClick={() => navigate("/patient/notifications")}
                  className="mt-4 text-primary text-sm font-medium hover:underline"
                >
                  Voir tous les rappels →
                </button>
              )}
            </div>
          </aside>

          {/* Bottom Row: Past Appointments History */}
          <section className="md:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-outline">
                  history
                </span>
                Historique des Consultations
              </h2>
              <button
                onClick={() => navigate("/patient/rendezvous")}
                className="text-primary font-medium text-sm hover:underline"
              >
                Voir tout l'historique
              </button>
            </div>

            <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/15">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container">
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                        Date
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                        Praticien
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                        Motif
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                        Résumé
                      </th>
                      <th className="px-6-6 py-4 text-xs font-label uppercase tracking-widest text-outline text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-on-surface-variant"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined animate-spin">
                              refresh
                            </span>
                            Chargement...
                          </div>
                        </td>
                      </tr>
                    ) : consultations.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-on-surface-variant"
                        >
                          Aucune consultation passée.
                        </td>
                      </tr>
                    ) : (
                      consultations.map((c) => (
                        <tr
                          key={c.id}
                          className="hover:bg-white transition-colors"
                        >
                          <td className="px-6 py-5 font-medium whitespace-nowrap text-on-surface">
                            {formatDateShort(c.date_heure)}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden flex items-center justify-center bg-primary-fixed text-primary font-bold text-xs">
                                {c.medecin_nom
                                  ? getInitials(c.medecin_nom)
                                  : "M"}
                              </div>
                              <span className="text-sm font-semibold text-on-surface">
                                {c.medecin_nom ?? "—"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-on-surface-variant">
                            {c.motif ?? "Consultation"}
                          </td>
                          <td className="px-6 py-5 text-sm text-on-surface-variant italic max-w-xs truncate">
                            {c.resume ??
                              c.rapport ??
                              c.notes ??
                              "Pas de résumé disponible"}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button
                              onClick={() =>
                                navigate(`/patient/rendezvous/${c.id}`)
                              }
                              className="text-primary hover:text-primary-container transition-colors"
                              title="Voir détails"
                            >
                              <span className="material-symbols-outlined">
                                download
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <ChatBot userName={fullName} userRole="Patient" />
      </main>

      {/* Global Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none hidden">
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-outline-variant/10 max-w-[280px] mb-2 hidden md:block pointer-events-auto">
          <p className="text-sm text-on-surface font-medium leading-snug">
            Besoin d'aide ? Je suis là pour répondre à vos questions sur vos
            rendez-vous.
          </p>
        </div>
        <button className="w-16 h-16 signature-gradient text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform group pointer-events-auto">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
            smart_toy
          </span>
        </button>
      </div>

      {/* Material Icons Styles */}
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .signature-gradient {
          background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
        }
      `}</style>
    </Navbar>
  );
}

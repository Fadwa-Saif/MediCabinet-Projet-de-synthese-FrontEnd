import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

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

// ─── Appointment Card ────────────────────────────────────────────────────────

const AppointmentCard = ({ rdv, onDetails }) => (
  <div
    onClick={() => onDetails(rdv.id)}
    className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-primary/10"
  >
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg shrink-0">
          {getInitials(rdv.medecin_nom ?? "M")}
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">
            {rdv.medecin_nom ?? "—"}
          </h3>
          <p className="text-on-surface-variant text-sm">
            {rdv.medecin_specialite ?? ""}
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
          {rdv.statut}
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

// ─── Main Component ──────────────────────────────────────────────────────────

export function PatientDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const prenom = user.prenom ?? "Patient";

  const [rdvAVenir, setRdvAVenir] = useState([]); // TODO: GET /api/rendezvous (filtre statut=confirmé + futur)
  const [consultations, setConsultations] = useState([]); // TODO: GET /api/rendezvous (filtre statut=terminé)
  const [snapshot, setSnapshot] = useState(null); // TODO: GET /api/dashboard/stats patient
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const res = await api.get("/rendezvous");
        const data = res.data.data ?? res.data;

        const now = new Date();

        const avenir = data
          .filter(
            (r) =>
              new Date(r.date_heure) > now &&
              r.statut?.toLowerCase() === "confirmé",
          )
          .sort((a, b) => new Date(a.date_heure) - new Date(b.date_heure));

        const passes = data
          .filter((r) => r.statut?.toLowerCase() === "terminé")
          .sort((a, b) => new Date(b.date_heure) - new Date(a.date_heure))
          .slice(0, 5);

        setRdvAVenir(avenir);
        setConsultations(passes);

        // TODO: remplacer par GET /api/dashboard/stats
        setSnapshot({
          dernierCheckup: passes[0]
            ? formatDate(passes[0].date_heure)
            : "Aucun",
          ordonnancesActives: 0, // TODO: GET /api/ordonnances/actives → count
        });
      } catch {
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <Navbar userRole="patient" pageTitle="Tableau de Bord">
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
              Bienvenue, {prenom}
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
              Mon Tableau de Bord
            </h1>
          </div>
          <button
            onClick={() => navigate("/patient/rendezvous/nouveau")}
            className="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-3"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Prendre un nouveau rendez-vous
          </button>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* ── Prochains RDV ───────────────────────────────────────────── */}
          <section className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  event_upcoming
                </span>
                Prochains Rendez-vous
              </h2>
              <span className="text-sm font-label text-outline uppercase tracking-wider">
                {rdvAVenir.length} Confirmé{rdvAVenir.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-surface-container-lowest p-6 rounded-xl animate-pulse h-28"
                  />
                ))}
              </div>
            ) : rdvAVenir.length === 0 ? (
              <div className="bg-surface-container-lowest p-10 rounded-xl text-center text-on-surface-variant border border-outline-variant/15">
                <span className="material-symbols-outlined text-4xl mb-3 block text-outline">
                  event_busy
                </span>
                Aucun rendez-vous à venir.
                <br />
                <button
                  onClick={() => navigate("/patient/rendezvous/nouveau")}
                  className="mt-4 text-primary font-semibold hover:underline text-sm"
                >
                  Prendre un rendez-vous →
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {rdvAVenir.map((rdv) => (
                  <AppointmentCard
                    key={rdv.id}
                    rdv={rdv}
                    onDetails={(id) => navigate(`/patient/rendezvous/${id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── Sidebar droite ───────────────────────────────────────────── */}
          <aside className="md:col-span-4 space-y-8">
            {/* Santé snapshot */}
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
                        {loading ? "..." : (snapshot?.dernierCheckup ?? "—")}
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
                          : `${snapshot?.ordonnancesActives ?? 0} ordonnance(s)`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Rappels — TODO: GET /api/notifications/non-lues */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6 shadow-sm">
              <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">
                  notifications
                </span>
                Rappels
              </h3>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-12 rounded-lg bg-surface-container animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant">
                  Aucun rappel pour le moment.
                  {/* TODO: mapper les notifications depuis GET /api/notifications/non-lues */}
                </p>
              )}
            </div>
          </aside>

          {/* ── Historique des consultations ─────────────────────────────── */}
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
                      {["Date", "Praticien", "Motif", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-10 text-center text-on-surface-variant animate-pulse"
                        >
                          Chargement...
                        </td>
                      </tr>
                    ) : consultations.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
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
                            {formatDate(c.date_heure)}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">
                                {getInitials(c.medecin_nom ?? "M")}
                              </div>
                              <span className="text-sm font-semibold text-on-surface">
                                {c.medecin_nom ?? "—"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-on-surface-variant">
                            {c.motif ?? "—"}
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
                                open_in_new
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
      </main>
    </Navbar>
  );
}

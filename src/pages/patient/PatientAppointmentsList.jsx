import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getInitials = (name = "") =>
  name
    .replace("Dr.", "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (timeStr) => timeStr?.slice(0, 5) ?? "—";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  confirmé: {
    badge: "bg-primary-fixed text-on-primary-fixed",
    avatar: "bg-primary-fixed text-primary",
  },
  "en attente": {
    badge: "bg-tertiary-fixed text-on-tertiary-fixed",
    avatar: "bg-tertiary-fixed text-tertiary",
  },
  terminé: {
    badge: "bg-surface-container-highest text-on-surface-variant",
    avatar: "bg-surface-container-high text-on-surface-variant",
  },
  annulé: {
    badge: "bg-error-container text-on-error-container",
    avatar: "bg-error-container text-error",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const cls =
    STATUS_STYLES[status?.toLowerCase()]?.badge ??
    "bg-surface-container text-on-surface-variant";
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cls}`}
    >
      {status}
    </span>
  );
};

const AvatarInitials = ({ name, status }) => {
  const cls =
    STATUS_STYLES[status?.toLowerCase()]?.avatar ??
    "bg-surface-container text-on-surface-variant";
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${cls}`}
    >
      {getInitials(name)}
    </div>
  );
};

const RowAction = ({ rdv, onAnnuler }) => {
  const key = rdv.statut?.toLowerCase();
  if (key === "terminé")
    return (
      <button
        className="text-on-surface-variant hover:text-primary transition-colors"
        title="Voir compte-rendu"
      >
        <span className="material-symbols-outlined">description</span>
      </button>
    );
  if (key === "annulé")
    return (
      <button
        className="text-on-surface-variant hover:text-primary transition-colors"
        title="Reprendre"
      >
        <span className="material-symbols-outlined">refresh</span>
      </button>
    );
  return (
    <button
      onClick={() => onAnnuler(rdv.id)}
      className="text-on-surface-variant hover:text-error transition-colors"
      title="Annuler"
    >
      <span className="material-symbols-outlined">cancel</span>
    </button>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export function PatientAppointmentsList() {
  const navigate = useNavigate();

  const [rendezvous, setRendezvous] = useState([]);
  const [prochain, setProchain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        setLoading(true);
        const res = await api.get("/rendezvous");
        const data = res.data?.data ?? res.data ?? [];
        setRendezvous(data);

        // Premier RDV confirmé dans le futur
        const now = new Date();
        const next = data.find(
          (r) =>
            r.statut?.toLowerCase() === "confirmé" &&
            new Date(r.date_heure) > now,
        );
        setProchain(next ?? null);
      } catch {
        setError("Impossible de charger les rendez-vous.");
      } finally {
        setLoading(false);
      }
    };
    fetchRdv();
  }, []);

  const handleAnnuler = async (id) => {
    if (!window.confirm("Confirmer l'annulation de ce rendez-vous ?")) return;
    try {
      await api.patch(`/rendezvous/${id}/annuler`);
      setRendezvous((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: "Annulé" } : r)),
      );
      if (prochain?.id === id) setProchain(null);
    } catch {
      alert("Erreur lors de l'annulation.");
    }
  };

  // Filter out next appointment from table to avoid duplication
  const tableRendezvous = prochain
    ? rendezvous.filter((r) => r.id !== prochain.id)
    : rendezvous;

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <Navbar userRole="patient" pageTitle="Mes Rendez-vous">
      {/* Stitch global styles (Material Symbols + gradient) */}
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block; line-height: 1;
          text-transform: none; letter-spacing: normal;
          word-wrap: normal; white-space: nowrap;
        }
        .signature-gradient { background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%); }
      `}</style>

      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-background mb-2">
              Mes Rendez-vous
            </h1>
            <p className="text-on-surface-variant text-lg">
              Gérez vos consultations passées et à venir en toute simplicité.
            </p>
          </div>
          <button
            onClick={() => navigate("/patient/rendezvous/nouveau")}
            className="signature-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Prendre rendez-vous
          </button>
        </header>

        {/* ── Loading / Error ─────────────────────────────────────────────── */}
        {loading && (
          <div className="flex justify-center items-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin mr-2">
              progress_activity
            </span>
            Chargement...
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-error-container text-on-error-container font-medium">
              <span className="material-symbols-outlined">error</span>
              {error}
              <button
                onClick={() => window.location.reload()}
                className="ml-2 text-sm underline font-semibold hover:no-underline"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* ── Content ─────────────────────────────────────────────────────── */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ── Colonne gauche ─────────────────────────────────────────── */}
            <div className="lg:col-span-4 space-y-6">
              {/* Prochain RDV card */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                    Prochain passage
                  </span>
                  <span className="material-symbols-outlined text-primary">
                    event_upcoming
                  </span>
                </div>

                {prochain ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold text-xl">
                        {getInitials(
                          `${prochain.medecin?.user?.nom ?? ""} ${prochain.medecin?.user?.prenom ?? ""}`,
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-on-surface">
                          Dr. {prochain.medecin?.user?.nom}{" "}
                          {prochain.medecin?.user?.prenom}
                        </h3>
                        <p className="text-sm text-on-surface-variant font-medium">
                          {prochain.medecin?.specialite ?? "—"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 bg-surface-container-low p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">
                          calendar_today
                        </span>
                        <span className="text-on-surface font-medium">
                          {formatDate(prochain.date_heure)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">
                          schedule
                        </span>
                        <span className="text-on-surface font-medium">
                          {formatTime(prochain.date_heure?.split("T")[1])}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">
                          location_on
                        </span>
                        <span className="text-on-surface font-medium">
                          Cabinet MediCabinet
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAnnuler(prochain.id)}
                      className="w-full py-3 text-primary font-bold border-2 border-primary/10 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      Modifier ou annuler
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-4xl mb-2 block text-outline">
                      event_busy
                    </span>
                    Aucun rendez-vous à venir.
                  </div>
                )}
              </div>

              {/* Téléconsultation promo card */}
              <div className="signature-gradient p-6 rounded-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-xl mb-2 font-headline">
                    Téléconsultation ?
                  </h4>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Gagnez du temps en optant pour un rendez-vous vidéo depuis
                    chez vous.
                  </p>
                  <button className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/5 transition-colors">
                    En savoir plus
                  </button>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12">
                  videocam
                </span>
              </div>
            </div>

            {/* ── Colonne droite : tableau ────────────────────────────────── */}
            <div className="lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15 overflow-hidden">
                {/* Table header */}
                <div className="px-6 py-5 border-b border-surface-variant/30 flex items-center justify-between">
                  <h2 className="font-bold text-xl font-headline text-on-surface">
                    Historique et Calendrier
                  </h2>
                  <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      filter_list
                    </span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low/50">
                        {["Date", "Docteur", "Motif", "Statut", ""].map(
                          (h, i) => (
                            <th
                              key={i}
                              className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant/20">
                      {tableRendezvous.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-on-surface-variant"
                          >
                            <span className="material-symbols-outlined text-4xl mb-2 block text-outline">
                              event_note
                            </span>
                            Aucun rendez-vous trouvé.
                          </td>
                        </tr>
                      ) : (
                        tableRendezvous.map((rdv) => {
                          const isPast = ["terminé", "annulé"].includes(
                            rdv.statut?.toLowerCase(),
                          );
                          const medecinNom =
                            `Dr. ${rdv.medecin?.user?.nom ?? ""} ${rdv.medecin?.user?.prenom ?? ""}`.trim();
                          return (
                            <tr
                              key={rdv.id}
                              className="hover:bg-surface-container-low/30 transition-colors"
                            >
                              <td
                                className={`px-6 py-5 ${isPast ? "opacity-60" : ""}`}
                              >
                                <div className="font-bold text-on-surface">
                                  {formatDate(rdv.date_heure)}
                                </div>
                                <div className="text-xs text-on-surface-variant">
                                  {formatTime(rdv.date_heure?.split("T")[1])}
                                </div>
                              </td>
                              <td
                                className={`px-6 py-5 ${isPast ? "opacity-60" : ""}`}
                              >
                                <div className="flex items-center gap-3">
                                  <AvatarInitials
                                    name={medecinNom}
                                    status={rdv.statut}
                                  />
                                  <span className="font-medium text-on-surface">
                                    {medecinNom}
                                  </span>
                                </div>
                              </td>
                              <td
                                className={`px-6 py-5 text-on-surface-variant font-medium ${isPast ? "opacity-60" : ""}`}
                              >
                                {rdv.motif ?? "—"}
                              </td>
                              <td className="px-6 py-5">
                                <StatusBadge status={rdv.statut} />
                              </td>
                              <td className="px-6 py-5 text-right">
                                <RowAction
                                  rdv={rdv}
                                  onAnnuler={handleAnnuler}
                                />
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Load more */}
                <div className="p-6 bg-surface-container-low/30 flex justify-center">
                  <button className="text-primary font-bold text-sm hover:underline">
                    Afficher plus de rendez-vous
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Navbar>
  );
}
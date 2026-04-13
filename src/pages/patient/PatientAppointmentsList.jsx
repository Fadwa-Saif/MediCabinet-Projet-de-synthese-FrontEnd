import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (timeStr) => timeStr?.slice(0, 5) ?? "—";

const isUpcoming = (dateStr) =>
  dateStr ? new Date(dateStr) > new Date() : false;

// ─── Status config ─────────────────────────────────────────────────────────────
// Valeurs exactes de l'enum Laravel : en_attente | confirme | annule | termine

const STATUS_STYLES = {
  en_attente: "bg-tertiary-fixed text-on-tertiary-fixed",
  confirme: "bg-primary-fixed text-on-primary-fixed",
  annule: "bg-error-container text-on-error-container",
  termine: "bg-surface-container-highest text-on-surface-variant",
};

const STATUS_LABELS = {
  en_attente: "En attente",
  confirme: "Confirmé",
  annule: "Annulé",
  termine: "Terminé",
};

// ─── StatusBadge ───────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase();
  const cls =
    STATUS_STYLES[key] ?? "bg-surface-container text-on-surface-variant";
  const label = STATUS_LABELS[key] ?? status;
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
};

// ─── ActionMenu — portal pour échapper au overflow:hidden du tableau ──────────

const ActionMenu = ({ rdv, onAnnuler, onReprendre, onModifier }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const statut = rdv.statut?.toLowerCase();

  // ── Règles d'actions ───────────────────────────────────────────────────────
  // en_attente → Modifier + Annuler
  // confirme   → Annuler
  // annule     → Reprendre
  // termine    → (pas d'actions)

  const actions = [];

  if (statut === "en_attente") {
    actions.push({
      label: "Modifier",
      icon: "edit",
      onClick: () => {
        onModifier(rdv.id);
        setOpen(false);
      },
      cls: "text-on-surface hover:bg-surface-container-high",
    });
  }

  if (statut === "en_attente" || statut === "confirme") {
    actions.push({
      label: "Annuler",
      icon: "cancel",
      onClick: () => {
        onAnnuler(rdv.id);
        setOpen(false);
      },
      cls: "text-error hover:bg-error-container/30",
    });
  }

  if (statut === "annule") {
    actions.push({
      label: "Reprendre",
      icon: "refresh",
      onClick: () => {
        onReprendre(rdv.id);
        setOpen(false);
      },
      cls: "text-primary hover:bg-primary/5",
    });
  }

  const handleToggle = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const menuWidth = 190;
    const left =
      rect.right - menuWidth > 8 ? rect.right - menuWidth : rect.left;
    setCoords({ top: rect.bottom + 6, left });
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      )
        setOpen(false);
    };
    const closeOnScroll = () => setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("scroll", closeOnScroll, true);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        title="Actions"
      >
        <span className="material-symbols-outlined text-[20px]">more_vert</span>
      </button>

      {open &&
        actions.length > 0 &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              zIndex: 9999,
            }}
            className="min-w-[190px] bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-[0_8px_30px_rgba(0,26,65,0.15)] overflow-hidden animate-fadeIn"
          >
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={a.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${a.cls}`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {a.icon}
                </span>
                {a.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};

// ─── FilterBar ─────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "upcoming", label: "À venir" },
  { key: "past", label: "Passés" },
  { key: "annule", label: "Annulés" },
];

const FilterBar = ({
  active,
  onChange,
  dateFrom,
  dateTo,
  onDateFrom,
  onDateTo,
}) => (
  <div className="flex flex-wrap items-center gap-3">
    <div className="flex items-center gap-1 bg-surface-container-low rounded-xl p-1">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            active === f.key
              ? "bg-surface-container-lowest text-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>

    <div className="flex items-center gap-2 ml-auto">
      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
        Du
      </span>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => onDateFrom(e.target.value)}
        className="text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
      />
      <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
        Au
      </span>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => onDateTo(e.target.value)}
        className="text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
      />
      {(dateFrom || dateTo) && (
        <button
          onClick={() => {
            onDateFrom("");
            onDateTo("");
          }}
          className="text-xs text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
          title="Effacer les dates"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

export function PatientAppointmentsList() {
  const navigate = useNavigate();

  const [rendezvous, setRendezvous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        setLoading(true);
        const res = await api.get("/rendezvous");
        const data = res.data?.data ?? res.data ?? [];
        setRendezvous(data);
      } catch {
        setError("Impossible de charger les rendez-vous.");
      } finally {
        setLoading(false);
      }
    };
    fetchRdv();
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────────

  const handleAnnuler = async (id) => {
    if (!window.confirm("Confirmer l'annulation ?")) return;
    try {
      await api.patch(`/rendezvous/${id}/annuler`);
      setRendezvous((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: "annule" } : r)),
      );
    } catch {
      alert("Erreur lors de l'annulation.");
    }
  };

  const handleReprendre = async (id) => {
    try {
      await api.patch(`/rendezvous/${id}/reprendre`);
      setRendezvous((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: "en_attente" } : r)),
      );
    } catch {
      alert("Erreur lors de la reprise.");
    }
  };

const handleModifier = (id) => {
  navigate(`/patient/rendezvous/modifier/${id}`);
};
  // ── Filtering ─────────────────────────────────────────────────────────────────

  const filtered = rendezvous.filter((r) => {
    const s = r.statut?.toLowerCase();
    if (filter === "upcoming" && !isUpcoming(r.date_heure)) return false;
    if (filter === "past" && isUpcoming(r.date_heure)) return false;
    if (filter === "annule" && s !== "annule") return false;

    const d = r.date_heure ? new Date(r.date_heure) : null;
    if (dateFrom && d && d < new Date(dateFrom)) return false;
    if (dateTo && d && d > new Date(dateTo + "T23:59:59")) return false;

    return true;
  });

  // ── Stats rapides ─────────────────────────────────────────────────────────────

  const stats = {
    total: rendezvous.length,
    upcoming: rendezvous.filter((r) => isUpcoming(r.date_heure)).length,
    annule: rendezvous.filter((r) => r.statut?.toLowerCase() === "annule")
      .length,
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <Navbar userRole="patient" pageTitle="Mes Rendez-vous">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block; line-height: 1;
          text-transform: none; letter-spacing: normal;
          word-wrap: normal; white-space: nowrap;
        }
        .signature-gradient { background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>

      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-background mb-1">
              Mes Rendez-vous
            </h1>
            <p className="text-on-surface-variant text-base">
              Consultez et gérez vos consultations en toute simplicité.
            </p>
          </div>
          <button
            onClick={() => navigate("/patient/rendezvous/nouveau")}
            className="signature-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined">add</span>
            Prendre rendez-vous
          </button>
        </header>

        {/* ── Stats pills ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: "event_note",
              color: "text-on-surface-variant",
            },
            {
              label: "À venir",
              value: stats.upcoming,
              icon: "event_upcoming",
              color: "text-primary",
            },
            {
              label: "Annulés",
              value: stats.annule,
              icon: "event_busy",
              color: "text-error",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${s.color}`}
              >
                {s.icon}
              </span>
              <span className="text-sm font-semibold text-on-surface">
                {s.value}
              </span>
              <span className="text-xs text-on-surface-variant">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Loading / Error ─────────────────────────────────────────────────── */}
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

        {/* ── Table card ───────────────────────────────────────────────────────── */}
        {!loading && !error && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15 overflow-hidden">
            {/* Filter bar */}
            <div className="px-6 py-4 border-b border-surface-variant/20">
              <FilterBar
                active={filter}
                onChange={setFilter}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFrom={setDateFrom}
                onDateTo={setDateTo}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/60">
                    {["Date", "Heure", "Motif", "Statut", ""].map((h, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/15">
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-5xl mb-3 block text-outline">
                          event_note
                        </span>
                        <p className="font-medium">Aucun rendez-vous trouvé.</p>
                        <p className="text-sm mt-1">
                          Essayez de modifier vos filtres.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((rdv) => {
                      const isPast = ["termine", "annule"].includes(
                        rdv.statut?.toLowerCase(),
                      );
                      const [datePart, timePart] = (rdv.date_heure ?? "").split(
                        "T",
                      );
                      return (
                        <tr
                          key={rdv.id}
                          className="hover:bg-surface-container-low/40 transition-colors group"
                        >
                          <td
                            className={`px-6 py-4 ${isPast ? "opacity-55" : ""}`}
                          >
                            <span className="font-semibold text-on-surface text-sm">
                              {formatDate(datePart)}
                            </span>
                          </td>

                          <td
                            className={`px-6 py-4 ${isPast ? "opacity-55" : ""}`}
                          >
                            <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                              <span className="material-symbols-outlined text-[16px]">
                                schedule
                              </span>
                              {formatTime(timePart)}
                            </div>
                          </td>

                          <td
                            className={`px-6 py-4 text-sm text-on-surface-variant font-medium max-w-[220px] truncate ${isPast ? "opacity-55" : ""}`}
                          >
                            {rdv.motif ?? (
                              <span className="italic text-outline">
                                Non précisé
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <StatusBadge status={rdv.statut} />
                          </td>

                          <td className="px-4 py-4 w-12">
                            <ActionMenu
                              rdv={rdv}
                              onAnnuler={handleAnnuler}
                              onReprendre={handleReprendre}
                              onModifier={handleModifier}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer count */}
            <div className="px-6 py-3 bg-surface-container-low/30 border-t border-surface-variant/10 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">
                {filtered.length} rendez-vous affichés
                {filtered.length !== rendezvous.length &&
                  ` sur ${rendezvous.length}`}
              </span>
              {filtered.length < rendezvous.length && (
                <button
                  onClick={() => {
                    setFilter("all");
                    setDateFrom("");
                    setDateTo("");
                  }}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Tout afficher
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </Navbar>
  );
}

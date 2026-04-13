import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

// ─── Helpers ────────────────────────────────────────────────────────────────

const JOURS = ["LU", "MA", "ME", "JE", "VE", "SA", "DI"];
const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const toDateStr = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const formatDateLabel = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── Mini Calendar ───────────────────────────────────────────────────────────

function MiniCalendar({ selectedDate, onSelect, availableDates }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  };

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/15">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-on-surface">
          {MOIS[viewMonth]} {viewYear}
        </span>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-surface-container-high rounded transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-surface-container-high rounded transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-on-surface-variant font-medium font-label">
        {JOURS.map((j) => (
          <div key={j}>{j}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const dateStr = toDateStr(viewYear, viewMonth, day);
          const isToday =
            dateStr ===
            toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
          const isPast =
            new Date(dateStr) <
            new Date(
              toDateStr(today.getFullYear(), today.getMonth(), today.getDate()),
            );
          const isAvail = availableDates.includes(dateStr);
          const isSel = selectedDate === dateStr;

          return (
            <button
              key={idx}
              disabled={isPast || !isAvail}
              onClick={() => onSelect(dateStr)}
              className={`h-8 w-full flex items-center justify-center rounded text-sm font-medium transition-all
                ${isSel ? "bg-primary text-white font-bold shadow-md" : ""}
                ${!isSel && isAvail && !isPast ? "hover:bg-primary/10 text-primary cursor-pointer" : ""}
                ${isPast || !isAvail ? "text-on-surface-variant/30 cursor-not-allowed" : ""}
                ${isToday && !isSel ? "ring-2 ring-primary/40 rounded" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AppointmentBooking() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get rendezvous ID from URL if editing

  const isEditMode = Boolean(id); // Check if we're in edit mode

  const [creneaux, setCreneaux] = useState([]);
  const [availableDates, setAvailDates] = useState([]);
  const [loadingCreneaux, setLoadingCren] = useState(true);
  const [loadingRdv, setLoadingRdv] = useState(isEditMode); // Loading existing data if editing
  const [adminId, setAdminId] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCreneau, setSelectedCreneau] = useState("");
  const [motif, setMotif] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch existing rendezvous data if in edit mode ───────────────────────
  useEffect(() => {
    const fetchExistingRdv = async () => {
      if (!isEditMode) return;

      try {
        setLoadingRdv(true);
        const res = await api.get(`/rendezvous/${id}`);
        const rdv = res.data;

        // Extract date and time from date_heure (format: "2024-01-15T09:30:00")
        const dateHeure = rdv.date_heure;
        const [datePart, timePart] = dateHeure.split("T");
        const heure = timePart.substring(0, 5); // "09:30"

        setSelectedDate(datePart);
        setSelectedCreneau(heure);
        setMotif(rdv.motif || "");
        setAdminId(rdv.admin_id);
      } catch (err) {
        setError("Impossible de charger les données du rendez-vous.");
        console.error(err);
      } finally {
        setLoadingRdv(false);
      }
    };

    fetchExistingRdv();
  }, [id, isEditMode]);

  // ── Fetch admin_id only if not in edit mode (edit mode gets it from rdv) ─
  useEffect(() => {
    if (isEditMode) return; // Skip if editing, adminId comes from existing rdv

    const fetchAdminId = async () => {
      try {
        setLoadingCren(true);
        setError(null);

        const dispoRes = await api.get("/disponibilites");
        const dispoData = Array.isArray(dispoRes.data?.data)
          ? dispoRes.data.data
          : dispoRes.data || [];

        const firstAdminId =
          dispoData.find((d) => d.admin_id)?.admin_id ?? null;
        setAdminId(firstAdminId);
      } catch {
        setError("Impossible de charger les disponibilités du médecin.");
      } finally {
        setLoadingCren(false);
      }
    };

    fetchAdminId();
  }, [isEditMode]);

  // ── Compute available dates ──────────────────────────────────────────────
  useEffect(() => {
    const dayMap = { Lun: 1, Mar: 2, Mer: 3, Jeu: 4, Ven: 5, Sam: 6, Dim: 0 };

    const fetchAvailableDates = async () => {
      if (!adminId) {
        setAvailDates([]);
        return;
      }

      try {
        setLoadingCren(true);
        const res = await api.get(`/disponibilites?admin_id=${adminId}`);
        const data = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data || [];

        const weeklyDays = data
          .filter((d) => d.est_disponible !== false)
          .map((d) => d.jour_semaine)
          .filter(Boolean);

        const exceptionDates = new Set(
          data.map((d) => d.date_exception).filter(Boolean),
        );

        const dates = [];
        const today = new Date();

        // If editing, include the currently selected date even if it's in the past
        // or outside the 45-day window
        if (isEditMode && selectedDate) {
          dates.push(selectedDate);
        }

        for (let i = 0; i < 45; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = toDateStr(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          if (exceptionDates.has(dateStr)) continue;
          const jsDay = date.getDay();
          const hasDay = weeklyDays.some((d) => dayMap[d] === jsDay);
          if (hasDay && !dates.includes(dateStr)) dates.push(dateStr);
        }

        setAvailDates(dates);

        // Only reset selection if not in edit mode
        if (!isEditMode) {
          setSelectedDate("");
          setSelectedCreneau("");
          setCreneaux([]);
        }
      } catch {
        setError("Impossible de charger les disponibilités du médecin.");
      } finally {
        setLoadingCren(false);
      }
    };

    fetchAvailableDates();
  }, [adminId, isEditMode, selectedDate]);

  // ── Fetch slots for selected date ────────────────────────────────────────
  useEffect(() => {
    const fetchSlots = async () => {
      if (!adminId || !selectedDate) {
        setCreneaux([]);
        return;
      }

      try {
        setLoadingCren(true);
        const res = await api.get(
          `/rendezvous/creneaux?admin_id=${adminId}&date=${selectedDate}`,
        );
        const slots = Array.isArray(res.data?.creneaux)
          ? res.data.creneaux
          : [];

        // If editing and the current time slot is not in available slots,
        // add it so it can be selected
        const creneauxList = slots.map((heure) => ({
          date: selectedDate,
          heure,
        }));

        if (isEditMode && selectedCreneau && !slots.includes(selectedCreneau)) {
          creneauxList.push({ date: selectedDate, heure: selectedCreneau });
          creneauxList.sort((a, b) => a.heure.localeCompare(b.heure));
        }

        setCreneaux(creneauxList);
      } catch {
        setError("Impossible de charger les créneaux disponibles.");
        setCreneaux([]);
      } finally {
        setLoadingCren(false);
      }
    };

    fetchSlots();
  }, [adminId, selectedDate, isEditMode, selectedCreneau]);

  const creneauxDuJour = creneaux.filter((c) => c.date === selectedDate);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedCreneau("");
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!selectedDate || !selectedCreneau || !motif.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        admin_id: Number(adminId),
        date_heure: `${selectedDate}T${selectedCreneau}:00`,
        motif: motif.trim(),
        duree_minutes: 30,
      };

      if (isEditMode) {
        // Update existing rendezvous
        await api.patch(`/rendezvous/${id}`, payload);
      } else {
        // Create new rendezvous
        await api.post("/rendezvous", payload);
      }

      navigate("/patient/rendezvous");
    } catch (err) {
      setError(
        err.response?.data?.message ??
          `Erreur lors de ${isEditMode ? "la modification" : "la réservation"}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = loadingCreneaux || loadingRdv;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Navbar
      userRole="patient"
      pageTitle={
        isEditMode ? "Modifier le Rendez-vous" : "Prendre un Rendez-vous"
      }
    >
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">
            {isEditMode ? "Modifier le Rendez-vous" : "Réserver un Rendez-vous"}
          </h1>
          <p className="text-on-surface-variant text-lg">
            {isEditMode
              ? "Modifiez les détails de votre rendez-vous existant."
              : "Sélectionnez vos disponibilités pour votre prochaine consultation."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Colonne gauche ──────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            {/* Date & créneaux */}
            <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  calendar_month
                </span>
                <h2 className="text-xl font-bold font-headline">
                  Choix de la date
                </h2>
              </div>

              {isLoading ? (
                <p className="text-on-surface-variant text-sm animate-pulse">
                  Chargement des disponibilités...
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Calendrier */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label">
                      Calendrier
                    </label>
                    <MiniCalendar
                      selectedDate={selectedDate}
                      onSelect={handleSelectDate}
                      availableDates={availableDates}
                    />
                    {availableDates.length === 0 && (
                      <p className="text-xs text-on-surface-variant mt-2">
                        Aucune disponibilité pour le moment.
                      </p>
                    )}
                  </div>

                  {/* Créneaux horaires */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label">
                      Créneaux disponibles
                    </label>
                    {!selectedDate ? (
                      <p className="text-sm text-on-surface-variant">
                        Sélectionnez une date pour voir les créneaux.
                      </p>
                    ) : creneauxDuJour.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">
                        Aucun créneau disponible pour cette date.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {creneauxDuJour.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedCreneau(c.heure)}
                            className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all border
                              ${
                                selectedCreneau === c.heure
                                  ? "bg-primary text-white border-primary shadow-md font-bold"
                                  : "bg-surface-container-high text-primary border-transparent hover:bg-primary hover:text-white"
                              }`}
                          >
                            {c.heure}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Motif */}
            <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  description
                </span>
                <h2 className="text-xl font-bold font-headline">
                  Détails de la consultation
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 font-label">
                    Motif de consultation <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    placeholder="Décrivez brièvement vos symptômes ou l'objet de votre visite..."
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                  />
                </div>
                <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-tertiary">
                    info
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Vos données de santé sont chiffrées et sécurisées
                    conformément aux normes de protection des données médicales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Résumé sticky ───────────────────────────────────────────── */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)] overflow-hidden">
              <div className="signature-gradient p-6 text-white">
                <h3 className="text-xl font-bold font-headline mb-1">Résumé</h3>
                <p className="text-white/80 text-sm">
                  {isEditMode
                    ? "Modification de la consultation"
                    : "Consultation médicale"}
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4 border-t border-surface-container-high pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">
                      Date
                    </span>
                    <span className="font-bold text-on-surface text-sm">
                      {selectedDate ? (
                        formatDateLabel(selectedDate)
                      ) : (
                        <span className="text-on-surface-variant/50">—</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">
                      Heure
                    </span>
                    <span className="font-bold text-on-surface text-sm">
                      {selectedCreneau || (
                        <span className="text-on-surface-variant/50">—</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">
                      Lieu
                    </span>
                    <span className="font-bold text-on-surface text-sm">
                      Cabinet MediCabinet
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={
                    submitting ||
                    !selectedDate ||
                    !selectedCreneau ||
                    !motif.trim()
                  }
                  className="w-full signature-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all font-headline disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {submitting
                    ? isEditMode
                      ? "Modification..."
                      : "Confirmation..."
                    : isEditMode
                      ? "Modifier le rendez-vous"
                      : "Confirmer le rendez-vous"}
                </button>

                <p className="text-center text-xs text-on-surface-variant px-4">
                  {isEditMode
                    ? "En confirmant, vous modifiez votre rendez-vous existant."
                    : "En confirmant, vous acceptez nos "}
                  {!isEditMode && (
                    <span className="text-primary underline cursor-pointer">
                      conditions d'utilisation
                    </span>
                  )}
                  {!isEditMode && "."}
                </p>

                <button
                  onClick={() => navigate("/patient/rendezvous")}
                  className="w-full py-3 text-on-surface-variant font-medium border border-outline-variant/30 rounded-xl hover:bg-surface-container-low transition-colors text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-surface-container-high/50 border border-outline-variant/10 text-center">
              <p className="text-sm font-bold text-on-surface mb-1">
                Besoin d'aide ?
              </p>
              <p className="text-xs text-on-surface-variant">
                Notre assistant virtuel est disponible pour vous guider 24h/24.
              </p>
            </div>
          </aside>
        </div>

        {/* Background decoration */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px]" />
        </div>
      </main>
    </Navbar>
  );
}

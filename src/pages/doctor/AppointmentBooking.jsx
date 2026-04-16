import { useState, useEffect } from "react";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function AppointmentBooking() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/rendezvous");
        const data = Array.isArray(response.data?.data) ? response.data.data : response.data || [];
        
        const allAppointments = data.map((rdv) => {
          const safeDate = rdv.date_heure ? rdv.date_heure.replace(' ', 'T') : null;
          const jsDate = safeDate ? new Date(safeDate) : null;
          return {
            id: rdv.id,
            date: jsDate ? jsDate.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }) : "—",
            dateValue: jsDate && !Number.isNaN(jsDate.getTime())
              ? jsDate.toISOString().slice(0, 10)
              : "",
            time: jsDate ? jsDate.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }) : "—",
            patient: `${rdv.patient?.user?.prenom || ""} ${rdv.patient?.user?.nom || ""}`.trim() || "—",
            reason: rdv.motif || "Consultation générale",
            status: rdv.statut === "confirme" ? "Confirme" : rdv.statut === "en_attente" ? "En attente" : "Annule",
          };
        });
        
        setAppointments(allAppointments);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement des rendez-vous.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const displayedAppointments = selectedDate
    ? appointments.filter((appointment) => appointment.dateValue === selectedDate)
    : appointments;

  return (
    <Navbar userRole="medecin" pageTitle="Rendez-vous">
      <div className="p-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="mt-1 text-gray-600">
              Vue rapide des consultations programmees pour aujourd&apos;hui.
            </p>
          </div>
          <div className="flex items-end gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Filtrer par date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
              />
            </div>
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Réinitialiser
              </button>
            )}
            <div className="rounded-xl bg-blue-50 px-4 py-3 text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Total
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {loading ? "..." : displayedAppointments.length}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-24 rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : displayedAppointments.length === 0 ? (
          <div className="rounded-lg p-8 text-center bg-slate-50 border border-slate-200">
            <p className="text-gray-600">Aucun rendez-vous pour la date sélectionnée.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Clock3 className="h-4 w-4" />
                      <span className="font-semibold">{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDays className="h-4 w-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <UserRound className="h-4 w-4" />
                      <span className="font-semibold">{appointment.patient}</span>
                    </div>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {appointment.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{appointment.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Navbar>
  );
}

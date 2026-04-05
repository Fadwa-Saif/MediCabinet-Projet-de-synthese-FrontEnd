import { useState, useEffect } from "react";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function AppointmentBooking() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/rendezvous");
        const data = Array.isArray(response.data?.data) ? response.data.data : response.data || [];
        
        // Filter for today's appointments
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = data.filter((rdv) => {
          const rdvDate = rdv.date_heure?.split('T')[0];
          return rdvDate === today;
        }).map((rdv) => ({
          id: rdv.id,
          date: new Date(rdv.date_heure).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          time: new Date(rdv.date_heure).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          patient: `${rdv.patient?.user?.prenom || ""} ${rdv.patient?.user?.nom || ""}`.trim() || "—",
          reason: rdv.motif || "Consultation générale",
          status: rdv.statut === "confirme" ? "Confirme" : rdv.statut === "en_attente" ? "En attente" : "Annule",
        }));
        
        setAppointments(todayAppointments);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement des rendez-vous.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Total
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {loading ? "..." : appointments.length}
            </p>
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
        ) : appointments.length === 0 ? (
          <div className="rounded-lg p-8 text-center bg-slate-50 border border-slate-200">
            <p className="text-gray-600">Aucun rendez-vous prévu pour aujourd'hui.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
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

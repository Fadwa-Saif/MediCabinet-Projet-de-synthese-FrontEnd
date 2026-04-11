import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    estimated: "0h",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await api.get(`/rendezvous?date=${today}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : response.data || [];
        
        const mapped = data.map((rdv) => {
          const safeDate = rdv.date_heure ? rdv.date_heure.replace(' ', 'T') : null;
          return {
            id: rdv.id,
            patientName: `${rdv.patient?.user?.prenom || ""} ${rdv.patient?.user?.nom || ""}`.trim() || "Patient Inconnu",
            patientId: rdv.patient?.id,
            time: safeDate
              ? new Date(safeDate).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—",
            reason: rdv.motif || "Consultation générale",
            status: rdv.statut === 'confirme' ? 'Confirme' : rdv.statut === 'en_attente' ? 'En attente' : 'Annule',
            period: safeDate && parseInt(safeDate.split("T")[1]?.split(":")[0], 10) < 12
              ? 'morning'
              : 'afternoon',
            canLaunch: rdv.statut === 'en_attente',
          };
        });
        
        setAppointments(mapped);
        setStats({
          total: mapped.length,
          completed: mapped.filter((a) => a.status === 'Confirme').length,
          estimated: "4h 20m",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayedAppointments = (() => {
    if (activeFilter === "morning") {
      return appointments.filter((item) => item.period === "morning");
    }
    if (activeFilter === "afternoon") {
      return appointments.filter((item) => item.period === "afternoon");
    }
    return appointments;
  })();

  const onlineUser = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const doctorName = onlineUser.firstName ? `Dr. ${onlineUser.firstName}` : "Dr. Martin";

  const nextPatient = appointments.find((item) => item.canLaunch) || appointments[0];

  return (
    <Navbar userRole="medecin" pageTitle="Rendez-vous du jour">
      <div className="min-h-full bg-[#f2f4f8] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Bonjour, {doctorName}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                Voici votre planning pour aujourd&apos;hui, <span className="text-blue-600">{new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>.
              </p>
            </div>

            <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:w-auto sm:gap-4">
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Statut</p>
                <p className="text-sm font-bold text-blue-700">En ligne</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100 text-sm font-extrabold text-blue-700">
                {getInitials(doctorName)}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
              <h2 className="text-2xl font-extrabold text-slate-900">Vue d&apos;ensemble de la journee</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Rendez-vous</p>
                  <p className="mt-1 text-4xl font-extrabold text-slate-900">{stats.total || 0}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Termines</p>
                  <p className="mt-1 text-4xl font-extrabold text-blue-700">{String(stats.completed || 0).padStart(2, "0")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Temps estime</p>
                  <p className="mt-1 text-4xl font-extrabold text-slate-900">{stats.estimated}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl bg-gradient-to-b from-blue-700 to-blue-600 p-6 text-white shadow-lg lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-100">Prochain patient</p>
              <h3 className="mt-3 text-3xl font-extrabold">{nextPatient?.patientName || "Aucun rendez-vous"}</h3>
              <p className="mt-1 text-sm font-medium text-blue-100">
                {nextPatient?.time || "—"} - Consultation Generale
              </p>

              <button
                type="button"
                onClick={() => nextPatient?.patientId && navigate(`/medecin/medical-record/${nextPatient.patientId}`)}
                disabled={!nextPatient}
                className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lancer la consultation
              </button>
            </article>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <h3 className="text-2xl font-extrabold text-slate-900">Liste des Rendez-vous</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeFilter === "all"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("morning")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeFilter === "morning"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Matin
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("afternoon")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeFilter === "afternoon"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Apres-midi
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Heure</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Motif</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Statut</th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                        Chargement des rendez-vous...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : displayedAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                        Aucun rendez-vous pour ce filtre.
                      </td>
                    </tr>
                  ) : (
                    displayedAppointments.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50">
                      <td className="px-6 py-5">
                        <span className={`text-2xl font-extrabold ${item.canLaunch ? "text-blue-600" : "text-slate-700"}`}>
                          {item.time}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold text-blue-700">
                            {getInitials(item.patientName)}
                          </div>
                          <div>
                            <p className="text-base font-extrabold text-slate-900">{item.patientName}</p>
                            <p className="text-xs font-medium text-slate-500">{item.meta}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                          {item.reason}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                            item.status === "En attente"
                              ? "bg-orange-100 text-orange-700"
                              : item.status === "Annule"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {item.canLaunch ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/medecin/rapport/${item.id}`)}
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                          >
                            Lancer la consultation
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => navigate(`/medecin/rapport/${item.id}`)}
                            className="text-sm font-bold text-blue-600 transition hover:underline"
                          >
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 text-center sm:px-7">
              <button
                type="button"
                className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
                onClick={() => navigate("/medecin/rendezvous")}
              >
                Voir tous les rendez-vous de la semaine
              </button>
            </div>
          </section>
        </div>
      </div>
    </Navbar>
  );
}

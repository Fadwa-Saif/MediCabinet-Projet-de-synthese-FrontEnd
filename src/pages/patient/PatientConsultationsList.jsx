import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function PatientConsultationsList() {
  const navigate = useNavigate(); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Toutes");
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/consultations");
        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : response.data;
        setConsultations(
          data.map((c) => ({
            id: c.id,
            date: new Date(c.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            motif: c.symptomes || "—",
            diagnostic: c.diagnostic || "—",
            status: "Complétée",
            raw: c,
          })),
        );
      } catch (err) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  // Filter logic
  const filtered = consultations.filter((c) => {
    if (status !== "Toutes" && c.status !== status) return false;
    return true;
  });

  return (
    <Navbar userRole="patient" pageTitle="Mes Consultations">
      <main className="pt-6 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-10">
          <p className="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">
            Historique médical
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">
            Mes Consultations
          </h1>
        </header>

        {/* Error */}
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

        {/* Filters */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/15 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label mb-2">
                Date début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label mb-2">
                Date fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label mb-2">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm appearance-none cursor-pointer"
              >
                <option>Toutes</option>
                <option>Complétée</option>
                <option>En attente</option>
                <option>Annulée</option>
              </select>
            </div>

            {/* Filter Button */}
            <button className="signature-gradient text-white font-bold py-2.5 px-6 rounded-lg shadow hover:shadow-md active:scale-95 transition-all font-headline flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              Filtrer
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/15">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container">
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                    Motif
                  </th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                    Diagnostic
                  </th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {loading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-5">
                          <div className="h-4 bg-surface-container-high rounded w-24" />
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-4 bg-surface-container-high rounded w-40" />
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-4 bg-surface-container-high rounded w-32" />
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-4 bg-surface-container-high rounded w-20" />
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="h-4 bg-surface-container-high rounded w-16 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-4xl block mb-3 text-outline">
                        medical_services
                      </span>
                      Aucune consultation trouvée.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-white transition-colors">
                      <td className="px-6 py-5 font-medium whitespace-nowrap text-on-surface">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-outline">
                            calendar_today
                          </span>
                          {c.date}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">
                        {c.motif}
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant max-w-xs truncate">
                        {c.diagnostic}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider
                          ${
                            c.status === "Complétée"
                              ? "bg-primary-fixed text-on-primary-fixed-variant"
                              : c.status === "Annulée"
                                ? "bg-error-container text-on-error-container"
                                : "bg-surface-container-high text-on-surface-variant"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          className="text-primary hover:text-primary/70 font-semibold text-sm flex items-center gap-1 ml-auto transition-colors"
                          onClick={() =>
                            navigate(`/patient/consultations/${c.id}`)
                          }
                        >
                          Voir détails
                          <span className="material-symbols-outlined text-sm">
                            arrow_forward
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

        {/* Count */}
        {!loading && filtered.length > 0 && (
          <p className="mt-4 text-xs text-outline font-label text-right">
            {filtered.length} consultation{filtered.length !== 1 ? "s" : ""}{" "}
            affichée{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </main>

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

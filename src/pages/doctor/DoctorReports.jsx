import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function DoctorReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/consultations");
        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : response.data || [];

        setReports(
          data.map((c) => ({
            id: c.id,
            patientId: c.patient?.id ?? null,
            patientName:
              `${c.patient?.user?.prenom || ""} ${c.patient?.user?.nom || ""}`.trim() ||
              "-",
            type: c.symptomes || "Consultation generale",
            createdAt: new Date(c.date).toLocaleDateString("fr-FR"),
            doctor:
              `${c.admin?.user?.prenom || ""} ${c.admin?.user?.nom || ""}`.trim() ||
              "-",
            status: "Valide",
          })),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const displayedReports = useMemo(() => {
    if (activeTab === "pending") {
      return reports.filter((report) => report.status === "En attente signature");
    }
    if (activeTab === "validated") {
      return reports.filter((report) => report.status === "Valide");
    }
    return reports;
  }, [activeTab, reports]);

  return (
    <Navbar userRole="medecin" pageTitle="Rapports">
      <div className="min-h-full bg-[#f2f4f8] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Rapports de consultation
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Gere les rapports medicaux et assure le suivi des consultations.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeTab === "all"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("pending")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeTab === "pending"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  En attente
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("validated")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    activeTab === "validated"
                      ? "bg-slate-200 text-slate-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Valides
                </button>
              </div>
            </article>

            <article className="rounded-2xl bg-gradient-to-b from-blue-700 to-blue-600 p-6 text-white shadow-lg lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-100">
                Actions rapides
              </p>
              <h2 className="mt-3 text-2xl font-extrabold">Nouvelle consultation</h2>
              <p className="mt-2 text-sm text-blue-100">
                Cree un nouveau rapport au format de votre dashboard.
              </p>

              <button
                type="button"
                onClick={() => navigate("/medecin/patients")}
                className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Creer un rapport
              </button>
            </article>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold text-slate-500">
                        Chargement...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : displayedReports.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold text-slate-500">
                        Aucun rapport dans cette categorie.
                      </td>
                    </tr>
                  ) : (
                    displayedReports.map((report) => (
                      <tr key={report.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50">
                        <td className="px-6 py-5 text-sm font-extrabold text-slate-900">{report.id}</td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-extrabold text-slate-900">{report.patientName}</p>
                          <p className="text-xs text-slate-500">{report.doctor}</p>
                        </td>
                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">{report.type}</td>
                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">{report.createdAt}</td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                              report.status === "Valide"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              report.patientId
                                ? navigate(`/medecin/medical-record/${report.patientId}?tab=historique`)
                                : null
                            }
                            disabled={!report.patientId}
                            className="text-sm font-bold text-blue-600 transition hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Ouvrir
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
      </div>
    </Navbar>
  );
}
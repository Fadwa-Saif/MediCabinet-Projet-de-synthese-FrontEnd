import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

const reportsSeed = [
  {
    id: "RPT-23011",
    patientName: "Jean Dupont",
    type: "Consultation generale",
    createdAt: "24 Nov. 2023 14:30",
    doctor: "Dr. Claire Lefebvre",
    status: "En attente signature",
  },
  {
    id: "RPT-23008",
    patientName: "Marie Laurent",
    type: "Suivi post-operatoire",
    createdAt: "22 Nov. 2023 10:00",
    doctor: "Dr. Claire Lefebvre",
    status: "Valide",
  },
  {
    id: "RPT-22994",
    patientName: "Robert Bernard",
    type: "Renouvellement ordonnance",
    createdAt: "18 Nov. 2023 11:45",
    doctor: "Dr. Claire Lefebvre",
    status: "Valide",
  },
];

export function DoctorReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const displayedReports = useMemo(() => {
    if (activeTab === "pending") {
      return reportsSeed.filter((report) => report.status === "En attente signature");
    }
    if (activeTab === "validated") {
      return reportsSeed.filter((report) => report.status === "Valide");
    }
    return reportsSeed;
  }, [activeTab]);

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
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-100">Actions rapides</p>
              <h2 className="mt-3 text-2xl font-extrabold">Nouvelle consultation</h2>
              <p className="mt-2 text-sm text-blue-100">
                Cree un nouveau rapport au format de votre dashboard.
              </p>

              <button
                type="button"
                onClick={() => navigate("/medecin/rapport/new")}
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
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Reference</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Type</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Date</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Statut</th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedReports.map((report) => (
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
                          onClick={() => navigate(`/medecin/rapport/${report.id}`)}
                          className="text-sm font-bold text-blue-600 transition hover:underline"
                        >
                          Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}

                  {displayedReports.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold text-slate-500">
                        Aucun rapport dans cette categorie.
                      </td>
                    </tr>
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

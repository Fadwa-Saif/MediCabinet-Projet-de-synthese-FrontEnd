import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

const patientsSeed = [
  {
    id: "MC-99420",
    firstName: "Jean",
    lastName: "Dupont",
    age: 68,
    sex: "Homme",
    lastVisit: "12 Oct. 2023",
    risk: "Urgent",
  },
  {
    id: "MC-10471",
    firstName: "Marie",
    lastName: "Laurent",
    age: 32,
    sex: "Femme",
    lastVisit: "08 Oct. 2023",
    risk: "Suivi",
  },
  {
    id: "MC-86114",
    firstName: "Robert",
    lastName: "Bernard",
    age: 59,
    sex: "Homme",
    lastVisit: "05 Oct. 2023",
    risk: "Stable",
  },
  {
    id: "MC-22016",
    firstName: "Sophie",
    lastName: "Morel",
    age: 29,
    sex: "Femme",
    lastVisit: "02 Oct. 2023",
    risk: "Suivi",
  },
];

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

export function DoctorPatients() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredPatients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patientsSeed;

    return patientsSeed.filter((patient) => {
      const full = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return full.includes(q) || patient.id.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <Navbar userRole="medecin" pageTitle="Patients">
      <div className="min-h-full bg-[#f2f4f8] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Patients du cabinet
                </h1>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Recherchez un dossier et demarrez rapidement une consultation.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher nom ou ID patient"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white sm:w-72"
                />
                <button
                  type="button"
                  onClick={() => navigate("/medecin/rapport/new")}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Nouveau rapport
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-4 border-b border-slate-200 px-6 py-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Patients actifs</p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900">156</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Suivi critique</p>
                <p className="mt-1 text-3xl font-extrabold text-orange-600">09</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Nouveaux ce mois</p>
                <p className="mt-1 text-3xl font-extrabold text-blue-700">14</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Patient</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">ID Patient</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Age / Sexe</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Derniere visite</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Statut</th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold text-blue-700">
                            {initials(patient.firstName, patient.lastName)}
                          </div>
                          <div>
                            <p className="text-base font-extrabold text-slate-900">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-xs text-slate-500">Dossier medical</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-600">{patient.id}</td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                        {patient.age} ans, {patient.sex}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-600">{patient.lastVisit}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                            patient.risk === "Urgent"
                              ? "bg-orange-100 text-orange-700"
                              : patient.risk === "Suivi"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {patient.risk}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/medecin/medical-record/${patient.id}`)}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          Ouvrir dossier
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-semibold text-slate-500">
                        Aucun patient trouve pour cette recherche.
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

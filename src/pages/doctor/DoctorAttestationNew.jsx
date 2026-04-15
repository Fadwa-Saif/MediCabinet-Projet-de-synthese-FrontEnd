import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

function formatDateFr(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

function calculateAge(dateNaissance) {
  if (!dateNaissance) return "-";
  const birth = new Date(dateNaissance);
  if (Number.isNaN(birth.getTime())) return "-";

  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }

  return `${age} ans`;
}

function addDays(dateStr, days) {
  if (!dateStr) return "-";
  const base = new Date(dateStr);
  if (Number.isNaN(base.getTime())) return "-";

  const result = new Date(base);
  result.setDate(result.getDate() + Number(days || 0));
  return result.toISOString().slice(0, 10);
}

export function DoctorAttestationNew() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [dateAttestation, setDateAttestation] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [joursRepos, setJoursRepos] = useState("1");

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/patients");
        const rawList = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];
        setPatients(rawList);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Impossible de charger la liste des patients.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const selectedPatient = useMemo(
    () => patients.find((p) => String(p.id) === String(selectedPatientId)) || null,
    [patients, selectedPatientId],
  );

  const patientFullName = selectedPatient
    ? `${selectedPatient.user?.prenom || ""} ${selectedPatient.user?.nom || ""}`.trim()
    : "";

  const doctorData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const doctorName = `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim();

  const canExport = Boolean(selectedPatient && dateAttestation && Number(joursRepos) > 0);

  const exportPdf = () => {
    if (!canExport) return;

    const doc = new jsPDF();
    const left = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ATTESTATION MEDICALE", 105, 24, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(`Date: ${formatDateFr(dateAttestation)}`, left, 40);
    doc.text(`Medecin: Dr. ${doctorName || "-"}`, left, 48);

    doc.text("Je soussigne Dr., certifie avoir examine ce jour:", left, 66);

    doc.setFont("helvetica", "bold");
    doc.text(`${patientFullName || "-"}`, left, 76);

    doc.setFont("helvetica", "normal");
    doc.text(`CIN: ${selectedPatient?.cin || "-"}`, left, 84);
    doc.text(
      `Date de naissance: ${formatDateFr(selectedPatient?.date_naissance)} (${calculateAge(selectedPatient?.date_naissance)})`,
      left,
      92,
    );

    doc.text(
      `Un repos de ${joursRepos} jour(s) est recommande, a compter du ${formatDateFr(dateAttestation)}.`,
      left,
      108,
    );
    doc.text(
      `Fin previsionnelle du repos: ${formatDateFr(addDays(dateAttestation, joursRepos))}`,
      left,
      116,
    );

    doc.text("Attestation delivree pour servir et valoir ce que de droit.", left, 132);

    doc.text("Signature et cachet:", 140, 165);
    doc.line(140, 170, 195, 170);

    const safeName = (patientFullName || "patient")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const fileDate = dateAttestation || new Date().toISOString().slice(0, 10);

    doc.save(`attestation-${safeName}-${fileDate}.pdf`);
  };

  return (
    <Navbar userRole="medecin" pageTitle="Nouvelle Attestation">
      <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Attestation patient</h1>
            <p className="mt-2 text-sm text-slate-600">
              Selectionnez un patient, puis renseignez la date et la duree de repos.
            </p>
          </section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Patient
                </span>
                <select
                  value={selectedPatientId}
                  onChange={(event) => setSelectedPatientId(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500"
                >
                  <option value="">Choisir un patient...</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {`${patient.user?.prenom || ""} ${patient.user?.nom || ""}`.trim() || "Patient"} ({patient.cin || "Sans CIN"})
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Date de l attestation
                </span>
                <input
                  type="date"
                  value={dateAttestation}
                  onChange={(event) => setDateAttestation(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Jours de repos
                </span>
                <input
                  type="number"
                  min="1"
                  value={joursRepos}
                  onChange={(event) => setJoursRepos(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500"
                  placeholder="Ex: 3"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Apercu</h2>

            {loading ? (
              <p className="mt-4 text-sm text-slate-500">Chargement des patients...</p>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                <p className="font-bold text-slate-900">ATTESTATION MEDICALE</p>
                <p>Date: {formatDateFr(dateAttestation)}</p>
                <p>Medecin: Dr. {doctorName || "-"}</p>
                <p>
                  Patient: <span className="font-semibold">{patientFullName || "-"}</span>
                </p>
                <p>CIN: {selectedPatient?.cin || "-"}</p>
                <p>
                  Date de naissance: {formatDateFr(selectedPatient?.date_naissance)} ({calculateAge(selectedPatient?.date_naissance)})
                </p>
                <p>
                  Repos prescrit: <span className="font-semibold">{joursRepos || "0"} jour(s)</span>
                </p>
                <p>Debut du repos: {formatDateFr(dateAttestation)}</p>
                <p>Fin previsionnelle: {formatDateFr(addDays(dateAttestation, joursRepos))}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={exportPdf}
                disabled={!canExport}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Export PDF
              </button>
            </div>
          </section>
        </div>
      </div>
    </Navbar>
  );
}

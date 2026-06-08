import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function SecretaryRequests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("en_attente");
  const [counts, setCounts] = useState({ en_attente: 0, approuvee: 0, refusee: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/secretary-requests?statut=${statusFilter}`);
      setRequests(response.data.requests || []);
      setCounts(response.data.counts || {});
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Impossible de charger les demandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const handleDecision = async (secretaryId, statut) => {
    setActionLoading(true);
    setError(null);
    try {
      await api.patch(`/secretary-requests/${secretaryId}`, {
        statut,
        motif_refus: statut === "refusee" ? "Non conforme aux critères du cabinet." : null,
      });
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(false);
    }
  };

  const statusLabels = {
    en_attente: "En attente",
    approuvee: "Approuvée",
    refusee: "Refusée",
  };

  return (
    <Navbar userRole="medecin" pageTitle="Demandes de secrétaires">
      <div className="min-h-full bg-[#f2f4f8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Demandes de secrétaires</h1>
                <p className="mt-2 text-sm text-slate-600">
                  Gérez les demandes des secrétaires affiliées à votre cabinet.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center sm:grid-cols-3">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      statusFilter === status
                        ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div>{label}</div>
                    <div className="text-xs text-slate-500">{counts[status] ?? 0}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {loading ? (
              <div className="text-slate-500">Chargement des demandes...</div>
            ) : error ? (
              <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
            ) : requests.length === 0 ? (
              <div className="text-slate-500">Aucune demande pour ce statut.</div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="rounded-3xl border border-slate-200 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                          Demande #{request.id}
                        </p>
                        <h2 className="mt-2 text-xl font-bold text-slate-900">
                          {request.secretary_prenom} {request.secretary_nom}
                        </h2>
                        <p className="text-sm text-slate-500">{request.secretary_email}</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <p className="text-sm font-semibold text-slate-700">Cabinet</p>
                        <p className="text-sm text-slate-500">{request.cabinet_nom}</p>
                        <p className="text-sm text-slate-500">{request.cabinet_ville}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase text-slate-400">Statut</p>
                          <p className="mt-1 font-semibold text-slate-900">{statusLabels[request.statut]}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-slate-400">Date demande</p>
                          <p className="mt-1 text-sm text-slate-700">{new Date(request.date_demande).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-slate-400">Décision</p>
                          <p className="mt-1 text-sm text-slate-700">
                            {request.date_decision ? new Date(request.date_decision).toLocaleDateString("fr-FR") : "—"}
                          </p>
                        </div>
                      </div>
                      {request.motif_refus && (
                        <div className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-700">
                          Motif du refus : {request.motif_refus}
                        </div>
                      )}
                    </div>
                    {request.statut === "en_attente" && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => handleDecision(request.id, "approuvee")}
                          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70"
                        >
                          Approuver
                        </button>
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => handleDecision(request.id, "refusee")}
                          className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-70"
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Navbar>
  );
}

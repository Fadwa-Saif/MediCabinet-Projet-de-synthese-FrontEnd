import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

export function SecretaryWaiting() {
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/auth/me");
        setRequest(response.data.secretary_request || null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Impossible de récupérer le statut de votre demande.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleBackToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("profile");
    localStorage.removeItem("medicabinet_user");
    navigate("/login", { replace: true });
  };

  return (
    <Navbar userRole="secretaire" pageTitle="Demande en attente">
      <div className="min-h-full bg-[#f2f4f8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">Demande en attente</h1>
            <p className="mt-3 text-sm text-slate-600">
              Votre inscription en tant que secrétaire a bien été reçue. Elle doit être
              approuvée par le médecin responsable du cabinet.
            </p>

            {loading ? (
              <div className="mt-8 text-sm text-slate-500">Chargement du statut...</div>
            ) : error ? (
              <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            ) : request ? (
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold text-slate-700">Statut</p>
                  <p className="mt-2 text-2xl font-bold text-blue-700 uppercase">
                    {request.statut === "en_attente" ? "En attente" : request.statut}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-semibold text-slate-700">Cabinet</p>
                    <p className="mt-2 text-base text-slate-900">
                      {request.medecin?.nom ? `${request.medecin.prenom} ${request.medecin.nom}` : "Médecin inconnu"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">Email : {request.medecin?.email || "—"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-semibold text-slate-700">Demande envoyée le</p>
                    <p className="mt-2 text-base text-slate-900">
                      {new Date(request.date_demande).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {request.motif_refus && (
                      <p className="mt-4 text-sm text-rose-700">
                        Motif du refus : {request.motif_refus}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                Aucune demande trouvée pour votre compte. Si le problème persiste, contactez le support.
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Se reconnecter
              </button>
              <p className="text-sm text-slate-500">
                Vous serez informé par email lorsque votre compte sera approuvé.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Navbar>
  );
}

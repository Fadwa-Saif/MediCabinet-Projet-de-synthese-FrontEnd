import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { BrandLogo } from "../../components/BrandLogo";

// DEBUG: Verify API URL is set in Create React App
const DEBUG_URL = process.env.REACT_APP_API_URL || "FALLBACK_USED";
console.log("DEBUG REACT_APP_API_URL:", DEBUG_URL);

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(""); // "error", "pending", "refused"

  const successMessage = location.state?.message || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorType("");
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      if (data.role === "patient") {
        console.log("[LoginPage] Redirecting to patient dashboard");
        navigate("/patient/dashboard", { replace: true });
      } else if (data.role === "medecin") {
        console.log("[LoginPage] Redirecting to doctor dashboard");
        navigate("/medecin/dashboard", { replace: true });
      } else if (data.role === "secretaire") {
        console.log("[LoginPage] Secretary login - secretary_request:", data.secretary_request);
        if (data.secretary_request?.statut === "en_attente") {
          console.log("[LoginPage] Redirecting to secretary pending");
          navigate("/secretaire/en-attente", { replace: true });
        } else {
          console.log("[LoginPage] Redirecting to secretary dashboard");
          navigate("/secretaire/dashboard", { replace: true });
        }
      } else {
        console.log("[LoginPage] Unknown role, redirecting to login:", data.role);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      const errorMsg = err.message || "Une erreur est survenue lors de la connexion";
      console.error("[LoginPage] Login failed:", errorMsg, err);
      
      if (err.isSecretaryPending) {
        setErrorType("pending");
        setError("Votre demande d'accès est en attente d'approbation par le médecin. Vous serez notifié(e) une fois approuvée.");
      } else if (err.isSecretaryRefused) {
        setErrorType("refused");
        setError("Votre demande d'accès a été refusée. Veuillez contacter l'administrateur ou le médecin pour plus d'informations.");
      } else {
        setErrorType("error");
        setError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F5F6FA] p-4 py-8">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
      >
        Retour
      </button>

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
        <div className="mb-6 flex justify-center">
          <BrandLogo showText={false} />
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
          Bienvenue à MediCabinet
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          Connectez-vous avec votre email et votre mot de passe pour accéder à votre espace.
        </p>

        {successMessage && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        {error && errorType === "pending" && (
          <div className="mb-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-800">
            <div className="font-semibold mb-1">⏳ En attente d'approbation</div>
            <div>{error}</div>
          </div>
        )}

        {error && errorType === "refused" && (
          <div className="mb-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800">
            <div className="font-semibold mb-1">❌ Accès refusé</div>
            <div>{error}</div>
          </div>
        )}

        {error && errorType === "error" && (
          <div className="mb-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800">
            <div className="font-semibold mb-1">Erreur de connexion</div>
            <div>{error}</div>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="votreemail@exemple.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label htmlFor="password" className="block text-sm font-medium text-slate-800">
                Mot de passe
              </label>
              <button
                type="button"
                className="text-sm text-slate-500 hover:text-cyan-700 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-cyan-600 py-2.5 font-semibold text-white transition-all hover:bg-cyan-700 disabled:opacity-70"
          >
            {isLoading ? "En cours..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-800">
          Pas encore inscrit ?
          <button
            type="button"
            className="ml-1 font-medium text-cyan-600 hover:underline"
            onClick={() => navigate("/inscription")}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}

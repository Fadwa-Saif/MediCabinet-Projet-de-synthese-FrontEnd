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

  const successMessage = location.state?.message || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      if (data.role === "patient") {
        navigate("/patient/dashboard", { replace: true });
      } else if (data.role === "medecin") {
        navigate("/medecin/dashboard", { replace: true });
      } else if (data.role === "secretaire") {
        if (data.secretary_request?.statut === "en_attente") {
          navigate("/secretaire/en-attente", { replace: true });
        } else {
          navigate("/secretaire/dashboard", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
      console.error("Login error:", err);
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

        {error && (
          <div className="mb-4 rounded-md bg-red-500 p-3 text-sm text-white">
            {error}
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

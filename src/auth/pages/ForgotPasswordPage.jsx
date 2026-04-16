import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.forgotPassword(email);
      const token = data?.token;
      const userEmail = data?.email || email;

      if (!token) {
        setError("Jeton de réinitialisation introuvable.");
        return;
      }

      navigate(
        `/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(userEmail)}`,
      );
    } catch (err) {
      setError(err.message || "Impossible de lancer la réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 shadow p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mot de passe oublié</h1>
        <p className="text-sm text-slate-500 mb-6">
          Saisissez votre email pour définir un nouveau mot de passe.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="utilisateur@exemple.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 disabled:opacity-60"
          >
            {loading ? "Veuillez patienter..." : "Continuer"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-lg border border-slate-300 text-slate-700 font-medium py-2.5 hover:bg-slate-50"
          >
            Retour à la connexion
          </button>
        </form>
      </div>
    </div>
  );
}

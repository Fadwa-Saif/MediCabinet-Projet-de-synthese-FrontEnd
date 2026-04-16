import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const missingParams = useMemo(() => !token || !email, [token, email]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        email,
        token,
        password,
        passwordConfirmation: confirmPassword,
      });

      setSuccess("Mot de passe réinitialisé avec succès.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Impossible de réinitialiser le mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 shadow p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Nouveau mot de passe</h1>
        <p className="text-sm text-slate-500 mb-6">
          Définissez un nouveau mot de passe pour votre compte.
        </p>

        {missingParams && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Lien invalide. Recommencez depuis "Mot de passe oublié".
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-slate-50 text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || missingParams}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 disabled:opacity-60"
          >
            {loading ? "Veuillez patienter..." : "Enregistrer le nouveau mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, translations } from "../../context/LanguageContext.jsx";
import authService from "../../services/authService";
import { BrandLogo } from "../../components/BrandLogo";

export function LoginPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];
  const isRTL = language === "ar";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      if (data.role === "patient") {
        navigate("/patient/dashboard");
      } else if (data.role === "medecin") {
        navigate("/medecin/dashboard");
      } else if (data.role === "secretaire") {
        navigate("/secretaire/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#F5F6FA] p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-sky-700"
      >
        {language === "fr" ? "العربية" : "Français"}
      </button>

      {/* Login Card */}
      <div
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200"
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <BrandLogo showText={false} />
        </div>

        {/* Title and Subtitle */}
        <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
          {t.welcomeTitle}
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          {t.welcomeSubtitle}
        </p>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 rounded-md bg-red-500 p-3 text-sm text-white"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-800"
              >
                {t.password}
              </label>
              <button
                type="button"
                className="text-sm text-slate-500 hover:text-sky-700 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                {t.forgotPassword}
              </button>
            </div>
            <input
              id="password"
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-sky-600 py-2.5 font-medium text-white transition-all hover:bg-sky-700 disabled:opacity-70"
          >
            {isLoading ? "En cours..." : t.login}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-slate-800">
          {t.noAccount}
          <button
            type="button"
            className="ml-1 font-medium text-sky-600 hover:underline"
            onClick={() => navigate("/inscription")}
          >
            {t.createAccount}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, translations } from "../../context/LanguageContext.jsx";
import authService from "../../services/authService";

// Top of LoginPage.jsx
const DEBUG_URL = import.meta.env.VITE_API_URL || "FALLBACK_USED";
console.log("DEBUG VITE_API_URL:", DEBUG_URL);

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
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F5F6FA" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 px-4 py-2 rounded text-sm font-medium transition-all hover:opacity-90"
        style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
      >
        {language === "fr" ? "العربية" : "Français"}
      </button>

      {/* Login Card */}
      <div
        className="w-full max-w-md rounded-lg shadow-lg p-8"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/MediCabinet-Logo.png"
            alt="MediCabinet Logo"
            width="60"
            height="60"
            className="object-contain"
          />
        </div>

        {/* Title and Subtitle */}
        <h1
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "#333333" }}
        >
          {t.welcomeTitle}
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: "#999999" }}>
          {t.welcomeSubtitle}
        </p>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-3 rounded text-sm text-white"
            style={{ backgroundColor: "#DC3545" }}
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
              className="block text-sm font-medium mb-2"
              style={{ color: "#333333" }}
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
              className="w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "#E0E0E0",
                backgroundColor: "#FFFFFF",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: "#333333" }}
              >
                {t.password}
              </label>
              <button
                type="button"
                className="text-sm hover:underline"
                style={{ color: "#999999" }}
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
              className="w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "#E0E0E0",
                backgroundColor: "#FFFFFF",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded text-white font-medium transition-all hover:opacity-90 disabled:opacity-70"
            style={{ backgroundColor: "#007BFF" }}
          >
            {isLoading ? "En cours..." : t.login}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm" style={{ color: "#333333" }}>
          {t.noAccount}
          <button
            type="button"
            className="font-medium ml-1 hover:underline"
            style={{ color: "#007BFF" }}
            onClick={() => navigate("/inscription")}
          >
            {t.createAccount}
          </button>
        </div>
      </div>
    </div>
  );
}

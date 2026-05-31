import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, translations } from "../../context/LanguageContext.jsx";
import authService from "../../services/authService";
import { BrandLogo } from "../../components/BrandLogo";

export function InscriptionPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const t = translations[language];
  const isRTL = language === "ar";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Prénom requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nom requis";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Téléphone requis";
    }
    if (!formData.cin.trim()) {
      newErrors.cin = "CIN requis";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cin: formData.cin,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#F5F6FA] p-4 py-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-sky-700"
      >
        {language === "fr" ? "العربية" : "Français"}
      </button>

      {/* Registration Card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
        {/* Logo */}
        <div className="mb-6 flex justify-center relative">
          <BrandLogo showText={false} />
        </div>

        {/* Title and Subtitle */}
        <h1 className="mb-2 text-center text-2xl font-bold text-slate-800">
          {t.createAccountTitle}
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">
          {t.createAccountSubtitle}
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
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Row 1: Nom + Prénom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-semibold text-slate-700">
                {t.lastName}
              </label>
              <input
                id="lastName" name="lastName" type="text"
                placeholder={t.lastNamePlaceholder}
                value={formData.lastName} onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.lastName ? "border-red-400" : "border-slate-200 bg-white"}`}
              />
              {errors.lastName && <p className="text-xs mt-1 text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-semibold text-slate-700">
                {t.firstName}
              </label>
              <input
                id="firstName" name="firstName" type="text"
                placeholder={t.firstNamePlaceholder}
                value={formData.firstName} onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.firstName ? "border-red-400" : "border-slate-200 bg-white"}`}
              />
              {errors.firstName && <p className="text-xs mt-1 text-red-600">{errors.firstName}</p>}
            </div>
          </div>

          {/* Row 2: Téléphone + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-slate-700">
                {t.phone}
              </label>
              <input
                id="phone" name="phone" type="tel"
                placeholder={t.phonePlaceholder}
                value={formData.phone} onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.phone ? "border-red-400" : "border-slate-200 bg-white"}`}
              />
              {errors.phone && <p className="text-xs mt-1 text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                {t.email}
              </label>
              <input
                id="email" name="email" type="email"
                placeholder="votreemail@exemple.ma"
                value={formData.email} onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.email ? "border-red-400" : "border-slate-200 bg-white"}`}
              />
              {errors.email && <p className="text-xs mt-1 text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Row 3: CIN */}
          <div>
            <label htmlFor="cin" className="mb-1 block text-sm font-semibold text-slate-700">
              {t.cin}
            </label>
            <input
              id="cin" name="cin" type="text"
              placeholder={t.cinPlaceholder}
              value={formData.cin} onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.cin ? "border-red-400" : "border-slate-200 bg-white"}`}
            />
            {errors.cin && <p className="text-xs mt-1 text-red-600">{errors.cin}</p>}
          </div>

          {/* Row 4: Mot de passe */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
              {t.password}
            </label>
            <input
              id="password" name="password" type="password"
              placeholder={t.passwordPlaceholder}
              value={formData.password} onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.password ? "border-red-400" : "border-slate-200 bg-white"}`}
            />
            {errors.password && <p className="text-xs mt-1 text-red-600">{errors.password}</p>}
          </div>

          {/* Row 5: Confirmer mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-slate-700">
              {t.confirmPassword}
            </label>
            <input
              id="confirmPassword" name="confirmPassword" type="password"
              placeholder={t.confirmPasswordPlaceholder}
              value={formData.confirmPassword} onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 ${errors.confirmPassword ? "border-red-400" : "border-slate-200 bg-white"}`}
            />
            {errors.confirmPassword && <p className="text-xs mt-1 text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isLoading}
            className="mt-6 w-full rounded-md bg-sky-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-sky-700 disabled:opacity-70"
          >
            {isLoading ? "En cours..." : t.register}
          </button>

        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-slate-700">
          {t.haveAccount}
          <button
            type="button"
            className="ml-1 font-semibold text-sky-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            {t.signIn}
          </button>
        </div>
      </div>
    </div>
  );
}

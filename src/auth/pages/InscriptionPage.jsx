import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { translations } from "../../context/LanguageContext.jsx";
import authService from "../../services/authService";

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
      className="min-h-screen flex items-center justify-center p-4 py-8 bg-gradient-to-br from-slate-100 to-blue-50"
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

      {/* Registration Card */}
      <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white border-t-4 border-blue-600">
        {/* Logo */}
        <div className="flex justify-center mb-6 relative">
          <img
            src="/MediCabinet-Logo.png"
            alt="MediCabinet Logo"
            width="60"
            height="60"
            className="object-contain"
          />
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          {t.createAccountTitle}
        </h1>
        <p className="text-center text-sm mb-8 text-gray-600">
          {t.createAccountSubtitle}
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
<form onSubmit={handleSubmit} className="space-y-4">

  {/* Row 1: Nom + Prénom */}
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label htmlFor="lastName" className="block text-sm font-semibold mb-1 text-gray-700">
        {t.lastName}
      </label>
      <input
        id="lastName" name="lastName" type="text"
        placeholder={t.lastNamePlaceholder}
        value={formData.lastName} onChange={handleChange}
        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
        style={{ borderColor: errors.lastName ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
      />
      {errors.lastName && <p className="text-xs mt-1 text-red-600">{errors.lastName}</p>}
    </div>

    <div>
      <label htmlFor="firstName" className="block text-sm font-semibold mb-1 text-gray-700">
        {t.firstName}
      </label>
      <input
        id="firstName" name="firstName" type="text"
        placeholder={t.firstNamePlaceholder}
        value={formData.firstName} onChange={handleChange}
        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
        style={{ borderColor: errors.firstName ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
      />
      {errors.firstName && <p className="text-xs mt-1 text-red-600">{errors.firstName}</p>}
    </div>
  </div>

  {/* Row 2: Téléphone + Email */}
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-gray-700">
        {t.phone}
      </label>
      <input
        id="phone" name="phone" type="tel"
        placeholder={t.phonePlaceholder}
        value={formData.phone} onChange={handleChange}
        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
        style={{ borderColor: errors.phone ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
      />
      {errors.phone && <p className="text-xs mt-1 text-red-600">{errors.phone}</p>}
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
        {t.email}
      </label>
      <input
        id="email" name="email" type="email"
        placeholder="votreemail@exemple.ma"
        value={formData.email} onChange={handleChange}
        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
        style={{ borderColor: errors.email ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
      />
      {errors.email && <p className="text-xs mt-1 text-red-600">{errors.email}</p>}
    </div>
  </div>

  {/* Row 3: CIN */}
  <div>
    <label htmlFor="cin" className="block text-sm font-semibold mb-1 text-gray-700">
      {t.cin}
    </label>
    <input
      id="cin" name="cin" type="text"
      placeholder={t.cinPlaceholder}
      value={formData.cin} onChange={handleChange}
      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
      style={{ borderColor: errors.cin ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
    />
    {errors.cin && <p className="text-xs mt-1 text-red-600">{errors.cin}</p>}
  </div>

  {/* Row 4: Mot de passe */}
  <div>
    <label htmlFor="password" className="block text-sm font-semibold mb-1 text-gray-700">
      {t.password}
    </label>
    <input
      id="password" name="password" type="password"
      placeholder={t.passwordPlaceholder}
      value={formData.password} onChange={handleChange}
      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
      style={{ borderColor: errors.password ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
    />
    {errors.password && <p className="text-xs mt-1 text-red-600">{errors.password}</p>}
  </div>

  {/* Row 5: Confirmer mot de passe */}
  <div>
    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1 text-gray-700">
      {t.confirmPassword}
    </label>
    <input
      id="confirmPassword" name="confirmPassword" type="password"
      placeholder={t.confirmPasswordPlaceholder}
      value={formData.confirmPassword} onChange={handleChange}
      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-l-4 focus:border-l-blue-500 transition-colors"
      style={{ borderColor: errors.confirmPassword ? "#DC3545" : "#E0E0E0", backgroundColor: "#FFFFFF" }}
    />
    {errors.confirmPassword && <p className="text-xs mt-1 text-red-600">{errors.confirmPassword}</p>}
  </div>

  {/* Submit */}
  <button
    type="submit" disabled={isLoading}
    className="w-full py-2.5 rounded text-white font-semibold transition-all hover:opacity-90 disabled:opacity-70 mt-6 tracking-wide uppercase text-sm"
    style={{ backgroundColor: "#007BFF" }}
  >
    {isLoading ? "En cours..." : t.register}
  </button>

</form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-700">
          {t.haveAccount}
          <button
            type="button"
            className="font-semibold ml-1 hover:underline"
            style={{ color: "#007BFF" }}
            onClick={() => navigate("/login")}
          >
            {t.signIn}
          </button>
        </div>
      </div>
    </div>
    );
    }


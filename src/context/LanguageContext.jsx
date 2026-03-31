import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr"); // 'fr' or 'ar'

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "ar" : "fr"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  // Add the t function to get translations
  const t = (key) => translations[context.language][key] || key;

  return {
    ...context,
    t,
  };
};

// Comprehensive French and Arabic translations
export const translations = {
  fr: {
    // Common
    ar: "العربية",
    fr: "Français",

    // Login Page
    welcomeTitle: "Bienvenue à MediCabinet",
    welcomeSubtitle: "Connectez-vous pour accéder à votre compte",
    email: "Email",
    emailPlaceholder: "Entrez votre email",
    password: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    login: "Se connecter",
    noAccount: "Vous n'avez pas de compte ?",
    createAccount: "Créer un compte",

    // Registration Page
    createAccountTitle: "Créer un compte MediCabinet",
    createAccountSubtitle: "Remplissez le formulaire pour vous inscrire",
    firstName: "Prénom",
    firstNamePlaceholder: "Ex: Fatima",
    lastName: "Nom",
    lastNamePlaceholder: "Ex: El Amrani",
    phone: "Téléphone",
    phonePlaceholder: "0612345678",
    cin: "CIN (Carte d'identité nationale)",
    cinPlaceholder: "AA123456",
    confirmPassword: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Retapez votre mot de passe",
    haveAccount: "Vous avez déjà un compte ?",
    signIn: "Se connecter",
    register: "S'inscrire",

    // Common buttons
    logout: "Déconnexion",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    back: "Retour",

    // Dashboard Navigation
    dashboard: "Tableau de bord",
    appointments: "Rendez-vous",
    consultations: "Consultations",
    medicalRecord: "Dossier médical",
    analysis: "Analyses",
    virtualAssistant: "Assistant virtuel",
    patients: "Patients",
    notifications: "Notifications",
    reports: "Rapports",
    doctor: "Médecin",
    secretary: "Secrétaire",
    patient: "Patient",
  },

  ar: {
    // Common
    ar: "العربية",
    fr: "Français",

    // Login Page
    welcomeTitle: "مرحبا بك في MediCabinet",
    welcomeSubtitle: "قم بتسجيل الدخول للوصول إلى حسابك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    forgotPassword: "هل نسيت كلمة المرور؟",
    login: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",

    // Registration Page
    createAccountTitle: "إنشاء حساب MediCabinet",
    createAccountSubtitle: "ملء النموذج للتسجيل",
    firstName: "الاسم الأول",
    firstNamePlaceholder: "مثال: فاطمة",
    lastName: "اسم العائلة",
    lastNamePlaceholder: "مثال: العمراني",
    phone: "رقم الهاتف",
    phonePlaceholder: "0612345678",
    cin: "البطاقة الوطنية",
    cinPlaceholder: "AA123456",
    confirmPassword: "تأكيد كلمة المرور",
    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
    haveAccount: "هل لديك حساب بالفعل؟",
    signIn: "تسجيل الدخول",
    register: "التسجيل",

    // Common buttons
    logout: "تسجيل الخروج",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    back: "رجوع",

    // Dashboard Navigation
    dashboard: "لوحة التحكم",
    appointments: "المواعيد",
    consultations: "الاستشارات",
    medicalRecord: "الملف الطبي",
    analysis: "التحليلات",
    virtualAssistant: "المساعد الافتراضي",
    patients: "المرضى",
    notifications: "الإشعارات",
    reports: "التقارير",
    doctor: "الطبيب",
    secretary: "السكرتيرة",
    patient: "المريض",
  },
};

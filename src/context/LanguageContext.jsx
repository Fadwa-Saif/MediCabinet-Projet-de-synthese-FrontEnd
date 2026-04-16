import { createContext, useContext, useState } from "react";

// Create a context for language management (arabic)
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

    // Status Labels
    enAttente: "En attente",
    confirme: "Confirmé",
    annule: "Annulé",
    termine: "Terminé",
    valide: "Validé",
    enCours: "En cours",
    completee: "Complétée",

    // Appointment & Consultation
    myAppointments: "Mes Rendez-vous",
    myConsultations: "Mes Consultations",
    newAppointment: "Nouveau rendez-vous",
    appointmentTime: "Heure du rendez-vous",
    reason: "Motif",
    motif: "Motif",
    confirmAppointment: "Confirmer le rendez-vous",
    cancelAppointment: "Annuler le rendez-vous",
    prescribedAnalysis: "Analyse prescrite",
    sendAnalysis: "Envoyer une Analyse",
    pendingForms: "Formulaires d'analyses en attente",

    // Doctor Dashboard
    appointmentsToday: "Rendez-vous du jour",
    dayOverview: "Vue d'ensemble de la journee",
    launchConsultation: "Lancer la consultation",
    diagnosis: "Diagnostic",
    prescription: "Prescription",

    // Common Actions
    view: "Voir",
    filter: "Filtrer",
    search: "Rechercher",

    // Table Headers
    date: "Date",
    time: "Heure",
    status: "Statut",
    action: "Action",
    actions: "Actions",
    type: "Type",

    // Messages
    noAppointments: "Aucun rendez-vous",
    noConsultations: "Aucune consultation trouvée",
    unknownPatient: "Patient Inconnu",
    generalConsultation: "Consultation générale",

    // Additional Pages
    myProfile: "Mon profil",
    editProfile: "Modifier le profil",
    changePassword: "Changer le mot de passe",
    oldPassword: "Ancien mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirmer le nouveau mot de passe",

    // Medical Records
    medicalRecords: "Dossier médical",
    analysisResults: "Résultats d'analyses",
    uploadAnalysis: "Télécharger une analyse",
    prescriptionHistory: "Historique des ordonnances",

    // Doctor Pages
    myPatients: "Mes Patients",
    patientHistory: "Historique du patient",
    consultationHistory: "Historique des consultations",
    createNewReport: "Créer un nouveau rapport",
    editReport: "Modifier le rapport",
    medications: "Médicaments",
    treatmentPlan: "Plan de traitement",
    medicalAttestation: "Attestation médicale",
    createAttestation: "Créer une attestation",

    // Secretary Pages
    managePatients: "Gérer les patients",
    patientID: "ID Patient",
    birthDate: "Date de naissance",
    address: "Adresse",
    city: "Ville",
    confirmDelete: "Êtes-vous sûr?",
    appointmentCreated: "Rendez-vous créé",
    appointmentUpdated: "Rendez-vous mis à jour",
    appointmentDeleted: "Rendez-vous supprimé",

    // Status Related
    pending: "En attente",
    completed: "Complété",
    cancelled: "Annulé",
    confirmed: "Confirmé",
    inProgress: "En cours",

    // Buttons
    new: "Nouveau",
    download: "Télécharger",
    print: "Imprimer",
    submit: "Soumettre",
    reset: "Réinitialiser",
    confirm: "Confirmer",
    close: "Fermer",
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

    // Status Labels
    enAttente: "في الانتظار",
    confirme: "مؤكد",
    annule: "ملغاة",
    termine: "مكتمل",
    valide: "صالح",
    enCours: "جارٍ",
    completee: "مكتملة",

    // Appointment & Consultation
    myAppointments: "مواعيدي",
    myConsultations: "استشاراتي",
    newAppointment: "موعد جديد",
    appointmentTime: "وقت الموعد",
    reason: "السبب",
    motif: "السبب",
    confirmAppointment: "تأكيد الموعد",
    cancelAppointment: "إلغاء الموعد",
    prescribedAnalysis: "التحليل الموصوف",
    sendAnalysis: "إرسال تحليل",
    pendingForms: "نماذج التحليلات المعلقة",

    // Doctor Dashboard
    appointmentsToday: "المواعيد اليوم",
    dayOverview: "نظرة عامة على اليوم",
    launchConsultation: "بدء الاستشارة",
    diagnosis: "التشخيص",
    prescription: "الوصفة",

    // Common Actions
    view: "عرض",
    filter: "تصفية",
    search: "بحث",

    // Table Headers
    date: "التاريخ",
    time: "الوقت",
    status: "الحالة",
    action: "إجراء",
    actions: "الإجراءات",
    type: "النوع",

    // Messages
    noAppointments: "لا توجد مواعيد",
    noConsultations: "لم يتم العثور على استشارات",
    unknownPatient: "مريض مجهول",
    generalConsultation: "استشارة عامة",

    // Additional Pages
    myProfile: "ملفي الشخصي",
    editProfile: "تعديل الملف الشخصي",
    changePassword: "تغيير كلمة المرور",
    oldPassword: "كلمة المرور القديمة",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",

    // Medical Records
    medicalRecords: "الملف الطبي",
    analysisResults: "نتائج التحليلات",
    uploadAnalysis: "تحميل تحليل",
    prescriptionHistory: "سجل الوصفات الطبية",

    // Doctor Pages
    myPatients: "مرضاي",
    patientHistory: "سجل المريض",
    consultationHistory: "سجل الاستشارات",
    createNewReport: "إنشاء تقرير جديد",
    editReport: "تعديل التقرير",
    medications: "الأدوية",
    treatmentPlan: "خطة العلاج",
    medicalAttestation: "شهادة طبية",
    createAttestation: "إنشاء شهادة",

    // Secretary Pages
    managePatients: "إدارة المرضى",
    patientID: "معرف المريض",
    birthDate: "تاريخ الميلاد",
    address: "العنوان",
    city: "المدينة",
    confirmDelete: "هل أنت متأكد؟",
    appointmentCreated: "تم إنشاء الموعد",
    appointmentUpdated: "تم تحديث الموعد",
    appointmentDeleted: "تم حذف الموعد",

    // Status Related
    pending: "قيد الانتظار",
    completed: "مكتمل",
    cancelled: "ملغى",
    confirmed: "مؤكد",
    inProgress: "جارٍ",

    // Buttons
    new: "جديد",
    download: "تنزيل",
    print: "طباعة",
    submit: "إرسال",
    reset: "إعادة تعيين",
    confirm: "تأكيد",
    close: "إغلاق",
  },
};

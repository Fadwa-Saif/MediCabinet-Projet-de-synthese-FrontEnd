import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CircleUserRound,
  ClipboardList,
  CheckCircle2,
  Search,
  Stethoscope,
} from "lucide-react";
import authService from "../../services/authService";
import { BrandLogo } from "../../components/BrandLogo";

const ROLE_SECTIONS = [
  {
    id: "patient",
    title: "Patient",
    description: "Accès patient sans cabinet à l'inscription.",
    items: [
      {
        value: "patient",
        label: "Patient",
        icon: CircleUserRound,
        detail: "Inscription patient sans création de cabinet.",
      },
    ],
  },
  {
    id: "cabinet",
    title: "Cabinet",
    description: "Contient les rôles Médecin et Secrétaire.",
    items: [
      {
        value: "medecin",
        label: "Docteur",
        icon: Stethoscope,
        detail: "Créez votre cabinet lors de l'inscription.",
      },
      {
        value: "secretaire",
        label: "Secrétaire",
        icon: ClipboardList,
        detail: "Choisissez un cabinet existant via recherche.",
      },
    ],
  },
];

const SPECIALITES = [
  "Médecine générale",
  "Cardiologie",
  "Dermatologie",
  "Pédiatrie",
  "Gynécologie",
  "Ophtalmologie",
  "Dentisterie",
  "Orthopédie",
  "Neurologie",
  "Radiologie",
];

const EMPTY_FORM = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  password: "",
  confirmPassword: "",
  dateNaissance: "",
  specialite: "",
  cabinetNom: "",
  cabinetAdresse: "",
  cabinetVille: "",
};

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-800">{label}</label>
      <input
        {...props}
        className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function InscriptionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cabinetQuery, setCabinetQuery] = useState("");
  const [cabinetResults, setCabinetResults] = useState([]);
  const [cabinetLoading, setCabinetLoading] = useState(false);
  const [cabinetNotFound, setCabinetNotFound] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState(null);

  useEffect(() => {
    if (role !== "secretaire") {
      setCabinetQuery("");
      setCabinetResults([]);
      setCabinetNotFound(false);
      setSelectedCabinet(null);
    }
  }, [role]);

  useEffect(() => {
    if (role !== "secretaire") return undefined;

    const query = cabinetQuery.trim();

    if (query.length < 2) {
      setCabinetResults([]);
      setCabinetNotFound(false);
      return undefined;
    }

    let active = true;
    setCabinetLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await authService.searchCabinets(query);
        if (!active) return;
        setCabinetResults(results);
        setCabinetNotFound(results.length === 0);
      } catch (searchError) {
        if (!active) return;
        console.error("Cabinet search error:", searchError);
        setCabinetResults([]);
        setCabinetNotFound(true);
      } finally {
        if (active) {
          setCabinetLoading(false);
        }
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [cabinetQuery, role]);

  const handleSectionSelect = (sectionId) => {
    if (sectionId === "patient") {
      setRole("patient");
      setStep(2);
    } else {
      setRole(null);
    }
    setErrors({});
    setError("");
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
    setErrors({});
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.prenom.trim()) nextErrors.prenom = "Prénom requis";
    if (!formData.nom.trim()) nextErrors.nom = "Nom requis";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = "Email invalide";
    if (formData.telephone && formData.telephone.trim().length < 8) nextErrors.telephone = "Téléphone invalide";
    if (formData.password.length < 8) nextErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    if (role === "patient") {
      if (!formData.dateNaissance) nextErrors.dateNaissance = "Date de naissance requise";
      if (!formData.telephone.trim()) nextErrors.telephone = "Téléphone requis";
    }

    if (role === "medecin") {
      if (!formData.telephone.trim()) nextErrors.telephone = "Téléphone requis";
      if (!formData.specialite) nextErrors.specialite = "Spécialité requise";
      if (!formData.cabinetNom.trim()) nextErrors.cabinetNom = "Nom du cabinet requis";
      if (!formData.cabinetAdresse.trim()) nextErrors.cabinetAdresse = "Adresse du cabinet requise";
      if (!formData.cabinetVille.trim()) nextErrors.cabinetVille = "Ville du cabinet requise";
    }

    if (role === "secretaire") {
      if (!formData.telephone.trim()) nextErrors.telephone = "Téléphone requis";
      if (!selectedCabinet?.id) nextErrors.cabinet = "Veuillez sélectionner un cabinet";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
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
        role,
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        dateNaissance: role === "patient" ? formData.dateNaissance : undefined,
        specialite: role === "medecin" ? formData.specialite : undefined,
        cabinetNom: role === "medecin" ? formData.cabinetNom : undefined,
        cabinetAdresse: role === "medecin" ? formData.cabinetAdresse : undefined,
        cabinetVille: role === "medecin" ? formData.cabinetVille : undefined,
        cabinet_id: role === "secretaire" ? selectedCabinet?.id : undefined,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter." },
      });
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setRole(null);
    setErrors({});
    setCabinetQuery("");
    setCabinetResults([]);
    setCabinetNotFound(false);
    setSelectedCabinet(null);
    setFormData(EMPTY_FORM);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-cyan-200 hover:text-cyan-700"
          >
            <ArrowLeft size={16} />
            Retour
          </Link>
          <BrandLogo showText />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600">Inscription</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Créez votre compte MediCabinet
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Choisissez une section puis complétez les informations requises.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-500 p-3 text-sm text-white">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Choisissez une section</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {ROLE_SECTIONS.map((section) => {
                  return (
                    <div key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                      <div className="mb-4 flex w-full items-start gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{section.title}</p>
                          <p className="mt-2 text-sm text-slate-500">{section.description}</p>
                        </div>
                      </div>
                      {section.items.length === 1 ? (
                        <button
                          type="button"
                          onClick={() => handleSectionSelect(section.items[0].value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-cyan-300 hover:shadow-md"
                        >
                          <h3 className="text-lg font-semibold text-slate-800">{section.items[0].label}</h3>
                          <p className="mt-2 text-sm text-slate-500">{section.items[0].detail}</p>
                        </button>
                      ) : (
                        <div className="grid gap-4">
                          {section.items.map((item) => {
                            return (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => handleRoleSelect(item.value)}
                                className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-cyan-300 hover:shadow-md"
                              >
                                <h3 className="text-lg font-semibold text-slate-800">{item.label}</h3>
                                <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">Rôle sélectionné</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-800">
                    {ROLE_SECTIONS.flatMap((section) => section.items).find((item) => item.value === role)?.label}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-cyan-200 hover:text-cyan-700"
                >
                  Changer de rôle
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Prénom"
                  name="prenom"
                  type="text"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  error={errors.prenom}
                />
                <Input
                  label="Nom"
                  name="nom"
                  type="text"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  error={errors.nom}
                />
              </div>

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="votreemail@exemple.ma"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 caractères"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                <Input
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              </div>

              <Input
                label="Téléphone"
                name="telephone"
                type="tel"
                placeholder="06 00 00 00 00"
                value={formData.telephone}
                onChange={handleChange}
                error={errors.telephone}
              />

              {role === "patient" && (
                <Input
                  label="Date de naissance"
                  name="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  error={errors.dateNaissance}
                />
              )}

              {role === "medecin" && (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-base font-semibold text-slate-800">Votre Cabinet</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Le cabinet sera créé automatiquement et lié à votre compte.
                    </p>
                    <div className="mt-4 grid gap-4">
                      <Input
                        label="Nom du cabinet"
                        name="cabinetNom"
                        type="text"
                        placeholder="Cabinet Médical Central"
                        value={formData.cabinetNom}
                        onChange={handleChange}
                        error={errors.cabinetNom}
                      />
                      <Input
                        label="Adresse du cabinet"
                        name="cabinetAdresse"
                        type="text"
                        placeholder="123 Rue Mohammed V"
                        value={formData.cabinetAdresse}
                        onChange={handleChange}
                        error={errors.cabinetAdresse}
                      />
                      <Input
                        label="Ville"
                        name="cabinetVille"
                        type="text"
                        placeholder="Casablanca"
                        value={formData.cabinetVille}
                        onChange={handleChange}
                        error={errors.cabinetVille}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800">Spécialité</label>
                    <select
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleChange}
                      className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 ${
                        errors.specialite ? "border-red-400" : "border-slate-200"
                      }`}
                    >
                      <option value="">Choisir une spécialité</option>
                      {SPECIALITES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.specialite && <p className="mt-1 text-xs text-red-600">{errors.specialite}</p>}
                  </div>
                </>
              )}

              {role === "secretaire" && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-800">Cabinet existant</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Recherchez et sélectionnez un cabinet déjà enregistré.
                  </p>

                  <div className="relative mt-4">
                    <div className="relative">
                      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={cabinetQuery}
                        onChange={(e) => {
                          setCabinetQuery(e.target.value);
                          setSelectedCabinet(null);
                          setErrors((prev) => ({ ...prev, cabinet: "" }));
                        }}
                        placeholder="Rechercher un cabinet, un docteur, une spécialité..."
                        className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>

                    {cabinetLoading && (
                      <p className="mt-2 text-xs text-slate-500">Recherche en cours...</p>
                    )}

                    {selectedCabinet && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white">
                        <CheckCircle2 size={14} />
                        {selectedCabinet.label}
                      </div>
                    )}

                    {!selectedCabinet && cabinetNotFound && cabinetQuery.trim().length >= 2 && (
                      <p className="mt-2 text-sm text-slate-500">Aucun cabinet trouvé pour cette recherche.</p>
                    )}

                    {cabinetResults.length > 0 && !selectedCabinet && (
                      <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                        {cabinetResults.map((cabinet) => (
                          <button
                            key={cabinet.id}
                            type="button"
                            onClick={() => {
                              setSelectedCabinet({
                                id: cabinet.id,
                                label: `${cabinet.doctor_nom} — ${cabinet.nom} — ${cabinet.specialite}${cabinet.ville ? ` — ${cabinet.ville}` : ""}`,
                              });
                              setCabinetQuery(`${cabinet.doctor_nom} — ${cabinet.nom}`);
                              setCabinetResults([]);
                              setCabinetNotFound(false);
                            }}
                            className="w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-cyan-50"
                          >
                            <div className="font-semibold text-slate-800">
                              {cabinet.doctor_nom} — {cabinet.nom}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-500">
                              {cabinet.specialite}
                              {cabinet.ville ? ` • ${cabinet.ville}` : ""}
                              {cabinet.adresse ? ` • ${cabinet.adresse}` : ""}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.cabinet && <p className="mt-2 text-xs text-red-600">{errors.cabinet}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-full bg-cyan-600 py-3 text-sm font-semibold text-white transition-all hover:bg-cyan-700 disabled:opacity-70"
              >
                {isLoading ? "Création en cours..." : "Créer mon compte"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-700">
            Déjà inscrit ?
            <Link to="/login" className="ml-1 font-semibold text-cyan-600 hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Trash2,
  Edit2,
  User,
  Calendar,
  AlertTriangle,
  Activity,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  Pill,
  Save,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// TOAST COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium transition-all animate-fade-in
        ${type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
    >
      {type === "success" ? (
        <CheckCircle size={18} />
      ) : (
        <AlertCircle size={18} />
      )}
      {message}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 animate-pulse">
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-surface-container-high shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-container-high rounded w-1/4" />
        <div className="h-4 bg-surface-container-high rounded w-2/3" />
        <div className="h-3 bg-surface-container-high rounded w-1/3" />
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTATION CARD
// ─────────────────────────────────────────────────────────────────────────────

const ConsultationCard = ({ consultation, index, onClick }) => {
  const ordonnances = consultation.ordonnances || [];
  const analyses = consultation.analyses || [];
  const doctorName = consultation.admin?.user
    ? `Dr. ${consultation.admin.user.prenom || ""} ${consultation.admin.user.nom || ""}`.trim()
    : consultation.medecin_nom || null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-outline-variant/30 hover:border-primary/30 hover:shadow-md bg-surface-container-lowest transition-all duration-200 group"
    >
      <div className="p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-on-surface-variant flex items-center justify-center text-sm font-bold shrink-0 transition-colors">
          {String(index).padStart(2, "0")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1.5">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-on-surface">
              <Calendar size={14} className="text-primary" />
              {formatDate(consultation.date || consultation.date_heure)}
            </span>
            {doctorName && (
              <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <User size={14} />
                {doctorName}
              </span>
            )}
          </div>

          {consultation.diagnostic && (
            <p className="text-on-surface font-medium text-sm leading-snug line-clamp-2">
              <span className="text-on-surface-variant font-normal">
                Diagnostic :{" "}
              </span>
              {consultation.diagnostic}
            </p>
          )}

          {consultation.symptomes && (
            <p className="text-on-surface-variant text-xs mt-1 line-clamp-1">
              Symptômes : {consultation.symptomes}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2.5 flex-wrap">
            {ordonnances.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-tertiary font-medium bg-tertiary-container/40 px-2 py-0.5 rounded-full">
                <ClipboardList size={11} />
                {ordonnances.length} ordonnance
                {ordonnances.length > 1 ? "s" : ""}
              </span>
            )}
            {analyses.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-secondary font-medium bg-secondary-container/40 px-2 py-0.5 rounded-full">
                <FlaskConical size={11} />
                {analyses.length} analyse{analyses.length > 1 ? "s" : ""}
              </span>
            )}
            {!ordonnances.length && !analyses.length && (
              <span className="text-xs text-outline italic">
                Pas de documents associés
              </span>
            )}
          </div>
        </div>

        <ChevronRight
          size={18}
          className="text-outline group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1"
        />
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Section = ({
  title,
  icon: Icon,
  badge,
  badgeColor = "bg-surface-container-high",
  isOpen,
  onToggle,
  children,
  loading = false,
}) => (
  <section className="mb-6">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${badgeColor} flex items-center justify-center text-on-surface`}
        >
          <Icon size={20} />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-on-surface">{title}</h3>
          {badge && (
            <p className="text-xs text-on-surface-variant mt-0.5">{badge}</p>
          )}
        </div>
      </div>
      {isOpen ? (
        <ChevronUp size={20} className="text-primary" />
      ) : (
        <ChevronDown size={20} className="text-outline" />
      )}
    </button>

    {isOpen && (
      <div className="mt-4 space-y-4 animate-in fade-in duration-200">
        {loading ? <SkeletonCard /> : children}
      </div>
    )}
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function MedicalRecord() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const isDoctorView = !!patientId;
  const userRole = isDoctorView ? "medecin" : "patient";

  // ─ State: Patient & Medical Records
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const [toast, setToast] = useState(null);

  // ─ State: Medical Record Sections
  const [antecedents, setAntecedents] = useState([]);
  const [antecedentsFamiliaux, setAntecedentsFamiliaux] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [traitements, setTraitements] = useState([]);

  // ─ State: Loading & Editing
  const [savingSection, setSavingSection] = useState(null);
  const [openSections, setOpenSections] = useState({
    identity: true,
    antecedents: true,
    allergies: true,
    traitements: true,
    consultations: true,
  });

  // ─ State: Consultations (existing)
  const [consultations, setConsultations] = useState([]);

  // ─ Fetch Data on Mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isDoctorView) {
          const { data } = await api.get(`/patients/${patientId}`);
          const pd = data?.data || data;
          setPatient({
            nom: pd?.user?.nom,
            prenom: pd?.user?.prenom,
            patient: pd,
          });
          parsePatientData(pd);
          setConsultations(
            [...(pd?.consultations || [])].sort(
              (a, b) => new Date(b.date || 0) - new Date(a.date || 0),
            ),
          );
          return;
        }

        // Patient view
        const meRes = await api.get("/auth/me");
        const userData = meRes.data.user || meRes.data;
        setPatient({
          nom: userData?.nom,
          prenom: userData?.prenom,
          patient: userData,
        });
        parsePatientData(userData);

        const consultRes = await api.get("/consultations");
        const raw = consultRes.data?.data || consultRes.data || [];

        const [ordRes, anaRes] = await Promise.all([
          api.get("/ordonnances").catch(() => ({ data: {} })),
          api.get("/analyses").catch(() => ({ data: {} })),
        ]);

        const allOrdonnances = Array.isArray(ordRes.data?.data)
          ? ordRes.data.data
          : (ordRes.data ?? []);
        const allAnalyses = Array.isArray(anaRes.data?.data)
          ? anaRes.data.data
          : (anaRes.data ?? []);

        const enriched = raw.map((c) => ({
          ...c,
          ordonnances: allOrdonnances.filter(
            (o) => String(o.consultation_id) === String(c.id),
          ),
          analyses: allAnalyses.filter(
            (a) => String(a.consultation_id) === String(c.id),
          ),
        }));

        setConsultations(
          enriched.sort(
            (a, b) =>
              new Date(b.date || b.date_heure || 0) -
              new Date(a.date || a.date_heure || 0),
          ),
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Impossible de charger le dossier médical.",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isDoctorView, patientId]);

  // ─ Parse Patient Data (extract TEXT fields)
  const parsePatientData = (pd) => {
    if (!pd) return;

    // Parse antecedents (stored as newline-delimited or JSON)
    try {
      if (pd.antecedents) {
        const parsed = JSON.parse(pd.antecedents);
        setAntecedents(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      // Try parsing as newline-delimited
      if (pd.antecedents) {
        setAntecedents(
          pd.antecedents
            .split("\n")
            .filter((x) => x.trim())
            .map((line) => {
              const [pathologie, date_diagnostic] = line.split("|");
              return { pathologie, date_diagnostic: date_diagnostic?.trim() };
            }),
        );
      }
    }

    // Parse antecedents_familiaux
    try {
      if (pd.antecedents_familiaux) {
        const parsed = JSON.parse(pd.antecedents_familiaux);
        setAntecedentsFamiliaux(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      if (pd.antecedents_familiaux) {
        setAntecedentsFamiliaux(
          pd.antecedents_familiaux
            .split("\n")
            .filter((x) => x.trim())
            .map((line) => {
              const [maladie, lien_parente] = line.split("|");
              return { maladie, lien_parente: lien_parente?.trim() || "Autre" };
            }),
        );
      }
    }

    // Parse allergies
    try {
      if (pd.allergies) {
        const parsed = JSON.parse(pd.allergies);
        setAllergies(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      if (pd.allergies) {
        setAllergies(
          pd.allergies
            .split("\n")
            .filter((x) => x.trim())
            .map((line) => {
              const [substance, reaction, categorie, severite] =
                line.split("|");
              return {
                substance,
                reaction: reaction?.trim() || "",
                categorie: categorie?.trim() || "autre",
                severite: severite?.trim() || "Légère",
              };
            }),
        );
      }
    }

    // Parse traitements
    try {
      if (pd.traitement_en_cours) {
        const parsed = JSON.parse(pd.traitement_en_cours);
        setTraitements(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      if (pd.traitement_en_cours) {
        setTraitements(
          pd.traitement_en_cours
            .split("\n")
            .filter((x) => x.trim())
            .map((line) => {
              const [
                medicament,
                posologie,
                frequence,
                date_debut,
                prescrit_par,
              ] = line.split("|");
              return {
                medicament,
                posologie: posologie?.trim() || "",
                frequence: frequence?.trim() || "",
                date_debut: date_debut?.trim() || "",
                prescrit_par: prescrit_par?.trim() || "",
              };
            }),
        );
      }
    }
  };

  // ─ Serialize & Save Medical Data
  const saveMedicalData = async () => {
    if (!patient?.patient?.id) return;

    try {
      setSavingSection("all");

      const payload = {
        antecedents: JSON.stringify(antecedents),
        antecedents_familiaux: JSON.stringify(antecedentsFamiliaux),
        allergies: JSON.stringify(allergies),
        traitement_en_cours: JSON.stringify(traitements),
      };

      await api.patch(`/patients/${patient.patient.id}`, payload);

      setToast({ message: "Dossier médical mis à jour.", type: "success" });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Erreur lors de la sauvegarde.",
        type: "error",
      });
    } finally {
      setSavingSection(null);
    }
  };

  // ─ Navigation
  const handleCardClick = (id) => {
    navigate(
      isDoctorView
        ? `/medecin/consultations/${id}`
        : `/patient/consultations/${id}`,
    );
  };

  // ─ Section Toggle
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ─ Derived Values
  const fullName = patient
    ? `${patient.prenom || ""} ${patient.nom || ""}`.trim()
    : "Patient";
  const patientData = patient?.patient || {};

  const hasAllergyWarning = allergies.some((a) => a.categorie === "medicament");

  // ─ Calculate Age
  const age = useMemo(() => {
    if (!patientData.date_naissance) return null;
    const birthDate = new Date(patientData.date_naissance);
    const today = new Date();
    return Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
  }, [patientData.date_naissance]);

  // ─ Render
  return (
    <Navbar userRole={userRole} pageTitle="Dossier Médical">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main className="pt-6 pb-16 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Allergy Warning Banner */}
        {hasAllergyWarning && (
          <div className="mb-6 p-5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertTriangle size={24} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">
                ⚠ Allergie Médicamenteuse Détectée
              </h3>
              <p className="text-red-700 text-sm">
                {allergies
                  .filter((a) => a.categorie === "medicament")
                  .map((a) => a.substance)
                  .join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Sticky Header */}
        <div className="mb-8 sticky top-0 z-40 bg-white/95 backdrop-blur-md rounded-b-2xl pb-4 -mx-6 px-6 pt-4 shadow-sm border-b border-outline-variant/20">
          <div>
            <h1 className="text-3xl font-bold text-on-surface">
              Dossier Médical
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">{fullName}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container font-medium flex items-center gap-3 border border-error/20">
            <AlertCircle size={22} />
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-auto text-sm underline font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* SECTION 1: Identité du Patient */}
            <Section
              title="Identité du Patient"
              icon={User}
              badgeColor="bg-primary-container"
              isOpen={openSections.identity}
              onToggle={() => toggleSection("identity")}
            >
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-4">
                {/* Patient Header */}
                <div className="flex items-start gap-4 pb-4 border-b border-outline-variant/20">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-primary font-bold text-2xl shrink-0">
                    {fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-on-surface">
                      {fullName}
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-1">
                      {age ? `${age} ans` : "—"} •{" "}
                      {patientData.groupe_sanguin || "—"} •{" "}
                      {/* TODO: add sexe column to patients table */}
                      {"—"}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      CIN
                    </p>
                    <p className="font-semibold text-on-surface">
                      {patientData.cin || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Téléphone
                    </p>
                    <p className="font-semibold text-on-surface">
                      {patientData.user?.telephone || "—"}
                    </p>
                  </div>
                  <div className="col-span-full p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Adresse
                    </p>
                    <p className="font-semibold text-on-surface">
                      {patientData.adresse || "—"}
                    </p>
                  </div>
                  {/* TODO: add contact_urgence_nom, contact_urgence_lien, contact_urgence_telephone to patients table */}
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Contact d'Urgence
                    </p>
                    <p className="font-semibold text-on-surface">—</p>
                  </div>
                  {/* TODO: add couverture_medicale column to patients table */}
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Couverture Médicale
                    </p>
                    <p className="font-semibold text-on-surface">—</p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      N° Dossier
                    </p>
                    <p className="font-semibold text-on-surface">
                      {patientData.id || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Date de Naissance
                    </p>
                    <p className="font-semibold text-on-surface">
                      {formatDate(patientData.date_naissance)}
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1">
                      Groupe Sanguin
                    </p>
                    <p className="font-semibold text-on-surface">
                      {patientData.groupe_sanguin || "—"}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-outline italic">
                  Cette section est en lecture seule.
                </p>
              </div>
            </Section>

            {/* SECTION 2: Antécédents Médicaux */}
            <Section
              title="Antécédents Médicaux"
              icon={Activity}
              badgeColor="bg-surface-container-high"
              isOpen={openSections.antecedents}
              onToggle={() => toggleSection("antecedents")}
              loading={loading}
            >
              <div className="space-y-6">
                {/* A. Antécédents Médicaux Personnels */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <h4 className="font-bold text-on-surface mb-4">
                    A. Antécédents Médicaux Personnels
                  </h4>
                  <div className="space-y-3">
                    {antecedents.length === 0 ? (
                      <p className="text-on-surface-variant text-sm italic">
                        Aucun antécédent enregistré
                      </p>
                    ) : (
                      antecedents.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-on-surface">
                              {item.pathologie}
                            </p>
                            {item.date_diagnostic && (
                              <p className="text-xs text-on-surface-variant mt-1">
                                {formatDate(item.date_diagnostic)}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-3 shrink-0">
                            <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setAntecedents(
                                  antecedents.filter((_, i) => i !== idx),
                                );
                              }}
                              className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button className="mt-3 w-full p-2.5 border border-outline-variant/30 hover:bg-surface-container-high rounded-xl text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Ajouter un Antécédent
                  </button>
                </div>

                {/* B. Antécédents Chirurgicaux */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <h4 className="font-bold text-on-surface mb-4">
                    B. Antécédents Chirurgicaux
                  </h4>
                  {/* TODO: Separate antecedents_chirurgicaux column or parse from antecedents */}
                  <p className="text-on-surface-variant text-sm italic">
                    Non configuré — TODO: ajouter dans la migration
                  </p>
                </div>

                {/* C. Antécédents Familiaux */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <h4 className="font-bold text-on-surface mb-4">
                    C. Antécédents Familiaux
                  </h4>
                  <div className="space-y-3">
                    {antecedentsFamiliaux.length === 0 ? (
                      <p className="text-on-surface-variant text-sm italic">
                        Aucun antécédent familial enregistré
                      </p>
                    ) : (
                      antecedentsFamiliaux.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-on-surface">
                              {item.maladie}
                            </p>
                            <p className="text-xs text-on-surface-variant mt-1">
                              Lien : {item.lien_parente || "Autre"}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-3 shrink-0">
                            <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setAntecedentsFamiliaux(
                                  antecedentsFamiliaux.filter(
                                    (_, i) => i !== idx,
                                  ),
                                );
                              }}
                              className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button className="mt-3 w-full p-2.5 border border-outline-variant/30 hover:bg-surface-container-high rounded-xl text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Ajouter un Antécédent Familial
                  </button>
                </div>

                {/* D. Antécédents Obstétricaux (femmes uniquement) */}
                {/* TODO: add sexe column to patients table to show this section */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 opacity-50">
                  <h4 className="font-bold text-on-surface mb-2">
                    D. Antécédents Obstétricaux
                  </h4>
                  <p className="text-on-surface-variant text-xs italic">
                    Affichage conditionnel si sexe = féminin (TODO: ajouter
                    colonne sexe)
                  </p>
                </div>

                {/* Save Button */}
                <button
                  onClick={saveMedicalData}
                  disabled={savingSection === "all"}
                  className="w-full p-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {savingSection === "all" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Enregistrer les Modifications
                    </>
                  )}
                </button>
              </div>
            </Section>

            {/* SECTION 3: Allergies */}
            <Section
              title="Allergies Connues"
              icon={AlertTriangle}
              badge={
                allergies.length > 0 ? `${allergies.length} allergie(s)` : ""
              }
              badgeColor="bg-red-100"
              isOpen={openSections.allergies}
              onToggle={() => toggleSection("allergies")}
              loading={loading}
            >
              <div className="space-y-6">
                {/* A. Médicaments (RED) */}
                <div className="p-5 bg-red-50 rounded-2xl border border-red-200">
                  <h4 className="font-bold text-red-900 mb-4">
                    A. Allergies Médicamenteuses (CRITIQUE)
                  </h4>
                  <div className="space-y-3">
                    {allergies.filter((a) => a.categorie === "medicament")
                      .length === 0 ? (
                      <p className="text-red-700 text-sm italic">
                        Aucune allergie médicamenteuse enregistrée
                      </p>
                    ) : (
                      allergies
                        .filter((a) => a.categorie === "medicament")
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between p-3 bg-white rounded-xl border border-red-200"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-on-surface">
                                {item.substance}
                              </p>
                              <div className="text-xs text-on-surface-variant mt-2 space-y-1">
                                {item.reaction && (
                                  <p>Réaction : {item.reaction}</p>
                                )}
                                <p>
                                  Sévérité :{" "}
                                  <span className="font-semibold text-red-600">
                                    {item.severite || "—"}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-3 shrink-0">
                              <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setAllergies(
                                    allergies.filter((_, i) => i !== idx),
                                  );
                                }}
                                className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  <button className="mt-3 w-full p-2.5 border border-red-200 hover:bg-red-100 rounded-xl text-red-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Ajouter une Allergie Médicamenteuse
                  </button>
                </div>

                {/* B. Alimentaires */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <h4 className="font-bold text-on-surface mb-4">
                    B. Allergies Alimentaires
                  </h4>
                  <div className="space-y-3">
                    {allergies.filter((a) => a.categorie === "alimentaire")
                      .length === 0 ? (
                      <p className="text-on-surface-variant text-sm italic">
                        Aucune allergie alimentaire enregistrée
                      </p>
                    ) : (
                      allergies
                        .filter((a) => a.categorie === "alimentaire")
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-on-surface">
                                {item.substance}
                              </p>
                              {item.reaction && (
                                <p className="text-xs text-on-surface-variant mt-1">
                                  Réaction : {item.reaction}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2 ml-3 shrink-0">
                              <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setAllergies(
                                    allergies.filter((_, i) => i !== idx),
                                  );
                                }}
                                className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  <button className="mt-3 w-full p-2.5 border border-outline-variant/30 hover:bg-surface-container-high rounded-xl text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Ajouter une Allergie Alimentaire
                  </button>
                </div>

                {/* C. Environnementales / Autres */}
                <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <h4 className="font-bold text-on-surface mb-4">
                    C. Allergies Environnementales / Autres
                  </h4>
                  <div className="space-y-3">
                    {allergies.filter(
                      (a) =>
                        a.categorie !== "medicament" &&
                        a.categorie !== "alimentaire",
                    ).length === 0 ? (
                      <p className="text-on-surface-variant text-sm italic">
                        Aucune allergie environnementale enregistrée
                      </p>
                    ) : (
                      allergies
                        .filter(
                          (a) =>
                            a.categorie !== "medicament" &&
                            a.categorie !== "alimentaire",
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-on-surface">
                                {item.substance}
                              </p>
                              <div className="text-xs text-on-surface-variant mt-1 space-y-1">
                                {item.type && <p>Type : {item.type}</p>}
                                {item.reaction && (
                                  <p>Réaction : {item.reaction}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-3 shrink-0">
                              <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setAllergies(
                                    allergies.filter((_, i) => i !== idx),
                                  );
                                }}
                                className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  <button className="mt-3 w-full p-2.5 border border-outline-variant/30 hover:bg-surface-container-high rounded-xl text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Ajouter une Allergie Environnementale
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={saveMedicalData}
                  disabled={savingSection === "all"}
                  className="w-full p-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {savingSection === "all" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Enregistrer les Modifications
                    </>
                  )}
                </button>
              </div>
            </Section>

            {/* SECTION 4: Traitements en Cours */}
            <Section
              title="Traitements en Cours"
              icon={Pill}
              badge={
                traitements.length > 0
                  ? `${traitements.length} traitement(s)`
                  : ""
              }
              badgeColor="bg-amber-100"
              isOpen={openSections.traitements}
              onToggle={() => toggleSection("traitements")}
              loading={loading}
            >
              <div className="space-y-4">
                {traitements.length === 0 ? (
                  <div className="p-6 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
                    <Pill
                      size={32}
                      className="text-outline mx-auto mb-3 opacity-50"
                    />
                    <p className="text-on-surface-variant mb-4">
                      Aucun traitement en cours
                    </p>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl font-semibold text-sm transition-colors inline-flex items-center gap-2">
                      <Plus size={16} />
                      Ajouter un Traitement
                    </button>
                  </div>
                ) : (
                  traitements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-on-surface">
                            {item.medicament}
                          </h4>
                          <p className="text-sm text-on-surface-variant mt-1">
                            {item.posologie}
                            {item.frequence && ` • ${item.frequence}`}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-3 shrink-0">
                          <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setTraitements(
                                traitements.filter((_, i) => i !== idx),
                              );
                            }}
                            className="p-1.5 hover:bg-error-container rounded-lg text-error transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-on-surface-variant space-y-1">
                        {item.date_debut && (
                          <p>Début : {formatDate(item.date_debut)}</p>
                        )}
                        {item.prescrit_par && (
                          <p>Prescrit par : {item.prescrit_par}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}

                <button className="w-full p-3 border border-outline-variant/30 hover:bg-surface-container-high rounded-xl text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Ajouter un Traitement
                </button>

                {/* Save Button */}
                <button
                  onClick={saveMedicalData}
                  disabled={savingSection === "all"}
                  className="w-full p-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {savingSection === "all" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Enregistrer les Modifications
                    </>
                  )}
                </button>
              </div>
            </Section>

            {/* SECTION 5: Consultations (existing) */}
            <Section
              title="Historique des Consultations"
              icon={Stethoscope}
              badge={
                consultations.length > 0
                  ? `${consultations.length} consultation(s)`
                  : ""
              }
              badgeColor="bg-secondary-container"
              isOpen={openSections.consultations}
              onToggle={() => toggleSection("consultations")}
              loading={false}
            >
              {consultations.length === 0 ? (
                <div className="bg-surface-container-lowest p-12 rounded-2xl text-center border border-outline-variant/20">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
                    <Stethoscope size={32} className="text-outline" />
                  </div>
                  <p className="text-on-surface-variant text-base mb-1">
                    Aucune consultation enregistrée
                  </p>
                  <p className="text-outline text-sm">
                    Les consultations passées apparaîtront ici.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {consultations.map((c, i) => (
                    <ConsultationCard
                      key={c.id || i}
                      consultation={c}
                      index={i + 1}
                      onClick={() => handleCardClick(c.id)}
                    />
                  ))}
                </div>
              )}
            </Section>
          </>
        )}
      </main>
    </Navbar>
  );
}

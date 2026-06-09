import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  FlaskConical,
  FolderHeart,
  HeartPulse,
  Menu,
  Stethoscope,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-600">
      {children}
    </p>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-700"
    >
      {children}
    </a>
  );
}

function PrimaryButton({ to, children, className = "", ...props }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-700 hover:shadow-sky-700/25 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

function AnchorButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200 bg-white px-5 py-3 text-sm font-semibold text-cyan-700 transition-all hover:border-cyan-300 hover:bg-cyan-50 ${className}`}
    >
      {children}
    </a>
  );
}

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-cyan-200">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
        <Icon size={24} />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm leading-7 text-slate-500">{description}</p>
    </article>
  );
}

function PricingFeature({ children }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-600">
      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-600" />
      <span>{children}</span>
    </li>
  );
}

function PricingCard({
  name,
  priceMonthly,
  priceAnnual,
  description,
  features,
  cta,
  highlighted = false,
  badge = null,
  annualBadge = false,
  annualMonthlyEquivalent = null,
  billing = "monthly",
}) {
  return (
    <article
      className={`relative rounded-2xl p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        highlighted
          ? "border-2 border-cyan-600 bg-white shadow-md"
          : "border border-slate-200 bg-white"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-600 px-4 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      {annualBadge && (
        <span className="absolute right-4 top-4 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
          2 mois offerts
        </span>
      )}
      <h3 className="text-xl font-bold text-slate-800">{name}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>

      <div className="mt-6 border-t border-slate-200 pt-6">
        {billing === "annual" && annualMonthlyEquivalent ? (
          <div className="mb-2 flex items-end gap-3">
            <span className="text-sm text-slate-400 line-through">
              {annualMonthlyEquivalent}
            </span>
            <span className="text-3xl font-bold text-slate-800">
              {priceAnnual}
            </span>
            <span className="pb-1 text-sm text-slate-400">/an</span>
          </div>
        ) : (
          <div className="mb-2 flex items-end gap-1">
            <span className="text-3xl font-bold text-slate-800">
              {priceMonthly}
            </span>
            <span className="pb-1 text-sm text-slate-400">/mois</span>
          </div>
        )}

        <ul className="space-y-3">
          {features.map((feature) => (
            <PricingFeature key={feature}>{feature}</PricingFeature>
          ))}
        </ul>

        <Link
          to="/inscription"
          className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
            highlighted
              ? "bg-cyan-600 text-white hover:bg-cyan-700"
              : "border border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-50"
          }`}
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");

  const navItems = [
    { label: "À propos", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Objectifs", href: "#objectives" },
    { label: "Pourquoi ?", href: "#why" },
    { label: "Offres", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-800">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/">
            <BrandLogo />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-600 transition-colors hover:bg-cyan-50"
            >
              Se connecter
            </Link>
            <PrimaryButton to="/inscription" className="px-5 py-2.5">
              S'inscrire
            </PrimaryButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href} onClick={closeMenu}>
                  {item.label}
                </NavLink>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full border border-cyan-600 px-4 py-3 text-sm font-semibold text-cyan-600 transition-colors hover:bg-cyan-50"
                >
                  Se connecter
                </Link>
                <PrimaryButton
                  to="/inscription"
                  className="w-full py-3.5"
                  onClick={closeMenu}
                >
                  S'inscrire
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section
          id="about"
          className="relative overflow-hidden bg-gradient-to-b from-cyan-50 to-white py-0 -mt-[60px]"
        >
          <div className="pointer-events-none absolute -top-12 right-0 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl opacity-30" />
          <div className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 min-h-screen py-16 sm:py-20 lg:py-0">
            {/* Left Content */}
            <div className="w-full lg:flex-1 flex flex-col justify-center text-left order-1 lg:order-1">
              <span className="inline-block rounded-full bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 mb-4 w-fit animate-fadeInUp">
                MEDICAL
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl animate-fadeInUpDelay">
                Une plateforme pensée pour
                <br />
                <span className="text-cyan-600">les cabinets et les patients</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-500 animate-fadeInUpDelay2">
                MediCabinet connecte votre cabinet à vos patients,
                fluidifie la prise de rendez-vous et transforme la gestion
                médicale en une expérience sereine et moderne.
              </p>

              {/* Icons - Now inside Left Content */}
              <div className="flex items-center justify-center lg:hidden my-8">
                <div className="relative h-48 sm:h-56 w-48 sm:w-56 rounded-full bg-cyan-50 flex items-center justify-center shadow-xl shadow-cyan-200/40 animate-scaleIn">
                  <Stethoscope size={48} className="text-cyan-600" />

                  <div className="absolute -left-6 sm:-left-8 top-4 sm:top-6 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay">
                    <HeartPulse size={16} className="text-cyan-600" />
                  </div>
                  <div className="absolute -right-6 sm:-right-8 top-5 sm:top-8 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay2">
                    <Calendar size={16} className="text-cyan-600" />
                  </div>
                  <div className="absolute left-1/2 top-[92%] -translate-x-1/2 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay3">
                    <UserCheck size={16} className="text-cyan-600" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fadeInUpDelay2">
                <PrimaryButton to="/inscription" className="px-8 py-3">
                  Je découvre MediCabinet
                </PrimaryButton>
                <AnchorButton href="#pricing" className="px-8 py-3">
                  Voir les offres
                </AnchorButton>
              </div>
            </div>

            {/* Right Icons - Desktop only */}
            <div className="hidden lg:flex flex-1 items-center justify-center order-2 lg:order-2">
              <div className="relative h-48 sm:h-56 lg:h-64 w-48 sm:w-56 lg:w-64 rounded-full bg-cyan-50 flex items-center justify-center shadow-xl shadow-cyan-200/40 animate-scaleIn">
                <Stethoscope
                  size={60}
                  className="text-cyan-600 sm:block hidden lg:block"
                />

                <div className="absolute -left-6 sm:-left-8 top-4 sm:top-6 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay">
                  <HeartPulse
                    size={20}
                    className="text-cyan-600 sm:block hidden lg:block"
                  />
                </div>
                <div className="absolute -right-6 sm:-right-8 top-5 sm:top-8 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay2">
                  <Calendar
                    size={20}
                    className="text-cyan-600 sm:block hidden lg:block"
                  />
                </div>
                <div className="absolute left-1/2 top-[92%] -translate-x-1/2 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-scaleInDelay3">
                  <UserCheck
                    size={20}
                    className="text-cyan-600 sm:block hidden lg:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-600 via-sky-600 to-cyan-500 p-8 text-white shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:bg-cyan-700">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                    Patient
                  </p>
                  <h3 className="mt-4 text-3xl font-bold">Une expérience patient simplifiée</h3>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-white/10">
                  <UserCheck size={28} />
                </div>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-cyan-100/90">
                Prenez rendez-vous, consultez votre dossier médical et suivez vos analyses depuis un espace clair,
                accessible et sécurisé.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-cyan-100/90">
                <li>• Réservations rapides en ligne</li>
                <li>• Historique de santé centralisé</li>
                <li>• Notifications intelligentes</li>
              </ul>
              <Link
                to="/inscription"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50"
              >
                Je deviens patient
              </Link>
            </article>

            <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-cyan-300/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600">
                    Cabinet
                  </p>
                  <h3 className="mt-4 text-3xl font-bold text-slate-900">Boostez votre cabinet</h3>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-700 shadow-lg shadow-cyan-200/40">
                  <Stethoscope size={28} />
                </div>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500">
                Simplifiez la gestion des créneaux, des patients et des documents au quotidien,
                avec un tableau de bord pensé pour les besoins des médecins et secrétaires.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-600">
                <li>• Gestion multi-utilisateurs (médecins / secrétaires)</li>
                <li>• Agenda partagé et rappels automatiques</li>
                <li>• Rapports et dossiers patients numériques</li>
              </ul>
              <Link
                to="/inscription"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Créer mon cabinet
              </Link>
            </article>
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 animate-fadeInUp">
                SERVICES
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Des services conçus pour les patients et les cabinets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 animate-fadeInUpDelay2">
                Un écosystème digital qui relie votre cabinet, votre secrétariat et vos patients.
                Simplifiez les rendez-vous, améliorez le suivi et centralisez vos données médicales.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="animate-scaleIn">
                <ServiceCard
                  icon={CalendarCheck}
                  title="Prise de RDV en ligne"
                  description="Réservez une consultation avec votre médecin en quelques secondes, depuis n'importe quel appareil."
                />
              </div>
              <div className="animate-scaleInDelay">
                <ServiceCard
                  icon={FolderHeart}
                  title="Dossier Médical Numérique"
                  description="Consultez vos antécédents, analyses et prescriptions à tout moment, en toute sécurité."
                />
              </div>
              <div className="animate-scaleInDelay2">
                <ServiceCard
                  icon={FlaskConical}
                  title="Gestion des Analyses"
                  description="Uploadez et partagez vos résultats d'analyses directement avec votre médecin."
                />
              </div>
              <div className="animate-scaleInDelay3">
                <ServiceCard
                  icon={ClipboardList}
                  title="Rapports de Consultation"
                  description="Les médecins rédigent et partagent des rapports détaillés après chaque consultation."
                />
              </div>
              <div className="animate-scaleIn">
                <ServiceCard
                  icon={FileText}
                  title="Ordonnances & Attestations"
                  description="Générez des ordonnances numériques et des attestations médicales en PDF en un clic."
                />
              </div>
              <div className="animate-scaleInDelay">
                <ServiceCard
                  icon={Building2}
                  title="Gestion du Cabinet"
                  description="Médecins et secrétaires gèrent rendez-vous, patients et documents depuis un seul tableau de bord."
                />
              </div>
            </div>
          </div>
        </section>

        <section id="objectives" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 animate-fadeInUp">
                OBJECTIF
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Une vision claire pour transformer les soins
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 animate-fadeInUpDelay2">
                MediCabinet a pour ambition de rendre l’accès aux soins plus fluide,
                la gestion des cabinets plus efficace et la relation patient-médecin
                plus confiante.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-lg shadow-cyan-100/40 transition-all hover:shadow-cyan-200/40 animate-scaleIn">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-200/40">
                  <HeartPulse size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Patients sereins</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Un parcours digital qui rassure, informe et simplifie chaque étape
                  de la prise en charge médicale.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li>• Interface intuitive pour la prise de rendez-vous</li>
                  <li>• Dossiers et résultats accessibles en un clic</li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 transition-all hover:shadow-slate-300/40 animate-scaleInDelay">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 shadow-xl shadow-cyan-100/30">
                  <Building2 size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Cabinets performants</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Des outils pensés pour organiser, automatiser et valoriser l’activité
                  médicale du cabinet.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li>• Agenda partagé et gestion multi-utilisateur</li>
                  <li>• Dossiers patients centralisés et sécurisés</li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-lg shadow-cyan-100/40 transition-all hover:shadow-cyan-200/40 animate-scaleInDelay2">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-200/40">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Confiance renforcée</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Une communication claire entre patients, médecins et secrétaires
                  pour des soins plus fluides et plus humains.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li>• Suivi transparent des demandes et statuts</li>
                  <li>• Rapports et ordonnances partagés sans friction</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="why" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 animate-fadeInUp">
                POURQUOI MEDICABINET ?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Des bénéfices chiffrés pour médecins et patients
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 animate-fadeInUpDelay2">
                Découvrez pourquoi MediCabinet change la manière de travailler dans les cabinets,
                tout en améliorant l’expérience patient.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-[1.75rem] border border-slate-200 bg-cyan-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-scaleIn">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600 text-white shadow-lg shadow-cyan-200/40">
                  <CalendarCheck size={24} />
                </div>
                <p className="text-4xl font-bold text-slate-900">+35%</p>
                <p className="mt-3 text-sm text-slate-600">
                  Gain de temps administratif pour les cabinets grâce à l’agenda partagé.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-slate-200 bg-cyan-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-scaleInDelay">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600 text-white shadow-lg shadow-cyan-200/40">
                  <Building2 size={24} />
                </div>
                <p className="text-4xl font-bold text-slate-900">+50%</p>
                <p className="mt-3 text-sm text-slate-600">
                  Augmentation de la satisfaction patient par une meilleure prise en charge.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-slate-200 bg-cyan-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-scaleInDelay2">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600 text-white shadow-lg shadow-cyan-200/40">
                  <Users size={24} />
                </div>
                <p className="text-4xl font-bold text-slate-900">+40%</p>
                <p className="mt-3 text-sm text-slate-600">
                  Réduction de l’absentéisme des patients grâce aux rappels et notifications.
                </p>
              </article>

              <article className="rounded-[1.75rem] border border-slate-200 bg-cyan-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md animate-scaleInDelay3">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600 text-white shadow-lg shadow-cyan-200/40">
                  <FolderHeart size={24} />
                </div>
                <p className="text-4xl font-bold text-slate-900">24/7</p>
                <p className="mt-3 text-sm text-slate-600">
                  Accès continu aux dossiers et analyses médicales pour un suivi patient optimisé.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel className="animate-fadeInUp">OFFRES</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
              Choisissez l'offre qui correspond à votre usage
            </h2>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    billing === "monthly"
                      ? "bg-cyan-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  Mensuel
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    billing === "annual"
                      ? "bg-cyan-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  Annuel
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Pour les Patients
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Accédez à vos soins en toute simplicité
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <PricingCard
                    billing={billing}
                    name="Starter"
                    description="Idéal pour démarrer avec les fonctions essentielles."
                    priceMonthly="0 DH"
                    priceAnnual="0 DH"
                    cta="Commencer gratuitement"
                    features={[
                      "Prise de RDV en ligne",
                      "Historique des consultations",
                      "Upload d'analyses médicales",
                      "Messagerie avec le médecin",
                    ]}
                  />
                  <PricingCard
                    billing={billing}
                    name="Premium Patient"
                    description="Pour un suivi plus complet et prioritaire."
                    priceMonthly="49 DH"
                    priceAnnual="490 DH"
                    annualMonthlyEquivalent="49 DH x 12"
                    cta="Choisir Premium"
                    highlighted
                    badge="Le plus populaire"
                    annualBadge={billing === "annual"}
                    features={[
                      "Tout du plan Starter",
                      "Rappels SMS & Email automatiques",
                      "Ordonnances numériques",
                      "Accès prioritaire aux créneaux",
                      "Stockage illimité d'analyses",
                      "Support prioritaire",
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Pour les Cabinets
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Gérez votre cabinet efficacement
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <PricingCard
                    billing={billing}
                    name="Cabinet Starter"
                    description="Une base solide pour un cabinet moderne."
                    priceMonthly="299 DH"
                    priceAnnual="2 990 DH"
                    annualMonthlyEquivalent="299 DH x 12"
                    cta="Essai gratuit 14 jours"
                    annualBadge={billing === "annual"}
                    features={[
                      "1 médecin + 1 secrétaire",
                      "Gestion des RDV",
                      "Dossiers patients illimités",
                      "Rapports de consultation",
                      "Attestations médicales PDF",
                    ]}
                  />
                  <PricingCard
                    billing={billing}
                    name="Cabinet Pro"
                    description="La solution complète pour les cabinets exigeants."
                    priceMonthly="599 DH"
                    priceAnnual="5 990 DH"
                    annualMonthlyEquivalent="599 DH x 12"
                    cta="Choisir Cabinet Pro"
                    highlighted
                    badge="Recommandé"
                    annualBadge={billing === "annual"}
                    features={[
                      "Tout du plan Essentiel",
                      "Analyses de laboratoire avancées",
                      "Statistiques & tableaux de bord",
                      "Export PDF & Excel des rapports",
                      "Support dédié 24/7",
                      "Mises à jour prioritaires",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="animate-fadeInUp">
            <Link to="/">
              <BrandLogo />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
              A modern healthcare management platform for appointments, patient
              records, and care coordination.
            </p>
          </div>

          <div className="animate-fadeInUpDelay">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Links
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#services"
                className="text-sm text-slate-600 transition-colors hover:text-sky-700"
              >
                Services
              </a>
              <a
                href="#doctors"
                className="text-sm text-slate-600 transition-colors hover:text-sky-700"
              >
                Doctors
              </a>
              <a
                href="#contact"
                className="text-sm text-slate-600 transition-colors hover:text-sky-700"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="text-sm text-slate-600 transition-colors hover:text-sky-700"
              >
                Privacy
              </Link>
            </div>
          </div>

          <div className="animate-fadeInUpDelay2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Get Started
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Access your account to book appointments, manage records, and
              communicate with your care team.
            </p>
            <div className="mt-6">
              <PrimaryButton to="/login" className="px-6 py-3">
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
          © 2025 MediCabinet. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

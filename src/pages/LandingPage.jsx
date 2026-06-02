import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Calendar,
  CalendarCheck,
  CalendarPlus,
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
        highlighted ? "border-2 border-cyan-600 bg-white shadow-md" : "border border-slate-200 bg-white"
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
            <span className="text-sm text-slate-400 line-through">{annualMonthlyEquivalent}</span>
            <span className="text-3xl font-bold text-slate-800">{priceAnnual}</span>
            <span className="pb-1 text-sm text-slate-400">/an</span>
          </div>
        ) : (
          <div className="mb-2 flex items-end gap-1">
            <span className="text-3xl font-bold text-slate-800">{priceMonthly}</span>
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
  const [stats, setStats] = useState({
    cabinets: 50,
    patients: 1200,
    appointments: 8500,
  });
  const [displayStats, setDisplayStats] = useState({
    cabinets: 0,
    patients: 0,
    appointments: 0,
  });
  const displayStatsRef = useRef(displayStats);

  useEffect(() => {
    displayStatsRef.current = displayStats;
  }, [displayStats]);

  useEffect(() => {
    let active = true;

    fetch("/api/stats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stats fetch failed");
        }
        return response.json();
      })
      .then((data) => {
        if (!active) return;

        setStats({
          cabinets: data.cabinets ?? 50,
          patients: data.patients ?? 1200,
          appointments: data.appointments ?? 8500,
        });
      })
      .catch(() => {
        // Silence failures and keep fallback values
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const duration = 1500;
    const steps = 45;
    let step = 0;
    const start = displayStatsRef.current;
    const diff = {
      cabinets: stats.cabinets - start.cabinets,
      patients: stats.patients - start.patients,
      appointments: stats.appointments - start.appointments,
    };

    const intervalId = window.setInterval(() => {
      step += 1;
      if (step >= steps) {
        setDisplayStats(stats);
        window.clearInterval(intervalId);
        return;
      }

      setDisplayStats({
        cabinets: Math.round(start.cabinets + (diff.cabinets * step) / steps),
        patients: Math.round(start.patients + (diff.patients * step) / steps),
        appointments: Math.round(start.appointments + (diff.appointments * step) / steps),
      });
    }, duration / steps);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [stats]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Confiance", href: "#trust" },
    { label: "Pricing", href: "#pricing" },
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
                <PrimaryButton to="/inscription" className="w-full py-3.5" onClick={closeMenu}>
                  S'inscrire
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section id="about" className="relative overflow-hidden bg-gradient-to-b from-cyan-50 to-white py-24 sm:py-32">
          <div className="pointer-events-none absolute -top-12 right-0 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl opacity-30" />
          <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-block rounded-full bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 mb-4">
              MEDICAL
            </span>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-800 sm:text-6xl lg:text-7xl">
              Votre santé,
              <br />
              <span className="text-cyan-600">notre priorité</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Gérez vos rendez-vous, consultations et dossiers médicaux en toute simplicité — pour patients et cabinets médicaux.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryButton to="/inscription" className="px-8 py-3">
                S'inscrire gratuitement
              </PrimaryButton>
              <AnchorButton href="#pricing" className="px-8 py-3">
                Découvrir les offres
              </AnchorButton>
            </div>

            <div className="relative mt-12 flex items-center justify-center">
              <div className="relative h-48 w-48 rounded-full bg-cyan-50 mx-auto flex items-center justify-center shadow-xl shadow-cyan-200/40">
                <Stethoscope size={64} className="text-cyan-600" />

                <div className="absolute -left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200">
                  <HeartPulse size={24} className="text-cyan-600" />
                </div>
                <div className="absolute -right-6 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200">
                  <Calendar size={24} className="text-cyan-600" />
                </div>
                <div className="absolute left-1/2 top-[92%] -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200">
                  <UserCheck size={24} className="text-cyan-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 justify-center max-w-2xl mx-auto sm:flex-row">
            <article className="flex-1 rounded-2xl bg-cyan-600 p-6 text-white shadow-sm shadow-cyan-200/30">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <CalendarPlus size={32} />
              </div>
              <h3 className="text-lg font-semibold">Prendre un RDV</h3>
              <p className="mt-3 text-sm leading-7 text-cyan-100/90">
                Trouvez le bon médecin et réservez en quelques clics.
              </p>
              <Link
                to="/inscription"
                className="mt-6 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-cyan-600 transition hover:bg-cyan-50"
              >
                Réserver
              </Link>
            </article>

            <article className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Trouver un Médecin</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Parcourez nos cabinets par spécialité et choisissez votre médecin.
              </p>
              <Link
                to="/inscription"
                className="mt-6 inline-flex rounded-full bg-cyan-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                Rechercher
              </Link>
            </article>
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600">
                SERVICES
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Tout ce dont vous avez besoin, au même endroit
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                MediCabinet simplifie la gestion médicale pour les patients comme pour les professionnels de santé.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={CalendarCheck}
                title="Prise de RDV en ligne"
                description="Réservez une consultation avec votre médecin en quelques secondes, depuis n'importe quel appareil."
              />
              <ServiceCard
                icon={FolderHeart}
                title="Dossier Médical Numérique"
                description="Consultez vos antécédents, analyses et prescriptions à tout moment, en toute sécurité."
              />
              <ServiceCard
                icon={FlaskConical}
                title="Gestion des Analyses"
                description="Uploadez et partagez vos résultats d'analyses directement avec votre médecin."
              />
              <ServiceCard
                icon={ClipboardList}
                title="Rapports de Consultation"
                description="Les médecins rédigent et partagent des rapports détaillés après chaque consultation."
              />
              <ServiceCard
                icon={FileText}
                title="Ordonnances & Attestations"
                description="Générez des ordonnances numériques et des attestations médicales en PDF en un clic."
              />
              <ServiceCard
                icon={Building2}
                title="Gestion du Cabinet"
                description="Médecins et secrétaires gèrent rendez-vous, patients et documents depuis un seul tableau de bord."
              />
            </div>
          </div>
        </section>

        <section id="trust" className="bg-cyan-600 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                CONFIANCE
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ils nous font confiance
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-100/80">
                Des chiffres qui parlent d'eux-mêmes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <article className="rounded-3xl border border-cyan-500/30 bg-white/10 p-8 text-center">
                <Building2 className="mx-auto text-cyan-100" size={32} />
                <p className="mt-6 text-5xl font-bold text-white">
                  {displayStats.cabinets.toLocaleString("fr-FR")}
                </p>
                <p className="mt-3 text-lg font-semibold text-cyan-100">Cabinets Médicaux</p>
                <p className="mt-2 text-sm text-cyan-100/80">nous rejoignent chaque mois</p>
              </article>
              <article className="rounded-3xl border border-cyan-500/30 bg-white/10 p-8 text-center">
                <Users className="mx-auto text-cyan-100" size={32} />
                <p className="mt-6 text-5xl font-bold text-white">
                  {displayStats.patients.toLocaleString("fr-FR")}
                </p>
                <p className="mt-3 text-lg font-semibold text-cyan-100">Patients Actifs</p>
                <p className="mt-2 text-sm text-cyan-100/80">gèrent leur santé en ligne</p>
              </article>
              <article className="rounded-3xl border border-cyan-500/30 bg-white/10 p-8 text-center">
                <CalendarCheck className="mx-auto text-cyan-100" size={32} />
                <p className="mt-6 text-5xl font-bold text-white">
                  {displayStats.appointments.toLocaleString("fr-FR")}
                </p>
                <p className="mt-3 text-lg font-semibold text-cyan-100">RDV Planifiés</p>
                <p className="mt-2 text-sm text-cyan-100/80">depuis le lancement de la plateforme</p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel>PRICING</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Choisissez l'offre qui vous convient
            </h2>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    billing === "monthly" ? "bg-cyan-600 text-white" : "text-slate-600"
                  }`}
                >
                  Mensuel
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    billing === "annual" ? "bg-cyan-600 text-white" : "text-slate-600"
                  }`}
                >
                  Annuel
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Pour les Patients</h3>
                <p className="mt-1 text-sm text-slate-500">Accédez à vos soins en toute simplicité</p>

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
                <h3 className="text-lg font-semibold text-slate-800">Pour les Cabinets</h3>
                <p className="mt-1 text-sm text-slate-500">Gérez votre cabinet efficacement</p>

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
          <div>
            <Link to="/">
              <BrandLogo />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
              A modern healthcare management platform for appointments, patient records, and care coordination.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Links</h3>
            <div className="mt-4 flex flex-col gap-3">
              <a href="#services" className="text-sm text-slate-600 transition-colors hover:text-sky-700">
                Services
              </a>
              <a href="#doctors" className="text-sm text-slate-600 transition-colors hover:text-sky-700">
                Doctors
              </a>
              <a href="#contact" className="text-sm text-slate-600 transition-colors hover:text-sky-700">
                Contact
              </a>
              <Link to="/login" className="text-sm text-slate-600 transition-colors hover:text-sky-700">
                Privacy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Get Started</h3>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Access your account to book appointments, manage records, and communicate with your care team.
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

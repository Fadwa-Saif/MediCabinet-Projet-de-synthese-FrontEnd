import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  FlaskConical,
  FolderHeart,
  Globe,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Play,
  Send,
  Shield,
  Star,
  Stethoscope,
  UserCheck,
  UserPlus,
  Users,
  X,
  Zap,
  ArrowRight,
  BarChart3,
  Bell,
  FileCheck,
  Rocket,
  Settings,
  Smartphone,
  Sparkles,
  Quote,
} from "lucide-react";
import { BrandLogo } from "../components/BrandLogo";

function SectionLabel({ children, className = "" }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-sky-600 ${className}`}>
      {children}
    </p>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-700 relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full" />
    </a>
  );
}

function PrimaryButton({ to, children, className = "", icon: Icon, ...props }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-700 hover:shadow-sky-700/25 hover:translate-y-[-2px] active:translate-y-[0px] ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={16} />}
    </Link>
  );
}

// AnchorButton removed: use Link or button for accessible actions

function ServiceCard({ icon: Icon, title, description, color = "cyan" }) {
  const colors = {
    cyan: "bg-cyan-50 text-cyan-600",
    sky: "bg-sky-50 text-sky-600",
    teal: "bg-teal-50 text-teal-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };
  
  return (
    <article className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-cyan-200 group ${colors[color] || colors.cyan}`}>
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-transform group-hover:scale-110 group-hover:rotate-3">
        <Icon size={24} />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">{title}</h3>
      <p className="text-sm leading-7 text-slate-500">{description}</p>
    </article>
  );
}

function FeatureCard({ icon: Icon, title, description, stat, color = "cyan" }) {
  const colorClasses = {
    cyan: "from-cyan-500 to-sky-600",
    teal: "from-teal-500 to-emerald-600",
    blue: "from-blue-500 to-indigo-600",
    violet: "from-violet-500 to-purple-600",
  };
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClasses[color] || colorClasses.cyan} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`} />
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/30">
          <Icon size={22} />
        </div>
        {stat && (
          <div className="absolute top-0 right-0 text-2xl font-bold text-slate-200 group-hover:text-cyan-200 transition-colors">
            {stat}
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role, rating = 5 }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <Quote size={24} className="text-cyan-200 mb-3" />
      <p className="text-sm leading-7 text-slate-600 mb-4 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-white font-bold text-sm">
          {author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{author}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-sky-700"
      >
        <span className="text-sm font-semibold text-slate-800">{question}</span>
        <div className={`rounded-full p-1 transition-all ${isOpen ? 'bg-cyan-100 rotate-180' : 'bg-slate-100'}`}>
          <ChevronDown size={16} className={isOpen ? 'text-cyan-600' : 'text-slate-500'} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-sm leading-7 text-slate-500">{answer}</p>
      </div>
    </div>
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
      className={`relative rounded-2xl p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
        highlighted
          ? "border-2 border-cyan-600 bg-white shadow-md"
          : "border border-slate-200 bg-white"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
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
          className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${
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

function StatCounter({ end, suffix, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur text-white mb-4">
        <Icon size={28} />
      </div>
      <div className="text-4xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <p className="text-sm text-cyan-100">{label}</p>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const navItems = [
    { label: "À propos", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Fonctionnalités", href: "#features" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Offres", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="transition-transform hover:scale-105">
            <BrandLogo />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} onClick={() => scrollToSection(item.href)}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-600 transition-all hover:bg-cyan-50 hover:shadow-md"
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
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden animate-fadeInUp">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href} onClick={() => scrollToSection(item.href)}>
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
        {/* Hero Section */}
        <section
          id="about"
          className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-white py-0"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-teal-200/20 blur-3xl" />
          
          <div className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 min-h-[90vh] py-16 sm:py-20 lg:py-0">
            {/* Left Content */}
            <div className="w-full lg:flex-1 flex flex-col justify-center text-left order-1 lg:order-1 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100/80 px-4 py-1.5 w-fit mb-6 animate-fadeInUp">
                <Sparkles size={14} className="text-cyan-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  Solution médicale innovante
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-800 lg:text-6xl animate-fadeInUpDelay">
                Gérez votre cabinet médical
                <br />
                <span className="bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  avec intelligence et simplicité
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-500 max-w-xl animate-fadeInUpDelay2">
                Automatisez la prise de rendez-vous, centralisez les dossiers patients 
                et améliorez la communication entre médecin, secrétaire et patient.
              </p>

              {/* Mobile Hero Image */}
              <div className="flex items-center justify-center lg:hidden my-8 animate-scaleIn">
                <div className="relative h-56 w-56 rounded-full bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center shadow-2xl shadow-cyan-200/50">
                  <Stethoscope size={56} className="text-cyan-600" />
                  
                  <div className="absolute -left-8 top-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float">
                    <HeartPulse size={20} className="text-cyan-600" />
                  </div>
                  <div className="absolute -right-8 top-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float" style={{ animationDelay: '1s' }}>
                    <Calendar size={20} className="text-cyan-600" />
                  </div>
                  <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float" style={{ animationDelay: '2s' }}>
                    <UserCheck size={20} className="text-cyan-600" />
                  </div>
                  <div className="absolute -left-4 bottom-16 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg animate-pulse-slow">
                    <Shield size={18} />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fadeInUpDelay2">
                <PrimaryButton to="/inscription" className="px-8 py-3.5 text-base">
                  Commencer gratuitement
                </PrimaryButton>
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all hover:border-cyan-400 hover:text-cyan-700 hover:shadow-lg"
                >
                  <Play size={18} className="fill-cyan-600 text-cyan-600" />
                  Voir la démo
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 animate-fadeInUpDelay3">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">
                      {['M', 'S', 'P', 'D'][i-1]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm font-semibold text-slate-700 ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-slate-500">Basé sur 200+ avis de professionnels de santé</p>
                </div>
              </div>
            </div>

            {/* Right Content - Desktop */}
            <div className="hidden lg:flex flex-1 items-center justify-center order-2 lg:order-2 relative">
              <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center shadow-2xl shadow-cyan-200/50 animate-scaleIn">
                <Stethoscope size={72} className="text-cyan-600" />
                
                <div className="absolute -left-10 top-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float">
                  <HeartPulse size={24} className="text-cyan-600" />
                </div>
                <div className="absolute -right-10 top-12 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float" style={{ animationDelay: '1s' }}>
                  <Calendar size={24} className="text-cyan-600" />
                </div>
                <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float" style={{ animationDelay: '2s' }}>
                  <UserCheck size={24} className="text-cyan-600" />
                </div>
                <div className="absolute -left-6 bottom-20 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg animate-pulse-slow">
                  <Shield size={20} />
                </div>
                <div className="absolute -right-4 bottom-24 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 animate-float" style={{ animationDelay: '1.5s' }}>
                  <Zap size={20} className="text-amber-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-slate-400">Découvrir</span>
            <ChevronDown size={20} className="text-slate-400" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-sky-700 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCounter end={500} suffix="+" label="Cabinets utilisateurs" icon={Building2} />
              <StatCounter end={50} suffix="K+" label="Patients gérés" icon={Users} />
              <StatCounter end={98} suffix="%" label="Satisfaction client" icon={HeartPulse} />
              <StatCounter end={35} suffix="%" label="Gain de temps" icon={Calendar} />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">LE PROBLÈME</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Les cabinets médicaux perdent du temps dans des processus manuels
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
                Entre les appels, les dossiers papier et les doublons, la gestion devient lourde,
                les rendez-vous sont manqués et la relation patient-médecin s'affaiblit.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Calendar,
                  title: "Rendez-vous perdus",
                  desc: "Des créneaux difficiles à gérer et des annulations faute de suivi automatisé.",
                  color: "bg-red-50 text-red-600"
                },
                {
                  icon: FolderHeart,
                  title: "Dossiers éparpillés",
                  desc: "Informations patients dispersées entre notes papier, e-mails et fichiers locaux.",
                  color: "bg-amber-50 text-amber-600"
                },
                {
                  icon: MessageSquare,
                  title: "Communication lente",
                  desc: "Patients, médecins et secrétaires manquent d'une plateforme unique pour échanger.",
                  color: "bg-orange-50 text-orange-600"
                }
              ].map((item, i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} mb-4`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Cards */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-600 via-sky-600 to-cyan-500 p-8 text-white shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-2 hover:shadow-cyan-500/30 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full" />
              <div className="relative">
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
                  <li className="flex items-center gap-2"><Check size={16} /> Réservations rapides en ligne</li>
                  <li className="flex items-center gap-2"><Check size={16} /> Historique de santé centralisé</li>
                  <li className="flex items-center gap-2"><Check size={16} /> Notifications intelligentes</li>
                </ul>
                <Link
                  to="/inscription"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50 hover:shadow-lg"
                >
                  Je deviens patient
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </article>

            <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60 transition-all hover:-translate-y-2 hover:shadow-cyan-300/30 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50/50 rounded-bl-full" />
              <div className="relative">
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
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Gestion multi-utilisateurs (médecins / secrétaires)</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Agenda partagé et rappels automatiques</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Rapports et dossiers patients numériques</li>
                </ul>
                <Link
                  to="/inscription"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg"
                >
                  Créer mon cabinet
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">SERVICES</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Des services conçus pour les patients et les cabinets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
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
                  color="cyan"
                />
              </div>
              <div className="animate-scaleInDelay">
                <ServiceCard
                  icon={FolderHeart}
                  title="Dossier Médical Numérique"
                  description="Consultez vos antécédents, analyses et prescriptions à tout moment, en toute sécurité."
                  color="sky"
                />
              </div>
              <div className="animate-scaleInDelay2">
                <ServiceCard
                  icon={FlaskConical}
                  title="Gestion des Analyses"
                  description="Uploadez et partagez vos résultats d'analyses directement avec votre médecin."
                  color="teal"
                />
              </div>
              <div className="animate-scaleInDelay3">
                <ServiceCard
                  icon={ClipboardList}
                  title="Rapports de Consultation"
                  description="Les médecins rédigent et partagent des rapports détaillés après chaque consultation."
                  color="emerald"
                />
              </div>
              <div className="animate-scaleIn">
                <ServiceCard
                  icon={FileText}
                  title="Ordonnances & Attestations"
                  description="Générez des ordonnances numériques et des attestations médicales en PDF en un clic."
                  color="blue"
                />
              </div>
              <div className="animate-scaleInDelay">
                <ServiceCard
                  icon={Building2}
                  title="Gestion du Cabinet"
                  description="Médecins et secrétaires gèrent rendez-vous, patients et documents depuis un seul tableau de bord."
                  color="indigo"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">FONCTIONNALITÉS CLÉS</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Tout ce dont vous avez besoin pour un cabinet moderne
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={Shield} 
                title="Sécurité maximale" 
                description="Données chiffrées, conformité RGPD et authentification à deux facteurs pour protéger vos informations sensibles."
                stat="01"
                color="cyan"
              />
              <FeatureCard 
                icon={Zap} 
                title="Performance optimale" 
                description="Temps de chargement rapides et interface réactive pour une expérience utilisateur fluide et agréable."
                stat="02"
                color="teal"
              />
              <FeatureCard 
                icon={Bell} 
                title="Notifications intelligentes" 
                description="Rappels automatiques par SMS et email pour réduire les absences et améliorer la ponctualité."
                stat="03"
                color="blue"
              />
              <FeatureCard 
                icon={Smartphone} 
                title="Multi-plateforme" 
                description="Accédez à votre cabinet depuis n'importe quel appareil : ordinateur, tablette ou smartphone."
                stat="04"
                color="violet"
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Statistiques avancées" 
                description="Tableaux de bord et rapports détaillés pour suivre l'activité de votre cabinet en temps réel."
                stat="05"
                color="cyan"
              />
              <FeatureCard 
                icon={FileCheck} 
                title="Documents numériques" 
                description="Générez, signez et archivez vos documents médicaux en format PDF sécurisé."
                stat="06"
                color="teal"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">COMMENT ÇA MARCHE</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Trois étapes simples pour transformer votre cabinet
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: UserPlus,
                  title: "Créez votre compte",
                  desc: "Inscrivez-vous en tant que médecin, secrétaire ou patient en quelques minutes."
                },
                {
                  step: "02",
                  icon: Settings,
                  title: "Configurez votre cabinet",
                  desc: "Personnalisez vos horaires, services et préférences selon vos besoins."
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Commencez à utiliser",
                  desc: "Gérez vos rendez-vous, patients et documents depuis un seul tableau de bord."
                }
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xl shadow-cyan-500/30 mb-6 relative z-10">
                    <item.icon size={32} />
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-200 to-sky-200 hidden md:block" style={{ transform: 'translateX(50%)' }} />
                  <div className="text-6xl font-bold text-slate-100 absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-500 max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gradient-to-br from-slate-50 to-cyan-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">TÉMOIGNAGES</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Ce que disent nos utilisateurs
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard 
                quote="MediCabinet a révolutionné la gestion de mon cabinet. Je gagne plus de 2 heures par jour et mes patients sont plus satisfaits."
                author="Dr. Amine Benali"
                role="Médecin généraliste, Casablanca"
                rating={5}
              />
              <TestimonialCard 
                quote="En tant que secrétaire, je peux enfin gérer tous les rendez-vous efficacement. L'interface est intuitive et les notifications sont très pratiques."
                author="Sara El Amrani"
                role="Secrétaire médicale, Rabat"
                rating={5}
              />
              <TestimonialCard 
                quote="Je peux prendre rendez-vous en ligne et consulter mes analyses depuis mon téléphone. C'est exactement ce qu'il me fallait !"
                author="Karim Fassi"
                role="Patient, Marrakech"
                rating={5}
              />
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section id="objectives" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">OBJECTIF</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Une vision claire pour transformer les soins
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
                MediCabinet a pour ambition de rendre l'accès aux soins plus fluide,
                la gestion des cabinets plus efficace et la relation patient-médecin
                plus confiante.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-lg shadow-cyan-100/40 transition-all hover:shadow-cyan-200/40 hover:-translate-y-1 animate-scaleIn">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xl shadow-cyan-200/40">
                  <HeartPulse size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Patients sereins</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Un parcours digital qui rassure, informe et simplifie chaque étape
                  de la prise en charge médicale.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Interface intuitive pour la prise de rendez-vous</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Dossiers et résultats accessibles en un clic</li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 transition-all hover:shadow-slate-300/40 hover:-translate-y-1 animate-scaleInDelay">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 shadow-xl shadow-cyan-100/30">
                  <Building2 size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Cabinets performants</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Des outils pensés pour organiser, automatiser et valoriser l'activité
                  médicale du cabinet.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Agenda partagé et gestion multi-utilisateur</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Dossiers patients centralisés et sécurisés</li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-lg shadow-cyan-100/40 transition-all hover:shadow-cyan-200/40 hover:-translate-y-1 animate-scaleInDelay2">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-xl shadow-cyan-200/40">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Confiance renforcée</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Une communication claire entre patients, médecins et secrétaires
                  pour des soins plus fluides et plus humains.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Suivi transparent des demandes et statuts</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-cyan-600" /> Rapports et ordonnances partagés sans friction</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Why MediCabinet */}
        <section id="why" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">POURQUOI MEDICABINET ?</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Des bénéfices chiffrés pour médecins et patients
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
                Découvrez pourquoi MediCabinet change la manière de travailler dans les cabinets,
                tout en améliorant l'expérience patient.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: CalendarCheck, stat: "+35%", desc: "Gain de temps administratif pour les cabinets grâce à l'agenda partagé.", color: "from-cyan-500 to-sky-600" },
                { icon: Building2, stat: "+50%", desc: "Augmentation de la satisfaction patient par une meilleure prise en charge.", color: "from-teal-500 to-emerald-600" },
                { icon: Users, stat: "+40%", desc: "Réduction de l'absentéisme des patients grâce aux rappels et notifications.", color: "from-blue-500 to-indigo-600" },
                { icon: FolderHeart, stat: "24/7", desc: "Accès continu aux dossiers et analyses médicales pour un suivi patient optimisé.", color: "from-violet-500 to-purple-600" },
              ].map((item, i) => (
                <article key={i} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg animate-scaleIn" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-cyan-200/40`}>
                    <item.icon size={24} />
                  </div>
                  <p className="text-4xl font-bold text-slate-900">{item.stat}</p>
                  <p className="mt-3 text-sm text-slate-600 leading-6">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">OFFRES</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Choisissez l'offre qui correspond à votre usage
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
                Des solutions adaptées à chaque besoin, des patients individuels aux cabinets les plus exigeants.
              </p>
            </div>

            <div className="mt-6 flex justify-center mb-12">
              <div className="inline-flex rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    billing === "monthly"
                      ? "bg-cyan-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Mensuel
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    billing === "annual"
                      ? "bg-cyan-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Annuel <span className="text-xs ml-1 opacity-80">-20%</span>
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <UserCheck size={20} className="text-cyan-600" />
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
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Stethoscope size={20} className="text-cyan-600" />
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

        {/* FAQ Section */}
        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionLabel className="animate-fadeInUp">FAQ</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl animate-fadeInUpDelay">
                Questions fréquemment posées
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <FAQItem 
                question="Comment fonctionne l'inscription pour un cabinet médical ?"
                answer="L'inscription est simple : créez un compte médecin, configurez vos horaires et services, puis invitez votre secrétaire. Votre cabinet sera opérationnel en moins de 10 minutes."
              />
              <FAQItem 
                question="Les données de mes patients sont-elles sécurisées ?"
                answer="Absolument. MediCabinet utilise un chiffrement de bout en bout, est conforme au RGPD et héberge vos données sur des serveurs sécurisés en Europe. Vos données ne sont jamais partagées avec des tiers."
              />
              <FAQItem 
                question="Puis-je utiliser MediCabinet sur mon téléphone ?"
                answer="Oui ! MediCabinet est entièrement responsive et fonctionne parfaitement sur ordinateur, tablette et smartphone. Aucune application à télécharger, tout se passe dans votre navigateur."
              />
              <FAQItem 
                question="Quels sont les moyens de paiement acceptés ?"
                answer="Nous acceptons les paiements par carte bancaire, virement bancaire et PayPal. Pour les cabinets, nous proposons également un paiement annuel avec 2 mois offerts."
              />
              <FAQItem 
                question="Puis-je annuler mon abonnement à tout moment ?"
                answer="Oui, vous pouvez annuler votre abonnement à tout moment sans frais. Vos données restent accessibles pendant 30 jours après la résiliation pour vous permettre de les exporter."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-cyan-600 to-sky-700 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à moderniser votre cabinet médical ?
            </h2>
            <p className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 500 cabinets qui utilisent déjà MediCabinet pour simplifier leur quotidien.
              Essai gratuit de 14 jours, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/inscription"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-cyan-700 transition-all hover:bg-cyan-50 hover:shadow-xl hover:-translate-y-1"
              >
                Commencer gratuitement
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20 backdrop-blur"
              >
                <Play size={18} className="fill-white" />
                Voir la démo
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionLabel className="animate-fadeInUp">CONTACT RAPIDE</SectionLabel>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl animate-fadeInUpDelay">
                  Demandez une démo ou posez une question
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500 animate-fadeInUpDelay2">
                  Notre équipe vous répond en moins de 24 heures pour vous accompagner dans la prise en main de MediCabinet.
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Email</p>
                      <p className="text-sm text-slate-500">contact@medicabinet.ma</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Téléphone</p>
                      <p className="text-sm text-slate-500">+212 5XX-XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Adresse</p>
                      <p className="text-sm text-slate-500">Casablanca, Maroc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setContactSubmitted(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Votre prénom"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(event) => setContactEmail(event.target.value)}
                      placeholder="votre.email@exemple.com"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Votre message..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg"
                  >
                    Envoyer ma demande
                    <Send size={16} className="ml-2" />
                  </button>
                </form>
                {contactSubmitted && (
                  <div className="mt-6 rounded-2xl bg-cyan-50 px-4 py-4 text-sm text-cyan-800 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Merci ! Nous vous contacterons bientôt pour vous présenter MediCabinet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block">
                <BrandLogo />
              </Link>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                MediCabinet est une solution complète de gestion de cabinets médicaux, 
                conçue pour simplifier le quotidien des professionnels de santé au Maroc.
              </p>
              <div className="mt-6 flex gap-4">
                <button type="button" aria-label="Site web" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                  <Globe size={18} />
                </button>
                <button type="button" aria-label="Site web" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                  <Globe size={18} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Navigation
              </h3>
              <div className="flex flex-col gap-3">
                {navItems.slice(0, 5).map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Services
              </h3>
              <div className="flex flex-col gap-3">
                <button type="button" className="text-sm text-slate-400 text-left transition-colors hover:text-white">Pour les patients</button>
                <button type="button" className="text-sm text-slate-400 text-left transition-colors hover:text-white">Pour les médecins</button>
                <button type="button" className="text-sm text-slate-400 text-left transition-colors hover:text-white">Pour les secrétaires</button>
                <button type="button" className="text-sm text-slate-400 text-left transition-colors hover:text-white">Tarification</button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Contact
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-slate-400">contact@medicabinet.ma</p>
                <p className="text-sm text-slate-400">+212 5XX-XXXXXX</p>
                <p className="text-sm text-slate-400">Casablanca, Maroc</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © 2026 MediCabinet. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <button type="button" className="text-xs text-slate-500 hover:text-white transition">Politique de confidentialité</button>
              <button type="button" className="text-xs text-slate-500 hover:text-white transition">Conditions d'utilisation</button>
              <button type="button" className="text-xs text-slate-500 hover:text-white transition">Mentions légales</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Play size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Démo vidéo à venir</p>
                <p className="text-sm text-slate-400">Contactez-nous pour une démo personnalisée</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

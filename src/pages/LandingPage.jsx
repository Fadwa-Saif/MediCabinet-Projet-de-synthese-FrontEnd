import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseMedical,
  CalendarDays,
  CalendarRange,
  Clock3,
  Eye,
  HeartPulse,
  LayoutGrid,
  MapPin,
  Menu,
  Smile,
  Stethoscope,
  UserCheck,
  Users,
  X,
  Bone,
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

function SecondaryButton({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition-all hover:border-sky-300 hover:bg-sky-50 ${className}`}
    >
      {children}
    </Link>
  );
}

function QuickCard({ icon: Icon, title, description, action, filled = false }) {
  return (
    <article
      className={`rounded-2xl p-6 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md ${
        filled ? "bg-sky-600 text-white ring-sky-600" : "bg-white ring-slate-200"
      }`}
    >
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
          filled ? "bg-white/15 text-white" : "bg-sky-50 text-sky-700"
        }`}
      >
        <Icon size={22} />
      </div>
      <h3 className={`text-lg font-semibold ${filled ? "text-white" : "text-slate-800"}`}>
        {title}
      </h3>
      <p className={`mt-2 text-sm leading-6 ${filled ? "text-sky-50/90" : "text-slate-500"}`}>
        {description}
      </p>
      <Link
        to="/login"
        className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          filled
            ? "bg-white text-sky-700 hover:bg-sky-50"
            : "bg-sky-600 text-white hover:bg-sky-700"
        }`}
      >
        {action}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function SpecialtyPill({ icon: Icon, label, className = "" }) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg ${className}`}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-white">
        <Icon size={14} />
      </span>
      {label}
    </div>
  );
}

function TeamCard({ initials, name, specialty }) {
  return (
    <article className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-600 text-2xl font-bold text-white shadow-lg shadow-sky-600/20">
        {initials}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">{name}</h3>
      <p className="mt-1 text-sm text-slate-500">{specialty}</p>
    </article>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Doctors", href: "#doctors" },
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
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
            >
              Login
            </Link>
            <PrimaryButton to="/login" className="px-5 py-2.5">
              Appointment
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
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Login
                </Link>
                <PrimaryButton to="/login" className="w-full py-3.5" onClick={closeMenu}>
                  Appointment
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section id="about" className="relative overflow-hidden">
          <div className="absolute left-[-12rem] top-10 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="absolute right-[-8rem] top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto grid max-w-5xl gap-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-10">
              <div className="relative z-10 flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">MEDICAL</p>
                <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-slate-800 sm:text-5xl">
                  Healthcare Solutions
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
                  Manage appointments, doctors, medical records, and follow-up care in one secure platform built for modern healthcare teams.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <PrimaryButton to="/login">Find Doctors</PrimaryButton>
                  <SecondaryButton to="/login">Book Appointment</SecondaryButton>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative h-[20rem] w-full max-w-[28rem] overflow-hidden rounded-[2rem] bg-[#EAF6FE] p-6 shadow-inner ring-1 ring-slate-200 sm:h-[24rem]">
                  <div className="absolute right-[-2rem] top-[-2rem] h-32 w-32 rounded-full bg-sky-300/70 blur-2xl" />
                  <div className="absolute left-[-1rem] bottom-[-1rem] h-36 w-36 rounded-full bg-cyan-300/50 blur-2xl" />
                  <div className="relative grid h-full place-items-center rounded-[1.75rem] bg-white shadow-lg shadow-slate-200/60 ring-1 ring-white/70">
                    <div className="grid place-items-center gap-5 text-sky-700">
                      <div className="flex items-center gap-5">
                        <div className="rounded-[1.75rem] bg-sky-600 p-5 text-white shadow-lg shadow-sky-600/20">
                          <Stethoscope size={50} />
                        </div>
                        <div className="rounded-[1.75rem] bg-sky-50 p-5 text-sky-700 ring-1 ring-sky-100">
                          <HeartPulse size={50} />
                        </div>
                      </div>
                      <div className="rounded-[1.75rem] bg-white p-5 text-sky-600 shadow-lg ring-1 ring-slate-200">
                        <UserCheck size={50} />
                      </div>
                    </div>
                    <div className="absolute left-6 top-6 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-600/20">
                      Secure healthcare management
                    </div>
                    <div className="absolute right-6 top-8 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-lg ring-1 ring-slate-200">
                      Patients • Doctors • Records
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <QuickCard
              icon={Clock3}
              title="Opening Hours"
              description="Mon–Fri 9:00am–12:00pm"
              action="View Hours"
            />
            <QuickCard
              icon={CalendarDays}
              title="Book Appointment"
              description="Schedule your next consultation in seconds."
              action="Request"
              filled
            />
            <QuickCard
              icon={Users}
              title="Find Doctors"
              description="Browse specialists and care teams that fit your needs."
              action="Doctors"
            />
            <QuickCard
              icon={MapPin}
              title="Find Locations"
              description="Locate the nearest clinic or cabinet quickly."
              action="Locations"
            />
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel>SERVICE</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Our Medical Services
            </h2>

            <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
              <div className="relative mx-auto flex min-h-[34rem] w-full max-w-xl items-center justify-center">
                <div className="relative flex h-96 w-96 items-center justify-center rounded-full bg-sky-50 shadow-inner ring-1 ring-sky-100">
                  <div className="flex h-52 w-52 items-center justify-center rounded-full bg-sky-600 text-white shadow-2xl shadow-sky-600/20">
                    <Stethoscope size={74} />
                  </div>
                  <SpecialtyPill icon={Eye} label="Eye Care" className="left-4 top-24" />
                  <SpecialtyPill icon={HeartPulse} label="Cardiology" className="right-6 top-16" />
                  <SpecialtyPill icon={BriefcaseMedical} label="Medicine" className="left-10 bottom-20" />
                  <SpecialtyPill icon={Smile} label="Dental" className="right-10 bottom-16" />
                  <SpecialtyPill icon={Bone} label="Orthopedics" className="left-28 bottom-4" />
                </div>
              </div>

              <article className="rounded-[2rem] bg-[#F9FBFD] p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
                <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                  Dental Care Service
                </div>
                <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">
                  Care designed for everyday health and specialty needs.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-slate-500">
                  From routine checkups to specialist follow-up, MediCabinet centralizes records, consultations, and treatment plans in a single secure workspace.
                </p>
                <div className="mt-8">
                  <SecondaryButton to="/login">Learn more</SecondaryButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel>FEATURES</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Our Speciality
            </h2>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 to-cyan-600 p-8 text-white shadow-xl shadow-sky-600/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="mt-8 text-2xl font-bold">Online Appointment</h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-sky-50/90">
                  Offer patients a fast and clear booking experience with secure access to your healthcare services.
                </p>
                <Link
                  to="/login"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-sky-100 hover:underline"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </article>

              <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                      <CalendarRange size={24} />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-slate-800">Appointment Schedules</h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
                      Organize schedules, track availability, and keep your care workflow transparent for staff and patients.
                    </p>
                  </div>
                  <div className="hidden rounded-[2rem] bg-slate-50 p-5 text-sky-600 sm:block">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <span key={index} className="h-3 rounded-full bg-sky-200" />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <span key={index} className="h-3 rounded-full bg-sky-300" />
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <span key={index} className="h-3 rounded-full bg-sky-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <SecondaryButton to="/login">Schedules</SecondaryButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="doctors" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel>TEAM</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Our Doctors
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <TeamCard initials="MB" name="Mamman Bo" specialty="Dermatologist" />
              <TeamCard initials="RS" name="Reda Siana" specialty="Cardiologist" />
              <TeamCard initials="YH" name="Yaroslav Hawa" specialty="General Practitioner" />
            </div>

            <div className="mt-10 flex justify-center">
              <SecondaryButton to="/login">See All</SecondaryButton>
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

import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function SecretaireDashboard() {
  // TODO: fetch from API — GET /api/secretary/dashboard-stats
  const [stats, setStats] = useState({
    appointmentsToday: 12,
    totalPatients: 842,
    waitingPatients: 4,
  });

  // TODO: fetch from API — GET /api/secretary/today-appointments
  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: 1,
      time: "09:00",
      patientName: "Mme. Sophie Martin",
      doctor: "Dr. Lefebvre",
      reason: "Consultation générale",
      status: "Confirmé",
    },
    {
      id: 2,
      time: "10:30",
      patientName: "M. Pierre Durand",
      doctor: "Dr. Antoine",
      reason: "Suivi cardiaque",
      status: "En cours",
    },
  ]);

  // TODO: fetch from API — GET /api/secretary/recent-activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "appointment",
      message: "Rendez-vous confirmé: Sophie Martin",
      time: "Il y a 2 heures",
    },
    {
      id: 2,
      type: "patient",
      message: "Nouveau patient enregistré: Jean Dupuis",
      time: "Il y a 4 heures",
    },
  ]);

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const secretaryName = userData.firstName ? userData.firstName : "Secrétaire";

  return (
    <Navbar userRole="secretaire" pageTitle="Tableau de Bord Secrétaire">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Tableau de Bord Secrétaire
            </h2>
            <p className="text-gray-600 mt-1">
              Bienvenue, voici le récapitulatif de votre journée.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {secretaryName}
            </p>
            <p className="text-xs text-gray-600">Secrétaire Principale</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              Rendez-vous Aujourd'hui
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.appointmentsToday}
            </p>
            <p className="text-xs text-green-600 mt-2">+2 par rapport à hier</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              Total des Patients
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalPatients}
            </p>
            <p className="text-xs text-gray-600 mt-2">Mis à jour il y a 5 min</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">
              En Attente
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {stats.waitingPatients}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Temps d'attente moyen: 15 min
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Rendez-vous de la journée
            </h3>
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-blue-600 w-16">
                          {apt.time}
                        </span>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {apt.patientName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {apt.doctor} • {apt.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        apt.status === "En cours"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Actions Rapides</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  ➕ Nouveau Patient
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  📅 Nouveau Rendez-vous
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-blue-600 font-medium transition">
                  📞 Appels à faire
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Activité Récente</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="text-sm border-l-2 border-gray-200 pl-3">
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-tertiary-container": "#fffbff",
              "surface-dim": "#d9dadb",
              "on-secondary-fixed-variant": "#26467c",
              "on-primary-fixed-variant": "#004493",
              "on-error": "#ffffff",
              "on-secondary-fixed": "#001a41",
              "surface-container-lowest": "#ffffff",
              "on-secondary": "#ffffff",
              "primary": "#0059bb",
              "on-background": "#191c1d",
              "surface-container-low": "#f3f4f5",
              "error-container": "#ffdad6",
              "inverse-primary": "#adc7ff",
              "secondary-container": "#a4c1ff",
              "secondary-fixed": "#d8e2ff",
              "outline-variant": "#c1c6d7",
              "on-tertiary-fixed-variant": "#7c2e00",
              "tertiary-fixed": "#ffdbcc",
              "tertiary-container": "#c64f00",
              "surface-container-high": "#e7e8e9",
              "surface-tint": "#005bc0",
              "outline": "#717786",
              "on-tertiary": "#ffffff",
              "on-tertiary-fixed": "#351000",
              "surface-container-highest": "#e1e3e4",
              "tertiary": "#9e3d00",
              "on-primary-fixed": "#001a41",
              "inverse-on-surface": "#f0f1f2",
              "primary-fixed-dim": "#adc7ff",
              "surface": "#f8f9fa",
              "inverse-surface": "#2e3132",
              "primary-fixed": "#d8e2ff",
              "on-secondary-container": "#2f4e85",
              "secondary": "#405e96",
              "on-primary": "#ffffff",
              "background": "#f8f9fa",
              "surface-variant": "#e1e3e4",
              "on-primary-container": "#fefcff",
              "on-error-container": "#93000a",
              "error": "#ba1a1a",
              "surface-bright": "#f8f9fa",
              "on-surface": "#191c1d",
              "surface-container": "#edeeef",
              "tertiary-fixed-dim": "#ffb695",
              "secondary-fixed-dim": "#adc7ff",
              "primary-container": "#0070ea",
              "on-surface-variant": "#414754"
            },
            fontFamily: {
              "headline": ["Manrope", "sans-serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .signature-gradient {
        background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
      }
      .glass-effect {
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.8);
      }
    </style>
</head>
<body class="bg-background font-body text-on-surface antialiased">
<!-- SideNavBar from JSON Shell -->
<aside class="fixed left-0 top-0 h-full w-64 flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 font-['Manrope'] antialiased">
<div class="p-6 flex items-center gap-3">
<div class="w-10 h-10 rounded-xl signature-gradient flex items-center justify-center text-white shadow-lg overflow-hidden">
<img alt="Logo MediCabinet" data-alt="minimalist abstract medical cross logo with interlocking geometric shapes in shades of professional blue and cyan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_tArcT5MUpkT_hYMvhaiFCkczRKz_bjO4Cl6LmNapRBajqUP4OwChH5rOEO6GposW-vLgAPqGzUKxefA8sShXQoF8OEYr6vZdeIgZlhM1phufGveg_R4tYmGq5bPcvOl17FxtgtbdzAJImfzx_V8PajUXuQZJzROyZKrofn2KbX1J9oRAbKxv779NfxvyNMXqAGFhH8-qVSOsEkoKuk7mf3taKbZ96fMbGcLz4DYHfb6xMWP7Q-wyqfsvzCv-y6Ylzyj3yLBrW5N"/>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300 leading-tight">MediCabinet</h1>
<p class="text-xs text-slate-500 font-medium tracking-wide uppercase">Gestion Médicale</p>
</div>
</div>
<nav class="flex-1 px-4 mt-4 space-y-2">
<!-- Active: Tableau de bord -->
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-200/50 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-sm">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="text-sm">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="text-sm">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="text-sm">Consultations</span>
</a>
</nav>
<div class="px-4 py-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-sm">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="text-sm">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-64 min-h-screen p-8 bg-background">
<!-- Header -->
<header class="flex justify-between items-end mb-12">
<div>
<h2 class="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Tableau de Bord Secrétaire</h2>
<p class="text-on-surface-variant font-medium">Bienvenue, voici le récapitulatif de votre journée.</p>
</div>
<div class="flex items-center gap-4">
<div class="text-right">
<p class="text-sm font-bold text-on-surface">Mme. Valérie Lefebvre</p>
<p class="text-xs text-on-surface-variant">Secrétaire Principale</p>
</div>
<div class="w-12 h-12 rounded-full border-2 border-primary-container p-0.5">
<img alt="Avatar Patient" class="w-full h-full rounded-full object-cover" data-alt="portrait of a professional friendly medical secretary woman with glasses in a modern bright clinical office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCn4-wrBcxd8GfkCxj-AYgCsoPltHHzdtMt3ltTjceKnM_tyEbkA08jCsUevmNQCvioiHRQ3mfuSxleiCSKIOC-TU8NNP3qPzUP_aajBHXxZv7gZGok8oEv4MWRVfb3d2wot0QzN_7S4v8ozkmilXr_VdumCLzSsWfnwHwK67r-I-ySRZ2vOYALhlrE4xECvHOaH9rMgbkxJU8v7O4Yx_v1YwTkQxquhhQ1d9cMZUcius5r7wyk2ZyJD8wxQ7BHX76-NHV7DXPJkkE"/>
</div>
</div>
</header>
<!-- Stats Bento Grid -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
<!-- Stat 1: Today's Appointments -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] flex flex-col justify-between border border-primary/5 group hover:border-primary/20 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl" data-icon="calendar_month">calendar_month</span>
</div>
<span class="text-xs font-bold font-label tracking-widest text-primary uppercase bg-primary/5 px-2 py-1 rounded-full">Aujourd'hui</span>
</div>
<div>
<p class="text-4xl font-extrabold font-headline mb-1">12</p>
<h3 class="text-on-surface-variant font-semibold text-sm">Rendez-vous aujourd'hui</h3>
</div>
<div class="mt-4 pt-4 border-t border-outline-variant/15 flex items-center text-xs text-on-surface-variant">
<span class="material-symbols-outlined text-sm text-green-600 mr-1" data-icon="trending_up">trending_up</span>
<span class="font-bold text-green-600 mr-1">+2</span> par rapport à hier
                </div>
</div>
<!-- Stat 2: Total Patients -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] flex flex-col justify-between border border-primary/5 group hover:border-primary/20 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-3xl" data-icon="person_search">person_search</span>
</div>
<span class="text-xs font-bold font-label tracking-widest text-secondary uppercase bg-secondary-fixed px-2 py-1 rounded-full">Total</span>
</div>
<div>
<p class="text-4xl font-extrabold font-headline mb-1">842</p>
<h3 class="text-on-surface-variant font-semibold text-sm">Total des patients</h3>
</div>
<div class="mt-4 pt-4 border-t border-outline-variant/15 flex items-center text-xs text-on-surface-variant">
<span class="material-symbols-outlined text-sm text-primary mr-1" data-icon="update">update</span>
                    Mis à jour il y a 5 min
                </div>
</div>
<!-- Stat 3: Pending/Waiting Room -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] flex flex-col justify-between border border-primary/5 group hover:border-primary/20 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-3xl" data-icon="hourglass_empty">hourglass_empty</span>
</div>
<span class="text-xs font-bold font-label tracking-widest text-tertiary uppercase bg-tertiary-fixed px-2 py-1 rounded-full">Urgent</span>
</div>
<div>
<p class="text-4xl font-extrabold font-headline mb-1">4</p>
<h3 class="text-on-surface-variant font-semibold text-sm">En attente</h3>
</div>
<div class="mt-4 pt-4 border-t border-outline-variant/15 flex items-center text-xs text-on-surface-variant">
<span class="material-symbols-outlined text-sm text-tertiary mr-1" data-icon="timer">timer</span>
                    Temps d'attente moyen : <span class="font-bold ml-1">15 min</span>
</div>
</div>
</section>
<!-- Main Dashboard Layout: List & Details -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Appointments Table Card (Wide) -->
<div class="lg:col-span-2 space-y-6">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] overflow-hidden">
<div class="p-6 border-b border-outline-variant/10 flex justify-between items-center">
<h3 class="font-headline font-bold text-lg">Prochains rendez-vous</h3>
<button class="text-primary text-sm font-bold hover:underline">Voir tout</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead class="bg-surface-container-low">
<tr>
<th class="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Patient</th>
<th class="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Heure</th>
<th class="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Motif</th>
<th class="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Statut</th>
<th class="px-6 py-4"></th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/5">
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-200">
<img alt="Patient Avatar" class="w-full h-full rounded-full" data-alt="close-up headshot of an elderly man with kind eyes and grey hair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxPrE5Ha8_nb_P3tFDlgWZ-DbVeP84X70-zm0xIUlWFNV8iJ2KcA3JZav0ATicWhejH5TGjQpDjQtIwfvAeDc9xFoZeQvRefr0k7R9w1eYKiqSklnC2zxCOW4LCWFMmN-7Hhw0F1hXOYP3OemEenVZLl-I53aVplSV1rzm3Om6-GTssL9lbFzoy2sKUHc9zjserViPuo6nbbT8EOeqEM-R6PN-w7RytTgW-eAiumFfAGtltm7gogiFA4MmXJQgGtkWcsbdEuWW_Cfs"/>
</div>
<span class="text-sm font-bold">Jean-Pierre Durand</span>
</div>
</td>
<td class="px-6 py-4 text-sm font-medium">09:30</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Suivi Cardiologie</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed">Confirmé</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-200">
<img alt="Patient Avatar" class="w-full h-full rounded-full" data-alt="portrait of a young woman with curly brown hair wearing a green scarf" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLJ-pYkKbmDkIXg2pEL4gbHAxHmqo9OjQdT_gceeCj_ow_BIfF8pyaxAQW0FhinAVJcDLyYXOzMDwByLDVZpudrbD2nqKd0c35nnc-oYRF4V8ZsnT8YRIcY1t3bRfWtKtHpQpY6DXlVQxw6FVDf_BC7omtOTxSQV9DWp13FGASTU_7t9qABvSAD9x4W2GddWpWyxLKj7-QCAVBLSYax1pTxT6xhX-WLgoSWpEKpOHLGCWnaa6MfS2eSmbg3snklOy4pE29KjRWjCBt"/>
</div>
<span class="text-sm font-bold">Amélie Morel</span>
</div>
</td>
<td class="px-6 py-4 text-sm font-medium">10:15</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Première Visite</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">En attente</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-slate-200">
<img alt="Patient Avatar" class="w-full h-full rounded-full" data-alt="headshot of a middle-aged man with short black hair and glasses in professional attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoIjuyfANAp4KUPjnjfmFhYEwKykDT8h5M8wLMFtsupx4xB-Dqj4B9LPEr6xWs_RGMgSFvj-L5gq6hVe-SijtARk-UIWHvaAKBRU3qEpIX8CRj0yk3MVeo-H-b05zNkH0uC3CuERpqhtpg7FApjG343cw834FRCryZtRL7XBDLizbww-oCKB2g2_UxNw81ngWR-fjx68XdJrQkxX0oB3DkYpqsnyyQhZIgqOFAd00PIUGcwOYm7CjZ4oqZ1gx50x3xXm83BI5uEMBw"/>
</div>
<span class="text-sm font-bold">Thomas Bernard</span>
</div>
</td>
<td class="px-6 py-4 text-sm font-medium">11:00</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Vaccination</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed">Confirmé</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Recent Activity Feed -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
<h3 class="font-headline font-bold text-lg mb-6">Activité récente</h3>
<div class="space-y-6">
<div class="flex gap-4">
<div class="flex-shrink-0 w-2 mt-2 h-2 rounded-full bg-primary"></div>
<div>
<p class="text-sm font-medium text-on-surface">Nouveau patient enregistré : <span class="font-bold">Mme. Sophie Girard</span></p>
<p class="text-xs text-on-surface-variant">Il y a 12 minutes</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex-shrink-0 w-2 mt-2 h-2 rounded-full bg-error"></div>
<div>
<p class="text-sm font-medium text-on-surface">Rendez-vous annulé par <span class="font-bold">Marc Dubois</span></p>
<p class="text-xs text-on-surface-variant">Il y a 45 minutes</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex-shrink-0 w-2 mt-2 h-2 rounded-full bg-tertiary"></div>
<div>
<p class="text-sm font-medium text-on-surface">Dossier médical mis à jour pour <span class="font-bold">Lucie Petit</span></p>
<p class="text-xs text-on-surface-variant">Il y a 2 heures</p>
</div>
</div>
</div>
</div>
</div>
<!-- Right Column: Quick Actions & Alerts -->
<div class="space-y-6">
<!-- Action Card -->
<div class="signature-gradient rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
<div class="relative z-10">
<h3 class="font-headline font-extrabold text-xl mb-2">Ajouter un RDV</h3>
<p class="text-white/80 text-sm mb-6 leading-relaxed">Planifiez rapidement une nouvelle consultation pour un patient existant ou nouveau.</p>
<button class="bg-white text-primary font-bold px-6 py-2.5 rounded-lg text-sm shadow-md active:scale-95 transition-transform">
                            Nouveau rendez-vous
                        </button>
</div>
<span class="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 select-none" data-icon="add_circle">add_circle</span>
</div>
<!-- Calendar Mini View -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
<div class="flex justify-between items-center mb-4">
<h3 class="font-headline font-bold">Calendrier</h3>
<span class="text-xs font-bold text-on-surface-variant">Octobre 2023</span>
</div>
<div class="grid grid-cols-7 gap-2 text-center text-xs">
<div class="font-bold text-on-surface-variant">L</div>
<div class="font-bold text-on-surface-variant">M</div>
<div class="font-bold text-on-surface-variant">M</div>
<div class="font-bold text-on-surface-variant">J</div>
<div class="font-bold text-on-surface-variant">V</div>
<div class="font-bold text-on-surface-variant">S</div>
<div class="font-bold text-on-surface-variant">D</div>
<!-- Simple row of dates -->
<div class="p-1">12</div>
<div class="p-1">13</div>
<div class="p-1">14</div>
<div class="p-1 bg-primary text-white rounded-lg font-bold">15</div>
<div class="p-1">16</div>
<div class="p-1">17</div>
<div class="p-1">18</div>
</div>
</div>
<!-- Urgency Card -->
<div class="bg-error-container/30 border border-error/10 rounded-xl p-6">
<div class="flex items-center gap-3 mb-3 text-error">
<span class="material-symbols-outlined" data-icon="warning" data-weight="fill" style="font-variation-settings: 'FILL' 1;">warning</span>
<h4 class="font-bold text-sm">Alertes administratives</h4>
</div>
<ul class="space-y-3">
<li class="text-xs text-on-error-container/80 flex items-start gap-2">
<span class="w-1 h-1 rounded-full bg-error mt-1.5 flex-shrink-0"></span>
                            3 dossiers patients incomplets (manque carte vitale)
                        </li>
<li class="text-xs text-on-error-container/80 flex items-start gap-2">
<span class="w-1 h-1 rounded-full bg-error mt-1.5 flex-shrink-0"></span>
                            Facture de laboratoire en attente de paiement
                        </li>
</ul>
</div>
</div>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-[100]">
<button class="w-16 h-16 rounded-full signature-gradient text-white shadow-[0_10px_25px_rgba(0,89,187,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group">
<span class="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform" data-icon="chat_bubble" data-weight="fill" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
<!-- Tooltip simulation -->
<span class="absolute right-20 bg-on-surface text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Besoin d'aide ?
            </span>
</button>
</div>
</body></html>
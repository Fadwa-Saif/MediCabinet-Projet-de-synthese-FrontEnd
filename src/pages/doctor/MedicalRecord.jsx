import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function MedicalRecord() {
  // TODO: fetch from API — GET /api/patient/medical-record
  const [medicalData, setMedicalData] = useState({
    allergies: ["Pénicilline"],
    chronicConditions: ["Asthme léger"],
    previousSurgeries: ["Appendicectomie (2015)"],
    medications: ["Ventoline", "Metformine"],
  });

  return (
    <Navbar userRole="patient" pageTitle="Dossier Médical">
      <div className="p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allergies */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">⚠️ Allergies</h3>
            <ul className="space-y-2">
              {medicalData.allergies.map((allergy, idx) => (
                <li key={idx} className="text-gray-700">• {allergy}</li>
              ))}
            </ul>
          </div>

          {/* Chronic Conditions */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💊 Maladies Chroniques</h3>
            <ul className="space-y-2">
              {medicalData.chronicConditions.map((condition, idx) => (
                <li key={idx} className="text-gray-700">• {condition}</li>
              ))}
            </ul>
          </div>

          {/* Previous Surgeries */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">🏥 Interventions Chirurgicales</h3>
            <ul className="space-y-2">
              {medicalData.previousSurgeries.map((surgery, idx) => (
                <li key={idx} className="text-gray-700">• {surgery}</li>
              ))}
            </ul>
          </div>

          {/* Medications */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💧 Traitements Actuels</h3>
            <ul className="space-y-2">
              {medicalData.medications.map((med, idx) => (
                <li key={idx} className="text-gray-700">• {med}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 Tip: Ce dossier est mis à jour par vos médecins lors de chaque consultation. Pour toute correction, veuillez contacter votre médecin traitant.
          </p>
        </div>
      </div>
    </Navbar>
  );
}

<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Dossier Patient</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
              "headline": ["Manrope"],
              "body": ["Inter"],
              "label": ["Inter"]
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-background font-body text-on-surface antialiased">
<!-- Side Navigation Shell -->
<aside class="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col z-50 font-['Manrope'] antialiased">
<div class="p-8">
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</h1>
<p class="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Gestion Médicale</p>
</div>
<nav class="flex-1 px-4 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium text-sm">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="font-medium text-sm">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-200 dark:bg-slate-800 rounded-l-xl" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-medium text-sm">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="font-medium text-sm">Consultations</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium text-sm">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-medium text-sm">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 min-h-screen p-8 lg:p-12">
<!-- Header & Patient Profile Header -->
<header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div class="flex items-center gap-6">
<img alt="Patient Avatar" class="w-24 h-24 rounded-xl object-cover ring-4 ring-white shadow-lg" data-alt="portrait photo of a middle-aged woman with glasses and professional attire, soft natural lighting in a modern interior setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5xlcyxec3WMtRIVziChJ4nz8Liyq23hPq9wH9IxFwZISYC6asUQAVHrz6RP4npA_BOKURKV5WxgJGDBIvH6h6vd3e6QeoZpGRM5wv_V7DnEea3oqZzlqXrtjA5xBH5n-ASL5z5rWmktr8FdWKN6X5E4YPOijddGGAlmCQ9L4sM4gKYAgKAJVCxhDy_RC-DCx8t8LFvRqe9NCnBXBGuk6Ru1vTxc7q4a44-e2V2JKOEV1UyaCNBzADIz-uopuBxyxUQFGOvsb67M-C"/>
<div>
<span class="text-xs font-bold text-primary tracking-widest uppercase">Dossier Patient #MD-4829</span>
<h2 class="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Mme Sophie Martin</h2>
<div class="flex items-center gap-4 mt-2">
<span class="text-on-surface-variant flex items-center gap-1 text-sm">
<span class="material-symbols-outlined text-base" data-icon="cake">cake</span> 12 Mai 1982 (41 ans)
                        </span>
<span class="text-on-surface-variant flex items-center gap-1 text-sm">
<span class="material-symbols-outlined text-base" data-icon="bloodtype">bloodtype</span> A+
                        </span>
</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="relative group">
<span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="search">search</span>
<input class="pl-12 pr-6 py-3 bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-xl w-64 md:w-80 transition-all font-body text-sm" placeholder="Rechercher dans le dossier..." type="text"/>
</div>
<button class="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
<span class="material-symbols-outlined text-sm" data-icon="add">add</span> Nouvelle Note
                </button>
</div>
</header>
<!-- Bento Grid Layout for Patient Data -->
<div class="grid grid-cols-12 gap-8">
<!-- Column 1: Antécédents & Bio (Left Asymmetry) -->
<div class="col-span-12 lg:col-span-4 space-y-8">
<!-- Section: Antécédents -->
<section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
<div class="flex items-center justify-between mb-6">
<h3 class="font-headline text-lg font-bold">Antécédents</h3>
<span class="material-symbols-outlined text-primary" data-icon="history_edu">history_edu</span>
</div>
<div class="space-y-6">
<div>
<span class="text-[10px] uppercase font-bold tracking-widest text-outline">Médicaux</span>
<div class="mt-2 flex flex-wrap gap-2">
<span class="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-semibold">Hypertension</span>
<span class="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold">Asthme léger</span>
</div>
</div>
<div>
<span class="text-[10px] uppercase font-bold tracking-widest text-outline">Chirurgicaux</span>
<ul class="mt-2 space-y-2">
<li class="text-sm font-medium flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-xs mt-1" data-icon="check_circle">check_circle</span>
                                    Appendicectomie (1998)
                                </li>
<li class="text-sm font-medium flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-xs mt-1" data-icon="check_circle">check_circle</span>
                                    Chirurgie genou gauche (2015)
                                </li>
</ul>
</div>
<div>
<span class="text-[10px] uppercase font-bold tracking-widest text-outline">Allergies</span>
<div class="mt-2 flex flex-wrap gap-2">
<span class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold">Pénicilline</span>
<span class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold">Arachides</span>
</div>
</div>
</div>
</section>
<!-- Section: Rapid Stats (Editorial visual) -->
<section class="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary">
<p class="text-xs font-bold tracking-widest opacity-70 uppercase mb-4">Indicateurs de Santé</p>
<div class="grid grid-cols-2 gap-6">
<div>
<p class="text-3xl font-extrabold font-headline">24.5</p>
<p class="text-[10px] uppercase font-bold opacity-80">IMC (Normal)</p>
</div>
<div>
<p class="text-3xl font-extrabold font-headline">12/8</p>
<p class="text-[10px] uppercase font-bold opacity-80">Tension Art.</p>
</div>
</div>
<div class="mt-8 pt-6 border-t border-white/10">
<div class="flex items-center justify-between text-xs font-bold">
<span>Dernier Bilan Sanguin</span>
<span class="bg-white/20 px-2 py-1 rounded text-[10px]">OPTIMAL</span>
</div>
</div>
</section>
</div>
<!-- Column 2: History & Prescriptions (Main Canvas) -->
<div class="col-span-12 lg:col-span-8 space-y-8">
<!-- Section: Consultations passées -->
<section class="bg-surface-container-low rounded-xl p-8">
<div class="flex items-center justify-between mb-8">
<h3 class="font-headline text-xl font-extrabold text-on-surface">Consultations passées</h3>
<button class="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                            Voir tout <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<div class="space-y-4">
<!-- Consultation Card 1 -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined" data-icon="medical_information">medical_information</span>
</div>
<div>
<h4 class="font-bold text-on-surface group-hover:text-primary transition-colors">Suivi Hypertension</h4>
<p class="text-xs text-outline font-medium">15 Octobre 2023 • Dr. Jean Dupont</p>
</div>
</div>
<span class="bg-primary-fixed text-on-primary-fixed text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Terminé</span>
</div>
<p class="text-sm text-on-surface-variant leading-relaxed">
                                Patient se sent bien. Tension stable à 12/8. Poursuite du traitement actuel. Prochaine visite dans 6 mois.
                            </p>
</div>
<!-- Consultation Card 2 -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="stethoscope">stethoscope</span>
</div>
<div>
<h4 class="font-bold text-on-surface group-hover:text-primary transition-colors">Examen de routine</h4>
<p class="text-xs text-outline font-medium">12 Juin 2023 • Dr. Alice Durand</p>
</div>
</div>
<span class="bg-primary-fixed text-on-primary-fixed text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Terminé</span>
</div>
<p class="text-sm text-on-surface-variant leading-relaxed">
                                Bilan annuel complet. Légère fatigue rapportée, analyse de sang demandée pour carences éventuelles.
                            </p>
</div>
</div>
</section>
<!-- Section: Ordonnances délivrées -->
<section class="bg-white rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">
<div class="p-6 border-b border-surface-container flex items-center justify-between">
<h3 class="font-headline text-lg font-bold">Ordonnances délivrées</h3>
<div class="flex gap-2">
<button class="p-2 hover:bg-surface-container rounded-lg text-outline">
<span class="material-symbols-outlined" data-icon="filter_list">filter_list</span>
</button>
<button class="p-2 hover:bg-surface-container rounded-lg text-outline">
<span class="material-symbols-outlined" data-icon="download">download</span>
</button>
</div>
</div>
<table class="w-full border-collapse">
<thead class="bg-surface-container-low text-left">
<tr>
<th class="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Date</th>
<th class="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Médicament</th>
<th class="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Posologie</th>
<th class="px-6 py-4 text-[10px] font-black text-outline uppercase tracking-widest">Statut</th>
<th class="px-6 py-4"></th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container">
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 text-sm font-medium">15/10/2023</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface">Lisinopril 10mg</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">1 comprimé / jour</td>
<td class="px-6 py-4">
<span class="bg-surface-tint/10 text-surface-tint text-[10px] font-bold px-2 py-0.5 rounded-full border border-surface-tint/20">Actif</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 text-sm font-medium">12/06/2023</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface">Ventoline Inhalateur</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Si besoin (crises)</td>
<td class="px-6 py-4">
<span class="bg-surface-tint/10 text-surface-tint text-[10px] font-bold px-2 py-0.5 rounded-full border border-surface-tint/20">Actif</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 text-sm font-medium">04/02/2023</td>
<td class="px-6 py-4 text-sm font-bold text-on-surface">Amoxicilline 500mg</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">3/jour pendant 7j</td>
<td class="px-6 py-4">
<span class="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full">Expiré</span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</section>
</div>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
<!-- Expanded Chat State (Hidden by default in standard UI logic, but present) -->
<div class="hidden md:flex flex-col w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden mb-2">
<div class="bg-primary p-4 text-on-primary flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-sm" data-icon="smart_toy">smart_toy</span>
</div>
<div>
<p class="text-xs font-black tracking-tight">Assistant MediCabinet</p>
<p class="text-[10px] opacity-80">IA Médicale • En ligne</p>
</div>
</div>
<button class="p-1 hover:bg-white/10 rounded">
<span class="material-symbols-outlined text-base" data-icon="close">close</span>
</button>
</div>
<div class="h-64 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3 no-scrollbar">
<div class="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs text-on-surface-variant leading-relaxed border border-outline-variant/10">
                    Bonjour Docteur, comment puis-je vous aider avec le dossier de Mme Martin aujourd'hui ?
                </div>
</div>
<div class="p-3 border-t border-outline-variant/10 bg-white">
<div class="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
<input class="bg-transparent border-none text-xs w-full focus:ring-0" placeholder="Posez une question..." type="text"/>
<button class="text-primary">
<span class="material-symbols-outlined text-lg" data-icon="send">send</span>
</button>
</div>
</div>
</div>
<!-- FAB Button -->
<button class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
<span class="material-symbols-outlined text-2xl" data-icon="chat_bubble" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
</button>
</div>
</body></html>
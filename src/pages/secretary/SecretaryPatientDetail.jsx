<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Détail Patient - MediCabinet</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
      }
      .glass-effect {
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.8);
      }
      .signature-gradient {
        background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
      }
    </style>
</head>
<body class="bg-background font-body text-on-surface antialiased">
<!-- Shell Layout: SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r border-slate-200 dark:border-slate-800 z-50 font-['Manrope'] antialiased">
<div class="p-6 flex items-center gap-3">
<div class="w-10 h-10 rounded-xl signature-gradient flex items-center justify-center text-white">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">medical_services</span>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</h1>
<p class="text-xs text-slate-500">Gestion Médicale</p>
</div>
</div>
<nav class="flex-1 px-4 space-y-2 mt-4">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-medium">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">calendar_today</span>
<span class="font-medium">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-200/50" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">groups</span>
<span class="font-medium">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">medical_services</span>
<span class="font-medium">Consultations</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-medium">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined text-error">logout</span>
<span class="font-medium">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 min-h-screen p-8">
<!-- Top Context Header -->
<header class="mb-12 flex justify-between items-end">
<div>
<nav class="flex items-center gap-2 text-sm text-outline mb-2">
<span>Patients</span>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-primary font-medium">Fiche Patient</span>
</nav>
<h2 class="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Jean-Marc Laurent</h2>
</div>
<div class="flex gap-4">
<button class="px-6 py-3 bg-surface-container-high text-primary font-bold rounded-xl flex items-center gap-2 hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined">edit</span>
                    Modifier le profil
                </button>
<button class="px-6 py-3 signature-gradient text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-95 transition-transform">
<span class="material-symbols-outlined">add</span>
                    Nouveau RDV
                </button>
</div>
</header>
<!-- Asymmetrical Layout Grid -->
<div class="grid grid-cols-12 gap-8">
<!-- Left Column: Patient Profile Card -->
<div class="col-span-12 lg:col-span-4 space-y-8">
<section class="bg-surface-container-lowest rounded-xl p-8 shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-32 h-32 signature-gradient opacity-5 rounded-bl-full"></div>
<div class="flex flex-col items-center text-center mb-8">
<div class="w-24 h-24 rounded-full border-4 border-surface-container-high p-1 mb-4">
<img alt="Patient Avatar" class="w-full h-full rounded-full object-cover bg-slate-100" data-alt="close-up portrait of a middle-aged man with short salt and pepper hair, smiling warmly in a professional studio setting with soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClHps3UntEVB0rgVpHIj3CYPI7xedaSfJuHpklgeyEOfAidgY0RQEolnX1yavfc9kbJe4PZZ5u62TWfkYsOBGhfVBznIOOlH4rSvIYkfhwZuqMVzZ7T_nv811PKpW2AAtlXfHYvvM4j5iKv86LmQ2nog7JftB4SGCgtighBKB3n6Z_UuRBipEVE-ldAgGa7bAVUpiI_f7h85NAFwvfFmaiu3O7gTc8jiaHT1WpU_0z333b0raIr-gTfn9kiSTQ8SDvuzTRre0AgYhj"/>
</div>
<h3 class="text-xl font-bold font-headline">Jean-Marc Laurent</h3>
<span class="mt-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider rounded-full">Patient Premium</span>
</div>
<div class="space-y-6">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined">cake</span>
</div>
<div>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Date de naissance</p>
<p class="text-sm font-semibold">14 Mai 1978 (45 ans)</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined">call</span>
</div>
<div>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Téléphone</p>
<p class="text-sm font-semibold">06 45 89 21 03</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined">mail</span>
</div>
<div>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Email</p>
<p class="text-sm font-semibold">jm.laurent@email.com</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined">location_on</span>
</div>
<div>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Adresse</p>
<p class="text-sm font-semibold">12 Rue de la Paix, 75002 Paris</p>
</div>
</div>
</div>
<div class="mt-10 pt-8 border-t border-outline-variant/15">
<h4 class="text-xs font-bold text-outline uppercase tracking-widest mb-4">Informations Médicales</h4>
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">Allergie: Pénicilline</span>
<span class="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded-full">Groupe A+</span>
<span class="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold rounded-full">Suivi Cardio</span>
</div>
</div>
</section>
<section class="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
<h4 class="font-headline font-bold text-sm mb-4">Prochain Rendez-vous</h4>
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between">
<div>
<p class="text-primary font-bold">24 Oct. 2023</p>
<p class="text-xs text-outline">14:30 - Dr. Belmont</p>
</div>
<span class="material-symbols-outlined text-primary-container">arrow_forward</span>
</div>
</section>
</div>
<!-- Right Column: Appointment History (Clinical Table) -->
<div class="col-span-12 lg:col-span-8">
<section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
<div class="p-8 border-b border-outline-variant/15 flex justify-between items-center">
<h3 class="text-xl font-bold font-headline">Historique des Rendez-vous</h3>
<div class="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg">
<span class="material-symbols-outlined text-outline text-sm">search</span>
<input class="bg-transparent border-none text-sm focus:ring-0 w-48" placeholder="Rechercher un motif..." type="text"/>
</div>
</div>
<div class="flex-1 overflow-x-auto">
<table class="w-full border-collapse">
<thead>
<tr class="text-left border-b border-outline-variant/15">
<th class="px-8 py-5 text-xs font-bold text-outline uppercase tracking-wider">Date</th>
<th class="px-8 py-5 text-xs font-bold text-outline uppercase tracking-wider">Motif</th>
<th class="px-8 py-5 text-xs font-bold text-outline uppercase tracking-wider">Praticien</th>
<th class="px-8 py-5 text-xs font-bold text-outline uppercase tracking-wider">Statut</th>
<th class="px-8 py-5"></th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/5">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-6">
<p class="font-semibold text-sm">12 Sept. 2023</p>
<p class="text-xs text-outline">09:15</p>
</td>
<td class="px-8 py-6 text-sm font-medium">Contrôle Annuel</td>
<td class="px-8 py-6 text-sm">Dr. Belmont</td>
<td class="px-8 py-6">
<span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[11px] font-bold rounded-full">Confirmé</span>
</td>
<td class="px-8 py-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-6">
<p class="font-semibold text-sm">05 Juil. 2023</p>
<p class="text-xs text-outline">16:45</p>
</td>
<td class="px-8 py-6 text-sm font-medium">Suivi Cardiologie</td>
<td class="px-8 py-6 text-sm">Dr. Faure</td>
<td class="px-8 py-6">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full">Passé</span>
</td>
<td class="px-8 py-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-6">
<p class="font-semibold text-sm">22 Mai 2023</p>
<p class="text-xs text-outline">11:00</p>
</td>
<td class="px-8 py-6 text-sm font-medium">Urgence (Grippe)</td>
<td class="px-8 py-6 text-sm">Dr. Belmont</td>
<td class="px-8 py-6">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full">Passé</span>
</td>
<td class="px-8 py-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-6">
<p class="font-semibold text-sm">10 Mars 2023</p>
<p class="text-xs text-outline">14:00</p>
</td>
<td class="px-8 py-6 text-sm font-medium">Consultation</td>
<td class="px-8 py-6 text-sm">Dr. Belmont</td>
<td class="px-8 py-6">
<span class="px-3 py-1 bg-error-container text-on-error-container text-[11px] font-bold rounded-full">Annulé</span>
</td>
<td class="px-8 py-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-6">
<p class="font-semibold text-sm">15 Janv. 2023</p>
<p class="text-xs text-outline">10:30</p>
</td>
<td class="px-8 py-6 text-sm font-medium">Suivi Tension</td>
<td class="px-8 py-6 text-sm">Inf. Morin</td>
<td class="px-8 py-6">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full">Passé</span>
</td>
<td class="px-8 py-6 text-right">
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 bg-surface-container-low flex justify-center">
<button class="text-sm font-bold text-primary hover:underline">Voir plus d'archives</button>
</div>
</section>
</div>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
<!-- Chat Bubble (Hidden by default or appearing on trigger) -->
<div class="w-80 glass-effect rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden border border-outline-variant/20 hidden md:block">
<div class="p-4 signature-gradient text-white flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-sm">smart_toy</span>
</div>
<p class="text-sm font-bold">Assistant MediCabinet</p>
</div>
<button class="text-white/80 hover:text-white">
<span class="material-symbols-outlined text-lg">close</span>
</button>
</div>
<div class="p-4 h-48 overflow-y-auto space-y-4">
<div class="flex gap-2">
<div class="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[10px]">smart_toy</span>
</div>
<div class="bg-surface-container p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl">
<p class="text-xs leading-relaxed">Bonjour ! Comment puis-je vous aider avec le dossier de M. Laurent aujourd'hui ?</p>
</div>
</div>
</div>
<div class="p-3 border-t border-outline-variant/10">
<div class="bg-surface-container-low flex items-center gap-2 px-3 py-2 rounded-xl">
<input class="bg-transparent border-none text-xs focus:ring-0 flex-1" placeholder="Écrire un message..." type="text"/>
<button class="text-primary">
<span class="material-symbols-outlined text-lg">send</span>
</button>
</div>
</div>
</div>
<!-- FAB Toggle -->
<button class="w-14 h-14 signature-gradient rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 hover:scale-110 active:scale-95 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
</button>
</div>
</body></html>
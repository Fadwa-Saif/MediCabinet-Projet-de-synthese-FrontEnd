<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Assistant Virtuel</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
<body class="bg-background font-body text-on-surface">
<!-- Dashboard Secrétaire (Background Context) -->
<div class="flex h-screen overflow-hidden">
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r border-slate-200 dark:border-slate-800 font-['Manrope'] antialiased z-10">
<div class="p-6">
<div class="flex items-center gap-3">
<img alt="Logo MediCabinet" class="rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGUS_FS7GpUL3JJlqRYo-Y0mkyE3xG75u8QZlNNi3brAoqPX85PEkoweB-buGOi0z1P7TCF2773mD_SWPJssn63Da0dkya7azp-Ymb0780qznO4JYhe6wK_koPvTlnpFL3_ImTkwa3tXaiRwhGuZZmFbEwStR8tCXr4g5AqRIRRUV9m2ErQ4BRJjV0p3Y6lSmT-w4mRMebZ8Sqd_t8lj9xXsbURB6j7WRTHFjddkse4LQech39-yfAWevacMY4r2z0RISFiY6jAGxS"/>
<div class="flex flex-col">
<span class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</span>
<span class="text-xs font-medium text-slate-500">Gestion Médicale</span>
</div>
</div>
</div>
<nav class="mt-4 flex-1 space-y-1 px-4">
<a class="flex items-center gap-3 px-4 py-3 text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">calendar_today</span>
<span>Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">groups</span>
<span>Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">medical_services</span>
<span>Consultations</span>
</a>
</nav>
<div class="mt-auto border-t border-slate-200 dark:border-slate-800 p-4 space-y-1">
<a class="flex items-center gap-3 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span>Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 transition-colors" href="#">
<span class="material-symbols-outlined">logout</span>
<span>Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 ml-64 p-8 overflow-y-auto">
<header class="flex justify-between items-end mb-12">
<div>
<h1 class="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Tableau de bord</h1>
<p class="text-on-surface-variant mt-2">Bonjour, Marie. Voici le résumé de la journée.</p>
</div>
<div class="flex gap-4">
<div class="bg-surface-container p-4 rounded-xl flex items-center gap-4">
<div class="w-10 h-10 bg-primary-container flex items-center justify-center rounded-full text-on-primary-container">
<span class="material-symbols-outlined">event</span>
</div>
<div>
<p class="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Rendez-vous</p>
<p class="text-xl font-bold">24</p>
</div>
</div>
</div>
</header>
<!-- Bento Grid Dashboard -->
<div class="grid grid-cols-12 gap-6">
<!-- Main Schedule Card -->
<div class="col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-sm">
<div class="flex justify-between items-center mb-6">
<h2 class="text-xl font-bold font-headline">Planning du jour</h2>
<button class="text-primary font-bold text-sm hover:opacity-80 transition-opacity">Tout voir</button>
</div>
<div class="space-y-4">
<!-- Patient Row 1 -->
<div class="flex items-center justify-between p-4 bg-surface rounded-lg">
<div class="flex items-center gap-4">
<span class="text-on-surface-variant font-bold text-sm w-12">09:00</span>
<div>
<p class="font-bold">Jean-Pierre Bernard</p>
<p class="text-xs text-on-surface-variant">Consultation Générale</p>
</div>
</div>
<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">Confirmé</span>
</div>
<!-- Patient Row 2 -->
<div class="flex items-center justify-between p-4 bg-surface rounded-lg">
<div class="flex items-center gap-4">
<span class="text-on-surface-variant font-bold text-sm w-12">09:30</span>
<div>
<p class="font-bold">Lucie Durand</p>
<p class="text-xs text-on-surface-variant">Suivi Post-Opératoire</p>
</div>
</div>
<span class="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-bold">En attente</span>
</div>
<!-- Patient Row 3 -->
<div class="flex items-center justify-between p-4 bg-surface rounded-lg">
<div class="flex items-center gap-4">
<span class="text-on-surface-variant font-bold text-sm w-12">10:00</span>
<div>
<p class="font-bold">Marc Lefebvre</p>
<p class="text-xs text-on-surface-variant">Vaccination</p>
</div>
</div>
<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">Confirmé</span>
</div>
</div>
</div>
<!-- Stats and Quick Actions -->
<div class="col-span-4 flex flex-col gap-6">
<div class="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-on-primary">
<p class="text-sm font-medium opacity-80 mb-2">Patients Total</p>
<h3 class="text-4xl font-extrabold mb-4">1,402</h3>
<div class="flex items-center gap-2 text-sm">
<span class="bg-white/20 px-2 py-0.5 rounded-full">+12%</span>
<span>depuis le mois dernier</span>
</div>
</div>
<div class="bg-surface-container-high rounded-xl p-6">
<h3 class="font-bold mb-4">Actions Rapides</h3>
<div class="grid grid-cols-2 gap-3">
<button class="flex flex-col items-center gap-2 p-4 bg-surface-container-lowest rounded-lg hover:bg-primary/5 transition-colors">
<span class="material-symbols-outlined text-primary">person_add</span>
<span class="text-xs font-bold">Nouveau Patient</span>
</button>
<button class="flex flex-col items-center gap-2 p-4 bg-surface-container-lowest rounded-lg hover:bg-primary/5 transition-colors">
<span class="material-symbols-outlined text-primary">add_box</span>
<span class="text-xs font-bold">Nouveau RDV</span>
</button>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- GLOBAL CHATBOT WIDGET - Drawer Panel Overlay -->
<div class="fixed inset-0 z-50 pointer-events-none">
<!-- Backdrop - Subtle dimming of the content behind -->
<div class="absolute inset-0 bg-on-background/10 backdrop-blur-[2px] pointer-events-auto"></div>
<!-- The Drawer Panel (Right Side) -->
<div class="absolute right-0 top-0 h-full w-[400px] bg-surface-container-lowest shadow-2xl flex flex-col pointer-events-auto border-l border-outline-variant/20 animate-slide-in">
<!-- Header -->
<header class="p-6 flex items-center justify-between border-b border-surface-container-high bg-white/80 backdrop-blur-md sticky top-0 z-10">
<div class="flex items-center gap-4">
<div class="relative">
<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-md">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
</div>
<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
</div>
<div>
<h2 class="text-lg font-headline font-bold text-on-surface">Assistant MediCabinet</h2>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-green-500"></span>
<span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">En ligne</span>
</div>
</div>
</div>
<button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">close</span>
</button>
</header>
<!-- Message History Area -->
<div class="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-surface/30">
<!-- Bot Message -->
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined text-sm">smart_toy</span>
</div>
<div class="max-w-[85%]">
<div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed border border-outline-variant/10">
                            Bonjour Marie ! Comment puis-je vous aider aujourd'hui ? Je peux vous aider à gérer les rendez-vous, rechercher un patient ou préparer les dossiers du jour.
                        </div>
<p class="text-[10px] text-on-surface-variant font-medium mt-2 ml-1">09:15</p>
</div>
</div>
<!-- User Message -->
<div class="flex items-start flex-row-reverse gap-3">
<div class="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
<span class="material-symbols-outlined text-sm">person</span>
</div>
<div class="max-w-[85%] text-right">
<div class="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none shadow-md text-sm leading-relaxed">
                            Quels sont les rendez-vous urgents pour cet après-midi ?
                        </div>
<p class="text-[10px] text-on-surface-variant font-medium mt-2 mr-1">09:16</p>
</div>
</div>
<!-- Bot Message with Data -->
<div class="flex items-start gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined text-sm">smart_toy</span>
</div>
<div class="max-w-[85%]">
<div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed border border-outline-variant/10">
<p class="mb-3">J'ai identifié 2 rendez-vous marqués comme prioritaires pour cet après-midi :</p>
<div class="space-y-2">
<div class="bg-surface p-3 rounded-lg border-l-4 border-error">
<p class="font-bold text-xs">M. Robert (14h30)</p>
<p class="text-[10px] text-on-surface-variant">Suivi hypertension aiguë</p>
</div>
<div class="bg-surface p-3 rounded-lg border-l-4 border-tertiary">
<p class="font-bold text-xs">Mme. Simon (16h00)</p>
<p class="text-[10px] text-on-surface-variant">Changement de pansement complexe</p>
</div>
</div>
</div>
<p class="text-[10px] text-on-surface-variant font-medium mt-2 ml-1">09:16</p>
</div>
</div>
<!-- Typing indicator simulation -->
<div class="flex items-center gap-2 ml-11">
<span class="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce"></span>
<span class="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
<span class="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
</div>
</div>
<!-- Footer / Message Input -->
<footer class="p-6 bg-surface-container-lowest border-t border-surface-container-high">
<div class="flex flex-wrap gap-2 mb-4">
<button class="px-3 py-1.5 bg-surface-container-high rounded-full text-[11px] font-bold hover:bg-primary hover:text-on-primary transition-colors">
                        Rechercher un dossier
                    </button>
<button class="px-3 py-1.5 bg-surface-container-high rounded-full text-[11px] font-bold hover:bg-primary hover:text-on-primary transition-colors">
                        Libérer un créneau
                    </button>
</div>
<div class="relative flex items-center">
<input class="w-full pl-5 pr-14 py-4 bg-surface rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none text-sm transition-all shadow-inner" placeholder="Tapez votre message..." type="text"/>
<button class="absolute right-2 w-10 h-10 bg-primary text-on-primary rounded-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
</button>
</div>
<p class="text-center text-[10px] text-on-surface-variant mt-4 opacity-50 uppercase tracking-widest font-bold">
                    IA Médicale Sécurisée • MediCabinet
                </p>
</footer>
</div>
</div>
<!-- Floating Action Button (Background Context) -->
<button class="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-xl hover:scale-105 transition-transform z-40">
<span class="material-symbols-outlined text-3xl">chat</span>
</button>
</body></html>
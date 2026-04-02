<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
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
      body { font-family: 'Inter', sans-serif; }
      .font-headline { font-family: 'Manrope', sans-serif; }
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      .gradient-primary { background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%); }
    </style>
</head>
<body class="bg-surface text-on-surface antialiased">
<aside class="fixed left-0 top-0 h-full flex flex-col bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r border-slate-200 dark:border-slate-800 z-50 font-['Manrope'] antialiased">
<div class="p-6">
<div class="flex items-center gap-3 mb-8">
<img alt="Logo MediCabinet" class="w-10 h-10 rounded-xl" data-alt="minimalist medical logo showing a stylized medical cross integrated into a soft blue geometric shape on white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeoSZyhRhuqdu9UsxNl8MiYy5X6gF2GP7TA7jq_EkjvVVVRX02wzyNOyZ3Vj66u6e1JdWK5eQHyqkNTuHBu_OS4vYKIsPW6LTA73ZBzWzfY5HRtjPzMebewiLz6EzFY_1Oha5fPO--G0wcTuVw4Px84N_GoQCPfa6aVdzsrqg9XSLrbByrUm80SiGL-w2oZRJF-JQQMG4CDGf2zHx0lD329f4R7D50CK0qNXCqaitfhKLoMnlPmN6_Pd8mgJNWUB3uzSWPr19oPg7Q"/>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</h1>
<p class="text-xs text-slate-500 font-medium tracking-tight">Gestion Médicale</p>
</div>
</div>
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-200/50 scale-95 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-sm">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="text-sm">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="text-sm">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="text-sm">Consultations</span>
</a>
</nav>
</div>
<div class="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-sm font-medium">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="text-sm font-medium">Déconnexion</span>
</a>
</nav>
<div class="mt-6 flex items-center gap-3 px-2">
<img alt="Dr. Julian" class="w-10 h-10 rounded-full object-cover" data-alt="professional portrait of a middle-aged male doctor with a kind expression and stethoscope, studio lighting with neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeA2veKvW-BX89XeBV9mipGF5x1x9qaMaYkcb9L91F_6N3Bz73iDO4foWKqZbDr5hflCV78d6FDn-LWfK63xZjuFpMdlqVj2SQldBTjrxUhJzn9YOoowSbIKV5WGxNImy3Prv3oZJxc2-KpJOHYM5k1yBUtiT8jDCbaKl1rJ846P_WsDa3E8G13Gn8RIVnS5z5s5A7j9Swv76DE_5gbrsH_X11jY8p7CFh2HmH6IHfJOhDvXM9pAt2CYm2BLMeK0tfTBHWz2NeRuZO"/>
<div class="overflow-hidden">
<p class="text-sm font-bold truncate">Dr. Jean-Marc Julian</p>
<p class="text-xs text-slate-500">Cardiologue</p>
</div>
</div>
</div>
</aside>
<main class="ml-64 p-8 min-h-screen">
<header class="flex justify-between items-end mb-10">
<div>
<h2 class="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-1">Tableau de Bord Médecin</h2>
<p class="text-on-surface-variant">Lundi 24 Mai 2024 — Vous avez 12 rendez-vous aujourd'hui.</p>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<button class="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">notifications</span>
</button>
<span class="absolute top-2 right-2 w-3 h-3 bg-error rounded-full border-2 border-surface"></span>
</div>
<button class="gradient-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-98">
<span class="material-symbols-outlined">add</span>
                    Nouvelle Consultation
                </button>
</div>
</header>
<div class="grid grid-cols-12 gap-6">
<div class="col-span-8 space-y-6">
<section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-2xl">event_note</span>
<h3 class="text-xl font-bold font-headline">Rendez-vous du jour</h3>
</div>
<a class="text-primary text-sm font-bold hover:underline" href="#">Voir l'agenda complet</a>
</div>
<div class="space-y-4">
<div class="flex items-center gap-6 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:bg-white hover:shadow-md transition-all group">
<div class="w-16 text-center">
<p class="text-lg font-extrabold text-primary">09:00</p>
<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">30 MIN</p>
</div>
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">ML</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface">Marc Laurent</h4>
<p class="text-sm text-on-surface-variant italic">Suivi post-opératoire</p>
</div>
<div class="flex items-center gap-3">
<span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded-full uppercase tracking-wider">Confirmé</span>
<button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div class="flex items-center gap-6 p-4 rounded-xl bg-white shadow-md border border-outline-variant/20 group">
<div class="w-16 text-center">
<p class="text-lg font-extrabold text-primary">09:45</p>
<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">45 MIN</p>
</div>
<div class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">SB</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface">Sophie Bernard</h4>
<p class="text-sm text-on-surface-variant italic">Première consultation cardiologie</p>
</div>
<div class="flex items-center gap-3">
<span class="px-3 py-1 bg-primary-container text-white text-[10px] font-bold rounded-full uppercase tracking-wider">En cours</span>
<button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-opacity">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div class="flex items-center gap-6 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:bg-white hover:shadow-md transition-all group">
<div class="w-16 text-center">
<p class="text-lg font-extrabold text-primary">10:30</p>
<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">15 MIN</p>
</div>
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">JD</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface">Jean Dupont</h4>
<p class="text-sm text-on-surface-variant italic">Renouvellement ordonnance</p>
</div>
<div class="flex items-center gap-3">
<span class="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded-full uppercase tracking-wider">En attente</span>
<button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div class="flex items-center gap-6 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:bg-white hover:shadow-md transition-all group">
<div class="w-16 text-center">
<p class="text-lg font-extrabold text-primary">11:15</p>
<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">30 MIN</p>
</div>
<div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">AL</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface">Amélie Lefebvre</h4>
<p class="text-sm text-on-surface-variant italic">Douleurs thoraciques</p>
</div>
<div class="flex items-center gap-3">
<span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded-full uppercase tracking-wider">Confirmé</span>
<button class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
</div>
</section>
</div>
<div class="col-span-4 space-y-6">
<div class="bg-primary text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
<div class="relative z-10">
<p class="text-xs font-bold uppercase tracking-widest text-primary-fixed mb-2">Statistiques du jour</p>
<h3 class="text-4xl font-black mb-4">85%</h3>
<p class="text-sm text-blue-100 leading-relaxed mb-6">Taux d'occupation de votre agenda aujourd'hui. Vous êtes au-dessus de votre moyenne habituelle.</p>
<button class="w-full bg-white/20 backdrop-blur-md text-white py-3 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors">
                            Voir le rapport hebdomadaire
                        </button>
</div>
<div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
</div>
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
<h3 class="text-lg font-bold font-headline mb-4">Accès Rapide</h3>
<div class="grid grid-cols-1 gap-3">
<button class="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/10 hover:bg-primary/5 hover:border-primary/20 transition-all text-left">
<span class="material-symbols-outlined p-3 bg-secondary-fixed text-secondary rounded-xl">prescriptions</span>
<div>
<p class="font-bold text-on-surface">Prescription Express</p>
<p class="text-xs text-on-surface-variant">Modèles pré-enregistrés</p>
</div>
</button>
<button class="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/10 hover:bg-primary/5 hover:border-primary/20 transition-all text-left">
<span class="material-symbols-outlined p-3 bg-tertiary-fixed text-tertiary rounded-xl">lab_profile</span>
<div>
<p class="font-bold text-on-surface">Résultats Labo</p>
<p class="text-xs text-on-surface-variant">3 nouveaux résultats urgents</p>
</div>
</button>
<button class="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/10 hover:bg-primary/5 hover:border-primary/20 transition-all text-left">
<span class="material-symbols-outlined p-3 bg-primary-fixed text-primary rounded-xl">clinical_notes</span>
<div>
<p class="font-bold text-on-surface">Archives Médicales</p>
<p class="text-xs text-on-surface-variant">Recherche avancée patients</p>
</div>
</button>
</div>
</div>
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm border-l-4 border-error">
<h3 class="text-sm font-bold text-error uppercase tracking-widest mb-3">Tâches urgentes</h3>
<div class="space-y-4">
<div class="flex gap-3">
<span class="material-symbols-outlined text-error text-sm mt-1">emergency</span>
<p class="text-sm text-on-surface">Appeler Mme. Martin (Analyses reçues)</p>
</div>
<div class="flex gap-3">
<span class="material-symbols-outlined text-on-surface-variant text-sm mt-1">task_alt</span>
<p class="text-sm text-on-surface">Signer 5 dossiers de sortie</p>
</div>
</div>
</div>
</div>
</div>
</main>
<div class="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[100]">
<div class="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 hidden md:block">
<div class="bg-primary p-4 flex items-center justify-between text-white">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-sm">smart_toy</span>
</div>
<div>
<p class="text-xs font-bold">Assistant MediCabinet</p>
<p class="text-[10px] text-blue-100">En ligne pour vous aider</p>
</div>
</div>
<button class="text-white/60 hover:text-white transition-colors">
<span class="material-symbols-outlined text-sm">close</span>
</button>
</div>
<div class="p-4 h-48 bg-slate-50 overflow-y-auto space-y-3">
<div class="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs text-on-surface max-w-[85%]">
                    Bonjour Docteur, comment puis-je vous aider aujourd'hui ? Je peux rechercher un patient ou préparer une ordonnance.
                </div>
<div class="bg-primary/10 p-3 rounded-xl rounded-tr-none text-xs text-primary max-w-[85%] ml-auto">
                    Montre moi le dernier dossier de Marc Laurent.
                </div>
</div>
<div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
<input class="flex-1 bg-slate-50 border-none text-xs rounded-lg focus:ring-1 focus:ring-primary" placeholder="Écrivez votre message..." type="text"/>
<button class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
<span class="material-symbols-outlined text-sm">send</span>
</button>
</div>
</div>
<button class="w-14 h-14 gradient-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
</button>
</div>
</body></html>
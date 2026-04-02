<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Gestion des Rendez-vous</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
        .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
        }
    </style>
</head>
<body class="bg-background text-on-background font-body antialiased flex overflow-hidden h-screen">
<!-- SideNavBar Component -->
<aside class="fixed left-0 top-0 h-full flex flex-col h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-['Manrope'] antialiased z-50">
<div class="p-6 flex items-center space-x-3">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">medical_services</span>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</h1>
<p class="text-xs text-slate-500 font-medium tracking-tight">Gestion Médicale</p>
</div>
</div>
<nav class="flex-1 mt-6 px-4 space-y-2">
<!-- Active: Rendez-vous -->
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-medium">Tableau de bord</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-blue-50/50" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span class="font-medium">Rendez-vous</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" href="#">
<span class="material-symbols-outlined">groups</span>
<span class="font-medium">Patients</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" href="#">
<span class="material-symbols-outlined">medical_services</span>
<span class="font-medium">Consultations</span>
</a>
</nav>
<div class="p-4 mt-auto border-t border-slate-200/50">
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-medium">Paramètres</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-medium">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="flex-1 ml-64 overflow-y-auto bg-background p-8 relative">
<!-- Header / Stats Row -->
<header class="flex justify-between items-center mb-10">
<div>
<h2 class="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Planning Hebdomadaire</h2>
<p class="text-on-surface-variant mt-1">Gérez les consultations et la disponibilité des médecins.</p>
</div>
<button class="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
<span class="material-symbols-outlined">add</span>
<span>Ajouter un RDV</span>
</button>
</header>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-12 gap-8 items-start">
<!-- Calendar Section (Large Left) -->
<div class="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15">
<div class="flex items-center justify-between mb-8">
<div class="flex items-center space-x-4">
<h3 class="text-xl font-bold font-headline">Octobre 2023</h3>
<div class="flex bg-surface-container rounded-lg p-1">
<button class="p-1 hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="p-1 hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
<div class="flex bg-surface-container rounded-lg p-1 text-sm font-medium">
<button class="px-4 py-1.5 rounded-md hover:bg-white transition-all">Jour</button>
<button class="px-4 py-1.5 rounded-md bg-white shadow-sm transition-all">Semaine</button>
<button class="px-4 py-1.5 rounded-md hover:bg-white transition-all">Mois</button>
</div>
</div>
<div class="grid grid-cols-7 gap-px bg-outline-variant/10 border border-outline-variant/10 rounded-lg overflow-hidden">
<!-- Day Headers -->
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">Lun</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">Mar</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">Mer</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">Jeu</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">Ven</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant text-error">Sam</div>
<div class="bg-surface-container-low p-4 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant text-error">Dim</div>
<!-- Calendar Cells (Mock Grid) -->
<!-- Row 1 -->
<div class="bg-white p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-semibold opacity-30">27</span>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-semibold opacity-30">28</span>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-semibold opacity-30">29</span>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-semibold opacity-30">30</span>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">1</span>
<div class="mt-2 p-2 bg-primary/10 text-primary text-[10px] rounded leading-tight font-bold border-l-2 border-primary">
                            09:00 - Marc Durand
                        </div>
</div>
<div class="bg-surface-container-lowest p-2 min-h-[140px] border-r border-b border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">2</span>
</div>
<div class="bg-surface-container-lowest p-2 min-h-[140px] border-b border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">3</span>
</div>
<!-- Row 2 (Current Focus) -->
<div class="bg-white p-2 min-h-[140px] border-r border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">4</span>
<div class="mt-2 p-2 bg-tertiary/10 text-tertiary text-[10px] rounded leading-tight font-bold border-l-2 border-tertiary">
                            10:30 - Sophie Petit
                        </div>
</div>
<div class="bg-primary/5 p-2 min-h-[140px] border-r border-outline-variant/10 ring-2 ring-primary/20 ring-inset">
<span class="text-sm font-bold text-primary">5</span>
<div class="mt-2 space-y-1">
<div class="p-2 bg-primary text-white text-[10px] rounded leading-tight font-bold shadow-md">
                                08:30 - Jean Luc
                            </div>
<div class="p-2 bg-surface-container-highest text-on-surface-variant text-[10px] rounded leading-tight font-bold">
                                14:00 - Marie Curie
                            </div>
</div>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">6</span>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">7</span>
<div class="mt-2 p-2 bg-error/10 text-error text-[10px] rounded leading-tight font-bold border-l-2 border-error">
                            11:15 - Paul Martin
                        </div>
</div>
<div class="bg-white p-2 min-h-[140px] border-r border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">8</span>
</div>
<div class="bg-surface-container-lowest p-2 min-h-[140px] border-r border-outline-variant/10">
<span class="text-sm font-bold text-on-surface">9</span>
</div>
<div class="bg-surface-container-lowest p-2 min-h-[140px]">
<span class="text-sm font-bold text-on-surface">10</span>
</div>
</div>
</div>
<!-- Side List Section -->
<div class="col-span-12 lg:col-span-4 flex flex-col space-y-6">
<!-- Search & Filters -->
<div class="bg-surface-container-lowest rounded-xl p-5 shadow-[0_10px_30px_rgba(0,26,65,0.03)] border border-outline-variant/15">
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input class="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-outline" placeholder="Rechercher un patient..." type="text"/>
</div>
</div>
<!-- Recent Appointments List -->
<div class="bg-surface-container-lowest rounded-xl p-2 shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15 overflow-hidden">
<div class="p-4 border-b border-outline-variant/10 flex justify-between items-center">
<h4 class="font-bold font-headline">Aujourd'hui</h4>
<span class="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">5 RDV</span>
</div>
<div class="divide-y divide-outline-variant/5">
<!-- Appointment Item 1 -->
<div class="p-4 hover:bg-surface-container-low transition-colors group">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="portrait of a middle-aged man with a friendly smile, clean medical office background, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAweUbTQAvX2dIZzdo1JI5MTyQC7Q9UjuHy_f4CBw9_PJmiodvAvVsApNcfuCDrDN2KmFL8hXj9KeGZMYhYquP-Z8781E-lwcV2DfHtcyeAuEh-PC6IRxvKHYbx7AUYUlw1pzlbwgfLlSZsA05VYr5pGn-UFeMzR2OQxnUkfVIULQIt_d2vI4RoMjg1seDmFiLTAnBf_zNgULWCVeMoTV5NWUnsFHs2P7-j2LYgLS_cCCDPIGrweN0nHkCwjpobiczFjfde8r-sEs1q"/>
<div>
<p class="font-bold text-on-surface leading-none mb-1">Jean-Luc Picard</p>
<p class="text-[10px] text-on-surface-variant flex items-center">
<span class="material-symbols-outlined text-[12px] mr-1">schedule</span> 08:30
                                        </p>
</div>
</div>
<span class="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-primary/10 text-primary rounded-full">confirmé</span>
</div>
<div class="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-primary/10 hover:text-primary transition-colors">Voir</button>
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-tertiary/10 hover:text-tertiary transition-colors">Modifier</button>
<button class="p-1.5 bg-surface-container-high rounded hover:bg-error/10 hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>
<!-- Appointment Item 2 -->
<div class="p-4 hover:bg-surface-container-low transition-colors group">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-3">
<div class="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-bold">SP</div>
<div>
<p class="font-bold text-on-surface leading-none mb-1">Sophie Petit</p>
<p class="text-[10px] text-on-surface-variant flex items-center">
<span class="material-symbols-outlined text-[12px] mr-1">schedule</span> 10:30
                                        </p>
</div>
</div>
<span class="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-tertiary/10 text-tertiary rounded-full">en attente</span>
</div>
<div class="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-primary/10 hover:text-primary transition-colors">Voir</button>
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-tertiary/10 hover:text-tertiary transition-colors">Modifier</button>
<button class="p-1.5 bg-surface-container-high rounded hover:bg-error/10 hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>
<!-- Appointment Item 3 -->
<div class="p-4 hover:bg-surface-container-low transition-colors group">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="headshot of a young professional woman with brown hair, soft bokeh background, bright clinical lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJA1rGLaFkj2LI7Pg3c3SU0PUGb4meo-HhGHXauwL3gqyjVfyA8pOOsagcEFEVgIc1HsO09B9IZKTdKBaj2EEB8NoH7kHRLQ4nF0hDY28Mnmlox11SPHr0f-gp3cd2OHYU1p65_cg_jZhzib8TaL0Uh_csbStl4Jy6b_6Y3Rtc3Ekx4J4HlPek-jCKZqFjEu6pL6lCKZKgm84dadSf3KRcWQTlDjztWxENM5SW_g1InhCqM4U6tHEkk_ukM_3VLgZ3La_1c5GA4y6Q"/>
<div>
<p class="font-bold text-on-surface leading-none mb-1">Marie Curie</p>
<p class="text-[10px] text-on-surface-variant flex items-center">
<span class="material-symbols-outlined text-[12px] mr-1">schedule</span> 14:00
                                        </p>
</div>
</div>
<span class="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-primary/10 text-primary rounded-full">confirmé</span>
</div>
<div class="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-primary/10 hover:text-primary transition-colors">Voir</button>
<button class="flex-1 text-[10px] font-bold py-1.5 bg-surface-container-high rounded hover:bg-tertiary/10 hover:text-tertiary transition-colors">Modifier</button>
<button class="p-1.5 bg-surface-container-high rounded hover:bg-error/10 hover:text-error transition-colors"><span class="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>
<!-- Appointment Item 4 (Cancelled) -->
<div class="p-4 hover:bg-surface-container-low transition-colors group">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-3 opacity-50">
<div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">PM</div>
<div>
<p class="font-bold text-on-surface leading-none mb-1 line-through">Paul Martin</p>
<p class="text-[10px] text-on-surface-variant">11:15</p>
</div>
</div>
<span class="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-error/10 text-error rounded-full">annulé</span>
</div>
</div>
</div>
<button class="w-full py-4 text-xs font-bold text-outline hover:text-primary transition-colors">Afficher plus de rendez-vous</button>
</div>
<!-- Secondary Small Stats Card -->
<div class="bg-gradient-to-br from-secondary to-secondary-container rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
<span class="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10">monitoring</span>
<h5 class="text-sm font-bold opacity-80 mb-1">Taux d'occupation</h5>
<p class="text-3xl font-black mb-4">92%</p>
<div class="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div class="bg-white h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
</div>
<p class="text-[10px] mt-4 font-medium italic opacity-70">+12% par rapport à la semaine dernière</p>
</div>
</div>
</div>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-[100] group">
<div class="absolute bottom-full right-0 mb-4 w-72 bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl border border-outline-variant/20 overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto">
<div class="bg-primary p-4 flex items-center space-x-3">
<div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
</div>
<div>
<p class="text-white font-bold text-sm">Assistant MediBot</p>
<p class="text-white/70 text-[10px]">En ligne • Réponse instantanée</p>
</div>
</div>
<div class="p-4 space-y-4 h-64 overflow-y-auto bg-surface-container-low/30">
<div class="flex items-end space-x-2">
<div class="bg-surface-container-high p-3 rounded-2xl rounded-bl-none max-w-[80%] text-xs font-medium">
                            Bonjour ! Je peux vous aider à reprogrammer un rendez-vous ou à chercher un dossier patient.
                        </div>
</div>
</div>
<div class="p-3 border-t border-outline-variant/10 flex items-center space-x-2">
<input class="flex-1 text-xs border-none bg-surface-container-low rounded-lg focus:ring-1 focus:ring-primary" placeholder="Posez votre question..." type="text"/>
<button class="bg-primary text-white p-2 rounded-lg"><span class="material-symbols-outlined text-sm">send</span></button>
</div>
</div>
<button class="w-16 h-16 rounded-full bg-primary shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">forum</span>
</button>
</div>
</main>
</body></html>
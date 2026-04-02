<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Gestion des Patients</title>
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
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3 { font-family: 'Manrope', sans-serif; }
    </style>
</head>
<body class="bg-surface text-on-surface flex min-h-screen">
<!-- SideNavBar Component (Fixed Left) -->
<aside class="fixed left-0 top-0 h-full flex flex-col bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r border-slate-200 dark:border-slate-800 z-50">
<div class="p-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300">MediCabinet</h1>
<p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Gestion Médicale</p>
</div>
</div>
</div>
<nav class="flex-1 px-4 py-4 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors scale-95 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors scale-95 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="font-medium">Rendez-vous</span>
</a>
<!-- Active State for Patients -->
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-200/50 dark:bg-slate-800/50 scale-95 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-medium">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors scale-95 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="font-medium">Consultations</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium text-sm">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/20 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-medium text-sm">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 flex flex-col min-h-screen">
<!-- Header / Search Area -->
<header class="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
<div class="flex-1 max-w-2xl">
<div class="relative group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input class="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:shadow-sm transition-all outline-none text-on-surface" placeholder="Rechercher un patient par nom, CIN ou téléphone..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6 ml-8">
<div class="flex flex-col items-end">
<span class="text-sm font-bold text-on-surface">Sophie Vallet</span>
<span class="text-[10px] text-outline font-medium tracking-wide uppercase">Secrétaire Médicale</span>
</div>
<img alt="Profil" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10" data-alt="Professional headshot of a friendly medical secretary in a clean clinic setting, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk6SkUysKfbVjPi79BdKD0Iln3YfefCLjxp_AvK2EKO4EKMZJkqGS6ko5XjTtQkI634F9ogOjyPbwCWW5gqJGAW_s7sjaXGWBjVuS3RTZEmbuiIU-tAQ3omQ3JC_9BTmLCq4yqaXKAcWMN4RThCcRFB_djUGwjgaKRKyTgAiJmHmDoSBuhPEm8bBEqQem0tjMRMeTr5-7S2DuCA5rUtChFz5YiOrqWo5ESTd7y0cMmQCdLrKznEP2_4BzrIfYgZR5g8bVFxZeq_l-q"/>
</div>
</header>
<!-- Dashboard Body -->
<div class="p-8 space-y-8">
<!-- Hero Title & Actions -->
<div class="flex items-end justify-between">
<div>
<h2 class="text-3xl font-extrabold tracking-tight text-on-surface">Base de données Patients</h2>
<p class="text-outline mt-1 font-medium">Gérez et suivez les dossiers médicaux de vos patients</p>
</div>
<button class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
<span class="material-symbols-outlined" data-icon="person_add">person_add</span>
                    Ajouter un patient
                </button>
</div>
<!-- Bento Stats Grid (Added for High-end feel) -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
<div class="p-6 bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="group">group</span>
</div>
<div>
<p class="text-2xl font-black">1,284</p>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Total Patients</p>
</div>
</div>
</div>
<div class="p-6 bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
</div>
<div>
<p class="text-2xl font-black">24</p>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Rendez-vous Aujourd'hui</p>
</div>
</div>
</div>
<div class="p-6 bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-outline-variant/10">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-tint/10 text-surface-tint flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="new_releases">new_releases</span>
</div>
<div>
<p class="text-2xl font-black">12</p>
<p class="text-xs text-outline font-bold uppercase tracking-tighter">Nouveaux ce mois</p>
</div>
</div>
</div>
<div class="p-6 bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-outline-variant/10 flex items-center justify-center border-2 border-dashed border-outline-variant/50 hover:bg-surface-container-low transition-colors cursor-pointer group">
<span class="text-outline group-hover:text-primary font-bold text-sm">Générer un rapport complet</span>
</div>
</div>
<!-- Patient Table Container -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden ring-1 ring-outline-variant/15">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container text-outline text-[11px] font-black uppercase tracking-widest">
<th class="px-6 py-5">Patient</th>
<th class="px-6 py-5">Identité (CIN)</th>
<th class="px-6 py-5">Téléphone</th>
<th class="px-6 py-5">Date de naissance</th>
<th class="px-6 py-5">Dernière visite</th>
<th class="px-6 py-5 text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container/50">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">AB</div>
<div>
<p class="font-bold text-on-surface">Amira</p>
<p class="text-sm font-medium text-slate-500">BENNANI</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="text-sm font-mono text-on-surface-variant font-medium bg-surface-container px-2 py-1 rounded">BK67890</span>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">06 12 34 56 78</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">14 Mars 1988</td>
<td class="px-6 py-5">
<span class="text-[10px] font-bold px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed uppercase tracking-tight">Il y a 2j</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Voir le détail">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors" title="Modifier">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button class="p-2 text-error hover:bg-error-container/30 rounded-lg transition-colors" title="Supprimer">
<span class="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">OM</div>
<div>
<p class="font-bold text-on-surface">Omar</p>
<p class="text-sm font-medium text-slate-500">MANSOURI</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="text-sm font-mono text-on-surface-variant font-medium bg-surface-container px-2 py-1 rounded">AE11223</span>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">06 99 88 77 66</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">02 Juil 1975</td>
<td class="px-6 py-5">
<span class="text-[10px] font-bold px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed uppercase tracking-tight">Aujourd'hui</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Voir le détail">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors" title="Modifier">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button class="p-2 text-error hover:bg-error-container/30 rounded-lg transition-colors" title="Supprimer">
<span class="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">SD</div>
<div>
<p class="font-bold text-on-surface">Sara</p>
<p class="text-sm font-medium text-slate-500">DRISSI</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="text-sm font-mono text-on-surface-variant font-medium bg-surface-container px-2 py-1 rounded">CB54321</span>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">07 01 02 03 04</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">22 Nov 1995</td>
<td class="px-6 py-5">
<span class="text-[10px] font-bold px-3 py-1 rounded-full bg-surface-container-highest text-outline uppercase tracking-tight">15 Oct 2023</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Voir le détail">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors" title="Modifier">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button class="p-2 text-error hover:bg-error-container/30 rounded-lg transition-colors" title="Supprimer">
<span class="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">KF</div>
<div>
<p class="font-bold text-on-surface">Karim</p>
<p class="text-sm font-medium text-slate-500">FAHMI</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="text-sm font-mono text-on-surface-variant font-medium bg-surface-container px-2 py-1 rounded">GZ90876</span>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">06 55 44 33 22</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">05 Fév 1962</td>
<td class="px-6 py-5">
<span class="text-[10px] font-bold px-3 py-1 rounded-full bg-error-container text-on-error-container uppercase tracking-tight">Urgences</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Voir le détail">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors" title="Modifier">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button class="p-2 text-error hover:bg-error-container/30 rounded-lg transition-colors" title="Supprimer">
<span class="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination Footer -->
<div class="px-6 py-4 flex items-center justify-between bg-surface-container-low border-t border-surface-container">
<p class="text-xs font-bold text-outline uppercase tracking-wider">Affichage 1-10 sur 1,284 patients</p>
<div class="flex gap-2">
<button class="p-2 rounded-lg border border-outline-variant/30 hover:bg-white transition-colors disabled:opacity-30" disabled="">
<span class="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
</button>
<button class="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm shadow-primary/20">1</button>
<button class="px-3 py-1 rounded-lg hover:bg-white text-xs font-bold">2</button>
<button class="px-3 py-1 rounded-lg hover:bg-white text-xs font-bold">3</button>
<button class="p-2 rounded-lg border border-outline-variant/30 hover:bg-white transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
<!-- Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
<!-- Chat Bubble (Hidden by default, shown on trigger) -->
<div class="hidden md:flex flex-col w-80 bg-surface-container-lowest rounded-2xl shadow-2xl ring-1 ring-outline-variant/20 overflow-hidden transform translate-y-4 opacity-0 pointer-events-none transition-all duration-300">
<div class="bg-primary p-4 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-white text-sm" data-icon="smart_toy">smart_toy</span>
</div>
<div>
<h4 class="text-white text-sm font-bold leading-none">Assistant MediCabinet</h4>
<span class="text-white/70 text-[10px] font-medium">IA Opérationnelle</span>
</div>
</div>
<div class="h-64 p-4 overflow-y-auto space-y-4 bg-surface">
<div class="flex gap-2">
<div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[14px] text-primary" data-icon="smart_toy">smart_toy</span>
</div>
<div class="bg-surface-container-high p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl">
<p class="text-xs font-medium text-on-surface">Bonjour Sophie ! Comment puis-je vous aider aujourd'hui dans la gestion des patients ?</p>
</div>
</div>
</div>
<div class="p-4 border-t border-surface-container">
<div class="relative">
<input class="w-full pl-3 pr-10 py-2 bg-surface text-xs rounded-lg border border-outline-variant/30 focus:ring-1 focus:ring-primary outline-none" placeholder="Posez une question..." type="text"/>
<button class="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
<span class="material-symbols-outlined text-lg" data-icon="send">send</span>
</button>
</div>
</div>
</div>
<!-- FAB Trigger -->
<button class="w-14 h-14 rounded-full bg-primary shadow-xl shadow-primary/30 flex items-center justify-center text-on-primary hover:scale-110 active:scale-95 transition-all">
<span class="material-symbols-outlined" data-icon="chat" style="font-variation-settings: 'FILL' 1;">chat</span>
</button>
</div>
</body></html>
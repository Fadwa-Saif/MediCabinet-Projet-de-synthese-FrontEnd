<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Créer une Ordonnance</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
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
        .signature-gradient {
            background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
        }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, .brand-font { font-family: 'Manrope', sans-serif; }
    </style>
</head>
<body class="bg-background text-on-surface antialiased">
<!-- Sidebar Navigation -->
<aside class="fixed left-0 top-0 h-full w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50">
<div class="p-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl signature-gradient flex items-center justify-center text-white shadow-sm">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 dark:text-blue-300 tracking-tight">MediCabinet</h1>
<p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Gestion Médicale</p>
</div>
</div>
</div>
<nav class="flex-1 px-4 space-y-2 mt-4">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="font-medium">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-medium">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-100 dark:bg-slate-800/50" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="font-medium">Consultations</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-medium">Déconnexion</span>
</a>
</div>
</aside>
<!-- Main Content -->
<main class="ml-64 p-8 min-h-screen">
<header class="mb-10 flex justify-between items-end">
<div>
<nav class="flex items-center gap-2 text-sm text-outline mb-2">
<span>Consultations</span>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-on-surface-variant">Nouvelle Ordonnance</span>
</nav>
<h2 class="text-4xl font-extrabold text-on-surface tracking-tight">Rédaction d'Ordonnance</h2>
</div>
<div class="flex gap-3">
<button class="px-6 py-2.5 rounded-lg bg-surface-container-high text-primary font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
<span class="material-symbols-outlined text-xl">print</span>
                    Imprimer
                </button>
<button class="px-6 py-2.5 rounded-lg signature-gradient text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-xl">file_download</span>
                    Générer l'ordonnance
                </button>
</div>
</header>
<div class="grid grid-cols-12 gap-8">
<!-- Form Section -->
<section class="col-span-8 space-y-8">
<!-- Patient Info Card -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/15">
<div class="flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
<img alt="Avatar Patient" class="w-full h-full object-cover" data-alt="portrait of a middle-aged man with short dark hair and a friendly expression in a clinical setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-XARd5XhXqi-3l_NnCr_p2rVdVAzVAPaojgx4jmSz3JBliW2WeD-k3pWFwNgJwRYo1nm61HF1cmAF9nH4U2G918DQFF_OpI1qpXobmYNpU1sg_WpyE2DIT7uJCWuSi8xH5YSbg--5bn5ZNGpPSNZW47eGzs-tOOzZLKKh-au1jQP-gf5dMg0RMcb3NkAdi8umyEgRg4uG9qNTdRmcr6eG1aQc5cXgEtjotIUFnd7rM5ykLjzNCixzUQe5mwkf2JZM5psuEUtZE_9a"/>
</div>
<div class="flex-1">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-1">Patient Sélectionné</label>
<h3 class="text-xl font-bold text-on-surface">Jean-Pierre Lambert</h3>
<p class="text-sm text-on-surface-variant">ID: #88291 • 54 ans • Groupe A+</p>
</div>
<button class="text-primary text-sm font-semibold hover:underline">Changer de patient</button>
</div>
</div>
<!-- Prescription Builder -->
<div class="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/15">
<div class="flex items-center justify-between mb-8">
<h4 class="text-lg font-bold text-on-surface">Traitement &amp; Posologie</h4>
<button class="flex items-center gap-1 text-sm text-primary font-bold bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">add</span>
                            Ajouter un médicament
                        </button>
</div>
<div class="space-y-6">
<!-- Medication Row 1 -->
<div class="grid grid-cols-12 gap-4 items-start pb-6 border-b border-surface-variant/50">
<div class="col-span-5">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Médicament</label>
<input class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4" placeholder="Ex: Amoxicilline 500mg" type="text" value="Amoxicilline 500mg"/>
</div>
<div class="col-span-3">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Posologie</label>
<input class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4" placeholder="1 gélule" type="text" value="1 gélule"/>
</div>
<div class="col-span-3">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Fréquence</label>
<select class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4">
<option>3 fois par jour</option>
<option>Matin et soir</option>
<option>Le soir au coucher</option>
</select>
</div>
<div class="col-span-1 pt-8 flex justify-center">
<button class="text-error/60 hover:text-error transition-colors">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<!-- Medication Row 2 -->
<div class="grid grid-cols-12 gap-4 items-start pb-6">
<div class="col-span-5">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Médicament</label>
<input class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4" placeholder="Ex: Doliprane 1000mg" type="text" value="Doliprane 1000mg"/>
</div>
<div class="col-span-3">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Posologie</label>
<input class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4" placeholder="1 comprimé" type="text" value="1 comprimé"/>
</div>
<div class="col-span-3">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-2">Fréquence</label>
<select class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4">
<option>Si douleur (max 4/j)</option>
<option>Matin et soir</option>
<option>Le soir au coucher</option>
</select>
</div>
<div class="col-span-1 pt-8 flex justify-center">
<button class="text-error/60 hover:text-error transition-colors">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- Notes Section -->
<div class="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/15">
<label class="text-[0.65rem] font-bold uppercase tracking-widest text-outline block mb-3">Notes &amp; Recommandations additionnelles</label>
<textarea class="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium py-3 px-4 resize-none" placeholder="Préciser la durée du traitement ou conseils d'hygiène de vie..." rows="4">Traitement pour une durée de 7 jours. À renouveler si les symptômes persistent au-delà de la semaine. Repos conseillé.</textarea>
</div>
</section>
<!-- Side Panels -->
<aside class="col-span-4 space-y-6">
<!-- Status Badge -->
<div class="bg-primary/5 border border-primary/20 rounded-xl p-6">
<div class="flex items-center justify-between mb-4">
<span class="text-sm font-bold text-primary">Statut Consultation</span>
<span class="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[0.65rem] font-black uppercase tracking-tighter">En cours</span>
</div>
<p class="text-sm text-on-surface-variant leading-relaxed">Cette ordonnance sera automatiquement synchronisée avec le dossier médical numérique du patient dès sa validation.</p>
</div>
<!-- Previous Prescriptions (Asymmetric List) -->
<div class="bg-surface-container rounded-xl p-6">
<h4 class="text-md font-bold text-on-surface mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">history</span>
                        Historique Récent
                    </h4>
<div class="space-y-4">
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-start justify-between group cursor-pointer hover:bg-primary-fixed transition-colors">
<div>
<p class="text-xs font-bold text-outline uppercase tracking-widest mb-1">12 Oct. 2023</p>
<h5 class="text-sm font-bold text-on-surface">Angine virale</h5>
<p class="text-xs text-on-surface-variant mt-1">3 médicaments • Dr. Martin</p>
</div>
<span class="material-symbols-outlined text-outline group-hover:text-primary">visibility</span>
</div>
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-start justify-between group cursor-pointer hover:bg-primary-fixed transition-colors">
<div>
<p class="text-xs font-bold text-outline uppercase tracking-widest mb-1">05 Jan. 2023</p>
<h5 class="text-sm font-bold text-on-surface">Contrôle Annuel</h5>
<p class="text-xs text-on-surface-variant mt-1">1 médicament • Dr. Martin</p>
</div>
<span class="material-symbols-outlined text-outline group-hover:text-primary">visibility</span>
</div>
</div>
<button class="w-full mt-6 text-sm font-bold text-primary hover:text-primary-container transition-colors">Voir tout l'historique</button>
</div>
<!-- Doctor Info / Signature Placeholder -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/15 text-center">
<div class="w-20 h-20 mx-auto bg-surface-container rounded-full mb-4 flex items-center justify-center">
<span class="material-symbols-outlined text-3xl text-outline-variant">signature</span>
</div>
<h5 class="font-bold text-on-surface">Dr. Sarah Martin</h5>
<p class="text-xs text-outline uppercase font-medium tracking-widest">Généraliste - RPPS: 10100928374</p>
</div>
</aside>
</div>
</main>
<!-- Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
<div class="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 w-80 mb-4 overflow-hidden hidden md:block">
<div class="signature-gradient p-4 flex items-center justify-between text-white">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
<span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
</div>
<div>
<p class="text-sm font-bold leading-none">MediAssistant</p>
<p class="text-[0.65rem] text-white/80">IA de support médical</p>
</div>
</div>
<button class="material-symbols-outlined text-lg">close</button>
</div>
<div class="p-4 h-64 overflow-y-auto space-y-4 bg-slate-50/50">
<div class="flex gap-2 items-end max-w-[85%]">
<div class="bg-surface-container-high p-3 rounded-2xl rounded-bl-none text-xs text-on-surface">
                        Bonjour Dr. Martin. Souhaitez-vous vérifier les interactions médicamenteuses pour ce patient ?
                    </div>
</div>
<div class="flex gap-2 items-end max-w-[85%] ml-auto flex-row-reverse">
<div class="signature-gradient p-3 rounded-2xl rounded-br-none text-xs text-white">
                        Oui, merci de vérifier Amoxicilline et l'historique d'allergies.
                    </div>
</div>
</div>
<div class="p-3 border-t border-outline-variant/10 flex gap-2 items-center">
<input class="flex-1 text-xs border-none bg-surface-container-low rounded-lg focus:ring-0" placeholder="Écrire un message..." type="text"/>
<button class="material-symbols-outlined text-primary text-xl">send</button>
</div>
</div>
<button class="w-14 h-14 rounded-full signature-gradient shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">chat</span>
</button>
</div>
</body></html>
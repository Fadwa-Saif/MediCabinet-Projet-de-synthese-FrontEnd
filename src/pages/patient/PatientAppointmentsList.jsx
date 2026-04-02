<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Mes Rendez-vous</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Manrope:wght@500;700;800&amp;display=swap" rel="stylesheet"/>
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
      .signature-gradient {
        background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
      }
      .glass-nav {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
      }
    </style>
</head>
<body class="bg-background font-body text-on-surface antialiased">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 flex justify-between items-center px-6 h-16 w-full">
<div class="flex items-center gap-8">
<span class="text-lg font-black tracking-tight text-blue-700 dark:text-blue-400 font-headline">MediCabinet</span>
<div class="hidden md:flex items-center gap-6">
<a class="text-blue-700 border-b-2 border-blue-700 pb-1 font-medium font-headline" href="#">Mes Rendez-vous</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-opacity font-medium font-headline" href="#">Profil</a>
</div>
</div>
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/15">
<span class="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface-variant" placeholder="Rechercher..." type="text"/>
</div>
<div class="flex items-center gap-3">
<img alt="Avatar Patient" class="w-8 h-8 rounded-full object-cover" data-alt="Close up portrait of a young professional man with a kind expression, soft natural lighting, high-end studio aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlMLlKJmBzfEepEXg3Q1zDsJ1D9SRdx8Es8Eilc1VjYo5mCkNUsbyCq5_n3TAcBgnpFoNTTqMolS-Q-TIOpDOGMeNMqS9gy3ba6kLrBYAjCmGWvhaaZfe7C42jv4ZOG60AnaORpz3nNYGALJk_MNeKLOnzAa5b3zFeSQZ8jW7fzM9rzZqx1Cn1O6_nlpCyZ1k5IhRaF5HLfTCtP0FKPS4Z5YiK5RKdLwnIybMAm9QgSp3ht7mEfK_0U3HupL8DD5K88EMVV_8rsKGu"/>
<button class="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium text-sm transition-opacity active:scale-98">Déconnexion</button>
</div>
</div>
</nav>
<main class="pt-24 pb-12 px-6 max-w-7xl mx-auto">
<!-- Header Section -->
<header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h1 class="text-4xl font-extrabold font-headline tracking-tight text-on-background mb-2">Mes Rendez-vous</h1>
<p class="text-on-surface-variant text-lg">Gérez vos consultations passées et à venir en toute simplicité.</p>
</div>
<button class="signature-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95">
<span class="material-symbols-outlined">add_circle</span>
                Prendre rendez-vous
            </button>
</header>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Prochain RDV Highlight (Asymmetric element) -->
<div class="lg:col-span-4 space-y-6">
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15">
<div class="flex items-center justify-between mb-6">
<span class="text-label-md font-bold text-primary uppercase tracking-widest text-[11px]">Prochain passage</span>
<span class="material-symbols-outlined text-primary">event_upcoming</span>
</div>
<div class="flex items-center gap-4 mb-6">
<img alt="Dr. Claire Vallet" class="w-16 h-16 rounded-lg object-cover" data-alt="Professional female doctor in clinical setting, warm smiling expression, blurred medical background with soft bokeh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvAvBzXeUMhesPiSxr3NcEcxuxQVgjvr5vEI4pSOKqDQDl0IzcC8JBGPvMsCNj7dCwbEyuVzRPdpKVT-g6Y3dEaYftMzVWlejkiLgkagto03J76GSVbe76kT0HL5i4nzhGc0GZzh6IsbakctAlT2k3hjAPGCIieeL2WHJ2E78NlWvkXHEAnptFrz_znyQPaQcAwekU5ifvwcmF8r3iyzIP5ejAP0YbZV-lN2nGepJINtpRniVLi7zFnzvKioBMKTTEzD9HfWTuKVqx"/>
<div>
<h3 class="font-bold text-lg text-on-surface">Dr. Claire Vallet</h3>
<p class="text-sm text-on-surface-variant font-medium">Cardiologue</p>
</div>
</div>
<div class="space-y-3 bg-surface-container-low p-4 rounded-lg mb-6">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">calendar_today</span>
<span class="text-on-surface font-medium">Mardi 24 Octobre</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">schedule</span>
<span class="text-on-surface font-medium">14:30 — 15:15</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">location_on</span>
<span class="text-on-surface font-medium">Cabinet Central, Étage 2</span>
</div>
</div>
<button class="w-full py-3 text-primary font-bold border-2 border-primary/10 rounded-xl hover:bg-primary/5 transition-colors">
                        Modifier ou annuler
                    </button>
</div>
<div class="bg-primary p-6 rounded-xl text-white relative overflow-hidden">
<div class="relative z-10">
<h4 class="font-bold text-xl mb-2 font-headline">Téléconsultation ?</h4>
<p class="text-white/80 text-sm mb-4 leading-relaxed">Gagnez du temps en optant pour un rendez-vous vidéo depuis chez vous.</p>
<button class="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm">En savoir plus</button>
</div>
<span class="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12">videocam</span>
</div>
</div>
<!-- Detailed Appointments List -->
<div class="lg:col-span-8">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,26,65,0.05)] border border-outline-variant/15 overflow-hidden">
<div class="px-6 py-5 border-b border-surface-variant/30 flex items-center justify-between">
<h2 class="font-bold text-xl font-headline text-on-surface">Historique et Calendrier</h2>
<div class="flex gap-2">
<button class="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">filter_list</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low/50">
<th class="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70 font-label">Date</th>
<th class="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70 font-label">Docteur</th>
<th class="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70 font-label">Motif</th>
<th class="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70 font-label">Statut</th>
<th class="px-6 py-4"></th>
</tr>
</thead>
<tbody class="divide-y divide-surface-variant/20">
<!-- Future RDV -->
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5">
<div class="font-bold text-on-surface">24 Oct. 2023</div>
<div class="text-xs text-on-surface-variant">14:30</div>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">CV</div>
<span class="font-medium text-on-surface">Dr. Claire Vallet</span>
</div>
</td>
<td class="px-6 py-5 text-on-surface-variant font-medium">Contrôle annuel</td>
<td class="px-6 py-5">
<span class="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-wider">Confirmé</span>
</td>
<td class="px-6 py-5 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Pending RDV -->
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5">
<div class="font-bold text-on-surface">12 Nov. 2023</div>
<div class="text-xs text-on-surface-variant">09:15</div>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-xs">LM</div>
<span class="font-medium text-on-surface">Dr. Luc Morel</span>
</div>
</td>
<td class="px-6 py-5 text-on-surface-variant font-medium">Dermatologie</td>
<td class="px-6 py-5">
<span class="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-wider">En attente</span>
</td>
<td class="px-6 py-5 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Past RDV -->
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5 opacity-60">
<div class="font-bold text-on-surface">15 Sept. 2023</div>
<div class="text-xs text-on-surface-variant">16:45</div>
</td>
<td class="px-6 py-5 opacity-60">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-xs">JS</div>
<span class="font-medium text-on-surface">Dr. Jean Simon</span>
</div>
</td>
<td class="px-6 py-5 text-on-surface-variant font-medium opacity-60">Vaccination</td>
<td class="px-6 py-5">
<span class="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Terminé</span>
</td>
<td class="px-6 py-5 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">description</span>
</button>
</td>
</tr>
<!-- Cancelled RDV -->
<tr class="hover:bg-surface-container-low/30 transition-colors">
<td class="px-6 py-5 opacity-60">
<div class="font-bold text-on-surface">02 Août 2023</div>
<div class="text-xs text-on-surface-variant">11:00</div>
</td>
<td class="px-6 py-5 opacity-60">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error font-bold text-xs">CV</div>
<span class="font-medium text-on-surface">Dr. Claire Vallet</span>
</div>
</td>
<td class="px-6 py-5 text-on-surface-variant font-medium opacity-60">Suivi tension</td>
<td class="px-6 py-5">
<span class="px-3 py-1 rounded-full bg-error-container text-on-error-container text-[10px] font-bold uppercase tracking-wider">Annulé</span>
</td>
<td class="px-6 py-5 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">refresh</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-6 bg-surface-container-low/30 flex justify-center">
<button class="text-primary font-bold text-sm hover:underline">Afficher plus de rendez-vous</button>
</div>
</div>
</div>
</div>
</main>
<!-- Chatbot Widget -->
<div class="fixed bottom-6 right-6 z-50 group">
<!-- Chat Bubble -->
<div class="absolute bottom-16 right-0 w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/15 overflow-hidden invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
<div class="signature-gradient p-4 text-white">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
<span class="material-symbols-outlined">smart_toy</span>
</div>
<div>
<h5 class="font-bold text-sm">Assistant MediCabinet</h5>
<p class="text-[10px] text-white/80">En ligne pour vous aider</p>
</div>
</div>
</div>
<div class="p-4 h-64 overflow-y-auto space-y-3 bg-surface">
<div class="bg-surface-container-high rounded-xl p-3 text-sm text-on-surface-variant max-w-[85%]">
                    Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur vos rendez-vous.
                </div>
<div class="bg-primary/10 rounded-xl p-3 text-sm text-primary ml-auto max-w-[85%]">
                    Quels sont mes rendez-vous cette semaine ?
                </div>
</div>
<div class="p-3 border-t border-surface-variant/30 bg-white flex items-center gap-2">
<input class="flex-1 bg-surface-container-low border-none rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-primary" placeholder="Posez votre question..." type="text"/>
<button class="text-primary p-1">
<span class="material-symbols-outlined">send</span>
</button>
</div>
</div>
<!-- Trigger Button -->
<button class="signature-gradient w-14 h-14 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white transition-transform active:scale-90 hover:scale-110">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
</button>
</div>
</body></html>
<!DOCTYPE html>

<html lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MediCabinet - Tableau de Bord Patient</title>
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
      .glass-effect {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
    </style>
</head>
<body class="bg-background font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
<!-- TopNavBar (Shared Component Execution) -->
<nav class="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 flex justify-between items-center px-6 h-16">
<div class="flex items-center gap-8">
<span class="text-lg font-black tracking-tight text-blue-700 dark:text-blue-400 font-headline">MediCabinet</span>
<div class="hidden md:flex gap-6 items-center">
<a class="text-blue-700 border-b-2 border-blue-700 pb-1 font-medium font-['Manrope']" href="#">Mon Tableau de Bord</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-opacity font-medium font-['Manrope']" href="#">Mes Rendez-vous</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-opacity font-medium font-['Manrope']" href="#">Profil</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="text-slate-600 hover:opacity-80 transition-opacity font-medium font-['Manrope']">Déconnexion</button>
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
<img alt="Avatar Patient" class="w-full h-full object-cover" data-alt="professional headshot of a friendly smiling middle-aged woman in a bright office environment, natural lighting, high quality" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2dJW2TG7Anox5uiz8QkaVM3o0zM7A988Z-ozF7fWBHBtWD_sSagA1o6gII3_R6Qp7dJx711ZYtTu2Vt8HYwn5uG5yWlEgm9CSWmzqnsYkmNlw81Lo7DP_mB_sXB2pR1EtK58ILFwLD2TOlRh-dYFu8iH2cbuQ2YgwsIFRK8BA_KTiPsWBegbzbIbkZkZ8w1szPmZLwfGuoBEzyCaFawQgz6ODy9D8F69QoUx5gm08dD7KG9zXiR3DWjYDRhBs3z03Qx41_BeSSOKf"/>
</div>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
<!-- Header Section -->
<header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<p class="text-primary font-label text-sm uppercase tracking-widest font-bold mb-2">Bienvenue, Mme. Dupont</p>
<h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-background">Mon Tableau de Bord</h1>
</div>
<button class="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-3">
<span class="material-symbols-outlined">add_circle</span>
                Prendre un nouveau rendez-vous
            </button>
</header>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-8">
<!-- Column 1: Next Appointments (High Focus) -->
<section class="md:col-span-8 space-y-6">
<div class="flex items-center justify-between">
<h2 class="text-xl font-headline font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">event_upcoming</span>
                        Prochains Rendez-vous
                    </h2>
<span class="text-sm font-label text-outline uppercase tracking-wider">2 Confirmés</span>
</div>
<div class="grid gap-4">
<!-- Appointment Card 1 -->
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm group hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-primary/10">
<div class="flex flex-col sm:flex-row justify-between gap-4">
<div class="flex gap-4">
<div class="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">medical_services</span>
</div>
<div>
<h3 class="font-headline font-bold text-lg">Dr. Claire Lefebvre</h3>
<p class="text-on-surface-variant text-sm">Cardiologue • Cabinet Central</p>
<div class="flex items-center gap-3 mt-2">
<div class="flex items-center gap-1 text-sm font-medium text-on-surface">
<span class="material-symbols-outlined text-sm">calendar_today</span>
                                            Mardi 24 Octobre
                                        </div>
<div class="flex items-center gap-1 text-sm font-medium text-on-surface">
<span class="material-symbols-outlined text-sm">schedule</span>
                                            14:30
                                        </div>
</div>
</div>
</div>
<div class="flex flex-row sm:flex-col justify-between items-end gap-2">
<span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-label font-bold uppercase tracking-wider">Confirmé</span>
<button class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                                    Détails <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Appointment Card 2 -->
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm group hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-primary/10">
<div class="flex flex-col sm:flex-row justify-between gap-4">
<div class="flex gap-4">
<div class="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">psychiatry</span>
</div>
<div>
<h3 class="font-headline font-bold text-lg">Dr. Marc Antoine</h3>
<p class="text-on-surface-variant text-sm">Dermatologue • Clinique des Lilas</p>
<div class="flex items-center gap-3 mt-2">
<div class="flex items-center gap-1 text-sm font-medium text-on-surface">
<span class="material-symbols-outlined text-sm">calendar_today</span>
                                            Vendredi 27 Octobre
                                        </div>
<div class="flex items-center gap-1 text-sm font-medium text-on-surface">
<span class="material-symbols-outlined text-sm">schedule</span>
                                            09:15
                                        </div>
</div>
</div>
</div>
<div class="flex flex-row sm:flex-col justify-between items-end gap-2">
<span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-label font-bold uppercase tracking-wider">Confirmé</span>
<button class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                                    Détails <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Column 2: Health Snapshot & Quick Stats -->
<aside class="md:col-span-4 space-y-8">
<div class="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
<div class="relative z-10">
<h3 class="font-headline font-bold text-lg mb-4">Votre Santé en un coup d'œil</h3>
<div class="space-y-4">
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4">
<span class="material-symbols-outlined text-tertiary">monitor_heart</span>
<div>
<p class="text-xs font-label text-outline uppercase tracking-tight">Dernier Check-up</p>
<p class="font-bold">Il y a 3 mois</p>
</div>
</div>
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4">
<span class="material-symbols-outlined text-surface-tint">medication</span>
<div>
<p class="text-xs font-label text-outline uppercase tracking-tight">Traitements Actifs</p>
<p class="font-bold">2 ordonnances</p>
</div>
</div>
</div>
</div>
<div class="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
</div>
<div class="bg-white rounded-xl border border-outline-variant/15 p-6 shadow-sm">
<h3 class="font-headline font-bold text-lg mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">notifications</span>
                        Rappels
                    </h3>
<div class="space-y-4">
<div class="flex gap-3 items-start border-l-4 border-tertiary pl-4">
<div>
<p class="text-sm font-semibold">Vaccin Grippe</p>
<p class="text-xs text-on-surface-variant">Recommandé pour la saison hivernale</p>
</div>
</div>
<div class="flex gap-3 items-start border-l-4 border-primary pl-4">
<div>
<p class="text-sm font-semibold">Renouvellement Ordonnance</p>
<p class="text-xs text-on-surface-variant">Expire dans 12 jours</p>
</div>
</div>
</div>
</div>
</aside>
<!-- Bottom Row: Past Appointments (Full Width) -->
<section class="md:col-span-12 mt-4">
<div class="flex items-center justify-between mb-6">
<h2 class="text-xl font-headline font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-outline">history</span>
                        Historique des Consultations
                    </h2>
<button class="text-primary font-medium text-sm hover:underline">Voir tout l'historique</button>
</div>
<div class="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/15">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container">
<th class="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">Date</th>
<th class="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">Praticien</th>
<th class="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">Motif</th>
<th class="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline">Résumé du Rapport</th>
<th class="px-6 py-4 text-xs font-label uppercase tracking-widest text-outline text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container-high">
<tr class="hover:bg-white transition-colors">
<td class="px-6 py-5 font-medium whitespace-nowrap">12 Sept 2023</td>
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
<img alt="Doctor" class="w-full h-full object-cover" data-alt="close up headshot of a professional male doctor in white lab coat with stethoscope, soft focus hospital background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezCeJXD7rvAdLfySZuBN6kqrX2WGfBXaNXB2EShFtX5EJjc-eOVX9pXVY7F-XukQPv9WNjLmyWgOUln-XSSp55iQ4nGXUHLoy0hHYvX_LG-OTJpDMuIEHXWBaTtwxoZu7e7PEDZACTz_wkiIg2JwxH-srMSqgR2vh6Y47wAC9q4Vm-fRf7_HKLDPjsIsG09y0JxHJ51rNYQQFTdc5rxk20gR-J0rM7Rhf694WX5ZknwCBvyhuP4j_Pqx1yBvW9C9y7B5wALED1sBz"/>
</div>
<span class="text-sm font-semibold">Dr. Julien Bernard</span>
</div>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">Consultation de suivi</td>
<td class="px-6 py-5 text-sm text-on-surface-variant italic">"Paramètres stables. Poursuite du traitement actuel..."</td>
<td class="px-6 py-5 text-right">
<button class="text-primary hover:text-primary-container">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr class="hover:bg-white transition-colors">
<td class="px-6 py-5 font-medium whitespace-nowrap">05 Août 2023</td>
<td class="px-6 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
<img alt="Doctor" class="w-full h-full object-cover" data-alt="close up headshot of a confident female physician in clinical setting, warm lighting, professional medical look" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQC0n3LFP6WxwiNqq-Ddzrmexg15gh483RaVvG3unT10nKir-72QTqM9zBpCZY74CrarU7AInkIeY5Rha-ARHBfA9GJb_IaOYHBRIfmqPaxVFjDh0u4jVS0ryX7ylkBGSK7O4zLEZbgV_EVwWN2GPXV0r7qKblCS0tZASxToZT40S4u0E_iWOPhaeKLPETdzCswFd8OMaS41WrMxY-CP4d7Sk0_BfbNTjEvzCYGt_QwN_k5WZaVDMmsr4a4oubteh3bDHEyGpX-Y48"/>
</div>
<span class="text-sm font-semibold">Dr. Sophie Durand</span>
</div>
</td>
<td class="px-6 py-5 text-sm text-on-surface-variant">Examen annuel</td>
<td class="px-6 py-5 text-sm text-on-surface-variant italic">"Excellente forme générale. Résultats sanguins corrects."</td>
<td class="px-6 py-5 text-right">
<button class="text-primary hover:text-primary-container">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
<!-- Floating Chat Tooltip -->
<div class="bg-white p-4 rounded-xl shadow-2xl border border-outline-variant/10 max-w-[280px] mb-2 hidden md:block">
<p class="text-sm text-on-surface font-medium leading-snug">Besoin d'aide ? Je suis là pour répondre à vos questions sur vos rendez-vous.</p>
</div>
<!-- Chat Toggle Button -->
<button class="w-16 h-16 signature-gradient text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform group">
<span class="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">smart_toy</span>
</button>
</div>

```</body></html>
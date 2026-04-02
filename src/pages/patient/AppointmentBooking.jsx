<!DOCTYPE html>

<html class="light" lang="fr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Prendre un Rendez-vous | MediCabinet</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Manrope:wght@500;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
        }
        .signature-gradient {
            background: linear-gradient(135deg, #0059bb 0%, #0070ea 100%);
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
        }
    </style>
</head>
<body class="bg-background text-on-background font-body antialiased min-h-screen">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 flex justify-between items-center px-6 h-16 w-full">
<div class="flex items-center gap-8">
<span class="text-lg font-black tracking-tight text-blue-700 dark:text-blue-400 font-headline">MediCabinet</span>
<nav class="hidden md:flex gap-6 items-center">
<a class="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium font-headline transition-opacity" href="#">Mes Rendez-vous</a>
<a class="text-blue-700 border-b-2 border-blue-700 pb-1 font-medium font-headline" href="#">Réserver</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium font-headline transition-opacity" href="#">Profil</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative group">
<img alt="Avatar Patient" class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-primary-container" data-alt="professional portrait of a middle-aged woman with a friendly smile, clean minimalist background, soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWRA1ziUjop_Upp3JzJdTmg8OG2eie-Lanq6TuCb6sakKP-E6BAtiZKzxTWtvjw1KyvV_43o-6Fpuj5Jubk4rxA2m7cUjWRu5LFlo1DSFlI3DAlDaVlPHQGrDS89Gz_gBn27weyGPzJDktBr_Sh8i2OEYk5qXUP1NdkidovehFo3vh4D7fjl1aIJQD66xg0rciFxnNZ1psklwX4YE-6usU0X0y1t8Coh_0YgAylskCDEbCAGFhNR8TKd5DMagKFTVRtDy1uBp5iL4c"/>
</div>
<button class="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium active:scale-98 transition-transform">Déconnexion</button>
</div>
</header>
<main class="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
<!-- Layout Title -->
<div class="mb-12">
<h1 class="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">Réserver un Rendez-vous</h1>
<p class="text-on-surface-variant text-lg">Sélectionnez vos disponibilités pour votre prochaine consultation clinique.</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- Left Side: Selection Grid -->
<div class="lg:col-span-8 space-y-8">
<!-- Date & Time Section -->
<div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary" data-icon="calendar_month">calendar_month</span>
<h2 class="text-xl font-bold font-headline">Choix de la date</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Date Picker Mockup -->
<div class="space-y-4">
<label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label">Calendrier</label>
<div class="bg-surface-container rounded-lg p-4 border border-outline-variant/15">
<div class="flex justify-between items-center mb-4">
<span class="font-bold">Octobre 2023</span>
<div class="flex gap-2">
<button class="p-1 hover:bg-surface-container-high rounded"><span class="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span></button>
<button class="p-1 hover:bg-surface-container-high rounded"><span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span></button>
</div>
</div>
<div class="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-on-surface-variant font-medium">
<div>LU</div><div>MA</div><div>ME</div><div>JE</div><div>VE</div><div>SA</div><div>DI</div>
</div>
<div class="grid grid-cols-7 gap-1">
<!-- Simplified Calendar Mock -->
<div class="h-8 flex items-center justify-center text-slate-300">28</div>
<div class="h-8 flex items-center justify-center text-slate-300">29</div>
<div class="h-8 flex items-center justify-center text-slate-300">30</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">1</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">2</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">3</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">4</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">5</div>
<div class="h-8 flex items-center justify-center bg-primary text-white font-bold rounded-lg cursor-pointer">6</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">7</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">8</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">9</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">10</div>
<div class="h-8 flex items-center justify-center hover:bg-surface-container-high rounded cursor-pointer">11</div>
</div>
</div>
</div>
<!-- Time Select -->
<div class="space-y-4">
<label class="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-label">Créneaux disponibles</label>
<div class="grid grid-cols-2 gap-3">
<button class="py-3 px-4 rounded-lg bg-surface-container-high text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm border border-transparent">09:00</button>
<button class="py-3 px-4 rounded-lg bg-surface-container-high text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm border border-transparent">10:30</button>
<button class="py-3 px-4 rounded-lg bg-primary-container text-white font-bold shadow-md text-sm border-2 border-primary">14:00</button>
<button class="py-3 px-4 rounded-lg bg-surface-container-high text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm border border-transparent">15:30</button>
<button class="py-3 px-4 rounded-lg bg-surface-container-high text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm border border-transparent">17:00</button>
<button class="py-3 px-4 rounded-lg bg-surface-container-high text-primary font-semibold hover:bg-primary hover:text-white transition-all text-sm border border-transparent">18:30</button>
</div>
</div>
</div>
</div>
<!-- Form Motif Section -->
<div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)]">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary" data-icon="description">description</span>
<h2 class="text-xl font-bold font-headline">Détails de la consultation</h2>
</div>
<div class="space-y-6">
<div class="group">
<label class="block text-sm font-bold text-on-surface-variant mb-2 font-label">Motif de consultation</label>
<textarea class="w-full bg-surface-container-lowest border-outline-variant/30 rounded-lg p-4 text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none" placeholder="Décrivez brièvement vos symptômes ou l'objet de votre visite..." rows="4"></textarea>
</div>
<div class="flex items-start gap-3 p-4 bg-surface-container-low rounded-lg">
<span class="material-symbols-outlined text-tertiary" data-icon="info">info</span>
<p class="text-sm text-on-surface-variant leading-relaxed">
                                Vos données de santé sont chiffrées et sécurisées conformément aux normes de protection des données médicales.
                            </p>
</div>
</div>
</div>
</div>
<!-- Right Side: Summary Sticky Card -->
<aside class="lg:col-span-4 sticky top-24">
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-[0_20px_40px_rgba(0,26,65,0.05)] overflow-hidden">
<div class="signature-gradient p-6 text-white">
<h3 class="text-xl font-bold font-headline mb-1">Résumé</h3>
<p class="text-white/80 text-sm">Consultation générale</p>
</div>
<div class="p-6 space-y-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
<img alt="Médecin" class="w-full h-full object-cover" data-alt="close-up portrait of a male doctor in his 40s wearing a white lab coat and stethoscope, friendly professional expression, neutral clinic background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJULy8NZcl6eGT9UTXUZr4KEET4EZi-W6tHWkR7JnLKthIlR5MOYZc6SRX4IMouMsPqBr4fN_N5sVbWresoZq6_ru43d5DyyZpDhGS-QuAwnEBiSnMV0uF4m68cFgfMlVwcUXrYSydEx4YD7wMD_qq5L_YvcH55T8IY_c07pKkHBfe0j6hH89P9Dlvwpk5RUi82NVYJ6XP_-Ig7uJwAp5OFQY_6n9buzczKybCo6jo3bgBAPOvp5Aral-N-RgG8JcUdpuMRXLFPZrl"/>
</div>
<div>
<p class="text-xs font-bold uppercase tracking-tighter text-on-surface-variant">Praticien</p>
<p class="font-bold text-on-surface">Dr. Jean Dupont</p>
<p class="text-xs text-on-surface-variant">Médecine Générale</p>
</div>
</div>
<div class="space-y-4 pt-4 border-t border-surface-container-high">
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-sm">Date</span>
<span class="font-bold text-on-surface text-sm">Vendre 6 Oct. 2023</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-sm">Heure</span>
<span class="font-bold text-on-surface text-sm">14:00</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant text-sm">Lieu</span>
<span class="font-bold text-on-surface text-sm">Clinique Centrale</span>
</div>
</div>
<button class="w-full signature-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all font-headline">
                            Confirmer le rendez-vous
                        </button>
<p class="text-center text-xs text-on-surface-variant px-4">
                            En confirmant, vous acceptez nos <a class="text-primary underline" href="#">conditions d'utilisation</a>.
                        </p>
</div>
</div>
<div class="mt-6 p-6 rounded-xl bg-surface-container-high/50 border border-outline-variant/10 text-center">
<p class="text-sm font-bold text-on-surface mb-1">Besoin d'aide ?</p>
<p class="text-xs text-on-surface-variant">Notre assistant virtuel est disponible pour vous guider 24h/24.</p>
</div>
</aside>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
<!-- Chat Bubble -->
<div class="bg-white p-4 rounded-2xl shadow-2xl border border-outline-variant/20 max-w-xs mb-2 animate-bounce-subtle">
<p class="text-sm text-on-surface">Bonjour ! Je suis **MediBot**. Comment puis-je vous aider aujourd'hui ?</p>
</div>
<!-- FAB -->
<button class="w-16 h-16 rounded-full signature-gradient text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 group">
<span class="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform" data-icon="chat_bubble">chat_bubble</span>
<span class="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-white"></span>
</button>
</div>
<!-- Status Decoration Background -->
<div class="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
<div class="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]"></div>
<div class="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px]"></div>
</div>
</body></html>
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

export function ConsultationReportNew() {
  const { rdvId } = useParams();
  const navigate = useNavigate();
  
  // TODO: fetch from API — GET /api/consultation/{rdvId}
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
    prescription: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /api/consultation to create report
    console.log("Rapport créé:", formData);
    navigate("/medecin/dashboard");
  };

  return (
    <Navbar userRole="medecin" pageTitle="Nouveau Rapport de Consultation">
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Diagnostic */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Diagnostic
            </label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
              rows="4"
              placeholder="Entrez le diagnostic du patient"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Treatment */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Traitement Recommandé
            </label>
            <textarea
              value={formData.treatment}
              onChange={(e) =>
                setFormData({ ...formData, treatment: e.target.value })
              }
              rows="4"
              placeholder="Décrivez le traitement recommandé"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Notes Additionnelles
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows="3"
              placeholder="Notes supplémentaires..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Prescription */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Ordonnance
            </label>
            <textarea
              value={formData.prescription}
              onChange={(e) =>
                setFormData({ ...formData, prescription: e.target.value })
              }
              rows="3"
              placeholder="Ordonnance médicale..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              ✓ Enregistrer le Rapport
            </button>
            <button
              type="button"
              onClick={() => navigate("/medecin/dashboard")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
}

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
<!-- Sidebar Navigation -->
<aside class="fixed left-0 top-0 h-full flex flex-col h-screen w-64 border-r border-slate-200 bg-slate-50 font-['Manrope'] antialiased">
<div class="px-6 py-8">
<div class="flex items-center gap-3 mb-10">
<div class="w-10 h-10 rounded-xl signature-gradient flex items-center justify-center text-white">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
</div>
<div>
<h1 class="text-xl font-bold text-blue-800 leading-tight">MediCabinet</h1>
<p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Gestion Médicale</p>
</div>
</div>
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors duration-150 group" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium">Tableau de bord</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors duration-150 group" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="font-medium">Rendez-vous</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors duration-150 group" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-medium">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-700 font-bold border-r-4 border-blue-700 bg-blue-50 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
<span class="font-bold">Consultations</span>
</a>
</nav>
</div>
<div class="mt-auto px-6 py-8 border-t border-slate-200">
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium">Paramètres</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors duration-150" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-medium">Déconnexion</span>
</a>
</nav>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 min-h-screen p-8">
<!-- Header / Breadcrumbs -->
<header class="mb-8 flex justify-between items-end">
<div>
<h2 class="text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-2">Nouvelle Consultation</h2>
<div class="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
<span>Consultations</span>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-primary">Fiche Patient</span>
</div>
</div>
<div class="flex items-center gap-4">
<span class="text-sm font-medium text-on-surface-variant">ID: #REF-8829-2024</span>
<div class="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant">notifications</span>
</div>
</div>
</header>
<div class="grid grid-cols-12 gap-8">
<!-- Patient Info Section (Bento Style) -->
<section class="col-span-12">
<div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 flex items-center justify-between shadow-sm">
<div class="flex items-center gap-8">
<img alt="Portrait patient" class="w-24 h-24 rounded-2xl object-cover ring-4 ring-surface-container-low" data-alt="Close-up professional studio portrait of a middle-aged woman with a calm expression, soft natural lighting, blurred medical office background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPV4nM6Tu7oWwYEsZKzh4EAmbye_ZJvUWvko_6DRbAJK9jnkQbKLPukWiNhdFuD7bhgUI_BZTVEukTRgVC3ehzUpbdARMnkmdt9oqPaV-Zg_OXn1U0Ih2lpvyEIDxw85-jvnxQuUE_BbltTcABGIm0bC3LLi1QHYedxCgWvGrbcIqNFYydmSfc8sfmuVMxXf2lc2O4VfPwQ-UXC0UYq_lRmB8FSQj18lLzFvEfVigvVteuET8udVwR0S8D3mUKSHm7E9zvwHJj7ORI"/>
<div class="space-y-1">
<h3 class="text-2xl font-bold font-headline text-on-surface">Marie-Louise Lefebvre</h3>
<div class="flex items-center gap-4">
<span class="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold font-label tracking-wide uppercase">45 ans</span>
<span class="flex items-center gap-1 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-sm">bloodtype</span> Groupe O+
                                </span>
<span class="flex items-center gap-1 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-sm">event</span> Dernière visite: 12 Mars 2024
                                </span>
</div>
</div>
</div>
<div class="flex gap-4 border-l border-outline-variant/30 pl-8">
<div class="text-center px-4">
<p class="text-[10px] font-bold font-label text-slate-400 uppercase tracking-widest mb-1">Tension</p>
<p class="text-xl font-bold text-on-surface">12/8</p>
</div>
<div class="text-center px-4 border-l border-outline-variant/30">
<p class="text-[10px] font-bold font-label text-slate-400 uppercase tracking-widest mb-1">Poids</p>
<p class="text-xl font-bold text-on-surface">64 kg</p>
</div>
<div class="text-center px-4 border-l border-outline-variant/30">
<p class="text-[10px] font-bold font-label text-slate-400 uppercase tracking-widest mb-1">Taille</p>
<p class="text-xl font-bold text-on-surface">168 cm</p>
</div>
</div>
</div>
</section>
<!-- Main Consultation Form -->
<div class="col-span-8 space-y-8">
<div class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
<form class="space-y-8">
<div class="space-y-2">
<label class="text-sm font-bold font-label text-on-surface-variant uppercase tracking-wider">Diagnostic</label>
<div class="relative">
<span class="absolute top-4 left-4 material-symbols-outlined text-primary">search_check</span>
<textarea class="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-0 transition-all duration-200 min-h-[120px] resize-none placeholder:text-slate-400 text-on-surface font-medium" placeholder="Entrez le diagnostic clinique..."></textarea>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-bold font-label text-on-surface-variant uppercase tracking-wider">Traitement &amp; Prescription</label>
<div class="relative">
<span class="absolute top-4 left-4 material-symbols-outlined text-primary">medication</span>
<textarea class="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-0 transition-all duration-200 min-h-[120px] resize-none placeholder:text-slate-400 text-on-surface font-medium" placeholder="Détaillez le traitement et les médicaments..."></textarea>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-bold font-label text-on-surface-variant uppercase tracking-wider">Notes Additionnelles</label>
<div class="relative">
<span class="absolute top-4 left-4 material-symbols-outlined text-primary">description</span>
<textarea class="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-0 transition-all duration-200 min-h-[100px] resize-none placeholder:text-slate-400 text-on-surface font-medium" placeholder="Observations particulières..."></textarea>
</div>
</div>
<div class="pt-4">
<button class="signature-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-150 shadow-lg shadow-primary/20" type="submit">
<span class="material-symbols-outlined">save</span>
                                Enregistrer la consultation
                            </button>
</div>
</form>
</div>
</div>
<!-- Side Cards / Contextual Data -->
<div class="col-span-4 space-y-8">
<!-- History Summary -->
<div class="bg-surface-container rounded-xl p-6 border border-outline-variant/15">
<div class="flex items-center justify-between mb-6">
<h4 class="font-bold font-headline text-on-surface">Historique Récent</h4>
<span class="material-symbols-outlined text-on-surface-variant">history</span>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
<p class="text-xs font-bold text-primary mb-1">15 JAN 2024</p>
<p class="text-sm font-bold text-on-surface">Infection Respiratoire</p>
<p class="text-xs text-on-surface-variant mt-1">Traitement par antibiotiques complété.</p>
</div>
<div class="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
<p class="text-xs font-bold text-primary mb-1">02 NOV 2023</p>
<p class="text-sm font-bold text-on-surface">Bilan Sanguin Annuel</p>
<p class="text-xs text-on-surface-variant mt-1">Résultats normaux, cholestérol à surveiller.</p>
</div>
<button class="w-full py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            Voir tout le dossier
                        </button>
</div>
</div>
<!-- Quick Actions / Tools -->
<div class="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/15 shadow-sm">
<h4 class="font-bold font-headline text-on-surface mb-6">Outils Rapides</h4>
<div class="grid grid-cols-2 gap-3">
<button class="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-primary">print</span>
<span class="text-[10px] font-bold uppercase font-label">Ordonnance</span>
</button>
<button class="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-primary">mail</span>
<span class="text-[10px] font-bold uppercase font-label">Envoyer</span>
</button>
<button class="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-primary">add_chart</span>
<span class="text-[10px] font-bold uppercase font-label">Analyses</span>
</button>
<button class="flex flex-col items-center justify-center p-4 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-primary">videocam</span>
<span class="text-[10px] font-bold uppercase font-label">Téléconsul.</span>
</button>
</div>
</div>
</div>
</div>
</main>
<!-- Global Chatbot Widget -->
<div class="fixed bottom-8 right-8 z-50">
<button class="w-16 h-16 rounded-full signature-gradient shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
<!-- Tooltip -->
<div class="absolute right-20 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
<p class="text-xs font-bold text-slate-800">Besoin d'assistance IA ?</p>
</div>
</button>
</div>
</body></html>
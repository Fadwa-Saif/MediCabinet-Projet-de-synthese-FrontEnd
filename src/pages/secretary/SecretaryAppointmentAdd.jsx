import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import { Calendar, User, Clock, ArrowLeft, Save, AlertCircle, CheckCircle2, Search } from "lucide-react";

export function SecretaryAppointmentAdd() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedPatientId = searchParams.get("patientId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Data for selection
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: preSelectedPatientId || "",
    admin_id: "",
    date: "",
    time: "",
    motif: "Consultation générale",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, adminsRes] = await Promise.all([
          api.get("/patients"),
          api.get("/admin/admins"),
        ]);
        setPatients(patientsRes.data.data || patientsRes.data || []);
        const medecins = (adminsRes.data || []).filter((admin) => admin.role === "medecin");

        if (medecins.length === 0) {
          setError("Aucun médecin n'est disponible pour créer un rendez-vous.");
          return;
        }

        const uniqueDoctor = medecins[0];
        setDoctor(uniqueDoctor);
        setFormData((prev) => ({ ...prev, admin_id: uniqueDoctor.id }));
      } catch (err) {
        console.error("Failed to fetch form data", err);
        setError("Impossible de charger les listes de patients ou le médecin du cabinet.");
      }
    };
    fetchData();
  }, []);

  // Fetch slots when doctor or date changes
  useEffect(() => {
    if (formData.admin_id && formData.date) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        try {
          const res = await api.get(`/rendezvous/creneaux?admin_id=${formData.admin_id}&date=${formData.date}`);
          const normalizedSlots = (res.data.creneaux || [])
            .map((slot, index) => {
              if (typeof slot === "string") {
                return {
                  id: `${slot}-${index}`,
                  heure: slot,
                  disponible: true,
                };
              }

              return {
                id: slot.id || `${slot.heure || "slot"}-${index}`,
                heure: slot.heure || "",
                disponible: slot.disponible ?? true,
              };
            })
            .filter((slot) => Boolean(slot.heure));

          setSlots(normalizedSlots);
        } catch (err) {
          console.error("Failed to fetch slots", err);
          setSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [formData.admin_id, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      setError("Veuillez sélectionner un créneau horaire.");
      return;
    }

    if (!formData.admin_id) {
      setError("Le médecin du cabinet n'a pas pu être déterminé.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        patient_id: formData.patient_id,
        admin_id: formData.admin_id,
        date_heure: `${formData.date} ${formData.time}`,
        motif: formData.motif,
        duree_minutes: 20, // Default duration
      };
      
      await api.post("/rendezvous/book", payload);
      setSuccess(true);
      setTimeout(() => navigate("/secretaire/rendezvous"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de la prise de rendez-vous.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar userRole="secretaire" pageTitle="Nouveau Rendez-vous">
      <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
            <div className="text-right">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nouveau Rendez-vous</h1>
              <p className="text-slate-500 text-sm">Planification d&apos;une nouvelle consultation</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-medium">
              <CheckCircle2 size={20} />
              Rendez-vous enregistré avec succès !
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                {/* Patient Selection */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="text-blue-600" size={20} />
                    <h2 className="text-lg font-bold text-slate-900">Patient</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sélectionner un patient</label>
                    <div className="relative">
                      <select
                        required
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        disabled={!!preSelectedPatientId}
                        className={`w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                          preSelectedPatientId ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                        }`}
                      >
                        <option value="">Choisir un patient...</option>
                        {patients.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.user?.prenom} {p.user?.nom} ({p.cin || "Pas de CIN"})
                          </option>
                        ))}
                      </select>
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Doctor Selection */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="text-indigo-600" size={20} />
                    <h2 className="text-lg font-bold text-slate-900">Médecin du cabinet & Date</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                      {doctor ? (
                        <>
                          Médecin attribué: <span className="font-bold">Dr. {doctor.user?.prenom} {doctor.user?.nom}</span>
                        </>
                      ) : (
                        "Chargement du médecin du cabinet..."
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date</label>
                      <input
                        required
                        type="date"
                        name="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Reason */}
                <section>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Motif de consultation</label>
                    <textarea
                      name="motif"
                      value={formData.motif}
                      onChange={handleChange}
                      placeholder="Ex: Douleurs abdominales, Suivi annuel..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar Slots Selection */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 min-h-[400px]">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="text-blue-600" size={20} />
                  <h2 className="text-lg font-bold text-slate-900">Créneau</h2>
                </div>

                {!formData.admin_id || !formData.date ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400 p-4">
                    <Calendar size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">Sélectionnez une date pour voir les disponibilités</p>
                  </div>
                ) : loadingSlots ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : slots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500 p-4 bg-slate-50 rounded-2xl">
                    <AlertCircle size={32} className="mb-2 text-slate-400" />
                    <p className="text-sm font-bold">Aucune disponibilité</p>
                    <p className="text-xs">Le médecin du cabinet n'a peut-être pas défini de planning pour ce jour.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        disabled={!s.disponible}
                        onClick={() => setFormData(prev => ({ ...prev, time: s.heure }))}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                          formData.time === s.heure
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105"
                            : !s.disponible
                              ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through"
                              : "bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600"
                        }`}
                      >
                        {s.heure}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !formData.time}
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all disabled:opacity-50 active:scale-95"
              >
                {loading ? "Chargement..." : <><Save size={20} /> Confirmer le rendez-vous</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Navbar>
  );
}

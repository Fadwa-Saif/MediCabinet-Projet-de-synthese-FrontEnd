import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../components/Navbar";

// ─── Constants ──────────────────────────────────────────────────────────────

const API_BASE_URL = "http://localhost:8080/api"; // TODO: update with your actual base URL
const PATIENTS_PER_PAGE = 10;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getInitials(firstName = "", lastName = "") {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "??";
}

function getBadge(lastVisit) {
  // TODO: adapt this logic to match your actual API date format
  if (!lastVisit) return { label: "—", className: "bg-gray-100 text-gray-500" };
  return { label: lastVisit, className: "bg-gray-100 text-gray-500" };
}

function getAuthHeader() {
  const token = JSON.parse(
    localStorage.getItem("medicabinet_user") || "{}",
  )?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon, value, label, colorClass, loading }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          {loading ? (
            <div className="h-7 w-16 bg-gray-200 animate-pulse rounded mb-1" />
          ) : (
            <p className="text-2xl font-black text-gray-900">{value}</p>
          )}
          <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function PatientRow({ patient, onView, onEdit, onDelete }) {
  const initials = getInitials(patient.firstName, patient.lastName);
  const badge = getBadge(patient.lastVisit);

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-bold text-gray-900">{patient.firstName}</p>
            <p className="text-sm font-medium text-gray-500">
              {patient.lastName?.toUpperCase()}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {patient.cin || "—"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {patient.phone || "—"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {patient.dateOfBirth || "—"}
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight ${badge.className}`}
        >
          {badge.label}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView(patient)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Voir le dossier"
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            title="Modifier"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            onClick={() => onDelete(patient)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer"
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

function TableSkeleton({ rows = 5 }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i} className="border-b border-gray-100">
      {Array.from({ length: 6 }).map((_, j) => (
        <td key={j} className="px-6 py-4">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
        </td>
      ))}
    </tr>
  ));
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PatientsPage() {
  // ── State ────────────────────────────────────────────────────────────────
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    todayAppts: 0,
    newThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const totalPages = Math.max(1, Math.ceil(totalPatients / PATIENTS_PER_PAGE));

  // ── Debounce search ───────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Fetch patients ────────────────────────────────────────────────────────
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: adjust query param names to match your backend
      const params = new URLSearchParams({
        page: currentPage - 1, // adjust if your API is 1-indexed
        size: PATIENTS_PER_PAGE,
        ...(debouncedSearch && { search: debouncedSearch }),
      });

      const res = await fetch(`${API_BASE_URL}/patients?${params}`, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });

      if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);

      const data = await res.json();

      // TODO: adapt to your actual response shape, e.g.:
      // Spring Page: { content: [], totalElements: N }
      // Plain array: []
      setPatients(data.content ?? data.patients ?? data);
      setTotalPatients(data.totalElements ?? data.total ?? data.length ?? 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // ── Fetch stats ───────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/patients/stats`, {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        // TODO: adapt field names to match your endpoint response
        setStats({
          total: data.total ?? data.totalPatients ?? 0,
          todayAppts: data.todayAppointments ?? data.todayAppts ?? 0,
          newThisMonth: data.newThisMonth ?? 0,
        });
      } catch {
        // stats failure is non-blocking, silently ignored
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ── Action handlers ───────────────────────────────────────────────────────
  const handleView = (patient) => {
    // TODO: navigate to patient detail, e.g. navigate(`/secretaire/patients/${patient.id}`)
    console.log("view", patient);
  };

  const handleEdit = (patient) => {
    // TODO: open edit modal or navigate to edit page
    console.log("edit", patient);
  };

  const handleDelete = async (patient) => {
    if (
      !window.confirm(
        `Supprimer le patient ${patient.firstName} ${patient.lastName} ?`,
      )
    )
      return;
    try {
      const res = await fetch(`${API_BASE_URL}/patients/${patient.id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error();
      fetchPatients(); // refresh list after delete
    } catch {
      alert("Erreur lors de la suppression. Veuillez réessayer.");
    }
  };

  // ── Pagination helpers ────────────────────────────────────────────────────
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
    )
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis-" + p);
      acc.push(p);
      return acc;
    }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Navbar userRole="secretaire" pageTitle="Patients">
      <div className="p-6 lg:p-8 space-y-8">
        {/* ── Title + CTA ── */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Base de données Patients
            </h2>
            <p className="text-gray-500 mt-1 text-sm font-medium">
              Gérez et suivez les dossiers médicaux de vos patients
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            Ajouter un patient
          </button>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon="group"
            value={stats.total.toLocaleString("fr-MA")}
            label="Total Patients"
            colorClass="bg-blue-50 text-blue-600"
            loading={statsLoading}
          />
          <StatCard
            icon="event_available"
            value={stats.todayAppts}
            label="Rendez-vous Aujourd'hui"
            colorClass="bg-orange-50 text-orange-500"
            loading={statsLoading}
          />
          <StatCard
            icon="new_releases"
            value={stats.newThisMonth}
            label="Nouveaux ce mois"
            colorClass="bg-green-50 text-green-600"
            loading={statsLoading}
          />
          <div className="p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 flex items-center justify-center border-2 border-dashed border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
            <span className="text-gray-400 group-hover:text-blue-600 font-bold text-sm transition-colors">
              Générer un rapport complet
            </span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, CIN ou téléphone..."
            className="w-full pl-11 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-800 shadow-sm transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden ring-1 ring-gray-200">
          {/* Error banner */}
          {error && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
              {error}
              <button
                onClick={fetchPatients}
                className="ml-auto text-xs underline hover:no-underline"
              >
                Réessayer
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-[11px] font-black uppercase tracking-widest border-b border-gray-200">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">CIN</th>
                  <th className="px-6 py-4">Téléphone</th>
                  <th className="px-6 py-4">Date de naissance</th>
                  <th className="px-6 py-4">Dernière visite</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <TableSkeleton rows={PATIENTS_PER_PAGE} />
                ) : patients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-gray-400 text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-4xl mb-2 block text-gray-300">
                        person_search
                      </span>
                      {debouncedSearch
                        ? `Aucun résultat pour « ${debouncedSearch} »`
                        : "Aucun patient enregistré."}
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPatients > 0 && (
            <div className="px-6 py-4 flex items-center justify-between bg-gray-50 border-t border-gray-200 flex-wrap gap-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {totalPatients.toLocaleString("fr-MA")} patient
                {totalPatients > 1 ? "s" : ""} — page {currentPage} /{" "}
                {totalPages}
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition-colors disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>

                {pageNumbers.map((item, idx) =>
                  typeof item === "string" ? (
                    <span key={item} className="px-2 text-gray-400 text-xs">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        currentPage === item
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                          : "hover:bg-white text-gray-600"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition-colors disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Chatbot Widget ── */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <div
          className={`flex flex-col w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-gray-200 overflow-hidden transition-all duration-300 ${
            chatOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="bg-blue-600 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">
                smart_toy
              </span>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold leading-none">
                Assistant MediCabinet
              </h4>
              <span className="text-blue-200 text-[10px] font-medium">
                IA Opérationnelle
              </span>
            </div>
          </div>
          <div className="h-64 p-4 overflow-y-auto space-y-4 bg-gray-50">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[14px] text-blue-600">
                  smart_toy
                </span>
              </div>
              <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm ring-1 ring-gray-100">
                <p className="text-xs font-medium text-gray-700">
                  Bonjour ! Comment puis-je vous aider dans la gestion des
                  patients ?
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                className="w-full pl-3 pr-10 py-2 bg-gray-50 text-xs rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Posez une question..."
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600">
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-blue-600 shadow-xl shadow-blue-300 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {chatOpen ? "close" : "chat"}
          </span>
        </button>
      </div>
    </Navbar>
  );
}

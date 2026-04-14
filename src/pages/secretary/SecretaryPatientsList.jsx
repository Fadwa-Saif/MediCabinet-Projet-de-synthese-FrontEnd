import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import api from "../../services/api";
import ChatBot from "../shared/ChatBot";

// ─── Constants ──────────────────────────────────────────────────────────────

const PATIENTS_PER_PAGE = 10;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getInitials(firstName = "", lastName = "") {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "??";
}

function getBadge(lastVisit) {
  if (!lastVisit) return { label: "—", className: "bg-gray-100 text-gray-500" };
  const d = new Date(lastVisit);
  if (Number.isNaN(d.getTime())) {
    return { label: String(lastVisit), className: "bg-gray-100 text-gray-500" };
  }

  const now = new Date();
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return {
      label: `Vu ${d.toLocaleDateString("fr-FR")}`,
      className: "bg-green-100 text-green-700",
    };
  }

  if (diffDays <= 30) {
    return {
      label: `Vu ${d.toLocaleDateString("fr-FR")}`,
      className: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: `Vu ${d.toLocaleDateString("fr-FR")}`,
    className: "bg-gray-100 text-gray-500",
  };
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon, value, label, colorClass, loading }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
        >
          <span className="material-symbols-outlined text-[24px] leading-none">{icon}</span>
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

function PatientRow({
  patient,
  onView,
  onEdit,
  onDelete,
  isMenuOpen,
  onToggleMenu,
}) {
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
        <div className="relative flex items-center justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu(patient.id);
            }}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Actions"
            aria-label="Actions du patient"
          >
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-xl z-20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => onView(patient)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Voir
              </button>
              <button
                type="button"
                onClick={() => onEdit(patient)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Modifier
              </button>
              <button
                type="button"
                onClick={() => onDelete(patient)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Supprimer
              </button>
            </div>
          )}
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
  const navigate = useNavigate();
  // ── State ────────────────────────────────────────────────────────────────
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const secretaryName = userData.firstName || "Secrétaire";

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
      const params = new URLSearchParams({
        page: String(currentPage),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      });

      const response = await api.get(`/patients?${params.toString()}`);
      const payload = response.data;
      const items = Array.isArray(payload?.data) ? payload.data : [];

      setPatients(
        items.map((patient) => ({
          id: patient.id,
          firstName: patient.user?.prenom || "",
          lastName: patient.user?.nom || "",
          cin: patient.cin,
          phone: patient.user?.telephone,
          dateOfBirth: patient.date_naissance,
          lastVisit: patient.dossier_updated_at || patient.updated_at,
          raw: patient,
        })),
      );

      setTotalPatients(payload?.total || items.length);
      setTotalPages(payload?.last_page || 1);
      setStats((prev) => ({
        ...prev,
        total: payload?.total || items.length,
      }));
    } catch (err) {
      setError(err.message || "Impossible de charger les patients.");
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (activeMenuId === null) return undefined;

    const handleDocumentClick = () => {
      setActiveMenuId(null);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [activeMenuId]);

  // ── Action handlers ───────────────────────────────────────────────────────
  const handleView = (patient) => {
    navigate(`/secretaire/patients/${patient.id}`);
  };

  const handleEdit = (patient) => {
    navigate(`/secretaire/patients/${patient.id}/modifier`);
  };

  const handleDelete = async (patient) => {
    const confirmed = window.confirm(
      `Supprimer le patient ${patient.firstName} ${patient.lastName} ? Cette action est irréversible.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/patients/${patient.id}`);
      await fetchPatients();
      setActiveMenuId(null);
    } catch (err) {
      window.alert(
        err.response?.data?.message || "La suppression du patient a échoué.",
      );
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
          <button
            onClick={() => navigate("/secretaire/patients/nouveau")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
          >
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
                      isMenuOpen={activeMenuId === patient.id}
                      onToggleMenu={(patientId) =>
                        setActiveMenuId((current) =>
                          current === patientId ? null : patientId,
                        )
                      }
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

      <ChatBot userName={secretaryName} userRole="Secrétaire" />
    </Navbar>
  );
}

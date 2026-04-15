import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Save,
  X,
} from "lucide-react";

function mapStatusLabel(statusKey) {
  if (statusKey === "confirme") return "Confirme";
  if (statusKey === "termine") return "Termine";
  if (statusKey === "annule") return "Annule";
  return "En attente";
}

function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function toDateKey(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toInputDateValue(dateObj) {
  return toDateKey(dateObj);
}

function toInputTimeValue(dateObj) {
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const ITEMS_PER_PAGE = 5;

export function SecretaryAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    motif: "",
    statusKey: "en_attente",
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          "/rendezvous?sort_by=created_at&sort_dir=desc&per_page=200",
        );
        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : response.data || [];
        const total = Number.isFinite(response.data?.total)
          ? response.data.total
          : data.length;
        const mapped = data
          .map((rdv) => {
            const dateObj = new Date(rdv.date_heure);
            const patientName =
              `${rdv.patient?.user?.prenom || ""} ${rdv.patient?.user?.nom || ""}`.trim() ||
              "—";
            const doctorName =
              `${rdv.admin?.user?.prenom || ""} ${rdv.admin?.user?.nom || ""}`.trim() ||
              "—";
            const statusKey = rdv.statut || "en_attente";

            return {
              id: rdv.id,
              createdAt: rdv.created_at || rdv.date_heure,
              dateHeure: rdv.date_heure,
              dateObj,
              dateKey: toDateKey(dateObj),
              date: dateObj.toLocaleDateString("fr-FR"),
              time: dateObj.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              patient: patientName,
              doctor: doctorName,
              motif: rdv.motif || "—",
              statusKey,
              status: mapStatusLabel(statusKey),
            };
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

        setAppointments(mapped);
        setTotalAppointments(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, timeFilter, searchTerm, selectedDate]);

  const now = new Date();
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      !searchTerm ||
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || apt.statusKey === statusFilter;

    let matchesTime = true;
    if (timeFilter === "today") {
      matchesTime = isSameDay(apt.dateObj, now);
    } else if (timeFilter === "upcoming") {
      matchesTime = apt.dateObj.getTime() >= now.getTime();
    } else if (timeFilter === "past") {
      matchesTime = apt.dateObj.getTime() < now.getTime();
    }

    const matchesSelectedDate = !selectedDate || apt.dateKey === selectedDate;

    return matchesSearch && matchesStatus && matchesTime && matchesSelectedDate;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const refreshAppointments = async () => {
    const response = await api.get(
      "/rendezvous?sort_by=created_at&sort_dir=desc&per_page=200",
    );
    const data = Array.isArray(response.data?.data)
      ? response.data.data
      : response.data || [];
    const total = Number.isFinite(response.data?.total)
      ? response.data.total
      : data.length;
    const mapped = data
      .map((rdv) => {
        const dateObj = new Date(rdv.date_heure);
        const patientName =
          `${rdv.patient?.user?.prenom || ""} ${rdv.patient?.user?.nom || ""}`.trim() ||
          "—";
        const doctorName =
          `${rdv.admin?.user?.prenom || ""} ${rdv.admin?.user?.nom || ""}`.trim() ||
          "—";
        const statusKey = rdv.statut || "en_attente";

        return {
          id: rdv.id,
          createdAt: rdv.created_at || rdv.date_heure,
          dateHeure: rdv.date_heure,
          dateObj,
          dateKey: toDateKey(dateObj),
          date: dateObj.toLocaleDateString("fr-FR"),
          time: dateObj.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          patient: patientName,
          doctor: doctorName,
          motif: rdv.motif || "—",
          statusKey,
          status: mapStatusLabel(statusKey),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    setAppointments(mapped);
    setTotalAppointments(total);
  };

  const closeMenus = () => setOpenMenuId(null);

  const closeModals = () => {
    setModalMode(null);
    setSelectedAppointment(null);
    setViewDetails(null);
    setEditForm({ date: "", time: "", motif: "", statusKey: "en_attente" });
  };

  const handleOpenView = async (appointment) => {
    closeMenus();
    setSelectedAppointment(appointment);
    setModalMode("view");
    setViewDetails(null);
    try {
      const response = await api.get(`/rendezvous/${appointment.id}`);
      setViewDetails(response.data);
    } catch (err) {
      setViewDetails(appointment);
    }
  };

  const handleOpenEdit = (appointment) => {
    closeMenus();
    setSelectedAppointment(appointment);
    setModalMode("edit");
    setViewDetails(null);
    const dateObj = appointment.dateHeure
      ? new Date(appointment.dateHeure)
      : appointment.dateObj;
    setEditForm({
      date: toInputDateValue(dateObj),
      time: toInputTimeValue(dateObj),
      motif: appointment.motif === "—" ? "" : appointment.motif,
      statusKey: appointment.statusKey,
    });
  };

  const handleQuickStatus = async (appointmentId, statusKey) => {
    setActionLoadingId(appointmentId);
    setError(null);
    try {
      if (statusKey === "annule") {
        await api.patch(`/rendezvous/${appointmentId}/annuler`);
      } else {
        await api.patch(`/rendezvous/${appointmentId}`, { statut: statusKey });
      }
      await refreshAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Impossible de mettre à jour le rendez-vous.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setSavingEdit(true);
    setError(null);
    try {
      // Only update the `statut` to avoid validation errors on date_heure
      await api.patch(`/rendezvous/${selectedAppointment.id}`, {
        statut: editForm.statusKey,
      });
      closeModals();
      await refreshAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message || "Impossible de modifier le rendez-vous.",
      );
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <Navbar userRole="secretaire" pageTitle="Gestion des Rendez-vous">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
          <button
            onClick={() => navigate("/secretaire/rendezvous/nouveau")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-100"
          >
            <span className="material-symbols-outlined text-[20px]">
              calendar_add_on
            </span>
            Nouveau Rendez-vous
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
            <p className="text-gray-600 text-sm">Total rendez-vous</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalAppointments}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Aujourd'hui</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => isSameDay(a.dateObj, now)).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Confirmes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.statusKey === "confirme").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">En attente</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.statusKey === "en_attente").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Recherche patient
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par nom ou prenom du patient"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Filtrer par temps
              </label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">Tous</option>
                <option value="today">Aujourd'hui</option>
                <option value="upcoming">A venir</option>
                <option value="past">Passe</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Selectionner une date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Filtrer par statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">Tous</option>
                <option value="en_attente">En attente</option>
                <option value="confirme">Confirme</option>
                <option value="termine">Termine</option>
                <option value="annule">Annule</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {filteredAppointments.length} resultat(s) affiche(s)
          </p>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Date/Heure
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Médecin
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-red-500"
                    >
                      {error}
                    </td>
                  </tr>
                ) : paginatedAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Aucun rendez-vous trouve pour ces filtres
                    </td>
                  </tr>
                ) : (
                  paginatedAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-gray-50 transition relative"
                    >
                      <td className="px-6 py-4 text-gray-900">
                        <div className="font-semibold">{apt.date}</div>
                        <div className="text-gray-600 text-xs">{apt.time}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{apt.patient}</td>
                      <td className="px-6 py-4 text-gray-900">{apt.doctor}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.statusKey === "confirme"
                              ? "bg-green-100 text-green-800"
                              : apt.statusKey === "termine"
                                ? "bg-blue-100 text-blue-800"
                                : apt.statusKey === "annule"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === apt.id ? null : apt.id,
                              )
                            }
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-transparent text-gray-600 hover:bg-gray-100"
                            aria-label="Actions"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openMenuId === apt.id && (
                            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuickStatus(apt.id, "confirme")
                                }
                                disabled={
                                  actionLoadingId === apt.id ||
                                  apt.statusKey === "confirme" ||
                                  apt.statusKey === "termine"
                                }
                                className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                ✔ Confirmer
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuickStatus(apt.id, "annule")
                                }
                                disabled={
                                  actionLoadingId === apt.id ||
                                  apt.statusKey === "annule" ||
                                  apt.statusKey === "termine"
                                }
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                ✖ Annuler
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenView(apt)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-blue-700"
                              >
                                👁 Voir
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(apt)}
                                disabled={apt.statusKey === "termine"}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-50 text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                ✏ Modifier
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
          <p className="text-sm text-gray-600">
            Affichage {filteredAppointments.length === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredAppointments.length)}{" "}
            sur {filteredAppointments.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Précédent
            </button>
            <span className="text-sm font-semibold text-gray-700 px-2">
              Page {safeCurrentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* View Modal */}
        {modalMode === "view" && selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Détails du rendez-vous
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedAppointment.patient}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-5 text-sm">
                <div>
                  <span className="font-semibold text-gray-500">Date:</span>{" "}
                  {selectedAppointment.date} {selectedAppointment.time}
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Médecin:</span>{" "}
                  {selectedAppointment.doctor}
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Statut:</span>{" "}
                  {selectedAppointment.status}
                </div>
                <div>
                  <span className="font-semibold text-gray-500">Motif:</span>{" "}
                  {viewDetails?.motif || selectedAppointment.motif || "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-500">
                    Consultation:
                  </span>{" "}
                  {viewDetails?.consultation
                    ? "Déjà créée"
                    : "Aucune consultation liée"}
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {modalMode === "edit" && selectedAppointment && editForm.date && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Modifier le rendez-vous
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedAppointment.patient}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Heure
                    </label>
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Motif
                  </label>
                  <textarea
                    value={editForm.motif}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        motif: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Statut
                  </label>
                  <select
                    value={editForm.statusKey}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        statusKey: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="en_attente">En attente</option>
                    <option value="confirme">Confirme</option>
                    <option value="annule">Annule</option>
                    <option value="termine">Termine</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {savingEdit ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
}

import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Calendar, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import api from "../../services/api";

export function PatientConsultationsList() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Toutes");
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/consultations");
        const data = Array.isArray(response.data?.data) ? response.data.data : response.data;
        setConsultations(
          data.map((c) => ({
            id: c.id,
            date: new Date(c.date).toLocaleDateString("fr-FR"),
            motif: c.symptomes || "—",
            diagnostic: c.diagnostic || "—",
            status: "Complétée",
            raw: c,
          }))
        );
      } catch (err) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  const pageContent = (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">Mes Consultations</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date début
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date fin
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option>Toutes</option>
                <option>Complétée</option>
                <option>En attente</option>
                <option>Annulée</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter Button */}
          <div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition">
              Filtrer
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Motif
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Diagnostic
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-red-500">{error}</td>
              </tr>
            ) : consultations.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Aucune consultation</td>
              </tr>
            ) : (
              consultations.map((consultation) => (
                <tr
                  key={consultation.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      {consultation.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {consultation.motif}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {consultation.diagnostic}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {consultation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition font-medium">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return <Navbar userRole="patient">{pageContent}</Navbar>;
}

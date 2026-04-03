import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export function SecretaryAppointments() {
  const navigate = useNavigate();

  // TODO: fetch from API — GET /api/secretary/appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "24 Octobre 2024",
      time: "09:00",
      patient: "Marc Laurent",
      doctor: "Dr. Claire Lefebvre",
      status: "Confirmé",
    },
    {
      id: 2,
      date: "24 Octobre 2024",
      time: "10:30",
      patient: "Sophie Bernard",
      doctor: "Dr. Marc Antoine",
      status: "Confirmé",
    },
    {
      id: 3,
      date: "25 Octobre 2024",
      time: "14:00",
      patient: "Jean Moreau",
      doctor: "Dr. Claire Lefebvre",
      status: "En attente",
    },
  ]);

  return (
    <Navbar userRole="secretaire" pageTitle="Gestion des Rendez-vous">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Rendez-vous
          </h1>
          <button
            onClick={() => navigate("/secretaire/rendezvous")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ➕ Nouveau Rendez-vous
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Aujourd'hui</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter(
                (a) => a.date === "24 Octobre 2024"
              ).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Confirmés</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.status === "Confirmé").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">En attente</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {appointments.filter((a) => a.status === "En attente").length}
            </p>
          </div>
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
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900">
                      <div className="font-semibold">{apt.date}</div>
                      <div className="text-gray-600 text-xs">{apt.time}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{apt.patient}</td>
                    <td className="px-6 py-4 text-gray-900">{apt.doctor}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === "Confirmé"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline text-sm font-medium">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TODO: fetch from API — GET /api/secretary/appointments */}
        {/* TODO: Add filtering, search, and pagination */}
      </div>
    </Navbar>
  );
}


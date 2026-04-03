import { useState } from "react";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { Navbar } from "../../components/Navbar";

const mockAppointments = [
  {
    id: 1,
    date: "03 avril 2026",
    time: "09:00",
    patient: "Marc Laurent",
    reason: "Suivi post-operatoire",
    status: "Confirme",
  },
  {
    id: 2,
    date: "03 avril 2026",
    time: "10:30",
    patient: "Sophie Bernard",
    reason: "Controle cardiologie",
    status: "En cours",
  },
  {
    id: 3,
    date: "03 avril 2026",
    time: "14:00",
    patient: "Jean Moreau",
    reason: "Renouvellement ordonnance",
    status: "En attente",
  },
];

export function AppointmentBooking() {
  const [appointments] = useState(mockAppointments);

  return (
    <Navbar userRole="medecin" pageTitle="Rendez-vous">
      <div className="p-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="mt-1 text-gray-600">
              Vue rapide des consultations programmees pour aujourd&apos;hui.
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Total
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {appointments.length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock3 className="h-4 w-4" />
                    <span className="font-semibold">{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900">
                    <UserRound className="h-4 w-4" />
                    <span className="font-semibold">{appointment.patient}</span>
                  </div>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {appointment.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">{appointment.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
}

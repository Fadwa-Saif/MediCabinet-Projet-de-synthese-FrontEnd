import { Navbar } from "../../components/Navbar";

export function AppointmentBooking() {
  const pageContent = (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Appointment Booking
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Manage and view appointments here.</p>
      </div>
    </div>
  );

  return <Navbar userRole="medecin">{pageContent}</Navbar>;
}

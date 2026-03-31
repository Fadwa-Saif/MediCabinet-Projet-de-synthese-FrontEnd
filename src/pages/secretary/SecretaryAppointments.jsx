import { Navbar } from "../../components/Navbar";

export function SecretaryAppointments() {
  const pageContent = (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Appointments Management
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Manage all appointments here.</p>
      </div>
    </div>
  );

  return <Navbar userRole="secretaire">{pageContent}</Navbar>;
}

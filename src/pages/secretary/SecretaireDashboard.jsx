import { Navbar } from "../../components/Navbar";

export function SecretaireDashboard() {
  const pageContent = (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Secretary Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h3 className="text-gray-600 font-medium mb-2">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <h3 className="text-gray-600 font-medium mb-2">Appointments Today</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
          <h3 className="text-gray-600 font-medium mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
      </div>
    </div>
  );

  return <Navbar userRole="secretaire">{pageContent}</Navbar>;
}

import { Navbar } from "../../components/Navbar";

export function ConsultationReportNew() {
  const pageContent = (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Consultation Report
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Create and manage consultation reports.</p>
      </div>
    </div>
  );

  return <Navbar userRole="medecin">{pageContent}</Navbar>;
}

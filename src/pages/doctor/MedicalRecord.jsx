import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function MedicalRecord() {
  // TODO: fetch from API — GET /api/patient/medical-record
  const [medicalData] = useState({
    allergies: ["Pénicilline"],
    chronicConditions: ["Asthme léger"],
    previousSurgeries: ["Appendicectomie (2015)"],
    medications: ["Ventoline", "Metformine"],
  });

  return (
    <Navbar userRole="patient" pageTitle="Dossier Médical">
      <div className="p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allergies */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">⚠️ Allergies</h3>
            <ul className="space-y-2">
              {medicalData.allergies.map((allergy, idx) => (
                <li key={idx} className="text-gray-700">• {allergy}</li>
              ))}
            </ul>
          </div>

          {/* Chronic Conditions */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💊 Maladies Chroniques</h3>
            <ul className="space-y-2">
              {medicalData.chronicConditions.map((condition, idx) => (
                <li key={idx} className="text-gray-700">• {condition}</li>
              ))}
            </ul>
          </div>

          {/* Previous Surgeries */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">🏥 Interventions Chirurgicales</h3>
            <ul className="space-y-2">
              {medicalData.previousSurgeries.map((surgery, idx) => (
                <li key={idx} className="text-gray-700">• {surgery}</li>
              ))}
            </ul>
          </div>

          {/* Medications */}
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💧 Traitements Actuels</h3>
            <ul className="space-y-2">
              {medicalData.medications.map((med, idx) => (
                <li key={idx} className="text-gray-700">• {med}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 Tip: Ce dossier est mis à jour par vos médecins lors de chaque consultation. Pour toute correction, veuillez contacter votre médecin traitant.
          </p>
        </div>
      </div>
    </Navbar>
  );
}


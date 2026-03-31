import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";

export function MedicalRecord() {
  const [activeTab, setActiveTab] = useState("historique");

  const medicalHistory = [
    {
      id: 1,
      title: "Bilan cardiaque complet",
      date: "15 Oct 2025",
      status: "Complétée",
      description: "Résultats normaux, suivi dans 6 mois",
    },
    {
      id: 2,
      title: "Consultation dermatologique",
      date: "22 Sep 2025",
      status: "Complétée",
      description: "Traitement prescrit pour 2 semaines",
    },
  ];

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dossier médical</h1>
        <p className="text-gray-600 text-sm">
          Consultez votre historique médical complet
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-500 text-white rounded-lg p-4 flex items-center gap-3">
        <AlertCircle size={24} />
        <span>
          Information manquante: Veuillez mettre à jour vos informations
          d'assurance
        </span>
      </div>

      {/* Patient Info Card with Left Blue Border */}
      <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Patient:</span>
                <span className="text-gray-800 font-semibold">Omar Kamali</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  Date de naissance:
                </span>
                <span className="text-gray-800">15/03/1985</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-6">
              <span className="bg-red-500 text-white font-bold px-3 py-1 rounded">
                A+
              </span>
              <span className="text-gray-600 font-medium">
                Allergies:
                <span className="text-red-500 font-semibold ml-2">
                  Pénicilline
                </span>
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 font-medium">
            <Download size={20} />
            Exporter PDF
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b-2 border-gray-200">
          {[
            "Historique",
            "Prescriptions",
            "Analyses & Radiologies",
            "Notes",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, "-"))}
              className={`pb-3 font-medium transition-colors ${
                activeTab === tab.toLowerCase().replace(/ /g, "-")
                  ? "text-blue-500 border-b-2 border-blue-500 -mb-2"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Medical History Content */}
        <div className="mt-6 space-y-4">
          {medicalHistory.map((item) => (
            <div
              key={item.id}
              className="bg-blue-50 rounded-lg p-4 space-y-2 border-l-4 border-blue-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-600">{item.date}</p>
                </div>
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return <Navbar userRole="medecin">{pageContent}</Navbar>;
}

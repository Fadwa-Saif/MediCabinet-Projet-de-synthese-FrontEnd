import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { Cloud, Camera } from "lucide-react";

export function PatientUploadAnalysis() {
  const [formData, setFormData] = useState({
    analysisType: "",
    laboratory: "",
    analysisDate: "",
    resultDate: "",
    comment: "",
    isUrgent: false,
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend logic will be added later
    console.log("Form submitted:", { ...formData, file: uploadedFile });
  };

  const handleCancel = () => {
    setFormData({
      analysisType: "",
      laboratory: "",
      analysisDate: "",
      resultDate: "",
      comment: "",
      isUrgent: false,
    });
    setUploadedFile(null);
  };

  const pageContent = (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Envoyer un résultat d'analyse
        </h1>
        <p className="text-gray-500">
          Téléchargez vos résultats d'analyses médicales
        </p>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit}>
        {/* Informations sur l'analyse Tab */}
        <div className="bg-blue-50 rounded-t-lg px-6 py-4 flex items-center gap-3 mb-0">
          <Cloud className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Informations sur l'analyse
          </h2>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-b-lg shadow px-6 py-8 mb-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Informations
            </h3>

            {/* Type d'analyse */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'analyse
              </label>
              <select
                name="analysisType"
                value={formData.analysisType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner le type</option>
                <option value="blood">Analyse Sanguin</option>
                <option value="urine">Analyse d'Urine</option>
                <option value="imaging">Imagerie</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Laboratoire */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Laboratoire
              </label>
              <input
                type="text"
                name="laboratory"
                value={formData.laboratory}
                onChange={handleInputChange}
                placeholder="Nom du laboratoire"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de l'analyse
                </label>
                <input
                  type="date"
                  name="analysisDate"
                  value={formData.analysisDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date du résultat
                </label>
                <input
                  type="date"
                  name="resultDate"
                  value={formData.resultDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Commentaire */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire (optionnel)
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Ajoutez un commentaire..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Urgent Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isUrgent"
                checked={formData.isUrgent}
                onChange={handleInputChange}
                id="urgent"
                className="w-4 h-4"
              />
              <label htmlFor="urgent" className="text-gray-700">
                Marquer comme urgent
              </label>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Fichier
            </h3>

            {/* Drag and drop area */}
            <label className="block mb-6">
              <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition">
                <Cloud className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-800 mb-1">
                  Glissez votre fichier ici
                </p>
                <p className="text-gray-500 text-sm mb-4">ou</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.currentTarget.parentElement
                      .querySelector("input")
                      .click();
                  }}
                  className="inline-block px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50"
                >
                  Parcourir les fichiers
                </button>
                <p className="text-gray-500 text-xs mt-3">
                  PDF, JPG, PNG — Max 10 Mo
                </p>
              </div>
            </label>

            {/* Uploaded file display */}
            {uploadedFile && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Fichier uploadé:</strong> {uploadedFile.name}
                </p>
              </div>
            )}

            {/* Or text */}
            <div className="text-center mb-6">
              <p className="text-gray-600">ou</p>
            </div>

            {/* Take photo button */}
            <div className="text-center mb-8">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50"
              >
                <Camera className="w-4 h-4" />
                Prendre une photo
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-2 border border-gray-400 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center gap-2"
          >
            <span>📧</span>
            Envoyer l'analyse
          </button>
        </div>
      </form>
    </div>
  );

  return <Navbar userRole="patient">{pageContent}</Navbar>;
}

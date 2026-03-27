import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { Label } from "../ui/label.jsx";
import { Textarea } from "../ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import {
  UploadCloud,
  TestTube,
  Building,
  Calendar,
  Camera,
  AlertTriangle,
  X,
  Send,
} from "lucide-react";

export function PatientUploadAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " Mo",
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    setSelectedFile({
      name: "photo_capture_" + Date.now() + ".jpg",
      size: "2.3 Mo",
    });
    setShowCamera(false);
  };

  return (
    <div
      className="w-full h-full overflow-y-auto p-8"
      style={{ backgroundColor: "#F5F6FA" }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2" style={{ color: "#333333" }}>
            Envoyer un résultat d'analyse
          </h1>
          <p style={{ color: "#777777" }}>
            Téléchargez vos résultats d'analyses médicales
          </p>
        </div>

        {/* Upload Form */}
        <Card
          className="border-2"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
        >
          <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
            <div className="flex items-center gap-3">
              <UploadCloud className="w-6 h-6" style={{ color: "#007BFF" }} />
              <CardTitle style={{ color: "#333333" }}>
                Informations sur l'analyse
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Part 1: Information */}
            <div className="space-y-4">
              <h3 style={{ color: "#333333", fontWeight: "bold" }}>
                Informations
              </h3>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type" style={{ color: "#333333" }}>
                  Type d'analyse
                </Label>
                <div className="relative">
                  <TestTube
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "#777777" }}
                  />
                  <Select>
                    <SelectTrigger
                      className="pl-10"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    >
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biologie">Biologie</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Laboratory */}
              <div className="space-y-2">
                <Label htmlFor="laboratory" style={{ color: "#333333" }}>
                  Laboratoire
                </Label>
                <div className="relative">
                  <Building
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "#777777" }}
                  />
                  <Input
                    id="laboratory"
                    placeholder="Nom du laboratoire"
                    className="pl-10"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="analysisDate" style={{ color: "#333333" }}>
                    Date de l'analyse
                  </Label>
                  <Input
                    id="analysisDate"
                    type="date"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resultDate" style={{ color: "#333333" }}>
                    Date du résultat
                  </Label>
                  <Input
                    id="resultDate"
                    type="date"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <Label htmlFor="comment" style={{ color: "#333333" }}>
                  Commentaire (optionnel)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Ajoutez un commentaire..."
                  rows={2}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E6F0FF",
                  }}
                />
              </div>

              {/* Urgent Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: "#DC3545" }}
                />
                <Label
                  htmlFor="urgent"
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ color: "#333333" }}
                >
                  <span>Marquer comme urgent</span>
                  {isUrgent && (
                    <AlertTriangle
                      className="w-4 h-4"
                      style={{ color: "#DC3545" }}
                    />
                  )}
                </Label>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: "#E6F0FF" }} />

            {/* Part 2: File Upload */}
            <div className="space-y-4">
              <h3 style={{ color: "#333333", fontWeight: "bold" }}>Fichier</h3>

              {!selectedFile && !showCamera && (
                <>
                  {/* Drop Zone */}
                  <div
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-opacity-50 transition-colors"
                    style={{
                      borderColor: "#007BFF",
                      backgroundColor: "rgba(230, 240, 255, 0.3)",
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <UploadCloud
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: "#007BFF" }}
                    />
                    <p
                      style={{
                        color: "#333333",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      Glissez votre fichier ici
                    </p>
                    <p style={{ color: "#777777", marginBottom: "12px" }}>ou</p>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("fileInput").click();
                      }}
                      style={{
                        borderColor: "#007BFF",
                        color: "#007BFF",
                      }}
                    >
                      Parcourir les fichiers
                    </Button>
                    <p className="text-sm mt-3" style={{ color: "#777777" }}>
                      PDF, JPG, PNG — Max 10 Mo
                    </p>
                  </div>

                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-1"
                      style={{ height: "1px", backgroundColor: "#E6F0FF" }}
                    />
                    <span style={{ color: "#777777" }}>ou</span>
                    <div
                      className="flex-1"
                      style={{ height: "1px", backgroundColor: "#E6F0FF" }}
                    />
                  </div>

                  {/* Camera Option */}
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowCamera(true)}
                      style={{
                        borderColor: "#007BFF",
                        color: "#007BFF",
                      }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Prendre une photo
                    </Button>
                  </div>
                </>
              )}

              {/* Camera Viewfinder */}
              {showCamera && !selectedFile && (
                <div className="space-y-4">
                  <div
                    className="rounded-lg p-12 text-center relative"
                    style={{
                      backgroundColor: "#333333",
                      minHeight: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Camera
                      className="w-16 h-16 mb-4"
                      style={{ color: "#FFFFFF" }}
                    />
                    <p style={{ color: "#FFFFFF", marginBottom: "20px" }}>
                      Viewfinder de la caméra
                    </p>
                    <Button
                      size="lg"
                      onClick={handleCameraCapture}
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#333333",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        padding: "0",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full"
                        style={{ backgroundColor: "#DC3545" }}
                      />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowCamera(false)}
                    className="w-full"
                    style={{
                      borderColor: "#777777",
                      color: "#777777",
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              )}

              {/* File Preview */}
              {selectedFile && (
                <div
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: "#E6F0FF" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center"
                      style={{ backgroundColor: "#007BFF" }}
                    >
                      <UploadCloud
                        className="w-6 h-6"
                        style={{ color: "#FFFFFF" }}
                      />
                    </div>
                    <div>
                      <div style={{ color: "#333333", fontWeight: "bold" }}>
                        {selectedFile.name}
                      </div>
                      <div className="text-sm" style={{ color: "#777777" }}>
                        {selectedFile.size}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 rounded-lg hover:bg-red-50"
                  >
                    <X className="w-5 h-5" style={{ color: "#DC3545" }} />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                style={{
                  borderColor: "#777777",
                  color: "#777777",
                }}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                disabled={!selectedFile}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#FFFFFF",
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer l'analyse
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { AlertCircle, Download, Droplet } from "lucide-react";

export function MedicalRecord() {
  const consultations = [
    {
      id: 1,
      date: "15 Oct 2025",
      diagnosis: "Bilan cardiaque complet",
      notes: "Résultats normaux, suivi dans 6 mois",
    },
    {
      id: 2,
      date: "22 Sep 2025",
      diagnosis: "Consultation dermatologique",
      notes: "Traitement prescrit pour 2 semaines",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      date: "22 Sep 2025",
      medication: "Antibiotique Amoxicilline 500mg",
      dosage: "3 fois par jour",
      duration: "7 jours",
    },
    {
      id: 2,
      date: "15 Oct 2025",
      medication: "Aspirine 100mg",
      dosage: "1 fois par jour",
      duration: "30 jours",
    },
  ];

  const analyses = [
    {
      id: 1,
      date: "15 Oct 2025",
      test: "Électrocardiogramme (ECG)",
      result: "Normal",
      status: "complete",
    },
    {
      id: 2,
      date: "10 Oct 2025",
      test: "Analyse sanguine complète",
      result: "En attente",
      status: "pending",
    },
  ];

  const radiologies = [
    {
      id: 1,
      type: "Radiographie thoracique",
      centre: "Centre d'Imagerie Bennani",
      date: "08 Oct 2025",
      result: "Normal",
    },
    {
      id: 2,
      type: "IRM cérébrale",
      centre: "Clinique d'Imagerie El Idrissi",
      date: "20 Sep 2025",
      result: "Normal",
    },
  ];

  return (
    <div
      className="w-full h-full overflow-y-auto p-8"
      style={{ backgroundColor: "#F5F6FA" }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2" style={{ color: "#333333" }}>
              Dossier médical
            </h1>
            <p style={{ color: "#777777" }}>
              Consultez votre historique médical complet
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div
          className="flex items-center gap-3 p-4 rounded-lg"
          style={{ backgroundColor: "#DC3545", color: "#FFFFFF" }}
        >
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="text-sm">
              Information manquante: Veuillez mettre à jour vos informations
              d'assurance
            </p>
          </div>
        </div>

        {/* Medical Folder */}
        <div className="relative">
          {/* Folder binding strip */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2 rounded-l-lg"
            style={{ backgroundColor: "#007BFF" }}
          />

          <Card
            className="border-2 ml-2"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            {/* Patient Info Header */}
            <div
              className="px-6 py-3 border-b flex items-center justify-between"
              style={{ backgroundColor: "#E6F0FF", borderColor: "#E6F0FF" }}
            >
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-sm" style={{ color: "#777777" }}>
                    Patient:{" "}
                  </span>
                  <span className="font-medium" style={{ color: "#333333" }}>
                    Omar Kamali
                  </span>
                </div>
                <div>
                  <span className="text-sm" style={{ color: "#777777" }}>
                    Date de naissance:{" "}
                  </span>
                  <span className="font-medium" style={{ color: "#333333" }}>
                    15/03/1985
                  </span>
                </div>
                <div>
                  <Badge
                    style={{ backgroundColor: "#DC3545", color: "#FFFFFF" }}
                  >
                    <Droplet className="w-3 h-3 mr-1" />
                    A+
                  </Badge>
                </div>
                <div>
                  <span className="text-sm" style={{ color: "#777777" }}>
                    Allergies:{" "}
                  </span>
                  <span className="font-medium" style={{ color: "#DC3545" }}>
                    Pénicilline
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: "#007BFF", color: "#007BFF" }}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter PDF
              </Button>
            </div>

            <CardContent className="pt-6">
              <Tabs defaultValue="historique" className="w-full">
                <TabsList
                  className="grid w-full grid-cols-4 mb-6"
                  style={{ backgroundColor: "#F5F6FA" }}
                >
                  <TabsTrigger
                    value="historique"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-t-2 data-[state=active]:border-t-[#007BFF]"
                  >
                    Historique
                  </TabsTrigger>
                  <TabsTrigger
                    value="prescriptions"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-t-2 data-[state=active]:border-t-[#007BFF]"
                  >
                    Prescriptions
                  </TabsTrigger>
                  <TabsTrigger
                    value="analyses"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-t-2 data-[state=active]:border-t-[#007BFF]"
                  >
                    Analyses & Radiologies
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-t-2 data-[state=active]:border-t-[#007BFF]"
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>

                {/* Consultation History */}
                <TabsContent value="historique" className="space-y-4 mt-6">
                  {consultations.map((consultation) => (
                    <Card
                      key={consultation.id}
                      className="border"
                      style={{ borderColor: "#E6F0FF" }}
                    >
                      <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle
                              className="text-lg"
                              style={{ color: "#333333" }}
                            >
                              {consultation.diagnosis}
                            </CardTitle>
                            <CardDescription style={{ color: "#777777" }}>
                              {consultation.date}
                            </CardDescription>
                          </div>
                          <Badge
                            style={{
                              backgroundColor: "#28A745",
                              color: "#FFFFFF",
                            }}
                          >
                            Complétée
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p style={{ color: "#333333" }}>{consultation.notes}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Prescriptions */}
                <TabsContent value="prescriptions" className="space-y-4 mt-6">
                  {prescriptions.map((prescription) => (
                    <Card
                      key={prescription.id}
                      className="border"
                      style={{ borderColor: "#E6F0FF" }}
                    >
                      <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                        <CardTitle
                          className="text-lg"
                          style={{ color: "#333333" }}
                        >
                          {prescription.medication}
                        </CardTitle>
                        <CardDescription style={{ color: "#777777" }}>
                          Prescrit le {prescription.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span style={{ color: "#777777" }}>Posologie:</span>
                          <span style={{ color: "#333333" }}>
                            {prescription.dosage}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "#777777" }}>Durée:</span>
                          <span style={{ color: "#333333" }}>
                            {prescription.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Analyses & Radiologies */}
                <TabsContent value="analyses" className="space-y-6 mt-6">
                  {/* Analyses Section */}
                  <div>
                    <h3 className="text-lg mb-3" style={{ color: "#333333" }}>
                      Analyses
                    </h3>
                    <div className="space-y-4">
                      {analyses.map((test) => (
                        <Card
                          key={test.id}
                          className="border"
                          style={{ borderColor: "#E6F0FF" }}
                        >
                          <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle
                                  className="text-lg"
                                  style={{ color: "#333333" }}
                                >
                                  {test.test}
                                </CardTitle>
                                <CardDescription style={{ color: "#777777" }}>
                                  {test.date}
                                </CardDescription>
                              </div>
                              <Badge
                                style={{
                                  backgroundColor:
                                    test.status === "complete"
                                      ? "#28A745"
                                      : "#007BFF",
                                  color: "#FFFFFF",
                                }}
                              >
                                {test.result}
                              </Badge>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="border-t"
                    style={{ borderColor: "#E6F0FF" }}
                  />

                  {/* Radiologies Section */}
                  <div>
                    <h3 className="text-lg mb-3" style={{ color: "#333333" }}>
                      Radiologies
                    </h3>
                    <div className="space-y-4">
                      {radiologies.map((radio) => (
                        <Card
                          key={radio.id}
                          className="border"
                          style={{ borderColor: "#E6F0FF" }}
                        >
                          <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <CardTitle
                                  className="text-lg"
                                  style={{ color: "#333333" }}
                                >
                                  {radio.type}
                                </CardTitle>
                                <CardDescription style={{ color: "#777777" }}>
                                  {radio.centre} • {radio.date}
                                </CardDescription>
                              </div>
                              <Badge
                                style={{
                                  backgroundColor: "#28A745",
                                  color: "#FFFFFF",
                                }}
                              >
                                {radio.result}
                              </Badge>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Notes */}
                <TabsContent value="notes" className="mt-6">
                  <Card className="border" style={{ borderColor: "#E6F0FF" }}>
                    <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                      <CardTitle style={{ color: "#333333" }}>
                        Notes personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p style={{ color: "#777777" }}>
                        Aucune note pour le moment
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


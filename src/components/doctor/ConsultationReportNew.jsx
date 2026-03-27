import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { Label } from "../ui/label.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.jsx";
import { AlertCircle, User, Plus, Trash2, X } from "lucide-react";

export function ConsultationReportNew() {
  const [medications, setMedications] = useState([]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock patient data
  const patient = {
    nom: "Khadija Bennis",
    cin: "AA123456",
    dateNaissance: "12/05/1990",
    groupeSanguin: "A+",
    telephone: "0612345678",
    allergies: ["Pénicilline"],
  };

  const medicationsByCategory = {
    Antibiotiques: [
      { nom: "Amoxicilline", dosageStandard: "500mg" },
      { nom: "Azithromycine", dosageStandard: "250mg" },
      { nom: "Ciprofloxacine", dosageStandard: "500mg" },
    ],
    Analgésiques: [
      { nom: "Paracétamol", dosageStandard: "500mg" },
      { nom: "Ibuprofène", dosageStandard: "400mg" },
      { nom: "Tramadol", dosageStandard: "50mg" },
    ],
    "Anti-inflammatoires": [
      { nom: "Diclofénac", dosageStandard: "50mg" },
      { nom: "Naproxène", dosageStandard: "250mg" },
    ],
    Antihypertenseurs: [
      { nom: "Amlodipine", dosageStandard: "5mg" },
      { nom: "Enalapril", dosageStandard: "10mg" },
      { nom: "Losartan", dosageStandard: "50mg" },
    ],
    Antidiabétiques: [
      { nom: "Metformine", dosageStandard: "850mg" },
      { nom: "Glibenclamide", dosageStandard: "5mg" },
    ],
    Antihistaminiques: [
      { nom: "Cétirizine", dosageStandard: "10mg" },
      { nom: "Loratadine", dosageStandard: "10mg" },
    ],
    Cardiovasculaires: [
      { nom: "Aspirine", dosageStandard: "100mg" },
      { nom: "Clopidogrel", dosageStandard: "75mg" },
    ],
    "Vitamines & Suppléments": [
      { nom: "Vitamine D", dosageStandard: "1000 UI" },
      { nom: "Calcium", dosageStandard: "500mg" },
      { nom: "Fer", dosageStandard: "80mg" },
    ],
    Autres: [],
  };

  const allMedications = Object.values(medicationsByCategory).flat();

  const filteredMedications = allMedications.filter((med) =>
    med.nom.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [tempMedication, setTempMedication] = useState({
    nom: "",
    dosage: "",
    frequence: "",
    duree: "",
    unite: "jours",
    instructions: "",
  });

  const handleSelectMedication = (med) => {
    setTempMedication({
      ...tempMedication,
      nom: med.nom,
      dosage: med.dosageStandard,
    });
  };

  const handleAddMedication = () => {
    if (
      tempMedication.nom &&
      tempMedication.dosage &&
      tempMedication.frequence &&
      tempMedication.duree
    ) {
      setMedications([...medications, { ...tempMedication, id: Date.now() }]);
      setTempMedication({
        nom: "",
        dosage: "",
        frequence: "",
        duree: "",
        unite: "jours",
        instructions: "",
      });
      setShowMedicationModal(false);
      setSelectedCategory("");
      setSearchQuery("");
    }
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const getBloodTypeColor = (type) => {
    const colors = {
      "A+": "#DC3545",
      "A-": "#DC3545",
      "B+": "#007BFF",
      "B-": "#007BFF",
      "AB+": "#6F42C1",
      "AB-": "#6F42C1",
      "O+": "#28A745",
      "O-": "#28A745",
    };
    return colors[type] || "#007BFF";
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
            Rapport de consultation
          </h1>
          <p style={{ color: "#777777" }}>
            Complétez les détails de la consultation médicale
          </p>
        </div>

        {/* Report Form */}
        <Card
          className="border-2"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
        >
          <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
            <CardTitle style={{ color: "#333333" }}>
              Informations de consultation
            </CardTitle>
            <CardDescription style={{ color: "#777777" }}>
              Tous les champs marqués * sont obligatoires
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Patient Identity Card */}
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "#E6F0FF", borderColor: "#007BFF" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <User className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      Nom complet
                    </div>
                    <div style={{ color: "#007BFF", fontWeight: "bold" }}>
                      {patient.nom}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      CIN
                    </div>
                    <div style={{ color: "#333333" }}>{patient.cin}</div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      Date de naissance
                    </div>
                    <div style={{ color: "#333333" }}>
                      {patient.dateNaissance}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      Groupe sanguin
                    </div>
                    <Badge
                      style={{
                        backgroundColor: getBloodTypeColor(
                          patient.groupeSanguin,
                        ),
                        color: "#FFFFFF",
                      }}
                    >
                      {patient.groupeSanguin}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      Téléphone
                    </div>
                    <div style={{ color: "#333333" }}>{patient.telephone}</div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: "#777777" }}>
                      Allergies connues
                    </div>
                    {patient.allergies.length > 0 ? (
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: "#DC3545",
                          color: "#DC3545",
                        }}
                      >
                        {patient.allergies.join(", ")}
                      </Badge>
                    ) : (
                      <span style={{ color: "#777777" }}>
                        Aucune allergie connue
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" style={{ color: "#333333" }}>
                Date de consultation *
              </Label>
              <Input
                id="date"
                type="date"
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
            </div>

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label htmlFor="diagnosis" style={{ color: "#333333" }}>
                Diagnostic *
              </Label>
              <Input
                id="diagnosis"
                placeholder="Entrez le diagnostic principal"
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
            </div>

            {/* Vital Signs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure" style={{ color: "#333333" }}>
                  Tension artérielle
                </Label>
                <Input
                  id="bloodPressure"
                  placeholder="ex: 120/80"
                  className="border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#F5F6FA",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate" style={{ color: "#333333" }}>
                  Fréquence cardiaque
                </Label>
                <Input
                  id="heartRate"
                  placeholder="ex: 72 bpm"
                  className="border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#F5F6FA",
                  }}
                />
              </div>
            </div>

            {/* Medications Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label style={{ color: "#333333" }}>
                  Médicaments prescrits
                </Label>
                <Button
                  size="sm"
                  onClick={() => setShowMedicationModal(true)}
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#FFFFFF",
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un médicament
                </Button>
              </div>

              {medications.length === 0 ? (
                <div
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: "#F5F6FA", color: "#777777" }}
                >
                  Aucun médicament ajouté
                </div>
              ) : (
                <div className="space-y-2">
                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className="p-3 rounded-lg border flex items-start justify-between"
                      style={{ borderColor: "#E6F0FF" }}
                    >
                      <div className="flex-1">
                        <div style={{ color: "#333333", fontWeight: "bold" }}>
                          {med.nom}
                        </div>
                        <div className="text-sm" style={{ color: "#777777" }}>
                          {med.dosage} • {med.frequence} • {med.duree}{" "}
                          {med.unite}
                          {med.instructions && ` • ${med.instructions}`}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveMedication(med.id)}
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <Trash2
                          className="w-4 h-4"
                          style={{ color: "#DC3545" }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" style={{ color: "#333333" }}>
                Notes de consultation *
              </Label>
              <Textarea
                id="notes"
                placeholder="Entrez vos observations et recommandations..."
                rows={6}
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
            </div>

            {/* Follow-up */}
            <div className="space-y-2">
              <Label htmlFor="followUp" style={{ color: "#333333" }}>
                Suivi recommandé
              </Label>
              <Input
                id="followUp"
                placeholder="ex: Rendez-vous dans 2 semaines"
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
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
                className="flex-1 hover:opacity-90"
                style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
              >
                Enregistrer le rapport
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medication Modal */}
      {showMedicationModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowMedicationModal(false)}
        >
          <Card
            className="w-full max-w-xl max-h-[90vh] overflow-auto"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2
                  className="text-2xl"
                  style={{ color: "#333333", fontWeight: "bold" }}
                >
                  Ajouter un médicament
                </h2>
                <button
                  onClick={() => setShowMedicationModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" style={{ color: "#777777" }} />
                </button>
              </div>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-4"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="category">Par catégorie</TabsTrigger>
                  <TabsTrigger value="name">Par nom</TabsTrigger>
                </TabsList>

                <TabsContent value="category" className="space-y-3 mt-4">
                  <div>
                    <Label style={{ color: "#333333" }}>Catégorie</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E6F0FF",
                        }}
                      >
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(medicationsByCategory).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCategory &&
                    medicationsByCategory[selectedCategory].length > 0 && (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {medicationsByCategory[selectedCategory].map(
                          (med, index) => (
                            <div
                              key={index}
                              onClick={() => handleSelectMedication(med)}
                              className="p-3 rounded-lg border cursor-pointer hover:bg-blue-50"
                              style={{
                                borderColor:
                                  tempMedication.nom === med.nom
                                    ? "#007BFF"
                                    : "#E6F0FF",
                                backgroundColor:
                                  tempMedication.nom === med.nom
                                    ? "#E6F0FF"
                                    : "#FFFFFF",
                              }}
                            >
                              <div
                                style={{ color: "#333333", fontWeight: "bold" }}
                              >
                                {med.nom}
                              </div>
                              <div
                                className="text-sm"
                                style={{ color: "#777777" }}
                              >
                                Dosage standard: {med.dosageStandard}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                </TabsContent>

                <TabsContent value="name" className="mt-4">
                  <div className="space-y-3">
                    <Input
                      placeholder="Rechercher un médicament..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                    {searchQuery && (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filteredMedications.map((med, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelectMedication(med)}
                            className="p-3 rounded-lg border cursor-pointer hover:bg-blue-50"
                            style={{
                              borderColor:
                                tempMedication.nom === med.nom
                                  ? "#007BFF"
                                  : "#E6F0FF",
                              backgroundColor:
                                tempMedication.nom === med.nom
                                  ? "#E6F0FF"
                                  : "#FFFFFF",
                            }}
                          >
                            <div
                              style={{ color: "#333333", fontWeight: "bold" }}
                            >
                              {med.nom}
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "#777777" }}
                            >
                              Dosage standard: {med.dosageStandard}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Medication Details */}
              {tempMedication.nom && (
                <div
                  className="space-y-3 mt-4 pt-4 border-t"
                  style={{ borderColor: "#E6F0FF" }}
                >
                  <div>
                    <Label style={{ color: "#333333" }}>Dosage</Label>
                    <Input
                      placeholder="Ex: 500mg"
                      value={tempMedication.dosage}
                      onChange={(e) =>
                        setTempMedication({
                          ...tempMedication,
                          dosage: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>

                  <div>
                    <Label style={{ color: "#333333" }}>Fréquence</Label>
                    <Select
                      value={tempMedication.frequence}
                      onValueChange={(val) =>
                        setTempMedication({ ...tempMedication, frequence: val })
                      }
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E6F0FF",
                        }}
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1x/jour">1x/jour</SelectItem>
                        <SelectItem value="2x/jour">2x/jour</SelectItem>
                        <SelectItem value="3x/jour">3x/jour</SelectItem>
                        <SelectItem value="Matin et soir">
                          Matin et soir
                        </SelectItem>
                        <SelectItem value="Selon besoin">
                          Selon besoin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label style={{ color: "#333333" }}>Durée</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 7"
                        value={tempMedication.duree}
                        onChange={(e) =>
                          setTempMedication({
                            ...tempMedication,
                            duree: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E6F0FF",
                        }}
                      />
                    </div>
                    <div>
                      <Label style={{ color: "#333333" }}>Unité</Label>
                      <Select
                        value={tempMedication.unite}
                        onValueChange={(val) =>
                          setTempMedication({ ...tempMedication, unite: val })
                        }
                      >
                        <SelectTrigger
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E6F0FF",
                          }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jours">jours</SelectItem>
                          <SelectItem value="semaines">semaines</SelectItem>
                          <SelectItem value="mois">mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label style={{ color: "#333333" }}>
                      Instructions spéciales (optionnel)
                    </Label>
                    <Input
                      placeholder="Ex: À prendre avec de la nourriture"
                      value={tempMedication.instructions}
                      onChange={(e) =>
                        setTempMedication({
                          ...tempMedication,
                          instructions: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowMedicationModal(false)}
                  style={{
                    borderColor: "#777777",
                    color: "#777777",
                  }}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleAddMedication}
                  disabled={
                    !tempMedication.nom ||
                    !tempMedication.dosage ||
                    !tempMedication.frequence ||
                    !tempMedication.duree
                  }
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#FFFFFF",
                  }}
                >
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


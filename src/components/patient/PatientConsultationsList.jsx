import { useState } from "react";
import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import {
  Calendar,
  Clipboard,
  Activity,
  User,
  Settings,
  FileText,
  MessageCircle,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

export function PatientConsultationsList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const consultations = [
    {
      id: 1,
      date: "10 Mars 2026",
      motif: "Consultation cardiaque",
      diagnostic: "Hypertension artérielle légère",
      status: "Complétée",
      symptomes: "Fatigue, maux de tête fréquents",
      notes:
        "Patient suit bien le traitement prescrit. Tension artérielle en amélioration.",
      prescriptions: [
        { nom: "Amlodipine", dosage: "5mg, 1x/jour, 30 jours" },
        { nom: "Aspirine", dosage: "100mg, 1x/jour, 30 jours" },
      ],
    },
    {
      id: 2,
      date: "15 Février 2026",
      motif: "Suivi post-traitement",
      diagnostic: "Évolution favorable",
      status: "Complétée",
      symptomes: "Amélioration des symptômes",
      notes:
        "Continuer le traitement actuel pendant 2 semaines supplémentaires.",
      prescriptions: [{ nom: "Paracétamol", dosage: "500mg, selon besoin" }],
    },
    {
      id: 3,
      date: "20 Janvier 2026",
      motif: "Consultation générale",
      diagnostic: "Bilan de santé normal",
      status: "Complétée",
      symptomes: "Contrôle de routine",
      notes: "Aucune anomalie détectée. Recommandation de contrôle annuel.",
      prescriptions: [],
    },
  ];

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  };

  return (
    <div className="flex h-full" style={{ backgroundColor: "#F5F6FA" }}>
      {/* Sidebar */}
      <div
        className="w-64 p-6 flex flex-col"
        style={{ backgroundColor: "#007BFF" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Activity className="w-6 h-6" style={{ color: "#007BFF" }} />
          </div>
          <span className="text-xl" style={{ color: "#FFFFFF" }}>
            MediCabinet
          </span>
        </div>

        {/* User Profile */}
        <div
          className="flex items-center gap-3 mb-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
        >
          <Avatar>
            <AvatarFallback
              style={{ backgroundColor: "#E6F0FF", color: "#007BFF" }}
            >
              OK
            </AvatarFallback>
          </Avatar>
          <div>
            <div style={{ color: "#FFFFFF" }}>Omar Kamali</div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Patient
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Activity className="w-5 h-5" />
            <span>Tableau de bord</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Calendar className="w-5 h-5" />
            <span>Rendez-vous</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            }}
          >
            <FileText className="w-5 h-5" />
            <span>Consultations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <FileText className="w-5 h-5" />
            <span>Dossier médical</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Assistant virtuel</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Clipboard className="w-8 h-8" style={{ color: "#007BFF" }} />
            <h1 className="text-3xl" style={{ color: "#333333" }}>
              Mes Consultations
            </h1>
          </div>

          {/* Filters */}
          <Card
            className="mb-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardContent className="p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label style={{ color: "#333333" }}>Date début</Label>
                  <Input
                    type="date"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Label style={{ color: "#333333" }}>Date fin</Label>
                  <Input
                    type="date"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Label style={{ color: "#333333" }}>Statut</Label>
                  <Select defaultValue="toutes">
                    <SelectTrigger
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes">Toutes</SelectItem>
                      <SelectItem value="completee">Complétée</SelectItem>
                      <SelectItem value="encours">En cours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#FFFFFF",
                  }}
                >
                  Filtrer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultations Table */}
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "#F5F6FA" }}>
                    <TableHead style={{ color: "#333333" }}>Date</TableHead>
                    <TableHead style={{ color: "#333333" }}>Motif</TableHead>
                    <TableHead style={{ color: "#333333" }}>
                      Diagnostic
                    </TableHead>
                    <TableHead style={{ color: "#333333" }}>Statut</TableHead>
                    <TableHead style={{ color: "#333333" }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations.map((consultation, index) => (
                    <TableRow
                      key={consultation.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                      }}
                    >
                      <TableCell style={{ color: "#333333" }}>
                        <div className="flex items-center gap-2">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "#007BFF" }}
                          />
                          {consultation.date}
                        </div>
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {consultation.motif}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {consultation.diagnostic}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: "#28A745",
                            color: "#FFFFFF",
                          }}
                        >
                          {consultation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(consultation)}
                          style={{
                            borderColor: "#007BFF",
                            color: "#007BFF",
                          }}
                        >
                          Voir détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal - Consultation Details */}
      {showModal && selectedConsultation && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <Card
            className="w-full max-w-2xl max-h-[90vh] overflow-auto"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2
                  className="text-2xl"
                  style={{ color: "#333333", fontWeight: "bold" }}
                >
                  Détails de la consultation
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" style={{ color: "#777777" }} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Date */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar
                      className="w-4 h-4"
                      style={{ color: "#007BFF" }}
                    />
                    <span style={{ color: "#777777" }}>Date</span>
                  </div>
                  <p style={{ color: "#333333" }}>
                    {selectedConsultation.date}
                  </p>
                </div>

                {/* Motif */}
                <div>
                  <h3 style={{ color: "#777777", marginBottom: "4px" }}>
                    Motif
                  </h3>
                  <p style={{ color: "#333333" }}>
                    {selectedConsultation.motif}
                  </p>
                </div>

                {/* Symptômes */}
                <div>
                  <h3 style={{ color: "#777777", marginBottom: "4px" }}>
                    Symptômes
                  </h3>
                  <p style={{ color: "#333333" }}>
                    {selectedConsultation.symptomes}
                  </p>
                </div>

                {/* Diagnostic */}
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "#E6F0FF" }}
                >
                  <h3
                    style={{
                      color: "#007BFF",
                      marginBottom: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    Diagnostic
                  </h3>
                  <p style={{ color: "#333333" }}>
                    {selectedConsultation.diagnostic}
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <h3 style={{ color: "#777777", marginBottom: "4px" }}>
                    Notes du médecin
                  </h3>
                  <p style={{ color: "#777777", fontStyle: "italic" }}>
                    {selectedConsultation.notes}
                  </p>
                </div>

                {/* Prescriptions */}
                <div>
                  <h3
                    style={{
                      color: "#333333",
                      marginBottom: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Prescriptions associées
                  </h3>
                  {selectedConsultation.prescriptions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultation.prescriptions.map((med, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 rounded-full"
                          style={{
                            backgroundColor: "#E6F0FF",
                            color: "#007BFF",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>{med.nom}</span>
                          <span style={{ color: "#777777" }}>
                            {" "}
                            — {med.dosage}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#777777" }}>Aucune prescription</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  style={{
                    borderColor: "#777777",
                    color: "#777777",
                  }}
                >
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


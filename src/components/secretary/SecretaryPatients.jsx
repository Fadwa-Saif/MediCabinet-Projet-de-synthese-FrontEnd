import { useState } from "react";
import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { Textarea } from "../ui/textarea.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import {
  Search,
  UserPlus,
  Calendar,
  Users,
  Bell,
  Settings,
  Activity,
  X,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

export function SecretaryPatients() {
  const [showModal, setShowModal] = useState(false);

  const patients = [
    {
      id: 1,
      nom: "Bennis",
      prenom: "Khadija",
      cin: "AA123456",
      telephone: "0612345678",
      dateNaissance: "12/05/1990",
      dernierRDV: "10 Mars 2026",
    },
    {
      id: 2,
      nom: "Kamali",
      prenom: "Omar",
      cin: "BB987654",
      telephone: "0623456789",
      dateNaissance: "15/03/1985",
      dernierRDV: "15 Mars 2026",
    },
    {
      id: 3,
      nom: "Chafik",
      prenom: "Leila",
      cin: "CC456789",
      telephone: "0634567890",
      dateNaissance: "08/11/1992",
      dernierRDV: "22 Février 2026",
    },
    {
      id: 4,
      nom: "Bennani",
      prenom: "Youssef",
      cin: "DD234567",
      telephone: "0645678901",
      dateNaissance: "20/07/1988",
      dernierRDV: "05 Mars 2026",
    },
  ];

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
              SE
            </AvatarFallback>
          </Avatar>
          <div>
            <div style={{ color: "#FFFFFF" }}>Siham El Idrissi</div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Secrétaire
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
            <span>Accueil</span>
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
            <Users className="w-5 h-5" />
            <span>Patients</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl" style={{ color: "#333333" }}>
              Gestion des Patients
            </h1>
            <Button
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: "#28A745",
                color: "#FFFFFF",
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau Patient
            </Button>
          </div>

          {/* Search Bar */}
          <Card
            className="mb-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardContent className="p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#777777" }}
                />
                <Input
                  placeholder="Rechercher un patient (nom, CIN, téléphone)..."
                  className="pl-10"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Patients Table */}
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "#F5F6FA" }}>
                    <TableHead style={{ color: "#333333" }}>Nom</TableHead>
                    <TableHead style={{ color: "#333333" }}>Prénom</TableHead>
                    <TableHead style={{ color: "#333333" }}>CIN</TableHead>
                    <TableHead style={{ color: "#333333" }}>
                      Téléphone
                    </TableHead>
                    <TableHead style={{ color: "#333333" }}>
                      Date de naissance
                    </TableHead>
                    <TableHead style={{ color: "#333333" }}>
                      Dernier RDV
                    </TableHead>
                    <TableHead style={{ color: "#333333" }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient, index) => (
                    <TableRow
                      key={patient.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                      }}
                    >
                      <TableCell style={{ color: "#333333" }}>
                        {patient.nom}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {patient.prenom}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {patient.cin}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {patient.telephone}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {patient.dateNaissance}
                      </TableCell>
                      <TableCell style={{ color: "#333333" }}>
                        {patient.dernierRDV}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            borderColor: "#007BFF",
                            color: "#007BFF",
                          }}
                        >
                          Voir dossier
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

      {/* Modal - New Patient */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <Card
            className="w-full max-w-2xl"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2
                  className="text-2xl"
                  style={{ color: "#007BFF", fontWeight: "bold" }}
                >
                  Créer un compte patient
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" style={{ color: "#777777" }} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label style={{ color: "#333333" }}>Nom</Label>
                    <Input
                      placeholder="Ex: Bennani"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: "#333333" }}>Prénom</Label>
                    <Input
                      placeholder="Ex: Fatima"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label style={{ color: "#333333" }}>CIN</Label>
                    <Input
                      placeholder="AA123456"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: "#333333" }}>Téléphone</Label>
                    <Input
                      placeholder="0612345678"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label style={{ color: "#333333" }}>
                      Date de naissance
                    </Label>
                    <Input
                      type="date"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: "#333333" }}>Groupe sanguin</Label>
                    <Select>
                      <SelectTrigger
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E6F0FF",
                        }}
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Full width fields */}
                <div>
                  <Label style={{ color: "#333333" }}>Adresse</Label>
                  <Input
                    placeholder="Ex: 123 Avenue Hassan II, Casablanca"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: "#333333" }}>
                    Antécédents médicaux
                  </Label>
                  <Textarea
                    placeholder="Indiquer les antécédents médicaux connus..."
                    rows={3}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  style={{
                    borderColor: "#777777",
                    color: "#777777",
                  }}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#FFFFFF",
                  }}
                >
                  Créer le compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


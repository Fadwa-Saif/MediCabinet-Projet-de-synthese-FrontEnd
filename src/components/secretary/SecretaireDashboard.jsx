import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";
import {
  Calendar,
  Users,
  Bell,
  Settings,
  LogOut,
  UserPlus,
  Clock,
  MessageCircle,
  Activity,
} from "lucide-react";

export function SecretaireDashboard() {
  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "Khadija Bennis",
      motif: "Consultation générale",
      status: "Confirmé",
      statusColor: "#28A745",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Omar Kamali",
      motif: "Suivi cardiologique",
      status: "En attente",
      statusColor: "#007BFF",
    },
    {
      id: 3,
      time: "11:15",
      patient: "Leila Chafik",
      motif: "Contrôle dermatologique",
      status: "Confirmé",
      statusColor: "#28A745",
    },
    {
      id: 4,
      time: "14:00",
      patient: "Youssef Bennani",
      motif: "Bilan de santé",
      status: "Annulé",
      statusColor: "#DC3545",
    },
  ];

  const patients = [
    {
      id: 1,
      nom: "Bennis",
      prenom: "Khadija",
      cin: "M234567",
      telephone: "0612345678",
      dernierRDV: "28 Oct 2025",
    },
    {
      id: 2,
      nom: "Kamali",
      prenom: "Omar",
      cin: "K567890",
      telephone: "0623456789",
      dernierRDV: "27 Oct 2025",
    },
    {
      id: 3,
      nom: "Chafik",
      prenom: "Leila",
      cin: "L890123",
      telephone: "0634567890",
      dernierRDV: "25 Oct 2025",
    },
    {
      id: 4,
      nom: "Bennani",
      prenom: "Youssef",
      cin: "Y123456",
      telephone: "0645678901",
      dernierRDV: "24 Oct 2025",
    },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <aside
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            }}
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
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
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto p-8 space-y-6"
        style={{ backgroundColor: "#F5F6FA" }}
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2" style={{ color: "#333333" }}>
            Tableau de bord
          </h1>
          <p style={{ color: "#777777" }}>
            Gestion des rendez-vous et des patients
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6">
          <Card
            className="border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "#007BFF" }}>
              <CardDescription style={{ color: "#FFFFFF" }}>
                Rendez-vous aujourd'hui
              </CardDescription>
              <CardTitle className="text-3xl" style={{ color: "#FFFFFF" }}>
                {todayAppointments.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: "#007BFF" }} />
                <span className="text-sm" style={{ color: "#777777" }}>
                  Mardi, 28 Oct 2025
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "#007BFF" }}>
              <CardDescription style={{ color: "#FFFFFF" }}>
                Patients enregistrés
              </CardDescription>
              <CardTitle className="text-3xl" style={{ color: "#FFFFFF" }}>
                {patients.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: "#007BFF" }} />
                <span className="text-sm" style={{ color: "#777777" }}>
                  Base de données
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "#28A745" }}>
              <CardDescription style={{ color: "#FFFFFF" }}>
                Rappels envoyés
              </CardDescription>
              <CardTitle className="text-3xl" style={{ color: "#FFFFFF" }}>
                12
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" style={{ color: "#28A745" }} />
                <span className="text-sm" style={{ color: "#777777" }}>
                  Cette semaine
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planning du jour */}
        <Card style={{ backgroundColor: "#FFFFFF" }}>
          <CardHeader>
            <CardTitle style={{ color: "#333333" }}>Planning du jour</CardTitle>
            <CardDescription style={{ color: "#777777" }}>
              Rendez-vous de la journée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "#E6F0FF" }}>
                  <TableHead style={{ color: "#333333" }}>Heure</TableHead>
                  <TableHead style={{ color: "#333333" }}>Patient</TableHead>
                  <TableHead style={{ color: "#333333" }}>Motif</TableHead>
                  <TableHead style={{ color: "#333333" }}>Statut</TableHead>
                  <TableHead style={{ color: "#333333" }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.map((appointment, index) => (
                  <TableRow
                    key={appointment.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                      borderColor: "#E6F0FF",
                    }}
                  >
                    <TableCell style={{ color: "#333333" }}>
                      <div className="flex items-center gap-2">
                        <Clock
                          className="w-4 h-4"
                          style={{ color: "#777777" }}
                        />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell style={{ color: "#333333" }}>
                      {appointment.patient}
                    </TableCell>
                    <TableCell style={{ color: "#777777" }}>
                      {appointment.motif}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: appointment.statusColor,
                          color: "#FFFFFF",
                        }}
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "#28A745",
                            color: "#FFFFFF",
                          }}
                        >
                          Confirmer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          style={{ borderColor: "#DC3545", color: "#DC3545" }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Gestion des Patients */}
        <Card style={{ backgroundColor: "#FFFFFF" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle style={{ color: "#333333" }}>
                Gestion des Patients
              </CardTitle>
              <CardDescription style={{ color: "#777777" }}>
                Liste des patients enregistrés
              </CardDescription>
            </div>
            <Button
              className="hover:opacity-90"
              style={{ backgroundColor: "#28A745", color: "#FFFFFF" }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau Patient
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "#E6F0FF" }}>
                  <TableHead style={{ color: "#333333" }}>Nom</TableHead>
                  <TableHead style={{ color: "#333333" }}>Prénom</TableHead>
                  <TableHead style={{ color: "#333333" }}>CIN</TableHead>
                  <TableHead style={{ color: "#333333" }}>Téléphone</TableHead>
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
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                      borderColor: "#E6F0FF",
                    }}
                  >
                    <TableCell style={{ color: "#333333" }}>
                      {patient.nom}
                    </TableCell>
                    <TableCell style={{ color: "#333333" }}>
                      {patient.prenom}
                    </TableCell>
                    <TableCell style={{ color: "#777777" }}>
                      {patient.cin}
                    </TableCell>
                    <TableCell style={{ color: "#777777" }}>
                      {patient.telephone}
                    </TableCell>
                    <TableCell style={{ color: "#777777" }}>
                      {patient.dernierRDV}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: "#007BFF" }}
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
      </main>
    </div>
  );
}


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
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";
import {
  Calendar,
  FileText,
  LogOut,
  Clipboard,
  MessageCircle,
  Activity,
  User,
} from "lucide-react";

export function PatientDashboard() {
  // Mock data for past consultations
  const pastConsultations = [
    {
      id: 1,
      date: "05 Oct 2025",
      diagnosis: "Examen de routine",
      status: "Complété",
    },
    {
      id: 2,
      date: "12 Sep 2025",
      diagnosis: "Contrôle de la vue",
      status: "Complété",
    },
    {
      id: 3,
      date: "28 Août 2025",
      diagnosis: "Bilan cardiaque",
      status: "Complété",
    },
    {
      id: 4,
      date: "15 Juil 2025",
      diagnosis: "Consultation générale",
      status: "Complété",
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            }}
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
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
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "#F5F6FA" }}
      >
        <div className="p-8 space-y-6">
          {/* Welcome Message */}
          <div>
            <h1 className="text-3xl mb-2" style={{ color: "#333333" }}>
              Bienvenue, Omar Kamali
            </h1>
            <p style={{ color: "#777777" }}>
              Voici un aperçu de vos rendez-vous et consultations
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: "#777777" }}>
                      Consultations totales
                    </p>
                    <p className="text-2xl mt-1" style={{ color: "#333333" }}>
                      {pastConsultations.length}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#E6F0FF" }}
                  >
                    <FileText
                      className="w-6 h-6"
                      style={{ color: "#007BFF" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: "#777777" }}>
                      Statut
                    </p>
                    <Badge
                      className="mt-1"
                      style={{ backgroundColor: "#28A745", color: "#FFFFFF" }}
                    >
                      Actif
                    </Badge>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#E6F0FF" }}
                  >
                    <User className="w-6 h-6" style={{ color: "#007BFF" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Past Consultations */}
          <Card style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader>
              <CardTitle style={{ color: "#333333" }}>
                Consultations passées
              </CardTitle>
              <CardDescription style={{ color: "#777777" }}>
                Historique de vos consultations médicales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "#E6F0FF" }}>
                    <TableHead style={{ color: "#333333" }}>Date</TableHead>
                    <TableHead style={{ color: "#333333" }}>
                      Diagnostic
                    </TableHead>
                    <TableHead style={{ color: "#333333" }}>Statut</TableHead>
                    <TableHead style={{ color: "#333333" }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastConsultations.map((consultation, index) => (
                    <TableRow
                      key={consultation.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                        borderColor: "#E6F0FF",
                      }}
                    >
                      <TableCell style={{ color: "#333333" }}>
                        {consultation.date}
                      </TableCell>
                      <TableCell style={{ color: "#777777" }}>
                        {consultation.diagnosis}
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
                          variant="ghost"
                          size="sm"
                          style={{ color: "#007BFF" }}
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
    </div>
  );
}


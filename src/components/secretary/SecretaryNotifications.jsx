import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import {
  Bell,
  Calendar,
  Users,
  Activity,
  Settings,
  MessageCircle,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

export function SecretaryNotifications() {
  const reminders = [
    {
      id: 1,
      patient: "Khadija Bennis",
      heureRDV: "09:00",
      motif: "Consultation cardiaque",
      rappelEnvoye: false,
    },
    {
      id: 2,
      patient: "Omar Kamali",
      heureRDV: "10:30",
      motif: "Suivi post-traitement",
      rappelEnvoye: true,
    },
    {
      id: 3,
      patient: "Leila Chafik",
      heureRDV: "14:00",
      motif: "Consultation générale",
      rappelEnvoye: false,
    },
  ];

  const notificationHistory = [
    {
      id: 1,
      date: "24 Mars 2026",
      patient: "Youssef Bennani",
      type: "Confirmation",
      canal: "email",
      statut: "Envoyé",
    },
    {
      id: 2,
      date: "23 Mars 2026",
      patient: "Salma Chafik",
      type: "Rappel",
      canal: "web",
      statut: "Envoyé",
    },
    {
      id: 3,
      date: "22 Mars 2026",
      patient: "Fatima El Idrissi",
      type: "Annulation",
      canal: "email",
      statut: "Échec",
    },
    {
      id: 4,
      date: "21 Mars 2026",
      patient: "Omar Kamali",
      type: "Confirmation",
      canal: "email",
      statut: "Envoyé",
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      Confirmation: "#007BFF",
      Rappel: "#FFA500",
      Annulation: "#DC3545",
    };
    return colors[type] || "#007BFF";
  };

  return (
    <div className="flex h-full" style={{ backgroundColor: "#F5F6FA" }}>
      {/* Sidebar */}
      <div
        className="w-64 p-6 flex flex-col"
        style={{ backgroundColor: "#007BFF" }}
      >
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Users className="w-5 h-5" />
            <span>Patients</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            }}
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
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-8 h-8" style={{ color: "#007BFF" }} />
            <h1 className="text-3xl" style={{ color: "#333333" }}>
              Rappels & Notifications
            </h1>
          </div>

          {/* Section: Reminders to Send */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ color: "#333333" }}>
                Rappels RDV à envoyer
              </h2>
              <Button style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}>
                <Send className="w-4 h-4 mr-2" />
                Envoyer tous les rappels
              </Button>
            </div>

            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "#F5F6FA" }}>
                      <TableHead style={{ color: "#333333" }}>
                        Patient
                      </TableHead>
                      <TableHead style={{ color: "#333333" }}>
                        Heure du RDV
                      </TableHead>
                      <TableHead style={{ color: "#333333" }}>Motif</TableHead>
                      <TableHead style={{ color: "#333333" }}>
                        Rappel envoyé
                      </TableHead>
                      <TableHead style={{ color: "#333333" }}>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reminders.map((reminder, index) => (
                      <TableRow
                        key={reminder.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                        }}
                      >
                        <TableCell style={{ color: "#333333" }}>
                          {reminder.patient}
                        </TableCell>
                        <TableCell style={{ color: "#333333" }}>
                          {reminder.heureRDV}
                        </TableCell>
                        <TableCell style={{ color: "#333333" }}>
                          {reminder.motif}
                        </TableCell>
                        <TableCell>
                          <Badge
                            style={{
                              backgroundColor: reminder.rappelEnvoye
                                ? "#28A745"
                                : "#777777",
                              color: "#FFFFFF",
                            }}
                          >
                            {reminder.rappelEnvoye ? "Envoyé" : "Non envoyé"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!reminder.rappelEnvoye && (
                            <Button
                              variant="outline"
                              size="sm"
                              style={{
                                borderColor: "#007BFF",
                                color: "#007BFF",
                              }}
                            >
                              Envoyer rappel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex-1"
              style={{ height: "1px", backgroundColor: "#E6F0FF" }}
            />
            <span style={{ color: "#777777" }}>Historique</span>
            <div
              className="flex-1"
              style={{ height: "1px", backgroundColor: "#E6F0FF" }}
            />
          </div>

          {/* Section: Notification History */}
          <div>
            <h2 className="text-xl mb-4" style={{ color: "#333333" }}>
              Historique des notifications
            </h2>

            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "#F5F6FA" }}>
                      <TableHead style={{ color: "#333333" }}>Date</TableHead>
                      <TableHead style={{ color: "#333333" }}>
                        Patient
                      </TableHead>
                      <TableHead style={{ color: "#333333" }}>Type</TableHead>
                      <TableHead style={{ color: "#333333" }}>Canal</TableHead>
                      <TableHead style={{ color: "#333333" }}>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationHistory.map((notif, index) => (
                      <TableRow
                        key={notif.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                        }}
                      >
                        <TableCell style={{ color: "#333333" }}>
                          {notif.date}
                        </TableCell>
                        <TableCell style={{ color: "#333333" }}>
                          {notif.patient}
                        </TableCell>
                        <TableCell>
                          <Badge
                            style={{
                              backgroundColor: getTypeColor(notif.type),
                              color: "#FFFFFF",
                            }}
                          >
                            {notif.type}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ color: "#333333" }}>
                          {notif.canal}
                        </TableCell>
                        <TableCell>
                          <Badge
                            style={{
                              backgroundColor:
                                notif.statut === "Envoyé"
                                  ? "#28A745"
                                  : "#DC3545",
                              color: "#FFFFFF",
                            }}
                          >
                            {notif.statut}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}


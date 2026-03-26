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
  Calendar,
  Clock,
  Plus,
  Activity,
  User,
  Settings,
  FileText,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

export function PatientAppointmentsList() {
  const upcomingAppointments = [
    {
      id: 1,
      date: "15 Avril 2026",
      time: "10:30",
      motif: "Consultation de suivi - Tension artérielle",
      status: "Confirmé",
      statusColor: "#007BFF",
    },
    {
      id: 2,
      date: "22 Avril 2026",
      time: "14:00",
      motif: "Contrôle général annuel",
      status: "En attente",
      statusColor: "#FFA500",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      date: "10 Mars 2026",
      time: "11:00",
      motif: "Consultation cardiaque",
      status: "Terminé",
    },
    {
      id: 4,
      date: "15 Février 2026",
      time: "09:30",
      motif: "Suivi post-traitement",
      status: "Terminé",
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            }}
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
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" style={{ color: "#007BFF" }} />
              <h1 className="text-3xl" style={{ color: "#333333" }}>
                Mes Rendez-vous
              </h1>
            </div>
            <Button
              style={{
                backgroundColor: "#007BFF",
                color: "#FFFFFF",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Rendez-vous
            </Button>
          </div>

          {/* Filters */}
          <Card
            className="mb-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardContent className="p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label style={{ color: "#333333" }}>Statut</Label>
                  <Select defaultValue="tous">
                    <SelectTrigger
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E6F0FF",
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous</SelectItem>
                      <SelectItem value="confirme">Confirmé</SelectItem>
                      <SelectItem value="attente">En attente</SelectItem>
                      <SelectItem value="annule">Annulé</SelectItem>
                      <SelectItem value="termine">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label style={{ color: "#333333" }}>À partir du</Label>
                  <Input
                    type="date"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
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

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl mb-4" style={{ color: "#333333" }}>
              À venir
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <Card
                  key={apt.id}
                  className="relative overflow-hidden"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
                >
                  {/* Status Strip */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: apt.statusColor }}
                  />

                  <CardContent className="p-4 pl-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "#007BFF" }}
                          />
                          <span
                            className="text-lg"
                            style={{ color: "#007BFF", fontWeight: "bold" }}
                          >
                            {apt.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock
                            className="w-4 h-4"
                            style={{ color: "#007BFF" }}
                          />
                          <span
                            className="text-lg"
                            style={{ color: "#007BFF", fontWeight: "bold" }}
                          >
                            {apt.time}
                          </span>
                        </div>
                      </div>
                      <Badge
                        style={{
                          backgroundColor: apt.statusColor,
                          color: "#FFFFFF",
                        }}
                      >
                        {apt.status}
                      </Badge>
                    </div>

                    <p className="mb-4" style={{ color: "#333333" }}>
                      {apt.motif}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          borderColor: "#007BFF",
                          color: "#007BFF",
                        }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          borderColor: "#DC3545",
                          color: "#DC3545",
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Appointments */}
          <div>
            <div className="flex items-center gap-4 mb-4">
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

            <div className="space-y-4">
              {pastAppointments.map((apt) => (
                <Card
                  key={apt.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E6F0FF",
                    opacity: 0.8,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "#777777" }}
                          />
                          <span style={{ color: "#777777" }}>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock
                            className="w-4 h-4"
                            style={{ color: "#777777" }}
                          />
                          <span style={{ color: "#777777" }}>{apt.time}</span>
                        </div>
                      </div>
                      <Badge
                        style={{
                          backgroundColor: "#28A745",
                          color: "#FFFFFF",
                        }}
                      >
                        {apt.status}
                      </Badge>
                    </div>

                    <p className="mb-4" style={{ color: "#777777" }}>
                      {apt.motif}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        borderColor: "#777777",
                        color: "#777777",
                      }}
                    >
                      Voir détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


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
import { Textarea } from "../ui/textarea.jsx";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Activity,
  Users,
  Bell,
  Settings,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";

export function SecretaryAppointments() {
  const [view, setView] = useState("week"); // week, day, list
  const [showNewAppointmentPanel, setShowNewAppointmentPanel] = useState(false);

  const appointments = [
    {
      id: 1,
      time: "09:00",
      patient: "Khadija Bennis",
      motif: "Consultation cardiaque",
      status: "Confirmé",
      color: "#007BFF",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Omar Kamali",
      motif: "Suivi post-traitement",
      status: "Confirmé",
      color: "#007BFF",
    },
    {
      id: 3,
      time: "14:00",
      patient: "Leila Chafik",
      motif: "Consultation générale",
      status: "En attente",
      color: "#FFA500",
    },
    {
      id: 4,
      time: "15:30",
      patient: "Youssef Bennani",
      motif: "Contrôle annuel",
      status: "Annulé",
      color: "#DC3545",
    },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

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
      <div className="flex-1 flex">
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl" style={{ color: "#333333" }}>
              Planning des Rendez-vous
            </h1>
            <Button
              onClick={() =>
                setShowNewAppointmentPanel(!showNewAppointmentPanel)
              }
              style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau RDV
            </Button>
          </div>

          {/* Calendar Navigation */}
          <Card
            className="mb-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ borderColor: "#E6F0FF" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span style={{ color: "#333333", fontWeight: "bold" }}>
                    25 - 31 Mars 2026
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ borderColor: "#E6F0FF" }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ borderColor: "#007BFF", color: "#007BFF" }}
                  >
                    Aujourd'hui
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setView("week")}
                    style={{
                      backgroundColor: view === "week" ? "#007BFF" : "#FFFFFF",
                      color: view === "week" ? "#FFFFFF" : "#333333",
                      border: "1px solid #E6F0FF",
                    }}
                  >
                    Semaine
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setView("day")}
                    style={{
                      backgroundColor: view === "day" ? "#007BFF" : "#FFFFFF",
                      color: view === "day" ? "#FFFFFF" : "#333333",
                      border: "1px solid #E6F0FF",
                    }}
                  >
                    Jour
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setView("list")}
                    style={{
                      backgroundColor: view === "list" ? "#007BFF" : "#FFFFFF",
                      color: view === "list" ? "#FFFFFF" : "#333333",
                      border: "1px solid #E6F0FF",
                    }}
                  >
                    Liste
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Week View (simplified) */}
          {view === "week" && (
            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-8 gap-2">
                  <div className="text-sm" style={{ color: "#777777" }}>
                    Heure
                  </div>
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center"
                        style={{ color: "#333333", fontWeight: "bold" }}
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2">
                      <div
                        className="text-sm py-2"
                        style={{ color: "#777777" }}
                      >
                        {time}
                      </div>
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="border rounded p-1 min-h-[40px]"
                          style={{
                            borderColor: "#E6F0FF",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          {/* Appointments would go here */}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* List View */}
          {view === "list" && (
            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardContent className="p-0">
                <table className="w-full">
                  <thead style={{ backgroundColor: "#F5F6FA" }}>
                    <tr>
                      <th
                        className="p-3 text-left"
                        style={{ color: "#333333" }}
                      >
                        Heure
                      </th>
                      <th
                        className="p-3 text-left"
                        style={{ color: "#333333" }}
                      >
                        Patient
                      </th>
                      <th
                        className="p-3 text-left"
                        style={{ color: "#333333" }}
                      >
                        Motif
                      </th>
                      <th
                        className="p-3 text-left"
                        style={{ color: "#333333" }}
                      >
                        Statut
                      </th>
                      <th
                        className="p-3 text-left"
                        style={{ color: "#333333" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt, index) => (
                      <tr
                        key={apt.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                        }}
                      >
                        <td className="p-3" style={{ color: "#333333" }}>
                          {apt.time}
                        </td>
                        <td className="p-3" style={{ color: "#333333" }}>
                          {apt.patient}
                        </td>
                        <td className="p-3" style={{ color: "#333333" }}>
                          {apt.motif}
                        </td>
                        <td className="p-3">
                          <Badge
                            style={{
                              backgroundColor: apt.color,
                              color: "#FFFFFF",
                            }}
                          >
                            {apt.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {apt.status !== "Confirmé" && (
                              <Button
                                size="sm"
                                style={{
                                  backgroundColor: "#28A745",
                                  color: "#FFFFFF",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                }}
                              >
                                Confirmer
                              </Button>
                            )}
                            {apt.status !== "Annulé" && (
                              <Button
                                variant="outline"
                                size="sm"
                                style={{
                                  borderColor: "#DC3545",
                                  color: "#DC3545",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                }}
                              >
                                Annuler
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Right Panel - New Appointment */}
        {showNewAppointmentPanel && (
          <div
            className="w-80 p-6 border-l"
            style={{ backgroundColor: "#F5F6FA", borderColor: "#E6F0FF" }}
          >
            <h3
              className="mb-4"
              style={{ color: "#333333", fontWeight: "bold" }}
            >
              Nouveau RDV
            </h3>
            <div className="space-y-4">
              <div>
                <Label style={{ color: "#333333" }}>Patient</Label>
                <Select>
                  <SelectTrigger
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  >
                    <SelectValue placeholder="Rechercher..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Khadija Bennis</SelectItem>
                    <SelectItem value="2">Omar Kamali</SelectItem>
                    <SelectItem value="3">Leila Chafik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label style={{ color: "#333333" }}>Motif</Label>
                <Textarea
                  rows={2}
                  placeholder="Motif de la consultation..."
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
                />
              </div>

              <div>
                <Label style={{ color: "#333333" }}>Date</Label>
                <Input
                  type="date"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
                />
              </div>

              <div>
                <Label style={{ color: "#333333" }}>Créneaux disponibles</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["09:00", "09:30", "10:00", "10:30", "14:00", "14:30"].map(
                    (slot) => (
                      <Button
                        key={slot}
                        size="sm"
                        variant="outline"
                        style={{ borderColor: "#007BFF", color: "#007BFF" }}
                      >
                        {slot}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
              >
                Enregistrer le RDV
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


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
import { Textarea } from "../ui/textarea.jsx";
import { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  LogOut,
  Clock,
  MessageCircle,
  Bell,
  FileTextIcon,
  CheckCircle,
  Activity,
} from "lucide-react";

export function DoctorDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      patientName: "Khadija Bennis",
      message: "A envoyé une nouvelle analyse",
      time: "il y a 10 min",
      type: "analysis",
      isRead: false,
    },
    {
      id: 2,
      patientName: "Youssef Bennani",
      message: "A envoyé une nouvelle analyse",
      time: "il y a 45 min",
      type: "analysis",
      isRead: false,
    },
    {
      id: 3,
      patientName: "Leila Chafik",
      message: "Consultation terminée",
      time: "il y a 3h",
      type: "completed",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const todayAppointments = [
    {
      id: 1,
      patientName: "Khadija Bennis",
      time: "09:00",
      status: "Confirmé",
      statusColor: "#28A745",
    },
    {
      id: 2,
      patientName: "Youssef Bennani",
      time: "10:30",
      status: "En attente",
      statusColor: "#007BFF",
    },
    {
      id: 3,
      patientName: "Leila Chafik",
      time: "11:15",
      status: "Confirmé",
      statusColor: "#28A745",
    },
    {
      id: 4,
      patientName: "Omar Boukhari",
      time: "14:00",
      status: "Annulé",
      statusColor: "#DC3545",
    },
    {
      id: 5,
      patientName: "Siham El Idrissi",
      time: "15:30",
      status: "Confirmé",
      statusColor: "#28A745",
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
              YK
            </AvatarFallback>
          </Avatar>
          <div>
            <div style={{ color: "#FFFFFF" }}>Dr. Y. Kamali</div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              Cardiologue
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
            <Home className="w-5 h-5" />
            <span>Tableau de bord</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            <Users className="w-5 h-5" />
            <span>Mes patients</span>
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
            <span>Rapports</span>
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div
          className="p-4 flex items-center justify-between relative"
          style={{ backgroundColor: "#0056b3" }}
        >
          <h1 className="text-xl" style={{ color: "#FFFFFF" }}>
            Dr. Youssef Kamali - Cardiologue
          </h1>
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative transition-opacity hover:opacity-85 cursor-pointer"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <Bell className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                {unreadCount > 0 && (
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      top: "-6px",
                      right: "-6px",
                      backgroundColor: "#DC3545",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {unreadCount}
                    </span>
                  </div>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <>
                  {/* Overlay to close on outside click */}
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 40 }}
                    onClick={() => setShowNotifications(false)}
                  />

                  {/* Panel */}
                  <div
                    className="absolute"
                    style={{
                      top: "40px",
                      right: "0",
                      width: "360px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #E6F0FF",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      zIndex: 50,
                      maxHeight: "480px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="flex items-center justify-between"
                      style={{
                        backgroundColor: "#E6F0FF",
                        padding: "14px 16px",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            color: "#333333",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          Notifications
                        </span>
                        <Badge
                          style={{
                            backgroundColor: "#007BFF",
                            color: "#FFFFFF",
                            fontSize: "11px",
                          }}
                        >
                          {unreadCount}
                        </Badge>
                      </div>
                      <button
                        onClick={markAllAsRead}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#007BFF",
                          fontSize: "11px",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Tout marquer comme lu
                      </button>
                    </div>

                    {/* Divider */}
                    <div
                      style={{ height: "1px", backgroundColor: "#E6F0FF" }}
                    />

                    {/* Notifications List */}
                    <div style={{ maxHeight: "380px", overflowY: "auto" }}>
                      {notifications.map((notif, index) => (
                        <div key={notif.id}>
                          <div
                            className="cursor-pointer"
                            style={{
                              backgroundColor: notif.isRead
                                ? "#FFFFFF"
                                : "#F0F7FF",
                              borderLeft: notif.isRead
                                ? "none"
                                : "3px solid #007BFF",
                              padding: "12px 16px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                notif.isRead ? "#F5F6FA" : "#E6F0FF";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                notif.isRead ? "#FFFFFF" : "#F0F7FF";
                            }}
                          >
                            {/* Icon + Text */}
                            <div className="flex gap-3 mb-2">
                              {/* Icon */}
                              <div
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    notif.type === "analysis"
                                      ? "rgba(0, 123, 255, 0.15)"
                                      : "rgba(40, 167, 69, 0.15)",
                                }}
                              >
                                {notif.type === "analysis" ? (
                                  <FileTextIcon
                                    className="w-4 h-4"
                                    style={{ color: "#007BFF" }}
                                  />
                                ) : (
                                  <CheckCircle
                                    className="w-4 h-4"
                                    style={{ color: "#28A745" }}
                                  />
                                )}
                              </div>

                              {/* Text */}
                              <div className="flex-1">
                                <div
                                  style={{
                                    color: "#333333",
                                    fontWeight: "bold",
                                    fontSize: "13px",
                                  }}
                                >
                                  {notif.patientName}
                                </div>
                                <div
                                  style={{ color: "#777777", fontSize: "12px" }}
                                >
                                  {notif.message}
                                </div>
                              </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center justify-between">
                              <div
                                style={{
                                  color: "#777777",
                                  fontSize: "11px",
                                  fontStyle: "italic",
                                }}
                              >
                                {notif.time}
                              </div>

                              {/* Button */}
                              <Button
                                size="sm"
                                variant="outline"
                                style={{
                                  borderColor: "#007BFF",
                                  color: "#007BFF",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  fontSize: "11px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#007BFF";
                                  e.currentTarget.style.color = "#FFFFFF";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.color = "#007BFF";
                                }}
                              >
                                Voir
                              </Button>
                            </div>
                          </div>
                          {index < notifications.length - 1 && (
                            <div
                              style={{
                                height: "1px",
                                backgroundColor: "#F5F6FA",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Footer Divider */}
                    <div
                      style={{ height: "1px", backgroundColor: "#E6F0FF" }}
                    />

                    {/* Footer */}
                    <button
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#FFFFFF",
                        border: "none",
                        borderRadius: "0 0 12px 12px",
                        color: "#007BFF",
                        fontSize: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F5F6FA";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                      }}
                    >
                      Voir toutes les notifications
                    </button>
                  </div>
                </>
              )}
            </div>

            <Avatar>
              <AvatarFallback
                style={{ backgroundColor: "#FFFFFF", color: "#0056b3" }}
              >
                YK
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Area */}
        <main
          className="flex-1 overflow-y-auto p-8 space-y-6"
          style={{ backgroundColor: "#F5F6FA" }}
        >
          {/* Today's Appointments */}
          <Card style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader>
              <CardTitle style={{ color: "#333333" }}>
                Rendez-vous du jour
              </CardTitle>
              <CardDescription style={{ color: "#777777" }}>
                Mardi, 28 Octobre 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "#E6F0FF" }}>
                    <TableHead style={{ color: "#333333" }}>Patient</TableHead>
                    <TableHead style={{ color: "#333333" }}>Heure</TableHead>
                    <TableHead style={{ color: "#333333" }}>Statut</TableHead>
                    <TableHead style={{ color: "#333333" }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((appointment, index) => (
                    <TableRow
                      key={appointment.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#FFFFFF" : "#F5F6FA",
                        borderColor: "#E6F0FF",
                      }}
                    >
                      <TableCell style={{ color: "#333333" }}>
                        {appointment.patientName}
                      </TableCell>
                      <TableCell style={{ color: "#777777" }}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
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
                        <Button
                          size="sm"
                          className="hover:opacity-90"
                          style={{
                            backgroundColor: "#007BFF",
                            color: "#FFFFFF",
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

          {/* Add Consultation Report */}
          <Card
            className="border-2"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
          >
            <CardHeader>
              <CardTitle style={{ color: "#333333" }}>
                Ajouter un rapport de consultation
              </CardTitle>
              <CardDescription style={{ color: "#777777" }}>
                Remplissez les détails de la consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm" style={{ color: "#333333" }}>
                    Patient
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-md border"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#F5F6FA",
                      color: "#333333",
                    }}
                  >
                    <option>Sélectionner un patient</option>
                    <option>Khadija Bennis</option>
                    <option>Youssef Bennani</option>
                    <option>Leila Chafik</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm" style={{ color: "#333333" }}>
                    Diagnostic
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez le diagnostic"
                    className="w-full px-3 py-2 rounded-md border"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#F5F6FA",
                      color: "#333333",
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm" style={{ color: "#333333" }}>
                  Notes de consultation
                </label>
                <Textarea
                  placeholder="Entrez vos notes..."
                  rows={4}
                  className="border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#F5F6FA",
                    color: "#333333",
                  }}
                />
              </div>
              <Button
                className="w-full hover:opacity-90"
                style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
              >
                Enregistrer le rapport
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}


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
import { Calendar } from "../ui/calendar.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { useState } from "react";

export function AppointmentBooking() {
  const [date, setDate] = useState(new Date());

  const availableSlots = [
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
  ];

  return (
    <div
      className="w-full h-full overflow-y-auto p-8"
      style={{ backgroundColor: "#F5F6FA" }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2" style={{ color: "#333333" }}>
            Prendre un rendez-vous
          </h1>
          <p style={{ color: "#777777" }}>
            Remplissez le formulaire pour réserver votre consultation
          </p>
        </div>

        {/* Booking Form */}
        <Card
          className="border-2"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
        >
          <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
            <CardTitle style={{ color: "#333333" }}>
              Informations du rendez-vous
            </CardTitle>
            <CardDescription style={{ color: "#777777" }}>
              Veuillez fournir tous les détails nécessaires
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patientName" style={{ color: "#333333" }}>
                Nom du patient
              </Label>
              <Input
                id="patientName"
                placeholder="Entrez le nom complet"
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
            </div>

            {/* Motif de consultation */}
            <div className="space-y-2">
              <Label htmlFor="motif" style={{ color: "#333333" }}>
                Motif de consultation{" "}
                <span style={{ color: "#DC3545" }}>*</span>
              </Label>
              <Textarea
                id="motif"
                placeholder="Décrivez brièvement la raison de votre consultation…"
                rows={3}
                className="border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#F5F6FA",
                }}
              />
            </div>

            {/* Date and Time Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="space-y-2">
                <Label style={{ color: "#333333" }}>Date du rendez-vous</Label>
                <div
                  className="border rounded-lg p-3"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E6F0FF",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <Label style={{ color: "#333333" }}>
                  Créneaux horaires disponibles
                </Label>
                <div
                  className="border rounded-lg p-4"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E6F0FF",
                  }}
                >
                  <p className="text-sm mb-3" style={{ color: "#777777" }}>
                    Sélectionnez une heure
                  </p>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={slot}
                        className="px-3 py-2 rounded-md text-sm transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: index === 2 ? "#28A745" : "#007BFF",
                          color: "#FFFFFF",
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full hover:opacity-90"
              style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
            >
              Réserver le rendez-vous
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


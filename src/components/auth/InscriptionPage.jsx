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
import { Activity } from "lucide-react";

export function InscriptionPage() {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#F5F6FA" }}
    >
      {/* Stylized hospital illustration background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1695048441368-e913925d1e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGlsbHVzdHJhdGlvbiUyMHZlY3RvcnxlbnwxfHx8fDE3NjE2ODgwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      {/* Light blue accent overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(230, 240, 255, 0.4) 0%, rgba(245, 246, 250, 0.6) 100%)`,
        }}
      />

      {/* Registration Card */}
      <Card
        className="w-[480px] relative z-10 shadow-lg border-0"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Hospital Logo */}
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007BFF" }}
            >
              <Activity className="w-8 h-8" style={{ color: "#FFFFFF" }} />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl" style={{ color: "#333333" }}>
              Créer un compte MediCabinet
            </CardTitle>
            <CardDescription style={{ color: "#777777" }}>
              Remplissez le formulaire pour vous inscrire
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-2">
            <Label htmlFor="fullname" style={{ color: "#333333" }}>
              Nom complet
            </Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Ex: Fatima Zahra El Amrani"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: "#333333" }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votreemail@exemple.ma"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" style={{ color: "#333333" }}>
              Téléphone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0612345678"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* CIN Input */}
          <div className="space-y-2">
            <Label htmlFor="cin" style={{ color: "#333333" }}>
              CIN (Carte d'identité nationale)
            </Label>
            <Input
              id="cin"
              type="text"
              placeholder="AA123456"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: "#333333" }}>
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 caractères"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" style={{ color: "#333333" }}>
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Retapez votre mot de passe"
              className="border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#F5F6FA",
              }}
            />
          </div>

          {/* Register Button */}
          <Button
            className="w-full"
            style={{
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
            }}
          >
            S'inscrire
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2">
            <span style={{ color: "#777777" }} className="text-sm">
              Vous avez déjà un compte ?{" "}
              <a
                href="#"
                className="hover:underline"
                style={{ color: "#007BFF" }}
              >
                Se connecter
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


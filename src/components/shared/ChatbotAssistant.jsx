import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Badge } from "../ui/badge.jsx";
import { Avatar, AvatarFallback } from "../ui/avatar.jsx";
import { useState } from "react";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Clock,
  Calendar,
  FileText,
  Phone,
  MapPin,
  HelpCircle,
} from "lucide-react";

export function ChatbotAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Bonjour ! Je suis l'assistant virtuel MediCabinet. Comment puis-je vous aider aujourd'hui ?",
      time: "10:30",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Predefined Q&A knowledge base
  const knowledgeBase = {
    horaires: {
      answer:
        "Nos horaires d'ouverture sont :\n\n• Lundi - Vendredi : 09h00 - 18h00\n• Samedi : 09h00 - 13h00\n• Dimanche : Fermé\n\nPour les urgences en dehors de ces horaires, veuillez contacter le 0500000000.",
      keywords: ["horaire", "heure", "ouverture", "fermeture", "quand"],
    },
    "rendez-vous": {
      answer:
        "Pour prendre rendez-vous, vous avez plusieurs options :\n\n1. Via notre plateforme en ligne (section Réservation)\n2. Par téléphone : 0522-123456\n3. Directement à la réception\n\nLes rendez-vous peuvent être pris de 09h00 à 16h30 avec des créneaux de 30 minutes.",
      keywords: [
        "rendez-vous",
        "rdv",
        "réserver",
        "prendre",
        "consultation",
        "réservation",
      ],
    },
    documents: {
      answer:
        "Pour votre consultation, veuillez apporter :\n\n• Votre carte d'identité nationale (CIN)\n• Votre carte d'assurance maladie\n• Vos anciens examens médicaux et ordonnances\n• La liste de vos médicaments actuels\n\nCes documents facilitent votre prise en charge.",
      keywords: [
        "document",
        "papier",
        "apporter",
        "besoin",
        "cin",
        "carte",
        "assurance",
      ],
    },
    annulation: {
      answer:
        "Pour annuler ou modifier un rendez-vous :\n\n• Connectez-vous à votre compte patient\n• Accédez à 'Mes rendez-vous'\n• Sélectionnez le rendez-vous à modifier\n• Cliquez sur 'Annuler' ou 'Modifier'\n\nMerci de nous prévenir au moins 24h à l'avance.",
      keywords: ["annuler", "annulation", "modifier", "changer", "déplacer"],
    },
    tarifs: {
      answer:
        "Nos tarifs de consultation :\n\n• Consultation générale : 300 MAD\n• Consultation de suivi : 250 MAD\n• Consultation d'urgence : 400 MAD\n\nLes examens complémentaires sont facturés séparément. Nous acceptons les cartes de crédit et les paiements en espèces.",
      keywords: [
        "tarif",
        "prix",
        "coût",
        "combien",
        "payer",
        "paiement",
        "mad",
        "dh",
      ],
    },
    adresse: {
      answer:
        "📍 Notre adresse :\n\nMediCabinet\n123 Avenue Hassan II\nCasablanca, Maroc\n\n☎️ Téléphone : 0522-123456\n✉️ Email : contact@medicabinet.ma\n\nNous sommes situés près de la Place des Nations Unies.",
      keywords: [
        "adresse",
        "localisation",
        "où",
        "situé",
        "trouver",
        "contact",
        "téléphone",
        "email",
      ],
    },
    urgence: {
      answer:
        "🚨 En cas d'urgence médicale :\n\n• Appelez le 141 (SAMU)\n• Ou le 150 (Police Secours)\n• Ou le 0500000000 (notre ligne d'urgence)\n\nPour les urgences mineures durant nos horaires, présentez-vous directement à la réception.",
      keywords: ["urgence", "urgent", "grave", "samu", "secours", "aide"],
    },
    assurance: {
      answer:
        "Nous acceptons les principales assurances marocaines :\n\n• CNSS et CNOPS\n• Saham Assurance\n• Atlanta\n• AXA Assurance Maroc\n• Wafa Assurance\n\nVeuillez présenter votre carte d'assurance lors de votre visite.",
      keywords: [
        "assurance",
        "mutuelle",
        "cnss",
        "cnops",
        "remboursement",
        "couverture",
      ],
    },
    résultats: {
      answer:
        "Pour consulter vos résultats d'examens :\n\n• Connectez-vous à votre espace patient\n• Accédez à 'Dossier médical'\n• Consultez l'onglet 'Analyses & Radiologies'\n\nVous recevrez également une notification par email dès que vos résultats sont disponibles.",
      keywords: [
        "résultat",
        "analyse",
        "examen",
        "test",
        "bilan",
        "laboratoire",
      ],
    },
    médecin: {
      answer:
        "Notre cabinet médical est dirigé par :\n\nDr. Youssef Kamali\nCardiologue\n\nExpérience : 15 ans\nSpécialités : Cardiologie générale, échographie cardiaque, électrocardiogramme\n\nLe Dr. Kamali reçoit sur rendez-vous du lundi au vendredi.",
      keywords: [
        "médecin",
        "docteur",
        "cardiologue",
        "spécialiste",
        "dr",
        "kamali",
      ],
    },
  };

  const suggestedQuestions = [
    "Quels sont vos horaires d'ouverture ?",
    "Comment prendre rendez-vous ?",
    "Quels documents dois-je apporter ?",
    "Quels sont vos tarifs ?",
    "Où êtes-vous situés ?",
  ];

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();

    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        return data.answer;
      }
    }

    return "Je suis désolé, je n'ai pas compris votre question. Voici quelques questions fréquentes que je peux traiter :\n\n• Horaires d'ouverture\n• Prise de rendez-vous\n• Documents nécessaires\n• Tarifs de consultation\n• Adresse et contact\n• Assurances acceptées\n• Résultats d'examens\n\nVous pouvez également contacter notre secrétariat au 0522-123456.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const currentTime = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        text: findAnswer(inputValue),
        time: currentTime,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);

    setInputValue("");
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div
      className="w-full h-full overflow-hidden p-8"
      style={{ backgroundColor: "#F5F6FA" }}
    >
      <div className="max-w-5xl mx-auto h-full flex flex-col space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007BFF" }}
            >
              <Bot className="w-6 h-6" style={{ color: "#FFFFFF" }} />
            </div>
            <div>
              <h1 className="text-3xl" style={{ color: "#333333" }}>
                Assistant Virtuel MediCabinet
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#28A745" }}
                />
                <p className="text-sm" style={{ color: "#777777" }}>
                  En ligne - Temps de réponse: instantané
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <Card
              className="flex-1 flex flex-col border-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ color: "#333333" }}>
                      Conversation
                    </CardTitle>
                    <CardDescription style={{ color: "#777777" }}>
                      Posez-moi vos questions sur MediCabinet
                    </CardDescription>
                  </div>
                  <Badge
                    style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {messages.length} messages
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback
                        style={{
                          backgroundColor:
                            message.type === "bot" ? "#007BFF" : "#28A745",
                          color: "#FFFFFF",
                        }}
                      >
                        {message.type === "bot" ? (
                          <Bot className="w-5 h-5" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    {/* Message Bubble */}
                    <div
                      className={`flex-1 max-w-[70%] ${message.type === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor:
                            message.type === "bot" ? "#E6F0FF" : "#007BFF",
                          color: message.type === "bot" ? "#333333" : "#FFFFFF",
                        }}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {message.text}
                        </p>
                        <div
                          className="flex items-center gap-1 mt-2 text-xs"
                          style={{
                            color:
                              message.type === "bot"
                                ? "#777777"
                                : "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{message.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t" style={{ borderColor: "#E6F0FF" }}>
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre question ici..."
                    className="flex-1 border"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E6F0FF",
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="hover:opacity-90"
                    style={{
                      backgroundColor: inputValue.trim()
                        ? "#007BFF"
                        : "#E6F0FF",
                      color: inputValue.trim() ? "#FFFFFF" : "#777777",
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Suggestions & Info */}
          <div className="w-80 flex flex-col gap-4 overflow-y-auto">
            {/* Suggested Questions */}
            <Card
              className="border-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                <CardTitle
                  className="text-lg flex items-center gap-2"
                  style={{ color: "#333333" }}
                >
                  <HelpCircle className="w-5 h-5" />
                  Questions fréquentes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-3 rounded-lg text-sm transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "#F5F6FA",
                      color: "#333333",
                    }}
                  >
                    {question}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Info Cards */}
            <Card
              className="border-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E6F0FF" }}
            >
              <CardHeader style={{ backgroundColor: "#E6F0FF" }}>
                <CardTitle className="text-lg" style={{ color: "#333333" }}>
                  Informations rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E6F0FF" }}
                  >
                    <Clock className="w-5 h-5" style={{ color: "#007BFF" }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: "#333333" }}>
                      Lun-Ven: 09h-18h
                    </p>
                    <p className="text-xs" style={{ color: "#777777" }}>
                      Sam: 09h-13h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E6F0FF" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: "#007BFF" }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: "#333333" }}>
                      0522-123456
                    </p>
                    <p className="text-xs" style={{ color: "#777777" }}>
                      Ligne directe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E6F0FF" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: "#007BFF" }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: "#333333" }}>
                      Avenue Hassan II
                    </p>
                    <p className="text-xs" style={{ color: "#777777" }}>
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Banner */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#007BFF" }}
            >
              <div className="flex items-start gap-3">
                <FileText
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#FFFFFF" }}
                />
                <div>
                  <p className="text-sm mb-1" style={{ color: "#FFFFFF" }}>
                    Besoin d'aide ?
                  </p>
                  <p
                    className="text-xs mb-3"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    Notre équipe est là pour vous aider
                  </p>
                  <Button
                    size="sm"
                    className="w-full"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#007BFF",
                    }}
                  >
                    Contacter le support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


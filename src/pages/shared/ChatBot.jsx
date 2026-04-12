import { useState, useRef, useEffect } from "react";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.REACT_APP_GROQ_KEY;
console.log("Groq Key:", GROQ_API_KEY); // cette ligne existe encore ?
const SYSTEM_PROMPT = `Tu es un assistant médical virtuel intégré dans MediCabinet, un système de gestion de cabinet médical.
Tu aides les utilisateurs (Patients, Secrétaires, Médecins) avec leurs questions liées au cabinet :
- Gestion des rendez-vous
- Informations sur les patients
- Suivi des consultations
- Conseils généraux de santé

Réponds toujours en français, de manière professionnelle et concise.`;

export default function ChatBot({
  userName = "Utilisateur",
  userRole = "Secrétaire",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Bonjour ${userName} ! Comment puis-je vous aider aujourd'hui ? Je peux vous aider à gérer les rendez-vous, rechercher un patient ou préparer les dossiers du jour.`,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const time = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage = { role: "user", content: messageText, time };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const botReply =
        data.choices?.[0]?.message?.content ||
        "Désolé, je n'ai pas pu traiter votre demande.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botReply,
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Erreur Groq:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Une erreur s'est produite. Vérifiez votre connexion et réessayez.",
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    "Rechercher un dossier",
    "Libérer un créneau",
    "Rendez-vous urgents",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-40 ${isOpen ? "hidden" : ""}`}
      >
        <img
          src="/Chatbot-logo.png"
          alt="Chatbot"
          className="w-14 h-14 object-contain"
        />
      </button>

      {/* Chatbot Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-on-background/10 backdrop-blur-[2px] pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 h-full w-[400px] bg-surface-container-lowest shadow-2xl flex flex-col pointer-events-auto border-l border-outline-variant/20">
            {/* Header */}
            <header className="p-6 flex items-center justify-between border-b border-surface-container-high bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white p-1">
                    <img
                      src="/Chatbot-logo.png"
                      alt="Chatbot"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h2 className="text-lg font-headline font-bold text-on-surface">
                    Assistant MediCabinet
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">
                      En ligne
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-surface/30">
              {messages.map((msg, idx) =>
                msg.role === "assistant" ? (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 p-0.5">
                      <img
                        src="/Chatbot-logo.png"
                        alt="Chatbot"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="max-w-[85%]">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed border border-outline-variant/10 whitespace-pre-wrap">
                        {msg.content}
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-2 ml-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="flex items-start flex-row-reverse gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                    </div>
                    <div className="max-w-[85%] text-right">
                      <div className="bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none shadow-md text-sm leading-relaxed">
                        {msg.content}
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-2 mr-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ),
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 ml-11">
                  <span className="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-outline-variant rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <footer className="p-6 bg-surface-container-lowest border-t border-surface-container-high">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="px-3 py-1.5 bg-surface-container-high rounded-full text-[11px] font-bold hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tapez votre message..."
                  disabled={isLoading}
                  className="w-full pl-5 pr-14 py-4 bg-surface rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none text-sm transition-all shadow-inner disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 w-10 h-10 bg-primary text-on-primary rounded-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-40"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                </button>
              </div>

              <p className="text-center text-[10px] text-on-surface-variant mt-4 opacity-50 uppercase tracking-widest font-bold">
                IA Médicale Sécurisée • MediCabinet
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

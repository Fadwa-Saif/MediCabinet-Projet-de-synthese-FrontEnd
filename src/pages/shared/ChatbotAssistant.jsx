import { Navbar } from "../../components/Navbar";

export function ChatbotAssistant() {
  const userData = JSON.parse(localStorage.getItem("medicabinet_user") || "{}");
  const userRole = userData.role || "patient";

  const pageContent = (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Chatbot Assistant
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Chat with our virtual assistant for medical guidance and support.
        </p>
      </div>
    </div>
  );

  return <Navbar userRole={userRole}>{pageContent}</Navbar>;
}

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import ChatBubble from "../chatbot/ChatBubble";
import ChatWindow from "../chatbot/ChatWindow";
import { sendMessage } from "../../services/chatbotService";

function DashboardLayout({ children }) {
    const [chatOpen, setChatOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            text: "Hello! I'm Krishi AI. How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const handleSend = async (message) => {

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: message
            }
        ]);

        setLoading(true);

        try {

            const response = await sendMessage(message);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: response.response
                }
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: error.response?.data?.message || error.message
                }
            ]);

        } finally {

            setLoading(false);

        }

    };
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Section */}

      <div className="flex-1 flex flex-col">

        {/* Navbar */}

        <Navbar />

        {/* Page Content */}

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>
      <ChatBubble onClick={() => setChatOpen(true)} />

      <ChatWindow
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          messages={messages}
          onSend={handleSend}
          loading={loading}
      />

    </div>
  );
}

export default DashboardLayout;
import { MessageCircle } from "lucide-react";

export default function ChatBubble({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full
                 bg-green-700 text-white shadow-2xl
                 hover:bg-green-800 hover:scale-105
                 transition-all duration-300
                 flex items-center justify-center"
    >
      <MessageCircle size={28} strokeWidth={2} />
    </button>
  );
}
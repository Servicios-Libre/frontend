import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

interface Props {
  onSend: (message: string) => Promise<void>;
}

const MessageInput = ({ onSend }: Props) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await onSend(newMessage.trim());
    setNewMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2 items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow text-gray-800 bg-white placeholder-gray-400"
        aria-label="Escribe un mensaje"
      />
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition-all duration-150"
        disabled={newMessage.trim() === ""}
        aria-label="Enviar mensaje"
      >
        <FaPaperPlane className="text-lg" />
      </button>
    </form>
  );
};

export default MessageInput;

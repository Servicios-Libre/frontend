'use client';

import ChatBox from '@/components/chat/ChatBox';
import { ChatMessage, ChatContract } from '@/types';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuthUser } from '@/hooks/useAuthUser';
import { getSocket } from "@/services/chat/socket";
import useSound from "use-sound";
import { toast } from "react-toastify";

export default function ChatDemo() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const { user, token } = useAuthUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contract, setContract] = useState<ChatContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [play] = useSound("/assets/notification.mp3", { volume: 0.5 });

  // Mientras el backend no devuelve info de usuarios, usa valores por defecto
  const clienteName = "Cliente";
  const trabajadorName = "Trabajador";

  // Carga mensajes reales
  useEffect(() => {
    if (!chatId || !token) return;
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessages(res.data))
      .finally(() => setLoading(false));
  }, [chatId, token]);

  // Envía mensaje real
  const handleSendMessage = async (text: string) => {
    if (!user?.id || !token) return;
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, {
      senderId: user.id,
      message: text,
      timestamp: new Date().toISOString(),
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  // Contrato (si lo usás)
  const handleContractCreate = (contractData: ChatContract) => {
    setContract(contractData);
  };
  const handleContractAccept = () => {
    if (contract) setContract(prev => prev && { ...prev, accepted: true });
  };

  useEffect(() => {
    if (!chatId || !user?.id) return;

    const socket = getSocket();
    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
    });

    // Unirse a la sala con el nombre correcto
    socket.emit("joinChat", { chatRoom: `chat_${chatId}` });

    socket.on("newMessage", (msg) => {
      setMessages(prev => {
        // Evita duplicados por id
        if (prev.some(m => m.id === msg.id)) return prev;
        // Notificación solo si el mensaje es de otro usuario
        if (msg.sender !== user.id) {
          toast.info("¡Nuevo mensaje recibido!");
          play();
        }
        return [
          ...prev,
          {
            ...msg,
            message: msg.content,
            senderId: msg.sender,
            timestamp: msg.createdAt || msg.timestamp
          }
        ];
      });
    });

    return () => {
      socket.emit("leaveChat", { chatRoom: `chat_${chatId}` });
      socket.off("newMessage");
      socket.off("connect");
    };
  }, [chatId, user?.id, play]);

  if (loading || !user?.id) return <div className="pt-24 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece5dd] relative">
      <main className="flex-1 flex justify-center items-center">
        {/* Fondo decorativo tipo WhatsApp */}
        <div className="fixed inset-0 z-0 bg-[url('/img/whatsapp-bg.png')] bg-repeat opacity-20 pointer-events-none" />
        <section className="relative z-10 w-full max-w-3xl h-[90vh] flex flex-col">
          <div className="flex-1 flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <ChatBox
              messages={messages}
              onSend={handleSendMessage}
              currentUserId={user.id}
              contract={contract}
              onContractCreate={handleContractCreate}
              onContractAccept={handleContractAccept}
              clienteName={clienteName}
              trabajadorName={trabajadorName}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
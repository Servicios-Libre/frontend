'use client';

import ChatBox from '@/components/chat/ChatBox';
import { ChatMessage, ChatContract } from '@/types';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuthUser } from '@/hooks/useAuthUser';
import { getSocket } from "@/services/chat/socket";

export default function ChatDemo() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const { user, token } = useAuthUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contract, setContract] = useState<ChatContract | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, [chatId, user?.id]);

  if (loading || !user?.id) return <div className="pt-24 text-center">Cargando...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex justify-center items-stretch" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {/* Ajusta paddingTop según el alto real de tu navbar */}
        <div className="w-full max-w-4xl flex flex-col flex-1">
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <ChatBox
              messages={messages}
              onSend={handleSendMessage}
              currentUserId={user.id}
              chatId={chatId}
              contract={contract}
              onContractCreate={handleContractCreate}
              onContractAccept={handleContractAccept}
              clienteName={clienteName}
              trabajadorName={trabajadorName}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
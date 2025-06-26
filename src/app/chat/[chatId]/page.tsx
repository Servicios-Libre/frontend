'use client';

import ChatBox from '@/components/chat/ChatBox';
import { ChatMessage, ChatContract } from '@/types';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuthUser } from '@/hooks/useAuthUser';

export default function ChatDemo() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const { user, token } = useAuthUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contract, setContract] = useState<ChatContract | null>(null);
  const [loading, setLoading] = useState(true);

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
    const newMessage = {
      senderId: user.id,
      message: text,
      timestamp: new Date().toISOString(),
    };
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/messages`, newMessage, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // El backend debe emitir el mensaje por socket
  };

  // Contrato (si lo usás)
  const handleContractCreate = (contractData: ChatContract) => {
    setContract(contractData);
  };
  const handleContractAccept = () => {
    if (contract) setContract(prev => prev && { ...prev, accepted: true });
  };

  if (loading || !user?.id) return <div>Cargando...</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full flex flex-col space-y-6">
          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-md flex-1 min-h-[50vh] overflow-hidden border border-gray-200">
            <div className="p-4 flex flex-col h-full">
              <ChatBox
                messages={messages}
                onSend={handleSendMessage}
                currentUserId={user.id}
                chatId={chatId}
                contract={contract}
                onContractCreate={handleContractCreate}
                onContractAccept={handleContractAccept}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
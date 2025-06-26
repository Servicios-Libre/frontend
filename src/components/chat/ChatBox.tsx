'use client';

import { ChatMessage, ChatContract } from '@/types';
import { useState, useRef, useEffect } from 'react';
import ContractForm from './ContractForm';
import ContractView from './ContractView';
import { getSocket } from '@/services/chat/socket';
import useSound from "use-sound";
import { toast } from "react-toastify";

interface ChatBoxProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  currentUserId: string;
  contract: ChatContract | null;
  onContractCreate: (contract: ChatContract) => void;
  onContractAccept: () => void;
  chatId: string;
  otherUserName?: string;
}

const ChatBox = ({ 
  messages, 
  onSend, 
  currentUserId, 
  contract,
  onContractCreate,
  onContractAccept,
  chatId,
  otherUserName = "Usuario"
}: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showContractForm, setShowContractForm] = useState(false);

  // Usa el sonido desde public/assets/notification.mp3
  const [play] = useSound("/assets/notification.mp3", { volume: 0.5 });

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  useEffect(() => {
    const socket = getSocket();
    socket.emit("joinRoom", chatId);

    const handleReceive = (msg: ChatMessage) => {
      setLocalMessages(prev => [...prev, msg]);
      // Notificación con sonido si el mensaje es de otro usuario
      if (msg.senderId !== currentUserId) {
        console.log("mensaje: ", msg);
        toast.info("¡Nuevo mensaje recibido!");
        play();
      }
    };

    socket.on("receiveMessage", handleReceive);
    console.log("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [chatId, currentUserId, play]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    await onSend(newMessage.trim());
    setNewMessage('');
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col h-full">
      {/* Cabecera del chat */}
      <div className="flex items-center gap-3 mb-4 border-b pb-2">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg">
          {otherUserName.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-gray-700">{otherUserName}</span>
      </div>

      {/* Mensajes */}
      <div className="flex-1 h-64 overflow-y-auto border-b mb-4 space-y-2 pr-2" style={{ maxHeight: '50vh' }}>
        {localMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative px-4 py-2 rounded-2xl text-sm shadow transition-all duration-200
                ${msg.senderId === currentUserId
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              style={{ maxWidth: '70%' }}
            >
              <p>{msg.message}</p>
              <span className="block text-xs text-right opacity-60 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Contrato y formulario */}
      {contract && !contract.accepted && (
        <ContractView 
          contract={contract} 
          onAccept={onContractAccept}
          onCancel={() => setShowContractForm(false)}
        />
      )}

      {!contract && (
        <button
          onClick={() => setShowContractForm(true)}
          className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Crear Contrato
        </button>
      )}

      {showContractForm && (
        <ContractForm 
          onSubmit={onContractCreate}
          onCancel={() => setShowContractForm(false)}
        />
      )}

      {/* Input de mensaje */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow text-gray-800 bg-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow transition-all duration-150"
          disabled={newMessage.trim() === ''}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
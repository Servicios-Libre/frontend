'use client';

import { ChatMessage, ChatContract } from '@/types';
import { useState, useRef, useEffect } from 'react';
import ContractForm from './ContractForm';
import ContractView from './ContractView';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatBoxProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  currentUserId: string;
  contract: ChatContract | null;
  onContractCreate: (contract: ChatContract) => void;
  onContractAccept: () => void;
  clienteName: string;
  trabajadorName: string;
}

const ChatBox = ({ 
  messages, 
  onSend, 
  currentUserId, 
  contract,
  onContractCreate,
  onContractAccept,
  clienteName,
  trabajadorName
}: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showContractForm, setShowContractForm] = useState(false);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    await onSend(newMessage.trim());
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Cabecera sticky */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-[#f0f0f0] border-b shadow-sm">
        {/* Cliente */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg border-2 border-white shadow">
            {clienteName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-gray-800">{clienteName}</span>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">Cliente</span>
          </div>
        </div>
        {/* Trabajador */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg border-2 border-white shadow">
            {trabajadorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-gray-800">{trabajadorName}</span>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">Trabajador</span>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-2 bg-[#ece5dd]">
        {localMessages.map((msg) => {
          const isOwn = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`
                relative px-5 py-3 rounded-2xl shadow-sm transition-all duration-200
                ${isOwn
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white rounded-br-[0.75rem]'
                  : 'bg-white border border-gray-200 text-gray-900 rounded-bl-[0.75rem]'
                }
                max-w-[70%]
              `}>
                <p className="break-words">{msg.message}</p>
                <span className={`block text-xs mt-2 text-right ${isOwn ? 'text-green-100' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Contrato y formulario */}
      <div className="px-6 py-2 bg-[#f0f0f0]">
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
            className="w-full mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
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
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow text-gray-800 bg-white placeholder-gray-400"
            aria-label="Escribe un mensaje"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition-all duration-150"
            disabled={newMessage.trim() === ''}
            aria-label="Enviar mensaje"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </form>
      </div>

      {/* Animación fade-in para mensajes nuevos */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
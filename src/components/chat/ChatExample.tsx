'use client';

import { ChatMessage, ChatContract } from '@/types';
import { useState, useRef, useEffect } from 'react';
import ContractForm from './ContractForm';
import ContractView from './ContractView';

interface ChatBoxProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  currentUserId: string;
  contract: ChatContract | null;
  onContractCreate: (contract: ChatContract) => void;
  onContractAccept: () => void;
}

const ChatBox = ({ 
  messages, 
  onSend, 
  currentUserId, 
  contract,
  onContractCreate,
  onContractAccept 
}: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showContractForm, setShowContractForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSend(newMessage.trim());
    setNewMessage('');
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="h-64 overflow-y-auto border-b mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.senderId === currentUserId
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p>{msg.message}</p>
            <span className="block text-xs text-right opacity-60 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

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

      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          disabled={newMessage.trim() === ''}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
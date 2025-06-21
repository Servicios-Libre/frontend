'use client';

import ChatBox from '@/components/chat/ChatBox';
import ContractForm from '@/components/chat/ContractForm'; // Asegúrate de que estos componentes estén bien estilizados internamente
import ContractView from '@/components/chat/ContractView'; // Asegúrate de que estos componentes estén bien estilizados internamente
import { ChatMessage, ChatContract, UserBasic } from '@/types';
import { useState } from 'react';

// Datos de ejemplo para la demo
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    receiverId: 'worker1',
    message: 'Hola, vi tu servicio de jardinería y me gustaría contratarlo para mi casa.',
    timestamp: '2025-06-20T17:00:00.000Z'
  },
  {
    id: '2',
    senderId: 'worker1',
    receiverId: 'user1',
    message: '¡Hola! Gracias por tu interés. ¿Podrías contarme más sobre tu jardín?',
    timestamp: '2025-06-20T17:01:00.000Z'
  },
  {
    id: '3',
    senderId: 'user1',
    receiverId: 'worker1',
    message: 'Tengo un jardín de aproximadamente 100m² con varios arbustos y árboles.',
    timestamp: '2025-06-20T17:02:00.000Z'
  },
  {
    id: '4',
    senderId: 'worker1',
    receiverId: 'user1',
    message: 'Perfecto, puedo ayudarte con eso. ¿Te gustaría que revisemos los detalles en un contrato?',
    timestamp: '2025-06-20T17:03:00.000Z'
  }
];

const mockContract: ChatContract = {
  id: 'contract1',
  workerId: 'worker1',
  clientId: 'user1',
  description: 'Servicio de mantenimiento de jardín de aproximadamente 100m²',
  startDate: '2025-06-25',
  endDate: '2025-06-26',
  payment: 15000,
  accepted: false
};

const mockCurrentUser: UserBasic = {
  id: 'user1',
  name: 'Juan Pérez',
  email: 'juan@email.com',
  role: 'user',
  premium: false,
  user_pic: '/img/perfiles/tomas.jpg',
  availability: true,
  address: {
    street: 'Calle Falsa 123',
    city: 'Buenos Aires',
    state: 'Buenos Aires',
    zip_code: '1414'
  }
};

const mockWorker: UserBasic = {
  id: 'worker1',
  name: 'Pedro García',
  email: 'pedro@email.com',
  role: 'worker',
  premium: true,
  user_pic: '/img/perfiles/carlos.jpg',
  availability: true,
  address: {
    street: 'Calle Verdadera 456',
    city: 'Buenos Aires',
    state: 'Buenos Aires',
    zip_code: '1414'
  }
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [contract, setContract] = useState<ChatContract | null>(mockContract);
  const [showContractForm, setShowContractForm] = useState(false); // This state isn't used in the provided return, consider how you trigger the form.

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: mockCurrentUser.id,
      receiverId: mockWorker.id,
      message: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleContractCreate = (contractData: ChatContract) => {
    setContract(contractData);
    setShowContractForm(false); // Assuming this closes the form after creation
  };

  const handleContractAccept = () => {
    if (contract) {
      setContract(prev => prev && { ...prev, accepted: true });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Chat con {mockWorker.name}</h1>
        <p className="text-sm opacity-90">ID: {mockWorker.id}</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full flex flex-col space-y-6"> {/* Added max-width and auto margins */}
          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
            {/* User Info */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
              <div className="flex items-center gap-4 mb-4"> {/* Increased gap and margin-bottom */}
                <img
                  src={mockCurrentUser.user_pic}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" // Slightly larger avatar
                />
                <div>
                  <h3 className="font-semibold text-base text-gray-800">{mockCurrentUser.name}</h3> {/* Adjusted font size and weight */}
                  <p className="text-sm text-gray-500">Cliente</p> {/* Adjusted font size */}
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700"> {/* Adjusted spacing and text color */}
                <p><strong className="text-blue-600">Correo:</strong> {mockCurrentUser.email}</p>
                <p><strong className="text-blue-600">Dirección:</strong> {mockCurrentUser.address.street}, {mockCurrentUser.address.city}</p>
              </div>
            </div>

            {/* Worker Info */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={mockWorker.user_pic}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-base text-gray-800">{mockWorker.name}</h3>
                  <p className="text-sm text-gray-500">Trabajador</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong className="text-blue-600">Correo:</strong> {mockWorker.email}</p>
                <p><strong className="text-blue-600">Dirección:</strong> {mockWorker.address.street}, {mockWorker.address.city}</p>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-md flex-1 min-h-[50vh] overflow-hidden border border-gray-200"> {/* Added min-height, shadow, and border */}
            <div className="p-4 flex flex-col h-full"> {/* Ensure padding and fill height */}
              <ChatBox
                messages={messages}
                onSend={handleSendMessage}
                currentUserId={mockCurrentUser.id}
                contract={contract}
                onContractCreate={handleContractCreate}
                onContractAccept={handleContractAccept}
              />
              {/* You might want to conditionally render ContractForm/ContractView here */}
              {/* For example: */}
              {/* {showContractForm && (
                <ContractForm
                  workerId={mockWorker.id}
                  clientId={mockCurrentUser.id}
                  onCreate={handleContractCreate}
                  onCancel={() => setShowContractForm(false)}
                />
              )}
              {contract && !contract.accepted && (
                <ContractView
                  contract={contract}
                  onAccept={handleContractAccept}
                  isWorker={mockCurrentUser.role === 'worker'} // Pass role to decide accept button visibility
                />
              )} */}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
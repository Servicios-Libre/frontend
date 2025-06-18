'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import WorkerTable from '@/components/dashboard/WorkerTable';

const initialUsers = [
  { id: '1', username: 'Juan Pérez', email: 'juan@mail.com', isWorker: true, hasRequest: false },
  { id: '2', username: 'Ana Gómez', email: 'ana@mail.com', isWorker: false, hasRequest: true },
  { id: '3', username: 'Carlos Ruiz', email: 'carlos@mail.com', isWorker: false, hasRequest: false },
];

export default function WorkerMenuPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const workerRequests = users.filter(u => u.hasRequest).length;

  const handleApprove = (id: string) => {
    setUsers(users =>
      users.map(u =>
        u.id === id ? { ...u, isWorker: true, hasRequest: false } : u
      )
    );
  };

  const handleReject = (id: string) => {
    setUsers(users =>
      users.map(u =>
        u.id === id ? { ...u, hasRequest: false } : u
      )
    );
  };

  const handleToggleWorker = (id: string) => {
    setUsers(users =>
      users.map(u =>
        u.id === id ? { ...u, isWorker: !u.isWorker } : u
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar workerRequests={workerRequests} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Trabajadores</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{users.length}</span>
            <span className="text-gray-600 mt-2">Usuarios totales</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{users.filter(u => u.isWorker).length}</span>
            <span className="text-gray-600 mt-2">Trabajadores activos</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">{users.filter(u => u.hasRequest).length}</span>
            <span className="text-gray-600 mt-2">Solicitudes pendientes</span>
          </div>
        </div>
        <WorkerTable
          users={filteredUsers}
          onApprove={handleApprove}
          onReject={handleReject}
          onToggleWorker={handleToggleWorker}
        />
      </main>
    </div>
  );
}
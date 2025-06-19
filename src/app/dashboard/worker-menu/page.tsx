'use client';

import { useEffect, useState } from 'react';
import { getActiveWorkers, getWorkerRequests, acceptTicket, changeUserToWorker } from '@/services/dashboard-admin/workerService';
import { Perfil, Ticket } from '@/types';
import Sidebar from '@/components/dashboard/Sidebar';
import WorkerTable from '@/components/dashboard/WorkerTable';
import { useToast } from "@/context/ToastContext";

export default function WorkerMenuPage() {
  const [activeWorkers, setActiveWorkers] = useState<Perfil[]>([]);
  const [workerRequests, setWorkerRequests] = useState<Ticket[]>([]);
  const [searchActive, setSearchActive] = useState('');
  const [searchRequests, setSearchRequests] = useState('');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    Promise.all([getActiveWorkers(), getWorkerRequests()])
      .then(([workers, requests]) => {
        setActiveWorkers(workers);
        setWorkerRequests(requests);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (ticketId: string, userId: string) => {
    try {
      await acceptTicket(ticketId);
      await changeUserToWorker(userId);
      showToast("Solicitud aprobada y usuario convertido en worker", "success");
      // Actualiza el estado local...
    } catch (err) {
      showToast("Error al aprobar solicitud", "error", err);
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  // Adaptar datos a WorkerUser para el componente
  const workerRequestUsers: WorkerUser[] = workerRequests
    .filter(w => (w.nombre?.toLowerCase() ?? '').includes(searchRequests.toLowerCase()))
    .map(w => ({
      id: w.id,
      username: w.nombre,
      email: '', // Completa si tienes email en Perfil
      isWorker: false,
      hasRequest: true,
    }));

  const activeWorkerUsers: WorkerUser[] = activeWorkers
    .filter(w => (w.nombre?.toLowerCase() ?? '').includes(searchActive.toLowerCase()))
    .map(w => ({
      id: w.id,
      username: w.nombre,
      email: '', // Completa si tienes email en Perfil
      isWorker: true,
      hasRequest: false,
    }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar workerRequests={workerRequests.length} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Workers</h1>
        <h2 className="text-xl font-semibold mb-2">Solicitudes de Workers</h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={searchRequests}
          onChange={(e) => setSearchRequests(e.target.value)}
        />
        <WorkerTable
          users={workerRequestUsers}
          onApprove={handleApprove}
          onReject={handleReject}
          onToggleWorker={() => {}}
        />

        <h2 className="text-xl font-semibold mt-8 mb-2">Workers Activos</h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={searchActive}
          onChange={(e) => setSearchActive(e.target.value)}
        />
        <WorkerTable
          users={activeWorkerUsers}
          onApprove={() => {}}
          onReject={() => {}}
          onToggleWorker={handleToggleWorker}
        />
      </main>
    </div>
  );
}
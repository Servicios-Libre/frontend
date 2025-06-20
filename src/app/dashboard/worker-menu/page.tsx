'use client';

import { useEffect, useState } from 'react';
import { getActiveWorkers } from '@/services/dashboard-admin/workerService';
import { getAllTickets } from '@/services/dashboard-admin/ticketsService';
import { Perfil, Ticket } from '@/types';
import Sidebar from '@/components/dashboard/Sidebar';
import WorkerTable from '@/components/dashboard/WorkerTable';
import { useToast } from "@/context/ToastContext"; // Solo esto

export default function WorkerMenuPage() {
  const [activeWorkers, setActiveWorkers] = useState<Perfil[]>([]);
  const [workerRequests, setWorkerRequests] = useState<Ticket[]>([]);
  const [searchActive, setSearchActive] = useState('');
  const [searchRequests, setSearchRequests] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast(); // Usar showToast para mostrar alertas

  // Cargar datos al montar
  useEffect(() => {
    setLoading(true);
    Promise.all([getActiveWorkers(), getAllTickets()])
      .then(([workers, tickets]) => {
        setActiveWorkers(workers);
        // Filtrar tickets de tipo worker y estado pendiente
        const requests = tickets.filter(
          (t: Ticket) => t.type === "worker" && t.status === "pendiente"
        );
        setWorkerRequests(requests);
        setError(null);
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false));
  }, []);

  // Aquí puedes agregar funciones para aprobar/rechazar solicitudes si tienes endpoints

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Mapeo para solicitudes de worker
  const workerRequestUsers = workerRequests
    .filter(
      (w) =>
        (w.userId?.toLowerCase() ?? '').includes(searchRequests.toLowerCase()) ||
        (w.status?.toLowerCase() ?? '').includes(searchRequests.toLowerCase())
    )
    .map(w => ({
      id: w.userId,
      username: w.userId, // Si tienes username real, reemplaza aquí
      email: '',          // Si tienes email real, reemplaza aquí
      isWorker: false,
      hasRequest: true,
    }));

  // Mapeo para workers activos
  const activeWorkerUsers = activeWorkers
    .filter(
      (w) =>
        (w.nombre?.toLowerCase() ?? '').includes(searchActive.toLowerCase())
    )
    .map(w => ({
      id: w.id,
      username: w.nombre,
      email: '', // Si tienes email real, reemplaza aquí
      isWorker: true,
      hasRequest: false,
    }));

  // Ejemplo de uso de showToast:
  // showToast('Mensaje de éxito', 'success');
  // showToast('Mensaje de error', 'error');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar workerRequests={workerRequests.length} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Workers</h1>
        <h2 className="text-xl font-semibold mb-2">Solicitudes de Workers</h2>
        <input
          type="text"
          placeholder="Buscar por ID de usuario o estado..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={searchRequests}
          onChange={(e) => setSearchRequests(e.target.value)}
        />
        <WorkerTable
          users={workerRequestUsers}
          onApprove={() => { showToast('Solicitud aprobada', 'success'); }}
          onReject={() => { showToast('Solicitud rechazada', 'error'); }}
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
          onToggleWorker={() => {}}
        />
      </main>
    </div>
  );
}
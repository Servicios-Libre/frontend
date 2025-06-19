'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/dashboard/Sidebar';
import { Perfil } from '@/types';
import {
  getActiveWorkers,
  getWorkerRequests,
  approveWorkerRequest,
  rejectWorkerRequest,
  removeWorker,
} from '@/services/dashboard-admin/workerService';
import { useToast } from '@/context/ToastContext';

export default function WorkerMenuPage() {
  const [activeWorkers, setActiveWorkers] = useState<Perfil[]>([]);
  const [workerRequests, setWorkerRequests] = useState<Perfil[]>([]);
  const [searchActive, setSearchActive] = useState('');
  const [searchRequests, setSearchRequests] = useState('');
  const [selectedUser, setSelectedUser] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Cargar datos al montar
  useEffect(() => {
    setLoading(true);
    Promise.all([getActiveWorkers(), getWorkerRequests()])
      .then(([workers, requests]) => {
        setActiveWorkers(workers);
        setWorkerRequests(requests);
        setError(null);
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false));
  }, []);

  // Acciones
  const handleRemoveWorker = async (id: string) => {
    await removeWorker(id);
    setActiveWorkers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleApprove = async (id: string) => {
    await approveWorkerRequest(id);
    setWorkerRequests((prev) => prev.filter((u) => u.id !== id));
    const updatedWorkers = await getActiveWorkers();
    setActiveWorkers(updatedWorkers);
    showToast('Trabajador aprobado correctamente.', 'success');
  };

  const handleReject = async (id: string) => {
    await rejectWorkerRequest(id);
    setWorkerRequests((prev) => prev.filter((u) => u.id !== id));
    showToast('Solicitud rechazada.', 'error');
  };

  const handleViewProfile = (user: Perfil) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  // Filtros
  const filteredActiveWorkers = activeWorkers.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchActive.toLowerCase()) ||
      u.profesion?.toLowerCase().includes(searchActive.toLowerCase())
  );

  const filteredWorkerRequests = workerRequests.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchRequests.toLowerCase()) ||
      u.profesion?.toLowerCase().includes(searchRequests.toLowerCase())
  );

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar workerRequests={workerRequests.length} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Trabajadores</h1>

        {/* Trabajadores activos */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-2 mt-6">Trabajadores activos</h2>
          <input
            type="text"
            placeholder="Buscar trabajador activo..."
            className="mb-4 w-full p-2 border-2 border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black font-semibold placeholder-gray-500"
            value={searchActive}
            onChange={(e) => setSearchActive(e.target.value)}
          />
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="w-full text-left table-auto">
              <thead className="uppercase bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 border-b text-center">Nombre</th>
                  <th className="py-3 px-4 border-b text-center">Profesión</th>
                  <th className="py-3 px-4 border-b text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredActiveWorkers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      No hay trabajadores activos.
                    </td>
                  </tr>
                ) : (
                  filteredActiveWorkers.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 text-center">{user.nombre}</td>
                      <td className="py-2 px-4 text-center">{user.profesion}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          className="bg-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-300 text-xs"
                          onClick={() => handleRemoveWorker(user.id)}
                        >
                          Dar de baja
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Solicitudes para ser trabajador */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2 mt-6">Solicitudes para ser trabajador</h2>
          <input
            type="text"
            placeholder="Buscar solicitud..."
            className="mb-4 w-full p-2 border-2 border-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black font-semibold placeholder-gray-500"
            value={searchRequests}
            onChange={(e) => setSearchRequests(e.target.value)}
          />
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="w-full text-left table-auto">
              <thead className="uppercase bg-yellow-600 text-white">
                <tr>
                  <th className="py-3 px-4 border-b text-center">Nombre</th>
                  <th className="py-3 px-4 border-b text-center">Profesión</th>
                  <th className="py-3 px-4 border-b text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredWorkerRequests.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      No hay solicitudes pendientes.
                    </td>
                  </tr>
                ) : (
                  filteredWorkerRequests.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 text-center">{user.nombre}</td>
                      <td className="py-2 px-4 text-center">{user.profesion}</td>
                      <td className="py-2 px-4 text-center flex gap-2 justify-center">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                          onClick={() => handleApprove(user.id)}
                        >
                          Aprobar
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                          onClick={() => handleReject(user.id)}
                        >
                          Rechazar
                        </button>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                          onClick={() => handleViewProfile(user)}
                        >
                          Ver perfil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal para ver perfil */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-indigo-700">Perfil de {selectedUser.nombre}</h2>
              <p><span className="font-semibold">Profesión:</span> {selectedUser.profesion}</p>
              <p><span className="font-semibold">Descripción:</span> {selectedUser.descripcion}</p>
              <p><span className="font-semibold">ID:</span> {selectedUser.id}</p>
              {selectedUser.imagen && (
                <div className="flex justify-center mt-4">
                  <Image
                    src={selectedUser.imagen}
                    alt={selectedUser.nombre}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
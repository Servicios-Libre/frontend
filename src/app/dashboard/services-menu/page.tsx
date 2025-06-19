/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useToast } from "@/context/ToastContext";
import Sidebar from '@/components/dashboard/Sidebar';
import ServiceTable from '@/components/dashboard/ServiceTable';
import Toast from '@/components/dashboard/Toast';
import { getAllTickets } from '@/services/dashboard-admin/ticketsService';
import { Ticket } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getAllTickets().then((tickets) => {
      setServices(tickets.filter(t => t.type === "service"));
    });
  }, []);

  const filteredServices = services.filter(
    (s) =>
      (s.serviceId?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
      (s.status?.toLowerCase() ?? '').includes(search.toLowerCase())
  );

  const pendingServices = services.filter(s => s.status === 'pendiente').length;

  const handleApprove = (id: string) => {
    setServices(services =>
      services.map(s =>
        s.id === id ? { ...s, status: 'aprobado' } : s
      )
    );
    setToast({ message: 'Servicio aprobado correctamente.', type: 'success' });
    setTimeout(() => setToast(null), 2500);
  };

  const handleReject = (id: string) => {
    setServices(services =>
      services.map(s =>
        s.id === id ? { ...s, status: 'rechazado' } : s
      )
    );
    showToast('Servicio rechazado.', 'error');
  };

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar pendingServices={pendingServices} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Servicios</h1>
        <input
          type="text"
          placeholder="Buscar por ID de servicio o estado..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ServiceTable
          services={filteredServices.map(s => ({
            id: s.id,
            title: s.serviceId || 'Sin título',
            worker: s.userId,
            status: s.status as any,
            date: s.created_at,
          }))}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleViewDetails}
        />

        {/* Estadísticas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-indigo-700">{services.length}</span>
            <span className="text-gray-600 mt-2">Servicios totales</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">{pendingServices}</span>
            <span className="text-gray-600 mt-2">Pendientes</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{services.filter(s => s.status === 'aprobado').length}</span>
            <span className="text-gray-600 mt-2">Aprobados</span>
          </div>
        </div>

        {/* Modal de detalles */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-indigo-700">Detalles del Servicio</h2>
              <p><span className="font-semibold">ID:</span> {selectedService.id}</p>
              <p><span className="font-semibold">Estado:</span> {selectedService.status}</p>
              <p><span className="font-semibold">Fecha:</span> {selectedService.created_at}</p>
              <p><span className="font-semibold">Usuario:</span> {selectedService.userId}</p>
              <p><span className="font-semibold">Servicio:</span> {selectedService.serviceId}</p>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} />}
      </main>
    </div>
  );
}
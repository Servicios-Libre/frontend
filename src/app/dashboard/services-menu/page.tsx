'use client';

import { useState } from 'react';
import { useToast } from "@/context/ToastContext";
import Sidebar from '@/components/dashboard/Sidebar';
import ServiceTable from '@/components/dashboard/ServiceTable';
import Toast from '@/components/dashboard/Toast';

type ServiceStatus = 'pendiente' | 'aprobado' | 'rechazado';

interface Service {
  id: string;
  title: string;
  worker: string;
  status: ServiceStatus;
  date: string;
}

const initialServices: Service[] = [
  { id: '1', title: 'Plomería básica', worker: 'Juan Pérez', status: 'pendiente', date: '2025-06-18' },
  { id: '2', title: 'Electricidad avanzada', worker: 'Ana Gómez', status: 'aprobado', date: '2025-06-15' },
  { id: '3', title: 'Pintura de interiores', worker: 'Carlos Ruiz', status: 'rechazado', date: '2025-06-10' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { showToast } = useToast();

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.worker.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
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

  const handleViewDetails = (service: Service) => {
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
          placeholder="Buscar por título, trabajador o estado..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ServiceTable
          services={filteredServices}
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
            <span className="text-3xl font-bold text-yellow-600">{services.filter(s => s.status === 'pendiente').length}</span>
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
              <p><span className="font-semibold">Título:</span> {selectedService.title}</p>
              <p><span className="font-semibold">Trabajador:</span> {selectedService.worker}</p>
              <p><span className="font-semibold">Estado:</span> {selectedService.status}</p>
              <p><span className="font-semibold">Fecha:</span> {selectedService.date}</p>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} />}
      </main>
    </div>
  );
}
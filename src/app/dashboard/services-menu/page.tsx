/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import { getAllTickets } from "@/services/dashboard-admin/ticketsService";
import { Ticket, Service } from "@/types";
import Sidebar from "@/components/dashboard/Sidebar";
import ServiceTable from "@/components/dashboard/ServiceTable";
import { useToast } from "@/context/ToastContext";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    getAllTickets()
      .then((tickets: Ticket[]) => {
        // Solo los tickets de tipo "service"
        const serviceList: Service[] = tickets
          .filter(t => t.type === "service")
          .map(t => ({
            id: t.id,
            title: t.serviceId || "Sin título",
            worker: t.userId,
            status: t.status as Service["status"],
            date: t.created_at,
          }));
        setServices(serviceList);
        setError(null);
      })
      .catch(() => setError("Error al cargar servicios"))
      .finally(() => setLoading(false));
  }, []);

  // Callbacks para aprobar/rechazar (puedes implementar los endpoints si existen)
  const handleApprove = (id: string) => {
    showToast("Aprobado (simulado)", "success");
    setServices(services =>
      services.map(s => s.id === id ? { ...s, status: "aprobado" } : s)
    );
  };

  const handleReject = (id: string) => {
    showToast("Rechazado (simulado)", "error");
    setServices(services =>
      services.map(s => s.id === id ? { ...s, status: "rechazado" } : s)
    );
  };

  const handleViewDetails = (service: Service) => {
    showToast(`Detalles de ${service.title}`, "info");
    // Aquí podrías abrir un modal con más info
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const filteredServices = services.filter(
    s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.worker.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar pendingServices={filteredServices.filter(s => s.status === "pendiente").length} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Servicios</h1>
        <input
          type="text"
          placeholder="Buscar por título, trabajador o estado..."
          className="mb-4 w-full p-2 border-2 border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black font-semibold placeholder-gray-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ServiceTable
          services={filteredServices}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleViewDetails}
        />
      </main>
    </div>
  );
}
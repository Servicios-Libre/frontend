"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ServiceRequestsTable from "@/components/dashboard/service-menu/ServicesRequestsTable";
import ActiveServicesTable from "@/components/dashboard/service-menu/ActiveServicesTable";
import { fetchServiceRequests, acceptServiceRequest, rejectServiceRequest } from "@/services/dashboard/tickets";
import { fetchActiveServices, deactivateService } from "@/services/dashboard/services";
import { Ticket, Servicio } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FaTools } from "react-icons/fa";
import Image from "next/image";

export default function ServicesMenuPage() {
  // Solicitudes pendientes
  const [requests, setRequests] = useState<Ticket[]>([]);
  const [loadingId, setLoadingId] = useState<string | undefined>();

  // Servicios activos
  const [services, setServices] = useState<Servicio[]>([]);
  const [totalServices, setTotalServices] = useState(0);
  const [servicesPage, setServicesPage] = useState(1);
  const [loadingServiceId, setLoadingServiceId] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Servicio Libre - Manejar servicios"

    return () => {
      document.title = "Servicio Libre"
    }
  }, [])

  // Solicitudes pendientes
  useEffect(() => {
    fetchServiceRequests()
      .then(setRequests)
      .catch(() => showToast("Error al cargar solicitudes de servicio", "error"));
  }, [showToast]);

  // Servicios activos paginados
  useEffect(() => {
    fetchActiveServices(servicesPage, 10, search)
      .then(({ services, total }) => {
        setServices(services);
        setTotalServices(total);
      })
      .catch(() => showToast("Error al cargar servicios activos", "error"));
  }, [servicesPage, search, showToast]);

  const handleAccept = async (ticket: Ticket) => {
    setLoadingId(ticket.id);
    try {
      await acceptServiceRequest(ticket.id);
      setRequests((prev) => prev.filter((t) => t.id !== ticket.id));
      showToast("Servicio aprobado y publicado", "success");
      setServicesPage(1);
      fetchActiveServices(1, 10, search).then(({ services, total }) => {
        setServices(services);
        setTotalServices(total);
      });
    } catch {
      showToast("Error al aprobar servicio", "error");
    }
    setLoadingId(undefined);
  };

  const handleReject = async (ticket: Ticket) => {
    setLoadingId(ticket.id);
    try {
      await rejectServiceRequest(ticket.id);
      setRequests((prev) => prev.filter((t) => t.id !== ticket.id));
      showToast("Solicitud rechazada", "success");
    } catch {
      showToast("Error al rechazar solicitud", "error");
    }
    setLoadingId(undefined);
  };

  const handleViewService = (serviceId: string) => {
    alert(`Ver detalle del servicio: ${serviceId}`);
  };

  const handleDeactivate = async (service: Servicio) => {
    setLoadingServiceId(service.id);
    try {
      await deactivateService(service.id);
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      showToast("Servicio dado de baja", "success");
    } catch {
      showToast("Error al dar de baja el servicio", "error");
    }
    setLoadingServiceId(undefined);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <header className="lg:hidden sticky top-0 z-30 bg-gradient-to-r from-purple-800 to-indigo-900 p-4 flex justify-between items-center shadow-lg">
        <Image
          src="/img/logosl.png"
          alt="logo"
          width={120}
          height={120}
          className="object-contain filter brightness-125"
        />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
          aria-label="Abrir menú"
        >
          <FaTools className="text-2xl" />
        </button>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-extrabold mb-10 text-black flex items-center gap-3">
          <FaTools className="text-blue-600" /> Gestión de Servicios
        </h1>

        {/* Solicitudes pendientes */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-black">Solicitudes de publicación</h2>
            {requests.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {requests.length} nuevas
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <ServiceRequestsTable
              requests={requests}
              onAccept={handleAccept}
              onReject={handleReject}
              onViewService={handleViewService}
              loadingId={loadingId}
            />
          </div>
        </section>

        {/* Servicios activos paginados */}
        <section>
          <div className="flex items-center gap-2 mb-4 mt-10">
            <h2 className="text-2xl font-bold text-black">Servicios activos</h2>
            {totalServices > 0 && (
              <span className="ml-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {totalServices} activos
              </span>
            )}
          </div>
          <div className="flex items-center mb-4 flex-wrap gap-2">
            <input
              type="text"
              placeholder="Buscar por título, usuario, etc..."
              className="border border-gray-300 rounded-lg px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-base text-gray-800">{totalServices} servicios</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <ActiveServicesTable
              services={services}
              onDeactivate={handleDeactivate}
              loadingId={loadingServiceId}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
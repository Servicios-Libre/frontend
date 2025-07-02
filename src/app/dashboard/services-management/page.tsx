"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import { useEffect, useState } from "react";
import { Servicio, Ticket } from "@/types";
import ServiceRequestsSection from "@/components/dashboard/service-menu/ServiceRequestsSection";
import ActiveServicesSection from "@/components/dashboard/service-menu/ActiveServicesSection";
import { useAdminContext } from "@/context/AdminContext";
import {
  acceptServiceRequest,
  rejectServiceRequest,
} from "@/services/dashboard/tickets";
import { deactivateService } from "@/services/dashboard/services";
import { useToast } from "@/context/ToastContext";
import { FaTools, FaClipboardList } from "react-icons/fa"; // Íconos para títulos
import { useAuth } from "@/context/AuthContext";

export default function ServicesMenuPage() {
  const { user: authUser } = useAuth();
  const [loadingId, setLoadingId] = useState<string | undefined>(undefined);
  const [loadingServiceId, setLoadingServiceId] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { activeServicesCount } = useAdminContext();
  const isAdmin = authUser?.role === "admin";

  const {
    serviceRequests,
    refreshServiceRequests,
    refreshActiveServices,
    isReady,
    totalActiveServices,
  } = useAdminContext();

  const { showToast } = useToast();

  const handleAccept = async (ticket: Ticket) => {
    setLoadingId(ticket.id);
    try {
      await acceptServiceRequest(ticket.id);
      showToast("Servicio aprobado y publicado", "success");
      await refreshServiceRequests();
      await refreshActiveServices();
    } catch {
      showToast("Error al aprobar servicio", "error");
    }
    setLoadingId(undefined);
  };

  const handleReject = async (ticket: Ticket) => {
    setLoadingId(ticket.id);
    try {
      await rejectServiceRequest(ticket.id);
      showToast("Solicitud rechazada", "success");
      await refreshServiceRequests();
    } catch {
      showToast("Error al rechazar solicitud", "error");
    }
    setLoadingId(undefined);
  };

  const handleDeactivate = async (service: Servicio) => {
    setLoadingServiceId(service.id);
    try {
      await deactivateService(service.id);
      showToast("Servicio dado de baja", "success");
      await refreshActiveServices();
    } catch {
      showToast("Error al dar de baja el servicio", "error");
    }
    setLoadingServiceId(undefined);
  };

  useEffect(() => {
    document.title = "Servicio Libre - Dashboard de servicios"
  }, [])

  useEffect(() => {
    if (isReady) {
      refreshServiceRequests();
      refreshActiveServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950">
        <h2>No tienes permiso para acceder a esta página.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950 text-white">
      {/* Overlay móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

      <main className="flex-1 p-6 md:p-10">
        {/* Título principal */}
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <FaTools className="text-indigo-400" /> Gestión de Servicios
        </h1>

        {/* Solicitudes de servicio */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaClipboardList className="text-emerald-400" /> Solicitudes pendientes
            {serviceRequests?.length > 0 && (
              <span className="ml-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                {serviceRequests.length} nuevas
              </span>
            )}
          </h2>

          <ServiceRequestsSection
            requests={serviceRequests}
            onAccept={handleAccept}
            onReject={handleReject}
            loadingId={loadingId}
          />
        </section>

        {/* Servicios activos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaClipboardList className="text-emerald-400" /> Servicios activos
            {activeServicesCount > 0 && (
              <span className="ml-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                {activeServicesCount} coincidencias de {totalActiveServices}
              </span>
            )}
          </h2>

          <ActiveServicesSection
            onDeactivate={handleDeactivate}
            loadingServiceId={loadingServiceId}
          />
        </section>
      </main>
    </div>
  );
}

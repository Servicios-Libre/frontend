"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  acceptWorkerRequest,
  rejectWorkerRequest,
} from "@/services/dashboard/tickets";
import { downgradeWorker } from "@/services/dashboard/worker";
import { User, WorkerRequestTicket } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FaUserCheck, FaUserCog } from "react-icons/fa";
import RequestProfileModal from "@/components/dashboard/worker-menu/RequestProfileModal";
import { useAdminContext } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { WorkersList } from "@/components/dashboard/worker-menu/WorkersList";
import { RequestsList } from "@/components/dashboard/worker-menu/RequestsList";
import { SearchInput } from "@/components/dashboard/SearchInput";
import Pagination from "@/components/dashboard/Pagination";
import MobileHeader from "@/components/dashboard/MobileHeader";

export default function WorkerManagementPage() {
  const {
    users,
    loading: usersLoading,
    refreshUsers,
    isReady,
    workerRequests,
    workerRequestsCount,
    workerRequestsPage,
    setWorkerRequestsPage,
    refreshWorkerRequests,
  } = useAdminContext();

  const { token, user: authUser } = useAuth();
  const [loadingId, setLoadingId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requestProfile, setRequestProfile] = useState<User | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { showToast } = useToast();

  const [currentWorkerPage, setCurrentWorkerPage] = useState(1);
  const workersPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = authUser?.role === "admin";
  const workers = users.filter((u) => u.role === "worker");

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación local para workers activos
  const totalWorkerPages = Math.ceil(filteredWorkers.length / workersPerPage);
  const paginatedWorkers = filteredWorkers.slice(
    (currentWorkerPage - 1) * workersPerPage,
    currentWorkerPage * workersPerPage
  );

  // Paginación de requests viene del contexto (server paginada)
  const totalRequestPages = Math.ceil(workerRequestsCount / 5);
  const paginatedRequests = workerRequests; // ya viene paginada del backend

  useEffect(() => {
    document.title = "Servicio Libre - Dashboard de trabajadores"
  }, [])

  useEffect(() => {
    setCurrentWorkerPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!token || !isAdmin) {
      return;
    }
    // El contexto ya carga las solicitudes, pero acá refrescamos para asegurarnos
    refreshWorkerRequests().catch(() => showToast("Error al cargar solicitudes", "error"));
  }, [token, isAdmin, refreshWorkerRequests, showToast, workerRequestsPage]);

  const handleViewRequestProfile = (basicUser: User) => {
    const fullUser = users.find((u) => u.id === basicUser.id);
    if (fullUser) {
      setRequestProfile(fullUser);
      setIsRequestModalOpen(true);
    } else {
      showToast("No se encontró el usuario en el contexto", "error");
    }
  };

  const handleAccept = async (ticket: WorkerRequestTicket) => {
    if (!token || !isAdmin) return;
    setLoadingId(ticket.id);
    try {
      await acceptWorkerRequest(ticket.id, ticket.user.id);
      showToast("Solicitud aceptada y usuario promovido a worker", "success");
      await refreshUsers();
      await refreshWorkerRequests();
    } catch {
      showToast("Error al aceptar solicitud", "error");
    }
    setLoadingId(undefined);
  };

  const handleReject = async (ticket: WorkerRequestTicket) => {
    if (!token || !isAdmin) return;
    setLoadingId(ticket.id);
    try {
      await rejectWorkerRequest(ticket.id);
      showToast("Solicitud rechazada", "success");
      await refreshWorkerRequests();
    } catch {
      showToast("Error al rechazar solicitud", "error");
    }
    setLoadingId(undefined);
  };

  const handleDowngrade = async (worker: User) => {
    if (!token || !isAdmin) return;
    setLoadingId(worker.id);
    try {
      await downgradeWorker(worker.id);
      showToast("Trabajador dado de baja", "success");
      await refreshUsers();
    } catch {
      showToast("Error al dar de baja", "error");
    }
    setLoadingId(undefined);
  };

  if (!isReady) return <LoadingScreen />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950">
        <h2>No tienes permiso para acceder a esta página.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950">
      {/* Overlay mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header mobile */}
      <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

      <main className="flex-1 p-6 md:p-10 text-white">

        {/* Título principal */}
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <FaUserCog className="text-indigo-400" /> Gestión de Trabajadores
        </h1>

        {/* Solicitudes pendientes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaUserCheck className="text-emerald-400" /> Solicitudes pendientes
            {workerRequestsCount > 0 && (
              <span className="ml-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                {workerRequestsCount} nuevas
              </span>
            )}
          </h2>

          <RequestsList
            requests={paginatedRequests}
            onViewProfile={handleViewRequestProfile}
          />

          <Pagination
            totalPages={totalRequestPages}
            currentPage={workerRequestsPage}
            onPageChange={setWorkerRequestsPage}
          />
        </section>

        {/* Trabajadores activos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
            <FaUserCog className="text-indigo-400" /> Trabajadores activos
          </h2>

          <div className="mb-4">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Buscar trabajador..."
            />
          </div>

          <WorkersList
            workers={paginatedWorkers}
            loading={usersLoading}
            loadingId={loadingId}
            onDowngrade={handleDowngrade}
            isFiltered={!!searchTerm}
          />

          <Pagination
            totalPages={totalWorkerPages}
            currentPage={currentWorkerPage}
            onPageChange={setCurrentWorkerPage}
          />
        </section>

        {/* Modal de perfil de solicitud */}
        <RequestProfileModal
          user={requestProfile}
          open={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onAccept={(userId) => {
            const ticket = workerRequests.find((t) => t.user.id === userId);
            if (ticket) handleAccept(ticket);
          }}
          onReject={(userId) => {
            const ticket = workerRequests.find((t) => t.user.id === userId);
            if (ticket) handleReject(ticket);
          }}
        />
      </main>
    </div>
  );
}

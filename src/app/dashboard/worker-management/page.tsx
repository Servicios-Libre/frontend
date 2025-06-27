"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  acceptWorkerRequest,
  rejectWorkerRequest,
  fetchWorkerRequests
} from "@/services/dashboard/tickets";
import { downgradeWorker } from "@/services/dashboard/worker";
import { User, WorkerRequestTicket } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FaUserCheck, FaUserCog } from "react-icons/fa";
import RequestProfileModal from "@/components/dashboard/worker-menu/RequestProfileModal";
import Link from "next/link";
import { useAdminContext } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";

export default function WorkerManagementPage() {
  const {
    users,
    loading: usersLoading,
    refreshUsers,
    isReady,
  } = useAdminContext();

  const { token, user: authUser } = useAuth();
  const [requests, setRequests] = useState<WorkerRequestTicket[]>([]);
  const [loadingId, setLoadingId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requestProfile, setRequestProfile] = useState<User | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { showToast } = useToast();

  const isAdmin = authUser?.role === "admin";
  const workers = users.filter((u) => u.role === "worker");

  useEffect(() => {
    if (!token || !isAdmin) {
      setRequests([]);
      return;
    }
    fetchWorkerRequests()
      .then(setRequests)
      .catch(() => showToast("Error al cargar solicitudes", "error"));
  }, [token, isAdmin, showToast]);

  const handleViewRequestProfile = (basicUser: User) => {
    const fullUser = users.find(u => u.id === basicUser.id);
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
      setRequests((prev) => prev.filter((t) => t.id !== ticket.id));
      showToast("Solicitud aceptada y usuario promovido a worker", "success");
      await refreshUsers();
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
      setRequests((prev) => prev.filter((t) => t.id !== ticket.id));
      showToast("Solicitud rechazada", "success");
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

  // 🚫 Protege el render hasta que esté listo (previene hydration error)
  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950">
        <h2>No tienes permiso para acceder a esta página.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-indigo-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 p-6 md:p-10 text-white">
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <FaUserCog className="text-indigo-400" /> Gestión de Trabajadores
        </h1>

        {/* Solicitudes pendientes */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <FaUserCheck className="text-emerald-400" /> Solicitudes pendientes
              {requests.length > 0 && (
                <span className="ml-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                  {requests.length} nuevas
                </span>
              )}
            </h2>
            <div className="grid gap-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-indigo-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-indigo-700 transition"
                >
                  <div>
                    <p className="text-lg font-semibold">{req.user.name}</p>
                    <p className="text-sm text-indigo-200">{req.user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req)}
                      disabled={loadingId === req.id}
                      className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-1 px-4 rounded-lg text-sm"
                    >
                      {loadingId === req.id ? "Procesando..." : "Aceptar"}
                    </button>
                    <button
                      onClick={() => handleReject(req)}
                      disabled={loadingId === req.id}
                      className="bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-4 rounded-lg text-sm"
                    >
                      {loadingId === req.id ? "Procesando..." : "Rechazar"}
                    </button>
                    <button
                      onClick={() => handleViewRequestProfile(req.user)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-lg text-sm"
                    >
                      Ver perfil
                    </button>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-indigo-300 text-center">No hay solicitudes pendientes.</p>
              )}
            </div>
          </div>
        </section>

        {/* Trabajadores activos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
            <FaUserCog className="text-indigo-400" /> Trabajadores activos
          </h2>

          {usersLoading ? (
            <p>Cargando trabajadores...</p>
          ) : workers.length === 0 ? (
            <p className="text-indigo-300">No hay trabajadores activos.</p>
          ) : (
            <div className="grid gap-4">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-indigo-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-indigo-700 transition"
                >
                  <div>
                    <p className="text-lg font-semibold">{worker.name}</p>
                    <p className="text-sm text-indigo-200">{worker.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDowngrade(worker)}
                      disabled={loadingId === worker.id}
                      className={`${loadingId === worker.id ? "opacity-60 cursor-wait" : ""
                        } bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-4 rounded-lg text-sm`}
                    >
                      {loadingId === worker.id ? "Procesando..." : "Dar de baja"}
                    </button>
                    <Link href={`/worker-profile/${worker.id}`}>
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-lg text-sm">
                        Ver perfil
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <RequestProfileModal
          user={requestProfile}
          open={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
        />
      </main>
    </div>
  );
}

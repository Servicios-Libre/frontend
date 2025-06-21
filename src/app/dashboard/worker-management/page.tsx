"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import WorkerRequestsTable from "@/components/dashboard/worker-menu/WorkerRequestsTable";
import WorkerListTable from "@/components/dashboard/worker-menu/WorkerListTable";
import UserProfileDrawer from "@/components/dashboard/worker-menu/UserProfileDrawer";
import { fetchWorkerRequests, acceptWorkerRequest, rejectWorkerRequest } from "@/services/dashboard/tickets";
import { fetchWorkers, downgradeWorker, fetchUserProfile, fetchWorkerServices } from "@/services/dashboard/worker";
import { WorkerRequestTicket, User, WorkerService } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FaUserCheck, FaUserCog } from "react-icons/fa";

export default function WorkerManagementPage() {
  const [requests, setRequests] = useState<WorkerRequestTicket[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | undefined>();
  const [profile, setProfile] = useState<User | null>(null);
  const [profileServices, setProfileServices] = useState<WorkerService[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchWorkerRequests()
      .then(setRequests)
      .catch(() => showToast("Error al cargar solicitudes", "error"));
  }, [showToast]);

  useEffect(() => {
    fetchWorkers(page, 10, search)
      .then((res) => {
        setWorkers(res.users);
        setTotalWorkers(res.total);
      })
      .catch(() => showToast("Error al cargar trabajadores", "error"));
  }, [page, search, showToast]);

  const handleAccept = async (ticket: WorkerRequestTicket) => {
    setLoadingId(ticket.id);
    try {
      await acceptWorkerRequest(ticket.id, ticket.user.id);
      setRequests((prev) => prev.filter((t) => t.id !== ticket.id));
      showToast("Solicitud aceptada y usuario promovido a worker", "success");
      setPage(1);
      fetchWorkers(1, 10, search).then((res) => {
        setWorkers(res.users);
        setTotalWorkers(res.total);
      });
    } catch {
      showToast("Error al aceptar solicitud", "error");
    }
    setLoadingId(undefined);
  };

  const handleReject = async (ticket: WorkerRequestTicket) => {
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

  const handleDowngrade = async (user: User) => {
    setLoadingId(user.id);
    try {
      await downgradeWorker(user.id);
      setWorkers((prev) => prev.filter((w) => w.id !== user.id));
      showToast("Trabajador dado de baja", "success");
    } catch {
      showToast("Error al dar de baja", "error");
    }
    setLoadingId(undefined);
  };

  const handleViewProfile = async (userId: string) => {
    setDrawerOpen(true);
    try {
      const user = await fetchUserProfile(userId);
      setProfile(user);
      if (user.role === "worker") {
        const services = await fetchWorkerServices(userId);
        setProfileServices(services);
      } else {
        setProfileServices([]);
      }
    } catch {
      showToast("Error al cargar perfil", "error");
      setDrawerOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar workerRequests={requests.length} />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-extrabold mb-10 text-black flex items-center gap-3">
          <FaUserCog className="text-indigo-600" /> Worker Management Menu
        </h1>

        {/* Solicitudes pendientes */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <FaUserCheck className="text-green-600 text-2xl" />
            <h2 className="text-2xl font-bold text-black">Solicitudes pendientes</h2>
            {requests.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {requests.length} nuevas
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <WorkerRequestsTable
              requests={requests}
              onAccept={handleAccept}
              onReject={handleReject}
              onViewProfile={handleViewProfile}
              loadingId={loadingId}
            />
          </div>
        </section>

        {/* Trabajadores activos */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FaUserCog className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-bold text-black">Trabajadores activos</h2>
            <span className="ml-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              {totalWorkers} activos
            </span>
          </div>
          <div className="flex items-center mb-4 flex-wrap gap-2">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="border border-gray-300 rounded-lg px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-base text-gray-800">{totalWorkers} trabajadores</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <WorkerListTable
              workers={workers}
              onViewProfile={handleViewProfile}
              onDowngrade={handleDowngrade}
              loadingId={loadingId}
            />
            {/* Paginación */}
            <div className="flex gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
                disabled={workers.length < 5}
                onClick={() => setPage((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </section>

        {/* Drawer perfil */}
        <UserProfileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={profile}
          services={profileServices}
        />
      </main>
    </div>
  );
}
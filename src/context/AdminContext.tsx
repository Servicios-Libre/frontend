"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Servicio } from "@/types";
import { fetchAllUsers } from "@/services/dashboard/worker";
import { fetchAllActiveServices } from "@/services/dashboard/services";
import { fetchWorkerRequests } from "@/services/dashboard/tickets";
import { useAuth } from "@/context/AuthContext";

interface AdminContextProps {
  users: User[];
  loading: boolean;
  refreshUsers: () => Promise<void>;
  acceptedServiceCount: number;
  refreshAcceptedServices?: () => Promise<void>;
  workerRequestsCount: number;
  refreshWorkerRequests: () => Promise<void>;
  isReady: boolean; // ✅ NUEVO
}

const AdminContext = createContext<AdminContextProps>({
  users: [],
  loading: true,
  refreshUsers: async () => {},
  acceptedServiceCount: 0,
  workerRequestsCount: 0,
  refreshWorkerRequests: async () => {},
  isReady: false, // ✅ NUEVO
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, loading: authLoading, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [acceptedServiceCount, setAcceptedServiceCount] = useState(0);
  const [workerRequestsCount, setWorkerRequestsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const refreshUsers = async () => {
    if (!token || !isAdmin) return;
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  const refreshAcceptedServices = async () => {
    if (!token || !isAdmin) return;
    try {
      const allServices: Servicio[] = await fetchAllActiveServices();
      const count = allServices.filter(
        (s) => s.ticket?.status === "accepted" && s.ticket?.type === "service"
      ).length;
      setAcceptedServiceCount(count);
    } catch (error) {
      console.error("Error al cargar servicios aceptados", error);
    }
  };

  const refreshWorkerRequests = async () => {
    if (!token || !isAdmin) return;
    try {
      const requests = await fetchWorkerRequests();
      setWorkerRequestsCount(requests.length);
    } catch (error) {
      console.error("Error al cargar solicitudes de worker", error);
      setWorkerRequestsCount(0);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!token || !isAdmin) {
      setUsers([]);
      setAcceptedServiceCount(0);
      setWorkerRequestsCount(0);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      await Promise.all([
        refreshUsers(),
        refreshAcceptedServices(),
        refreshWorkerRequests(),
      ]);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authLoading, isAdmin]);

  return (
    <AdminContext.Provider
      value={{
        users,
        loading,
        refreshUsers,
        acceptedServiceCount,
        refreshAcceptedServices,
        workerRequestsCount,
        refreshWorkerRequests,
        isReady: !loading, // ✅ Esto es clave
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

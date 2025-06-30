"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import { User, Servicio, WorkerRequestTicket, Ticket } from "@/types";
import {
  fetchWorkerRequestsPaginated,
  fetchServiceRequestsPaginated,
} from "@/services/dashboard/tickets";
import {
  fetchAllActiveServices,
  fetchActiveServices,
} from "@/services/dashboard/services";
import { fetchAllUsers } from "@/services/dashboard/worker";
import { useAuth } from "@/context/AuthContext";

interface AdminContextProps {
  users: User[];
  loading: boolean;
  refreshUsers: () => Promise<void>;
  acceptedServiceCount: number;
  refreshAcceptedServices: () => Promise<void>;

  workerRequests: WorkerRequestTicket[];
  workerRequestsCount: number;
  workerRequestsPage: number;
  setWorkerRequestsPage: (page: number) => void;
  refreshWorkerRequests: () => Promise<void>;

  serviceRequests: Ticket[];
  serviceRequestsCount: number;
  serviceRequestsPage: number;
  setServiceRequestsPage: (page: number) => void;
  refreshServiceRequests: () => Promise<void>;

  activeServices: Servicio[];
  activeServicesCount: number;
  activeServicesPage: number;
  setActiveServicesPage: (page: number) => void;
  activeServicesSearch: string;
  setActiveServicesSearch: (query: string) => void;
  refreshActiveServices: () => Promise<void>;

  isReady: boolean;
}

const AdminContext = createContext<AdminContextProps>({
  users: [],
  loading: true,
  refreshUsers: async () => { },
  acceptedServiceCount: 0,
  refreshAcceptedServices: async () => { },
  workerRequests: [],
  workerRequestsCount: 0,
  workerRequestsPage: 1,
  setWorkerRequestsPage: () => { },
  refreshWorkerRequests: async () => { },
  serviceRequests: [],
  serviceRequestsCount: 0,
  serviceRequestsPage: 1,
  setServiceRequestsPage: () => { },
  refreshServiceRequests: async () => { },
  activeServices: [],
  activeServicesCount: 0,
  activeServicesPage: 1,
  setActiveServicesPage: () => { },
  activeServicesSearch: "",
  setActiveServicesSearch: () => { },
  refreshActiveServices: async () => { },
  isReady: false,
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, loading: authLoading, user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [acceptedServiceCount, setAcceptedServiceCount] = useState(0);

  const [workerRequests, setWorkerRequests] = useState<WorkerRequestTicket[]>([]);
  const [workerRequestsCount, setWorkerRequestsCount] = useState(0);
  const [workerRequestsPage, setWorkerRequestsPage] = useState(1);

  const [serviceRequests, setServiceRequests] = useState<Ticket[]>([]);
  const [serviceRequestsCount, setServiceRequestsCount] = useState(0);
  const [serviceRequestsPage, setServiceRequestsPage] = useState(1);

  const [activeServices, setActiveServices] = useState<Servicio[]>([]);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [activeServicesPage, setActiveServicesPage] = useState(1);
  const [activeServicesSearch, setActiveServicesSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  const refreshUsers = useCallback(async () => {
    if (!token || !isAdmin) return;
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  }, [token, isAdmin]);

  const refreshAcceptedServices = useCallback(async () => {
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
  }, [token, isAdmin]);

  const refreshWorkerRequests = useCallback(async () => {
    if (!token || !isAdmin) return;
    try {
      const { tickets, total } = await fetchWorkerRequestsPaginated(workerRequestsPage, 5);
      setWorkerRequests(tickets);
      setWorkerRequestsCount(total);
    } catch (error) {
      console.error("Error al cargar solicitudes de worker", error);
      setWorkerRequests([]);
      setWorkerRequestsCount(0);
    }
  }, [token, isAdmin, workerRequestsPage]);

  const refreshServiceRequests = useCallback(async () => {
    if (!token || !isAdmin) return;
    try {
      const { tickets, total } = await fetchServiceRequestsPaginated(serviceRequestsPage, 5);
      setServiceRequests(tickets);
      setServiceRequestsCount(total);
    } catch (error) {
      console.error("Error al cargar solicitudes de servicio", error);
      setServiceRequests([]);
      setServiceRequestsCount(0);
    }
  }, [token, isAdmin, serviceRequestsPage]);

  const refreshActiveServices = useCallback(async () => {
    if (!token || !isAdmin) return;
    try {
      const { services, total } = await fetchActiveServices(
        activeServicesPage,
        5,
        activeServicesSearch
      );
      setActiveServices(services);
      setActiveServicesCount(total);
    } catch (error) {
      console.error("Error al cargar servicios activos", error);
      setActiveServices([]);
      setActiveServicesCount(0);
    }
  }, [token, isAdmin, activeServicesPage, activeServicesSearch]);

  useEffect(() => {
    if (authLoading) return;
    if (!token || !isAdmin) {
      setUsers([]);
      setAcceptedServiceCount(0);
      setWorkerRequests([]);
      setWorkerRequestsCount(0);
      setServiceRequests([]);
      setServiceRequestsCount(0);
      setActiveServices([]);
      setActiveServicesCount(0);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      await Promise.all([
        refreshUsers(),
        refreshAcceptedServices(),
        refreshWorkerRequests(),
        refreshServiceRequests(),
        refreshActiveServices(),
      ]);
      setLoading(false);
    })();
  }, [token, authLoading, isAdmin, refreshUsers, refreshAcceptedServices, refreshWorkerRequests, refreshServiceRequests, refreshActiveServices]);

  useEffect(() => {
    if (!loading && isAdmin) {
      refreshActiveServices();
    }
  }, [loading, isAdmin, refreshActiveServices]);

  useEffect(() => {
    if (!loading && isAdmin) {
      refreshWorkerRequests();
    }
  }, [loading, isAdmin, refreshWorkerRequests]);

  useEffect(() => {
    if (!loading && isAdmin) {
      refreshServiceRequests();
    }
  }, [loading, isAdmin, refreshServiceRequests]);

  return (
    <AdminContext.Provider
      value={{
        users,
        loading,
        refreshUsers,
        acceptedServiceCount,
        refreshAcceptedServices,
        workerRequests,
        workerRequestsCount,
        workerRequestsPage,
        setWorkerRequestsPage,
        refreshWorkerRequests,
        serviceRequests,
        serviceRequestsCount,
        serviceRequestsPage,
        setServiceRequestsPage,
        refreshServiceRequests,
        activeServices,
        activeServicesCount,
        activeServicesPage,
        setActiveServicesPage,
        activeServicesSearch,
        setActiveServicesSearch,
        refreshActiveServices,
        isReady: !loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

import api from "@/services/axiosConfig";
import { getSession } from "next-auth/react";
import { Ticket, Servicio, WorkerRequestTicket } from "@/types";

async function getToken() {
  const session = await getSession();
  return session?.backendJwt || "";
}

// ==========================
// SOLICITUDES DE SERVICIOS
// ==========================
export async function fetchServiceRequests(): Promise<Ticket[]> {
  const token = await getToken();
  const res = await api.get("/tickets", {
    params: { type: "service", status: "pending" },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchServiceRequestsPaginated(
  page = 1,
  limit = 5
): Promise<{ tickets: Ticket[]; total: number }> {
  const token = await getToken();

  const res = await api.get("/tickets", {
    params: { type: "service", status: "pending", page, limit },
    headers: { Authorization: `Bearer ${token}` },
  });

  const {tickets, total} = res.data;

  return {
    tickets,
    total,
  };
}

export async function acceptServiceRequest(ticketId: string) {
  const token = await getToken();
  await api.put(`/tickets/accept/${ticketId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function rejectServiceRequest(ticketId: string) {
  const token = await getToken();
  await api.put(`/tickets/reject/${ticketId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ==========================
// SOLICITUDES DE WORKERS
// ==========================
export async function fetchWorkerRequests(): Promise<WorkerRequestTicket[]> {
  const token = await getToken();
  const res = await api.get("/tickets", {
    params: { type: "to-worker", status: "pending" },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchWorkerRequestsPaginated(
  page = 1,
  limit = 100
): Promise<{ tickets: WorkerRequestTicket[]; total: number }> {
  const token = await getToken();

  const res = await api.get("/tickets", {
    params: { type: "to-worker", status: "pending", page, limit },
    headers: { Authorization: `Bearer ${token}` },
  });

  const {tickets, total} = res.data;

  return {
    tickets,
    total,
  };
}

export async function acceptWorkerRequest(ticketId: string, userId: string) {
  const token = await getToken();

  // Aceptar ticket
  await api.put(`/tickets/accept/${ticketId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Cambiar rol
  await api.put(`/users/to-worker/${userId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function rejectWorkerRequest(ticketId: string) {
  const token = await getToken();
  await api.put(`/tickets/reject/${ticketId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ==========================
// SERVICIOS ACTIVOS
// ==========================
export async function fetchActiveServices(
  page = 1,
  limit = 10,
  search = ""
): Promise<{ services: Servicio[]; total: number }> {
  const token = await getToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { status: "active", page, limit };
  if (search) params.search = search;

  const res = await api.get("/services", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function deactivateService(serviceId: string) {
  const token = await getToken();
  const res = await api.put(`/services/deactivate/${serviceId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
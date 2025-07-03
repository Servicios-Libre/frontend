import api from "@/services/axiosConfig";
import { Ticket, Servicio, WorkerRequestTicket } from "@/types";

// ==========================
// SOLICITUDES DE SERVICIOS
// ==========================
export async function fetchServiceRequests(): Promise<Ticket[]> {
  const res = await api.get("/tickets", {
    params: { type: "service", status: "pending" },
  });
  return res.data;
}

export async function fetchServiceRequestsPaginated(
  page = 1,
  limit = 5
): Promise<{ tickets: Ticket[]; total: number }> {
  const res = await api.get("/tickets", {
    params: { type: "service", status: "pending", page, limit },
  });

  const { tickets, total } = res.data;
  return { tickets, total };
}

export async function acceptServiceRequest(ticketId: string) {
  await api.put(`/tickets/accept/${ticketId}`);
}

export async function rejectServiceRequest(ticketId: string) {
  await api.put(`/tickets/reject/${ticketId}`);
}

// ==========================
// SOLICITUDES DE WORKERS
// ==========================
export async function fetchWorkerRequests(): Promise<WorkerRequestTicket[]> {
  const res = await api.get("/tickets", {
    params: { type: "to-worker", status: "pending" },
  });
  return res.data;
}

export async function fetchWorkerRequestsPaginated(
  page = 1,
  limit = 100
): Promise<{ tickets: WorkerRequestTicket[]; total: number }> {
  const res = await api.get("/tickets", {
    params: { type: "to-worker", status: "pending", page, limit },
  });

  const { tickets, total } = res.data;
  return { tickets, total };
}

export async function acceptWorkerRequest(ticketId: string, userId: string) {
  // Aceptar ticket
  await api.put(`/tickets/accept/${ticketId}`);

  // Cambiar rol
  await api.put(`/users/to-worker/${userId}`);
}

export async function rejectWorkerRequest(ticketId: string) {
  await api.put(`/tickets/reject/${ticketId}`);
}

// ==========================
// SERVICIOS ACTIVOS
// ==========================
export async function fetchActiveServices(
  page = 1,
  limit = 10,
  search = ""
): Promise<{ services: Servicio[]; total: number }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { status: "active", page, limit };
  if (search) params.search = search;

  const res = await api.get("/services", { params });
  return res.data;
}

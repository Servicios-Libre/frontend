import { WorkerRequestTicket } from "@/types";
import { Ticket, Servicio } from "@/types";
const API = process.env.NEXT_PUBLIC_API_URL || "";

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

export async function fetchWorkerRequests(): Promise<WorkerRequestTicket[]> {
  const res = await fetch(`${API}/tickets?type=to-worker&status=pending`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener solicitudes");
  return res.json();
}

export async function acceptWorkerRequest(ticketId: string, userId: string) {
  const token = getToken();
  // 1. Aceptar ticket
  await fetch(`${API}/tickets/accept/${ticketId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  // 2. Cambiar rol a worker
  await fetch(`${API}/users/to-worker/${userId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function rejectWorkerRequest(ticketId: string) {
  const token = getToken();
  await fetch(`${API}/tickets/reject/${ticketId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchServiceRequests(): Promise<Ticket[]> {
  const res = await fetch(`${API}/tickets?type=service&status=pending`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener solicitudes de servicio");
  return res.json();
}

export async function acceptServiceRequest(ticketId: string) {
  const token = getToken();
  // 1. Aceptar ticket
  await fetch(`${API}/tickets/accept/${ticketId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  // 2. Aprobar servicio (ajusta la ruta según tu backend)
  // await fetch(`${API}/services/approve/${serviceId}`, {
  //   method: "PUT",
  //   headers: { Authorization: `Bearer ${token}` },
  // });
}

export async function rejectServiceRequest(ticketId: string) {
  const token = getToken();
  await fetch(`${API}/tickets/reject/${ticketId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchActiveServices(page = 1, limit = 10, search = ""): Promise<{ services: Servicio[]; total: number }> {
  const params = new URLSearchParams({ status: "active", page: String(page), limit: String(limit) });
  if (search) params.append("search", search);
  const res = await fetch(`${API}/services?${params.toString()}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener servicios activos");
  return res.json();
}

export async function deactivateService(serviceId: string) {
  const res = await fetch(`${API}/services/deactivate/${serviceId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Error al dar de baja el servicio");
  return res.json();
}
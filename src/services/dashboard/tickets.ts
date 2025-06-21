import { WorkerRequestTicket } from "@/types";
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
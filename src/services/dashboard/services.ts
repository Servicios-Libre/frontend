import { Servicio } from "@/types";
const API = process.env.NEXT_PUBLIC_API_URL || "";

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
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
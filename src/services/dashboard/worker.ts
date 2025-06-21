/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, WorkerService } from "@/types";
const API = process.env.NEXT_PUBLIC_API_URL || "";

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

export async function fetchWorkers(page = 1, limit = 10, search = ""): Promise<{ users: User[]; total: number }> {
  const params = new URLSearchParams({ role: "worker", page: String(page), limit: String(limit) });
  if (search) params.append("search", search);
  const res = await fetch(`${API}/users?${params.toString()}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener trabajadores");
  return res.json();
}

export async function downgradeWorker(userId: string) {
  const token = getToken();
  await fetch(`${API}/users/to-user/${userId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchUserProfile(userId: string) {
  const res = await fetch(`${API}/users/byId?id=${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener perfil");
  return res.json();
}

export async function fetchWorkerServices(userId: string): Promise<WorkerService[]> {
  const res = await fetch(`${API}/services/worker/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener servicios");
  const data = await res.json();
  // Mapeo seguro a WorkerService[]
  return data.map((s: any): WorkerService => ({
    id: s.id,
    title: s.title,
    description: s.description ?? "",
    category: s.category ?? { id: "", name: "", icon: "" },
    work_photos: Array.isArray(s.work_photos)
      ? s.work_photos.map((wp: any) => ({
          id: wp.id ?? "",
          photo_url: wp.photo_url ?? "",
        }))
      : [],
  }));
}
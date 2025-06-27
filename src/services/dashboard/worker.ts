/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/axiosConfig"; // Ajustá esta ruta si es diferente
import { User, WorkerService } from "@/types";

export async function fetchAllUsers(): Promise<User[]> {
  const pageSize = 50;
  let page = 1;
  let allUsers: User[] = [];

  while (true) {
    const res = await api.get("/users", {
      params: {
        page,
        limit: pageSize,
      },
    });

    const { users } = res.data;
    allUsers = [...allUsers, ...users];

    if (users.length < pageSize) break;
    page++;
  }

  return allUsers;
}

export async function fetchWorkers(page = 1, limit = 5, search = ""): Promise<{ users: User[]; total: number }> {
  const params: Record<string, string> = {
    role: "worker",
    page: String(page),
    limit: String(limit),
  };
  if (search) params.search = search;

  const res = await api.get("/users", { params });
  return res.data;
}

export async function downgradeWorker(userId: string) {
  await api.put(`/users/to-user/${userId}`);
}

export async function fetchUserProfile(userId: string) {
  const res = await api.get(`/users/byId`, {
    params: { id: userId },
  });
  return res.data;
}

export async function fetchWorkerServices(userId: string): Promise<WorkerService[]> {
  const res = await api.get(`/services/worker/${userId}`);
  const data = res.data;

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

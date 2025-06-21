import api from "@/services/axiosConfig";
import { User } from "@/types";

export const getWorkerById = async (id: string): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");

  // Usa la instancia api, NO axios directamente
  const response = await api.get(`/users/worker/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  if (data.address_id && !data.address) {
    data.address = data.address_id;
  }

  return data;
};

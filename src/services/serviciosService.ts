import { Servicio } from "@/types";
import api from "./axiosConfig";

export const obtenerServicios = async (
  busqueda: string,
  categorias: string[],
  page: number,
  limit: number
): Promise<{ servicios: Servicio[]; total: number }> => {
  const query = new URLSearchParams();

  if (busqueda) query.append("busqueda", busqueda);
  categorias.forEach((catId) => query.append("category", String(catId)));
  query.append("page", String(page));
  query.append("limit", String(limit));

  const response = await api.get(`/services?${query.toString()}`);
  return response.data;
};

export const editarServicio = async (
  id: string,
  data: { title: string; description: string },
  token: string
) => {
  const response = await api.put(`/services/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
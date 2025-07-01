import { Servicio } from "@/types";
import api from "./axiosConfig";

/**
 * Obtiene servicios según búsqueda, filtros de categorías, paginación.
 */
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

/**
 * Edita un servicio. Requiere token del usuario (admin o propietario).
 */
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

/**
 * Elimina un servicio. Requiere token, obtenido desde contexto de autenticación.
 */
export const eliminarServicio = async (id: string, token: string) => {
  if (!token) {
    throw new Error("No autorizado: token no disponible");
  }

  const response = await api.delete(`/services/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Elimina una imagen de un servicio. Requiere token.
 */
export const eliminarFotoDeServicio = async (
  serviceId: string,
  photoId: string,
  token: string
) => {

  return api.delete(`/files/service/${serviceId}`, {
    params: {
      workPhoto_id: photoId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
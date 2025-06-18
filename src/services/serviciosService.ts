import axios from "axios";
import { Servicio } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // <-- Cambiado

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

  const response = await axios.get(`${API_URL}/services?${query.toString()}`);
  return response.data;
};
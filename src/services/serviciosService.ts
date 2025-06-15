import axios from "axios";
import { Servicio } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const obtenerServicios = async (busqueda: string, categorias: string[]): Promise<Servicio[]> => {
  const query = new URLSearchParams();

  if (busqueda) query.append("q", busqueda);
  categorias.forEach((catId) => query.append("categoryIds", String(catId)));

  const response = await axios.get(`${API_URL}/services?${query.toString()}`);
  return response.data;
};
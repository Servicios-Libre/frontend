import axios from "axios";
import { Categoria } from "@/types/index";

const API_URL = 'http://localhost:8080';

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const response = await axios.get(`${API_URL}/services/categories`);
  return response.data;
};
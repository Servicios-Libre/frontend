import axios from "axios";
import { Perfil } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (params?: { page?: number; limit?: number; role?: string }): Promise<Perfil[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const query = params
    ? '?' + Object.entries(params).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}=${v}`).join('&')
    : '';
  const res = await axios.get(`${API_URL}/users${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (): Promise<Perfil> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get(`${API_URL}/users/byId`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const changeUserToWorker = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.put(`${API_URL}/users/to-worker/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
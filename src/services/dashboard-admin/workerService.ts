/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Perfil } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getActiveWorkers = async (): Promise<Perfil[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get(`${API_URL}/users?role=worker`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Para solicitudes de worker, filtra tickets de tipo "to-worker" y status "pendiente"
export const getWorkerRequests = async (): Promise<any[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get(
    `${API_URL}/tickets?type=to-worker&status=pendiente`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const approveWorkerRequest = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.post(
    `${API_URL}/worker-requests/${userId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectWorkerRequest = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.post(
    `${API_URL}/worker-requests/${userId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeWorker = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.post(
    `${API_URL}/workers/${userId}/remove`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
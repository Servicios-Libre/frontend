/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Servicio } from "@/types";
import axios from "axios";
import api from "@/services/axiosConfig";
const API = process.env.NEXT_PUBLIC_API_URL || "";

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchActiveServices(page = 1, limit = 10, busqueda = ""): Promise<{ services: Servicio[]; total: number }> {
  const params: any = { page, limit };
  if (busqueda) params.busqueda = busqueda;
  try {
    const res = await api.get("/services", { params });
    return {
      services: res.data.servicios || [],
      total: res.data.total || 0,
    };
  } catch (error) {
    throw new Error("Error al obtener servicios activos");
  }
}

export async function fetchAllActiveServices(search = ""): Promise<Servicio[]> {
  const limit = 50;
  let page = 1;
  let allServices: Servicio[] = [];
  let totalFetched = 0;
  let total = Infinity;

  while (totalFetched < total) {
    const { services, total: totalFromServer } = await fetchActiveServices(page, limit, search);
    allServices = allServices.concat(services);
    totalFetched += services.length;
    total = totalFromServer;
    page++;
  }

  return allServices;
}

export async function deactivateService(serviceId: string) {
  try {
    const res = await axiosInstance.put(`/services/deactivate/${serviceId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al dar de baja el servicio");
  }
}
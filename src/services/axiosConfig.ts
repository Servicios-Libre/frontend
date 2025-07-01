// src/services/axiosConfig.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.backendJwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 👉 Manejo automático de error 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("[axios] Token expirado o inválido. Cerrando sesión.");
      await signOut({ callbackUrl: "/auth" }); // o donde quieras redirigir
    }
    return Promise.reject(error);
  }
);

export default api;

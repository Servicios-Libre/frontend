import axios from "axios";
import { Ticket } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllTickets = async (params?: { type?: string; status?: string }): Promise<Ticket[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const query = params
    ? '?' + Object.entries(params).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}=${v}`).join('&')
    : '';
  const res = await axios.get(`${API_URL}/tickets${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const acceptTicket = async (ticketId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.put(`${API_URL}/tickets/accept/${ticketId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const rejectTicket = async (ticketId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.put(`${API_URL}/tickets/reject/${ticketId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createWorkerRequestTicket = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  return axios.post(`${API_URL}/tickets/new/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
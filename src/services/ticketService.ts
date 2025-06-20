import axios from "axios";
import api from "./axiosConfig";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://back-servicio-libre.onrender.com";

interface TicketPayload {
  type: "to-worker" | "service";
  status?: "pending" | "accepted" | "rejected";
  title?: string;
  description?: string;
  category?: string;
}

export const createTicket = async (userId: string, payload: TicketPayload) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");

  const data = {
    ...payload,
    status: payload.status || "pending",
  };
  console.log(token);
  const response = await axios.post(
    `${API_URL}/tickets/new/${userId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Pedir al back una ruta filtrando tickets de un x user
export const getUserTickets = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const response = await api.get("/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Filtra solo los tickets del usuario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.filter((ticket: any) => ticket.user_id === userId);
};
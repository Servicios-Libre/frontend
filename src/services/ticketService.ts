import api from "./axiosConfig";

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
  const response = await api.post(
    `/tickets/new/${userId}`,
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
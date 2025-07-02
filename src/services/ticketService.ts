import api from "./axiosConfig";

export interface TicketPayload {
  type: "to-worker" | "service";
  status?: "pending" | "accepted" | "rejected";
  title?: string;
  description?: string;
  category?: string;
}

export const createTicket = async (userId: string, payload: TicketPayload) => {
  
  const response = await api.post(`/tickets/new/${userId}`, payload);
  return response.data;
};
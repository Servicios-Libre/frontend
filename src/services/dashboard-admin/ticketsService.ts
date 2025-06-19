import axios from "axios";
import { Ticket } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllTickets = async (): Promise<Ticket[]> => {
  const res = await axios.get(`${API_URL}/tickets`);
  return res.data;
};
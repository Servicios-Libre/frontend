import axios from "axios";
import { Ticket } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllTickets = async (): Promise<Ticket[]> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No se encontró el token");
    const res = await axios.get(`${API_URL}/tickets`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
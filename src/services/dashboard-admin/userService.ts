import axios from "axios";
import { Perfil } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<Perfil[]> => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const getUserById = async (id: string): Promise<Perfil> => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};
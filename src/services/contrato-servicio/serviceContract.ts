/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ServiceContractFormValues } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const submitServiceContract = async (data: ServiceContractFormValues): Promise<any> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.post(`${API_URL}/contracts`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
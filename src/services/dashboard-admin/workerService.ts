import axios from "axios";
import { Perfil } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getActiveWorkers = async (): Promise<Perfil[]> => {
  const res = await axios.get(`${API_URL}/workers`);
  return res.data;
};

export const getWorkerRequests = async (): Promise<Perfil[]> => {
  const res = await axios.get(`${API_URL}/worker-requests`);
  return res.data;
};

export const approveWorkerRequest = async (userId: string) => {
  return axios.post(`${API_URL}/worker-requests/${userId}/approve`);
};

export const rejectWorkerRequest = async (userId: string) => {
  return axios.post(`${API_URL}/worker-requests/${userId}/reject`);
};

export const removeWorker = async (userId: string) => {
  return axios.post(`${API_URL}/workers/${userId}/remove`);
};
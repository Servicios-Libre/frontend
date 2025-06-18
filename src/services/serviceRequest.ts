import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // <-- Agregado

export type ServiceRequestBody = {
  worker_id: string;
  title: string;
  description: string;
  category: string;
};

export const sendServiceRequest = async (data: ServiceRequestBody): Promise<void> => {
  await axios.post(`${API_URL}/services/new`, data); // <-- Cambiado
};

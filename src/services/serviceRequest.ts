import axios from 'axios';

export type ServiceRequestBody = {
  worker_id: string;
  title: string;
  description: string;
  category: string;
};

export const sendServiceRequest = async (data: ServiceRequestBody): Promise<void> => {
  await axios.post('http://localhost:8080/services/new', data); // Cambiá la ruta si tu backend usa otra
};

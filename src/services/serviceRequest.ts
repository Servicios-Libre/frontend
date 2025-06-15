import axios from 'axios';

export type ServiceRequestBody = {
  worker_id: string;
  title: string;
  description: string;
  category: string;
};

export const sendServiceRequest = async (data: ServiceRequestBody): Promise<void> => {
  await axios.post('/api/servicios', data); // Cambiá la ruta si tu backend usa otra
};

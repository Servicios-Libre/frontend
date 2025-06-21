import api from './axiosConfig';

export type ServiceRequestBody = {
  worker_id: string,
  title: string;
  description: string;
  category: string;
};

export const sendServiceRequest = async (data: ServiceRequestBody): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Token no encontrado");

  const response = await api.post('/services/new', data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

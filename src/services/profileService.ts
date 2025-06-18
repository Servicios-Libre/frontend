/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async (): Promise<any> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get(`${apiUrl}/users/byId`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProfile = async (data: any): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  // No enviar user_pic
  const { user_pic, ...dataToSend } = data;
  await axios.post(`${apiUrl}/users/update`, dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

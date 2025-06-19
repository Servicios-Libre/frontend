/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getProfile = async (): Promise<any> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get(`${API_URL}/users/byId`, {
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
  await axios.post(`${API_URL}/users/update`, dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileImage = async (file: any) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios.post(`${API_URL}/files/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data) throw new Error("Error al subir la imagen");
  } catch (error) {
    console.error("Error subiendo imagen:", error);
  }
};

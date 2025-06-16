/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getProfile = async (): Promise<any> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const res = await axios.get("http://localhost:8080/users/byId", {
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
  await axios.post("http://localhost:8080/users/update", dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

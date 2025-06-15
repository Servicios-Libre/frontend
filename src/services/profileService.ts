import axios from "axios";
import { UserProfile } from "@/types";

export const getProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No se encontró el token");

  const res = await axios.get<UserProfile>("http://localhost:8080/users/byId", {
    headers: {
      Authorization: `Bearer ${token}`, // importante el Bearer
    },
  });

  return res.data;
};

export const updateProfile = async (data: UserProfile): Promise<void> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No se encontró el token");

  await axios.put("http://localhost:8080/users/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

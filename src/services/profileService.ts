import axios from "axios";
import { UserProfile } from "@/types";

// Obtener perfil actual
export const getProfile = async (): Promise<UserProfile> => {
  const res = await axios.get<UserProfile>("/api/profile");
  return res.data;
};

// Actualizar perfil
export const updateProfile = async (data: UserProfile): Promise<void> => {
  await axios.put("/api/profile", data);
};

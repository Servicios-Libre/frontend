// src/services/profileService.ts
import api from "./axiosConfig";

export const getProfile = async (token: string | null) => {
  if (!token) throw new Error("No se encontró el token");

  const response = await api.get(`/users/ById`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (token: string | null, data: object): Promise<void> => {
  if (!token) throw new Error("No se encontró el token");

  await api.put(`/users/update/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileImage = async (token: string | null, file: File) => {
  if (!token) throw new Error("No se encontró el token");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.post(`/files/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data) throw new Error("Error al subir la imagen");
  } catch (error) {
    console.error("[updateProfileImage] Error subiendo imagen:", error);
  }
};

export const updateSocialLinks = async (socialData: {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}) => {
  try {
    // const res = await api.put("/users/social-links", socialData);
    // return res.data;
    console.log(
      "Datos para actualizar",
      socialData.facebook,
      socialData.linkedin,
      socialData.twitter,
      socialData.instagram
    );

  } catch (error) {
    console.error("Error al actualizar redes sociales:", error);
    throw error;
  }
};

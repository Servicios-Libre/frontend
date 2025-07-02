// src/services/profileService.ts
import api from "./axiosConfig";

export const getProfile = async () => {
  const response = await api.get(`/users/ById`);
  return response.data;
};

export const updateProfile = async (data: object): Promise<void> => {
  await api.put(`/users/update/`, data);
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.post(`/files/user`, formData);
    if (!res.data) throw new Error("Error al subir la imagen");
  } catch (error) {
    console.error("[updateProfileImage] Error subiendo imagen:", error);
    throw error;
  }
};

export const updateSocialLinks = async (socialData: {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}) => {
  try {
    const res = await api.put("/users/social-links", socialData);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar redes sociales:", error);
    throw error;
  }
};

export async function fetchStatesWithCities() {
  const res = await api.get("/users/states");
  return res.data;
}

export const createSocialLinks = async (socialData: {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}) => {
  try {
    const res = await api.post("/users/social", socialData);
    return res.data;
  } catch (error) {
    console.error("Error al crear redes sociales:", error);
    throw error;
  }
};

export const redirectToPayment = async () => {
  try {
    const res = await api.post("/payment/create-order");
    return res.data.init_point;
  } catch (error) {
    console.error("Error al redirigir a la página de pago:", error);
    throw error
  }
}

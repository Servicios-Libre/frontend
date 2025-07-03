// src/services/profileService.ts
import api from "./axiosConfig";

export const getProfile = async () => {
  const response = await api.get(`/users/ById`);
  return response.data;
};

export const updateProfile = async (data: object): Promise<void> => {
  console.log("[datos para actualizar el usuario]:", data);

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
    const cleanedData: Record<string, string> = {};

    if (socialData.facebook?.trim()) cleanedData.facebook = socialData.facebook.trim();
    if (socialData.linkedin?.trim()) cleanedData.linkedin = socialData.linkedin.trim();
    if (socialData.instagram?.trim()) cleanedData.instagram = socialData.instagram.trim();
    if (socialData.twitter?.trim()) cleanedData.x = socialData.twitter.trim();

    const res = await api.put("/users/social", cleanedData);

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
    const cleanedData: Record<string, string> = {};

    if (socialData.facebook) cleanedData.facebook = socialData.facebook;
    if (socialData.linkedin) cleanedData.linkedin = socialData.linkedin;
    if (socialData.instagram) cleanedData.instagram = socialData.instagram;
    if (socialData.twitter) cleanedData.x = socialData.twitter;

    const res = await api.post("/users/social", cleanedData);
    return res.data;
  } catch (error) {
    console.error("Error al crear redes sociales:", error);
    throw error;
  }
};

export const redirectToMercadoPago = async () => {
  try {
    const res = await api.post("/payment/create-order");
    return res.data.init_point;
  } catch (error) {
    console.error("Error al redirigir a la página de pago:", error);
    throw error;
  }
};

export const redirectToStripe = async () => {
  try {
    const res = await api.post("/stripe/create-checkout-session", {
      lookup_key: "premium_monthly",
    });
    return res.data.url;
  } catch (error) {
    console.error("Error al redirigir a la página de pago:", error);
    throw error;
  }
};

export async function checkIfUserIsWorker(id: string): Promise<boolean> {
  const response = await api.get(`/users/is-worker/${id}`);
  return response.data;
}
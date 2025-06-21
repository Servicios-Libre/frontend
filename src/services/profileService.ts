import api from "./axiosConfig";

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  const response = await api.get(`/users/ById`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (data: object): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");

  await api.put(`/users/update/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileImage = async (file: File) => {
  const token = localStorage.getItem("token");

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
    console.error("Error subiendo imagen:", error);
  }
};
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

export const updateProfile = async (userId: string, data: object): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");
  console.log(userId, data);

  await api.put(`/users/update/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
import api from "@/services/axiosConfig";

export const obtenerCategorias = async () => {
  const res = await api.get("/services/categories");
  return res.data;
};
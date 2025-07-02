// services/workerService.ts
import api from "@/services/axiosConfig";
import { User } from "@/types";

// ✅ Para usuario logueado (con token automático del interceptor)
export const getWorkerById = async (id: string): Promise<User> => {
  try {
    const { data } = await api.get(`/users/worker/${id}`);

    if (data.address_id && !data.address) {
      data.address = data.address_id;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener datos del trabajador:", error);
    throw new Error("No se pudo obtener el perfil del trabajador.");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPublicWorkerServices = async (id: string): Promise<any> => {
  try {
    const { data } = await api.get(`/services/worker/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener servicios públicos del trabajador:", error);
    throw new Error("No se pudo obtener servicios públicos.");
  }
};

// services/imageService.ts

export const uploadServiceImages = async (serviceId: string, files: File[]) => {
  if (!serviceId) throw new Error("ID de servicio inválido.");
  if (!files.length) return;

  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    const res = await api.post(`/files/service/${serviceId}`, formData);
    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 413) {
      throw new Error("La imagen es demasiado grande. Máximo 2MB.");
    }
    throw new Error(error.response?.data?.message || "Error al subir imagen.");
  }
};

export const addPhotosToService = async (
  serviceId: string,
  newFiles: FileList | null
): Promise<{ id: string; photo_url: string }[]> => {
  if (!newFiles || newFiles.length === 0) return [];

  const filesArray = Array.from(newFiles);

  try {
    await uploadServiceImages(serviceId, filesArray);

    // Simulación de URLs temporales
    return filesArray.map((file, i) => ({
      id: `temp-${Date.now()}-${i}`,
      photo_url: URL.createObjectURL(file),
    }));
  } catch (error) {
    console.error("Error al añadir fotos:", error);
    throw error;
  }
};

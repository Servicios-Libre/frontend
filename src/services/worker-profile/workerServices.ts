import api from "@/services/axiosConfig";
import { User } from "@/types";

export const getWorkerById = async (id: string): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token");

  const response = await api.get(`/users/worker/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  if (data.address_id && !data.address) {
    data.address = data.address_id;
  }

  return data;
};

export const uploadServiceImages = async (serviceId: string, files: File[]) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación.");
  if (!serviceId) throw new Error("ID de servicio inválido.");

  const results = [];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file); // clave correcta
  });

  try {
    const res = await api.post(`/files/service/${serviceId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    results.push(res.data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 413) {
      throw new Error("La imagen es demasiado grande. Máximo 2MB.");
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Error al subir la imagen.");
  }

  return results;
};

export const addPhotosToService = async (
  serviceId: string,
  newFiles: FileList | null
): Promise<{ id: string; photo_url: string }[]> => {
  if (!newFiles || newFiles.length === 0) {
    return [];
  }

  const filesArray = Array.from(newFiles);

  try {
    await uploadServiceImages(serviceId, filesArray);
    const simulatedUploadedPhotos = filesArray.map((file, index) => ({
      id: `temp-id-${Date.now()}-${index}`,
      photo_url: URL.createObjectURL(file),
    }));

    return simulatedUploadedPhotos;
  } catch (error) {
    console.error("Error al añadir fotos al servicio:", error);
    throw error;
  }
};

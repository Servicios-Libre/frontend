export async function uploadToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "TU_UPLOAD_PRESET"); // Reemplaza por tu upload preset
  // Opcional: formData.append("folder", "nombre-de-tu-carpeta"); // Si quieres guardar en una carpeta

  const res = await fetch("https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.secure_url as string;
}
// components/worker-profile/WorkerProfileClient.tsx
"use client";
import { useEffect, useState } from "react";
import { getWorkerById, addPhotosToService } from "@/services/worker-profile/workerServices";
import { User, WorkerService } from "@/types";
import WorkerHeader from "./WorkerHeader";
import WorkerServiceList from "./WorkerServiceList";

export default function WorkerProfileClient({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false); // Nuevo estado para indicar que se está guardando

  useEffect(() => {
    getWorkerById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error al cargar el perfil");
        setLoading(false);
      });
  }, [id]);

  const handleSaveService = async (updatedService: WorkerService, newFiles: FileList | null) => {
    setIsSaving(true); // Activar estado de guardado
    setError(null); // Limpiar errores previos

    if (!user) {
      console.error("No se pudo guardar: usuario no cargado.");
      setError("No se pudo guardar. Intenta recargar la página.");
      setIsSaving(false);
      return;
    }

    try {
      // 1. Solo sube las nuevas imágenes
      const uploadedPhotos = await addPhotosToService(updatedService.id, newFiles);
      
      setUser((prev) =>
        prev
          ? {
            ...prev,
            services: prev.services.map((s) =>
              s.id === updatedService.id
                ? {
                  ...s,
                  title: updatedService.title,       // Actualiza título localmente (si se modificó en el modal)
                  description: updatedService.description, // Actualiza descripción localmente (si se modificó en el modal)
                  work_photos: [
                    ...s.work_photos.filter((img) => typeof img.id === "string"), // Mantiene las fotos existentes que no se "eliminaron" (filtro del modal)
                    ...uploadedPhotos, // Añade las fotos recién subidas
                  ],
                }
                : s
            ),
          }
          : prev
      );

      // toast.success("¡Fotos añadidas con éxito!"); // Notificación de éxito

    } catch (err) {
      console.error("Error al añadir fotos al servicio:", err);
      setError("Error al guardar las nuevas fotos.");
      // toast.error("Error al añadir fotos al servicio.");
    } finally {
      setIsSaving(false); // Desactivar estado de guardado
    }
  };

  // Mensaje de carga mejorado
  if (loading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (isSaving) return <p className="text-center py-10">Guardando fotos...</p>; // Mensaje específico para subir fotos
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center py-10">Trabajador no encontrado.</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f4f8fb] to-[#e8ecf1] pt-32 pb-16 flex flex-col items-center">
      <WorkerHeader user={user} />
      <WorkerServiceList services={user.services} onSave={handleSaveService} />
    </main>
  );
}
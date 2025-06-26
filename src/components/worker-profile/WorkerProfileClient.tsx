"use client";
import { useEffect, useState } from "react";
import { getWorkerById, addPhotosToService } from "@/services/worker-profile/workerServices";
import { User, WorkerService } from "@/types";
import WorkerHeader from "./WorkerHeader";
import WorkerServiceList from "./WorkerServiceList";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import ServiceDetailModal from "./ServiceDetailModal";

export default function WorkerProfileClient({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [initialService, setInitialService] = useState<WorkerService | null>(null);

  const searchParams = useSearchParams();
  const serviceIdFromQuery = searchParams.get("serviceId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<{ id: string }>(token);
        if (decoded.id === id) {
          setIsOwner(true);
        }
      } catch (e) {
        console.error("Error decoding token", e);
      }
    }
  }, [id]);

  useEffect(() => {
    getWorkerById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);

        // Buscar el servicio si hay serviceId en la URL
        if (serviceIdFromQuery) {
          const found = data.services.find((s) => s.id === serviceIdFromQuery);
          if (found) {
            setInitialService(found);
          }
        }
      })
      .catch((e) => {
        setError(e.message || "Error al cargar el perfil");
        setLoading(false);
      });
  }, [id, serviceIdFromQuery]);

  const handleSaveService = async (updatedService: WorkerService, newFiles: FileList | null) => {
    setIsSaving(true);
    setError(null);

    if (!user) {
      setError("No se pudo guardar. Intenta recargar la página.");
      setIsSaving(false);
      return;
    }

    try {
      const uploadedPhotos = await addPhotosToService(updatedService.id, newFiles);
      setUser((prev) =>
        prev
          ? {
            ...prev,
            services: prev.services.map((s) =>
              s.id === updatedService.id
                ? {
                  ...s,
                  title: updatedService.title,
                  description: updatedService.description,
                  work_photos: [
                    ...s.work_photos.filter((img) => typeof img.id === "string"),
                    ...uploadedPhotos,
                  ],
                }
                : s
            ),
          }
          : prev
      );
    } catch (err) {
      console.error("Error al añadir fotos:", err);
      setError("Error al guardar las nuevas fotos.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (isSaving) return <p className="text-center py-10">Guardando fotos...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center py-10">Trabajador no encontrado.</p>;

  return (
    <main className="min-h-screen bg-[#f6f8fa] pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-6 px-4 sm:px-8">
        <aside className="sm:col-span-4 lg:col-span-3">
          <div className="bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600 shadow-md rounded-b-lg p-6 sticky top-20">
            <WorkerHeader user={user} />
          </div>
        </aside>

        <section className="sm:col-span-8 lg:col-span-9">
          <WorkerServiceList
            services={user.services}
            onSave={handleSaveService}
            isOwner={isOwner}
            workerId={user.id}
            openDetailInitially={initialService}
          />
        </section>
      </div>
      {initialService && (
        <ServiceDetailModal
          service={initialService}
          workerId={user.id}
          onClose={() => setInitialService(null)}
        />
      )}
    </main>
  );
}

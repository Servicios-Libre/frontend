"use client";

import { useEffect, useState } from "react";
import { getWorkerById, addPhotosToService } from "@/services/worker-profile/workerServices";
import { User, WorkerService } from "@/types";
import WorkerHeader from "./WorkerHeader";
import WorkerServiceList from "./WorkerServiceList";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type WorkerProfileClientProps = {
  id: string;
};

export default function WorkerProfileClient({ id }: WorkerProfileClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [initialService, setInitialService] = useState<WorkerService | null>(null);

  const searchParams = useSearchParams();
  const serviceIdFromQuery = searchParams.get("serviceId");

  const { token, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !token) return; // 👈 esperamos a que cargue
    try {
      const decoded = jwtDecode<{ id: string }>(token);
      setIsOwner(decoded.id === id);
    } catch (e) {
      console.error("Error decoding token", e);
      setIsOwner(false);
    }
  }, [id, token, authLoading]);

  useEffect(() => {
    if (authLoading) return; // 👈 esperamos que cargue el token
    if (!token) {
      setError("No hay token disponible");
      setLoading(false);
      return;
    }

    getWorkerById(id, token)
      .then((data) => {
        setUser(data);
        setLoading(false);

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
  }, [id, serviceIdFromQuery, token, authLoading]);

  const handleSaveService = async (updatedService: WorkerService, newFiles: FileList | null) => {
    setIsSaving(true);
    setError(null);

    if (!user) {
      setError("No se pudo guardar. Intenta recargar la página.");
      setIsSaving(false);
      return;
    }

    try {
      let uploadedPhotos: { id: string; photo_url: string }[] = [];

      if (newFiles && newFiles.length > 0) {
        uploadedPhotos = await addPhotosToService(updatedService.id, newFiles, token!);
      }

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
                    ...updatedService.work_photos,
                    ...uploadedPhotos,
                  ],
                }
                : s
            ),
          }
          : prev
      );
    } catch (err) {
      console.error("Error al guardar los cambios del servicio:", err);
      setError("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || authLoading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (isSaving) return <p className="text-center py-10">Guardando cambios...</p>;
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
            onDeleteComplete={(deletedId) => {
              setUser((prev) =>
                prev
                  ? {
                    ...prev,
                    services: prev.services.filter((s) => s.id !== deletedId),
                  }
                  : prev
              );
            }}
          />
        </section>
      </div>
    </main>
  );
}

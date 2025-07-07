"use client";

import { useEffect, useState } from "react";
import {
  getWorkerById,
  addPhotosToService,
} from "@/services/worker-profile/workerServices";
import { User, WorkerService } from "@/types";
import WorkerHeader from "./WorkerHeader";
import WorkerServiceList from "./WorkerServiceList";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import WorkerReviews from "./WorkerReviews";
import LoadingScreen from "../loading-screen/LoadingScreen";

type WorkerProfileClientProps = {
  id: string;
};

export default function WorkerProfileClient({ id }: WorkerProfileClientProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [initialService, setInitialService] = useState<WorkerService | null>(
    null
  );

  const searchParams = useSearchParams();
  const serviceIdFromQuery = searchParams.get("serviceId");
  const { token, loading: authLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user?.name) document.title = `Servicio Libre - ${user?.name}`;
  }, [user?.name]);

  useEffect(() => {
    if (authLoading || !token) return;
    try {
      const decoded = jwtDecode<{ id: string }>(token);
      setIsOwner(decoded.id === id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setIsOwner(false);
    }
  }, [id, token, authLoading]);

  useEffect(() => {
    getWorkerById(id)
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

  const handleSaveService = async (
    updatedService: WorkerService,
    newFiles: FileList | null
  ) => {
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
        uploadedPhotos = await addPhotosToService(
          updatedService.id,
          newFiles,
        );
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

  if (!mounted || authLoading || loading) {
    return <LoadingScreen message="Cargando perfil..." />;
  }

  if (isSaving) {
    return <LoadingScreen message="Guardando cambios..." />;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center py-10">Trabajador no encontrado.</p>;
  }

  return (
    <main className="min-h-screen bg-[#f6f8fa] pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-6 px-4 sm:px-8">
        <aside className="sm:col-span-4 lg:col-span-3">
          <div className={`${user.premium ? "bg-gradient-to-b from-amber-400 to-amber-500" : "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-600"} shadow-md rounded-b-lg p-6 sticky top-20`}>
            <WorkerHeader
              user={user}
            />
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
          <WorkerReviews workerId={user.id} />
        </section>
      </div>
    </main>
  );
}

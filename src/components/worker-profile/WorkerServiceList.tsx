import { WorkerService } from "@/types";
import WorkerServiceCard from "./WorkerServiceCard";
import EditServiceModal from "./EditServiceModal";
import ServiceDetailModal from "./ServiceDetailModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { eliminarServicio } from "@/services/serviciosService";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import EmptyState from "@/components/ui/empty-state/EmptyState";

export default function WorkerServiceList({
  services,
  onSave,
  isOwner,
  openDetailInitially,
  workerId,
  onDeleteComplete,
}: {
  services: WorkerService[];
  onSave: (updated: WorkerService, newFiles: FileList | null) => void;
  isOwner: boolean;
  openDetailInitially?: WorkerService | null;
  workerId: string;
  onDeleteComplete?: (deletedId: string) => void;
}) {
  const [editingService, setEditingService] = useState<WorkerService | null>(null);
  const [detailedService, setDetailedService] = useState<WorkerService | null>(openDetailInitially ?? null);
  const { showToast } = useToast();
  const [serviceToDelete, setServiceToDelete] = useState<WorkerService | null>(null);
  const [servicesState, setServicesState] = useState<WorkerService[]>(services);
  const { token } = useAuth();

  // Si cambian los servicios desde el padre, se actualiza
  useEffect(() => {
    setServicesState(services);
  }, [services]);

  const visibleServices = isOwner
    ? servicesState
    : servicesState.filter((s) => s.ticket?.status === "accepted");

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      await eliminarServicio(serviceToDelete.id, token!);
      showToast("Servicio eliminado exitosamente", "success");

      // Elimina del estado local
      setServicesState((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
      setServiceToDelete(null);
      onDeleteComplete?.(serviceToDelete.id);
    } catch (err) {
      showToast("Error al eliminar el servicio", "error");
      console.error("Error al eliminar servicio:", err);
    }
  };

  return (
    <section className="w-full max-w-5xl py-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Servicios publicados</h2>
        {isOwner && (
          <>
            <Link
              href="/solicitud"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition ml-auto text-center"
            >
              + Crear servicio nuevo
            </Link>
          </>
        )}
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {visibleServices.length > 0 ? (
          visibleServices.map((service) => (
            <WorkerServiceCard
              key={service.id}
              service={service}
              onEdit={setEditingService}
              isOwner={isOwner}
              onDetail={setDetailedService}
              onDelete={setServiceToDelete}
            />
          ))
        ) : (
          <EmptyState
            message={
              isOwner
                ? "Aún no has publicado servicios. ¡Crea uno para comenzar!"
                : "Este trabajador aún no ha publicado servicios."
            }
            bgColor={isOwner ? "bg-blue-50" : "bg-gray-100"}
            textColor={isOwner ? "text-blue-500" : "text-gray-500"}
            borderColor={isOwner ? "border-blue-300" : "border-gray-300"}
            icon="tools"
          />
        )}
      </div>

      {editingService && (
        <EditServiceModal
          service={{ ...editingService, ticket: editingService.ticket ?? undefined }}
          isOpen={!!editingService}
          onClose={() => setEditingService(null)}
          onSave={onSave}
        />
      )}

      {detailedService && !isOwner && (
        <ServiceDetailModal
          service={detailedService}
          workerId={workerId}
          onClose={() => setDetailedService(null)}
        />
      )}

      {serviceToDelete && (
        <ConfirmDeleteModal
          service={serviceToDelete}
          isOpen={!!serviceToDelete}
          onClose={() => setServiceToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}

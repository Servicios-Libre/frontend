import { WorkerService } from "@/types";
import WorkerServiceCard from "./WorkerServiceCard";
import EditServiceModal from "./EditServiceModal";
import ServiceDetailModal from "./ServiceDetailModal"; // <-- Importo el modal de detalle
import { useState } from "react";
import Link from "next/link";

export default function WorkerServiceList({
  services,
  onSave,
  isOwner,
  openDetailInitially,
  workerId, // <-- NUEVO: recibe el workerId como prop
}: {
  services: WorkerService[];
  onSave: (updated: WorkerService, newFiles: FileList | null) => void;
  isOwner: boolean;
  openDetailInitially?: WorkerService | null;
  workerId: string; // <-- NUEVO: tipado
}) {
  const [editingService, setEditingService] = useState<WorkerService | null>(null);
  const [detailedService, setDetailedService] = useState<WorkerService | null>(openDetailInitially ?? null);

  const visibleServices = isOwner
    ? services
    : services.filter((s) => s.ticket?.status === "accepted");

  return (
    <section className="w-full max-w-5xl py-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Servicios publicados</h2>
        {isOwner && (
          <Link
            href="/solicitud"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition ml-auto text-center"
          >
            + Crear servicio nuevo
          </Link>
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
              onDetail={setDetailedService} // paso función para abrir modal detalle
            />
          ))
        ) : (
          <p className="text-gray-500">Este trabajador aún no ha publicado servicios.</p>
        )}
      </div>

      {/* Modal edición (solo owner) */}
      {editingService && (
        <EditServiceModal
          service={{ ...editingService, ticket: editingService.ticket ?? undefined }}
          isOpen={!!editingService}
          onClose={() => setEditingService(null)}
          onSave={onSave}
        />
      )}

      {/* Modal detalle (solo usuarios comunes, no owner) */}
      {detailedService && !isOwner && (
        <ServiceDetailModal
          service={detailedService}
          workerId={workerId} // <-- PASA EL workerId AQUÍ
          onClose={() => setDetailedService(null)}
        />
      )}
    </section>
  );
}

import { WorkerService } from "@/types";
import WorkerServiceCard from "./WorkerServiceCard";
import EditServiceModal from "./EditServiceModal";
import { useState } from "react";
import Link from "next/link";

export default function WorkerServiceList({
    services,
    onSave,
}: {
    services: WorkerService[];
    onSave: (updated: WorkerService, newFiles: FileList | null) => void;  // corregido
}) {
    const [editingService, setEditingService] = useState<WorkerService | null>(null);

    return (
        <section className="w-full max-w-5xl py-6">
            <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Servicios publicados</h2>

                <Link
                    href="/solicitud" // reemplazá con la ruta correcta
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition ml-auto text-center"
                >
                    + Crear servicio nuevo
                </Link>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
                {services.length > 0 ? (
                    services.map((service) => (
                        <WorkerServiceCard
                            key={service.id}
                            service={service}
                            onEdit={setEditingService}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Este trabajador aún no ha publicado servicios.</p>
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
        </section>
    );
}

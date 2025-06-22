import { WorkerService } from "@/types";
import WorkerServiceCard from "./WorkerServiceCard";
import EditServiceModal from "./EditServiceModal";
import { useState } from "react";

export default function WorkerServiceList({
    services,
    onSave,
}: {
    services: WorkerService[];
    onSave: (updated: WorkerService, newFiles: FileList | null) => void;  // corregido
}) {
    const [editingService, setEditingService] = useState<WorkerService | null>(null);

    return (
        <section className="w-full max-w-5xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Servicios publicados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

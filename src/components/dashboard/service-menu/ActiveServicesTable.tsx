"use client";

import React, { useState } from "react";
import { Servicio } from "@/types";
import { Trash2 } from "lucide-react";
import ServiciosSkeleton from "@/components/ui/serviciosSkeleton/ServiciosSkeleton";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import ConfirmModal from "@/components//dashboard/admin-management/AdminRemoveModal";

type Props = {
  services: Servicio[];
  onDesactivate: (service: Servicio) => void;
  loadingId?: string;
  isLoading?: boolean;
  isFiltered?: boolean;
};

export default function ActiveServicesTable({
  services = [],
  onDesactivate,
  isLoading = false,
  isFiltered = false,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Servicio | null>(null);
  const [localLoadingId, setLocalLoadingId] = useState<string | null>(null);

  const handleConfirmDesactivate = () => {
    if (!selectedService) return;
    setLocalLoadingId(selectedService.id);
    onDesactivate(selectedService);
    setSelectedService(null);
  };

  if (isLoading) return <ServiciosSkeleton />;

  if (!services.length && !isFiltered) {
    return (
      <EmptyState
        message="No hay servicios activos."
        bgColor="bg-purple-50/10"
        textColor="text-purple-600"
        borderColor="border-purple-200"
        icon="tools"
      />
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-purple-800 rounded-xl p-3 shadow-md flex justify-between items-center hover:bg-purple-700 transition"
          >
            <div className="flex flex-col max-w-[80%]">
              <p className="text-white text-base font-semibold break-words">
                {service.title}
              </p>
              <p className="text-sm text-purple-300 mt-1 hidden md:block">
                Categoría: {service.category?.name || "-"}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedService(service);
                setModalOpen(true);
              }}
              disabled={localLoadingId === service.id}
              className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 w-10 h-10 md:w-auto md:h-auto md:px-6"
              title="Dar de baja"
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden md:inline">Dar de baja</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedService(null);
        }}
        onConfirm={handleConfirmDesactivate}
        title="¿Dar de baja el servicio?"
        description={`¿Estás seguro de que querés desactivar "${selectedService?.title}"? Esta acción es reversible.`}
        confirmText="Sí, dar de baja"
        cancelText="Cancelar"
      />
    </>
  );
}

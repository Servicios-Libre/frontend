import React from "react";
import { Servicio } from "@/types";
import { Trash2 } from "lucide-react";
import ServiciosSkeleton from "@/components/ui/serviciosSkeleton/ServiciosSkeleton";
import EmptyState from "@/components/ui/empty-state/EmptyState";

type Props = {
  services: Servicio[];
  onDeactivate: (service: Servicio) => void;
  loadingId?: string;
  isLoading?: boolean;
  isFiltered?: boolean;
};

export default function ActiveServicesTable({
  services = [],
  onDeactivate,
  loadingId,
  isLoading = false,
  isFiltered = false,
}: Props) {
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
            onClick={() => onDeactivate(service)}
            disabled={loadingId === service.id}
            className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 w-10 h-10 md:w-auto md:h-auto md:px-6"
            title="Dar de baja"
          >
            <Trash2 className="w-5 h-5" />
            <span className="hidden md:inline">Dar de baja</span>
          </button>
        </div>
      ))}
    </div>
  );
}

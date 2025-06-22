import React from "react";
import { Servicio } from "@/types";

type Props = {
  services: Servicio[];
  onDeactivate: (service: Servicio) => void;
  loadingId?: string;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function ActiveServicesTable({
  services = [], // <-- valor por defecto
  onDeactivate,
  loadingId,
  page,
  total,
  onPageChange,
}: Props) {
  if (!services.length)
    return <div className="text-gray-700 py-6">No hay servicios activos.</div>;

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <table className="min-w-full bg-white rounded shadow mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left text-black font-bold">Título</th>
            <th className="p-2 text-left text-black font-bold">Categoría</th>
            <th className="p-2 text-left text-black font-bold">Usuario</th>
            <th className="p-2 text-left text-black font-bold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, idx) => (
            <tr key={service.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="p-2 text-black">{service.title}</td>
              <td className="p-2 text-black">{service.category?.name || "-"}</td>
              <td className="p-2 text-black">{service.user || "-"}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
                  onClick={() => onDeactivate(service)}
                  disabled={loadingId === service.id}
                >
                  Dar de baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </button>
        <span className="text-gray-600 text-sm">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
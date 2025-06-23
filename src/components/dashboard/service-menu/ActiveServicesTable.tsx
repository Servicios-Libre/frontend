import React from "react";
import { Servicio } from "@/types";

type Props = {
  services: Servicio[];
  onDeactivate: (service: Servicio) => void;
  loadingId?: string;
};

export default function ActiveServicesTable({
  services = [],
  onDeactivate,
  loadingId,
}: Props) {
  if (!services.length)
    return <div className="text-gray-700 py-6">No hay servicios activos.</div>;

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
              <td className="p-2 text-black">{service.worker?.name || service.worker?.email || "-"}</td>
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
    </div>
  );
}
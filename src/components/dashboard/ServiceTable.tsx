'use client';

import { Service } from "@/types";

interface ServiceTableProps {
  services: Service[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (service: Service) => void;
}

export default function ServiceTable({ services, onApprove, onReject, onViewDetails }: ServiceTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full text-left table-auto">
        <thead className="uppercase bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-center">Título</th>
            <th className="py-3 px-4 border-b text-center">Trabajador</th>
            <th className="py-3 px-4 border-b text-center">Estado</th>
            <th className="py-3 px-4 border-b text-center">Fecha</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {services.map((service) => (
            <tr key={service.id} className={
              service.status === 'pendiente'
                ? 'bg-yellow-50'
                : service.status === 'aprobado'
                ? 'bg-green-50'
                : 'bg-red-50'
            }>
              <td className="py-2 px-4 text-center">{service.title}</td>
              <td className="py-2 px-4 text-center">{service.worker}</td>
              <td className="py-2 px-4 text-center capitalize">{service.status}</td>
              <td className="py-2 px-4 text-center">{service.date}</td>
              <td className="py-2 px-4 text-center">
                {service.status === "pendiente" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => onApprove(service.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onReject(service.id)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                <button
                  className="bg-indigo-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => onViewDetails(service)}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
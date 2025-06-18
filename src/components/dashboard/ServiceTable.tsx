'use client';

interface Service {
  id: string;
  title: string;
  worker: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  date: string;
}

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
              <td className="py-2 px-4 text-center capitalize">
                {service.status === 'pendiente' && (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pendiente</span>
                )}
                {service.status === 'aprobado' && (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold">Aprobado</span>
                )}
                {service.status === 'rechazado' && (
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-semibold">Rechazado</span>
                )}
              </td>
              <td className="py-2 px-4 text-center">{service.date}</td>
              <td className="py-2 px-4 text-center flex gap-2 justify-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                  onClick={() => onViewDetails(service)}
                >
                  Ver detalles
                </button>
                {service.status === 'pendiente' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                      onClick={() => onApprove(service.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => onReject(service.id)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
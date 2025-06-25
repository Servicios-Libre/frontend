import { WorkerService } from "@/types";
import { Pencil } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { TicketStatus } from "@/types/index";

export default function WorkerServiceCard({
  service,
  onEdit,
  isOwner,
  onDetail, // nuevo prop opcional
}: {
  service: WorkerService;
  onEdit: (service: WorkerService) => void;
  isOwner: boolean;
  onDetail?: (service: WorkerService) => void;
}) {
  const imagesToShow = service.work_photos.length > 0
    ? service.work_photos
    : [{ photo_url: "/img/default-service.jpg" }];

  const statusInfo: Record<TicketStatus, { text: string; bg: string; textColor: string }> = {
    [TicketStatus.ACCEPTED]: {
      text: "Aceptado",
      bg: "bg-green-500/90",
      textColor: "text-white",
    },
    [TicketStatus.PENDING]: {
      text: "Pendiente",
      bg: "bg-yellow-400/90",
      textColor: "text-gray-900",
    },
    [TicketStatus.REJECTED]: {
      text: "Rechazado",
      bg: "bg-red-500/90",
      textColor: "text-white",
    },
  };

  const statusKey = service.ticket?.status as TicketStatus | undefined;

  const currentStatus = statusKey && statusInfo[statusKey]
    ? statusInfo[statusKey]
    : {
      text: statusKey ? statusKey.charAt(0).toUpperCase() + statusKey.slice(1) : "Desconocido",
      bg: "bg-gray-400/90",
      textColor: "text-white",
    };

  // Handler click general (abre modal detalle solo si !isOwner)
  const handleClick = () => {
    if (!isOwner && onDetail) {
      onDetail(service);
    }
  };

  return (
    <div
      className={`group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative ${!isOwner ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <ImageCarousel images={imagesToShow} />

        {isOwner && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(service);
              }}
              className="cursor-pointer absolute top-2 left-2 bg-blue-500 hover:bg-blue-500/40 text-white backdrop-blur-md border border-blue-500/40 hover:border-blue-500 rounded-md shadow-sm flex items-center gap-1 px-3 py-1 text-xs transition z-20"
              aria-label="Editar servicio"
            >
              <Pencil className="w-4 h-4" />
              Editar
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition z-20"
              aria-label="Eliminar servicio"
              title="Eliminar servicio"
            >
              <span className="text-lg font-bold leading-none select-none">×</span>
            </button>
          </>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col relative">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{service.description}</p>
        <span className="text-xs text-blue-600 font-medium mt-auto mb-4">{service.category.name}</span>

        {isOwner && (
          <div className="absolute bottom-2 right-2 z-20 group">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${currentStatus.bg} ${currentStatus.textColor}`}
            >
              {currentStatus.text}
            </span>

            {statusKey === "pending" && (
              <div
                className="absolute bottom-full right-0 mb-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50"
              >
                Subí una imagen para revisión
              </div>
            )}
          </div>
        )}

        {!isOwner && (
          <div className="absolute bottom-2 right-2 z-20">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-md transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (onDetail) onDetail(service);
              }}
            >
              Ver más detalles
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

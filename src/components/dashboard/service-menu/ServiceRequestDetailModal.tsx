import { Ticket } from "@/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function ServiceRequestDetailModal({
    ticket,
    onClose,
    onAccept,
    onReject,
    loadingId,
}: {
    ticket: Ticket;
    onClose: () => void;
    onAccept: (ticket: Ticket) => void;
    onReject: (ticket: Ticket) => void;
    loadingId?: string;
}) {
    const service = ticket.service as typeof ticket.service & {
        work_photos?: { photo_url: string; id: string }[];
    };

    const defaultImage = "/img/default-service.jpg";
    const hasPhotos =
        Array.isArray(service?.work_photos) && service.work_photos.length > 0;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-6">
            <div className="bg-white rounded-xl w-full max-w-md p-8 relative shadow-lg border-t-4 border-blue-500 text-gray-800 font-[Inter]">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar modal"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {/* Imagen */}
                <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 mb-4">
                    <Image
                        src={defaultImage}
                        alt={service?.title || "Imagen servicio"}
                        width={640}
                        height={192}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Contenido */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{service?.title}</h2>

                    <p className="text-gray-700 mb-4 px-4 leading-relaxed whitespace-pre-wrap">
                        {service?.description || "Sin descripción."}
                    </p>

                    <p className="text-sm font-medium text-blue-700 mb-2">
                        Estado actual: {ticket.status}
                    </p>

                    {!hasPhotos && (
                        <p className="text-red-600 text-sm font-medium mb-4 px-4">
                            Este servicio no tiene fotos. No se puede aprobar.
                        </p>
                    )}

                    {/* Botones */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => onReject(ticket)}
                            disabled={loadingId === ticket.id}
                            className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 shadow-md transition disabled:opacity-50"
                        >
                            Rechazar
                        </button>
                        <button
                            onClick={() => onAccept(ticket)}
                            disabled={loadingId === ticket.id || !hasPhotos}
                            className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 shadow-md transition disabled:opacity-30"
                        >
                            Aprobar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

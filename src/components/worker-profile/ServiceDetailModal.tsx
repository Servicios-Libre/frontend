// src/components/worker-profile/ServiceDetailModal.tsx

import { WorkerService } from "@/types";
import { X } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

export default function ServiceDetailModal({
    service,
    onClose,
}: {
    service: WorkerService;
    onClose: () => void;
}) {
    const imagesToShow =
        Array.isArray(service?.work_photos) && service.work_photos.length > 0
            ? service.work_photos
            // Asegúrate de que el objeto predeterminado tenga un 'id' si ImageCarousel lo espera
            : [{ photo_url: "/img/default-service.jpg", id: "default-modal-img" }];

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden relative flex flex-col animate-fade-in border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-10" // Añadimos z-10 para que esté sobre el carrusel
                    aria-label="Cerrar modal"
                >
                    <X size={22} />
                </button>

                {/* Carrusel más grande - Pasamos la clase de altura directamente al carrusel */}
                {/* === CAMBIO CLAVE AQUÍ: Pasamos heightClass="h-64" === */}
                <ImageCarousel images={imagesToShow} heightClass="h-64" />

                {/* Contenido principal */}
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                    {/* Título del servicio */}
                    <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                        {service.title}
                    </h2>

                    {/* Descripción dentro de una tarjeta azul suave */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-gray-700 text-base leading-relaxed shadow-sm">
                        {service.description}
                    </div>

                    {/* Categoría */}
                    <p className="text-sm font-medium text-blue-700">
                        Categoría: {service.category.name}
                    </p>

                    {/* Botón ambar abajo a la derecha */}
                    <div className="flex justify-end mt-4">
                        <button
                            className="cursor-pointer bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                            onClick={() => alert("¡Servicio contratado!")}
                            aria-label="Contratar servicio"
                        >
                            Contratar servicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
// src/components/worker-profile/ImageCarousel.tsx

import Image from "next/image";
import { useState, useEffect } from "react";

type ImageData = {
    id?: string; // Asegúrate de que el ID exista para las imágenes predeterminadas si ImageCarousel lo usa internamente
    photo_url: string;
};

export default function ImageCarousel({
    images,
    heightClass = "h-48",
    objectPosition = "center", // 🔧 NUEVO: permite pasar "top", "bottom", etc.
}: {
    images: ImageData[];
    heightClass?: string;
    objectPosition?: "center" | "top" | "bottom"; // podés extender si querés
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    if (images.length === 0) return null;

    const prevImage = () => {
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };

    const nextImage = () => {
        setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };

    return (
        // === CAMBIO CLAVE AQUÍ: Usamos la prop heightClass ===
        <div className={`relative w-full overflow-hidden select-none rounded-t-2xl ${heightClass}`}>
            <div className="relative w-full h-full">
                <Image
                    src={images[currentIndex].photo_url}
                    alt={`Imagen ${currentIndex + 1}`}
                    fill
                    style={{ objectFit: "cover", objectPosition }} // 🔧 Aplica la prop aquí
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {images.length > 1 && (
                <>
                    {/* Botón anterior */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/40 text-white backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center transition duration-200 shadow-md"
                        aria-label="Anterior"
                    >
                        <span className="text-2xl">‹</span>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/40 text-white backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center transition duration-200 shadow-md"
                        aria-label="Siguiente"
                    >
                        <span className="text-2xl">›</span>
                    </button>
                </>
            )}

            {/* Indicador */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}
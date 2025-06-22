import Image from "next/image";
import { useState, useEffect } from "react";

type ImageData = {
    id?: string;
    photo_url: string;
};

export default function ImageCarousel({ images }: { images: ImageData[] }) {
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
        <div className="relative w-full h-48 overflow-hidden select-none rounded-t-2xl">
            <div className="relative w-full h-full">
                <Image
                    src={images[currentIndex].photo_url}
                    alt={`Imagen ${currentIndex + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
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
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center transition duration-200 shadow-md"
                        aria-label="Anterior"
                    >
                        <span className="text-2xl">‹</span>
                    </button>

                    {/* Botón siguiente */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center transition duration-200 shadow-md"
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

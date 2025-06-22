// components/serviceCard/ServiceCard.tsx
"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

export default function ServiceCard({
    title,
    user,
    image
}: {
    title: string;
    user: string;
    image: string;
}) {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            {/* Imagen de fondo */}
            <div className="aspect-[16/6] sm:aspect-[16/9] relative w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={true}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/20 to-transparent" />

            <div className="absolute bottom-3 left-3">
                <FontAwesomeIcon icon={faClipboardCheck} className="text-blue-600 w-5 h-5 bg-amber-50 py-1 px-0.5 rounded-full" />
            </div>

            <div className="absolute bottom-3 right-3 text-right text-white">
                <p className="text-sm font-medium mb-1">{user}</p>
                <p className="text-base font-semibold w-60 md:w-80 lg:w-40">{title}</p>
            </div>
        </div>
    );
}

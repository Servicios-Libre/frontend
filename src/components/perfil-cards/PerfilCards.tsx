import Image from "next/image";
import {
  faUserTie,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Perfil {
  id: string;
  imagen: string;
  nombre: string;
  profesion: string;
  descripcion: string;
  ubicacion: string;
  email?: string;
}

interface PerfilCardProps {
  perfil: Perfil;
}

export default function PerfilCard({ perfil }: PerfilCardProps) {
  return (
    <Link href={`/worker-profile/${perfil.id}`}>
      <div className="w-64 h-90 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer">
        {/* Imagen: altura reducida para dar más espacio al contenido */}
        <div className="relative w-full h-36 flex-shrink-0 overflow-hidden">
          <Image
            src={perfil.imagen || "/placeholder.svg"}
            alt={perfil.nombre}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlay sutil en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Profesión dorada */}
        <div className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 text-sm font-semibold flex-shrink-0 relative overflow-hidden">
          {/* Efecto de brillo que cruza la banda */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <FontAwesomeIcon
            icon={faUserTie}
            className="mr-2 text-yellow-900 relative z-10 group-hover:animate-bounce"
          />
          <span className="relative z-10">{perfil.profesion}</span>
        </div>

        {/* Contenido principal con más espacio */}
        <div className="flex flex-col justify-between flex-1 py-3 px-4 min-h-0">
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
              {perfil.nombre}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {perfil.descripcion.length > 80
                ? perfil.descripcion.slice(0, 80) + "..."
                : perfil.descripcion}
            </p>
          </div>

          <div className="flex justify-center items-center text-gray-700 text-sm gap-2 pt-3 flex-shrink-0 group-hover:text-blue-600 transition-colors duration-300">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-blue-700 text-lg flex-shrink-0 group-hover:text-blue-500 group-hover:animate-pulse"
            />
            <span className="text-gray-400 truncate group-hover:text-blue-500 transition-colors duration-300">
              {perfil.ubicacion}
            </span>
          </div>
        </div>

        {/* Línea decorativa que aparece en hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}
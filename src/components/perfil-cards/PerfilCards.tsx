import Image from "next/image";
import {
  faUserTie,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Perfil {
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
    <div className="w-64 h-80 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col text-center">
      {/* Imagen: más alta */}
      <div className="relative w-full h-40">
        <Image
          src={perfil.imagen || "/placeholder.svg"}
          alt={perfil.nombre}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Profesión dorada */}
      <div className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 text-sm font-semibold">
        <FontAwesomeIcon icon={faUserTie} className="mr-2 text-yellow-900" />
        {perfil.profesion}
      </div>

      {/* Contenido principal con ubicación fija abajo */}
      <div className="flex flex-col justify-between flex-1 py-3 px-4">
        <div>
          <h1 className="text-base font-semibold text-gray-800">{perfil.nombre}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {perfil.descripcion.length > 90
              ? perfil.descripcion.slice(0, 90) + "..."
              : perfil.descripcion}
          </p>
        </div>

        <div className="flex justify-center items-center mt-auto text-gray-700 text-sm gap-2 pt-3">
          <FontAwesomeIcon icon={faLocationDot} className="text-blue-700 text-lg" />
          <span className="text-gray-400">{perfil.ubicacion}</span>
        </div>
      </div>
    </div>
  );
}
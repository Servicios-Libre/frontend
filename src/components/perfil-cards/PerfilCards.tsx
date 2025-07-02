import Image from "next/image";
import { Perfil } from '../../types/index'

interface PerfilCardProps {
    perfil: Perfil;
}

export default function PerfilCard({ perfil }: PerfilCardProps) {
    return (
     <div className="bg-white rounded-2xl p-6 shadow-lg w-80 h-96 text-center flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105">
      {/* Imagen con tamaño fijo */}
      <div className="w-24 h-24 bg-gray-300 mx-auto mb-4 flex-shrink-0">
        <Image
          src={perfil.imagen || "/placeholder.svg"}
          alt={perfil.nombre}
          width={200}
          height={200}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      {/* Contenido con flexbox para distribución uniforme */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{perfil.nombre}</h3>
        <p className="text-blue-600 text-sm mb-3">{perfil.profesion}</p>

        {/* Descripción con altura controlada */}
        <div className="flex-grow flex items-start">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 overflow-hidden">{perfil.descripcion}</p>
        </div>
      </div>
    </div>
    );
}

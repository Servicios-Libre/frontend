import Image from "next/image";
import { Perfil } from '../../types/index'

interface PerfilCardProps {
    perfil: Perfil;
}

export default function PerfilCard({ perfil }: PerfilCardProps) {
    return (
        <div className="w-64 mx-8 flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer">
            <div className="w-42 h-42 mb-4 overflow-hidden rounded-md shadow-md border border-gray-200">
                <Image
                    src={perfil.imagen}
                    alt={perfil.nombre}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="text-center px-4 py-4">
                <h3 className="text-lg font-semibold text-gray-800">{perfil.nombre}</h3>
                <p className="text-blue-600 text-sm mt-1">{perfil.profesion}</p>
                <p className="text-gray-600 text-sm mt-2">{perfil.descripcion}</p>
            </div>
        </div>
    );
}

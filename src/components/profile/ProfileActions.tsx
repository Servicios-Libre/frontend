import Link from "next/link";
import { HiOutlineMegaphone } from "react-icons/hi2";

export default function ProfileActions() {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-blue-100 via-blue-50 to-yellow-50 rounded-2xl shadow-sm p-8 flex flex-col items-center border border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-500 text-white rounded-full p-3 shadow-lg">
          <HiOutlineMegaphone className="w-5 h-5" />
        </span>
        <h3 className="text-2xl font-bold text-blue-700">
          ¿Quieres ofrecer un servicio?
        </h3>
      </div>
      <p className="mb-6 text-gray-600 text-center max-w-xl">
        ¡Publica tu primer servicio y empieza a recibir solicitudes de clientes
        interesados en lo que ofreces!
        <br />
        Destaca tus habilidades y haz crecer tu reputación en la comunidad.
      </p>
      <Link
        href="/servicios/publicar"
        className="w-full flex justify-center"
      >
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow transition cursor-pointer">
          Publicar un servicio
        </button>
      </Link>
    </div>
  );
}
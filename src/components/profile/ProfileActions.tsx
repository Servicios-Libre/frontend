import Link from "next/link";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";

export default function ProfileActions() {
  const auth = useAuth();
  const user = auth?.user;
  const isWorker = (user as typeof user & { role?: string })?.role === "worker"; //cambiar a work

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
        href={isWorker ? "/solicitud" : "#"}
        className="w-full flex justify-center"
        tabIndex={isWorker ? 0 : -1}
        aria-disabled={!isWorker}
      >
        <button
          id="profile-post-service"
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow transition cursor-pointer w-full max-w-xs
            ${
              !isWorker ? "opacity-50 cursor-not-allowed hover:bg-blue-500" : ""
            }
          `}
          disabled={!isWorker}
        >
          Publicar un servicio
        </button>
      </Link>
      {!isWorker && (
        <p className="text-sm text-red-500 mt-2 text-center">
          Debes ser trabajador para publicar un servicio.
        </p>
      )}
    </div>
  );
}

"use client";

import { faTimes, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@/types";
import Image from "next/image";

type Props = {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
};

export default function RequestProfileModal({ user, open, onClose, onAccept, onReject }: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg border-t-4 border-blue-500 text-gray-800 font-[Inter]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
            <Image
              src={user.user_pic || "/img/default-user.jpg"}
              alt={user.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600 mb-1">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
            {user.email}
          </p>
          {user.phone && (
            <p className="text-sm text-gray-600 mb-1">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
              {user.phone}
            </p>
          )}

          <p className="text-sm text-gray-700 mb-6 leading-relaxed px-4">
            Esta persona solicitó acceso como trabajador. Revisá sus datos antes de aceptar o rechazar.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => onReject(user.id)}
              className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 shadow-md transition"
            >
              Rechazar
            </button>
            <button
              onClick={() => onAccept(user.id)}
              className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 shadow-md transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

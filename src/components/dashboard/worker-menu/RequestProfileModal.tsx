"use client";

import { User } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

export default function RequestProfileModal({ user, open, onClose }: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-white/60 to-indigo-100/60 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative font-[Inter]">
        {/* Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <div className="p-8 flex flex-col items-center gap-6">
          {/* Imagen de perfil */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md">
            <Image
              src={user.user_pic || "/default-avatar.png"}
              alt={`Foto de perfil de ${user.name}`}
              width={96}
              height={96}
              className="object-cover"
              priority
            />
          </div>

          {/* Datos */}
          <div className="text-center">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.phone && (
              <p className="text-sm text-gray-500 mt-1">📞 {user.phone}</p>
            )}
            {user.address && (
              <p className="text-sm text-gray-500 mt-1">📍 {user.address.city}</p>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Esta persona solicitó acceso como trabajador. Revisá sus datos antes de aceptar o rechazar.
          </div>
        </div>
      </div>
    </div>
  );
}

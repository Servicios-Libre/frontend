import { User, WorkerService } from "@/types";
import React from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  services?: WorkerService[];
};

export default function UserProfileDrawer({ open, onClose, user, services }: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-lg p-6 overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
        <div className="flex flex-col items-center mb-4">
          <Image
            src={user.user_pic || "/img/user-placeholder.png"}
            alt={user.name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="text-xs bg-gray-200 rounded px-2 py-1 mt-2">{user.role}</span>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Dirección</h3>
          <p className="text-sm text-gray-700">
            {user.address?.street} {user.address?.house_number}, {user.address?.city}, {user.address?.state} {user.address?.zip_code}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Tickets</h3>
          <ul className="text-sm">
            {user.tickets?.length ? (
              user.tickets.map((t) => (
                <li key={t.id}>
                  {t.type} - {t.status} - {t.created_at ? new Date(t.created_at).toLocaleDateString() : ""}
                </li>
              ))
            ) : (
              <li>No tiene tickets.</li>
            )}
          </ul>
        </div>
        {user.role === "worker" && (
          <div>
            <h3 className="font-semibold mb-1">Servicios</h3>
            <ul className="text-sm">
              {services && services.length ? (
                services.map((s) => (
                  <li key={s.id}>
                    <span className="font-bold">{s.title}</span> - {s.category?.name}
                  </li>
                ))
              ) : (
                <li>No tiene servicios.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
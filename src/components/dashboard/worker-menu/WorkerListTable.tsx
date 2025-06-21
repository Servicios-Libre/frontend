import { User } from "@/types";
import React from "react";

type Props = {
  workers: User[];
  onViewProfile: (userId: string) => void;
  onDowngrade: (user: User) => void;
  loadingId?: string;
};

export default function WorkerListTable({ workers, onViewProfile, onDowngrade, loadingId }: Props) {
  if (!workers.length) return <div className="text-gray-700 py-6">No hay trabajadores activos.</div>;

  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left text-black font-bold">Nombre</th>
          <th className="p-2 text-left text-black font-bold">Email</th>
          <th className="p-2 text-left text-black font-bold">Premium</th>
          <th className="p-2 text-left text-black font-bold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker, idx) => (
          <tr key={worker.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="p-2 text-black">{worker.name}</td>
            <td className="p-2 text-black">{worker.email}</td>
            <td className="p-2 text-black">{worker.premium ? "Sí" : "No"}</td>
            <td className="p-2 flex gap-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => onViewProfile(worker.id)}
              >
                Ver perfil
              </button>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
                onClick={() => onDowngrade(worker)}
                disabled={loadingId === worker.id}
              >
                Dar de baja
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
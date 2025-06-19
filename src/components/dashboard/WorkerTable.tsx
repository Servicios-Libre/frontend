'use client';

import { WorkerUser } from "@/types";

interface WorkerTableProps {
  users: WorkerUser[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleWorker: (id: string) => void;
}

export default function WorkerTable({ users, onApprove, onReject, onToggleWorker }: WorkerTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full text-left table-auto">
        <thead className="uppercase bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-center">Usuario</th>
            <th className="py-3 px-4 border-b text-center">Email</th>
            <th className="py-3 px-4 border-b text-center">¿Trabajador?</th>
            <th className="py-3 px-4 border-b text-center">Solicitud</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className={user.hasRequest ? "bg-yellow-50" : ""}>
              <td className="py-2 px-4 text-center">{user.username}</td>
              <td className="py-2 px-4 text-center">{user.email}</td>
              <td className="py-2 px-4 text-center">{user.isWorker ? "Sí" : "No"}</td>
              <td className="py-2 px-4 text-center">{user.hasRequest ? "Pendiente" : "-"}</td>
              <td className="py-2 px-4 text-center">
                {user.hasRequest ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => onApprove(user.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onReject(user.id)}
                    >
                      Rechazar
                    </button>
                  </>
                ) : user.isWorker ? (
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => onToggleWorker(user.id)}
                  >
                    Dar de baja
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
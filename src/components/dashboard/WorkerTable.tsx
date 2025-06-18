'use client';

interface WorkerUser {
  id: string;
  username: string;
  email: string;
  isWorker: boolean;
  hasRequest: boolean;
}

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
              <td className="py-2 px-4 text-center">
                {user.isWorker ? (
                  <span className="text-green-600 font-semibold">Sí</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </td>
              <td className="py-2 px-4 text-center">
                {user.hasRequest ? (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pendiente</span>
                ) : (
                  <span className="text-gray-400 text-xs">-</span>
                )}
              </td>
              <td className="py-2 px-4 text-center flex gap-2 justify-center">
                {user.hasRequest && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                      onClick={() => onApprove(user.id)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => onReject(user.id)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                <button
                  className={`px-2 py-1 rounded text-xs ${user.isWorker ? "bg-red-200 text-red-700 hover:bg-red-300" : "bg-blue-200 text-blue-700 hover:bg-blue-300"}`}
                  onClick={() => onToggleWorker(user.id)}
                >
                  {user.isWorker ? "Dar de baja" : "Dar de alta"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
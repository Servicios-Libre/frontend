import { User, WorkerRequestTicket } from "@/types";

type RequestsListProps = {
  requests: WorkerRequestTicket[];
  onViewProfile: (user: User) => void;
};

export function RequestsList({ requests, onViewProfile }: RequestsListProps) {
  if (requests.length === 0) return <p className="text-indigo-300 text-center">No hay solicitudes pendientes.</p>;

  return (
    <div className="grid gap-4">
      {requests.map(req => (
        <div
          key={req.id}
          className="bg-indigo-800 rounded-xl p-4 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center hover:bg-indigo-700 transition"
        >
          <div className="break-words max-w-full">
            <p className="text-lg font-semibold">{req.user.name}</p>
            <p className="text-sm text-indigo-200">{req.user.email}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => onViewProfile(req.user)}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-lg text-sm"
            >
              Ver perfil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

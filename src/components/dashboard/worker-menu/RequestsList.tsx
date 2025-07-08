"use client";

import EmptyState from "@/components/ui/empty-state/EmptyState";
import { User, WorkerRequestTicket } from "@/types";

type RequestsListProps = {
  requests: WorkerRequestTicket[];
  onViewProfile: (user: User) => void;
  disabledUserIds: string[];
};

export function RequestsList({
  requests,
  onViewProfile,
  disabledUserIds,
}: RequestsListProps) {
  if (!requests || requests.length === 0) {
    return (
      <EmptyState
        message="No hay solicitudes pendientes."
        bgColor="bg-purple-50/10"
        textColor="text-purple-600"
        borderColor="border-purple-200"
        icon="tools"
      />
    );
  }

  return (
    <div className="grid gap-4">
      {requests.map((req, index) => (
        <div
          key={req.id ?? index}
          className="bg-indigo-800 rounded-xl p-4 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center hover:bg-indigo-700 transition"
        >
          <div className="break-words max-w-full">
            <p className="text-lg font-semibold">
              {req.user?.name || "Usuario desconocido"}
            </p>
            <p className="text-sm text-indigo-200">{req.user?.email || "-"}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => req.user && onViewProfile(req.user)}
              disabled={!req.user || disabledUserIds.includes(req.user.id)}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg text-sm disabled:opacity-50"
            >
              Ver perfil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

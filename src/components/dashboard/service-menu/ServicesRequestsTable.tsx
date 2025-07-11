import EmptyState from "@/components/ui/empty-state/EmptyState";
import { Ticket } from "@/types";
import { Eye } from "lucide-react";

interface Props {
  requests: Ticket[] | undefined;
  onView: (ticket: Ticket) => void;
  loadingId?: string;
}

export default function ServiceRequestsTable({ requests, onView, loadingId }: Props) {
  if (!requests || requests.length === 0)
    return (
      <EmptyState
        message="No hay solicitudes pendientes."
        bgColor="bg-purple-50/10"
        textColor="text-purple-600"
        borderColor="border-purple-200"
        icon="tools"
      />
    );

  return (
    <div className="grid gap-4">
      {requests.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-purple-800 rounded-xl p-3 shadow-md flex justify-between items-center hover:bg-purple-700 transition"
        >
          {/* Título + usuario */}
          <div className="flex flex-col max-w-[80%]">
            <p className="text-white text-base font-semibold break-words">
              {ticket.service?.title || "-"}
            </p>
            <p className="text-sm text-purple-300 mt-1">
              Usuario: {ticket.user?.name || ticket.user?.email || "-"}
            </p>
          </div>

          {/* Botón */}
          <button
            onClick={() => onView(ticket)}
            className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold w-10 h-10 md:w-auto md:h-auto md:px-6 disabled:opacity-60"
            title="Ver detalle"
            disabled={loadingId === ticket.id}
          >
            <Eye className="w-5 h-5" />
            <span className="hidden md:inline">Ver detalle</span>
          </button>
        </div>
      ))}
    </div>
  );
}

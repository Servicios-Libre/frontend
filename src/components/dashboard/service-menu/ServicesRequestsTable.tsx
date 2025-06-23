import { Ticket } from "@/types";
import React from "react";

type Props = {
  requests: Ticket[];
  onAccept: (ticket: Ticket) => void;
  onReject: (ticket: Ticket) => void;
  onViewService: (serviceId: string) => void;
  loadingId?: string;
};

function formatDate(dateStr: string) {
  // Soporta "21/6/2025" o ISO
  if (!dateStr) return "-";
  const [day, month, year] = dateStr.split("/");
  if (day && month && year) {
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  // fallback
  return new Date(dateStr).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ServiceRequestsTable({
  requests,
  onAccept,
  onReject,
  onViewService,
  loadingId,
}: Props) {
  if (!requests.length)
    return <div className="text-gray-700 py-6">No hay solicitudes pendientes.</div>;

  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left text-black font-bold">Título</th>
          <th className="p-2 text-left text-black font-bold">Usuario</th>
          <th className="p-2 text-left text-black font-bold">Email</th>
          <th className="p-2 text-left text-black font-bold">Fecha</th>
          <th className="p-2 text-left text-black font-bold">Estado</th>
          <th className="p-2 text-left text-black font-bold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((ticket, idx) => (
          <tr key={ticket.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="p-2 text-black">{ticket.service?.title || "-"}</td>
            <td className="p-2 text-black">{ticket.user?.name || "-"}</td>
            <td className="p-2 text-black">{ticket.user?.email || "-"}</td>
            <td className="p-2 text-black">{formatDate(ticket.created_at)}</td>
            <td className="p-2 capitalize text-black">
              {ticket.status === "pending" && (
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                  Pendiente
                </span>
              )}
              {ticket.status === "accepted" && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                  Aprobado
                </span>
              )}
              {ticket.status === "rejected" && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                  Rechazado
                </span>
              )}
            </td>
            <td className="p-2 flex gap-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                onClick={() => onAccept(ticket)}
                disabled={loadingId === ticket.id}
              >
                Aprobar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                onClick={() => onReject(ticket)}
                disabled={loadingId === ticket.id}
              >
                Rechazar
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => ticket.service?.id && onViewService(ticket.service.id)}
                disabled={!ticket.service?.id}
              >
                Ver detalle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
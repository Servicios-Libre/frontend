import { WorkerRequestTicket } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  requests: WorkerRequestTicket[];
  onAccept: (ticket: WorkerRequestTicket) => void;
  onReject: (ticket: WorkerRequestTicket) => void;
  loadingId?: string;
};

function parseCustomDate(dateStr: string): string {
  const [day, month, year] = dateStr.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WorkerRequestsTable({
  requests,
  onAccept,
  onReject,
  loadingId,
}: Props) {
  const router = useRouter();

  if (!requests || requests.length === 0)
    return <div className="text-gray-700 py-6">No hay solicitudes pendientes.</div>;

  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left text-black font-bold">Nombre</th>
          <th className="p-2 text-left text-black font-bold">Email</th>
          <th className="p-2 text-left text-black font-bold">Fecha</th>
          <th className="p-2 text-left text-black font-bold">Estado</th>
          <th className="p-2 text-left text-black font-bold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((ticket, idx) => (
          <tr key={ticket.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="p-2 text-black">{ticket.user?.name || "-"}</td>
            <td className="p-2 text-black">{ticket.user?.email || "-"}</td>
            <td className="p-2 text-black">
              {ticket.created_at ? parseCustomDate(ticket.created_at) : "-"}
            </td>
            <td className="p-2 capitalize text-black">{ticket.status}</td>
            <td className="p-2 flex gap-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                onClick={() => onAccept(ticket)}
                disabled={loadingId === ticket.id}
              >
                Aceptar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                onClick={() => onReject(ticket)}
                disabled={loadingId === ticket.id}
              >
                Rechazar
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => ticket.user?.id && router.push(`/worker-profile/${ticket.user.id}`)}
                disabled={!ticket.user?.id}
              >
                Ver perfil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

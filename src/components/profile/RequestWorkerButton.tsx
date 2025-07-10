"use client";

interface Props {
  show: boolean;
  loading: boolean;
  ticketSuccess: boolean;
  hasAcceptedWorkerTicket: boolean;
  onClick: () => void;
}

export default function RequestWorkerButton({
  show,
  loading,
  ticketSuccess,
  hasAcceptedWorkerTicket,
  onClick,
}: Props) {
  if (!show) return null;

  let buttonText = "Solicitar ser trabajador";
  if (loading) {
    buttonText = "Enviando...";
  } else if (ticketSuccess || hasAcceptedWorkerTicket) {
    buttonText = "Solicitud enviada";
  } else if (ticketSuccess && hasAcceptedWorkerTicket) {
    buttonText = "Solicitud pendiente";
  }

  return (
    <div className="relative group w-full">
      <button
        id="profile-worker-request"
        className="px-4 py-2 rounded-md font-semibold transition-colors mt-2 sm:mt-0 bg-green-500 hover:bg-green-600 text-white cursor-pointer"
        disabled={loading}
        onClick={onClick}
      >
        {buttonText}
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 w-64 bg-gray-900 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
        La solicitud pasará por la aprobación de un administrador y podría tardar unas horas
      </span>
    </div>
  );
}

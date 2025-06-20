import { createTicket, getUserTickets } from "@/services/ticketService";
import { useEffect, useRef, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/context/AuthContext";

interface Props {
  userName: string;
  userPic: string;
  setUserPic: (url: string) => void;
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  completion: number;
  isComplete: boolean;
  hasUnsavedChanges: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  setShowMissing: (show: boolean) => void;
  userId: string;
}

export default function ProfileHeader({
  userName,
  userPic,
  setUserPic,
  editMode,
  setEditMode,
  completion,
  isComplete,
  hasUnsavedChanges,
  handleSave,
  handleCancel,
  setShowMissing,
  userId,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    setEditMode(true);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const [loadingTicket, setLoadingTicket] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const auth = useAuth();
  const user = auth?.user;
  const userRole = user?.role;

  // Consultar si ya tiene ticket pendiente de tipo to-worker
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getUserTickets(userId);
        const pending = tickets.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (t: any) => t.type === "to-worker" && t.status === "pending"
        );
        setHasPendingRequest(pending);
      } catch {
        setHasPendingRequest(false);
      }
    };
    if (userId && userRole !== "worker") {
      fetchTickets();
    }
  }, [userId, userRole]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8 p-6 rounded-lg bg-blue-500 shadow-md mb-6 text-center sm:text-left">
        <div className="w-32 h-32 sm:w-24 sm:h-24 flex justify-center">
          <div className="w-24 h-24 bg-blue-200 rounded-full animate-pulse" />
        </div>
        <div className="flex-1 w-full flex flex-col items-center sm:items-start">
          <div className="h-6 bg-blue-200 rounded w-32 mb-2 animate-pulse" />
          <div className="h-4 bg-blue-100 rounded w-24 mb-2 animate-pulse" />
        </div>
      </div>
    );
  }

  const handleRequestWorker = async () => {
    setLoadingTicket(true);
    setTicketError(null);
    try {
      await createTicket(userId, {
        type: "to-worker",
        status: "pending"
      });
      setTicketSuccess(true);
      setHasPendingRequest(true);
    } catch {
      setTicketError("No se pudo enviar la solicitud.");
    } finally {
      setLoadingTicket(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8 p-6 rounded-lg bg-blue-500 shadow-md mb-6 text-center sm:text-left">
      {/* Foto y botón */}
      <div className="flex flex-col items-center sm:items-center w-full sm:w-auto">
        <div className="w-32 h-32 sm:w-24 sm:h-24 flex justify-center">
          <ProfilePhoto userPic={userPic} setUserPic={setUserPic} editable={editMode} fileInputRef={fileInputRef} />
        </div>
        <div className="mt-2 w-full sm:w-auto">
          {editMode ? (
            <button
              className="text-white bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded transition w-full sm:w-auto cursor-pointer"
              onClick={handleChangePhotoClick}
            >
              Cambiar foto
            </button>
          ) : (
            // Espacio reservado para que no se mueva el layout
            <div className="px-3 py-1 rounded w-full sm:w-auto opacity-0 pointer-events-none select-none">
              Cambiar foto
            </div>
          )}
        </div>
      </div>

      {/* Info y progreso */}
      <div className="flex-1 w-full flex flex-col items-center sm:items-start">
        <p className="text-xl font-bold text-white mb-1 break-words">{userName}</p>
        <p className="text-blue-100 text-sm mb-2">Puedes editar tu información personal</p>

        <div className="flex flex-col items-center sm:items-start gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Perfil completo:</span>
            <span className="text-white font-bold">{completion}%</span>
            <div className="w-24 h-2 bg-blue-200 rounded overflow-hidden">
              <div
                className="h-full bg-blue-700 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Tarjeta dorada si es worker */}
          {userRole === "worker" && (
            <div className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-lg shadow mb-2 flex items-center gap-2">
              <span>👑</span> Trabajador N°{userId.slice(-4)}
            </div>
          )}

          {/* Botón de solicitar ser trabajador */}
          {userRole !== "worker" && (
            <button
              className={`px-4 py-2 rounded-md font-semibold transition-colors mt-2 sm:mt-0 cursor-pointer
                ${!editMode && !hasUnsavedChanges
                  ? isComplete
                    ? hasPendingRequest
                      ? "bg-yellow-300 text-yellow-900 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              disabled={!isComplete || editMode || hasUnsavedChanges || loadingTicket || hasPendingRequest}
              onClick={() => {
                if (!isComplete) {
                  setShowMissing(true);
                } else {
                  handleRequestWorker();
                }
              }}
            >
              {loadingTicket
                ? "Enviando..."
                : ticketSuccess
                  ? "Solicitud enviada"
                  : hasPendingRequest
                    ? "Solicitud pendiente"
                    : "Solicitar ser trabajador"}
            </button>
          )}
          {ticketError && (
            <p className="text-red-200 mt-2">{ticketError}</p>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-row sm:flex-col justify-center items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
        {editMode ? (
          <>
            <button
              className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-white font-semibold transition w-full sm:w-auto cursor-pointer"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold transition w-full sm:w-auto cursor-pointer"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-white hover:bg-blue-100 text-blue-700 font-semibold transition w-full sm:w-auto cursor-pointer"
            onClick={() => setEditMode(true)}
          >
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
}

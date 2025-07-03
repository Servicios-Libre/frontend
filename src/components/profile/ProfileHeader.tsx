import { createTicket } from "@/services/ticketService";
import { useEffect, useRef, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import { Ticket } from "@/app/profile/page";
import EditNameModal from "@/components/profile/EditNameModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Crown } from "lucide-react";
import { checkIfUserIsWorker } from "@/services/profileService";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserImageFile: any;
  ticket: Ticket | null;
  showToast?: (message: string, type: "success" | "error" | "info") => void;
  setUserName: (name: string) => void;
  premium: boolean;
}

export default function ProfileHeader({
  userName,
  setUserName,
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
  setUserImageFile,
  ticket,
  premium,
}: Props) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePhotoClick = () => {
    setEditMode(true);
  };

  const [loadingTicket, setLoadingTicket] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [hasAcceptedTicket, setHasAcceptedTicket] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [isWorker, setIsWorker] = useState<boolean | null>(null);

  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    const verifyWorkerStatus = async () => {
      try {
        const result = await checkIfUserIsWorker(userId);
        setIsWorker(result);
      } catch (e) {
        console.warn("No se pudo verificar si es worker (posiblemente por red):", e);
      }
    };

    if (userId && isWorker === null) {
      verifyWorkerStatus();
    }
  }, [userId, isWorker]);

  useEffect(() => {
    if (ticket?.type === "to-worker") {
      if (ticket.status === "pending") {
        setHasPendingRequest(true);
        setHasAcceptedTicket(false);
      } else if (ticket.status === "accepted") {
        setHasPendingRequest(false);
        setHasAcceptedTicket(true);
      } else {
        setHasPendingRequest(false);
        setHasAcceptedTicket(false);
      }
    } else {
      setHasPendingRequest(false);
      setHasAcceptedTicket(false);
    }
  }, [ticket]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
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
    if (!isComplete) {
      showToast(
        "Completa tu perfil antes de solicitar ser trabajador.",
        "error"
      );
      setShowMissing(true);
      return;
    }
    if (!user?.id) {
      setTicketError("Usuario no autenticado");
      return;
    }
    setLoadingTicket(true);
    setTicketError(null);
    try {
      await createTicket(user.id, {
        type: "to-worker",
        status: "pending",
      });
      setTicketSuccess(true);
      setHasPendingRequest(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setTicketError(
        error?.response?.data?.message || "No se pudo enviar la solicitud."
      );
    } finally {
      setLoadingTicket(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8 p-6 rounded-lg bg-blue-500 shadow-md mb-6 text-center sm:text-left">
      {/* Foto y botón */}
      <div className="flex flex-col items-center sm:items-center w-full sm:w-auto">
        <div className="w-32 h-32 sm:w-24 sm:h-24 flex justify-center">
          <ProfilePhoto
            userPic={userPic}
            setUserPic={setUserPic}
            editable={editMode}
            fileInputRef={fileInputRef}
            setUserImageFile={setUserImageFile}
            premium={premium}
          />
        </div>
        <div className="mt-2 w-full sm:w-auto">
          <button
            className={`text-white bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded transition w-full sm:w-auto cursor-pointer
      ${editMode ? "invisible" : ""}`}
            onClick={handleChangePhotoClick}
          >
            Cambiar foto
          </button>
        </div>
      </div>

      {/* Info y progreso */}
      <div className="flex-1 w-full flex flex-col items-center sm:items-start">
        <button
          onClick={() => editMode && setNameModalOpen(true)}
          className={`flex items-center text-xl font-bold mb-1 gap-2
            ${premium && editMode
              ? "text-amber-300 hover:text-amber-200 cursor-pointer"
              : editMode
                ? "text-white hover:text-blu-200 cursor-pointer"
                : premium
                  ? "text-amber-300"
                  : "text-white cursor-default"
            }`}
          aria-label="Editar nombre"
          title={editMode ? "Editar nombre" : undefined}
          type="button"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {premium && <Crown className="w-6 h-6 text-orange-300" />}
          {userName}
          <FontAwesomeIcon
            icon={faPen}
            className={`transition-colors ${editMode ? "text-white hover:text-blue-200" : "text-transparent"
              }`}
            style={{ fontSize: "1.25rem" }}
          />
        </button>
        <p className="text-blue-100 text-sm mb-2">
          Puedes editar tu información personal
        </p>

        <div className="flex flex-col items-center sm:items-start gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">
              Perfil completo:
            </span>
            <span className="text-white font-bold">{completion}%</span>
            <div className="w-24 h-2 bg-blue-200 rounded overflow-hidden">
              <div
                className="h-full bg-blue-700 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {isWorker === true && (
            <div className="flex flex-col gap-2 items-center sm:items-start mt-2">
              <Link href={`/worker-profile/${userId}`}>
                <button className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                  <span>💼</span> Ver perfil de trabajador
                </button>
              </Link>
            </div>
          )}

          {/* Botón de solicitar ser trabajador */}
          {isWorker === false && !hasAcceptedTicket && !hasPendingRequest && (
            <button
              className={`px-4 py-2 rounded-md font-semibold transition-colors mt-2 sm:mt-0
    ${!editMode && !hasUnsavedChanges
                  ? isComplete
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              disabled={
                !isComplete || editMode || hasUnsavedChanges || loadingTicket
              }
              onClick={handleRequestWorker}
            >
              {loadingTicket ? "Enviando..." : "Solicitar ser trabajador"}
            </button>
          )}

          {isWorker === false && (hasPendingRequest || hasAcceptedTicket) && (
            <p className="text-blue-100 text-sm font-medium mt-2">
              {hasPendingRequest
                ? "Tu solicitud para ser trabajador está pendiente."
                : "Tu solicitud fue aceptada. Ya puedes operar como trabajador."}
            </p>
          )}

          {ticketError && <p className="text-red-200 mt-2">{ticketError}</p>}
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
      {nameModalOpen && (
        <EditNameModal
          initialName={userName}
          onSave={(newName) => setUserName(newName)}
          onClose={() => setNameModalOpen(false)}
        />
      )}
    </div>
  );
}

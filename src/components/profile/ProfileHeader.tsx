"use client";

import { createTicket } from "@/services/ticketService";
import { useEffect, useRef, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import EditNameModal from "@/components/profile/EditNameModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Crown } from "lucide-react";
import { checkIfUserIsWorker } from "@/services/profileService";
import HelpTourButton from "./HelpTourButton";
import { useProfileTour } from "@/hooks/tours/useProfileTour";
import RequestWorkerButton from "./RequestWorkerButton";

interface Props {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserImageFile: any;
  name: string;
  setUserName: (name: string) => void; // <--- AGREGAR
  showToast?: (message: string, type: "success" | "error" | "info") => void;
}

export default function ProfileHeader({
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
  setUserImageFile,
  name,
  setUserName,
}: Props) {
  const { user, refreshUser } = useAuth();
  console.log("🧠 Usuario desde AuthContext:", user);
  const userId = user?.id;
  const premium = user?.premium;

  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loadingTicket, setLoadingTicket] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [isWorker, setIsWorker] = useState<boolean | null>(null);

  const { startProfileTour } = useProfileTour(isWorker);

  useEffect(() => {
    const verifyWorkerStatus = async () => {
      try {
        const result = await checkIfUserIsWorker(userId);
        setIsWorker(result);
      } catch (e) {
        console.warn("No se pudo verificar si es worker:", e);
      }
    };

    if (userId && isWorker === null) {
      verifyWorkerStatus();
    }
  }, [userId, isWorker]);

  useEffect(() => {
    if (user?.tickets) {
      const hasPending = user.tickets.some(
        (ticket) => ticket.type === "to-worker" && ticket.status === "pending"
      );
      setHasPendingRequest(hasPending);
      setTicketSuccess(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.tickets) return;

    const hadPending = hasPendingRequest;
    const hasPendingNow = user.tickets.some(
      (ticket) => ticket.type === "to-worker" && ticket.status === "pending"
    );

    if (hadPending && !hasPendingNow) {
      refreshUser();
      setHasPendingRequest(false);
    }
  }, [user?.tickets, hasPendingRequest, refreshUser]);

  useEffect(() => {
    if (!user?.tickets) return;

    // Detecta si hay un ticket aceptado de tipo "to-worker"
    const hasAccept = user.tickets.some(
      (ticket) => ticket.type === "to-worker" && ticket.status === "accept"
    );

    // Si hay ticket aceptado, fuerza el refresh del usuario (por si el rol cambió)
    if (hasAccept && isWorker === false) {
      refreshUser();
      setIsWorker(true); // Opcional: fuerza el estado local
    }
  }, [user?.tickets, isWorker, refreshUser]);

  const prevRole = useRef<string | undefined>(user?.role);

  useEffect(() => {
    // Solo refresca si el rol realmente cambió
    if (user?.role !== prevRole.current) {
      refreshUser();
      prevRole.current = user?.role;
    }
  }, [user?.role, refreshUser]);

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

  const handleChangePhotoClick = () => {
    setEditMode(true);
  };

  const handleRequestWorker = async () => {
    if (!isComplete) {
      showToast?.("Completa tu perfil antes de solicitar ser trabajador.", "error");
      setShowMissing(true);
      return;
    }

    if (!userId) {
      setTicketError("Usuario no autenticado");
      return;
    }

    setLoadingTicket(true);
    setTicketError(null);

    try {
      await createTicket(userId, { type: "to-worker", status: "pending" });
      await refreshUser();
      setTicketSuccess(true);
      setHasPendingRequest(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setTicketError(error?.response?.data?.message || "No se pudo enviar la solicitud.");
    } finally {
      setLoadingTicket(false);
    }
  };

  // Calcula si el usuario tiene un ticket aceptado de tipo "to-worker"
  const hasAcceptedWorkerTicket =
    user?.role === "worker" &&
    user?.tickets?.some(
      (ticket) => ticket.type === "to-worker" && ticket.status === "accepted"
    );

  const shouldShowRequestButton =
    !isWorker &&
    isComplete &&
    !editMode &&
    !hasUnsavedChanges &&
    !loadingTicket &&
    !hasPendingRequest &&
    !hasAcceptedWorkerTicket;

  const showWorkerProfileButton =
    isWorker === true ||
    user?.tickets?.some(
      (ticket) => ticket.type === "to-worker" && ticket.status === "accepted"
    );

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8 p-6 rounded-lg bg-blue-500 shadow-md mb-6 text-center sm:text-left relative">
      {/* Foto y botón */}
      <div className="flex flex-col items-center sm:items-center w-full sm:w-auto">
        <div id="profile-photo-container" className="w-32 h-32 sm:w-24 sm:h-24 flex justify-center">
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
          id="profile-name-section"
          onClick={() => editMode && setNameModalOpen(true)}
          className={`flex items-center text-xl font-bold mb-1 gap-2 ${premium && editMode
            ? "text-amber-300 hover:text-amber-200 cursor-pointer"
            : editMode
              ? "text-white hover:text-blue-200 cursor-pointer"
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
          {name}
          <FontAwesomeIcon
            icon={faPen}
            className={`transition-colors ${editMode ? "text-white hover:text-blue-200" : "text-transparent"
              }`}
            style={{ fontSize: "1.25rem" }}
          />
        </button>

        <p className="text-blue-100 text-sm mb-2">
          {user?.role === "user"
            ? "Debes completar tu perfil al 100% si quieres solicitar ser trabajador"
            : "Puedes editar tu información personal"}
        </p>

        <div className="flex flex-col items-center sm:items-start gap-3 w-full">
          <div id="profile-completion-bar" className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Perfil completo:</span>
            <span className="text-white font-bold">{completion}%</span>
            <div className="w-24 h-2 bg-blue-200 rounded overflow-hidden">
              <div
                className="h-full bg-blue-700 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Mostrar solo si ya se sabe el estado */}
          {showWorkerProfileButton && (
            <div id="profile-worker-button" className="flex flex-col gap-2 items-center sm:items-start">
              <Link href={`/worker-profile/${userId}`}>
                <button className="bg-yellow-400 text-yellow-900 font-bold px-3 py-2 rounded-sm shadow flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                  <span>💼</span> Ver perfil de trabajador
                </button>
              </Link>
            </div>
          )}

          {isWorker === false && (
            <div className="relative group w-full flex flex-col items-center sm:items-start">
              {!loadingTicket ? (
                <RequestWorkerButton
                  show={shouldShowRequestButton}
                  loading={loadingTicket}
                  ticketSuccess={ticketSuccess}
                  hasAcceptedWorkerTicket={!!hasAcceptedWorkerTicket}
                  onClick={handleRequestWorker}
                />
              ) : (
                <div className="flex items-center py-2 self-center sm:self-start">
                  <span className="loader border-4 border-blue-200 border-t-blue-600 rounded-full w-6 h-6 animate-spin"></span>
                  <span className="ml-3 text-white">Enviando solicitud...</span>
                </div>
              )}

              {hasPendingRequest && (
                <p className="text-yellow-800 bg-yellow-200 px-3 py-1.5 rounded mt-2 text-sm font-medium">
                  Tienes una solicitud pendiente. Espera la aprobación del administrador.
                </p>
              )}
            </div>
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
          initialName={name}
          onSave={(newName) => {
            setUserName(newName);
            setNameModalOpen(false);
          }}
          onClose={() => setNameModalOpen(false)}
        />
      )}

      {!editMode && (
        <div className="absolute bottom-7 right-14 z-10">
          <HelpTourButton startTour={startProfileTour} />
        </div>)}
    </div>
  );
}

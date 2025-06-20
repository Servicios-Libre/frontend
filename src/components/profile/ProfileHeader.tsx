import { useRef } from "react";
import { useToast } from "@/context/ToastContext";
import ProfilePhoto from "./ProfilePhoto";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserImageFile: any
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
  setUserImageFile
}: Props) {
  const { showToast } = useToast();
  // Referencia para el input file en ProfileForm
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para activar edición y abrir el selector de archivos
  const handleChangePhotoClick = () => {
    setEditMode(true);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-8 p-6 rounded-lg bg-blue-500 shadow-md mb-6 text-center sm:text-left">
      {/* Foto y botón */}
      <div className="flex flex-col items-center sm:items-center w-full sm:w-auto">
        <div className="w-32 h-32 sm:w-24 sm:h-24 flex justify-center">
          <ProfilePhoto userPic={userPic} setUserPic={setUserPic} editable={editMode} fileInputRef={fileInputRef} setUserImageFile={setUserImageFile}/>
        </div>
        {!editMode && (
          <button
            className="mt-2 text-white bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded transition w-full sm:w-auto"
            onClick={handleChangePhotoClick}
          >
            Cambiar foto
          </button>
        )}
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

          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors mt-2 sm:mt-0
              ${!editMode && !hasUnsavedChanges
                ? isComplete
                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            disabled={editMode || hasUnsavedChanges}
            onClick={() => {
              if (!isComplete) {
                showToast("Completa tu perfil antes de solicitar ser trabajador.", "error");
              }
            }}
          >
            Solicitar ser trabajador
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-row sm:flex-col justify-center items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
        {editMode ? (
          <>
            <button
              className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-white font-semibold transition w-full sm:w-auto"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold transition w-full sm:w-auto"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-white hover:bg-blue-100 text-blue-700 font-semibold transition w-full sm:w-auto"
            onClick={() => setEditMode(true)}
          >
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
}

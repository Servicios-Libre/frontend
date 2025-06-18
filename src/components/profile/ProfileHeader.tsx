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
}: Props) {
  return (
    <div className="flex items-center gap-4 relative">
      <ProfilePhoto userPic={userPic} setUserPic={setUserPic} editable={editMode} />
      <div>
        <p className="text-lg font-semibold">
          Perfil de usuario: <span className="font-normal">{userName}</span>
        </p>
        <p className="text-gray-500 text-sm">Puedes editar tu información</p>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-sm text-gray-600">{completion}% completo</div>
        <div className="relative group">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              !editMode && !hasUnsavedChanges
                ? isComplete
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={editMode || hasUnsavedChanges}
            onClick={() => {
              if (!isComplete) setShowMissing(true);
              // Acción extra si el perfil está completo
            }}
          >
            Solicitar ser trabajador
          </button>
        </div>
        {editMode ? (
          <>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setEditMode(true)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
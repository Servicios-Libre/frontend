import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConfirmDeleteModal({ service, isOpen, onClose, onConfirm }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 relative shadow-lg border-t-4 border-blue-500">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-xl font-bold text-blue-600 mb-4">
          ¿Eliminar servicio?
        </h2>

        <p className="text-sm text-gray-700 mb-8 leading-relaxed">
          Estás por eliminar el servicio <strong>{service.title}</strong>. Esta acción <span className="font-semibold text-blue-600">no se puede deshacer.</span>
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 shadow-md transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

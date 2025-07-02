import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    initialName: string;
    onSave: (newName: string) => void;
    onClose: () => void;
};

export default function EditNameModal({ initialName, onSave, onClose }: Props) {
    const initialParts = initialName.trim().split(" ");
    const [firstName, setFirstName] = useState(initialParts[0] || "");
    const [lastName, setLastName] = useState(initialParts.slice(1).join(" ") || "");

    const handleSave = async () => {
        const fullName = `${firstName.trim()}${lastName.trim() ? " " + lastName.trim() : ""}`;
        onSave(fullName);
        window.dispatchEvent(new CustomEvent('userNameChanged', { detail: fullName }));
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="editNameModalTitle"
        >
            <div
                className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden relative flex flex-col animate-fade-in border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{ minWidth: 0 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-10"
                    aria-label="Cerrar modal"
                >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>

                <div className="flex items-center gap-2 p-6 border-b border-gray-100 shrink-0">
                    <FontAwesomeIcon icon={faPen} className="text-blue-600" />
                    <h2 id="editNameModalTitle" className="text-xl font-semibold text-gray-800">
                        Editar nombre y apellido
                    </h2>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-6 min-w-0">
                    <div className="flex flex-col sm:flex-row gap-4 min-w-0">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
                            type="button"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!firstName.trim()}
                            title={!firstName.trim() ? "El nombre es obligatorio" : undefined}
                            className={`px-4 py-2 rounded text-white transition ${firstName.trim()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-300 cursor-not-allowed"
                                }`}
                            type="button"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

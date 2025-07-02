"use client";

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
};

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg border-t-4 border-red-600 text-gray-800 font-[Inter]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar modal"
                >
                    {/* Puedes usar un icono X aquí si tienes FontAwesome o react-icons */}
                    ✕
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 font-semibold transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

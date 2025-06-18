interface Props {
  show: boolean;
  missingFields: { key: string; label: string }[];
  onClose: () => void;
}

export default function ProfileMissingModal({ show, missingFields, onClose }: Props) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Completa tu perfil</h2>
        <p className="mb-2">Te faltan los siguientes campos:</p>
        <ul className="list-disc list-inside mb-4">
          {missingFields.map((field) => (
            <li key={field.key}>{field.label}</li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
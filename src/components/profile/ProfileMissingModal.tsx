interface Props {
  show: boolean;
  missingFields: { key: string; label: string }[];
  onClose: () => void;
}

export default function ProfileMissingModal({ show, missingFields, onClose }: Props) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-blue-200 animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          Completa tu perfil
        </h2>
        <p className="mb-3 text-gray-700">Te faltan los siguientes campos:</p>
        <ul className="list-disc list-inside mb-6 text-gray-800">
          {missingFields.map((field) => (
            <li key={field.key}>{field.label}</li>
          ))}
        </ul>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
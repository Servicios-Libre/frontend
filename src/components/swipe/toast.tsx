import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, type = "info", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white animate-toast-in
        ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"}`}
      role="alert"
    >
      {message}
      <button className="ml-4 text-white font-bold" onClick={onClose}>
        ×
      </button>
      <style jsx>{`
        .animate-toast-in {
          animation: toastIn 0.3s;
        }
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
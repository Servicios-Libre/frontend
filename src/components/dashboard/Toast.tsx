'use client';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
}

export default function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold transition
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {message}
    </div>
  );
}
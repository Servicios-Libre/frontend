import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxButtons?: number; // Opcional, para limitar botones visibles
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  maxButtons = 7,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Lógica simple para mostrar botones con "..." cuando hay muchas páginas
  const pageNumbers: (number | "...")[] = [];

  if (totalPages <= maxButtons) {
    // Mostrar todas las páginas
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    // Mostrar primeros 2, últimos 2 y 3 en el medio (ajustable)
    const left = 2;
    const right = 2;
    const middle = maxButtons - left - right - 2; // espacio para ...

    if (currentPage <= left + middle) {
      // Páginas iniciales
      for (let i = 1; i <= left + middle; i++) pageNumbers.push(i);
      pageNumbers.push("...");
      for (let i = totalPages - right + 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage >= totalPages - right - middle + 1) {
      // Páginas finales
      for (let i = 1; i <= left; i++) pageNumbers.push(i);
      pageNumbers.push("...");
      for (let i = totalPages - right - middle + 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      // Páginas del medio
      for (let i = 1; i <= left; i++) pageNumbers.push(i);
      pageNumbers.push("...");
      for (let i = currentPage - Math.floor(middle / 2); i <= currentPage + Math.floor(middle / 2); i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      for (let i = totalPages - right + 1; i <= totalPages; i++) pageNumbers.push(i);
    }
  }

  return (
    <nav className="flex justify-center gap-2 mt-4" aria-label="Paginación">
      {pageNumbers.map((pageNum, idx) =>
        pageNum === "..." ? (
          <span key={`dots-${idx}`} className="px-3 py-1 text-sm font-semibold text-gray-400 select-none">
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum as number)}
            className={`px-3 py-1 rounded text-sm font-semibold ${
              currentPage === pageNum
                ? "bg-indigo-500 text-white"
                : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
            }`}
          >
            {pageNum}
          </button>
        )
      )}
    </nav>
  );
}

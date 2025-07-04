import React from "react";
import { useIsMobile } from "@/hooks/useIsMobil";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: "admin" | "default"; // tu prop original de colores
  size?: "admin" | "default";    // nueva prop para tamaño y padding
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  variant = "admin",
  size = "admin",
}: PaginationProps) {
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Clases comunes para tamaños, depende de size prop:
  const sizeClasses = size === "default"
    ? "px-4 py-2 text-base"
    : "px-3 py-1 text-sm";

  if (isMobile) {
    return (
      <nav className="flex justify-between gap-4 mt-4 font-semibold" aria-label="Mobile Pagination">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`${sizeClasses} rounded font-semibold
            ${variant === "admin"
              ? "bg-indigo-200 text-indigo-800 disabled:opacity-50"
              : "bg-white text-gray-700 border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
            }`}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`${sizeClasses} rounded font-semibold
            ${variant === "admin"
              ? "bg-indigo-200 text-indigo-800 disabled:opacity-50"
              : "bg-white text-gray-700 border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
            }`}
        >
          Siguiente
        </button>
      </nav>
    );
  }

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage <= 3) {
      for (let i = 2; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
    } else if (currentPage >= totalPages - 2) {
      pages.push("...");
      for (let i = totalPages - 3; i < totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center gap-2 mt-4" aria-label="Desktop Pagination">
      {pageNumbers.map((pageNum, idx) =>
        pageNum === "..." ? (
          <span
            key={`dots-${idx}`}
            className={`${sizeClasses} font-semibold text-gray-400 select-none`}
          >
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum as number)}
            className={`${sizeClasses} rounded font-semibold
              ${variant === "admin"
                ? currentPage === pageNum
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
                : currentPage === pageNum
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
          >
            {pageNum}
          </button>
        )
      )}
    </nav>
  );
}

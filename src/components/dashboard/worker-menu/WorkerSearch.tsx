"use client";

import React from "react";

type WorkerSearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function WorkerSearch({ searchTerm, setSearchTerm }: WorkerSearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-1/2 p-2 rounded-lg text-indigo-950 font-normal bg-gray-50 pl-4"
      />
    </div>
  );
}

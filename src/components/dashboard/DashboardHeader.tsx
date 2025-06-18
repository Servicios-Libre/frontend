'use client';

import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';

interface DashboardHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function DashboardHeader({ search, setSearch }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="relative w-1/2">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-indigo-600" />
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-indigo-700" />
          <span className="text-base font-medium text-gray-800">Usuario Fulanito</span>
        </div>
      </div>
    </header>
  );
}
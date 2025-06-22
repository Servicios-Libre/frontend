'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaThLarge, FaTools, FaUserCog, FaTicketAlt, FaCogs, FaMoneyBill, FaUser, FaQuestionCircle } from 'react-icons/fa';

interface SidebarProps {
  workerRequests?: number;
}

export default function Sidebar({ workerRequests = 0 }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-6 flex justify-center items-center border-b">
        <Image
          src="/img/logosl-dark.png"
          alt="logo"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      <nav className="mt-8 px-4 text-gray-700 space-y-1">
        <p className="text-xs text-gray-400 mb-2">MENÚ</p>
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaThLarge /> Dashboard
        </Link>
        <Link href="/dashboard/services-management" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50 relative">
          <FaTools /> Servicios
        </Link>
        <Link href="/dashboard/worker-management" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50 relative">
          <FaUserCog /> Worker Menu
          {workerRequests > 0 && (
            <span className="absolute right-2 top-2 bg-yellow-400 text-xs text-white font-bold rounded-full px-2 py-0.5">
              {workerRequests}
            </span>
          )}
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaTicketAlt /> Tickets
        </Link>
        <p className="text-xs text-gray-400 mt-6 mb-2">OTROS</p>
        <Link href="#" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaCogs /> Settings
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaMoneyBill /> Payment
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaUser /> Accounts
        </Link>
        <Link href="#" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
          <FaQuestionCircle /> Help
        </Link>
      </nav>
    </aside>
  );
}
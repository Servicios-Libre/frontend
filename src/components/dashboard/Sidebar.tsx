"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaThLarge,
  FaTools,
  FaUserCog,
  FaTicketAlt,
  FaChartBar,
  FaUserShield,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import NavLink from "@/components/dashboard/sidebar/NavLink";
import { useAdminContext } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const {
    displayedWorkerRequestsCount,
    displayedServiceRequestsCount,
    isReady,
  } = useAdminContext();

  const [stableServiceCount, setStableServiceCount] = useState<number>(displayedServiceRequestsCount);
  const [stableWorkerCount, setStableWorkerCount] = useState<number>(displayedWorkerRequestsCount);
  const { user } = useAuth();

  useEffect(() => {
    if (isReady && displayedServiceRequestsCount !== undefined) {
      setStableServiceCount(displayedServiceRequestsCount);
    }
  }, [displayedServiceRequestsCount, isReady]);

  useEffect(() => {
    if (isReady && displayedWorkerRequestsCount !== undefined) {
      setStableWorkerCount(displayedWorkerRequestsCount);
    }
  }, [displayedWorkerRequestsCount, isReady]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`bg-gradient-to-t from-purple-700 to-indigo-800
        w-64
        min-h-screen transform transition-transform duration-300 ease-in-out z-50
        fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-[100vh] lg:shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
      >
        <div className="p-6 flex justify-between items-start">
          <Image
            src="/img/logosl.png"
            alt="logo"
            width={150}
            height={150}
            className="object-contain filter brightness-125"
          />
          <button
            onClick={onClose}
            className="lg:hidden text-gray-200 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10 -mt-2 -mr-2"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2 text-sm">
          <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mb-3">Menú principal</p>

          <NavLink href="/dashboard" icon={<FaThLarge />} text="Dashboard" notificationCount={0} pathname={pathname} onClick={onClose} />

          <NavLink href="/dashboard/services-management" icon={<FaTools />} text="Servicios" notificationCount={stableServiceCount} pathname={pathname} onClick={onClose} />

          <NavLink href="/dashboard/worker-management" icon={<FaUserCog />} text="Trabajadores" notificationCount={stableWorkerCount} pathname={pathname} onClick={onClose} />

          <NavLink href="/dashboard/invoices-management" icon={<FaTicketAlt />} text="Tickets" pathname={pathname} onClick={onClose} />

          <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mt-8 mb-3">Administración</p>

          {user?.email === "nachomartinezdap@gmail.com" && (
            <NavLink href="/dashboard/admins-management" icon={<FaUserShield />} text="Admins" pathname={pathname} onClick={onClose} />
          )}

          <NavLink href="/dashboard/stats" icon={<FaChartBar />} text="Estadísticas" pathname={pathname} onClick={onClose} />

          <NavLink href="/servicios" icon={<FaSignOutAlt />} text="Salir" pathname={pathname} onClick={onClose} />
        </nav>
      </aside>
    </>
  );
}

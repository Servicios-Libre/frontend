"use client";

import Link from "next/link";
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
import { useAdminContext } from "@/context/AdminContext";
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

  // Estado local para mantener el último valor visible y evitar parpadeo
  const [stableServiceCount, setStableServiceCount] = useState<number>(displayedServiceRequestsCount);
  const [stableWorkerCount, setStableWorkerCount] = useState<number>(displayedWorkerRequestsCount);

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
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-t from-purple-700 to-indigo-800 min-h-screen
                   transform transition-transform duration-300 ease-in-out z-50
                   ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-xl`}
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

        <nav className="mt-8 px-4 space-y-2">
          <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mb-3">Menú principal</p>

          <NavLink
            href="/dashboard"
            icon={<FaThLarge />}
            text="Dashboard"
            pathname={pathname}
            onClick={onClose}
          />

          <NavLink
            href="/dashboard/services-management"
            icon={<FaTools />}
            text="Servicios"
            notificationCount={stableServiceCount}
            pathname={pathname}
            onClick={onClose}
          />

          <NavLink
            href="/dashboard/worker-management"
            icon={<FaUserCog />}
            text="Trabajadores"
            notificationCount={stableWorkerCount}
            pathname={pathname}
            onClick={onClose}
          />

          <NavLink
            href="/dashboard/tickets"
            icon={<FaTicketAlt />}
            text="Tickets"
            pathname={pathname}
            onClick={onClose}
          />

          <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mt-8 mb-3">Administración</p>

          <NavLink
            href="/dashboard/admins-management"
            icon={<FaUserShield />}
            text="Admins"
            pathname={pathname}
            onClick={onClose}
          />

          <NavLink
            href="/dashboard/stats"
            icon={<FaChartBar />}
            text="Estadísticas"
            pathname={pathname}
            onClick={onClose}
          />

          <NavLink
            href="/servicios"
            icon={<FaSignOutAlt />}
            text="Salir"
            pathname={pathname}
            onClick={onClose}
          />
        </nav>
      </aside>
    </>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  notificationCount?: number;
  pathname: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  text,
  notificationCount,
  pathname,
  onClick,
}) => {
  const isActive = pathname === href;

  const goldenGradientClasses =
    "bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 text-amber-900 shadow-lg";
  const hoverClasses =
    "hover:bg-white/10 hover:text-white hover:translate-x-1";
  const activeIconColor = "text-amber-900";
  const inactiveIconColor = "text-gray-200";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out transform relative group
        ${isActive ? `${goldenGradientClasses} translate-x-2` : `text-gray-200 ${hoverClasses}`}`}
      onClick={onClick}
    >
      <div
        className={`text-xl ${isActive
          ? activeIconColor
          : `${inactiveIconColor} group-hover:scale-110 transition-transform duration-200`
          }`}
      >
        {icon}
      </div>
      <span className="font-semibold">{text}</span>
      {notificationCount !== undefined && notificationCount > 0 && (
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center transform scale-90 group-hover:scale-100 transition-transform duration-200 origin-right
          ${isActive ? "bg-purple-700" : "bg-amber-500"}`}
        >
          {notificationCount}
        </span>
      )}
    </Link>
  );
};

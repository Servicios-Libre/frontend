'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaThLarge, FaTools, FaUserCog, FaTicketAlt, FaCogs, FaMoneyBill, FaUser, FaQuestionCircle } from 'react-icons/fa';

interface SidebarProps {
  workerRequests?: number;
}

export default function Sidebar({ workerRequests = 0 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-t from-purple-700 to-indigo-800 min-h-screen border-r border-gray-200 transform transition-transform duration-300 ease-in-out">
      <div className="p-6 items-start ">
        <Image
          src="/img/logosl.png"
          alt="logo"
          width={150}
          height={150}
          className="object-contain filter brightness-125"
        />
      </div>
      <nav className="mt-8 px-4 space-y-2">
        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mb-3">Menú Principal</p>
        <NavLink href="/dashboard" icon={<FaThLarge />} text="Dashboard" pathname={pathname} />
        <NavLink href="/dashboard/services-management" icon={<FaTools />} text="Servicios" pathname={pathname} />
        <NavLink
          href="/dashboard/worker-management"
          icon={<FaUserCog />}
          text="Worker Menu"
          notificationCount={workerRequests}
          pathname={pathname}
        />
        <NavLink href="#" icon={<FaTicketAlt />} text="Tickets" pathname={pathname} />

        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider mt-8 mb-3">Administración</p>
        <NavLink href="#" icon={<FaCogs />} text="Settings" pathname={pathname} />
        <NavLink href="#" icon={<FaMoneyBill />} text="Payment" pathname={pathname} />
        <NavLink href="#" icon={<FaUser />} text="Accounts" pathname={pathname} />
        <NavLink href="#" icon={<FaQuestionCircle />} text="Help" pathname={pathname} />
      </nav>
    </aside>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  notificationCount?: number;
  pathname: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text, notificationCount, pathname }) => {
  const isActive = pathname === href;

  // Clases para el degradado dorado
  const goldenGradientClasses = 'bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 text-amber-900 shadow-lg';
  // Clases para el hover cuando no está activo
  const hoverClasses = 'hover:bg-white/10 hover:text-white hover:translate-x-1';
  // Clases para el color del ícono cuando está activo
  const activeIconColor = 'text-amber-900';
  // Clases para el color del ícono cuando no está activo (gris claro)
  const inactiveIconColor = 'text-gray-200';

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out transform relative group
        ${isActive ? `${goldenGradientClasses} translate-x-2` : `text-gray-200 ${hoverClasses}`}`
      }
    >
      <div className={`text-xl ${isActive ? activeIconColor : `${inactiveIconColor} group-hover:scale-110 transition-transform duration-200`}`}>
        {icon}
      </div>
      <span className="font-semibold">
        {text}
      </span>
      {notificationCount && notificationCount > 0 && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-400 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center transform scale-90 group-hover:scale-100 transition-transform duration-200 origin-right">
          {notificationCount}
        </span>
      )}
    </Link>
  );
};
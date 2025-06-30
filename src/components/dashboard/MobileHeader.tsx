'use client';

import { FaBars } from 'react-icons/fa';
import Image from 'next/image';

interface MobileHeaderProps {
  onOpenSidebar: () => void;
}

export default function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-gradient-to-r from-purple-800 to-indigo-900 p-4 flex justify-between items-center shadow-lg">
      <Image
        src="/img/logosl.png"
        alt="logo"
        width={120}
        height={120}
        className="object-contain filter brightness-125"
      />
      <button
        onClick={onOpenSidebar}
        className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10"
        aria-label="Abrir menú"
      >
        <FaBars className="text-2xl" />
      </button>
    </header>
  );
}

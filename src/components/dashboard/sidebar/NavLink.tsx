"use client";

import Link from "next/link";
import { useMemo } from "react";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    text: string;
    notificationCount?: number;
    pathname: string;
    onClick?: () => void;
}

export default function NavLink({
    href,
    icon,
    text,
    notificationCount,
    pathname,
    onClick,
}: NavLinkProps) {
    const isActive = useMemo(() => pathname === href, [pathname, href]);

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
            <span className="font-semibold truncate">{text}</span>

            {notificationCount !== undefined && notificationCount > 0 && (
                <span
                    className={`
      absolute
      top-1/2 -translate-y-1/2 right-3
      text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px] text-center
      ${isActive ? "bg-purple-700" : "bg-amber-500"}
      transform scale-90 group-hover:scale-100 transition-transform duration-200 origin-right
    `}
                >
                    {notificationCount}
                </span>
            )}
        </Link>
    );
}

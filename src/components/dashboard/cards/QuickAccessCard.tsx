// components/dashboard/cards/QuickAccessCard.tsx
"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface QuickAccessCardProps {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    hoverColor: string;
}

export default function QuickAccessCard({
    href,
    icon,
    title,
    description,
    hoverColor,
}: QuickAccessCardProps) {
    return (
        <Link
            href={href}
            className={`bg-indigo-800 rounded-xl shadow-xl px-4 py-6 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 transition-all duration-300 transform hover:scale-[1.02] ${hoverColor} group`}
        >
            {/* Mobile layout */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-white text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200">
                    {icon}
                </div>
                <div>
                    <span className="font-bold text-base sm:text-xl text-white block">
                        {title}
                    </span>
                    <span className="text-gray-300 text-sm hidden sm:block">
                        {description}
                    </span>
                </div>
            </div>

            {/* Flecha solo visible en sm+ */}
            <FaArrowRight className="text-gray-400 text-xl sm:text-3xl hidden sm:block group-hover:text-white transition-all duration-200" />
        </Link>
    );
}

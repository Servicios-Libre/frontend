// components/dashboard/cards/StatCard.tsx
"use client";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  bgColor: string;
  iconColor: string;
  valueColor: string;
}

export default function StatCard({
  icon,
  value,
  label,
  bgColor,
  iconColor,
  valueColor,
}: StatCardProps) {
  return (
    <div
      className={`${bgColor} relative rounded-xl shadow-xl p-4 sm:p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-[1.02] cursor-pointer aspect-square overflow-hidden`}
    >
      {/* Icono de fondo grande, translúcido, solo en móvil */}
      <div
        className={`absolute text-white/20 text-8xl sm:hidden z-0`}
      >
        {icon}
      </div>

      {/* Número principal en móvil */}
      <span
        className={`text-white text-5xl font-extrabold sm:hidden z-10`}
      >
        {value}
      </span>

      {/* Vista completa en sm+: icono, valor y etiqueta */}
      <div
        className={`${iconColor} text-5xl hidden sm:block mb-3 z-10`}
      >
        {icon}
      </div>

      <span
        className={`${valueColor} text-5xl font-extrabold mb-2 hidden sm:block z-10`}
      >
        {value}
      </span>

      <span className="text-gray-200 text-lg font-medium text-center hidden sm:block z-10">
        {label}
      </span>
    </div>
  );
}

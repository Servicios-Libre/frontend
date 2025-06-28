'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import {
  FaUserPlus,
  FaTools,
  FaUserCog,
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaArrowRight,
  FaClock,
  FaInfoCircle,
} from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { useAdminContext } from '@/context/AdminContext';
import { LoadingScreen } from '@/components/dashboard/LoadingScreen';
import MobileHeader from "@/components/dashboard/MobileHeader";

export default function DashboardPage() {
  const { users, loading, acceptedServiceCount } = useAdminContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activities = [
    { id: 1, text: 'Usuario 3 fue dado de alta como trabajador.' },
    { id: 2, text: 'Usuario 2 actualizó su perfil.' },
    { id: 3, text: 'Usuario 1 aprobó un servicio.' },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  // Filtrados con seguridad para evitar errores si users es null o vacío
  const totalAdmins = users?.filter((u) => u.role === 'admin').length ?? 0;
  const totalWorkers = users?.filter((u) => u.role === 'worker').length ?? 0;
  const totalRegularUsers = users?.filter((u) => u.role === 'user').length ?? 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">

        <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-8 text-white">
          <h1 className="hidden lg:block text-3xl font-bold mb-8 tracking-wide">Panel de Administración</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<FaUsers />}
              value={totalRegularUsers}
              label="Clientes"
              bgColor="bg-purple-700"
              iconColor="text-purple-300"
              valueColor="text-white"
            />
            <StatCard
              icon={<FaUserShield />}
              value={totalAdmins}
              label="Administradores"
              bgColor="bg-indigo-700"
              iconColor="text-indigo-300"
              valueColor="text-white"
            />
            <StatCard
              icon={<FaUserTie />}
              value={totalWorkers}
              label="Trabajadores"
              bgColor="bg-fuchsia-700"
              iconColor="text-fuchsia-300"
              valueColor="text-white"
            />
            <StatCard
              icon={<FaTools />}
              value={acceptedServiceCount}
              label="Servicios activos"
              bgColor="bg-blue-700"
              iconColor="text-blue-300"
              valueColor="text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <QuickAccessCard
              href="/dashboard/worker-management"
              icon={<FaUserCog />}
              title="Gestión de Trabajadores"
              description="Aprobar solicitudes y administrar trabajadores"
              hoverColor="hover:bg-purple-700"
            />
            <QuickAccessCard
              href="/dashboard/services-management"
              icon={<FaTools />}
              title="Gestión de Servicios"
              description="Aprobar o rechazar servicios publicados"
              hoverColor="hover:bg-indigo-700"
            />
            <QuickAccessCard
              href="#"
              icon={<FaUserPlus />}
              title="Crear nuevo usuario"
              description="Agregar usuarios al sistema"
              hoverColor="hover:bg-fuchsia-700"
            />
          </div>

          <div className="relative bg-indigo-800 rounded-xl shadow-2xl p-8 mb-12 overflow-hidden">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <FaClock className="text-amber-400" /> Últimas actividades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="bg-purple-900/60 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-3 border border-purple-700/50"
                >
                  <span className="flex-shrink-0 text-amber-300 text-xl mt-1">
                    <FaInfoCircle />
                  </span>
                  <p className="text-gray-100 text-base flex-1">{act.text}</p>
                </div>
              ))}
            </div>
            <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-800 to-transparent pointer-events-none"></div>
          </div>

          <button
            className="w-full md:w-auto px-8 py-4 text-xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 text-amber-900 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => (window.location.href = '/servicios')}
          >
            Salir del Panel
          </button>
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  bgColor: string;
  iconColor: string;
  valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  bgColor,
  iconColor,
  valueColor,
}) => (
  <div
    className={`${bgColor} rounded-xl shadow-xl p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
  >
    <div className={`${iconColor} text-5xl mb-3`}>{icon}</div>
    <span className={`${valueColor} text-5xl font-extrabold mb-2`}>{value}</span>
    <span className="text-gray-200 text-lg font-medium text-center">{label}</span>
  </div>
);

interface QuickAccessCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  hoverColor: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  href,
  icon,
  title,
  description,
  hoverColor,
}) => (
  <Link
    href={href}
    className={`bg-indigo-800 rounded-xl shadow-xl p-6 flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02] ${hoverColor} group`}
  >
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-white text-3xl group-hover:scale-110 transition-transform duration-200">{icon}</div>
        <span className="font-bold text-xl text-white">{title}</span>
      </div>
      <span className="text-gray-300 text-base">{description}</span>
    </div>
    <FaArrowRight className="text-gray-400 text-3xl group-hover:text-white transition-all duration-200" />
  </Link>
);

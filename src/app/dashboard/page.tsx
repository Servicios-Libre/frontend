'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { FaUserPlus, FaTools, FaUserCog, FaUsers, FaUserShield, FaUserTie, FaArrowRight, FaClock, FaBars, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const initialUsers = [
  { id: 'YY-853581', username: 'Usuario 1', role: 'admin', email: 'user@gmail.com', phone: '2342' },
  { id: 'YY-853599', username: 'Usuario 2', role: 'user', email: 'user@gmail.com', phone: '23432432' },
  { id: 'YY-853322', username: 'Usuario 3', role: 'worker', email: 'user@gmail.com', phone: '234' },
];

const initialServices = [
  { id: '1', title: 'Plomería básica', worker: 'Juan Pérez', status: 'pendiente', date: '2025-06-18' },
  { id: '2', title: 'Electricidad avanzada', worker: 'Ana Gómez', status: 'aprobado', date: '2025-06-15' },
  { id: '3', title: 'Pintura de interiores', worker: 'Carlos Ruiz', status: 'rechazado', date: '2025-06-10' },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const totalUsers = initialUsers.length;
  const totalAdmins = initialUsers.filter(u => u.role === 'admin').length;
  const totalWorkers = initialUsers.filter(u => u.role === 'worker').length;
  const totalServices = initialServices.length;

  const activities = [
    { id: 1, text: 'Usuario 3 fue dado de alta como trabajador.' },
    { id: 2, text: 'Usuario 2 actualizó su perfil.' },
    { id: 3, text: 'Usuario 1 aprobó un servicio.' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950">
      <Sidebar
        workerRequests={totalWorkers}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Navbar superior visible solo en móvil, fijo */}
        <header className="lg:hidden sticky top-0 z-30 bg-gradient-to-r from-purple-800 to-indigo-900 p-4 flex justify-between items-center shadow-lg">
          {/* Logo en navbar móvil (este sí se mantiene) */}
          <Image
            src="/img/logosl.png"
            alt="logo"
            width={120}
            height={120}
            className="object-contain filter brightness-125"
          />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            aria-label="Abrir menú"
          >
            <FaBars className="text-2xl" />
          </button>
        </header>

        <main className="flex-1 p-8 text-white">
          {/* Título principal para desktop (vuelve a ser h1 con texto) */}
          <h1 className="hidden lg:block text-3xl font-bold mb-8 tracking-wide">Panel de Administración</h1>


          {/* Cards de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<FaUsers />}
              value={totalUsers}
              label="Usuarios totales"
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
              value={totalServices}
              label="Servicios activos"
              bgColor="bg-blue-700"
              iconColor="text-blue-300"
              valueColor="text-white"
            />
          </div>

          {/* Accesos rápidos */}
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

          {/* Últimas actividades */}
          <div className="relative bg-indigo-800 rounded-xl shadow-2xl p-8 mb-12 overflow-hidden"> {/* Eliminado hover:scale y cursor-pointer del contenedor principal */}
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <FaClock className="text-amber-400" /> Últimas actividades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map(act => (
                <div
                  key={act.id}
                  className="bg-purple-900/60 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-3
                             border border-purple-700/50" // Eliminado transform, transition, hover:scale, hover:shadow-xl, cursor-pointer
                >
                  <span className="flex-shrink-0 text-amber-300 text-xl mt-1">
                    <FaInfoCircle />
                  </span>
                  <p className="text-gray-100 text-base flex-1">
                    {act.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Efecto de difuminado en el lado derecho para pantallas grandes */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-800 to-transparent pointer-events-none"></div> {/* Cambiado from-purple-900 a from-indigo-800 para que coincida con el fondo del contenedor */}
          </div>

          {/* Botón de salida */}
          <button
            className="w-full md:w-auto px-8 py-4 text-xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 text-amber-900 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/servicios'}
          >
            Salir del Panel
          </button>
        </main>
      </div>
    </div>
  );
}

// Componentes StatCard y QuickAccessCard (sin cambios, ya que no se relacionan con este ajuste)
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  bgColor: string;
  iconColor: string;
  valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, bgColor, iconColor, valueColor }) => (
  <div className={`${bgColor} rounded-xl shadow-xl p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
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

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ href, icon, title, description, hoverColor }) => (
  <Link href={href} className={`bg-indigo-800 rounded-xl shadow-xl p-6 flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02] ${hoverColor} group`}>
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
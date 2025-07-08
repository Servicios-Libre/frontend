"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import {
  FaUserPlus,
  FaTools,
  FaUserCog,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAdminContext } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import MobileHeader from "@/components/dashboard/MobileHeader";
import RoleDistributionChart from "@/components/dashboard/charts/RoleDistributionChart";
import SystemActivityChart from "@/components/dashboard/charts/SystemActivityChart";
import StatsBarChart from "@/components/dashboard/charts/ServicesCategoryChart";
import StatCard from "@/components/dashboard/cards/StatCard";
import QuickAccessCard from "@/components/dashboard/cards/QuickAccessCard";


export default function DashboardPage() {
  const { users, loading, acceptedServiceCount } = useAdminContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Servicio Libre - Dashboard";
  }, []);


  if (loading) {
    return <LoadingScreen />;
  }

  // Filtrados con seguridad para evitar errores si users es null o vacío
  const totalAdmins = users?.filter((u) => u.role === "admin").length ?? 0;
  const totalWorkers = users?.filter((u) => u.role === "worker").length ?? 0;
  const totalRegularUsers = users?.filter((u) => u.role === "user").length ?? 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-6 text-white">
          <h1 className="hidden lg:block text-3xl font-bold mb-8 tracking-wide">
            Panel de Administración
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
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
            {user?.email === "nachomartinezdap@gmail.com" &&
              <QuickAccessCard
                href="#"
                icon={<FaUserPlus />}
                title="Gestión de administradores"
                description="Dar de alta/baja para administradores"
                hoverColor="hover:bg-fuchsia-700"
              />
            }
          </div>

          {/* Nueva sección de gráficas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <RoleDistributionChart />
            <StatsBarChart />
          </div>

          <div className="mb-12">
            <SystemActivityChart />
          </div>
        </main>
      </div>
    </div>
  );
}
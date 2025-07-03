'use client';  
  
import React, { useState, useEffect } from 'react';  
import Sidebar from '@/components/dashboard/Sidebar';  
import MobileHeader from '@/components/dashboard/MobileHeader';  
import { LoadingScreen } from '@/components/dashboard/LoadingScreen';  
import { useAdminContext } from '@/context/AdminContext';  
import { useAuth } from '@/context/AuthContext';  
import TopPremiumWorkers from '@/components/dashboard/charts/TopPremiumWorkers';  
import MembershipStats from '@/components/dashboard/charts/MembershipStats';  
import { FaChartBar, FaCrown, FaUsers } from 'react-icons/fa';  
  
export default function StatsPage() {  
  const { loading } = useAdminContext();  
  const { user: authUser } = useAuth();  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
  
  useEffect(() => {  
    document.title = "Servicio Libre - Estadísticas Premium";  
  }, []);  
  
  const isAdmin = authUser?.role === "admin";  
  
  if (loading) {  
    return <LoadingScreen />;  
  }  
  
  if (!isAdmin) {  
    return (  
      <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950">  
        <h2>No tienes permiso para acceder a esta página.</h2>  
      </div>  
    );  
  }  
  
  return (  
    <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950">  
      <Sidebar  
        isOpen={isSidebarOpen}  
        onClose={() => setIsSidebarOpen(false)}  
      />  
  
      <div className="flex-1 flex flex-col">  
        <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />  
  
        <main className="flex-1 p-8 text-white">  
          <div className="mb-8">  
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">  
              <FaCrown className="text-amber-400" />  
              Estadísticas Premium  
            </h1>  
            <p className="text-gray-300 text-lg">  
              Análisis de workers premium y membresías  
            </p>  
          </div>  
  
          {/* Top Workers Section */}  
          <div className="mb-8">  
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">  
              <FaUsers className="text-green-400" />  
              Mejores Workers Premium  
            </h2>  
            <TopPremiumWorkers />  
          </div>  
  
          {/* Membership Stats Section */}  
          <div className="mb-8">  
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">  
              <FaChartBar className="text-blue-400" />  
              Estadísticas de Membresías  
            </h2>  
            <MembershipStats />  
          </div>  
        </main>  
      </div>  
    </div>  
  );  
}
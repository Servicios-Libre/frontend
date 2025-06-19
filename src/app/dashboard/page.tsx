'use client';

import { useEffect, useState } from "react";
import Sidebar from '@/components/dashboard/Sidebar';
import { FaUserPlus, FaTools, FaUserCog, FaUsers, FaUserShield, FaUserTie, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { getAllUsers } from "@/services/dashboard-admin/userService";
import { getAllTickets } from "@/services/dashboard-admin/ticketsService";
import { Perfil, Ticket } from "@/types";

export default function DashboardPage() {
  const [users, setUsers] = useState<Perfil[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllUsers(), getAllTickets()])
      .then(([usersData, ticketsData]) => {
        setUsers(usersData as Perfil[]);
        setTickets(ticketsData as Ticket[]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Resúmenes (solo cuenta usuarios, ya que no hay roles en Perfil)
  const totalUsers = users.length;
  const totalServices = tickets.filter(t => t.type === "service").length;
  const pendingServices = tickets.filter(t => t.type === "service" && t.status === "pendiente").length;
  const workerRequests = tickets.filter(t => t.type === "to-worker" && t.status === "pendiente").length;

  // Simulación de últimas actividades
  const activities = [
    { id: 1, text: 'Usuario 3 fue dado de alta como trabajador.' },
    { id: 2, text: 'Usuario 2 actualizó su perfil.' },
    { id: 3, text: 'Usuario 1 aprobó un servicio.' },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-xl">Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar pendingServices={pendingServices} workerRequests={workerRequests} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Panel de Administración</h1>

        {/* Cards de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <FaUsers className="text-3xl text-indigo-600 mb-2" />
            <span className="text-3xl font-bold text-indigo-700">{totalUsers}</span>
            <span className="text-gray-600 mt-2">Usuarios totales</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <FaUserShield className="text-3xl text-green-600 mb-2" />
            <span className="text-3xl font-bold text-green-700">-</span>
            <span className="text-gray-600 mt-2">Administradores</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <FaUserTie className="text-3xl text-yellow-600 mb-2" />
            <span className="text-3xl font-bold text-yellow-700">-</span>
            <span className="text-gray-600 mt-2">Trabajadores</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <FaTools className="text-3xl text-blue-600 mb-2" />
            <span className="text-3xl font-bold text-blue-700">{totalServices}</span>
            <span className="text-gray-600 mt-2">Servicios</span>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/worker-menu" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow p-6 flex items-center justify-between transition">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaUserCog className="text-indigo-600 text-xl" />
                <span className="font-semibold text-indigo-700">Gestión de Trabajadores</span>
              </div>
              <span className="text-gray-600 text-sm">Aprobar solicitudes y administrar trabajadores</span>
            </div>
            <FaArrowRight className="text-indigo-400 text-2xl" />
          </Link>
          <Link href="/dashboard/services-menu" className="bg-blue-50 hover:bg-blue-100 rounded-lg shadow p-6 flex items-center justify-between transition">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaTools className="text-blue-600 text-xl" />
                <span className="font-semibold text-blue-700">Gestión de Servicios</span>
              </div>
              <span className="text-gray-600 text-sm">Aprobar o rechazar servicios publicados</span>
            </div>
            <FaArrowRight className="text-blue-400 text-2xl" />
          </Link>
          <Link href="#" className="bg-green-50 hover:bg-green-100 rounded-lg shadow p-6 flex items-center justify-between transition">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaUserPlus className="text-green-600 text-xl" />
                <span className="font-semibold text-green-700">Crear nuevo usuario</span>
              </div>
              <span className="text-gray-600 text-sm">Agregar usuarios al sistema</span>
            </div>
            <FaArrowRight className="text-green-400 text-2xl" />
          </Link>
        </div>

        {/* Tabla de usuarios (Perfil) */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Usuarios</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Profesión</th>
                  <th className="py-2 px-4">Imagen</th>
                  <th className="py-2 px-4">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((perfil) => (
                  <tr key={perfil.id}>
                    <td className="py-2 px-4">{perfil.id}</td>
                    <td className="py-2 px-4">{perfil.nombre}</td>
                    <td className="py-2 px-4">{perfil.profesion}</td>
                    <td className="py-2 px-4">
                      {perfil.imagen && (
                        <img src={perfil.imagen} alt={perfil.nombre} width={40} />
                      )}
                    </td>
                    <td className="py-2 px-4">{perfil.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Últimas actividades */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Últimas actividades</h2>
          <ul className="space-y-2">
            {activities.map(act => (
              <li key={act.id} className="text-gray-600 text-sm">
                • {act.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de salida */}
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-semibold"
          onClick={() => window.location.href = '/servicios'}
        >
          Salir del panel
        </button>
      </main>
    </div>
  );
}
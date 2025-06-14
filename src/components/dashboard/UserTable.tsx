'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaUserCircle, FaBell, FaThLarge, FaTools, FaUserCog, FaTicketAlt, FaCogs, FaMoneyBill, FaUser, FaQuestionCircle } from 'react-icons/fa';

const initialUsers = [
  {
    id: 'YY-853581',
    username: 'Usuario 1',
    role: 'admin',
    email: 'user@gmail.com',
    phone: '2342',
  },
  {
    id: 'YY-853599',
    username: 'Usuario 2',
    role: 'user',
    email: 'user@gmail.com',
    phone: '23432432',
  },
  {
    id: 'YY-853322',
    username: 'Usuario 3',
    role: 'worker',
    email: 'user@gmail.com',
    phone: '234',
  },
];

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const filteredUsers = initialUsers.filter((user) =>
    Object.values(user).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 flex items-center gap-2">
          <img src="/img/logosl-dark.png" alt="logo" className="w-auto h-auto" />
          <span className="font-bold text-lg">servicio libre</span>
        </div>
        <nav className="mt-6 px-4 text-gray-700 space-y-1">
          <p className="text-xs text-gray-400 mb-1">MENU</p>
          <Link href="#" className="flex items-center gap-2 p-2 rounded bg-indigo-100 text-indigo-700">
            <FaThLarge /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaTools /> Servicios
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaUserCog /> Worker Menu
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaTicketAlt /> Tickets
          </Link>
          <p className="text-xs text-gray-400 mt-4 mb-1">OTHERS</p>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaCogs /> Settings
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaMoneyBill /> Payment
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaUser /> Accounts
          </Link>
          <Link href="#" className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50">
            <FaQuestionCircle /> Help
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="relative w-1/2">
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <FaBell className="text-gray-600" />
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-gray-700" />
              <span className="text-sm text-gray-800">Usuario fulanito</span>
            </div>
          </div>
        </header>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>

        <div className="relative overflow-hidden shadow-md rounded-lg bg-white p-4">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="w-full text-left table-auto">
            <thead className="uppercase bg-gray-600 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-200 text-center">User ID</th>
                <th className="py-2 px-4 border border-gray-200 text-center">Username</th>
                <th className="py-2 px-4 border border-gray-200 text-center">Role</th>
                <th className="py-2 px-4 border border-gray-200 text-center">Email</th>
                <th className="py-2 px-4 border border-gray-200 text-center">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-2 px-4 text-center">{user.id}</td>
                    <td className="py-2 px-4 text-center">{user.username}</td>
                    <td className="py-2 px-4 text-center">{user.role}</td>
                    <td className="py-2 px-4 text-center">{user.email}</td>
                    <td className="py-2 px-4 text-center">{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
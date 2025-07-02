'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaRegComments } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { UserDropdown, MobileUserSection } from "./UserSections";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, unreadCount, loading } = useAuth();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    } else {
      setUserName("Usuario");
    }
  }, [user]);

  useEffect(() => {
    const handleUserNameChanged = (e: CustomEvent) => {
      setUserName(e.detail);
    };

    window.addEventListener("userNameChanged", handleUserNameChanged as EventListener);

    return () => {
      window.removeEventListener("userNameChanged", handleUserNameChanged as EventListener);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-500 backdrop-blur-md text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/landing">
              <Image
                width={100}
                height={100}
                src="/img/logosl.png"
                alt="logo-servicio-libre"
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center">
            <Link href="/landing" className="text-white font-medium hover:underline-offset-0">Inicio</Link>
            <Link href="/servicios" className="text-white font-medium hover:underline-offset-0 ml-6">Servicios</Link>
            <Link href="/sobre-nosotros" className="text-white font-medium hover:underline-offset-0 ml-6">Sobre nosotros</Link>
            <Link href="/ayuda" className="text-white font-medium hover:underline-offset-0 ml-6">Ayuda</Link>

            {/* Chat solo si está logueado */}
            {!loading && user && (
              <Link href="/chat" className="relative ml-6 group">
                <FaRegComments className="text-2xl hover:text-amber-400 transition" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-xs rounded-full px-1.5 py-0.5 text-white font-bold shadow">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Botón ingresar o dropdown */}
            <div className="ml-6">
              {!loading ? (
                user ? (
                  <UserDropdown userName={userName} user={user} logout={logout} />
                ) : (
                  <Link
                    href="/auth"
                    className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-blue-100 transition border border-white"
                  >
                    Ingresar
                  </Link>
                )
              ) : (
                <div className="px-4 py-2 bg-white/30 rounded animate-pulse w-[100px] h-[40px]" />
              )}
            </div>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-4xl focus:outline-none"
              aria-label="Menú"
            >
              <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú Mobile */}
      <div
        className={`md:hidden overflow-hidden fixed top-20 left-0 w-full z-40 transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          } bg-white text-gray-900 px-8 pb-6 shadow-md`}
      >
        <div className="mt-4 mb-2">
          <Link href="/landing" className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link href="/servicios" className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>Servicios</Link>
          <Link href="/sobre-nosotros" className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>Sobre nosotros</Link>
          <Link href="/ayuda" className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>Ayuda</Link>

          {!loading && user && (
            <Link href="/chat" className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>
              <span className="inline-flex items-center gap-2 relative">
                <FaRegComments className="inline" /> Chats
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-amber-500 text-xs rounded-full px-1.5 py-0.5 text-white font-bold shadow">
                    {unreadCount}
                  </span>
                )}
              </span>
            </Link>
          )}
        </div>
        <hr className="mb-6 border-gray-200 sm:mx-auto" />

        {!loading ? (
          <MobileUserSection user={user} userName={userName} logout={logout} setIsOpen={setIsOpen} />
        ) : (
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        )}
      </div>
    </>
  );
}

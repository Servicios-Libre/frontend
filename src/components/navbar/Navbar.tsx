'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "@/context/AuthContext";
import { UserDropdown, MobileUserSection } from "./UserSections";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-blue-500 backdrop-blur-md text-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl font-bold">
                        <Image
                            width={100}
                            height={100}
                            src="/img/logosl.png"
                            alt="logo-servicio-libre"
                            className="h-10 w-auto"
                        />
                    </div>
                    {/* Menú Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link href="/landing" className="text-white font-medium hover:underline-offset-0">Inicio</Link>
                        <Link href="/servicios" className="text-white font-medium hover:underline-offset-0 ml-6">Servicios</Link>
                        <Link href="/profile" className="text-white font-medium hover:underline-offset-0 ml-6">Publicar trabajo</Link>
                        <Link href="/ayuda" className="text-white font-medium hover:underline-offset-0 ml-6">Ayuda</Link>
                        <UserDropdown user={user} logout={logout} />
                    </div>
                    {/* Botón Hamburguesa */}
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
                    <Link href="/servicios" className="block py-2 hover:underline">Servicios</Link>
                    <Link href="/buscar-trabajadores" className="block py-2 hover:underline">Buscar Trabajadores</Link>
                    <Link href="/ayuda" className="block py-2 hover:underline">Ayuda</Link>
                </div>
                <hr className="mb-6 border-gray-200 sm:mx-auto" />
                <MobileUserSection user={user} logout={logout} setIsOpen={setIsOpen} />
            </div>
        </>
    );
}
'use client';
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* NAVBAR principal */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-blue-500/30 backdrop-blur-md text-white">
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
                        <a href="/trabajos" className="text-gray-900 font-medium hover:underline-offset-0">Trabajos</a>
                        <a href="/buscar" className="text-gray-900 font-medium hover:underline-offset-0 ml-6">Buscar Trabajadores</a>
                        <a href="/dashboard" className="text-gray-900 font-medium hover:underline-offset-0 ml-6">Ayuda</a>
                        <a
                            href="/auth"
                            className="ml-6 bg-sky-800 hover:bg-sky-950 text-white px-4 py-2 rounded transition"
                        >
                            Iniciar Sesión
                        </a>
                    </div>

                    {/* Botón Hamburguesa */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 text-2xl focus:outline-none"
                        >
                            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menú Mobile (fuera del <nav>) */}
            <div
                className={`md:hidden overflow-hidden fixed top-20 left-0 w-full z-40 transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                    } bg-white text-gray-900 px-8 pb-4 shadow-md`}
            >
                <div className="mt-4">
                    <a href="/trabajos" className="block py-2 hover:underline">Trabajos</a>
                    <a href="/buscar" className="block py-2 hover:underline">Buscar Trabajadores</a>
                    <a href="/ayuda" className="block py-2 hover:underline">Ayuda</a>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto" />

                <a
                    href="/login"
                    className="inline-block bg-sky-800 hover:bg-sky-950 text-white px-4 py-2 rounded transition"
                >
                    Iniciar Sesión
                </a>
            </div>
        </>
    );
}

"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PerfilCard from "../../perfil-cards/PerfilCards";
import { perfilesPremium } from "../../../data/perfilesPremium";

function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        handleResize(); // seteamos el ancho apenas se monta el componente
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
}

export default function PerfilesDestacados() {
    const width = useWindowWidth();
    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Esto nos indica que ya estamos en cliente y el componente se montó
    useEffect(() => {
        setMounted(true);
    }, []);

    // Cantidad de perfiles a mostrar según ancho, solo si ya montó
    let cantidadPerfiles = 1;
    if (mounted) {
        if (width >= 1024) cantidadPerfiles = 3; // lg
        else if (width >= 640) cantidadPerfiles = 2; // sm
    }

    const obtenerPerfilesVisibles = () => {
        const visibles = [];
        for (let i = 0; i < cantidadPerfiles; i++) {
            visibles.push(perfilesPremium[(index + i) % perfilesPremium.length]);
        }
        return visibles;
    };

    const siguiente = () => {
        setIndex((prev) => (prev + cantidadPerfiles) % perfilesPremium.length);
    };

    const anterior = () => {
        setIndex((prev) =>
            prev - cantidadPerfiles < 0
                ? perfilesPremium.length - cantidadPerfiles
                : prev - cantidadPerfiles
        );
    };

    // Si no está montado, renderizamos solo un placeholder o un solo perfil para evitar mismatch
    if (!mounted) {
        return (
            <section className="bg-gray-100 py-8 my-8">
                <div className="px-16 sm:px-8 max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfiles destacados</h2>
                    <div className="relative flex items-center justify-center">
                        <PerfilCard perfil={perfilesPremium[0]} />
                    </div>
                </div>
            </section>
        );
    }

    // Si está montado, renderizamos normalmente con el número correcto de perfiles
    const perfilesVisibles = obtenerPerfilesVisibles();

    return (
        <section className="bg-gray-100 py-8 my-8">
            <div className="px-16 sm:px-8 max-w-7xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfiles destacados</h2>

                <div className="relative flex items-center justify-center">
                    <button
                        onClick={anterior}
                        className="absolute cursor-pointer left-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    </button>

                    <div className="flex mx-8 space-x-6">
                        {perfilesVisibles.map((perfil) => (
                            <PerfilCard key={perfil.id} perfil={perfil} />
                        ))}
                    </div>

                    <button
                        onClick={siguiente}
                        className="absolute cursor-pointer right-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faChevronRight} size="lg" />
                    </button>
                </div>
            </div>
        </section>
    );
}
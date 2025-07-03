"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PerfilCard from "../../perfil-cards/PerfilCards";
import { User } from "lucide-react";

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

type UsuarioPremium = {
  id: string;
  nombre: string;
  profesion: string;
  ubicacion: string;
  imagen: string;     
  descripcion: string; 
};


export default function PerfilesDestacados() {
  const width = useWindowWidth();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [perfiles, setPerfiles] = useState<UsuarioPremium[]>([]);

  useEffect(() => {
    setMounted(true);
    const fetchPerfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<UsuarioPremium[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/premium`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPerfiles(res.data);
      } catch (err) {
        console.error("Error al cargar perfiles premium", err);
      }
    };
    fetchPerfiles();
  }, []);

  let cantidadPerfiles = 1;
  if (mounted) {
    if (width >= 1024) cantidadPerfiles = 3;
    else if (width >= 640) cantidadPerfiles = 2;
  }

  const obtenerPerfilesVisibles = () => {
    const visibles = [];
    for (let i = 0; i < cantidadPerfiles; i++) {
      const posicion = (index + i) % perfiles.length;
      visibles.push(perfiles[posicion]);
    }
    return visibles;
  };

  const siguiente = () => {
    setIndex((prev) => (prev + cantidadPerfiles) % perfiles.length);
  };

  const anterior = () => {
    setIndex((prev) =>
      prev - cantidadPerfiles < 0
        ? perfiles.length - cantidadPerfiles
        : prev - cantidadPerfiles
    );
  };

  if (!mounted || perfiles.length === 0) {
    return (
      <section className="bg-gray-100 py-8 my-8">
        <div className="px-16 sm:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfiles destacados</h2>
          <div className="relative flex items-center justify-center">
            <div className="animate-pulse w-[280px] h-[220px] bg-gray-200 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  const perfilesVisibles = obtenerPerfilesVisibles();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden py-8 my-8">
      <div className="px-16 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm mb-8 shadow-lg">
          <User />
          LOS MEJORES PROFESIONALES
        </div>
        <h3 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Perfiles destacados
        </h3>
        <div className="relative flex items-center justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-7"></div>
        </div>
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

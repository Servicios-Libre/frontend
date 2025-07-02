"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import JobCard from "../../components/landing/JobCard";
import StoryCard from "../../components/landing/StoryCard";
import ReviewCard from "../../components/landing/ReviewCard";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Job } from "@/types";

/* Temporal Data */
const historias = [
  {
    imageSrc: "/img/amadecasa.jpg",
    alt: "Paola, trabajadora de limpieza",
    text: "Paola encontró en Servicio Libre la plataforma ideal para conectar con nuevos clientes. Sus ingresos se estabilizaron y su negocio creció de forma inesperada.",
  },
  {
    imageSrc: "/img/plomero.jpg",
    alt: "Gonzalo, usuario satisfecho",
    text: "Gonzalo necesitaba un plomero urgente para una fuga. En minutos, la aplicación le conectó con un profesional verificado y el problema se solucionó el mismo día.",
  },
];

const opiniones = [
  {
    name: "Lucía Gómez",
    rating: 5,
    comment:
      "Conseguí trabajo en mi barrio en menos de 24 horas. ¡Servicio Libre es una excelente herramienta para trabajadores independientes!",
  },
  {
    name: "Carlos Méndez",
    rating: 4,
    comment:
      "Fácil de usar y encontré a alguien muy confiable para arreglar mi baño. Las reseñas me dieron mucha seguridad.",
  },
  {
    name: "Sofía Ramírez",
    rating: 5,
    comment:
      "Gracias a esta plataforma, ahora tengo más clientes y mi agenda está siempre llena. Ha cambiado mi forma de trabajar.",
  },
  {
    name: "Roberto Días",
    rating: 5,
    comment:
      "¡Increíble la rapidez para encontrar profesionales! Mi lavarropas volvió a la vida gracias a un técnico de Servicio Libre.",
  },
  {
    name: "Ana Laura Perez",
    rating: 4,
    comment:
      "Al principio dudé, pero el proceso de contacto fue muy sencillo y la calidad del servicio superó mis expectativas.",
  },
];

export default function LandingPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    document.title = "Servicio Libre - inicio";

    const fetchJobs = async () => {
      try {
        const res = await axios.get<Job[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/services/premium`
        );
        setJobs(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error al cargar trabajos destacados:", err);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    document.title = "Servicio Libre - inicio";
  }, []);

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 md:py-24 lg:py-28">
        <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3">
              Encontrá profesionales <br className="hidden md:inline" /> de
              confianza cerca tuyo.
            </h1>
            <p className="text-base md:text-lg mb-6 opacity-90">
              Conectamos personas que buscan servicios con trabajadores
              verificados en tu zona.
            </p>
            <button
              onClick={() => router.push("/servicios")}
              className="px-7 py-3 bg-white text-blue-700 rounded-full font-bold text-base shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Buscar ahora
            </button>
          </div>

          <div className="flex-1 mt-8 lg:mt-0">
            <Image
              src="/img/hero-illustration.png"
              alt="Ilustración de búsqueda de trabajos"
              width={550}
              height={550}
              className="w-full max-w-md ml-auto rounded-xl shadow-2xl"
              quality={90}
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION: Trabajos más buscados */}
      <section className="py-16 bg-white">
        {" "}
        {/* Reducido py */}
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {" "}
            {/* Reducido texto y mb */}
            Servicios Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {" "}
            {/* Reducido gap */}
            {loadingJobs ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-64"
                />
              ))
            ) : jobs.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No hay trabajos destacados disponibles.
              </p>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  image={
                    job.work_photos?.[0]?.photo_url ?? "/img/default-job.jpg"
                  }
                  title={job.title}
                  description={job.description}
                  workerId={job.worker.id}
                  serviceId={job.id}
                />
              ))
            )}
          </div>
          <div className="text-center mt-10">
            {" "}
            {/* Reducido mt */}
            <button
              onClick={() => router.push("/servicios")}
              className="px-7 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-md"
            >
              Ver todos los servicios
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: ¿Por qué elegir Servicio Libre? - Beneficios */}
      <section className="py-16 bg-gray-100">
        {" "}
        {/* Reducido py */}
        <div className="max-w-7xl mx-auto px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
          {" "}
          {/* Reducido gap */}
          <div className="flex-1 mt-8 lg:mt-0">
            {" "}
            {/* Reducido mt */}
            <Image
              src="/img/serviciolibre-landing.png"
              alt="Logo Servicio Libre"
              width={600} // Ligeramente más pequeño
              height={600} // Ligeramente más pequeño
              className="w-full max-w-xs mx-auto rounded-lg shadow-xl" // max-w-xs
              quality={90}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
              {" "}
              {/* Reducido texto y mb */}
              ¿Por qué elegir <br className="hidden md:inline" />{" "}
              <span className="text-blue-600">Servicio Libre</span>?
            </h2>
            <ul className="space-y-3 text-gray-700 text-base md:text-lg">
              {" "}
              {/* Reducido text-base/lg */}
              <li className="flex items-start gap-2">
                {" "}
                {/* Reducido gap */}
                <span className="text-blue-500 text-xl">✔</span>{" "}
                {/* Reducido text-xl */}
                <span>
                  Trabajadores verificados: Contratá con confianza a
                  profesionales con perfiles validados y reseñas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                {" "}
                {/* Reducido gap */}
                <span className="text-blue-500 text-xl">⚡</span>{" "}
                {/* Reducido text-xl */}
                <span>
                  Conexión rápida y segura: Encontrá el servicio que necesitás
                  en cuestión de minutos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                {" "}
                {/* Reducido gap */}
                <span className="text-blue-500 text-xl">💰</span>{" "}
                {/* Reducido text-xl */}
                <span>
                  Sin costos ocultos: Gratis para usuarios, sin comisiones ni
                  sorpresas.
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              {" "}
              {/* Reducido mt y gap */}
              <button
                onClick={() => router.push("/auth")}
                className="px-7 py-3 bg-blue-600 text-white rounded-full font-bold shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Registrate Gratis
              </button>
              <button
                onClick={() => router.push("/ayuda")}
                className="px-7 py-3 border-2 border-gray-400 text-gray-700 rounded-full font-bold hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Cómo funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Historias reales */}
      <section className="py-16 bg-white">
        {" "}
        {/* Reducido py */}
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {" "}
            {/* Reducido texto y mb */}
            Historias que inspiran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            {/* Reducido gap */}
            {historias.map((historia, index) => (
              <StoryCard key={index} {...historia} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Opiniones de nuestros usuarios */}
      <section className="py-16 bg-gray-100">
        {" "}
        {/* Reducido py */}
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {" "}
            {/* Reducido texto y mb */}
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {/* Reducido gap */}
            {opiniones.map((opinion, index) => (
              <ReviewCard key={index} {...opinion} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Call to action final */}
      <section className="bg-blue-700 text-white text-center py-16 px-8">
        {" "}
        {/* Reducido py */}
        <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold mb-5 leading-tight">
          {" "}
          {/* Reducido texto y mb */}
          ¿Listo para simplificar tu vida?
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto opacity-90">
          {" "}
          {/* Reducido text-base/lg y mb */}
          Unite a la comunidad de Servicio Libre y encontrá la solución perfecta
          para tus necesidades o nuevos clientes para tus habilidades.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/servicios")}
            className="px-7 py-3 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Encontrar trabajadores
          </button>
          <button
            onClick={() => router.push("/registro-trabajador")}
            className="px-7 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Ofrecer mis servicios
          </button>
        </div>
      </section>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import BannerServicios from "@/components/banner-servicios/BannerServicios";
import SearchAndFilter from "@/components/servicios/search-filter/SearchAndFilter";
import ServicesGrid from "@/components/servicios/services-grid/ServicesGrid";
import Pagination from "@/components/ui/pagination-services/PaginationServices";
import NoResults from "@/components/ui/no-results/NoResults";
import InformacionServicios from "@/components/ui/sections/informacio-servicios/InformacioServicios";
import PerfilesDestacados from "@/components/servicios/perfiles-destacados/PerfilesDestacados";
import { Servicio, ServicioGrid } from "@/types";
import { obtenerServicios } from "@/services/serviciosService";
import ServiciosSkeleton from "@/components/ui/serviciosSkeleton/ServiciosSkeleton";
import PremiumSection from "@/components/servicios/premium-section/PremiumSection";
import { useAuth } from "@/context/AuthContext";
import BeWorker from "@/components/servicios/be-worker/BeWorker";

export default function ServiciosPage() {

    const getServiciosPorPagina = () =>
        typeof window !== "undefined" && window.innerWidth >= 640 ? 8 : 4;

    const [paginaActual, setPaginaActual] = useState(1);
    const [serviciosPorPagina, setServiciosPorPagina] = useState(getServiciosPorPagina);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [enfocado, setEnfocado] = useState(false);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [servicios, setServicios] = useState<ServicioGrid[]>([]);
    const [totalServicios, setTotalServicios] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth()


    // Efecto para actualizar la cantidad al redimensionar la ventana
    useEffect(() => {
        document.title = "Servicio Libre - Servicios"
        const actualizarCantidad = () => {
            setServiciosPorPagina(window.innerWidth >= 640 ? 8 : 4);
        };

        window.addEventListener("resize", actualizarCantidad);
        // Llamar una vez al montar para asegurar el valor correcto
        actualizarCantidad();

        return () => {
            window.removeEventListener("resize", actualizarCantidad);
        } 
    }, []);

    useEffect(() => {
        const fetchServicios = async () => {
            setLoading(true);
            try {
                const data = await obtenerServicios(
                    busqueda,
                    categoriasSeleccionadas,
                    paginaActual,
                    serviciosPorPagina
                );
                // Mapear Servicio[] a ServicioGrid[]
                const serviciosGrid: ServicioGrid[] = data.servicios.map((servicio: Servicio) => ({
                    id: servicio.id,
                    title: servicio.title,
                    worker: {
                        id: servicio.worker.id,
                        name: servicio.worker.name
                    }, // <-- Asegura string
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    work_photos: (servicio.work_photos as any[]).map((foto: any) => ({
                        photo_url: foto.photo_url
                    }))
                }));
                setServicios(serviciosGrid);
                setTotalServicios(data.total);
            } catch (error) {
                console.error("Error al obtener servicios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicios();
    }, [busqueda, categoriasSeleccionadas, paginaActual, serviciosPorPagina]);

    const totalPaginas = Math.ceil(totalServicios / serviciosPorPagina);
    // servicios ya es ServicioGrid[], así que serviciosVisibles también lo es:
    const serviciosVisibles: ServicioGrid[] = servicios;

    useEffect(() => {
        if (paginaActual > totalPaginas) {
            setPaginaActual(1);
        }
    }, [totalPaginas, paginaActual]);

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoriasSeleccionadas]);

    return (
      <div className="bg-white">
        <BannerServicios />

        <div className="p-8 max-w-7xl mx-auto">
          <h1 className="text-2xl text-gray-800 font-bold mb-4">
            Explorá los rubros disponibles
          </h1>

          <SearchAndFilter
            mostrarFiltro={mostrarFiltro}
            setMostrarFiltro={setMostrarFiltro}
            enfocado={enfocado}
            setEnfocado={setEnfocado}
            categoriasSeleccionadas={categoriasSeleccionadas}
            setCategoriasSeleccionadas={setCategoriasSeleccionadas}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          {loading && <ServiciosSkeleton cantidad={serviciosPorPagina} />}

          {!loading && serviciosVisibles.length > 0 && (
            <>
              <ServicesGrid servicios={serviciosVisibles} />
              {totalPaginas > 1 && (
                <Pagination
                  totalPages={totalPaginas}
                  currentPage={paginaActual}
                  setPage={setPaginaActual}
                />
              )}
            </>
          )}

          {!loading &&
            servicios.length === 0 &&
            serviciosVisibles.length === 0 && (
              <NoResults mensaje="No hay servicios que coincidan con los filtros seleccionados." />
            )}
        </div>

        <PerfilesDestacados />

        {user?.role !== "worker" ? <BeWorker /> : <PremiumSection />}

        <InformacionServicios />
      </div>
    );
}
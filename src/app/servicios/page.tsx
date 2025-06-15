"use client";
import { useEffect, useState } from "react";
import BannerServicios from "@/components/banner-servicios/BannerServicios";
import SearchAndFilter from "@/components/servicios/search-filter/SearchAndFilter";
import ServicesGrid from "@/components/servicios/services-grid/ServicesGrid";
import Pagination from "@/components/ui/pagination-services/PaginationServices";
import NoResults from "@/components/ui/no-results/NoResults";
import InformacionServicios from "@/components/ui/sections/informacio-servicios/InformacioServicios";
import PerfilesDestacados from "@/components/servicios/perfiles-destacados/PerfilesDestacados";
import { Servicio } from "@/types";
import { obtenerServicios } from "@/services/serviciosService";
import ServiciosSkeleton from "@/components/ui/serviciosSkeleton/ServiciosSkeleton";

export default function ServiciosPage() {
    const [paginaActual, setPaginaActual] = useState(1);
    const [serviciosPorPagina, setServiciosPorPagina] = useState(4);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [enfocado, setEnfocado] = useState(false);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [totalServicios, setTotalServicios] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const actualizarCantidad = () => {
            const ancho = window.innerWidth;
            setServiciosPorPagina(ancho >= 640 ? 8 : 4);
        };

        actualizarCantidad();
        window.addEventListener("resize", actualizarCantidad);
        return () => window.removeEventListener("resize", actualizarCantidad);
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
                setServicios(data.servicios);
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

    const serviciosVisibles = servicios;

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
                <h1 className="text-2xl text-gray-800 font-bold mb-4">Explorá los rubros disponibles</h1>

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

                {loading && (
                    <ServiciosSkeleton cantidad={serviciosPorPagina} />
                )}

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

                {!loading && servicios.length > 0 && serviciosVisibles.length === 0 && (
                    <NoResults mensaje="No hay servicios que coincidan con los filtros seleccionados." />
                )}

            </div>

            <PerfilesDestacados />

            <InformacionServicios />
        </div>
    );
}
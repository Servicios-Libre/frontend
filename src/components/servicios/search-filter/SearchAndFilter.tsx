import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import CategoryFilter from "@/components/categoryFilter/CategoryFilter";

export default function SearchAndFilter({
    mostrarFiltro,
    setMostrarFiltro,
    enfocado,
    setEnfocado,
    categoriasSeleccionadas,
    setCategoriasSeleccionadas,
    busqueda,
    setBusqueda,
}: {
    mostrarFiltro: boolean;
    setMostrarFiltro: (v: boolean) => void;
    enfocado: boolean;
    setEnfocado: (v: boolean) => void;
    categoriasSeleccionadas: number[];
    setCategoriasSeleccionadas: (ids: number[]) => void;
    busqueda: string;
    setBusqueda: (text: string) => void;
}) {
    return (
        <>
            <div className="flex space-x-4 items-center mb-4">
                <div className="relative w-64">
                    <span
                        className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors duration-300 ${enfocado ? "text-blue-500" : "text-white opacity-80"
                            }`}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar trabajos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onFocus={() => setEnfocado(true)}
                        onBlur={() => setEnfocado(false)}
                        className="pl-10 pr-3 py-2 w-full rounded-md bg-blue-500 text-white placeholder-white placeholder-opacity-75
      focus:bg-white focus:text-blue-600 focus:border focus:border-blue-500 focus:outline-none
      transition-colors duration-300"
                    />

                </div>

                <button
                    onClick={() => setMostrarFiltro(!mostrarFiltro)}
                    className={`px-3 py-2 rounded-md text-white text-md transition-colors duration-300 cursor-pointer ${mostrarFiltro ? "bg-blue-500" : "bg-blue-900 hover:bg-blue-800"
                        }`}
                >
                    <FontAwesomeIcon icon={faSliders} />
                </button>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out
        ${mostrarFiltro ? "opacity-100 translate-y-0 max-h-screen" : "opacity-0 -translate-y-4 max-h-0 overflow-hidden"}
        `}
            >
                <CategoryFilter
                    selectedCategories={categoriasSeleccionadas}
                    onFilterChange={(ids) => setCategoriasSeleccionadas(ids)}
                />
            </div>
        </>
    );
}

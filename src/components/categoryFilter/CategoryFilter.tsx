"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTractor,
    faLaptopCode,
    faUserNurse,
    faDumbbell,
    faBullhorn,
    faFaceSmile,
    faHandshake,
    faScrewdriverWrench,
    faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

import { Categoria } from "@/types";
import { obtenerCategorias } from "@/services/categoriasService";

const icons = {
    tractor: faTractor,
    "laptop-code": faLaptopCode,
    "user-nurse": faUserNurse,
    dumbbell: faDumbbell,
    bullhorn: faBullhorn,
    handshake: faHandshake,
    "screwdriver-wrench": faScrewdriverWrench,
    "chalkboard-teacher": faChalkboardTeacher,
    "face-smile": faFaceSmile,
} satisfies Record<string, typeof faFaceSmile>;

type Props = {
    selectedCategories: number[];
    onFilterChange: (ids: number[]) => void;
};

export default function CategoryFilter({ selectedCategories, onFilterChange }: Props) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await obtenerCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    const toggleCategory = (id: number) => {
        const updated = selectedCategories.includes(id)
            ? selectedCategories.filter((catId) => catId !== id)
            : [...selectedCategories, id];

        onFilterChange(updated);
    };

    const limpiarFiltro = () => {
        onFilterChange([]);
    };

    return (
        <div className="space-y-4">
            {categorias.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                    No hay categorías disponibles por el momento.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-700">
                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`flex items-center space-x-2 p-2 border rounded-md transition cursor-pointer ${selectedCategories.includes(cat.id)
                                        ? "bg-blue-100 border-blue-500"
                                        : "hover:bg-gray-100 border-gray-200"
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={icons[cat.icon] || faFaceSmile}
                                    className="text-blue-600 w-4"
                                />
                                <span className="text-sm font-medium">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {selectedCategories.length > 0 && (
                        <div className="text-right">
                            <button
                                onClick={limpiarFiltro}
                                className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                                aria-label="Limpiar filtros"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

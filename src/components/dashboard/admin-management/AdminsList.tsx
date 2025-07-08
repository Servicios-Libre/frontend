import ConfirmModal from "@/components/dashboard/admin-management/AdminRemoveModal";
import { useState } from "react";
import { User } from "@/types";
import Image from "next/image";
import { FaUserShield } from "react-icons/fa";
import Pagination from "@/components/ui/Pagination"; // Ajusta path si es necesario
import { SkeletonCard } from "@/components/ui/skeleton/SkeletonCard";

type Props = {
    admins: User[];
    onRevokeAdmin: (user: User) => void;
    loading?: boolean;
};

const ITEMS_PER_PAGE = 5;

export default function AdminsList({ admins, onRevokeAdmin, loading }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = admins.filter((admin) =>
        admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    // Corta sólo los admins visibles en la página actual
    const visibleAdmins = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    function openModal(admin: User) {
        setSelectedAdmin(admin);
        setModalOpen(true);
    }

    function onPageChange(page: number) {
        setCurrentPage(page);
    }

    return (
        <>
            <section className="mb-8 rounded-xl bg-indigo-800 p-5 shadow-xl border border-indigo-700 md:p-6 lg:p-8">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-white md:text-2xl">
                    <FaUserShield className="text-emerald-400 text-2xl md:text-3xl" /> Usuarios Admin actuales
                </h2>

                <div className="mb-6">
                    <input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear a página 1 al buscar
                        }}
                        placeholder="Buscar por nombre o email..."
                        className="w-full p-2.5 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                    />
                </div>

                {loading ? (
                    <ul className="grid grid-cols-1 gap-3">
                        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </ul>
                ) : visibleAdmins.length === 0 ? (
                    <p className="text-center text-white/80 py-4">No se encontraron administradores.</p>
                ) : (
                    <ul className="grid grid-cols-1 gap-3">
                        {visibleAdmins.map((admin) => (
                            <li
                                key={admin.id}
                                className="p-3 bg-indigo-700 rounded-lg flex flex-col sm:flex-row justify-between items-center shadow-md gap-3 sm:gap-4 text-white"
                            >
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-500 flex-shrink-0">
                                        <Image
                                            src={admin.user_pic || "/img/avatar.jpg"}
                                            alt={admin.name || "Usuario"}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold truncate">{admin.name}</p>
                                        <p className="text-sm text-indigo-200 truncate">{admin.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openModal(admin)}
                                    className="w-full sm:w-auto text-sm px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-indigo-700"
                                >
                                    Dar de baja
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Paginación */}
                {totalPages > 1 && ( // Mostrar paginación solo si hay más de una página
                    <div className="mt-6">
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                        />
                    </div>
                )}
            </section>

            {/* Modal de confirmación */}
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    if (selectedAdmin) onRevokeAdmin(selectedAdmin);
                }}
                title="Confirmar baja"
                description={`¿Estás seguro que deseas revocar permisos de administrador a ${selectedAdmin?.name}?`}
                confirmText="Sí, revocar"
            />
        </>
    );
}
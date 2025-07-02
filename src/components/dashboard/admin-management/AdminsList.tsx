import ConfirmModal from "@/components/dashboard/admin-management/AdminRemoveModal";
import { useState } from "react";
import { User } from "@/types";
import Image from "next/image";
import { FaUserShield } from "react-icons/fa";
import Pagination from "@/components/dashboard/Pagination"; // Ajusta path si es necesario
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
            <section className="rounded-lg bg-indigo-800 p-6 shadow-lg border border-indigo-700">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FaUserShield className="text-emerald-400" /> Usuarios Admin actuales
                </h2>

                <div className="mb-4">
                    <input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear a página 1 al buscar
                        }}
                        placeholder="Buscar por nombre o email..."
                        className="w-full p-2 rounded bg-white text-gray-800"
                    />
                </div>

                {loading ? (
                    <ul className="space-y-3">
                        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </ul>
                ) : visibleAdmins.length === 0 ? (
                    <p>No se encontraron administradores.</p>
                ) : (
                    <ul className="space-y-3 max-h-80 overflow-auto">
                        {visibleAdmins.map((admin) => (
                            <li
                                key={admin.id}
                                className="p-3 bg-indigo-700 rounded flex justify-between items-center shadow-sm gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-500 flex-shrink-0">
                                        <Image
                                            src={admin.user_pic || "/img/avatar.jpg"}
                                            alt={admin.name}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-semibold">{admin.name}</p>
                                        <p className="text-sm text-indigo-200">{admin.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openModal(admin)}
                                    className="text-sm px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-semibold"
                                >
                                    Dar de baja
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Paginación */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    maxButtons={7}
                />
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

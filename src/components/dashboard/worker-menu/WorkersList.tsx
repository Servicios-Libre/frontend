"use client";

import { useState } from "react";
import { User } from "@/types";
import Link from "next/link";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import ConfirmModal from "@/components/dashboard/admin-management/AdminRemoveModal";

type WorkersListProps = {
    workers: User[];
    loading: boolean;
    loadingId?: string;
    onDowngrade: (worker: User) => void;
    isFiltered?: boolean;
};

export function WorkersList({
    workers,
    loading,
    onDowngrade,
    isFiltered = false,
}: WorkersListProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<User | null>(null);
    const [localLoadingId, setLocalLoadingId] = useState<string | null>(null);

    const handleConfirmDowngrade = () => {
        if (!selectedWorker) return;
        setLocalLoadingId(selectedWorker.id);
        onDowngrade(selectedWorker);
        setSelectedWorker(null); // limpia el modal
    };

    if (loading) {
        return (
            <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-indigo-800 animate-pulse rounded-xl p-4 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
                    >
                        <div className="space-y-2 w-full max-w-xs">
                            <div className="h-4 bg-indigo-500 rounded w-3/4" />
                            <div className="h-3 bg-indigo-400 rounded w-2/3" />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="h-8 bg-indigo-600 rounded w-24" />
                            <div className="h-8 bg-indigo-600 rounded w-24" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!workers.length && isFiltered) {
        return (
            <EmptyState
                message="No se encontraron trabajadores que coincidan con tu búsqueda."
                bgColor="bg-indigo-50/10"
                textColor="text-indigo-600"
                borderColor="border-indigo-200"
                icon="folder"
            />
        );
    }

    if (!workers.length) {
        return (
            <EmptyState
                message="No hay trabajadores activos."
                bgColor="bg-indigo-50/10"
                textColor="text-indigo-600"
                borderColor="border-indigo-200"
                icon="user"
            />
        );
    }

    return (
        <>
            <div className="grid gap-4">
                {workers.map((worker) => (
                    <div
                        key={worker.id}
                        className="bg-indigo-800 rounded-xl p-4 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center hover:bg-indigo-700 transition"
                    >
                        <div className="break-words max-w-full">
                            <p className="text-lg font-semibold">{worker.name}</p>
                            <p className="text-sm text-indigo-200">{worker.email}</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <button
                                onClick={() => {
                                    setSelectedWorker(worker);
                                    setModalOpen(true);
                                }}
                                disabled={localLoadingId === worker.id}
                                className={`w-full md:w-auto ${localLoadingId === worker.id ? "opacity-60 cursor-wait" : ""
                                    } bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg text-sm`}
                            >
                                {localLoadingId === worker.id ? "Procesando..." : "Dar de baja"}
                            </button>
                            <Link href={`/worker-profile/${worker.id}`} className="w-full md:w-auto">
                                <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                                    Ver perfil
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmación para dar de baja */}
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedWorker(null);
                }}
                onConfirm={handleConfirmDowngrade}
                title="¿Dar de baja al trabajador?"
                description={`¿Estás seguro de que querés dar de baja a ${selectedWorker?.name}? Esta acción es reversible.`}
                confirmText="Sí, dar de baja"
                cancelText="Cancelar"
            />
        </>
    );
}

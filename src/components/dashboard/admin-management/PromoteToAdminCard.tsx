// components/dashboard/admin-management/PromoteToAdminCard.tsx
"use client";

import { useState } from "react";
import { User } from "@/types";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { searchUserByEmail, updateUserRole } from "@/services/dashboard/adminService";
import { useToast } from "@/context/ToastContext";

type Props = {
    onPromoted: () => void;
};

export default function PromoteToAdminCard({ onPromoted }: Props) {
    const [searchEmail, setSearchEmail] = useState("");
    const [foundUser, setFoundUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    const { showToast } = useToast();

    const handleSearch = async () => {
        setError("");
        setFoundUser(null);
        if (!searchEmail) return;

        setLoading(true);
        try {
            const user = await searchUserByEmail(searchEmail);
            if (!user) {
                setError("Usuario no encontrado");
            } else {
                setFoundUser(user);
            }
        } catch {
            setError("Error al buscar usuario");
        }
        setLoading(false);
    };

    const handlePromote = async () => {
        if (!foundUser) return;
        setActionLoading(true);
        try {
            await updateUserRole(foundUser.id, "admin");
            setSearchEmail("");
            setFoundUser(null);
            showToast("Usuario promovido a admin", "success");
            onPromoted();
        } catch {
            showToast("Error al promover usuario", "error");
        }
        setActionLoading(false);
    };

    return (
        <section className="mb-8 rounded-xl bg-indigo-800 p-5 shadow-xl border border-indigo-700 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3 items-stretch">
                <div className="flex-1">
                    <SearchInput
                        searchTerm={searchEmail}
                        setSearchTerm={setSearchEmail}
                        placeholder="Buscar por email..."
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-800"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {error && (
                <div className="mt-4 w-full bg-red-500/90 border border-red-700 rounded-lg px-4 py-3 flex items-start gap-3 shadow-md backdrop-blur-sm">
                    <svg
                        className="w-5 h-5 mt-1 flex-shrink-0 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5z"
                        />
                    </svg>
                    <p className="text-sm leading-relaxed text-white">{error}</p>
                </div>
            )}

            {foundUser && (
                <div className="mt-6 p-4 bg-indigo-700 rounded-lg flex flex-col items-start gap-4 shadow-inner sm:flex-row sm:justify-between sm:items-center sm:p-5 sm:gap-6">
                    <div className="text-white text-sm sm:text-base">
                        <p className="mb-1 sm:mb-0"><strong>Nombre:</strong> {foundUser.name}</p>
                        <p className="mb-1 sm:mb-0"><strong>Email:</strong> {foundUser.email}</p>
                        <p><strong>Rol:</strong> {foundUser.role}</p>
                    </div>
                    {foundUser.role !== "admin" && (
                        <button
                            onClick={handlePromote}
                            disabled={actionLoading}
                            className="w-full bg-green-600 hover:bg-green-500 px-5 py-2.5 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-indigo-700 sm:w-auto"
                        >
                            {actionLoading ? "Procesando..." : "Dar de alta como admin"}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
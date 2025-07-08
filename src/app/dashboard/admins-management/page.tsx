"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { searchUserByEmail, fetchAdmins, promoteToAdmin, downgradeAdmin } from "@/services/dashboard/adminService";
import { User } from "@/types";

import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import { FaClipboardList } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";
import { SearchInput } from "@/components/dashboard/SearchInput";
import AdminsList from "@/components/dashboard/admin-management/AdminsList";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";

const GOD_EMAIL = "nachomartinezdap@gmail.com";

export default function AdminUsersPage() {
    const { user: authUser } = useAuth();
    const isGod = authUser?.email === GOD_EMAIL;

    const [searchEmail, setSearchEmail] = useState("");
    const [foundUser, setFoundUser] = useState<User | null>(null);
    const [admins, setAdmins] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    const [error, setError] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingAdmins, setLoadingAdmins] = useState(false);

    const { showToast } = useToast();

    async function loadAdmins() {
        setLoadingAdmins(true); // activar loading antes de empezar
        try {
            const adminsList = await fetchAdmins();

            const filteredAdmins = adminsList.filter(
                (admin: { email: string; }) => admin.email !== GOD_EMAIL
            );

            setAdmins(filteredAdmins);
        } catch {
            showToast("Error al cargar usuarios admin", "error");
        } finally {
            setLoadingAdmins(false); // desactivar loading al final, pase lo que pase
        }
    }

    useEffect(() => {
        if (isGod) loadAdmins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGod]);

    async function handleSearch() {
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
    }

    async function handleMakeAdmin(user: User) {
        if (!isGod) return;

        setLoadingAction(true);
        try {
            await promoteToAdmin(user.id);
            setFoundUser(null);
            setSearchEmail("");
            await loadAdmins();
            showToast("Usuario actualizado a admin con éxito", "success");
        } catch {
            setError("Error al actualizar rol");
            showToast("Error al actualizar rol", "error");
        }
        setLoadingAction(false);
    }

    async function handleRevokeAdmin(user: User) {
        if (!isGod) return;

        try {
            await downgradeAdmin(user.id);
            showToast("Administrador revocado con éxito", "success");
            await loadAdmins();
        } catch {
            showToast("Error al revocar admin", "error");
        }
    }

    if (loadingAdmins) {
        return <LoadingScreen />;
    }

    if (!isGod) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-indigo-950 px-4">
                <h2 className="text-xl font-semibold">No tienes permiso para acceder a esta página.</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-indigo-950 text-white">

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

            <main className="flex-1 p-6 md:p-10 flex justify-center">
                <div className="w-full max-w-screen-xl">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                        <FaClipboardList className="text-emerald-400" /> Dar de alta administradores.
                    </h2>

                    <section className="mb-12 rounded-lg bg-indigo-800 p-6 shadow-lg border border-indigo-700">
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
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
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition"
                            >
                                {loading ? "Buscando..." : "Buscar"}
                            </button>
                        </div>

                        {error && <p className="mt-3 text-red-500 font-medium">{error}</p>}

                        {foundUser && (
                            <div className="mt-6 p-5 bg-indigo-700 rounded flex flex-col sm:flex-row justify-between items-center gap-6 shadow-inner">
                                <div>
                                    <p><strong>Nombre:</strong> {foundUser.name}</p>
                                    <p><strong>Email:</strong> {foundUser.email}</p>
                                    <p><strong>Rol:</strong> {foundUser.role}</p>
                                </div>
                                {foundUser.role !== "admin" && (
                                    <button
                                        onClick={() => handleMakeAdmin(foundUser)}
                                        disabled={loadingAction}
                                        className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded text-white font-semibold transition"
                                    >
                                        {loadingAction ? "Procesando..." : "Dar de alta como admin"}
                                    </button>
                                )}
                            </div>
                        )}
                    </section>

                    <hr className="my-10 border-indigo-700" />

                    <AdminsList
                        admins={admins}
                        onRevokeAdmin={handleRevokeAdmin}
                        loading={loadingAdmins}
                    />
                </div>
            </main>
        </div>
    );
}

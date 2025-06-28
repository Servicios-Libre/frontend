import { User } from "@/types";
import Link from "next/link";

type WorkersListProps = {
    workers: User[];
    loading: boolean;
    loadingId?: string;
    onDowngrade: (worker: User) => void;
};

export function WorkersList({ workers, loading, loadingId, onDowngrade }: WorkersListProps) {
    if (loading) return <p>Cargando trabajadores...</p>;
    if (workers.length === 0) return <p className="text-indigo-300">No hay trabajadores activos.</p>;

    return (
        <div className="grid gap-4">
            {workers.map(worker => (
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
                            onClick={() => onDowngrade(worker)}
                            disabled={loadingId === worker.id}
                            className={`w-full md:w-auto ${loadingId === worker.id ? "opacity-60 cursor-wait" : ""} bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-4 rounded-lg text-sm`}
                        >
                            {loadingId === worker.id ? "Procesando..." : "Dar de baja"}
                        </button>
                        <Link href={`/worker-profile/${worker.id}`} className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-lg text-sm">
                                Ver perfil
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

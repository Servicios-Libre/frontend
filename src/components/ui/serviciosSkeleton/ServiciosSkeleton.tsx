export default function ServiciosSkeleton({ cantidad = 8 }: { cantidad?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {Array.from({ length: cantidad }).map((_, idx) => (
                <div
                    key={idx}
                    className="animate-pulse bg-gray-100 rounded-lg p-4 flex flex-col items-center shadow"
                >
                    <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                    <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}
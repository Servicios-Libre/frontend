export default function WorkerSkeletonList({ count = 3 }: { count?: number }) {
    return (
        <div className="grid gap-4">
            {Array.from({ length: count }).map((_, i) => (
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

export function SkeletonCard() {
    return (
        <li className="p-3 bg-indigo-700 rounded flex justify-between items-center shadow-sm gap-4 animate-pulse">
            <div className="flex items-center gap-4 w-full">
                <div className="h-10 w-10 rounded-full bg-indigo-600" />
                <div className="flex-1 space-y-1">
                    <div className="h-3 bg-indigo-600 rounded w-2/3" />
                    <div className="h-3 bg-indigo-600 rounded w-1/2" />
                </div>
            </div>
            <div className="h-8 w-20 bg-red-500 rounded" />
        </li>
    );
}

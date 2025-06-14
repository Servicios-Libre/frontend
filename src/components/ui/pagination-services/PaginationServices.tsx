export default function Pagination({
    totalPages,
    currentPage,
    setPage
}: {
    totalPages: number;
    currentPage: number;
    setPage: (n: number) => void;
}) {
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-md border cursor-pointer ${currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}

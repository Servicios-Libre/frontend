export default function ActiveServicesSkeleton({ cantidad = 5 }: { cantidad?: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: cantidad }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-purple-200/40 rounded-xl p-3 shadow flex justify-between items-center"
        >
          <div className="flex flex-col gap-2 w-full max-w-[80%]">
            <div className="h-4 w-3/4 bg-purple-300 rounded" />
            <div className="h-3 w-1/2 bg-purple-200 rounded hidden md:block" />
          </div>
          <div className="w-10 h-10 bg-purple-300 rounded" />
        </div>
      ))}
    </div>
  );
}

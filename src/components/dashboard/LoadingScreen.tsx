export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-amber-400 border-indigo-800"></div>
        <p className="text-lg font-semibold">Cargando panel de administración...</p>
      </div>
    </div>
  );
}

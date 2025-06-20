export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <div className="flex items-center justify-center mb-6">
        <span className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Cargando...</h2>
      <p className="text-blue-500">Por favor espera un momento</p>
    </div>
  );
}
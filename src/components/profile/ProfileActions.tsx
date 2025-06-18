import Link from "next/link";

export default function ProfileActions() {
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">¿Quieres ofrecer un servicio?</h3>
      <p className="mb-4 text-gray-600 text-center">
        Publica tu primer servicio y empieza a recibir solicitudes de clientes.
      </p>
      <Link href="/servicios/publicar">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
          Publicar servicio
        </button>
      </Link>
    </div>
  );
}
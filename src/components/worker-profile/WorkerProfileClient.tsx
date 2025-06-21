"use client";

import { useEffect, useState } from "react";
import { getWorkerById } from "@/services/worker-profile/workerServices";
import { User } from "@/types";
import Image from "next/image";

export default function WorkerProfileClient({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWorkerById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Error al cargar el perfil");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center py-10">Trabajador no encontrado.</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f4f8fb] to-[#e8ecf1] pt-32 pb-16 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center gap-4 max-w-xl w-full mb-10 border border-gray-100">
        <div className="relative w-36 h-36 mb-2">
          <Image
            src={user.user_pic || "/img/default-user.png"}
            alt={user.name}
            fill
            className="rounded-full object-cover border-4 border-blue-400 shadow-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">{user.name}</h2>
        <p className="text-base text-gray-700 font-medium">{user.email}</p>
        <div className="flex gap-6 justify-center mt-2">
          <span className="text-yellow-500 font-semibold flex items-center gap-1">
            <span className="text-lg">⭐</span> {user.rate ?? 0}
          </span>
          <span className={`font-semibold flex items-center gap-1 ${user.availability ? "text-green-600" : "text-gray-400"}`}>
            <span className="text-lg">●</span>
            {user.availability ? "Disponible" : "No disponible"}
          </span>
          {user.premium && <span className="text-blue-600 font-semibold">Premium</span>}
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1 justify-center">
          {user.address?.street}, {user.address?.city}, {user.address?.state}
        </div>
        <div className="text-gray-700 text-base">{user.phone}</div>
      </div>

      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Servicios publicados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {user.services && user.services.length > 0 ? (
            user.services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition border border-gray-100 flex flex-col">
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={service.work_photos[0]?.photo_url || "/img/placeholder.jpg"}
                    alt={service.title}
                    fill
                    className="rounded-md object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{service.description}</p>
                <div className="text-xs text-gray-500">{service.category.name}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Este trabajador aún no ha publicado servicios.</p>
          )}
        </div>
      </section>
    </main>
  );
}

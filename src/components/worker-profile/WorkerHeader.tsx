import Image from "next/image";
import { User } from "@/types";

export default function WorkerHeader({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center gap-4 max-w-xl w-full mb-10 border border-gray-100">
      <div className="relative w-36 h-36 mb-2">
        <Image
          src={user.user_pic || "/img/default-user.png"}
          alt={user.name}
          fill
          sizes="(max-width: 768px) 9rem, 14rem"
          className="rounded-full object-cover border-4 border-blue-400 shadow-lg"
        />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900">{user.name}</h2>
      <p className="text-base text-gray-700 font-medium">{user.email}</p>
      <div className="flex gap-6 justify-center mt-2">
        <span className="text-yellow-500 font-semibold flex items-center gap-1">
          <span className="text-lg">⭐</span> {user.rate ?? 0}
        </span>
        <span
          className={`font-semibold flex items-center gap-1 ${
            user.availability ? "text-green-600" : "text-gray-400"
          }`}
        >
          <span className="text-lg">●</span>
          {user.availability ? "Disponible" : "No disponible"}
        </span>
        {user.premium && (
          <span className="text-blue-600 font-semibold">Premium</span>
        )}
      </div>
      <div className="text-gray-600 text-sm">
        {user.address?.street}, {user.address?.city}, {user.address?.state}
      </div>
      <div className="text-gray-700 text-base">{user.phone}</div>
    </div>
  );
}

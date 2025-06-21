import { User } from "@/types";
import { MapPin, BadgeCheck, Wifi } from "lucide-react";
import Image from "next/image";

export default function WorkerProfileHeader({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center gap-3">
      <Image
        src={user.user_pic || "/img/default-user.png"}
        alt={user.name}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full object-cover border"
      />
      <h2 className="text-2xl font-bold">{user.name}</h2>

      <div className="text-gray-600 text-sm flex items-center gap-1">
        <MapPin size={16} />
        {user.address.city}, {user.address.state}
      </div>

      <div className="flex items-center gap-3 text-sm mt-2">
        {user.premium && (
          <span className="text-green-600 flex items-center gap-1">
            <BadgeCheck size={16} /> Premium
          </span>
        )}
        <span
          className={`flex items-center gap-1 ${
            user.availability ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <Wifi size={16} />
          {user.availability ? "Disponible" : "No disponible"}
        </span>
      </div>
    </div>
  );
}

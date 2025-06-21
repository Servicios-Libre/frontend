import Image from "next/image";
import { WorkerService } from "@/types";

export default function WorkerServiceCard({ service }: { service: WorkerService }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <Image
        src={service.work_photos[0]?.photo_url || "/img/placeholder.jpg"}
        alt={service.title}
        width={400}
        height={160}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
      <div className="text-xs text-gray-500">{service.category.name}</div>
    </div>
  );
}

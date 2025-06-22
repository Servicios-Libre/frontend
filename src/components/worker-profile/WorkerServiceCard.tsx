import { WorkerService } from "@/types";
import { Pencil } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

export default function WorkerServiceCard({
  service,
  onEdit,
}: {
  service: WorkerService;
  onEdit: (service: WorkerService) => void;
}) {
  const imagesToShow = service.work_photos.length > 0
    ? service.work_photos
    : [{ photo_url: "/img/default-service.jpg" }];

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative">
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <ImageCarousel images={imagesToShow} />
        <button
          onClick={() => onEdit(service)}
          className="absolute top-2 right-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition text-xs px-2 py-1 rounded-md shadow-sm flex items-center gap-1 z-20"
        >
          <Pencil className="w-3.5 h-3.5" />
          Editar
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{service.description}</p>
        <span className="text-xs text-blue-600 font-medium mt-auto">{service.category.name}</span>
      </div>
    </div>
  );
}

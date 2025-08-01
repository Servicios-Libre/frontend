import ServiceCard from "@/components/serviceCard/ServiceCard";
import { ServicioGrid } from "@/types";

interface ServicesGridProps {
  servicios: ServicioGrid[];
}

export default function ServicesGrid({ servicios }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {servicios.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          name={service.worker.name}
          workerId={service.worker.id}
          image={service.work_photos[0]?.photo_url}
        />
      ))}
    </div>
  );
}

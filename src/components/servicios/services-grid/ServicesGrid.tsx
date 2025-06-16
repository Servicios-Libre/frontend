import ServiceCard from "@/components/serviceCard/ServiceCard";
import { Service } from "@/types";

export default function ServicesGrid({ servicios }: { servicios: typeof import('@/data/services').services }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {servicios.map((service: Service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          user={service.worker.name}
          image={service.work_photos[0]?.photo_url}
        />
      ))}
    </div>
  );
}

import ServiceCard from "@/components/serviceCard/ServiceCard";


// Define la interfaz mínima para un servicio
interface ServiceGridItem {
  id: string | number;
  title: string;
  worker: {
    name: string;
  };
  work_photos: { photo_url: string }[];
}

interface ServicesGridProps {
  servicios: ServiceGridItem[];
}

export default function ServicesGrid({ servicios }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {servicios.map((service) => (
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

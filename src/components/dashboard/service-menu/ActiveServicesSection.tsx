import { useEffect } from "react";
import { SearchInput } from "@/components/dashboard/SearchInput";
import Pagination from "../../ui/Pagination";
import ActiveServicesTable from "./ActiveServicesTable";
import { useAdminContext } from "@/context/AdminContext";
import { Servicio } from "@/types";

type Props = {
  onDesactivate: (service: Servicio) => void;
  loadingServiceId?: string;
};

export default function ActiveServicesSection({
  onDesactivate,
  loadingServiceId,
}: Props) {
  const {
    activeServices,
    activeServicesPage,
    setActiveServicesPage,
    activeServicesSearch,
    setActiveServicesSearch,
  } = useAdminContext();

  const itemsPerPage = 5;
  const isFiltered = activeServicesSearch.trim().length > 0;


  const filteredServices = activeServices.filter((service) =>
    service.title.toLowerCase().includes(activeServicesSearch.toLowerCase())
  );


  const paginatedServices = filteredServices.slice(
    (activeServicesPage - 1) * itemsPerPage,
    activeServicesPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);


  useEffect(() => {
    setActiveServicesPage(1);
  }, [activeServicesSearch, setActiveServicesPage]);

  return (
    <div className="mt-4">
      {/* 🔍 Buscador */}
      <div className="mb-4">
        <SearchInput
          searchTerm={activeServicesSearch}
          setSearchTerm={setActiveServicesSearch}
          placeholder="Buscar servicios por nombre..."
        />
      </div>

      {/* 🧾 Tabla de servicios paginada */}
      <ActiveServicesTable
        services={paginatedServices}
        onDesactivate={onDesactivate}
        loadingId={loadingServiceId}
        isFiltered={isFiltered}
      />

      {/* 📄 Controles de paginación */}
      <Pagination
        totalPages={totalPages}
        currentPage={activeServicesPage}
        onPageChange={setActiveServicesPage}
      />
    </div>
  );
}

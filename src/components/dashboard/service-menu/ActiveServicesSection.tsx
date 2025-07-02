import { SearchInput } from "@/components/dashboard/SearchInput"; // 👈 asegurate que esté este import
import Pagination from "../Pagination";
import ActiveServicesTable from "./ActiveServicesTable";
import { useAdminContext } from "@/context/AdminContext";

import { Servicio } from "@/types";

type Props = {
  onDeactivate: (service: Servicio) => void;
  loadingServiceId?: string;
};

export default function ActiveServicesSection({
  onDeactivate,
  loadingServiceId,
}: Props) {
  const {
    activeServices,
    activeServicesCount,
    activeServicesPage,
    setActiveServicesPage,
    activeServicesSearch,
    setActiveServicesSearch,
  } = useAdminContext();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(activeServicesCount / itemsPerPage);

  const isFiltered = activeServicesSearch.trim().length > 0;

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

      <ActiveServicesTable
        services={activeServices}
        onDeactivate={onDeactivate}
        loadingId={loadingServiceId}
        isFiltered={isFiltered}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={activeServicesPage}
        onPageChange={setActiveServicesPage}
      />
    </div>
  );
}

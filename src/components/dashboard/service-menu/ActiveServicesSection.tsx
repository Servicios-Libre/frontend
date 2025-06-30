"use client";

import { Servicio } from "@/types";
import ActiveServicesTable from "@/components/dashboard/service-menu/ActiveServicesTable";
import Pagination from "@/components/dashboard/Pagination";
import { FaTools } from "react-icons/fa";
import { useAdminContext } from "@/context/AdminContext";

interface Props {
  loadingServiceId?: string;
  onDeactivate: (service: Servicio) => void;
}

export default function ActiveServicesSection({
  loadingServiceId,
  onDeactivate,
}: Props) {
  const {
    activeServices,
    activeServicesCount,
    setActiveServicesPage,
    activeServicesPage,
  } = useAdminContext();

  const perPage = 5;
  const totalPages = Math.ceil(activeServicesCount / perPage);

  return (
    <section>
      <div className="flex items-center gap-2 mb-4 mt-10">
        <h2 className="text-2xl font-bold text-indigo-100 flex items-center gap-2">
          <FaTools className="text-indigo-600" /> Servicios activos
        </h2>
        {activeServicesCount > 0 && (
          <span className="ml-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
            {activeServicesCount} activos
          </span>
        )}
      </div>

      <ActiveServicesTable
        services={activeServices}
        onDeactivate={onDeactivate}
        loadingId={loadingServiceId}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={activeServicesPage}
        onPageChange={setActiveServicesPage}
      />
    </section>
  );
}

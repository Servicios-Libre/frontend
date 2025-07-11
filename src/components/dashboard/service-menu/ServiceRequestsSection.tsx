"use client";

import { Ticket } from "@/types";
import { useState } from "react";
import ServiceRequestsTable from "@/components/dashboard/service-menu/ServicesRequestsTable";
import ServiceRequestDetailModal from "@/components/dashboard/service-menu/ServiceRequestDetailModal";
import Pagination from "@/components/ui/Pagination";
import { useAdminContext } from "@/context/AdminContext";

interface Props {
  requests: Ticket[] | undefined;
  loadingId?: string;
  onAccept: (ticket: Ticket) => void;
  onReject: (ticket: Ticket) => void;
}

export default function ServiceRequestsSection({
  requests,
  loadingId,
  onAccept,
  onReject,
}: Props) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const {
    serviceRequestsCount,
    serviceRequestsPage,
    setServiceRequestsPage,
  } = useAdminContext();

  const totalPages = Math.ceil(serviceRequestsCount / 5); // 5 por página

  return (
    <section className="mt-4">
      <ServiceRequestsTable
        requests={requests}
        onView={(ticket: Ticket) => setSelectedTicket(ticket)}
        loadingId={loadingId}
      />

      {selectedTicket && (
        <ServiceRequestDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onAccept={onAccept}
          onReject={onReject}
          loadingId={loadingId}
        />
      )}

      {/* Agregar paginación si hay más de 1 página */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={serviceRequestsPage}
          onPageChange={(page) => setServiceRequestsPage(page)}
        />
      )}
    </section>
  );
}

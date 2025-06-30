"use client";

import { Ticket } from "@/types";
import { useState } from "react";
import ServiceRequestsTable from "@/components/dashboard/service-menu/ServicesRequestsTable";
import ServiceRequestDetailModal from "@/components/dashboard/service-menu/ServiceRequestDetailModal";

interface Props {
  requests: Ticket[] | undefined;  // Aceptar undefined
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

  return (
    <section className="mt-4">
      <ServiceRequestsTable
        requests={requests}
        onView={(ticket: Ticket) => setSelectedTicket(ticket)}
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
    </section>
  );
}

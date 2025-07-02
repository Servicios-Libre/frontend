"use client";

import { motion } from "framer-motion";
import { FaFilePdf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { PiStripeLogoBold, PiCoinsBold } from "react-icons/pi";
import { downloadInvoicePdf } from "@/services/invoiceService";

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  method: "Stripe" | "MercadoPago";
  service: string;
  status: "Pagado" | "Fallido";
};

export const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  const isStripe = invoice.method === "Stripe";
  const MethodIcon = isStripe ? PiStripeLogoBold : PiCoinsBold;

  const methodColor = isStripe
    ? "bg-purple-100 text-purple-700"
    : "bg-yellow-100 text-yellow-800";

  const statusColor =
    invoice.status === "Pagado"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const StatusIcon = invoice.status === "Pagado" ? FaCheckCircle : FaTimesCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-100 ring-1 ring-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{invoice.service}</h3>
          <p className="text-xs text-gray-500 italic mt-1">Factura #{invoice.id}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${methodColor}`}
        >
          <MethodIcon className="text-base" />
          {invoice.method}
        </span>
      </div>

      <div className="mt-2 space-y-1 text-sm text-gray-800">
        <p>
          <strong className="text-blue-900">Fecha:</strong> {invoice.date}
        </p>
        <p>
          <strong className="text-blue-900">Monto:</strong>{" "}
          <span className="text-emerald-700 font-semibold">
            ${invoice.amount.toFixed(2)}
          </span>
        </p>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}
        >
          <StatusIcon className="text-sm" />
          {invoice.status}
        </span>
      </div>

      <button
        className="mt-5 inline-flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 transition px-4 py-2 rounded-full shadow-sm text-sm font-semibold"
        onClick={() => downloadInvoicePdf(invoice.id)}
      >
        <FaFilePdf className="text-sm" />
        Descargar PDF
      </button>
    </motion.div>
  );
};
"use client";

import { motion } from "framer-motion";
import { PiStripeLogoBold } from "react-icons/pi";
import * as mpSvg from "../../../public/svg/mp.svg"
import Image from "next/image";

export type Invoice = {
  id: string;
  createdAt: string;
  amount: number;
  provider: "stripe" | "mercado_pago";
  service: string;
  expiredAt: string
};

export const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  const isStripe = invoice.provider === "stripe";
  const providerText = isStripe ? "Stripe" : "Mercado Pago";
  // const MethodIcon = isStripe ? PiStripeLogoBold : PiCoinsBold;

  const methodColor = isStripe
    ? "bg-purple-100 text-purple-700"
    : "bg-blue-300 text-white";

  return (
   <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="bg-white border border-gray-200 ring-1 ring-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-full group hover:scale-[1.02] relative overflow-hidden"
>
  {/* Efecto de brillo sutil en el fondo */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <div className="flex justify-between items-start mb-6 relative z-10">
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">
        {invoice.service}
      </h3>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <p className="text-sm text-gray-500 font-medium">Factura #{invoice.id}</p>
      </div>
    </div>
    
    <span
      className={`text-sm font-bold py-2 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all duration-300 ${
        isStripe ? "gap-2 px-4" : "gap-2 px-4 pl-9"
      } ${methodColor} relative overflow-hidden group/badge`}
    >
      {/* Efecto de brillo en el badge */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700"></div>
      
      {isStripe ? (
        <PiStripeLogoBold className="text-lg relative z-10" />
      ) : (
        <Image 
          src={mpSvg} 
          width={12} 
          height={12} 
          alt="mp" 
          className="scale-[4] absolute top-4.5 left-3.5 z-10" 
        />
      )}
      <span className="relative z-10">{providerText}</span>
    </span>
  </div>

  <div className="space-y-4 text-base text-gray-800 relative z-10">
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600 font-medium">Fecha de inicio:</span>
      <span className="font-semibold text-blue-900">{invoice.createdAt}</span>
    </div>
    
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600 font-medium">Fecha de vencimiento:</span>
      <span className="font-semibold text-blue-900">{invoice.expiredAt}</span>
    </div>
    
    <div className="flex justify-between items-center py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl px-4 mt-4">
      <span className="text-gray-700 font-bold text-lg">Monto:</span>
      <span className="text-emerald-700 font-bold text-xl">
        ${Number(invoice.amount).toFixed(2)}
      </span>
    </div>
  </div>

  {/* Línea decorativa en la parte inferior */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</motion.div>
  );
};
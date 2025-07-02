"use client";

import { ChatContract } from "@/types";
import { useState } from "react";

interface ContractViewProps {
  contract: ChatContract;
  onAccept: () => void;
  onCancel: () => void;
}

const ContractView = ({ contract, onAccept, onCancel }: ContractViewProps) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="text-black bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Contrato Pendiente</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Detalles del Contrato</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-500 hover:text-blue-600"
          >
            {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Descripción:</span>
              <span>{contract.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha de Inicio:</span>
              <span>{new Date(contract.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha de Finalización:</span>
              <span>{new Date(contract.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pago Acordado:</span>
              <span>${contract.payment.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              console.log("👆 Se hizo clic en Aceptar Contrato");
              onAccept();
            }}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Aceptar Contrato
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractView;

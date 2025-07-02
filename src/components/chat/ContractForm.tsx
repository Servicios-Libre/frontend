"use client";

import { ChatContract } from "@/types";
import { useState } from "react";

interface ContractFormProps {
  onSubmit: (contract: ChatContract) => void;
  onCancel: () => void;
  setShowContractForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContractForm = ({
  onSubmit,
  onCancel,
  setShowContractForm,
}: ContractFormProps) => {
  const [formValues, setFormValues] = useState({
    description: "",
    startDate: "",
    endDate: "",
    payment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPayment = Number(formValues.payment);
    if (isNaN(parsedPayment) || parsedPayment < 0) {
      alert("El monto debe ser un número válido mayor o igual a cero.");
      return;
    }

    onSubmit({
      id: "",
      workerId: "",
      clientId: "",
      description: formValues.description,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      payment: parsedPayment,
      accepted: false,
      clientConfirmed: false,
      workerConfirmed: false,
      completed: false,
      status: "pending",
    });

    setShowContractForm(false); 
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Crear Contrato</h2>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descripción del Servicio
        </label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium mb-1">
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formValues.startDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium mb-1">
          Fecha de Finalización
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formValues.endDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="payment" className="block text-sm font-medium mb-1">
          Pago Acordado
        </label>
        <input
          type="number"
          id="payment"
          name="payment"
          value={formValues.payment}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Crear Contrato
        </button>
      </div>
    </form>
  );
};

export default ContractForm;

import React, { useState } from "react";
import { ServiceContractFormValues } from "@/types";
import { submitServiceContract } from "@/services/contrato-servicio/serviceContract";

const initialValues: ServiceContractFormValues = {
  clientName: "",
  workerName: "",
  serviceTitle: "",
  serviceDescription: "",
  startDate: "",
  endDate: "",
  address: "",
  payment: "",
  termsAccepted: false,
};

const ServiceContractForm: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setValues((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitServiceContract(values);
    setLoading(false);
    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <form
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl px-10 py-12 font-sans border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8 font-serif">
          Contrato de Prestación de Servicios
        </h2>

        <p className="text-gray-700 text-justify mb-6 leading-relaxed">
          Este contrato se celebra entre{" "}
          <input
            type="text"
            name="clientName"
            value={values.clientName}
            onChange={handleChange}
            placeholder="Nombre del Cliente"
            required
            className="inline-block border-b border-gray-400 focus:border-blue-600 focus:outline-none px-1 text-blue-900 font-semibold"
          />{" "}
          (Cliente) y{" "}
          <input
            type="text"
            name="workerName"
            value={values.workerName}
            onChange={handleChange}
            placeholder="Nombre del Trabajador"
            required
            className="inline-block border-b border-gray-400 focus:border-blue-600 focus:outline-none px-1 text-blue-900 font-semibold"
          />{" "}
          (Trabajador), para la realización del siguiente servicio:
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Título del Servicio:
            </label>
            <input
              type="text"
              name="serviceTitle"
              value={values.serviceTitle}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Descripción del Servicio:
            </label>
            <textarea
              name="serviceDescription"
              value={values.serviceDescription}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Fecha de inicio:
              </label>
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Fecha de finalización:
              </label>
              <input
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Dirección donde se realizará el servicio:
            </label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Pago acordado:
            </label>
            <input
              type="text"
              name="payment"
              value={values.payment}
              onChange={handleChange}
              placeholder="$"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 mt-6 text-sm text-gray-700">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={values.termsAccepted}
            onChange={handleChange}
            required
            className="mt-1"
          />
          <label>
            Acepto los{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              términos y condiciones
            </a>{" "}
            del contrato.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generando contrato..." : "Generar Contrato"}
        </button>

        {submitted && (
          <div className="mt-6 text-green-600 text-center font-bold">
            ¡Contrato generado correctamente!
          </div>
        )}
      </form>
    </div>
  );
};

export default ServiceContractForm;

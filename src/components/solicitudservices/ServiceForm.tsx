'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';
import { sendServiceRequest } from '@/services/serviceRequest';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useToast } from "@/context/ToastContext";


type JwtPayload = {
  id: string; // Ajusta el nombre del campo según tu JWT (puede ser "user_id" o "id")
  // ...otros campos si es necesario...
};

export const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Obtener el JWT del localStorage
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        showToast('No se encontró el token de usuario.', "error");
        return;
      }
      // Decodificar el JWT para obtener el user_id
      const decoded = jwtDecode<JwtPayload>(token);

      // Enviar la solicitud con los datos requeridos
      await sendServiceRequest({
        worker_id: decoded.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        // Si tu backend espera también el user_id, agrégalo aquí:
        // user_id: decoded.id,
      });
      showToast('Solicitud enviada correctamente.', "success");
    } catch (err) {
      showToast('Error al enviar la solicitud.', "error");
      console.error(err);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto mt-10">
      {/* Botón para cerrar y volver */}
      <Link
        href="/servicios"
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
      >
        ×
      </Link>

      <h2 className="text-black font-semibold mb-6 text-center">
        Solicitar Servicio
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="text-black w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-3 rounded-lg transition duration-200"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
};

'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { obtenerCategorias } from '@/services/categoriasService';
import Link from 'next/link';
import { HiOutlineInformationCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { validarServiceForm } from '@/utils/validations/validationsServiceForm';
import { sendServiceRequest } from '@/services/serviceRequest';
import { useToast } from "@/context/ToastContext";
import axios from 'axios';
import { useAuth } from "@/context/AuthContext";

type Categoria = {
  id: string;
  name: string;
};

export const ServiceForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Servicio Libre - Crear Servicio'
    const fetchCategories = async () => {
      try {
        const cats = await obtenerCategorias();
        setCategories(cats);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setCategories([]);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const newErrors = validarServiceForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      if (!auth?.user?.id) {
        showToast("No se pudo obtener el ID del usuario.", "error");
        setLoading(false);
        return;
      }

      await sendServiceRequest({
        worker_id: auth.user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
      });

      showToast('Solicitud enviada correctamente.', "success");
      setSuccess(true);
      setFormData({ title: '', description: '', category: '' });
      setErrors({});

      // Redirigir a perfil de worker
      router.push(`/worker-profile/${auth.user.id}`);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Error al enviar la solicitud.";
        showToast(msg, "error");
        console.error("Detalle del error:", err.response?.data);
      } else {
        showToast("Error inesperado", "error");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-xl shadow border border-blue-100 w-full max-w-lg mx-auto mt-12">
      <Link
        href="/servicios"
        className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 text-3xl font-bold transition-colors cursor-pointer"
        title="Volver"
      >
        ×
      </Link>

      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-500 text-blue-100 rounded-full p-3 shadow mb-2">
          <HiOutlineInformationCircle className="w-8 h-8" />
        </div>
        <h2 className="text-blue-500 font-bold text-2xl mb-1 text-center">
          Solicitar publicación de servicio
        </h2>
        <p className="text-gray-700 text-center text-sm max-w-md">
          Estás creando una <span className="font-normal text-blue-600">solicitud</span> para que un administrador la revise y apruebe.
          Una vez aceptada, tu servicio aparecerá en tu perfil de trabajador y será visible para los clientes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-blue-700 font-normal mb-1" htmlFor="title">
            Título del servicio
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Ej: Electricista certificado"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition ${errors.title ? "border-red-400" : "border-gray-300"
              }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-blue-700 font-normal mb-1" htmlFor="description">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Describe tu experiencia, herramientas, disponibilidad, etc."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition ${errors.description ? "border-red-400" : "border-gray-300"
              }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-blue-700 font-normal mb-1" htmlFor="category">
            Categoría
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer ${errors.category ? "border-red-400" : "border-gray-300"
              }`}
            disabled={catLoading}
          >
            <option
              value=""
              disabled
              hidden={!!formData.category}
            >
              {catLoading ? "Cargando categorías..." : "Seleccionar categoría"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center gap-2
            ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Solicitud'
          )}
        </button>

        {success && (
          <div className="flex items-center gap-2 mt-2 text-green-600 font-normal">
            <HiOutlineCheckCircle className="w-6 h-6" />
            ¡Solicitud enviada correctamente! Un administrador la revisará pronto.
          </div>
        )}
      </form>
    </div>
  );
};
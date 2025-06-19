"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const categories = [
  { name: "Carpintero" },
  { name: "Albañileria" },
  { name: "Plomero" },
  { name: "Gasista" },
  { name: "Electricista" },
  { name: "Jardineria" },
  { name: "Limpieza" },
  { name: "Pintor" },
  { name: "Otros" },
];

export default function RegisterForm() {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      showToast("Debes subir al menos una imagen.", "error");
      return;
    }

    const finalCategory = category === "Otros" ? customCategory : category;

    console.log("Categoría:", finalCategory);
    console.log("Título:", title);
    console.log("Descripción:", description);
    console.log("Imágenes:", images);

    // Reset form
    setCategory("");
    setCustomCategory("");
    setTitle("");
    setDescription("");
    setImages([]);
    setError("");
    setSuccessMessage("Servicio registrado correctamente.");
    setTimeout(() => setSuccessMessage(""), 3000);
    showToast("Servicio registrado correctamente.", "success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Título */}
      <div>
        <label htmlFor="title" className="block font-medium">
          Título del servicio
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Ej: Arreglo de grifería"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block font-medium">
          Descripción del servicio
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Describe los detalles del servicio..."
          rows={4}
          required
        />
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="category" className="block font-medium">
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría personalizada */}
      {category === "Otros" && (
        <div>
          <label htmlFor="customCategory" className="block font-medium">
            Especificar categoría
          </label>
          <input
            id="customCategory"
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Ej: Herrero"
            required
          />
        </div>
      )}

      {/* Imagenes */}
      <div>
        <label htmlFor="images" className="block font-medium">
          Subir imágenes del trabajo (mínimo 1)
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full mt-1"
        />
        {images.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            {images.length} archivo(s) seleccionado(s)
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar servicio
      </button>
    </form>
  );
}

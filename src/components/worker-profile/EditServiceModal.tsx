"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WorkerService } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { editarServicio } from "@/services/serviciosService";
import { eliminarFotoDeServicio } from "@/services/serviciosService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

type Props = {
  service: WorkerService;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedService: WorkerService, newFiles: FileList | null) => void;
};

export default function EditServiceModal({ service, isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [previewImages, setPreviewImages] = useState<{ id?: string; photo_url: string }[]>(service.work_photos);
  const [newFilesArray, setNewFilesArray] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { token } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    return () => {
      previewImages.forEach((img) => {
        if (!img.id) URL.revokeObjectURL(img.photo_url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTitle(service.title);
      setDescription(service.description);
      setPreviewImages(service.work_photos);
      setNewFilesArray([]);
      setImagesToDelete([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [service, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);
    const newPreviews = filesArray.map((file) => ({
      photo_url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setNewFilesArray((prev) => [...prev, ...filesArray]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = (index: number) => {
    if (previewImages.length <= 1) {
      showToast("El servicio debe tener al menos una imagen.", "error");
      return;
    }

    const img = previewImages[index];

    if (!img.id) {
      setNewFilesArray((prev) =>
        prev.filter((file) => URL.createObjectURL(file) !== img.photo_url)
      );
    } else {
      setImagesToDelete((prev) => [...prev, img.id!]);
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!token) {
      console.error("No hay token, no se puede actualizar el servicio.");
      showToast("No estás autorizado para realizar esta acción.", "error");
      return;
    }

    if (title.trim() === "" || description.trim() === "") {
      showToast("El título y la descripción no pueden estar vacíos.", "error");
      return;
    }

    try {
      // Eliminar fotos marcadas para borrar
      for (const photoId of imagesToDelete) {
        try {
          await eliminarFotoDeServicio(service.id, photoId, token);
        } catch (error) {
          console.error(`Error al eliminar imagen con ID ${photoId}:`, error);
        }
      }

      // Editar servicio con nuevo título y descripción
      await editarServicio(service.id, { title, description }, token);

      // Preparar nuevos archivos para enviar al padre
      const dataTransfer = new DataTransfer();
      newFilesArray.forEach((file) => dataTransfer.items.add(file));
      const finalNewFilesList = dataTransfer.files;

      // Notificar al componente padre
      onSave(
        {
          ...service,
          title,
          description,
          work_photos: previewImages.filter(
            (img): img is { id: string; photo_url: string } => typeof img.id === "string"
          ),
        },
        finalNewFilesList
      );

      onClose();
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      showToast("Error al guardar los cambios. Intenta de nuevo.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Cerrar"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Editar Servicio
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Plomería de emergencia"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition text-gray-800 ${
                title.trim() === "" ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe el servicio..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition resize-y text-gray-800 ${
                description.trim() === "" ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Fotos del trabajo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {previewImages.map((img, i) => (
                <div
                  key={img.id ?? `new-${i}`}
                  className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 group"
                >
                  <Image
                    src={img.photo_url}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <button
                    onClick={() => handleDeleteImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    aria-label="Eliminar"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors aspect-square"
              >
                <FontAwesomeIcon icon={faPlus} className="text-2xl text-gray-400" />
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

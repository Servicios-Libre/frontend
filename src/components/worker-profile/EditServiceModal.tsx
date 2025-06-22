import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WorkerService } from "@/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'; // Importar iconos de FontAwesome

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
  const [newFilesArray, setNewFilesArray] = useState<File[]>([]); // Usar un array de File para una mejor gestión
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sincronizar estado local con las props del servicio cuando cambian
  useEffect(() => {
    if (isOpen) { // Solo resetear si el modal está abriendo
      setTitle(service.title);
      setDescription(service.description);
      setPreviewImages(service.work_photos);
      setNewFilesArray([]); // Limpiar los nuevos archivos
      if (fileInputRef.current) fileInputRef.current.value = ""; // Limpiar input de archivo
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

    // Limpiar el input de archivo para que se puedan seleccionar los mismos archivos de nuevo
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = (indexToDelete: number) => {
    // Si la imagen a borrar es una nueva (no tiene ID), la removemos de newFilesArray también
    const imgToDelete = previewImages[indexToDelete];
    if (typeof imgToDelete.id === "undefined") {
      // Es una nueva imagen, necesitamos encontrar su File original para eliminarla de newFilesArray
      const newFilesToKeep = newFilesArray.filter((file) => {
        return URL.createObjectURL(file) !== imgToDelete.photo_url;
      });
      setNewFilesArray(newFilesToKeep);
    }

    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToDelete));
  };


  const handleSubmit = () => {
    const dataTransfer = new DataTransfer();
    newFilesArray.forEach(file => dataTransfer.items.add(file));
    const finalNewFilesList = dataTransfer.files;


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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>

        {/* Título del modal - Aseguramos un color oscuro */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Editar Servicio</h3>

        <div className="space-y-5">
          <div>
            {/* Label - Aseguramos un color oscuro */}
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Título</label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Plomería de emergencia"
            />
          </div>

          <div>
            {/* Label - Aseguramos un color oscuro */}
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-y text-gray-800"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe detalladamente el servicio que ofreces..."
            />
          </div>

          <div>
            {/* Label - Aseguramos un color oscuro */}
            <label className="block text-gray-700 font-medium mb-3">Fotos de Trabajo</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4 max-h-40 overflow-y-auto custom-scrollbar p-1">
              {previewImages.map((img, i) => (
                <div key={`${img.id ?? `new-${i}`}`} className="w-full h-24 relative rounded-lg overflow-hidden border border-gray-200 group">
                  <Image src={img.photo_url} alt={`Foto ${i + 1}`} fill style={{ objectFit: "cover" }} className="transition-transform duration-300 group-hover:scale-105" />
                  <button
                    onClick={() => handleDeleteImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Eliminar foto"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
              {/* Botón para añadir fotos */}
              <div className="w-full h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all duration-200"
                onClick={() => fileInputRef.current?.click()}>
                <FontAwesomeIcon icon={faPlus} className="text-gray-400 text-3xl" />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden" // Ocultar el input de archivo
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 font-semibold transition-colors duration-200"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 font-semibold transition-colors duration-200 shadow-md"
            onClick={handleSubmit}
            type="button"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
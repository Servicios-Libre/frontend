import { useState } from "react";
import { WorkerService } from "@/types";

interface Props {
  service: WorkerService;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: WorkerService, newImages: File[]) => void;
}

export default function EditServiceModal({ service, isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [images, setImages] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...service, title, description }, images);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Editar Servicio</h2>
        <label className="block mb-2 font-medium">Título</label>
        <input
          className="w-full border rounded px-2 py-1 mb-3"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label className="block mb-2 font-medium">Descripción</label>
        <textarea
          className="w-full border rounded px-2 py-1 mb-3"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label className="block mb-2 font-medium">Imágenes nuevas</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
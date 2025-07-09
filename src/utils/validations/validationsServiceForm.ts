export interface ServiceFormData {
  title: string;
  description: string;
  category: string;
}

export interface ServiceFormErrors {
  [key: string]: string;
}

export function validarServiceForm(data: ServiceFormData): ServiceFormErrors {
  const errors: ServiceFormErrors = {};

  if (!data.title.trim()) {
    errors.title = "El título es obligatorio.";
  } else if (data.title.trim().length < 5) {
    errors.title = "El título debe tener al menos 5 caracteres.";
  } else {
    // Contar letras (mayúsculas, minúsculas y acentuadas)
    const letras = data.title.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/g) || [];
    if (letras.length < 3) {
      errors.title = "El título debe contener al menos 3 letras.";
    }
  }

  if (!data.description.trim()) {
    errors.description = "La descripción es obligatoria.";
  } else if (data.description.trim().length < 20) {
    errors.description = "La descripción debe tener al menos 20 caracteres.";
  }

  if (!data.category) {
    errors.category = "Debes seleccionar una categoría.";
  }

  return errors;
}
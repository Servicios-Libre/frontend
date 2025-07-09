export type RegisterErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    phone?: string;
    street?: string;
    house_number?: string;
    city?: string;
    state?: string;
    zip_code?: string;
}

export type RegisterValidationData = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
    street: string;
    house_number: string;
    city: string;
    state: string;
    zip_code: string;
};

export const validateRegisterForm = (
  data: RegisterValidationData
): RegisterErrors => {
  const errors: RegisterErrors = {};

  // Expresiones regulares para las validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersAndSpacesRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
  const uppercaseRegex = /(?=.*[A-Z])/;
  const specialCharRegex = /(?=.*[!@#$%^&*(),.?":{}|<>])/;
  const onlyNumbersRegex = /^\d+$/;

  // --- Validación de Email ---
  if (!data.email) {
    errors.email = "El email es obligatorio.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "El formato del email no es válido.";
  }

  // --- Validación de Contraseña ---
  if (!data.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (data.password.length < 8 || data.password.length > 20) {
    errors.password = "La contraseña debe tener entre 8 y 20 caracteres.";
  } else if (!uppercaseRegex.test(data.password)) {
    errors.password = "La contraseña debe contener al menos una mayúscula.";
  } else if (!specialCharRegex.test(data.password)) {
    errors.password = "La contraseña debe contener al menos un carácter especial.";
  }

  // --- Validación de Confirmación de Contraseña ---
  if (!data.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  // --- Validación de Nombre ---
  if (!data.name) {
    errors.name = "El nombre es obligatorio.";
  } else if (data.name.length > 20) {
    errors.name = "El nombre no puede tener más de 20 caracteres.";
  } else if (!lettersAndSpacesRegex.test(data.name)) {
    errors.name = "El nombre solo puede contener letras y espacios.";
  }

  // --- Validación de Teléfono ---
  if (!data.phone) {
    errors.phone = "El teléfono es obligatorio.";
  } else if (data.phone.length > 20) {
    errors.phone = "El teléfono no puede tener más de 20 caracteres.";
  } else if (!onlyNumbersRegex.test(data.phone)) {
    errors.phone = "El teléfono solo puede contener números.";
  }

  // --- Validación de Dirección ---
  if (!data.street) {
    errors.street = "La calle es obligatoria.";
  } else if (data.street.length > 20) {
    errors.street = "La calle no puede tener más de 20 caracteres.";
  } else if (!lettersAndSpacesRegex.test(data.street)) {
    errors.street = "La calle solo puede contener letras y espacios.";
  }

  // house_number se recibe como string desde el form, lo validamos como tal
  if (!data.house_number) {
    errors.house_number = "El número de casa es obligatorio.";
  } else if (!onlyNumbersRegex.test(String(data.house_number))) {
    errors.house_number = "El número de casa solo puede contener números.";
  } else if (Number(data.house_number) < 1 || Number(data.house_number) > 10000) {
    errors.house_number = "El número de casa debe estar entre 1 y 10000.";
  }

  // --- Validación de Ubicación ---
  if (!data.city) {
    errors.city = "La ciudad es obligatoria.";
  } else if (!lettersAndSpacesRegex.test(data.city)) {
    errors.city = "La ciudad solo puede contener letras y espacios.";
  }

  if (!data.state) {
    errors.state = "La provincia es obligatoria.";
  } else if (!lettersAndSpacesRegex.test(data.state)) {
    errors.state = "La provincia solo puede contener letras y espacios.";
  }

  if (!data.zip_code) {
    errors.zip_code = "El código postal es obligatorio.";
  } else if (data.zip_code.length > 7) {
    errors.zip_code = "El código postal no puede tener más de 7 caracteres.";
  }

  return errors;
};
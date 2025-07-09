export const validateLoginForm = (data: {
  email: string;
  password: string;
}) => {
  const errors: { email?: string; password?: string } = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email) {
    errors.email = "El email es obligatorio.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "El formato del email no es válido.";
  }

  if (!data.password) {
    errors.password = "La contraseña es obligatoria.";
  }

  return errors
};

import axios from 'axios';

// Tipo estricto para los datos del perfil
export type UserProfile = {
  phone: string;
  user_pic: string;
  street: string;
  house_number: string;
  city: string;
  state: string;
  zip_code: string;
};

// Función para actualizar el perfil del usuario
export const updateProfile = async (data: UserProfile): Promise<void> => {
  await axios.put('/api/profile', data); // Reemplazá esta URL por la real si cambia
};

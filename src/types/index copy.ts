export interface Service {
  id: string;
  title: string;
  work_photos: [{
    id: string,
    photo_url: string
  }];
  worker: {
    name: string;
  };
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Perfil {
  id: string;
  nombre: string;
  profesion: string;
  imagen: string;
  descripcion: string;
}

export interface Servicio {
  id: string;
  title: string;
  description: string;
  work_photos: object[];
  category: {
    id: string,
    name: string,
    icon: string
  };
  user: string;
}

export type IconName =
  | "tractor"
  | "laptop-code"
  | "user-nurse"
  | "dumbbell"
  | "bullhorn"
  | "handshake"
  | "screwdriver-wrench"
  | "chalkboard-teacher"
  | "face-smile"
  | "user-astronaut"; // <-- Agregado

export interface Categoria {
  id: string;
  name: string;
  icon: IconName;
}

interface Address {
  street: string;
  house_number?: string; // opcional, no está en backend
  city: string;
  state: string;
  zip_code?: string; // opcional
}
export interface UserProfile {
  address_id: Address;
  name: string;
  phone: string; // aunque sea number en backend, lo tratás como string
  user_pic?: string; // opcional, ya que no existe aún
}

export interface ProfileForm {
  phone: number;
  street: string;
  house_number: number;
  city: string;
  state: string;
  zip_code: number;
  country: string;
  user_pic?: string; // Solo para mostrar, no se envía al backend
}

export interface ServicioGrid {
  id: string | number;
  title: string;
  worker: {
    name: string;
  };
  work_photos: { photo_url: string }[];
}


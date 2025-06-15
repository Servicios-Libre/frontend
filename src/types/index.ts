export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  image: string;
  categoryId: string;
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
  image: string;
  categoryId: string;
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
  | "face-smile";

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
  country: string;
}
export interface UserProfile {
  address_id: Address;
  name: string;
  phone: string; // aunque sea number en backend, lo tratás como string
  user_pic?: string; // opcional, ya que no existe aún
}

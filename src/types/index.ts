export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Service {
  id: number;
  title: string;
  image: string;
  categoryId: number;
}

export interface Perfil {
  id: number;
  nombre: string;
  profesion: string;
  imagen: string;
  descripcion: string;
}

export interface Servicio {
  id: number;
  title: string;
  description: string;
  image: string;
  categoryId: number;
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
  id: number;
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

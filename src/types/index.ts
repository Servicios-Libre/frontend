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


export type UserProfile = {
  phone: string;
  user_pic: string;
  street: string;
  house_number: string;
  city: string;
  state: string;
  zip_code: string;
};
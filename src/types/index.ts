// --- USUARIOS ---
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

// --- WORKERS ---
export interface WorkerUser {
  id: string;
  username: string;
  email: string;
  isWorker: boolean;
  hasRequest: boolean;
}

// --- SERVICIOS ---
export interface Service {
  id: string;
  title: string;
  worker: string; // nombre o id del worker
  status: 'pendiente' | 'aprobado' | 'rechazado';
  date: string;
}

// --- TICKETS ---
export interface Ticket {
  id: string;
  type: "to-worker" | "service";
  status: "pendiente" | "aprobado" | "rechazado";
  created_at: string;
  userId: string;
  serviceId?: string; // solo para type: "service"
}

// --- Otros tipos existentes que uses en otros lados ---
export interface Perfil {
  id: string;
  nombre: string;
  profesion: string;
  imagen: string;
  descripcion: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Servicio {
  id: string;
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
  | "user-astronaut";

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


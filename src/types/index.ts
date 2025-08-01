export interface Service {
  id: string;
  title: string;
  work_photos: { id: string; photo_url: string }[];
  worker: {
    name: string;
  };
  categoryId: string;
}

export interface ServicioGrid {
  id: string;
  title: string;
  worker: {
    id: string;
    name: string;
  };
  work_photos: { photo_url: string }[];
}

export interface UserProfile {
  address_id: Address;
  name: string;
  phone: string; // aunque sea number en backend, lo tratás como string
  user_pic?: string; // opcional, ya que no existe aún
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
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
    id: string;
    name: string;
    icon: string;
  };
  worker: {
    id: string;
    name: string;
    email: string;
  };
  user?: string;
  ticket?: {
    id: string;
    status: string;
    type: string;
  };
}

export enum TicketStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
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
  icon?: IconName;
}

export interface Address {
  street: string;
  house_number?: string;
  city: string;
  state: string;
  zip_code?: string;
}

// User básico para evitar circularidad
export interface UserBasic {
  id: string;
  name: string;
  email: string;
  role: "user" | "worker" | "admin";
  premium: boolean;
  user_pic: string;
  availability: boolean;
  address: Address;
  rate?: number;
  phone?: string;
  description?: string;
  social?: SocialLinks;
}

export interface SocialLinks {
  id: string;
  facebook?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  x?: string | null;
}

// Service con category como objeto y descripción (para perfil de worker)
export interface WorkerService {
  id: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
    icon?: string;
  };
  work_photos: {
    id: string;
    photo_url: string;
  }[];
  ticket?: { status: string } | null;
}

// Ticket normal (sin user embebido)
export interface Ticket {
  id: string;
  type: string;
  status: string;
  created_at: string;
  user?: {
    email: string;
    name: string;
  };
  service?: {
    id: string;
    title: string;
    description: string;
  };
}

// Ticket para solicitudes de worker (con user embebido)
export interface WorkerRequestTicket {
  id: string;
  type: "to-worker" | "service";
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  user: User;
}

// User completo para dashboard (con role, email, premium, etc)
export interface User extends UserBasic {
  services: WorkerService[];
  tickets: Ticket[];
}

export interface ServiceContractFormValues {
  clientName: string;
  workerName: string;
  serviceTitle: string;
  serviceDescription: string;
  startDate: string;
  endDate: string;
  address: string;
  payment: string;
  termsAccepted: boolean;
}

export type Job = {
  id: string;
  title: string;
  description: string;
  work_photos?: {
    id: string;
    photo_url: string;
  }[];
  worker: {
    id: string;
    user_pic?: string;
    name: string;
  };
};

export type Review = {
  id: string;
  description: string;
  rate: number;
  created_at: string;
  author: {
    id: string;
    name: string;
    user_pic?: string;
  };
};




// Chats Worker y User
export interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  receiverId?: string;
}


export type ChatContract = {
  id: string;
  workerId: string;
  clientId: string;
  description: string;
  startDate: string;
  endDate: string;
  payment: number;
  accepted: boolean;
  clientConfirmed?: boolean;
  workerConfirmed?: boolean;
  completed?: boolean;
  status: "pending" | "accepted" | "rejected" | "completed";
};

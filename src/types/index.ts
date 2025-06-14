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
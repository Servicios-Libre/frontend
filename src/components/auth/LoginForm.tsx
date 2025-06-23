"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import axios from "axios"; 
import { useAuth } from "@/context/AuthContext";

type Props = {
  setMessage: (msg: string) => void;
  setError: (msg: string) => void;
};

export default function LoginForm({ setMessage, setError }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await loginUser(formData.email, formData.password);
      setMessage("Inicio de sesión exitoso.");
      if (auth && auth.setToken) {
        auth.setToken(res.token); // <-- Solo pasa el token
      }
      setTimeout(() => {
        router.push("/servicios");
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error al iniciar sesión");
      } else {
        setError("Error inesperado al iniciar sesión");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black flex flex-col gap-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md mt-2 transition-colors cursor-pointer"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
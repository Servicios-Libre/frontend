"use client";

import { useState } from "react";
import { registerUser, loginUser } from "@/services/authService"; // Asegúrate de importar loginUser
import axios, { AxiosError } from "axios";
import CountryCitySelect from "./CountryCitySelect";
import { useRouter } from "next/navigation"; // Importa useRouter
import { useAuth } from "@/context/AuthContext";

type Props = {
  setMessage: (msg: string) => void;
  setError: (msg: string) => void;
};

export default function RegisterForm({ setMessage, setError }: Props) {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    house_number: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const router = useRouter(); // Inicializa router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const {
      firstName, lastName, email, password, confirmPassword,
      phone, street, house_number, city, state, zip_code,
    } = formData;

    if (
      !firstName || !lastName || !email || !password || !confirmPassword ||
      !phone || !street || !house_number || !city || !state || !zip_code
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const fullName = `${firstName} ${lastName}`;
      await registerUser({
        name: fullName,
        email,
        password,
        confirmPassword,
        phone,
        street,
        house_number: Number(house_number),
        city,
        state,
        zip_code,
      });
      // Login automático después del registro
      const res = await loginUser(email, password);
      auth?.setToken(res.token); // Actualiza el contexto y el localStorage
      setMessage("¡Registro y login exitosos!");
      setTimeout(() => {
        router.push("/servicios");
      }, 1000);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || "Error de red");
      } else {
        setError("Error inesperado");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="firstName"
          type="text"
          placeholder="Nombre"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Apellido"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder="Teléfono"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="street"
          type="text"
          placeholder="Calle"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <input
          name="house_number"
          type="text"
          placeholder="Número"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.house_number}
          onChange={handleChange}
          required
        />
      </div>
      <CountryCitySelect
        state={formData.state}
        city={formData.city}
        onChange={handleChange}
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="zip_code"
          type="text"
          placeholder="Código Postal"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.zip_code}
          onChange={handleChange}
          required
        />
      </div>
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
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirmar contraseña"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md mt-2 transition-colors cursor-pointer"
      >
        Crear Cuenta
      </button>
    </form>
  );
}
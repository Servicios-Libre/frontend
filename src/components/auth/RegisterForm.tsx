"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import CountryCitySelect from "./CountryCitySelect";
import { registerUser } from "@/services/authService";
import { fetchStatesWithCities } from "@/services/profileService";

type Props = {
  setMessage: (msg: string) => void;
  setError: (msg: string) => void;
};

export default function RegisterForm({ setMessage, setError }: Props) {
  const [statesData, setStatesData] = useState<
    { id: number; state: string; cities: { id: number; name: string; state: string }[] }[]
  >([]);

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

  const router = useRouter();

  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await fetchStatesWithCities();
        setStatesData(data);
      } catch (error) {
        console.error("Error al cargar provincias:", error);
      }
    };

    loadStates();
  }, []);

  const provincias = statesData.map((prov) => prov.state);

  const ciudades =
    formData.state !== ""
      ? statesData.find((prov) => prov.state === formData.state)?.cities.map((city) => city.name) || []
      : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "state"
        ? value
        : value,
      ...(name === "state" ? { city: "" } : {}), // resetear ciudad si cambia provincia
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      street,
      house_number,
      city,
      state,
      zip_code,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !street ||
      !house_number ||
      !city ||
      !state ||
      !zip_code
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      await registerUser({
        name: fullName,
        email,
        password,
        confirmPassword,
        phone,
        street,
        house_number: Number(house_number),
        city: city.trim(),
        state: state.trim(),
        zip_code,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Error al iniciar sesión después del registro.");
      } else {
        setMessage("¡Registro y login exitosos!");
        setTimeout(() => {
          router.push("/servicios");
        }, 1000);
      }
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
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Apellido"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.lastName}
          onChange={handleChange}
          required
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
        provinces={provincias}
        cities={ciudades}
        onChange={handleChange}
      />

      <input
        name="zip_code"
        type="text"
        placeholder="Código Postal"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.zip_code}
        onChange={handleChange}
        required
      />
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

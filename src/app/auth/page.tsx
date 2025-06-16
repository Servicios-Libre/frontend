"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/authService";
import axios, { AxiosError } from "axios";
import { locationOptions, countries } from "@/databauti/locations";
import Image from "next/image";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    house_number: "", // Nuevo campo
    city: "",
    state: "",
    zip_code: "",    // Nuevo campo
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (isLogin) {
      try {
        const res = await loginUser(formData.email, formData.password);
        setMessage("Inicio de sesión exitoso.");
        localStorage.setItem("token", res.token);
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
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phone,
        street,
        house_number, // Nuevo campo
        city,
        state,
        zip_code,     // Nuevo campo
      } = formData;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !phone ||
        !street ||
        !house_number || // Validación
        !city ||
        !state ||
        !zip_code        // Validación
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
          phone: Number(phone),
          street,
          house_number: Number(house_number), // Enviar a backend
          city,
          state,
          zip_code,     // Enviar a backend
        });

        setMessage("¡Registro exitoso!");
        setIsLogin(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          setError(axiosError.response?.data?.message || "Error de red");
        } else {
          setError("Error inesperado");
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">

          <div className="my-6">
            <a href="/landing" className="flex justify-center">
              <Image
                width={100}
                height={100}
                src="/img/logosl-dark.png"
                className="h-10 w-auto"
                alt="ServicioLibre-logo"
              />
            </a>
          </div>

          <div className="flex mb-6 overflow-hidden rounded-full bg-gray-100">
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage("");
                setError("");
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${!isLogin
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              Sign up
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage("");
                setError("");
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${isLogin
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              Log in
            </button>
          </div>

          <h2 className="text-blue-500 text-center text-lg font-normal mb-4">
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </h2>

          {message && (
            <div className="text-green-600 text-sm text-center font-medium mb-2">
              {message}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center font-medium mb-2">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="text-black flex flex-col gap-4"
          >
            {!isLogin && (
              <>
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    name="state"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar país</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <select
                    name="city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                  >
                    <option value="">Seleccionar ciudad</option>
                    {formData.state &&
                      locationOptions[formData.state].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>
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
              </>
            )}

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

            {!isLogin && (
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md mt-2 transition-colors cursor-pointer"
            >
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

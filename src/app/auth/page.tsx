"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/authService";
import axios, { AxiosError } from "axios";
import { locationOptions, countries } from "@/databauti/locations";

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
    city: "",
    state: "",
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
          router.push("/landing");
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
        city,
        state,
      } = formData;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !phone ||
        !street ||
        !city ||
        !state
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
          city,
          state,
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
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-indigo-800 to-yellow-500 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex mb-6 overflow-hidden rounded-full bg-gray-200">
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage("");
                setError("");
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all ${
                !isLogin
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-300"
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
              className={`w-1/2 py-2 text-sm font-semibold transition-all ${
                isLogin
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Log in
            </button>
          </div>

          <h2 className="text-black text-center text-lg font-bold mb-4">
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </h2>

          {message && (
            <div className="text-green-600 text-sm text-center font-semibold mb-2">
              {message}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center font-semibold mb-2">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="text-black flex flex-col gap-4"
          >
            {!isLogin && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  className="w-full rounded border px-4 py-2"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded border px-4 py-2"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-black rounded-md text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="px-4 py-2 border border-black rounded-md text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="px-4 py-2 border border-black rounded-md text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border border-black rounded-md text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  name="street"
                  type="text"
                  placeholder="Street"
                  className="px-4 py-2 border border-black rounded-md text-sm"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
                <select
                  name="state"
                  className="px-4 py-2 border border-black rounded-md text-sm"
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
                  className="px-4 py-2 border border-black rounded-md text-sm"
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
              </>
            )}

            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold text-sm py-2 rounded-full mt-2"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

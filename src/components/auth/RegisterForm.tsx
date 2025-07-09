"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import CountryCitySelect from "./CountryCitySelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "@/services/authService";
import { fetchStatesWithCities } from "@/services/profileService";
import {
  validateRegisterForm,
  RegisterErrors, RegisterValidationData,
} from "@/utils/validations/validationRegisterForm";

type Props = {
  setMessage: (msg: string) => void;
};

export default function RegisterForm({ setMessage }: Props) {
  const [statesData, setStatesData] = useState<
    {
      id: number;
      state: string;
      cities: { id: number; name: string; state: string }[];
    }[]
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

  const [error, setError] = useState<RegisterErrors>({});
  const [loadingResponse, setLoadingResponse] = useState(false);

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

    return () => {
      setStatesData([]);
      setFormData({
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
      setError({});
      setMessage("");
    };
  }, []);

  const provincias = [...new Set(statesData.map((prov) => prov.state))];

  const ciudades =
    formData.state !== ""
      ? [
          ...new Set(
            statesData
              .find((prov) => prov.state === formData.state)
              ?.cities.map((city) => city.name) || []
          ),
        ]
      : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
        ...(name === "state" ? { city: "" } : {}), // resetear ciudad si cambia provincia
      };

      return updatedFormData;
    });
    setMessage("");
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    const { firstName, lastName, ...cleanFormData } = formData;
    const validationData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      ...cleanFormData,
      house_number: cleanFormData.house_number,
    } as RegisterValidationData;

    const allErrors = validateRegisterForm(validationData);

    // Actualiza el error solo para el campo que perdió el foco
    const updateErrorForField = (fieldName: string) => {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors };
        const fieldError = allErrors[fieldName as keyof RegisterErrors];

        if (fieldError) {
          newErrors[fieldName as keyof RegisterErrors] = fieldError;
        } else {
          delete newErrors[fieldName as keyof RegisterErrors];
        }
        return newErrors;
      });
    };

    updateErrorForField(name === "firstName" || name === "lastName" ? "name" : name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    // Realizar una validación final y completa antes de enviar
    const { firstName, lastName, ...cleanFormData } = formData;
    const validationData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      ...cleanFormData,
      house_number: cleanFormData.house_number,
    } as RegisterValidationData;
    const validationErrors = validateRegisterForm(validationData);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return setMessage("Por favor, corrige los errores antes de continuar.");
    }

    try {
      const {
        email, password, confirmPassword, phone, street, house_number, city, state, zip_code
      } = formData;
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      setLoadingResponse(true);
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
        setMessage("Error al iniciar sesión después del registro.");
        setLoadingResponse(false);
      } else {
        setMessage("¡Registro y login exitosos!");
        setLoadingResponse(false);
        setTimeout(() => {
          router.push("/servicios");
        }, 1000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setMessage(axiosError.response?.data?.message || "Error de red");
        setLoadingResponse(false);
      } else {
        setMessage("Error inesperado");
        setLoadingResponse(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full">
          <input
            name="firstName"
            type="text"
            placeholder="Nombre"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="w-full">
          <input
            name="lastName"
            type="text"
            placeholder="Apellido"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
      </div>
      {error.name && <p className="text-red-500 text-xs -mt-3 mb-1">{error.name}</p>}
      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Teléfono"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {error.phone && <p className="text-red-500 text-xs mt-1">{error.phone}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full">
          <input
            name="street"
            type="text"
            placeholder="Calle"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {error.street && <p className="text-red-500 text-xs mt-1">{error.street}</p>}
        </div>
        <div className="w-full">
          <input
            name="house_number"
            type="text"
            placeholder="Número"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.house_number}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {error.house_number && <p className="text-red-500 text-xs mt-1">{error.house_number}</p>}
        </div>
      </div>
      <div>
        <CountryCitySelect
          state={formData.state}
          city={formData.city}
          provinces={provincias}
          cities={ciudades}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={{ state: error.state, city: error.city }}
        />
      </div>

      <div>
        <input
          name="zip_code"
          type="text"
          placeholder="Código Postal"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.zip_code}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {error.zip_code && <p className="text-red-500 text-xs mt-1">{error.zip_code}</p>}
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {error.confirmPassword && <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>}
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md mt-2 transition-colors cursor-pointer flex items-center justify-center ${
          loadingResponse ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={loadingResponse}
      >
        {loadingResponse ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Creando cuenta...
          </>
        ) : (
          "Crear Cuenta"
        )}
      </button>
    </form>
  );
}

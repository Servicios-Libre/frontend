"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { validateLoginForm } from "@/utils/validations/validationLoginForm";

type Props = {
  setMessage: (msg: string) => void;
};

export default function LoginForm({ setMessage }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const [loadingResponse, setLoadingResponse] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const validationErrors = validateLoginForm(formData);

    if (validationErrors[name as keyof typeof validationErrors]) {
      setError((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof typeof validationErrors],
      }));
    } else {
      setError((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof newErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const validationErrors = validateLoginForm(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setLoadingResponse(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setMessage("Email o contraseña incorrectos");
      } else if (result?.ok) {
        setMessage("Inicio de sesión exitoso");
        setTimeout(() => {
          router.push("/servicios");
        }, 1000);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Error inesperado al iniciar sesión");
    } finally {
      setLoadingResponse(false);
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
        onBlur={handleBlur}
        required
      />
       {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md mt-2 transition-colors cursor-pointer"
      >
          {loadingResponse ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
      </button>
    </form>
  );
}

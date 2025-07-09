"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
// import AlertMessage from "./AlertMessage";
import Image from "next/image";
import Link from "next/link"; // Agregado
import { signIn } from "next-auth/react"; // Agrega este import
import AlertMessage from "./AlertMessage";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  // const [error, setError] = useState({});

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        <Link
          href="/landing"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </Link>
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="my-6 flex justify-center">
            <Image
              width={100}
              height={100}
              src="/img/logosl-dark.png"
              className="h-10 w-auto"
              alt="ServicioLibre-logo"
            />
          </div>
          <div className="flex mb-6 overflow-hidden rounded-full bg-gray-100">
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage("");
                // setError("");
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !isLogin
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
                // setError("");
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isLogin
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Log in
            </button>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-2 shadow-sm hover:shadow-md transition-all duration-150 hover:bg-gray-50 font-semibold text-gray-700"
              onClick={() => signIn("google", { callbackUrl: "/servicios" })}
            >
              <Image src="/img/GoogleLogo.png" alt="Google" width={20} height={20} className="w-5 h-5" />
              Continuar con Google
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-xs">o</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <h2 className="text-blue-500 text-center text-lg font-normal mb-4">
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </h2>
          <AlertMessage message={message} />
          {isLogin ? (
            <LoginForm setMessage={setMessage} />
          ) : (
            <RegisterForm
              setMessage={setMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

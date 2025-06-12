'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isLogin) {
      if (
        formData.email === 'test@example.com' &&
        formData.password === '123456'
      ) {
        setMessage('Iniciando sesión...');
        setTimeout(() => {
          router.push('/landing');
        }, 1500);
      } else {
        setError('Credenciales inválidas. Intenta nuevamente.');
      }
    } else {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      setMessage('¡Registro exitoso!');
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
                setMessage('');
                setError('');
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all ${
                !isLogin
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage('');
                setError('');
              }}
              className={`w-1/2 py-2 text-sm font-semibold transition-all ${
                isLogin
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Log in
            </button>
          </div>


          <h2 className="text-black text-center text-lg font-bold mb-4">
            {isLogin ? 'Iniciar Sesión' : 'Registrar'}
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

            {!isLogin && (
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="px-4 py-2 border border-black rounded-md text-sm"
                value={formData.username}
                onChange={handleChange}
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email address"
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
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="px-4 py-2 border border-black rounded-md text-sm"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold text-sm py-2 rounded-full mt-2"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

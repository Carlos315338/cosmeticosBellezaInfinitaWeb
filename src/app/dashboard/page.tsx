// app/auth/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías validar o autenticar
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-pink-50 px-4">
      <Image src="/logo.png" alt="Logo" width={180} height={180} className="mb-6" />

      <form
        onSubmit={handleSubmit}
        className="bg-purple-900 shadow-lg rounded-lg p-6 w-full max-w-sm text-white"
      >
        <label htmlFor="idNumber" className="block mb-2 text-sm">
          Número de identificación
        </label>
        <input
          id="idNumber"
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded text-black"
        />

        <label htmlFor="password" className="block mb-2 text-sm">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded mt-2"
        >
          Iniciar sesión
        </button>

        <a href="#" className="block mt-4 text-center text-sm underline text-white">
          ¿Has olvidado tu contraseña?
        </a>
      </form>
    </main>
  );
}
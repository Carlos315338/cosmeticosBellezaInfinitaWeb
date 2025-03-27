'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from '@aws-amplify/auth';
import { useAuth } from '@/context/AuthContext';
import { fetchAuthSession } from '@aws-amplify/auth';

export default function LoginPage() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //const user = await Auth.signIn(idNumber, password);
      //const user = await signIn({ username: idNumber, password });
      setAuthData("username", "accessToken", "refreshToken");
      router.push('/dashboard');
    } catch (error) {
      console.error('Error de login', error);
      alert('Credenciales inválidas');
    }
  };

  

//  const getTokens = async () => {
//    try {
//      const session = await fetchAuthSession();
//
//      const idToken = session.tokens?.idToken?.toString();
//      const accessToken = session.tokens?.accessToken?.toString();
//
//      console.log('ID Token:', idToken);
//      console.log('Access Token:', accessToken);
//    } catch (err) {
//      console.error('Error al obtener los tokens:', err);
//    }
//  };

  

  return (
    <main className="login-container">
      <Image src="/logo.png" alt="Logo" width={180} height={180} className="login-container__logo" />

      <form onSubmit={handleSubmit} className="login-box">
        <label htmlFor="idNumber" className="login-box__label">
          Número de identificación
        </label>
        <input
          id="idNumber"
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
          className="login-box__input"
        />

        <label htmlFor="password" className="login-box__label">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-box__input"
        />

        <input
          type="submit"
          value="Iniciar sesión"
          className="login-box__button"
        />

        <a href="#" className="login-box__forgot">
          ¿Has olvidado tu contraseña?
        </a>
      </form>
    </main>
  );
}

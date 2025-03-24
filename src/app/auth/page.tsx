// app/auth/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from '@aws-amplify/auth';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  //const handleSubmit = async (e: React.FormEvent)  =>  {
  //  e.preventDefault();

    //const user = await signIn({ username: idNumber, password });
    //console.log('✅ Login exitoso', user);
  
  //  console.log('Número de identificación:', idNumber);
  //  console.log('Contraseña:', password);
  //  const baba = {idNumber, password}
  //  router.push('/dashboard');
  //};

  //const router = useRouter();
  const { setAuthData } = useAuth();

  //const [idNumber, setIdNumber] = useState('');
  //const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //const user = await Auth.signIn(idNumber, password);
      const user = await signIn({ username: idNumber, password });
      setAuthData("username", "accessToken", "refreshToken");
      router.push('/dashboard');
    } catch (error) {
      console.error('Error de login', error);
      alert('Credenciales inválidas');
    }
  };
  

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

"use client";
import "@/services/amplify-config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { useAuth } from "@/context/AuthContext";
import { usuarioService } from "@/services/usuarios/usuarioService";

export default function LoginPage() {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await getCurrentUser();
      console.log("Ya hay un usuario logueado:", user);
      await signOut();
    } catch {
      // No hay sesión activa, está bien continuar
    }

    try {
      //const user = await Auth.signIn(idNumber, password);
      await signIn({ username: idNumber, password });
      const usuarioLogueado = await usuarioService.obtenerPorId(idNumber);
      setAuthData(usuarioLogueado);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error de login", error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <main className="login-container">
      <Image
        src="/logo.png"
        alt="Logo"
        width={240}
        height={240}
        className="login-container__logo"
      />

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

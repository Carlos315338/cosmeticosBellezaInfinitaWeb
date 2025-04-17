// app/ui/Header.tsx
"use client";

import { signOut } from "@aws-amplify/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/services/amplify-config";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const router = useRouter();

  const cerrarSesion = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="row header g-0">
      {/* Logo */}
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <Image src="/BellezaWhite.png" alt="Logo" width={80} height={80} />
      </div>

      {/* Usuario activo */}
      <div className="col-md-8 align-self-center d-flex align-items-center pt-2 pb-2">
        <Image
          src="/active-user.png"
          alt="Usuario activo"
          width={32}
          height={32}
          className="header__logo-user"
        />
        <span className="me-2">Cuenta activa:</span>
        <span className="header__user-name">{userName}</span>
      </div>

      {/* Botón cerrar sesión */}
      <div className="col-md-2 text-center align-self-center">
        <button className="btn btn-dark m-4" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

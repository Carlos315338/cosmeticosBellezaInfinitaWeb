// app/ui/Header.tsx
'use client';

import Image from 'next/image';

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <div className="row header p-3 shadow-sm">
      {/* Logo */}
      <div className="col-md-2 text-center">
        <Image src="/BellezaWhite.png" alt="Logo" width={120} height={60} />
      </div>

      {/* Usuario activo */}
      <div className="col-md-8 align-self-center d-flex align-items-center">
        <Image src="/active-user.png" alt="Usuario activo" width={32} height={32} className="header__logo-user" />
        <span className="me-2">Cuenta activa:</span>
        <span className="header__user-name">{userName}</span>
      </div>

      {/* Botón cerrar sesión */}
      <div className="col-md-2 text-center align-self-center">
        <button className="btn btn-dark" onClick={() => alert('Cerrar sesión')}>Cerrar sesión</button>
      </div>
    </div>
  );
}

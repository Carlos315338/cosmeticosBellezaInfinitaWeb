'use client';

import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Logo" width={140} height={60} />
      </div>

      <div className="flex items-center gap-3">
        <Image
          src="/images/active-user.png"
          alt="Usuario activo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm text-gray-600">Cuenta activa:</span>
        <span className="font-semibold text-sm text-purple-900">{userName}</span>
      </div>

      <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700">
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;

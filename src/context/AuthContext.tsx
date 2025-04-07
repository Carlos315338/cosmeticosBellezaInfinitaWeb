// AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UsuarioDTO } from '@/services/clientes/clienteTypes';

interface AuthContextType {
  user: UsuarioDTO | null;
  setAuthData: (user: UsuarioDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuthData: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);

  const setAuthData = (userData: UsuarioDTO) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UsuarioDTO } from '@/services/usuarios/clienteTypes';
import { usuarioService } from '@/services/usuarios/usuarioService';
import { fetchAuthSession } from '@aws-amplify/core';

interface AuthContextType {
  user: UsuarioDTO | null;
  setAuthData: (user: UsuarioDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuthData: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);

  const setAuthData = (userData: UsuarioDTO) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {

        const session = await fetchAuthSession();
        const payload = session.tokens?.idToken?.payload;

        if (payload && payload["custom:idUser"]) {
          const usuarioLogueado = await usuarioService.obtenerPorId(payload["custom:idUser"] + "");
          console.log("user ", usuarioLogueado);
          setAuthData(usuarioLogueado); 
        }

      } catch (err) {
        console.error("Error al recuperar el usuario:", err);
        logout();
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  username: string;
  accessToken: string;
  refreshToken: string;
  setAuthData: (username: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  // Guarda datos en memoria y localStorage
  const setAuthData = (username: string, token: string, refresh: string) => {
    setUsername(username);
    setAccessToken(token);
    setRefreshToken(refresh);
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setUsername('');
    setAccessToken('');
    setRefreshToken('');
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token') || '';
    const refresh = localStorage.getItem('refresh_token') || '';
    const name = localStorage.getItem('username') || '';
    if (token) {
      setAccessToken(token);
      setRefreshToken(refresh);
      setUsername(name);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, accessToken, refreshToken, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return context;
}

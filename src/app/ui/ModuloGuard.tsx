"use client";

import { Modulo, rutasPorModulo } from "@/constants/menu";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicRoutes = ['/', '/login', '/auth', '/registro'];

export default function ModuloGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const modulosUsuario: Modulo[] = (user?.rol?.modulos || [])
    .map((mod) => mod.nombre as Modulo)
    .filter((nombre) => nombre in rutasPorModulo);

  const rutasProtegidas = modulosUsuario
    .flatMap((mod) => rutasPorModulo[mod])
    .map((ruta) => ruta.ruta)
    .concat(publicRoutes);

  useEffect(() => {
    if (!user) return;

    console.log("user", user);
    console.log("rutasProtegidas", rutasProtegidas);
    console.log("pathname", pathname);

    const tienePermiso = rutasProtegidas.includes(pathname);

    if (!tienePermiso) {
      router.push('/no-autorizado');
    } else {
      setChecking(false);
    }
  }, [pathname, user]); // asegúrate de incluir `user` como dependencia

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
}

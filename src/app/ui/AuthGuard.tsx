'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@aws-amplify/auth';
import { Modulo, rutasPorModulo } from '@/constants/menu';

const publicRoutes = ['/', '/login', '/auth', '/registro'];

const protectedModules = [
  'dashboard',
  'clientes',
  'ventas',
  'usuarios',
  'productos',
  'proveedores',
  'categorias',
  'metodos-pago',
  'reporte-ventas',
  'configuraciones',
];

const modulosUsuario: Modulo[] = protectedModules
  .map((mod) => mod as Modulo)
  .filter((nombre) => nombre in rutasPorModulo);

const rutasProtegidas = modulosUsuario
  .flatMap((mod) => rutasPorModulo[mod])
  .map((ruta) => ruta.ruta);


export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then(() => {
        if (publicRoutes.includes(pathname)) {
          router.push('/dashboard');
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        const isProtected = rutasProtegidas.some((mod) =>
          pathname.startsWith(mod)
        );

        if (isProtected) {
          router.push('/auth');
        } else {
          setChecking(false);
        }
      });
  }, [pathname]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
}

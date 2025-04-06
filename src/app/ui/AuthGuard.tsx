'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@aws-amplify/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(() => setChecking(false))
      .catch(() => {
        router.push('/auth'); // redirige si no hay sesión
      });
  }, []);

  if (checking) {
    return <div>Cargando sesión...</div>; // o spinner
  }

  return <>{children}</>;
}

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@aws-amplify/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const publicRoutes = ['/', '/auth', '/login', '/registro'];
  const privateRoutes = ['/dashboard'];

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
        if (privateRoutes.some((r) => pathname.startsWith(r))) {
          router.push('/unauthorized');
        } else {
          setChecking(false);
        }
      });
  }, [pathname]);

  return <>{children}</>;
}

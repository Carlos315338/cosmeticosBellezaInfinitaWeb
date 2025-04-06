// src/app/dashboard/layout.tsx
import { ReactNode } from 'react';
import AuthGuard from '../ui/AuthGuard';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <section>
        {children}
      </section>
    </AuthGuard>
  );
}

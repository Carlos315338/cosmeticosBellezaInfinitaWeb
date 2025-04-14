'use client';

import { ReactNode } from 'react';
import DashboardLayout from '../ui/DashboardLayout';
import ModuloGuard from '../ui/ModuloGuard';

export default function DashboardSectionLayout({ children }: { children: ReactNode }) {
  return (
    <ModuloGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ModuloGuard>
  );
}

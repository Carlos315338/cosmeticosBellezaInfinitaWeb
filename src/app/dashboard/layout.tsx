'use client';

import { ReactNode } from 'react';
import DashboardLayout from '../ui/DashboardLayout';

export default function DashboardSectionLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  );
}

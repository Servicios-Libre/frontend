'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import ClientLayoutWrapper from '@/components/layoutapp/ClientLayoutWrapper';
import { AdminProvider } from "@/context/AdminContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AdminProvider>
          <ToastProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </ToastProvider>
        </AdminProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

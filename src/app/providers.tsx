'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import ClientLayoutWrapper from '@/components/layoutapp/ClientLayoutWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

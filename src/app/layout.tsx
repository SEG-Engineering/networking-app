import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/providers/AuthProvider';
import { AuthErrorBoundary } from '@/components/auth/AuthErrorBoundary';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import { ToastProvider } from '@/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Networking App",
  description: "Professional networking contact management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider />
            <AuthErrorBoundary>
              <AuthLoadingState>
                {children}
              </AuthLoadingState>
            </AuthErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'next';
import GlobalHeader from '@/components/GlobalHeader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '아름 (Areum)',
  description: 'Areum marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-black antialiased">
        <Suspense fallback={null}>
          <GlobalHeader />
        </Suspense>
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}

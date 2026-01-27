import './globals.css';
import type { Metadata } from 'next';

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
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  );
}

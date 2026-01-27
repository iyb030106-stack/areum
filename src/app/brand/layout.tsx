import Link from 'next/link';

const NavigationItems = [
  { label: '플랫폼 소개', href: '/brand/intro' },
  { label: '입점 소개', href: '/brand/onboarding' },
  { label: '입점 문의', href: '/brand/apply' },
  { label: 'FAQ', href: '/brand/faq' },
];

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased selection:bg-blue-100 selection:text-blue-900">
      {children}

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} areum. Partner channel.</p>
        </div>
      </footer>
    </div>
  );
}

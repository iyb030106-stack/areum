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
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-7">
            <Link href="/brand" className="text-sm font-extrabold tracking-tight text-zinc-950 sm:text-base">
              Areum Partner Channel
            </Link>

            <nav className="flex max-w-[55vw] items-center gap-5 overflow-x-auto text-nowrap sm:max-w-none">
              {NavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium text-zinc-600 transition-colors hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/brand/apply"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              입점 신청
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} areum. Partner channel.</p>
        </div>
      </footer>
    </div>
  );
}

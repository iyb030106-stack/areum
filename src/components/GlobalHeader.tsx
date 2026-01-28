'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type BrandSession = {
  role: 'brand';
  brandName: string;
  email: string;
};

type UserSession = {
  role: 'user';
  nickname: string;
  email: string;
};

const BRAND_SESSION_KEY = 'areum_brand_session';
const USER_SESSION_KEY = 'areum_user_session';

export default function GlobalHeader() {
  const pathname = usePathname();
  if (pathname.startsWith('/brand')) return null;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'category' | 'brand' | 'service' | null>(null);
  const [brandSession, setBrandSession] = useState<BrandSession | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BRAND_SESSION_KEY);
      if (!raw) {
        setBrandSession(null);
      } else {
        const parsed = JSON.parse(raw) as BrandSession;
        if (parsed?.role === 'brand' && parsed.brandName) setBrandSession(parsed);
        else setBrandSession(null);
      }
    } catch (_err) {
      setBrandSession(null);
    }

    try {
      const raw = localStorage.getItem(USER_SESSION_KEY);
      if (!raw) {
        setUserSession(null);
        return;
      }
      const parsed = JSON.parse(raw) as UserSession;
      if (parsed?.role === 'user' && parsed.nickname) setUserSession(parsed);
      else setUserSession(null);
    } catch (_err) {
      setUserSession(null);
    }
  }, [pathname]);

  const toggleSection = (key: 'category' | 'brand' | 'service') => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const serviceLinks = useMemo(
    () => [
      { label: '브랜드 파트너 신청', href: '/brand' },
      { label: '커뮤니티', href: '/community' },
    ],
    []
  );

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 md:px-6">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/0 text-white transition-colors hover:bg-white/10 hover:text-sky-300"
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="shrink-0 text-lg font-black tracking-tight text-white">
            areum
          </Link>

          <div className="ml-auto flex items-center gap-2">
            {brandSession ? (
              <>
                <span className="text-sm font-black text-white">
                  {brandSession.brandName} <span className="text-white/70">파트너님</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      localStorage.removeItem(BRAND_SESSION_KEY);
                      setBrandSession(null);
                      localStorage.removeItem(USER_SESSION_KEY);
                      setUserSession(null);
                      await supabase?.auth.signOut();
                    } catch (_err) {
                      localStorage.removeItem(BRAND_SESSION_KEY);
                      setBrandSession(null);
                      localStorage.removeItem(USER_SESSION_KEY);
                      setUserSession(null);
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/0 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 hover:text-sky-300"
                >
                  로그아웃
                </button>
              </>
            ) : userSession ? (
              <>
                <span className="text-sm font-black text-white">
                  {userSession.nickname}
                  <span className="text-white/70">님 환영합니다</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      localStorage.removeItem(USER_SESSION_KEY);
                      setUserSession(null);
                      localStorage.removeItem(BRAND_SESSION_KEY);
                      setBrandSession(null);
                      await supabase?.auth.signOut();
                    } catch (_err) {
                      localStorage.removeItem(USER_SESSION_KEY);
                      setUserSession(null);
                      localStorage.removeItem(BRAND_SESSION_KEY);
                      setBrandSession(null);
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/0 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 hover:text-sky-300"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/0 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 hover:text-sky-300"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/55"
          />
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-black text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="text-base font-black tracking-tight">
                아름 <span className="text-xs font-semibold text-white/60">Areum</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/0 text-white transition-colors hover:bg-white/10 hover:text-sky-300"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-3 py-4">
              <button
                type="button"
                onClick={() => toggleSection('category')}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-white/10 hover:text-sky-300"
              >
                카테고리
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'category' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'category' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-white/10 pl-3">
                  {['상의', '하의', '아우터', '액세서리'].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="block w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-sky-300"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('brand')}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-white/10 hover:text-sky-300"
              >
                브랜드
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'brand' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'brand' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-white/10 pl-3">
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const label = `브랜드 ${idx + 1}`;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        className="block w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-sky-300"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('service')}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-white/10 hover:text-sky-300"
              >
                서비스
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'service' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'service' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-white/10 pl-3">
                  {serviceLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setDrawerOpen(false)}
                      className="block rounded-lg px-2 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10 hover:text-sky-300"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

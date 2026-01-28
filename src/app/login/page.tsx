'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type BrandSession = {
  role: 'brand';
  brandName: string;
  email: string;
};

const BRAND_SESSION_KEY = 'areum_brand_session';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brandName, setBrandName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveBrandName = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const trySelect = async (table: 'brands' | 'profiles') => {
      const { data, error: selectError } = await client
        .from(table)
        .select('brand_name')
        .eq('user_id', userId)
        .maybeSingle();

      if (selectError) throw selectError;
      return data as null | { brand_name?: string };
    };

    try {
      const data = await trySelect('brands');
      return data?.brand_name ?? null;
    } catch (_err) {
      const data = await trySelect('profiles');
      return data?.brand_name ?? null;
    }
  };

  const insertBrandProfile = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const payload = {
      user_id: userId,
      email,
      brand_name: brandName,
      owner_name: ownerName,
      phone,
      role: 'brand' as const,
    };

    const tryInsert = async (table: 'brands' | 'profiles') => {
      const { error: insertError } = await client.from(table).insert(payload);
      if (insertError) throw insertError;
    };

    try {
      await tryInsert('brands');
      return;
    } catch (_err) {
      await tryInsert('profiles');
    }
  };

  const isBrandAccount = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const trySelect = async (table: 'brands' | 'profiles') => {
      const { data, error: selectError } = await client
        .from(table)
        .select('user_id, role')
        .eq('user_id', userId)
        .maybeSingle();

      if (selectError) throw selectError;
      return data as null | { user_id?: string; role?: string };
    };

    try {
      const data = await trySelect('brands');
      if (data?.user_id) return true;
      return false;
    } catch (_err) {
      const data = await trySelect('profiles');
      if (data?.user_id && (data.role === 'brand' || data.role === 'partner')) return true;
      return Boolean(data?.user_id);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
      }

      if (mode === 'signup') {
        if (!brandName.trim() || !ownerName.trim() || !phone.trim()) {
          throw new Error('브랜드명, 대표자 이름, 연락처를 모두 입력해주세요.');
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'brand',
              brand_name: brandName,
              owner_name: ownerName,
              phone,
            },
          },
        });

        if (signUpError) throw signUpError;

        const userId = data.user?.id;
        if (userId) {
          await insertBrandProfile(userId);
          const brand = (data.user?.user_metadata as any)?.brand_name as string | undefined;
          const brandNameResolved = brand || brandName || (await resolveBrandName(userId)) || '파트너';
          const session: BrandSession = { role: 'brand', brandName: brandNameResolved, email };
          localStorage.setItem(BRAND_SESSION_KEY, JSON.stringify(session));
          router.push('/');
        } else {
          throw new Error('회원가입이 완료되었습니다. 이메일 인증 후 다시 로그인해주세요.');
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        const userId = data.user?.id;
        if (userId && (await isBrandAccount(userId))) {
          const meta = (data.user?.user_metadata as any) ?? {};
          const metaBrand = (meta.brand_name as string | undefined) ?? undefined;
          const brandNameResolved = metaBrand || (await resolveBrandName(userId)) || email.split('@')[0];
          const session: BrandSession = { role: 'brand', brandName: brandNameResolved, email };
          localStorage.setItem(BRAND_SESSION_KEY, JSON.stringify(session));
          router.push('/');
        } else {
          localStorage.removeItem(BRAND_SESSION_KEY);
          router.push('/');
        }
      }
    } catch (err) {
      if (err && typeof err === 'object') {
        const anyErr = err as Record<string, unknown>;
        const msg = typeof anyErr.message === 'string' ? anyErr.message : null;
        setError(msg || '로그인 중 오류가 발생했습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-black tracking-tight">
          {mode === 'signup' ? '회원가입' : '로그인'}
        </h1>
        <p className="mt-2 text-sm text-black/60">
          {mode === 'signup'
            ? '브랜드 파트너 계정을 생성합니다.'
            : 'Supabase Auth로 로그인합니다.'}
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold">브랜드명</span>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  placeholder="예: AREUM"
                  className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold">대표자 이름</span>
                <input
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                  placeholder="홍길동"
                  className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold">연락처</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="010-1234-5678"
                  className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </label>
            </div>
          )}

          <label className="block">
            <span className="text-sm font-bold">이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {submitting
              ? mode === 'signup'
                ? '회원가입 중...'
                : '로그인 중...'
              : mode === 'signup'
                ? '회원가입'
                : '로그인'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
            }}
            className="font-bold text-black hover:underline"
          >
            {mode === 'login' ? '회원가입(Sign Up)' : '이미 계정이 있어요(로그인)'}
          </button>
          <Link href="/" className="font-semibold text-black/60 hover:text-black">
            메인으로
          </Link>
        </div>

        <div className="mt-6 text-xs text-black/50">
          환경변수: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
        </div>
      </main>
    </div>
  );
}

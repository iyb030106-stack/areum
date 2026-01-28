'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function LoginPage() {
  const router = useRouter();
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setWelcome(params.get('welcome') === '1');
    } catch (_err) {
      setWelcome(false);
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveBrandName = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const { data, error: selectError } = await client
      .from('partners')
      .select('brand_name')
      .eq('user_id', userId)
      .maybeSingle();

    if (selectError) throw selectError;
    return (data as null | { brand_name?: string })?.brand_name ?? null;
  };

  const resolveNickname = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const { data, error: selectError } = await client
      .from('consumers')
      .select('nickname')
      .eq('user_id', userId)
      .maybeSingle();

    if (selectError) throw selectError;
    return (data as null | { nickname?: string })?.nickname ?? null;
  };

  const isBrandAccount = async (userId: string) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const { data, error: selectError } = await client
      .from('partners')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (selectError) throw selectError;
    const row = data as null | { user_id?: string };
    return Boolean(row?.user_id);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
      }

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
        localStorage.removeItem(USER_SESSION_KEY);
        router.push('/');
      } else {
        const meta = (data.user?.user_metadata as any) ?? {};
        const metaNick = (meta.nickname as string | undefined) ?? undefined;
        const nicknameResolved = metaNick || (userId ? await resolveNickname(userId) : null) || email.split('@')[0];
        const session: UserSession = { role: 'user', nickname: nicknameResolved, email };
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
        localStorage.removeItem(BRAND_SESSION_KEY);
        router.push('/');
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
        <h1 className="text-2xl font-black tracking-tight">로그인</h1>
        <p className="mt-2 text-sm text-black/60">Supabase Auth로 로그인합니다.</p>

        {welcome && (
          <div className="mt-6 border border-black/15 bg-white px-4 py-3 text-sm font-black text-black">
            아름의 파트너가 되신 것을 환영합니다!
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/signup" className="font-bold text-black hover:underline">
            소비자 회원가입
          </Link>
          <Link href="/brand/apply" className="font-bold text-black hover:underline">
            브랜드 입점 신청
          </Link>
        </div>

        <div className="mt-6 text-xs text-black/50">
          환경변수: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
        </div>
      </main>
    </div>
  );
}

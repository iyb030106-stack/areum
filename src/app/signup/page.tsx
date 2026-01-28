'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailOk = useMemo(() => isValidEmail(email), [email]);

  const passwordOk = useMemo(() => password.length >= 8, [password]);

  const passwordMatch = useMemo(() => password === passwordConfirm, [password, passwordConfirm]);

  const canSubmit = useMemo(() => {
    const common = Boolean(phone.trim()) && Boolean(nickname.trim());
    if (!common) return false;
    return emailOk && passwordOk && passwordMatch;
  }, [phone, nickname, emailOk, passwordOk, passwordMatch]);

  const insertProfile = async (userId: string, payload: Record<string, unknown>) => {
    if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
    const client = supabase;

    const tryInsert = async (table: 'profiles' | 'users') => {
      const { error: insertError } = await client.from(table).insert({ user_id: userId, ...payload });
      if (insertError) throw insertError;
    };

    try {
      await tryInsert('profiles');
      return;
    } catch (_err) {
      try {
        await tryInsert('users');
      } catch (_err2) {
        // If neither table exists, ignore profile insert.
      }
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) return;

    try {
      setSubmitting(true);

      if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'USER',
            nickname,
            phone,
          },
        },
      });

      if (signUpError) throw signUpError;

      const userId = data.user?.id;
      if (!userId) {
        throw new Error('회원가입이 완료되었습니다. 이메일 인증 후 다시 로그인해주세요.');
      }

      await insertProfile(userId, {
        email,
        role: 'USER',
        nickname,
        phone,
      });

      router.push('/login?welcome=1');
    } catch (err) {
      if (err && typeof err === 'object') {
        const anyErr = err as Record<string, unknown>;
        const msg = typeof anyErr.message === 'string' ? anyErr.message : null;
        setError(msg || '회원가입 중 오류가 발생했습니다.');
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-black tracking-tight">회원가입</h1>
        <p className="mt-2 text-sm text-black/60">계정 정보를 입력해주세요.</p>

        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold">이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="you@example.com"
            />
            {!emailOk && <p className="mt-2 text-xs font-bold text-red-600">이메일 형식이 올바르지 않습니다.</p>}
          </label>

          <label className="block">
            <span className="text-sm font-bold">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="8자 이상"
            />
            {!passwordOk && <p className="mt-2 text-xs font-bold text-red-600">비밀번호는 8자 이상이어야 합니다.</p>}
          </label>

          <label className="block">
            <span className="text-sm font-bold">비밀번호 확인</span>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="비밀번호 재입력"
            />
            {!passwordMatch && (
              <p className="mt-2 text-xs font-bold text-red-600">비밀번호가 일치하지 않습니다.</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-bold">휴대폰 번호</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="010-1234-5678"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold">닉네임</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="닉네임"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-2 h-12 w-full border border-black bg-black px-5 text-sm font-black text-white transition-colors disabled:opacity-60"
          >
            {submitting ? '처리 중...' : '회원가입 완료'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/login" className="font-bold text-black hover:underline">
            로그인으로
          </Link>
          <Link href="/" className="font-semibold text-black/60 hover:text-black">
            메인으로
          </Link>
        </div>
      </main>
    </div>
  );
}

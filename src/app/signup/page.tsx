'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Role = 'USER' | 'PARTNER';

const normalizeBrandSlug = (brandName: string) =>
  brandName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('USER');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  const [brandName, setBrandName] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const derivedPartner = useMemo(() => {
    const slug = normalizeBrandSlug(brandName);
    if (!slug) return { slug: '', email: '', password: '' };
    return {
      slug,
      email: `${slug}@areum.com`,
      password: `${slug}2026`,
    };
  }, [brandName]);

  useEffect(() => {
    if (role === 'PARTNER') {
      setEmail(derivedPartner.email);
      setPassword(derivedPartner.password);
      setPasswordConfirm(derivedPartner.password);
    }
  }, [role, derivedPartner.email, derivedPartner.password]);

  const emailOk = useMemo(() => {
    if (role === 'PARTNER') return Boolean(derivedPartner.email);
    return isValidEmail(email);
  }, [role, email, derivedPartner.email]);

  const passwordOk = useMemo(() => {
    if (role === 'PARTNER') return Boolean(password) && password.length >= 8;
    return password.length >= 8;
  }, [role, password]);

  const passwordMatch = useMemo(() => password === passwordConfirm, [password, passwordConfirm]);

  const canSubmit = useMemo(() => {
    const common = Boolean(name.trim()) && Boolean(phone.trim()) && Boolean(nickname.trim());
    if (!common) return false;

    if (role === 'PARTNER') {
      return Boolean(brandName.trim()) && emailOk && passwordOk && passwordMatch;
    }

    return emailOk && passwordOk && passwordMatch;
  }, [role, name, phone, nickname, brandName, emailOk, passwordOk, passwordMatch]);

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

      if (role === 'PARTNER') {
        if (!derivedPartner.slug) throw new Error('브랜드명을 입력해주세요.');

        const resp = await fetch('/api/brand/provision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName, managerName: name, contact: phone }),
        });

        const json = (await resp.json().catch(() => null)) as null | {
          email?: string;
          password?: string;
          existed?: boolean;
          error?: string;
        };

        if (!resp.ok) {
          throw new Error(json?.error || '파트너 계정 생성에 실패했습니다.');
        }

        router.push('/login?welcome=1');
        return;
      }

      if (!supabase) throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'user',
            nickname,
            name,
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
        role: 'user',
        nickname,
        name,
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

        <div className="mt-6 border border-black/15 bg-white p-3">
          <p className="text-xs font-black text-black/60">계정 유형</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('USER')}
              className={`h-11 border px-3 text-sm font-bold transition-colors ${
                role === 'USER' ? 'border-black bg-black text-white' : 'border-black/15 bg-white text-black'
              }`}
            >
              소비자(USER)
            </button>
            <button
              type="button"
              onClick={() => setRole('PARTNER')}
              className={`h-11 border px-3 text-sm font-bold transition-colors ${
                role === 'PARTNER'
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 bg-white text-black'
              }`}
            >
              브랜드(PARTNER)
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {role === 'PARTNER' && (
            <label className="block">
              <span className="text-sm font-bold">브랜드명</span>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
                placeholder="예: AREUM"
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm font-bold">이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={role === 'PARTNER'}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black disabled:bg-black/5"
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
              disabled={role === 'PARTNER'}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black disabled:bg-black/5"
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
              disabled={role === 'PARTNER'}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black disabled:bg-black/5"
              placeholder="비밀번호 재입력"
            />
            {!passwordMatch && (
              <p className="mt-2 text-xs font-bold text-red-600">비밀번호가 일치하지 않습니다.</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-bold">이름</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full border border-black/15 px-4 text-sm font-semibold outline-none focus:border-black"
              placeholder="홍길동"
            />
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

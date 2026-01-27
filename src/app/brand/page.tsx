'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const HeroContent = {
  backgroundImageUrl:
    'https://images.unsplash.com/photo-1520975958225-67d81d79b21b?auto=format&fit=crop&w=2400&q=80',
  headline: '아름과 함께 새로운 패션 생태계를 만듭니다',
  description:
    '브랜드의 가치가 더 멀리, 더 정확하게 전달되도록. Areum Partner Channel은 브랜드 성장에 필요한 운영·데이터·마케팅 접점을 하나로 연결합니다.',
};

const NavigationItems = [
  { label: '플랫폼 소개', href: '#platform' },
  { label: '입점 소개', href: '#onboarding' },
  { label: '입점 문의', href: '#apply' },
  { label: 'FAQ', href: '#faq' },
];

export default function BrandPage() {
  const [brandName, setBrandName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
      }

      const composedMessage = [
        managerName ? `담당자 이름: ${managerName}` : null,
        website ? `브랜드 웹사이트: ${website}` : null,
        message ? `메시지: ${message}` : null,
      ]
        .filter(Boolean)
        .join('\n\n');

      const { error: insertError } = await supabase.from('brand_applications').insert({
        brand_name: brandName,
        contact,
        category: website,
        message: composedMessage,
      });

      if (insertError) {
        throw insertError;
      }

      setSuccessOpen(true);
      setBrandName('');
      setManagerName('');
      setContact('');
      setWebsite('');
      setMessage('');
    } catch (err) {
      if (err && typeof err === 'object') {
        const anyErr = err as Record<string, unknown>;
        const msg = typeof anyErr.message === 'string' ? anyErr.message : null;
        const details = typeof anyErr.details === 'string' ? anyErr.details : null;
        const hint = typeof anyErr.hint === 'string' ? anyErr.hint : null;
        const combined = [msg, details, hint].filter(Boolean).join('\n');
        setError(combined || '신청 처리 중 오류가 발생했습니다.');
      } else {
        setError('신청 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

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
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium text-zinc-600 hover:text-zinc-950"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              입점 신청
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroContent.backgroundImageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />

          <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">AREUM PARTNER CHANNEL</p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl">
                {HeroContent.headline}
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-zinc-700 sm:text-base">{HeroContent.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  입점 신청
                </a>
                <a
                  href="#platform"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  플랫폼 소개 보기
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">PLATFORM</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">플랫폼 소개</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                브랜드가 운영에 집중할 수 있도록, 파트너 온보딩부터 상품 운영, 노출, 데이터 리포트까지 일관된 파트너 경험을
                제공합니다.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <p className="text-sm font-semibold text-zinc-950">브랜드 운영 지원</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    입점 후 운영에 필요한 정책/정산/CS 흐름을 단순화해, 브랜드의 리소스를 아낍니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <p className="text-sm font-semibold text-zinc-950">클린한 B2B UI</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    필요한 정보를 빠르게 찾을 수 있도록, 섹션 단위로 정리된 파트너 전용 구조를 제공합니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <p className="text-sm font-semibold text-zinc-950">데이터 인사이트</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    고객 반응과 운영 결과를 기반으로 다음 상품 전략을 더 빠르게 결정할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <p className="text-sm font-semibold text-zinc-950">성장 파트너십</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                    프로모션/캠페인 등 성장 단계별 협업 옵션을 유연하게 설계합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="onboarding" className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">ONBOARDING</p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">입점 소개</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  입점 신청부터 검토, 계약, 상품 등록까지 단계별로 안내드립니다.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-xs font-semibold text-zinc-500">STEP 1</p>
                    <p className="mt-2 text-sm font-semibold text-zinc-950">입점 신청</p>
                    <p className="mt-2 text-sm text-zinc-700">기본 정보와 운영 희망사항을 남겨주세요.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-xs font-semibold text-zinc-500">STEP 2</p>
                    <p className="mt-2 text-sm font-semibold text-zinc-950">검토 & 안내</p>
                    <p className="mt-2 text-sm text-zinc-700">내부 검토 후 담당자가 빠르게 연락드립니다.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-xs font-semibold text-zinc-500">STEP 3</p>
                    <p className="mt-2 text-sm font-semibold text-zinc-950">상품 운영 시작</p>
                    <p className="mt-2 text-sm text-zinc-700">상품 등록 및 운영 프로세스를 시작합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">CONTACT</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">입점 문의</h2>
                <p className="mt-2 text-sm text-zinc-700">아래 폼을 남겨주시면 확인 후 빠르게 연락드리겠습니다.</p>
              </div>
              <div className="text-xs font-medium text-zinc-500">저장: Supabase brand_applications</div>
            </div>

            {error && (
              <div className="mt-6 whitespace-pre-line rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-zinc-900">브랜드명</span>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="브랜드명"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-zinc-900">담당자 이름</span>
                <input
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  required
                  className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="홍길동"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-zinc-900">연락처</span>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="전화번호 / 이메일"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-zinc-900">브랜드 웹사이트</span>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="https://"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-semibold text-zinc-900">메시지</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="보유 재고/입점 희망 방식/희망 일정 등을 자유롭게 남겨주세요"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? '전송 중...' : '입점 문의 제출'}
              </button>
            </form>
          </div>
        </section>

        <section id="faq" className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">FAQ</p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">자주 묻는 질문</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  빠른 확인을 위해 핵심 질문을 정리했습니다. 자세한 내용은 문의로 남겨주세요.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold text-zinc-950">입점 심사는 얼마나 걸리나요?</p>
                    <p className="mt-2 text-sm text-zinc-700">신청 내용 확인 후 담당자가 연락드립니다.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold text-zinc-950">어떤 브랜드가 적합한가요?</p>
                    <p className="mt-2 text-sm text-zinc-700">
                      브랜드의 운영 방식과 상품 특성에 따라 맞춤 제안을 드립니다.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold text-zinc-950">협업 범위는 어떻게 정하나요?</p>
                    <p className="mt-2 text-sm text-zinc-700">
                      입점 후 목표에 맞춰 운영/프로모션 옵션을 조율합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <button
            onClick={() => setSuccessOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close modal"
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-7 shadow-2xl sm:p-8">
            <button
              onClick={() => setSuccessOpen(false)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950">문의가 접수되었습니다.</h3>
                <p className="mt-2 text-sm text-zinc-700">
                  남겨주신 내용은 확인 후 빠르게 연락드리겠습니다.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSuccessOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} areum. Partner channel.</p>
        </div>
      </footer>
    </div>
  );
}

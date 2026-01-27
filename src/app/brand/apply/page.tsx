'use client';

import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function BrandApplyPage() {
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
    <main>
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">CONTACT</p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">입점 문의</h1>
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
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-blue-700"
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
                <p className="mt-2 text-sm text-zinc-700">남겨주신 내용은 확인 후 빠르게 연락드리겠습니다.</p>
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
    </main>
  );
}

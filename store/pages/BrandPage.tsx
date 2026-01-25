import React, { useMemo, useState } from 'react';
import { BarChart3, CheckCircle2, Handshake, MessageSquareText, Phone, Store, Users } from 'lucide-react';
import { supabase } from '../supabaseClient';

const BrandPage: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chartData = useMemo(
    () => [
      { label: '노출', value: 92 },
      { label: '관심', value: 68 },
      { label: '찜', value: 41 },
      { label: '대여', value: 24 },
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
      }

      const { error: insertError } = await supabase.from('brand_applications').insert({
        brand_name: brandName,
        contact,
        category,
        message,
      });

      if (insertError) {
        throw insertError;
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '신청 처리 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-stone-200 p-8">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-2xl bg-green-100 text-green-700">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">입점 신청이 접수되었습니다</h1>
            <p className="mt-2 text-sm text-stone-600">담당자가 확인 후 빠르게 연락드릴게요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-stone-900 text-white p-8 md:p-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold">
            <Handshake size={16} />
            <span>Brand Partnership</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            재고를 마케팅 자산으로 바꾸세요
          </h1>
          <p className="mt-4 text-white/75">
            대여 데이터를 통해 고객 반응을 빠르게 검증하고, 다음 생산/판매 전략에 바로 활용할 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 inline-flex items-center gap-2">
              <Users size={18} />
              <span className="text-sm font-semibold">신규 고객 접점</span>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 inline-flex items-center gap-2">
              <Store size={18} />
              <span className="text-sm font-semibold">오프라인 체험 확대</span>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 inline-flex items-center gap-2">
              <BarChart3 size={18} />
              <span className="text-sm font-semibold">리포트 제공</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">체험 데이터 리포트 예시</h2>
            <p className="mt-2 text-sm text-stone-600">대여/관심/노출 지표를 한 눈에 볼 수 있도록 제공합니다.</p>
          </div>
          <span className="text-xs font-semibold rounded-full bg-stone-100 px-3 py-2 text-stone-600">
            예시 데이터
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {chartData.map((d) => (
            <div key={d.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-700">{d.label}</p>
              <div className="mt-3 h-24 rounded-2xl bg-white border border-stone-200 flex items-end overflow-hidden">
                <div
                  className="w-full bg-orange-500/90"
                  style={{ height: `${d.value}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-stone-600">{d.value}%</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">간편 입점 신청</h2>
            <p className="mt-2 text-sm text-stone-600">
              아래 폼을 남겨주시면 24시간 내 연락드립니다.
            </p>
          </div>
          <div className="text-xs font-semibold text-stone-500">저장: Supabase brand_applications</div>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
              <Store size={16} />
              브랜드명
            </span>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
              placeholder="브랜드명"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
              <Phone size={16} />
              담당자 연락처
            </span>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
              placeholder="전화번호 / 이메일"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-stone-700">의류 카테고리</span>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
              placeholder="예: 드레스, 아우터, 셋업"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
              <MessageSquareText size={16} />
              메시지
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
              placeholder="보유 재고/입점 희망 방식/희망 일정 등을 자유롭게 남겨주세요"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <Handshake size={16} />
            {submitting ? '전송 중...' : '입점 신청 제출'}
          </button>

          <p className="md:col-span-2 text-xs text-stone-500">
            Supabase Row Level Security 정책에 따라 insert 권한이 필요합니다.
          </p>
        </form>
      </section>
    </div>
  );
};

export default BrandPage;

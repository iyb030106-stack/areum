import React, { useMemo, useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, Crown, Sparkles, TrendingUp, X } from 'lucide-react';
import { supabase } from './store/supabaseClient';

type DashboardMetric = {
  label: string;
  value: number;
  unit: string;
  delta: string;
};

// --- Helper components for interactive stats ---
function MetricCard({ metric }: { metric: DashboardMetric }) {
  const [displayValue, setDisplayValue] = useState(0);
  const target = metric.value;

  React.useEffect(() => {
    const duration = 1600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOut * target));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <div className="group rounded-2xl border border-white/10 bg-[#1A1A1A]/60 p-5 transition-transform hover:scale-[1.02] hover:border-[#C59A6D]/30">
      <p className="text-xs font-semibold text-stone-200/70">{metric.label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl font-bold text-stone-50 sm:text-3xl">
          {displayValue}
          <span className="ml-1 text-sm font-semibold text-stone-200/70 sm:text-base">{metric.unit}</span>
        </p>
        <p className="text-xs font-semibold text-[#C59A6D]">{metric.delta}</p>
      </div>
    </div>
  );
}

function InteractiveBar({ label, value }: { label: string; value: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex-1">
      <div className="h-44 rounded-2xl bg-white/5 p-2 flex items-end">
        <div
          className="w-full rounded-xl bg-gradient-to-t from-[#C59A6D] to-[#D4AF37] transition-all duration-500 ease-out"
          style={{ height: hovered ? `${Math.min(value + 8, 100)}%` : `${value}%` }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-stone-200/70">{label}</p>
    </div>
  );
}

const AppStore: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const metrics: DashboardMetric[] = useMemo(
    () => [
      { label: '재대여율', value: 42, unit: '%', delta: '+6.2' },
      { label: '구매 전환율', value: 9.4, unit: '%', delta: '+1.1' },
      { label: '평균 만족도', value: 4.7, unit: '/5', delta: '+0.3' },
      { label: '핏 매칭 정확도', value: 91, unit: '%', delta: '+4.8' },
    ],
    []
  );

  const bars = useMemo(
    () => [
      { label: '20-22', value: 78 },
      { label: '23-25', value: 92 },
      { label: '26-28', value: 64 },
      { label: '29+', value: 38 },
    ],
    []
  );

  const scrollToForm = () => {
    const el = document.getElementById('partner-form');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    <div className="min-h-screen bg-[#1A1A1A] text-stone-100 antialiased selection:bg-[#C59A6D]/30 selection:text-[#D4AF37]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#C59A6D]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#1A1A1A]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C59A6D]/40 bg-white/5 text-[#D4AF37]">
              <Crown size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#C59A6D]">AREUM PARTNERS</p>
              <p className="text-sm font-semibold text-stone-100">브랜드 파트너 입점</p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#1A1A1A] hover:bg-[#C59A6D] transition-colors"
          >
            <span>입점 문의하기</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[#C59A6D]">
                <Sparkles size={14} />
                <span>Premium brand partnership</span>
              </div>

              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-stone-50 sm:text-4xl md:text-5xl">
                당신의 브랜드, 다음 세대의 일상이 되다
              </h1>
              <p className="mt-4 text-base font-semibold text-[#D4AF37] sm:text-lg">
                재고를 넘어 자산으로, 단순 노출을 넘어 데이터 인사이트로.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-stone-200/80 sm:text-base">
                아름은 브랜드의 미학을 대학생의 일상 속으로 가장 깊숙이 전달합니다. 단순히 옷을 빌려주는 것을 넘어,
                실착 고객의 체형 데이터와 핏 만족도, 그리고 실제 구매 전환으로 이어지는 프리미엄 데이터를 경험하세요.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#1A1A1A] hover:bg-[#C59A6D] transition-colors sm:px-6 sm:py-3 sm:text-sm"
                >
                  파트너 시작하기
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#data-preview"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-stone-50 hover:border-[#C59A6D]/60 hover:text-[#D4AF37] transition-colors sm:px-6 sm:py-3 sm:text-sm"
                >
                  데이터 미리보기
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-[#C59A6D]">PARTNER SNAPSHOT</p>
                  <h2 className="mt-3 text-xl font-bold text-stone-50 md:text-2xl">브랜드 경험을 숫자로 설계하세요</h2>
                  <p className="mt-3 text-sm text-stone-200/80">
                    체형·핏·반응 데이터를 한 번에 확인하고 다음 컬렉션 전략을 더 빠르게 결정합니다.
                  </p>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#C59A6D]/30 bg-[#D4AF37]/10 text-[#D4AF37] md:flex">
                  <BarChart3 size={20} />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {metrics.map((m) => (
                  <MetricCard key={m.label} metric={m} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <TrendingUp size={18} />
              </div>
              <h3 className="mt-5 text-base font-bold text-stone-50 sm:text-lg">데이터 기반 고객 인사이트</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-200/80">
                실착 고객의 체형·핏 만족도와 반응 지표를 빠르게 수집해, 다음 상품 기획을 정교하게 만듭니다.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="mt-5 text-base font-bold text-stone-50 sm:text-lg">새로운 구매 전환 기회</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-200/80">
                대여 후 구매로 이어지는 전환 데이터를 제공해, 판매 전략과 프로모션을 더욱 효과적으로 설계합니다.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Crown size={18} />
              </div>
              <h3 className="mt-5 text-base font-bold text-stone-50 sm:text-lg">브랜드 홍보 효과</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-200/80">
                대학생 라이프스타일 속에서 자연스럽게 노출되고, 재대여를 통해 반복적으로 브랜드 경험이 축적됩니다.
              </p>
            </div>
          </div>
        </section>

        <section id="data-preview" className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/6 to-white/0 p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-[#C59A6D]">DATA PREVIEW</p>
                <h2 className="mt-4 text-xl font-bold text-stone-50 md:text-2xl">데이터, 그 이상의 가치</h2>
                <p className="mt-3 max-w-xl text-sm text-stone-200/80">
                  연령대별 선호도, 재대여율, 구매 전환율 등 주요 지표를 한 화면에서 확인할 수 있는 대시보드를 제공합니다.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#1A1A1A]/70 px-4 py-3 text-xs font-semibold text-stone-200/70">
                예시 데이터
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#1A1A1A]/70 p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-stone-50">연령대별 선호도</p>
                  <p className="text-xs font-semibold text-stone-200/60">최근 30일</p>
                </div>
                <div className="mt-6 flex items-end gap-3">
                  {bars.map((b) => (
                    <InteractiveBar key={b.label} label={b.label} value={b.value} />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#1A1A1A]/70 p-6">
                <p className="text-sm font-semibold text-stone-50">핵심 지표</p>
                <div className="mt-6 space-y-4">
                  {metrics.slice(0, 3).map((m) => (
                    <MetricCard key={m.label} metric={m} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partner-form" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-[#C59A6D]">CALL TO ACTION</p>
                <h2 className="mt-4 text-xl font-bold text-stone-50 md:text-2xl">파트너 문의</h2>
                <p className="mt-3 text-sm text-stone-200/80">아래 폼을 남겨주시면 24시간 내 연락드립니다.</p>
              </div>
              <div className="text-xs font-semibold text-stone-200/60">저장: Supabase brand_applications</div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100 whitespace-pre-line">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-100">브랜드명</span>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#D4AF37]/70"
                  placeholder="브랜드명"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-100">담당자 이름</span>
                <input
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  required
                  className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#D4AF37]/70"
                  placeholder="홍길동"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-100">연락처</span>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#D4AF37]/70"
                  placeholder="전화번호 / 이메일"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-100">브랜드 웹사이트</span>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#D4AF37]/70"
                  placeholder="https://"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-bold text-stone-100">메시지</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-[#D4AF37]/70"
                  placeholder="보유 재고/입점 희망 방식/희망 일정 등을 자유롭게 남겨주세요"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-4 text-sm font-bold text-[#1A1A1A] hover:bg-[#C59A6D] disabled:opacity-60 disabled:cursor-not-allowed transition-colors sm:px-6 sm:py-4 sm:text-sm"
              >
                <span>{submitting ? '전송 중...' : '입점 문의 제출'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>

      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <button
            onClick={() => setSuccessOpen(false)}
            className="absolute inset-0 bg-black/70"
            aria-label="Close modal"
          />
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#111111] p-8 shadow-2xl">
            <button
              onClick={() => setSuccessOpen(false)}
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 hover:text-[#D4AF37] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-50">귀한 발걸음 감사합니다. 곧 연락드리겠습니다.</h3>
                <p className="mt-3 text-sm text-stone-200/80">
                  남겨주신 문의는 내부 검토 후 빠르게 연락드릴게요.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSuccessOpen(false)}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#1A1A1A] hover:bg-[#C59A6D] transition-colors sm:px-5 sm:py-3 sm:text-sm"
              >
                확인
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-white/10 bg-[#1A1A1A]/70">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs text-stone-200/60">© {new Date().getFullYear()} areum. Brand partnership landing.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppStore;


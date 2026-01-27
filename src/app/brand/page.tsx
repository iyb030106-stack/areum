import Link from 'next/link';

const heroImageUrl =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80';

const benefits = [
  {
    title: '데이터 기반 운영',
    body: '대여/구매 전환, 인기 상품, 고객 행동 데이터를 한 화면에서 확인합니다.',
  },
  {
    title: '브랜드 노출 강화',
    body: '배너/큐레이션/랭킹 등 주요 노출 슬롯으로 신규 고객을 확보합니다.',
  },
  {
    title: '정산/정책 지원',
    body: '정산 프로세스와 운영 정책을 표준화해 리소스를 최소화합니다.',
  },
  {
    title: '파트너 전용 지원',
    body: '입점부터 상품 등록까지 단계별 체크리스트로 빠르게 온보딩합니다.',
  },
];

const steps = [
  { id: '01', label: '입점 신청서 작성' },
  { id: '02', label: '입점 심사' },
  { id: '03', label: '파트너 계정 발급' },
];

const progress = ['접수', '심사', '자료등록', '입점 준비', '입점 완료'];

export default function BrandPage() {
  const activeStep = 1;
  const activeProgress = 1;

  return (
    <main className="bg-white text-black">
      <section className="border-b border-black/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-black/60">AREUM PARTNER CHANNEL</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-5xl">
              대한민국 No.1 패션 공유 플랫폼 아름 파트너가 되어보세요.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-black/70 sm:text-base">
              입점 신청부터 심사, 계정 발급까지 표준 프로세스로 빠르게 온보딩합니다.
            </p>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                href="/brand/apply"
                className="inline-flex items-center justify-center border border-black bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black"
              >
                입점 신청
              </Link>
              <Link
                href="/brand/intro"
                className="inline-flex items-center justify-center border border-black/20 bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                플랫폼 소개 보기
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden border border-black/15 bg-black/5">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }} />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight">입점 혜택</h2>
          <div className="text-xs font-bold text-black/50">BENEFITS</div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="border border-black/15 bg-white p-5">
              <p className="text-sm font-black">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-xl font-black tracking-tight">입점 프로세스</h2>
          <p className="mt-3 text-sm text-black/70">
            제출해 주신 정보를 기반으로 입점 적합성을 검토합니다. 심사 후 입점 가능 여부를 안내해 드립니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {steps.map((s, idx) => {
              const active = idx === activeStep;
              return (
                <div
                  key={s.id}
                  className={`inline-flex items-center gap-2 border px-5 py-3 text-sm font-black transition-colors ${
                    active
                      ? 'border-black bg-black text-white'
                      : 'border-black/20 bg-white text-black hover:border-black hover:bg-black hover:text-white'
                  }`}
                >
                  <span className="text-xs font-black">{s.id}</span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-10 border border-black/15 bg-white p-8">
            <p className="text-center text-sm font-black">스토어 입점 진행현황</p>

            <div className="relative mt-6">
              <div className="absolute left-0 right-0 top-3 h-px bg-black/15" />
              <div className="relative flex items-start justify-between gap-2">
                {progress.map((label, idx) => {
                  const done = idx <= activeProgress;
                  return (
                    <div key={label} className="flex min-w-0 flex-1 flex-col items-center">
                      <div
                        className={`flex h-6 w-6 items-center justify-center border text-[11px] font-black ${
                          done ? 'border-black bg-black text-white' : 'border-black/15 bg-white text-black/40'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className={`mt-2 text-xs font-bold ${done ? 'text-black' : 'text-black/40'}`}>
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border border-black/10 bg-white p-6">
              <p className="text-center text-sm font-black">제공하신 귀사의 정보를 기반으로</p>
              <p className="mt-1 text-center text-sm font-black">입점 심사 중입니다</p>
              <p className="mt-4 text-center text-sm text-black/70">
                영업일 기준 약 2일 ~ 7일 정도 소요됩니다.
              </p>
              <p className="mt-2 text-center text-sm text-black/70">
                빠른 입점을 위해 자료를 미리 준비해 주세요.
              </p>

              <div className="mt-6 border-t border-black/10 pt-5 text-sm text-black/70">
                <p className="font-black text-black">미리 준비해 주세요!</p>
                <div className="mt-2 space-y-1">
                  <p>- 사업자등록증 사본</p>
                  <p>- 통신판매업 신고증 사본</p>
                  <p>- 정산 정보</p>
                  <p>- 브랜드 로고/이미지</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

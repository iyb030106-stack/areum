import Link from 'next/link';

const HeroContent = {
  backgroundImageUrl:
    'https://images.unsplash.com/photo-1520975958225-67d81d79b21b?auto=format&fit=crop&w=2400&q=80',
  headline: '아름과 함께 새로운 패션 생태계를 만듭니다',
  description:
    'Areum Partner Channel은 브랜드 성장에 필요한 운영·데이터·마케팅 접점을 하나로 연결합니다.',
};

const Cards = [
  {
    title: '플랫폼 소개',
    description: '파트너 전용 운영·데이터·마케팅 접점을 한 번에 확인하세요.',
    href: '/brand/intro',
  },
  {
    title: '입점 소개',
    description: '입점 신청부터 상품 운영 시작까지 단계별로 안내합니다.',
    href: '/brand/onboarding',
  },
  {
    title: '입점 문의',
    description: '폼을 작성하면 Supabase brand_applications로 저장됩니다.',
    href: '/brand/apply',
  },
  {
    title: 'FAQ',
    description: '자주 묻는 질문을 빠르게 확인할 수 있어요.',
    href: '/brand/faq',
  },
];

export default function BrandPage() {
  return (
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
              <Link
                href="/brand/apply"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                입점 신청
              </Link>
              <Link
                href="/brand/intro"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                플랫폼 소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {Cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-blue-200 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-zinc-950 transition-colors group-hover:text-blue-800">
                {c.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 transition-colors group-hover:text-blue-900">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

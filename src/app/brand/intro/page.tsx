export default function BrandIntroPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">PLATFORM</p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">플랫폼 소개</h1>
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
    </main>
  );
}

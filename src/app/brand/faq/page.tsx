export default function BrandFaqPage() {
  return (
    <main>
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">FAQ</p>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">자주 묻는 질문</h1>
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
                  <p className="mt-2 text-sm text-zinc-700">입점 후 목표에 맞춰 운영/프로모션 옵션을 조율합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BrandOnboardingPage() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-600">ONBOARDING</p>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">입점 소개</h1>
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
    </main>
  );
}

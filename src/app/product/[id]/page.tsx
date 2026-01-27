import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="text-lg font-black tracking-tight">
            아름
            <span className="ml-1 text-xs font-semibold text-black/60">Areum</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-black/60 hover:text-black">
            돌아가기
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-[3/4] rounded-2xl bg-black/5" />

          <div>
            <div className="inline-flex items-center rounded-md bg-black px-2 py-1 text-[11px] font-bold text-white">
              3일 대여
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight">상품 상세 (기본 틀)</h1>
            <p className="mt-2 text-sm text-black/70">product id: {params.id}</p>

            <div className="mt-8 space-y-3 text-sm text-black/80">
              <p>여기에 브랜드명, 상품명, 가격, 옵션, 대여/구매 CTA를 붙이면 돼.</p>
              <p>다음 단계에서 데이터 연동(서버/DB/API)을 붙여 확장 가능.</p>
            </div>

            <div className="mt-10 flex gap-3">
              <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white">
                대여하기
              </button>
              <button className="rounded-xl border border-black/15 px-5 py-3 text-sm font-bold text-black">
                장바구니
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

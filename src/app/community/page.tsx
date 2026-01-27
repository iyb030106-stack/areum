import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="text-lg font-black tracking-tight">
            아름
            <span className="ml-1 text-xs font-semibold text-black/60">Areum</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-black/60 transition-colors hover:text-sky-700">
            홈
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h1 className="text-2xl font-black tracking-tight">커뮤니티</h1>
        <p className="mt-3 text-sm text-black/60">준비 중입니다.</p>
      </main>
    </div>
  );
}

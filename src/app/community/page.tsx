import { Suspense } from 'react';
import CommunityClient from './CommunityClient';

export default function CommunityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-black">
          <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
            <h1 className="text-2xl font-black tracking-tight">커뮤니티</h1>
            <p className="mt-3 text-sm text-black/60">불러오는 중…</p>
          </main>
        </div>
      }
    >
      <CommunityClient />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { products as defaultProducts } from '@/data/products';
import type { Product } from '@/types/product';

const formatKRW = (value: number) =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);

export default function Page() {
  const products: Product[] = useMemo(() => defaultProducts, []);

  const banners = useMemo(
    () => [
      {
        id: 'b1',
        title: 'LENOVA TECHWEAR DROP',
        subtitle: '도심을 위한 기능성, 오늘의 룩을 완성',
        imageUrl:
          'https://images.unsplash.com/photo-1520975958221-ecdc0f2b36f4?auto=format&fit=crop&w=1800&q=80',
      },
      {
        id: 'b2',
        title: '3일 대여, 더 가볍게',
        subtitle: '입어보고 결정하는 새로운 쇼핑 방식',
        imageUrl:
          'https://images.unsplash.com/photo-1520975661597-171c1d3d0d6e?auto=format&fit=crop&w=1800&q=80',
      },
      {
        id: 'b3',
        title: '무신사 감성, 아름의 방식',
        subtitle: '미니멀한 UI로 더 빠르게 탐색',
        imageUrl:
          'https://images.unsplash.com/photo-1520975691759-54a9556eab8e?auto=format&fit=crop&w=1800&q=80',
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => window.clearInterval(t);
  }, [banners.length]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.brand.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="shrink-0 text-lg font-black tracking-tight">
            아름
            <span className="ml-1 text-xs font-semibold text-black/60">Areum</span>
          </Link>

          <div className="flex-1">
            <div className="flex items-center rounded-full border border-black/15 bg-white px-4 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="상품, 브랜드 검색"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
              />
            </div>
          </div>

          <div className="flex items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-bold hover:bg-black/5"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6">
        <section className="relative overflow-hidden rounded-2xl bg-black">
          <div className="relative h-[340px] md:h-[420px]">
            {banners.map((b, idx) => (
              <div
                key={b.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === active ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${b.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

                <div className="relative z-10 flex h-full items-end p-6 md:p-10">
                  <div>
                    <p className="text-xs font-bold tracking-[0.3em] text-white/80">FEATURED</p>
                    <h2 className="mt-3 text-2xl font-black text-white md:text-4xl">{b.title}</h2>
                    <p className="mt-3 max-w-xl text-sm font-semibold text-white/85 md:text-base">
                      {b.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-6 z-20 flex gap-2">
              {banners.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setActive(idx)}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    idx === active ? 'bg-white' : 'bg-white/35'
                  }`}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-black tracking-tight">추천 상품</h3>
            <Link href="/brand" className="text-sm font-semibold text-black/60 hover:text-black">
              브랜드 파트너 신청
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-10 text-center">
              <p className="text-lg font-black tracking-tight">상품 준비 중</p>
              <p className="mt-2 text-sm text-black/60">곧 다양한 상품을 업데이트할 예정입니다.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-xl bg-black/5" />
                    <div className="mt-3 h-4 w-24 rounded bg-black/5" />
                    <div className="mt-2 h-4 w-40 rounded bg-black/5" />
                    <div className="mt-3 h-4 w-28 rounded bg-black/5" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
              {filtered.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5">
                    <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-black px-2 py-1 text-[11px] font-bold text-white">
                      3일 대여
                    </div>
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${p.imageUrl})` }}
                    />
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-black">{p.brand}</p>
                    <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black/75">
                      {p.name}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-sm font-black">{formatKRW(p.price)}</p>
                      {typeof p.discountRate === 'number' && (
                        <p className="text-sm font-black text-red-600">{p.discountRate}%</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

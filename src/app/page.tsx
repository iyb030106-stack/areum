'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
        label: '인기 럭셔리 아이템',
        caption: '클리어런스 혜택',
        meta: '막스마라, 파라점퍼스 외',
        imageUrl:
          'https://images.unsplash.com/photo-1520975958221-ecdc0f2b36f4?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'b2',
        label: '패션플레이닝이 고른',
        caption: '도쿄우먼 아우터',
        meta: '로우무엇',
        imageUrl:
          'https://images.unsplash.com/photo-1520975661597-171c1d3d0d6e?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'b3',
        label: '유니크한 데일리템',
        caption: '클리어런스 위크',
        meta: '골든선샤인',
        imageUrl:
          'https://images.unsplash.com/photo-1520975691759-54a9556eab8e?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'b4',
        label: '신규 입점 브랜드',
        caption: '이번 주 신규 브랜드',
        meta: '8개 브랜드 업데이트',
        imageUrl:
          'https://images.unsplash.com/photo-1520975940040-9c4f9d6cf234?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'b5',
        label: '이달의 테크웨어',
        caption: '기능성 룩 추천',
        meta: '레어 드롭 큐레이션',
        imageUrl:
          'https://images.unsplash.com/photo-1520975908176-5fd3b7c29f10?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'b6',
        label: '대여 랭킹',
        caption: '이번 주 TOP 10',
        meta: '가볍게 입어보기',
        imageUrl:
          'https://images.unsplash.com/photo-1520976005004-3a778f6651c1?auto=format&fit=crop&w=2400&q=80',
      },
    ],
    []
  );

  const visibleCount = 3;
  const [active, setActive] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(visibleCount);
  const [carouselTransition, setCarouselTransition] = useState(true);
  const [bannerHover, setBannerHover] = useState(false);
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'category' | 'brand' | 'service' | null>(null);

  useEffect(() => {
    setCarouselTransition(false);
    setCarouselIndex(visibleCount);
    setActive(0);
  }, [banners.length]);

  useEffect(() => {
    if (bannerHover) return;
    const t = window.setInterval(() => {
      setCarouselIndex((prev) => prev + 1);
      setCarouselTransition(true);
      setActive((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => window.clearInterval(t);
  }, [bannerHover, banners.length]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.brand.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [products, query]);

  const toggleSection = (key: 'category' | 'brand' | 'service') => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const prevBanner = () => {
    setCarouselIndex((prev) => prev - 1);
    setCarouselTransition(true);
    setActive((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setCarouselIndex((prev) => prev + 1);
    setCarouselTransition(true);
    setActive((prev) => (prev + 1) % banners.length);
  };

  const extendedBanners = useMemo(() => {
    if (banners.length === 0) return [] as typeof banners;
    const head = banners.slice(0, visibleCount);
    const tail = banners.slice(-visibleCount);
    return [...tail, ...banners, ...head];
  }, [banners, visibleCount]);

  const itemWidthPercent = 100 / visibleCount;
  const translatePercent = -(carouselIndex * itemWidthPercent);

  const brandCards = useMemo(
    () => [
      {
        id: 'nb-1',
        name: '브랜드 1',
        tagline: 'NEW ARRIVAL',
        imageUrl:
          'https://images.unsplash.com/photo-1520975740828-9df56d2c1f0a?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nb-2',
        name: '브랜드 2',
        tagline: 'LOOKBOOK',
        imageUrl:
          'https://images.unsplash.com/photo-1520975910847-9b78b7a6b4e5?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nb-3',
        name: '브랜드 3',
        tagline: 'SEASONAL DROP',
        imageUrl:
          'https://images.unsplash.com/photo-1520975905928-cb6a4a2c8a3a?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nb-4',
        name: '브랜드 4',
        tagline: 'ESSENTIALS',
        imageUrl:
          'https://images.unsplash.com/photo-1520975924790-49e12d0f0ec1?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nb-5',
        name: '브랜드 5',
        tagline: 'MINIMAL',
        imageUrl:
          'https://images.unsplash.com/photo-1520975945066-f4aaf4c0d5a9?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nb-6',
        name: '브랜드 6',
        tagline: 'STREET',
        imageUrl:
          'https://images.unsplash.com/photo-1520975970190-7b4f3b9b4e44?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-slate-100 hover:text-sky-700"
          >
            <Menu size={20} />
          </button>

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

          <div className="w-10" />
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
              <div className="text-base font-black tracking-tight">
                아름 <span className="text-xs font-semibold text-black/60">Areum</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-3 py-4">
              <button
                type="button"
                onClick={() => toggleSection('category')}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                카테고리
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'category' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'category' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-black/10 pl-3">
                  {['상의', '하의', '아우터', '액세서리'].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="block w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-black/70 transition-colors hover:bg-slate-100 hover:text-sky-700"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('brand')}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                브랜드
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'brand' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'brand' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-black/10 pl-3">
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const label = `브랜드 ${idx + 1}`;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        className="block w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-black/70 transition-colors hover:bg-slate-100 hover:text-sky-700"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('service')}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                서비스
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openSection === 'service' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'service' && (
                <div className="ml-2 mt-2 space-y-1 border-l border-black/10 pl-3">
                  <Link
                    href="/brand"
                    onClick={() => setDrawerOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm font-bold text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
                  >
                    브랜드 파트너 신청
                  </Link>
                  <Link
                    href="/community"
                    onClick={() => setDrawerOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm font-bold text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
                  >
                    커뮤니티
                  </Link>
                </div>
              )}
            </nav>
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6">
        <section
          className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white"
          onMouseEnter={() => setBannerHover(true)}
          onMouseLeave={() => setBannerHover(false)}
        >
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  width: `${extendedBanners.length * itemWidthPercent}%`,
                  transform: `translateX(${translatePercent}%)`,
                  transition: carouselTransition ? 'transform 520ms ease' : 'none',
                }}
                onTransitionEnd={() => {
                  if (banners.length === 0) return;
                  const maxIndex = banners.length + visibleCount;
                  if (carouselIndex >= maxIndex) {
                    setCarouselTransition(false);
                    setCarouselIndex(visibleCount);
                  }
                  if (carouselIndex < visibleCount) {
                    setCarouselTransition(false);
                    setCarouselIndex(banners.length + carouselIndex);
                  }
                }}
              >
                {extendedBanners.map((b, idx) => (
                  <div key={`${b.id}-${idx}`} style={{ width: `${itemWidthPercent}%` }}>
                    <div className="relative h-[170px] overflow-hidden bg-black/5 sm:h-[190px] md:h-[210px] lg:h-[220px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${b.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm font-extrabold tracking-tight text-white">{b.label}</p>
                        <p className="mt-1 text-xs font-semibold text-white/90">{b.caption}</p>
                        <p className="mt-1 text-[11px] font-semibold text-white/70">{b.meta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-1/3 w-px bg-white/15" />
            <div className="pointer-events-none absolute inset-y-0 left-2/3 w-px bg-white/15" />

            <div
              className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-opacity duration-200 sm:pl-4 ${
                bannerHover ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                type="button"
                aria-label="Previous"
                onClick={prevBanner}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/95 text-black shadow-sm backdrop-blur transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-200 sm:pr-4 ${
                bannerHover ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                type="button"
                aria-label="Next"
                onClick={nextBanner}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/95 text-black shadow-sm backdrop-blur transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-black tracking-tight">인기 대여 상품</h3>
            <div className="text-sm font-semibold text-black/40"> </div>
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
            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 md:grid-cols-4 md:gap-x-3 lg:grid-cols-5">
              {filtered.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5">
                    <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-black px-2 py-1 text-[11px] font-bold text-white">
                      3일 대여
                    </div>
                    <div
                      className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-[0.96]"
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

        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-black tracking-tight">신규 입점 브랜드</h3>
            <Link
              href="/brand/intro"
              className="text-sm font-bold text-black/50 transition-colors hover:text-sky-700"
            >
              더보기
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {brandCards.map((b) => (
              <Link
                key={b.id}
                href="/"
                className="group relative flex items-center overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-black/5 md:h-24 md:w-36">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${b.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                </div>
                <div className="flex-1 px-4 py-4">
                  <p className="text-xs font-black tracking-[0.22em] text-black/40 transition-colors group-hover:text-sky-700">
                    {b.tagline}
                  </p>
                  <p className="mt-1 text-sm font-black text-black">{b.name}</p>
                  <p className="mt-1 text-sm font-semibold text-black/60">대표 화보/로고 영역</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

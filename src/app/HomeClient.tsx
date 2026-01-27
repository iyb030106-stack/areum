'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { products as defaultProducts } from '@/data/products';
import type { Product } from '@/types/product';

const formatKRW = (value: number) =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);

export default function HomeClient() {
  const searchParams = useSearchParams();
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

  const [bannerHover, setBannerHover] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const filtered = useMemo(() => {
    const q = (searchParams.get('q') ?? '').trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.brand.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [products, searchParams]);

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
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6">
        <section
          className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white"
          onMouseEnter={() => setBannerHover(true)}
          onMouseLeave={() => setBannerHover(false)}
        >
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={1}
              loop
              speed={520}
              autoplay={
                bannerHover
                  ? false
                  : {
                      delay: 4200,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
              }
              className="w-full"
            >
              {banners.map((b) => (
                <SwiperSlide key={b.id}>
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
                </SwiperSlide>
              ))}
            </Swiper>

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
                onClick={() => swiperRef.current?.slidePrev()}
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
                onClick={() => swiperRef.current?.slideNext()}
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

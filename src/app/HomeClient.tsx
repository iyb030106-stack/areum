'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
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

  const brandSwiperRef = useRef<SwiperType | null>(null);
  const popularRef = useRef<HTMLDivElement | null>(null);
  const newRef = useRef<HTMLDivElement | null>(null);
  const recommendRef = useRef<HTMLDivElement | null>(null);

  const q = searchParams.get('q') ?? '';
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(q);
  }, [q]);

  const onSearchChange = (value: string) => {
    setSearchValue(value);

    const next = new URLSearchParams(searchParams.toString());
    if (value.trim()) next.set('q', value);
    else next.delete('q');

    const qs = next.toString();
    router.replace(qs ? `/?${qs}` : '/');
  };

  const scrollTo = (target: 'popular' | 'new' | 'recommend') => {
    const el =
      target === 'popular' ? popularRef.current : target === 'new' ? newRef.current : recommendRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = useMemo(() => {
    const qq = (searchParams.get('q') ?? '').trim().toLowerCase();
    if (!qq) return products;
    return products.filter(
      (p) => p.brand.toLowerCase().includes(qq) || p.name.toLowerCase().includes(qq)
    );
  }, [products, searchParams]);

  const popularItems = useMemo(() => filtered.slice(0, 10), [filtered]);
  const newItems = useMemo(() => filtered.slice(5, 15), [filtered]);
  const recommendItems = useMemo(() => filtered.slice(2, 12), [filtered]);

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
      <main className="pb-16 pt-0">
        <section className="w-full border-b border-white/10 bg-black">
          <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
            <p className="text-xs font-black tracking-[0.22em] text-white/70">areum</p>
            <div className="mt-3 border border-white/30 bg-white px-4 py-3">
              <input
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="올시즌 꾸안꾸 필수템, 스웨트팬츠"
                className="w-full bg-transparent text-sm font-semibold text-black outline-none placeholder:text-black/40"
              />
            </div>
          </div>
        </section>

        <section className="sticky top-14 z-40 w-full border-b border-white/10 bg-black">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex h-12 items-center gap-4 text-sm font-bold text-white">
              <button
                type="button"
                onClick={() => scrollTo('popular')}
                className="transition-colors hover:text-white/80"
              >
                인기
              </button>
              <button
                type="button"
                onClick={() => scrollTo('new')}
                className="transition-colors hover:text-white/80"
              >
                신상
              </button>
              <button
                type="button"
                onClick={() => scrollTo('recommend')}
                className="transition-colors hover:text-white/80"
              >
                추천
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section
            className="group relative overflow-hidden border border-black/15 bg-white"
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
                className={`absolute inset-y-0 left-0 z-20 flex items-center pl-2 transition-opacity duration-200 sm:pl-3 ${
                  bannerHover ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="inline-flex h-10 w-10 items-center justify-center border border-black/20 bg-white text-black shadow-sm transition-colors hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
              <div
                className={`absolute inset-y-0 right-0 z-20 flex items-center pr-2 transition-opacity duration-200 sm:pr-3 ${
                  bannerHover ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="inline-flex h-10 w-10 items-center justify-center border border-black/20 bg-white text-black shadow-sm transition-colors hover:bg-black hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <section ref={popularRef} className="scroll-mt-[104px] pt-10">
            <div className="flex items-end justify-between">
              <h3 className="text-lg font-black tracking-tight">인기</h3>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {popularItems.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-black/5">
                    <div className="absolute left-2 top-2 z-10 inline-flex items-center bg-black px-2 py-1 text-[11px] font-bold text-white">
                      3일 대여
                    </div>
                    <div
                      className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.96]"
                      style={{ backgroundImage: `url(${p.imageUrl})` }}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-black">{p.brand}</p>
                    <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black/75">
                      {p.name}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-sm font-black">{formatKRW(p.price)}</p>
                      {typeof p.discountRate === 'number' && (
                        <p className="text-sm font-black text-red-600">{p.discountRate}%</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section ref={newRef} className="scroll-mt-[104px] pt-12">
            <div className="flex items-end justify-between">
              <h3 className="text-lg font-black tracking-tight">신상</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {newItems.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-black/5">
                    <div
                      className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.96]"
                      style={{ backgroundImage: `url(${p.imageUrl})` }}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-black">{p.brand}</p>
                    <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black/75">
                      {p.name}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-sm font-black">{formatKRW(p.price)}</p>
                      {typeof p.discountRate === 'number' && (
                        <p className="text-sm font-black text-red-600">{p.discountRate}%</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section ref={recommendRef} className="scroll-mt-[104px] pt-12">
            <div className="flex items-end justify-between">
              <h3 className="text-lg font-black tracking-tight">추천</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recommendItems.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-black/5">
                    <div
                      className="h-full w-full bg-cover bg-center transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.96]"
                      style={{ backgroundImage: `url(${p.imageUrl})` }}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-black">{p.brand}</p>
                    <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black/75">
                      {p.name}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-sm font-black">{formatKRW(p.price)}</p>
                      {typeof p.discountRate === 'number' && (
                        <p className="text-sm font-black text-red-600">{p.discountRate}%</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-12 max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-black tracking-tight">신규 브랜드</h3>
            <Link href="/brand/intro" className="text-sm font-bold text-black/50 transition-colors hover:text-black">
              더보기
            </Link>
          </div>

          <div className="relative mt-4 border border-black/15 bg-white">
            <Swiper
              onSwiper={(s) => {
                brandSwiperRef.current = s;
              }}
              slidesPerView={3}
              slidesPerGroup={1}
              spaceBetween={1}
              loop
              speed={420}
              className="w-full"
            >
              {brandCards.map((b) => (
                <SwiperSlide key={b.id}>
                  <Link href="/" className="block">
                    <div className="flex items-center gap-3 p-4">
                      <div className="h-12 w-12 shrink-0 bg-black/5" />
                      <div className="min-w-0">
                        <p className="text-sm font-black text-black">{b.name}</p>
                        <p className="mt-1 text-xs font-bold text-black/50">{b.tagline}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label="Prev brand"
              onClick={() => brandSwiperRef.current?.slidePrev()}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-black/20 bg-white text-black transition-colors hover:bg-black hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next brand"
              onClick={() => brandSwiperRef.current?.slideNext()}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-black/20 bg-white text-black transition-colors hover:bg-black hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

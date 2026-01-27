'use client';

import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { products } from '@/data/products';
import type { Product } from '@/types/product';
import 'swiper/css';

const formatKRW = (value: number) =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);

const placeholderImages = [
  'https://images.unsplash.com/photo-1520975958221-ecdc0f2b36f4?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1520975661597-171c1d3d0d6e?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1520975691759-54a9556eab8e?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1520975940040-9c4f9d6cf234?auto=format&fit=crop&w=1800&q=80',
];

type Props = {
  productId: string;
};

export default function ProductDetailClient({ productId }: Props) {
  const product: Product = useMemo(() => {
    return products.find((p) => p.id === productId) ?? products[0];
  }, [productId]);

  const images = useMemo(() => {
    const base = product?.imageUrl ? [product.imageUrl] : [];
    const merged = [...base, ...placeholderImages].slice(0, 4);
    return merged;
  }, [product]);

  const swiperRef = useRef<SwiperType | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [payDone, setPayDone] = useState(false);
  const [payName, setPayName] = useState('');
  const [payCard, setPayCard] = useState('');
  const [payExpiry, setPayExpiry] = useState('');
  const [payCvc, setPayCvc] = useState('');

  const openPay = () => {
    setPayOpen(true);
    setPayDone(false);
  };

  const closePay = () => {
    setPayOpen(false);
    setPayDone(false);
    setPayName('');
    setPayCard('');
    setPayExpiry('');
    setPayCvc('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-black/5">
            <Swiper
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              slidesPerView={1}
              loop
              speed={520}
              className="w-full"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={`${src}-${idx}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute left-3 top-3 z-20 inline-flex items-center bg-black px-2 py-1 text-[11px] font-bold text-white">
                      3일 대여
                    </div>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                    <div className="absolute inset-0 bg-black/5 transition-colors duration-300 hover:bg-black/15" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label="Previous image"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-sm backdrop-blur transition-colors hover:bg-slate-100 hover:text-sky-700"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-sm backdrop-blur transition-colors hover:bg-slate-100 hover:text-sky-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div>
            <div className="inline-flex items-center rounded-md bg-black px-2 py-1 text-[11px] font-bold text-white">3일 대여</div>
            <h1 className="mt-4 text-2xl font-black tracking-tight">{product?.name ?? '상품 상세'}</h1>
            <p className="mt-2 text-sm font-bold text-black/70">{product?.brand}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <p className="text-xl font-black">{formatKRW(product?.price ?? 0)}</p>
              {typeof product?.discountRate === 'number' && (
                <p className="text-sm font-black text-red-600">{product.discountRate}%</p>
              )}
            </div>

            <div className="mt-8 grid gap-3">
              <button
                type="button"
                className="w-full rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800 hover:text-sky-200"
                onClick={openPay}
              >
                대여하기
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                브랜드 자사몰 구경하기
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                장바구니
              </button>
            </div>

            <div className="mt-8 space-y-3 text-sm text-black/70">
              <p>대여 기간: 3일</p>
              <p>상태: 대여 가능 (시뮬레이션)</p>
              <p>결제 시나리오: 결제하기 → 재고 소진 안내</p>
            </div>
          </div>
        </div>
      </main>

      {payOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <button
            onClick={closePay}
            className="absolute inset-0 bg-black/55"
            aria-label="Close modal"
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 shadow-2xl">
            <button
              onClick={closePay}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-black tracking-tight">결제 정보 입력</h2>
            <p className="mt-2 text-sm text-black/60">대여 결제는 시뮬레이션입니다.</p>

            {payDone ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-black text-red-800">현재 상품 재고가 소진되었습니다</p>
                <p className="mt-2 text-sm text-red-700">다른 상품을 둘러보시거나, 재입고 알림을 기다려주세요.</p>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPayDone(true);
                }}
              >
                <label className="block">
                  <span className="text-sm font-bold">이름</span>
                  <input
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                    placeholder="홍길동"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold">카드번호</span>
                  <input
                    value={payCard}
                    onChange={(e) => setPayCard(e.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                    placeholder="0000 0000 0000 0000"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold">만료일</span>
                    <input
                      value={payExpiry}
                      onChange={(e) => setPayExpiry(e.target.value)}
                      required
                      className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                      placeholder="MM/YY"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">CVC</span>
                    <input
                      value={payCvc}
                      onChange={(e) => setPayCvc(e.target.value)}
                      required
                      className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
                      placeholder="123"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800 hover:text-sky-200"
                >
                  결제하기
                </button>
              </form>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closePay}
                className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-slate-100 hover:text-sky-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

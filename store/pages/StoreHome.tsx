import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { products } from '../data/products';

const StoreHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-gradient-to-br from-stone-900 to-stone-700 text-white p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold">
            <Sparkles size={16} />
            <span>Areum Store MVP</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            필요한 순간에만, 좋은 옷을.
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            내일 미팅할 브랜드의 아이템이라고 가정한 더미 상품입니다. 상세 페이지에서 바로 대여 신청을 남겨보세요.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group rounded-3xl bg-white border border-stone-200 overflow-hidden hover:shadow-lg hover:shadow-stone-900/10 transition-shadow"
          >
            <div className="aspect-[4/5] bg-stone-100 overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-stone-900 truncate">{p.name}</p>
                <span className="text-xs font-semibold rounded-full bg-stone-100 px-2 py-1 text-stone-600">
                  {p.category}
                </span>
              </div>
              <p className="text-sm text-stone-600">{p.brand}</p>
              <p
                className="text-sm text-stone-700"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {p.brandDescription}
              </p>
              <div className="pt-2 flex items-end justify-between">
                <div>
                  <p className="text-xs text-stone-500">1일 대여</p>
                  <p className="text-lg font-semibold text-stone-900">{p.dailyPrice.toLocaleString()}원</p>
                </div>
                <span className="text-sm font-semibold text-orange-700 group-hover:text-orange-800">상세 보기 →</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">브랜드 파트너를 찾습니다</h2>
            <p className="mt-2 text-sm text-stone-600">
              입점/협업 문의는 전용 페이지에서 간편하게 접수할 수 있어요.
            </p>
          </div>
          <Link
            to="/brand"
            className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            브랜드 파트너 모집
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StoreHome;

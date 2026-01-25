import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, User, MessageSquareText, Send } from 'lucide-react';
import { getProductById } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="rounded-3xl bg-white border border-stone-200 p-8">
        <p className="text-stone-700">상품을 찾을 수 없습니다.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-orange-700 font-semibold">
          <ArrowLeft size={16} />
          목록으로
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="rounded-3xl bg-white border border-stone-200 overflow-hidden">
        <div className="aspect-[4/5] bg-stone-100">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900">
            <ArrowLeft size={16} />
            목록으로
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-sm text-stone-600">{product.brand}</p>
          <p className="text-sm text-stone-700">{product.brandDescription}</p>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200">
              <p className="text-xs text-stone-500">1일 대여</p>
              <p className="text-lg font-semibold">{product.dailyPrice.toLocaleString()}원</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200">
              <p className="text-xs text-stone-500">보증금(예시)</p>
              <p className="text-lg font-semibold">{product.deposit.toLocaleString()}원</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="text-xs font-semibold rounded-full bg-orange-100 text-orange-800 px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold">대여 신청 폼</h2>
        <p className="mt-2 text-sm text-stone-600">
          수요 검증 단계라 로그인 없이 신청만 받습니다. 제출 시 화면에만 저장됩니다.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-5">
            <p className="font-semibold text-green-900">신청이 접수되었습니다.</p>
            <p className="mt-2 text-sm text-green-800">담당자가 확인 후 연락드릴게요.</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800">
                다른 상품 보기
              </Link>
              <Link to="/brand" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                브랜드 파트너 모집
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
                <User size={16} />
                이름
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
                placeholder="홍길동"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
                <Phone size={16} />
                연락처
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
                placeholder="010-0000-0000"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
                <Calendar size={16} />
                희망 대여일
              </span>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-stone-700 inline-flex items-center gap-2">
                <MessageSquareText size={16} />
                요청사항
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-400"
                placeholder="사이즈/픽업 시간 등"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
            >
              <Send size={16} />
              신청하기
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;

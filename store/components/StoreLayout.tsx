import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, Handshake } from 'lucide-react';

type Props = {
  landingUrl?: string;
};

const StoreLayout: React.FC<Props> = ({ landingUrl }) => {
  const location = useLocation();

  const handleGoLanding = () => {
    const fallback = 'https://areum-black.vercel.app';
    const url = landingUrl || (import.meta.env.VITE_LANDING_URL as string | undefined) || fallback;
    window.location.href = url;
  };

  const isBrand = location.pathname.startsWith('/brand');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-orange-200 selection:text-orange-900">
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoLanding}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">랜딩으로</span>
            </button>
            <Link to="/" className="text-lg font-semibold tracking-tight">
              areum store
            </Link>
          </div>

          <Link
            to="/brand"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            <Handshake size={16} />
            <span>브랜드 파트너 모집</span>
          </Link>
        </div>
      </header>

      {!isBrand && (
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-stone-600">
              수요 검증용 MVP입니다. 상품은 더미 데이터이며, 상세 페이지에서 바로 대여 신청을 받습니다.
            </p>
            <Link to="/brand" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
              브랜드 입점 문의 →
            </Link>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-stone-600">© {new Date().getFullYear()} areum</p>
            <Link
              to="/brand"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              <Handshake size={16} />
              <span>브랜드 파트너 모집</span>
            </Link>
          </div>
          <p className="text-xs text-stone-500">
            파트너십 문의는 /brand 에서 접수됩니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;

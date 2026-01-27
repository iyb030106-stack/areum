'use client';

import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, Image as ImageIcon, Plus, Search, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { supabase } from '@/lib/supabaseClient';
import type { CommunityCategory, CommunityComment, CommunityPost } from '@/types/community';
import { products } from '@/data/products';

type SortMode = 'latest' | 'views';

const categoryTabs: { value: CommunityCategory; label: string }[] = [
  { value: '브랜드에게 한마디', label: '브랜드에게 한마디' },
  { value: '리얼 리뷰', label: '리얼 리뷰' },
  { value: '자유게시판', label: '자유게시판' },
];

const mockPosts: CommunityPost[] = [
  {
    id: 'mock-1',
    title: '핏이 진짜 예쁜데 사이즈 팁 공유해요',
    content: 'M 했는데 어깨가 살짝 넉넉했어요. 다음엔 S도 도전해볼 듯!',
    photo_url:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80',
    author_name: '지민',
    brand_id: 'areum',
    category: '리얼 리뷰',
    view_count: 312,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'mock-2',
    title: '다음 드롭 색상 미리보기 있을까요?',
    content: '블랙/오프화이트 말고 그레이 톤도 기대 중입니다!',
    photo_url:
      'https://images.unsplash.com/photo-1520975661597-171c1d3d0d6e?auto=format&fit=crop&w=1600&q=80',
    author_name: '민수',
    brand_id: 'studio-a',
    category: '브랜드에게 한마디',
    view_count: 845,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
  {
    id: 'mock-3',
    title: '이번주 출근룩 스냅',
    content: '대여로 돌려입으니까 매주 분위기 바꾸기 좋아요.',
    photo_url:
      'https://images.unsplash.com/photo-1520975940040-9c4f9d6cf234?auto=format&fit=crop&w=1600&q=80',
    author_name: '서연',
    brand_id: 'urban',
    category: '자유게시판',
    view_count: 560,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
  },
  {
    id: 'mock-4',
    title: '재입고 알림 기능도 추가되면 좋겠어요',
    content: '인기 상품은 금방 사라져서… 커뮤니티에서 공지로도 알려주면 좋을 듯!',
    photo_url:
      'https://images.unsplash.com/photo-1520975691759-54a9556eab8e?auto=format&fit=crop&w=1600&q=80',
    author_name: '하나',
    brand_id: 'standard',
    category: '브랜드에게 한마디',
    view_count: 101,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
  },
];

const mockCommentsByPostId: Record<string, CommunityComment[]> = {
  'mock-2': [
    {
      id: 'c1',
      post_id: 'mock-2',
      content: '그레이/차콜 톤 준비 중이에요. 다음 주에 룩북 공개할게요!',
      author_name: 'Studio A',
      brand_id: 'studio-a',
      is_official: true,
      created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
      id: 'c2',
      post_id: 'mock-2',
      content: '와 기대됩니다!',
      author_name: '민수',
      brand_id: null,
      is_official: false,
      created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    },
  ],
};

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return '방금';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
};

const normalizeBrandId = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');

const safeInitial = (label: string) => label.trim().slice(0, 1).toUpperCase();

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export default function CommunityClient() {
  const brands = useMemo(() => {
    const base = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    const normalized = base.map((b) => ({ id: normalizeBrandId(b), label: b }));
    const uniqueById = new Map<string, { id: string; label: string }>();
    normalized.forEach((b) => {
      if (!uniqueById.has(b.id)) uniqueById.set(b.id, b);
    });
    const list = Array.from(uniqueById.values()).slice(0, 18);
    return [{ id: 'all', label: '전체' }, ...list];
  }, []);

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [search, setSearch] = useState('');

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeCategory, setComposeCategory] = useState<CommunityCategory>('브랜드에게 한마디');
  const [composeBrandId, setComposeBrandId] = useState<string>('all');
  const [composeTitle, setComposeTitle] = useState('');
  const [composeContent, setComposeContent] = useState('');
  const [composePhotoUrl, setComposePhotoUrl] = useState('');
  const [composeAuthor, setComposeAuthor] = useState('');

  const [detailPost, setDetailPost] = useState<CommunityPost | null>(null);
  const [detailComments, setDetailComments] = useState<CommunityComment[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentBrandId, setCommentBrandId] = useState<string>('');
  const [commentOfficial, setCommentOfficial] = useState(false);

  const logoSwiper = useMemo<{ current: SwiperType | null }>(() => ({ current: null }), []);

  const filteredAndSorted = useMemo(() => {
    const base = posts
      .filter((p) => (selectedBrand === 'all' ? true : p.brand_id === selectedBrand))
      .filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author_name.toLowerCase().includes(q)
        );
      });

    const sorted = [...base].sort((a, b) => {
      if (sortMode === 'views') return (b.view_count ?? 0) - (a.view_count ?? 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return sorted;
  }, [posts, selectedBrand, sortMode, search]);

  const hotTop3 = useMemo(() => {
    const base = [...posts]
      .filter((p) => (selectedBrand === 'all' ? true : p.brand_id === selectedBrand))
      .sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0));
    return base.slice(0, 3);
  }, [posts, selectedBrand]);

  const brandLabel = useMemo(() => {
    const hit = brands.find((b) => b.id === selectedBrand);
    return hit?.label ?? '전체';
  }, [brands, selectedBrand]);

  const loadPosts = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      if (!supabase) {
        setPosts(mockPosts);
        return;
      }

      let q = supabase.from('community_posts').select('*');
      if (selectedBrand !== 'all') q = q.eq('brand_id', selectedBrand);
      if (sortMode === 'views') q = q.order('view_count', { ascending: false });
      else q = q.order('created_at', { ascending: false });

      const { data, error } = await q;
      if (error) throw error;
      setPosts((data as CommunityPost[]) ?? []);
    } catch (err: any) {
      setErrorMsg(err?.message ?? '커뮤니티 데이터를 불러오지 못했습니다.');
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    if (!postId) return;

    if (!supabase || !isUuid(postId)) {
      setDetailComments(mockCommentsByPostId[postId] ?? []);
      return;
    }

    const { data, error } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      setDetailComments([]);
      return;
    }

    setDetailComments((data as CommunityComment[]) ?? []);
  };

  const bumpViewCount = async (post: CommunityPost) => {
    if (!supabase || !isUuid(post.id)) return;

    const nextCount = (post.view_count ?? 0) + 1;
    await supabase.from('community_posts').update({ view_count: nextCount }).eq('id', post.id);

    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, view_count: nextCount } : p)));
    setDetailPost((prev) => (prev && prev.id === post.id ? { ...prev, view_count: nextCount } : prev));
  };

  useEffect(() => {
    void loadPosts();
  }, [selectedBrand, sortMode]);

  const openDetail = async (post: CommunityPost) => {
    setDetailPost(post);
    setCommentAuthor('');
    setCommentContent('');
    setCommentBrandId(post.brand_id ?? '');
    setCommentOfficial(false);

    await Promise.all([loadComments(post.id), bumpViewCount(post)]);
  };

  const closeDetail = () => {
    setDetailPost(null);
    setDetailComments([]);
  };

  const openCompose = () => {
    setComposeOpen(true);
    setComposeCategory('브랜드에게 한마디');
    setComposeBrandId(selectedBrand === 'all' ? 'all' : selectedBrand);
    setComposeTitle('');
    setComposeContent('');
    setComposePhotoUrl('');
    setComposeAuthor('');
  };

  const closeCompose = () => {
    setComposeOpen(false);
  };

  const submitPost = async () => {
    const title = composeTitle.trim();
    const content = composeContent.trim();
    const author = composeAuthor.trim() || '익명';

    if (!title || !content) return;

    const brand_id = composeBrandId === 'all' ? null : composeBrandId;

    if (!supabase) {
      const next: CommunityPost = {
        id: `mock-${Date.now()}`,
        title,
        content,
        photo_url: composePhotoUrl.trim() || null,
        author_name: author,
        brand_id,
        category: composeCategory,
        view_count: 0,
        created_at: new Date().toISOString(),
      };
      setPosts((prev) => [next, ...prev]);
      setComposeOpen(false);
      return;
    }

    const payload = {
      title,
      content,
      photo_url: composePhotoUrl.trim() || null,
      author_name: author,
      brand_id,
      category: composeCategory,
      view_count: 0,
    };

    const { data, error } = await supabase.from('community_posts').insert(payload).select('*').single();

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data) setPosts((prev) => [data as CommunityPost, ...prev]);
    setComposeOpen(false);
  };

  const submitComment = async () => {
    if (!detailPost) return;

    if (!isUuid(detailPost.id)) {
      const content = commentContent.trim();
      if (!content) return;

      const author = commentAuthor.trim() || (commentOfficial ? '브랜드 대표' : '익명');
      const next: CommunityComment = {
        id: `mock-c-${Date.now()}`,
        post_id: detailPost.id,
        content,
        author_name: author,
        brand_id: commentBrandId.trim() || detailPost.brand_id || null,
        is_official: commentOfficial,
        created_at: new Date().toISOString(),
      };
      setDetailComments((prev) => [...prev, next]);
      setCommentContent('');
      return;
    }

    const content = commentContent.trim();
    if (!content) return;

    const author = commentAuthor.trim() || (commentOfficial ? '브랜드 대표' : '익명');
    const payload = {
      post_id: detailPost.id,
      content,
      author_name: author,
      brand_id: commentBrandId.trim() || detailPost.brand_id || null,
      is_official: commentOfficial,
    };

    if (!supabase) {
      const next: CommunityComment = {
        id: `mock-c-${Date.now()}`,
        post_id: detailPost.id,
        content,
        author_name: author,
        brand_id: payload.brand_id,
        is_official: commentOfficial,
        created_at: new Date().toISOString(),
      };
      setDetailComments((prev) => [...prev, next]);
      setCommentContent('');
      return;
    }

    const { data, error } = await supabase
      .from('community_comments')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data) setDetailComments((prev) => [...prev, data as CommunityComment]);
    setCommentContent('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-black/60">COMMUNITY</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">브랜드 & 고객 커뮤니티</h1>
            <p className="mt-2 text-sm text-black/60">{brandLabel} · 실시간 피드</p>
          </div>

          <button
            type="button"
            onClick={openCompose}
            className="inline-flex h-11 items-center gap-2 border border-black/20 bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-zinc-800 hover:text-sky-200"
          >
            <Plus size={18} />
            글쓰기
          </button>
        </div>

        <section className="mt-6 overflow-hidden border border-black/15 bg-black text-white">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm font-black tracking-tight">브랜드 전용관</p>
            <div className="flex items-center gap-2 text-xs font-bold text-white/70">
              <button
                type="button"
                onClick={() => logoSwiper.current?.slidePrev()}
                className="h-8 w-8 border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => logoSwiper.current?.slideNext()}
                className="h-8 w-8 border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
              >
                ›
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 px-3 py-3">
            <Swiper
              onSwiper={(s) => {
                logoSwiper.current = s;
              }}
              slidesPerView="auto"
              spaceBetween={10}
              className="w-full"
            >
              {brands.map((b) => {
                const active = selectedBrand === b.id;
                return (
                  <SwiperSlide key={b.id} style={{ width: 'auto' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedBrand(b.id)}
                      className={`inline-flex items-center gap-3 border px-3 py-2 text-sm font-bold transition-colors ${
                        active
                          ? 'border-white bg-white text-black'
                          : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black ${
                          active ? 'border-black/15 bg-white' : 'border-white/20 bg-black'
                        }`}
                      >
                        {b.id === 'all' ? 'A' : safeInitial(b.label)}
                      </span>
                      <span className="whitespace-nowrap">{b.label}</span>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        <section className="mt-4 border border-black/15 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSortMode('views')}
                className={`h-9 border px-3 text-sm font-bold transition-colors ${
                  sortMode === 'views'
                    ? 'border-black bg-black text-white'
                    : 'border-black/15 bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                조회순
              </button>
              <button
                type="button"
                onClick={() => setSortMode('latest')}
                className={`h-9 border px-3 text-sm font-bold transition-colors ${
                  sortMode === 'latest'
                    ? 'border-black bg-black text-white'
                    : 'border-black/15 bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                최신순
              </button>
            </div>

            <div className="flex items-center gap-2 border border-black/15 bg-white px-3">
              <Search size={16} className="text-black/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="제목/내용/작성자 검색"
                className="h-9 w-[220px] bg-transparent text-sm font-semibold outline-none placeholder:text-black/40"
              />
            </div>
          </div>

          <div className="border-t border-black/10 px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black tracking-tight">실시간 인기글</h2>
              <p className="text-xs font-bold text-black/50">TOP 3</p>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {hotTop3.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => void openDetail(p)}
                  className="group relative overflow-hidden border border-black/15 bg-white text-left transition-colors hover:bg-black hover:text-white"
                >
                  <div className="p-4">
                    <p className="text-[11px] font-black text-black/50 transition-colors group-hover:text-white/70">
                      {p.category} · {formatRelative(p.created_at)}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm font-black tracking-tight">{p.title}</p>
                    <p className="mt-2 text-xs font-bold text-black/60 transition-colors group-hover:text-white/80">
                      조회 {p.view_count}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4">
          {errorMsg && (
            <div className="mb-3 border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="border border-black/15 bg-white px-4 py-10 text-sm font-bold text-black/60">
              불러오는 중…
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSorted.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => void openDetail(p)}
                  className="group overflow-hidden border border-black/15 bg-white text-left transition-colors hover:bg-black hover:text-white"
                >
                  <div className="relative aspect-square bg-black/5">
                    {p.photo_url ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${p.photo_url})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-black/30 transition-colors group-hover:text-white/50">
                        <ImageIcon size={28} />
                      </div>
                    )}
                    <div className="absolute left-3 top-3 inline-flex items-center bg-black px-2 py-1 text-[11px] font-bold text-white">
                      {p.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="line-clamp-2 text-sm font-black tracking-tight text-white">{p.title}</p>
                      <p className="mt-2 text-xs font-bold text-white/80">
                        {p.author_name} · 조회 {p.view_count} · {formatRelative(p.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="line-clamp-3 text-sm font-semibold text-black/70 transition-colors group-hover:text-white/80">
                      {p.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      {composeOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeCompose}
            aria-label="Close"
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative w-full max-w-2xl border border-black/15 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black tracking-tight">글쓰기</h2>
              <button
                type="button"
                onClick={closeCompose}
                className="inline-flex h-10 w-10 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:bg-black hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-black text-black/60">작성자</span>
                <input
                  value={composeAuthor}
                  onChange={(e) => setComposeAuthor(e.target.value)}
                  placeholder="닉네임 (선택)"
                  className="mt-2 h-11 w-full border border-black/15 px-3 text-sm font-semibold outline-none focus:border-black"
                />
              </label>

              <label className="block">
                <span className="text-xs font-black text-black/60">브랜드</span>
                <div className="mt-2 flex items-center gap-2 border border-black/15 bg-white px-3">
                  <select
                    value={composeBrandId}
                    onChange={(e) => setComposeBrandId(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm font-semibold outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="text-black/40" />
                </div>
              </label>
            </div>

            <div className="mt-4">
              <p className="text-xs font-black text-black/60">카테고리</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categoryTabs.map((c) => {
                  const active = composeCategory === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setComposeCategory(c.value)}
                      className={`h-10 border px-3 text-sm font-bold transition-colors ${
                        active
                          ? 'border-black bg-black text-white'
                          : 'border-black/15 bg-white text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-black text-black/60">제목</span>
              <input
                value={composeTitle}
                onChange={(e) => setComposeTitle(e.target.value)}
                className="mt-2 h-11 w-full border border-black/15 px-3 text-sm font-semibold outline-none focus:border-black"
                placeholder="제목을 입력하세요"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-black text-black/60">내용</span>
              <textarea
                value={composeContent}
                onChange={(e) => setComposeContent(e.target.value)}
                rows={6}
                className="mt-2 w-full border border-black/15 px-3 py-3 text-sm font-semibold outline-none focus:border-black"
                placeholder="브랜드와 소통해보세요"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-black text-black/60">사진 URL (선택)</span>
              <input
                value={composePhotoUrl}
                onChange={(e) => setComposePhotoUrl(e.target.value)}
                className="mt-2 h-11 w-full border border-black/15 px-3 text-sm font-semibold outline-none focus:border-black"
                placeholder="https://..."
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeCompose}
                className="h-11 border border-black/15 bg-white px-4 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => void submitPost()}
                className="h-11 border border-black bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-zinc-800 hover:text-sky-200"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {detailPost && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeDetail}
            aria-label="Close"
            className="absolute inset-0 bg-black/65"
          />
          <div className="relative w-full max-w-5xl overflow-hidden border border-black/15 bg-white shadow-2xl">
            <div className="grid max-h-[85vh] overflow-hidden md:grid-cols-2">
              <div className="relative bg-black">
                {detailPost.photo_url ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${detailPost.photo_url})` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/40">
                    <ImageIcon size={34} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center bg-white px-2 py-1 text-[11px] font-bold text-black">
                  {detailPost.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs font-bold text-white/70">
                    조회 {detailPost.view_count} · {formatRelative(detailPost.created_at)}
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-tight text-white">{detailPost.title}</h3>
                  <p className="mt-2 text-sm font-bold text-white/80">{detailPost.author_name}</p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                  <p className="text-sm font-black">댓글</p>
                  <button
                    type="button"
                    onClick={closeDetail}
                    className="inline-flex h-9 w-9 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:bg-black hover:text-white"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-auto px-5 py-4">
                  <p className="text-sm font-semibold text-black/70">{detailPost.content}</p>

                  <div className="mt-6 space-y-3">
                    {detailComments.length === 0 ? (
                      <p className="text-sm font-bold text-black/50">첫 댓글을 남겨보세요.</p>
                    ) : (
                      detailComments.map((c) => (
                        <div key={c.id} className="border border-black/10 bg-white px-4 py-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black">{c.author_name}</p>
                              {c.is_official && (
                                <span className="inline-flex items-center bg-black px-2 py-0.5 text-[11px] font-bold text-white">
                                  Official 브랜드 답변
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-black/40">{formatRelative(c.created_at)}</p>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-black/70">{c.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-black/10 px-5 py-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    <input
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="h-11 border border-black/15 px-3 text-sm font-semibold outline-none focus:border-black"
                      placeholder="작성자 (선택)"
                    />
                    <input
                      value={commentBrandId}
                      onChange={(e) => setCommentBrandId(e.target.value)}
                      className="h-11 border border-black/15 px-3 text-sm font-semibold outline-none focus:border-black"
                      placeholder="브랜드ID (선택)"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-sm font-bold text-black/70">
                      <input
                        type="checkbox"
                        checked={commentOfficial}
                        onChange={(e) => setCommentOfficial(e.target.checked)}
                        className="h-4 w-4"
                      />
                      Official로 댓글 달기
                    </label>

                    <button
                      type="button"
                      onClick={() => void submitComment()}
                      className="h-10 border border-black bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-zinc-800 hover:text-sky-200"
                    >
                      등록
                    </button>
                  </div>

                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={3}
                    className="mt-2 w-full border border-black/15 px-3 py-3 text-sm font-semibold outline-none focus:border-black"
                    placeholder="댓글을 입력하세요"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

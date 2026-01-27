export type CommunityCategory = '브랜드에게 한마디' | '리얼 리뷰' | '자유게시판';

export type CommunityPost = {
  id: string;
  title: string;
  content: string;
  photo_url: string | null;
  author_name: string;
  brand_id: string | null;
  category: CommunityCategory;
  view_count: number;
  created_at: string;
};

export type CommunityComment = {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  brand_id: string | null;
  is_official: boolean;
  created_at: string;
};

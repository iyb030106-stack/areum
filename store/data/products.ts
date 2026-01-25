import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Midnight Satin Slip Dress',
    brand: 'Noir Atelier',
    brandDescription: '실루엣을 살리는 새틴 라인과 미니멀한 디테일로 파티/행사룩에 강한 컨템포러리 브랜드.',
    category: 'Dress',
    dailyPrice: 19000,
    deposit: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1520975693411-b5638ef2c640?auto=format&fit=crop&w=1200&q=80',
    tags: ['파티', '새틴', '미니멀'],
  },
  {
    id: 'p2',
    name: 'Classic Tweed Jacket Set',
    brand: 'Maison Lune',
    brandDescription: '테일러링과 소재 퀄리티로 승부하는 데일리-포멀 교차 지점의 트위드 전문 라인.',
    category: 'Set',
    dailyPrice: 24000,
    deposit: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1520975958225-35dd22299614?auto=format&fit=crop&w=1200&q=80',
    tags: ['포멀', '트위드', '자켓'],
  },
  {
    id: 'p3',
    name: 'Soft Cashmere Blend Coat',
    brand: 'Hyehwa Studio',
    brandDescription: '부드러운 촉감과 구조적인 라인으로 ‘사진 잘 나오는 아우터’를 만드는 스튜디오.',
    category: 'Outer',
    dailyPrice: 29000,
    deposit: 90000,
    imageUrl: 'https://images.unsplash.com/photo-1520975948090-5b9e1d0c7b8d?auto=format&fit=crop&w=1200&q=80',
    tags: ['아우터', '코트', '겨울'],
  },
  {
    id: 'p4',
    name: 'Pearl Button Knit Top',
    brand: 'Evelyn Wardrobe',
    brandDescription: '여성스러운 디테일(펄/버튼/니트)을 현대적으로 재해석하는 데일리 브랜드.',
    category: 'Top',
    dailyPrice: 14000,
    deposit: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1520975909388-18d9e9f2d1a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['니트', '데일리', '펄'],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

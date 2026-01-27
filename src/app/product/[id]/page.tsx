import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <ProductDetailClient productId={params.id} />
  );
}

export type ProductCategory = 'Outer' | 'Dress' | 'Set' | 'Top' | 'Bottom';

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandDescription: string;
  category: ProductCategory;
  dailyPrice: number;
  deposit: number;
  imageUrl: string;
  tags: string[];
}

export interface RentalApplication {
  productId: string;
  name: string;
  phone: string;
  preferredDate: string;
  message: string;
}

export interface BrandApplication {
  brandName: string;
  contact: string;
  category: string;
  message: string;
}

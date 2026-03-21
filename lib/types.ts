export interface ProductSize {
  size: string;
  available: boolean;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  sizes: ProductSize[];
  badge?: 'NEW' | 'TRENDING' | 'SALE' | 'RARE';
  description: string;
  colorway: string;
  sku: string;
  year?: number;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

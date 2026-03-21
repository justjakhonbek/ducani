'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/app/context/CartContext';

const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-blue-500 text-white',
  TRENDING: 'bg-[#FFD700] text-black',
  SALE: 'bg-red-500 text-white',
  RARE: 'bg-purple-600 text-white',
};

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  const firstAvailableSize = product.sizes.find((s) => s.available)?.size;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstAvailableSize) addItem(product, firstAvailableSize);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-white/5 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${BADGE_STYLES[product.badge]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Top right: verified + like */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {product.verified && (
            <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="w-6 h-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center"
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white/60'}`} />
          </button>
        </div>

        {/* Quick add on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={!firstAvailableSize}
            className="w-full py-2.5 bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            В корзину
          </button>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <p className="text-white/40 text-xs">{product.brand}</p>
        <p className="text-white text-sm font-medium leading-tight mt-0.5 line-clamp-2 group-hover:text-[#FFD700] transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-white font-bold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-white/30 line-through text-xs">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

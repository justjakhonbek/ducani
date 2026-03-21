'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '@/lib/data';

export function ProductGrid({ activeCategory }: { activeCategory: string }) {
  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.brand.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="products" className="w-full py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#FFD700]" />
              <span className="text-sm font-bold text-[#FFD700] uppercase tracking-wider">Каталог</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              ПОПУЛЯРНЫЕ<br />
              <span className="text-[#FFD700]">МОДЕЛИ</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full transition-all duration-300 group text-sm"
          >
            Весь каталог
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-8 py-4 rounded-full transition-all duration-300 group"
          >
            Смотреть все товары
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { ProductCard, Product } from '../components/ProductCard';
import { ArrowRight, Filter, Grid3X3, LayoutList } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG Chicago',
    brand: 'Jordan',
    price: 2490000,
    originalPrice: 2890000,
    image: '/products/jordan1-chicago.jpg',
    verified: true,
    trending: 'up',
    priceChange: 5.2,
    likes: 2341,
  },
  {
    id: 2,
    name: 'Nike Dunk Low Retro Panda',
    brand: 'Nike',
    price: 1290000,
    originalPrice: 1490000,
    image: '/products/dunk-panda.jpg',
    verified: true,
    trending: 'stable',
    priceChange: 0,
    likes: 1876,
  },
  {
    id: 3,
    name: 'Adidas Yeezy Boost 350 V2 Zebra',
    brand: 'Adidas',
    price: 1890000,
    image: '/products/yeezy-zebra.jpg',
    verified: true,
    trending: 'down',
    priceChange: -3.5,
    likes: 1523,
  },
  {
    id: 4,
    name: 'New Balance 550 White Green',
    brand: 'New Balance',
    price: 1590000,
    originalPrice: 1790000,
    image: '/products/nb550-green.jpg',
    verified: true,
    trending: 'up',
    priceChange: 8.1,
    likes: 987,
  },
  {
    id: 5,
    name: 'Nike Air Force 1 Low White',
    brand: 'Nike',
    price: 990000,
    image: '/products/af1-white.jpg',
    verified: true,
    trending: 'stable',
    priceChange: 0,
    likes: 3421,
  },
  {
    id: 6,
    name: 'Travis Scott x Air Jordan 1 Low',
    brand: 'Jordan',
    price: 8990000,
    image: '/products/ts-jordan-low.jpg',
    verified: true,
    trending: 'up',
    priceChange: 12.3,
    likes: 5678,
  },
  {
    id: 7,
    name: 'Air Jordan 4 Retro Military Black',
    brand: 'Jordan',
    price: 3290000,
    originalPrice: 3590000,
    image: '/products/jordan4-military.jpg',
    verified: true,
    trending: 'up',
    priceChange: 4.7,
    likes: 2134,
  },
  {
    id: 8,
    name: 'Adidas Samba OG White Black',
    brand: 'Adidas',
    price: 1090000,
    image: '/products/samba-white.jpg',
    verified: true,
    trending: 'up',
    priceChange: 15.2,
    likes: 2890,
  },
];

export function ProductGrid({ activeCategory }: { activeCategory: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.brand.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="products" ref={sectionRef} className="w-full py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#FFD700]" />
              <span className="text-sm font-bold text-[#FFD700] uppercase tracking-wider">Каталог</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              ПОПУЛЯРНЫЕ<br />
              <span className="text-gradient">МОДЕЛИ</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'list' ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-all">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Фильтры</span>
            </button>
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300 group">
            Показать больше
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

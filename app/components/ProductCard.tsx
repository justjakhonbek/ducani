'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, TrendingUp, TrendingDown, CheckCircle2, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  verified: boolean;
  trending: 'up' | 'down' | 'stable';
  priceChange: number;
  likes: number;
}

function formatUZS(price: number): string {
  return price.toLocaleString('ru-RU') + ' сум';
}

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(cardRef.current, { rotateY: x * 10, rotateX: -y * 10, duration: 0.3, ease: 'power2.out' });
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: x * 20, y: -y * 20, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    }
    setIsHovered(false);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative bg-[#141414] rounded-2xl overflow-hidden transition-all duration-300 ${
          isHovered ? 'shadow-[0_0_40px_rgba(255,215,0,0.2)]' : ''
        }`}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#141414]">
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.verified && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-500/90 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold text-white">ОРИГИНАЛ</span>
              </div>
            )}
            {discount > 0 && (
              <div className="px-2 py-1 bg-red-500/90 rounded-full">
                <span className="text-[10px] font-bold text-white">-{discount}%</span>
              </div>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
          >
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white/70'}`} />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className="w-full py-3 bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
              <ShoppingBag className="w-4 h-4" />
              В корзину
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">{product.brand}</div>
          <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[40px]">{product.name}</h3>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{formatUZS(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-white/40 line-through">{formatUZS(product.originalPrice)}</span>
                )}
              </div>
              <div className={`flex items-center gap-1 text-xs ${product.trending === 'up' ? 'text-green-400' : product.trending === 'down' ? 'text-red-400' : 'text-white/40'}`}>
                {product.trending === 'up' ? <TrendingUp className="w-3 h-3" /> : product.trending === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                <span>{product.trending === 'up' ? '+' : ''}{product.priceChange}% за 24ч</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/40">
              <Heart className="w-3 h-3" />
              <span className="text-xs">{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

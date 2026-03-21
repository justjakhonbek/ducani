'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft, ShoppingBag, MessageCircle, Share2, Heart } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/sections/Footer';
import { CartDrawer } from '@/app/components/CartDrawer';
import { ProductCard } from '@/app/components/ProductCard';
import { getProductById, formatPrice, PRODUCTS } from '@/lib/data';
import { useCart } from '@/app/context/CartContext';
import { notFound } from 'next/navigation';

const BADGE_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500',
  TRENDING: 'bg-[#FFD700] text-black',
  SALE: 'bg-red-500',
  RARE: 'bg-purple-500',
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) notFound();

  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [liked, setLiked] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.brand === product.brand).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const whatsappMsg = encodeURIComponent(
    `Здравствуйте! Интересует:\n${product.name}\nЦветовая гамма: ${product.colorway}\nАртикул: ${product.sku}\nЦена: ${formatPrice(product.price)}`
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <CartDrawer />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-white/70 truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full text-white ${BADGE_COLORS[product.badge] || 'bg-white/20'}`}
                >
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white/60'}`}
                />
              </button>
            </div>

            {/* Verification badge */}
            {product.verified && (
              <div className="flex items-center gap-3 px-4 py-3 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#FFD700] shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Верифицированный товар</p>
                  <p className="text-white/40 text-xs">
                    Каждая пара проверена экспертами DUCANI на оригинальность
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-[#FFD700] text-sm font-medium uppercase tracking-wider">
                {product.brand}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mt-1 leading-tight">
                {product.name}
              </h1>
              <p className="text-white/40 text-sm mt-1">{product.colorway}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-white/30 line-through text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="px-4 py-3 bg-white/5 rounded-xl">
                <p className="text-white/40 text-xs">Артикул</p>
                <p className="text-white font-medium mt-0.5">{product.sku}</p>
              </div>
              <div className="px-4 py-3 bg-white/5 rounded-xl">
                <p className="text-white/40 text-xs">Год релиза</p>
                <p className="text-white font-medium mt-0.5">{product.year || '—'}</p>
              </div>
            </div>

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                  Размер (EU)
                </h3>
                {selectedSize && (
                  <span className="text-[#FFD700] text-sm">Выбрано: EU {selectedSize}</span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.available}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      !s.available
                        ? 'border-white/5 text-white/15 cursor-not-allowed line-through'
                        : selectedSize === s.size
                        ? 'bg-[#FFD700] border-[#FFD700] text-black font-bold'
                        : 'border-white/10 text-white/70 hover:border-[#FFD700]/50 hover:text-white'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-white/30 text-xs mt-2">Выберите размер для добавления в корзину</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  selectedSize
                    ? addedMsg
                      ? 'bg-green-500 text-white'
                      : 'bg-[#FFD700] hover:bg-[#FFC700] text-black'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedMsg ? 'Добавлено в корзину!' : 'Добавить в корзину'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/998959760747?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/ducani_channel?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors border border-[#229ED9]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-white/5 pt-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                Описание
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Share */}
            <button
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
              className="flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Поделиться
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

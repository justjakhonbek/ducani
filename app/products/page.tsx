'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/sections/Footer';
import { ProductCard } from '@/app/components/ProductCard';
import { PRODUCTS, BRANDS, SIZES } from '@/lib/data';
import { CartDrawer } from '@/app/components/CartDrawer';

const SORT_OPTIONS = [
  { label: 'Сначала новые', value: 'new' },
  { label: 'Цена: по возрастанию', value: 'price_asc' },
  { label: 'Цена: по убыванию', value: 'price_desc' },
  { label: 'Популярные', value: 'popular' },
];

export default function ProductsPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string>('');
  const [sortBy, setSortBy] = useState('new');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s.size) && s.available)
      );
    }
    if (selectedBadge) {
      result = result.filter((p) => p.badge === selectedBadge);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return result;
  }, [selectedBrands, selectedSizes, selectedBadge, sortBy, priceRange]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedBadge('');
    setPriceRange([0, 10000000]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedSizes.length > 0 || selectedBadge !== '';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <CartDrawer />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 pb-20">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Каталог</h1>
          <p className="text-white/40 mt-1 text-sm">{filtered.length} товаров</p>
        </div>

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {/* Filter toggle (mobile) + active chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:border-[#FFD700]/50 hover:text-white transition-all text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
              {hasActiveFilters && (
                <span className="bg-[#FFD700] text-black text-xs font-bold px-1.5 rounded-full">
                  {selectedBrands.length + selectedSizes.length + (selectedBadge ? 1 : 0)}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" /> Сбросить
              </button>
            )}
            {selectedBrands.map((b) => (
              <span
                key={b}
                onClick={() => toggleBrand(b)}
                className="flex items-center gap-1 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-xs rounded-full cursor-pointer hover:bg-[#FFD700]/20"
              >
                {b} <X className="w-3 h-3" />
              </span>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-[#FFD700]/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`w-60 shrink-0 transition-all duration-300 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="space-y-6 sticky top-24">
              {/* Brands */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                  Бренд
                </h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div
                        onClick={() => toggleBrand(brand)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          selectedBrands.includes(brand)
                            ? 'bg-[#FFD700] border-[#FFD700]'
                            : 'border-white/20 group-hover:border-white/50'
                        }`}
                      >
                        {selectedBrands.includes(brand) && (
                          <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleBrand(brand)}
                        className={`text-sm transition-colors ${
                          selectedBrands.includes(brand)
                            ? 'text-white font-medium'
                            : 'text-white/50 group-hover:text-white/80'
                        }`}
                      >
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                  Размер (EU)
                </h3>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-[#FFD700] border-[#FFD700] text-black'
                          : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                  Статус
                </h3>
                <div className="space-y-1.5">
                  {['NEW', 'TRENDING', 'SALE', 'RARE'].map((badge) => (
                    <button
                      key={badge}
                      onClick={() => setSelectedBadge(selectedBadge === badge ? '' : badge)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedBadge === badge
                          ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <p className="text-white/40 text-lg">Товаров не найдено</p>
                <button
                  onClick={clearFilters}
                  className="text-[#FFD700] text-sm hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

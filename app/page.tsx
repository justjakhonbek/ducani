'use client';

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Categories } from './sections/Categories';
import { ProductGrid } from './sections/ProductGrid';
import { Trending } from './sections/Trending';
import { SocialFeed } from './sections/SocialFeed';
import { Footer } from './sections/Footer';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold">
            <span className="text-[#FFD700]">DU</span>
            <span className="text-white">CANI</span>
          </div>
          <p className="text-white/40 text-sm tracking-widest">ТАШКЕНТ · УЗБЕКИСТАН</p>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-[#FFD700]"
              style={{ animation: 'loading 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Categories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <ProductGrid activeCategory={activeCategory} />
        <Trending />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
}

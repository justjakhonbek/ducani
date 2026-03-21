'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Главная', href: '#hero' },
    { label: 'Товары', href: '#products' },
    { label: 'Тренды', href: '#trending' },
    { label: 'Сообщество', href: '#social' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight">
              <span className="text-[#FFD700]">DU</span>
              <span className="text-white">CANI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-[#FFD700] transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-white/70 hover:text-[#FFD700] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-[#FFD700] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-[#FFD700] transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-white/70 hover:text-[#FFD700] transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-black text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-2xl font-bold text-white hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-6 mt-8">
            <button className="p-3 text-white hover:text-[#FFD700] transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-3 text-white hover:text-[#FFD700] transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="relative p-3 text-white hover:text-[#FFD700] transition-colors">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-black text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

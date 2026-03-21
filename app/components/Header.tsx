'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/products' },
    { label: 'Тренды', href: '/products?sort=popular' },
    { label: 'Новинки', href: '/products?badge=NEW' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight">
              <span className="text-[#FFD700]">DU</span>
              <span className="text-white">CANI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-[#FFD700] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/products" className="p-2 text-white/70 hover:text-[#FFD700] transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {user ? (
              <>
                <Link href="/account" className="p-2 text-white/70 hover:text-[#FFD700] transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  title="Выйти"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-1.5 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-[#FFD700]/50 transition-all text-sm"
              >
                Войти
              </Link>
            )}

            <button
              onClick={openCart}
              className="relative p-2 text-white/70 hover:text-[#FFD700] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            <button onClick={openCart} className="relative p-2 text-white">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD700] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-16 bg-black/97 backdrop-blur-xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-2xl font-bold text-white hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-4">
            {user ? (
              <>
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-[#FFD700]">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-white/40 hover:text-red-400">
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 border border-white/20 rounded-full text-white text-sm">
                Войти
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

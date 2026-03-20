"use client";

import Image from "next/image";
import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#F5A800" : "none"} stroke={filled ? "#F5A800" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function VerifiedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A800" stroke="none">
      <path d="M12 2L13.09 8.26L19 7L15.45 11.73L21 14L15.45 16.27L19 21L13.09 15.74L12 22L10.91 15.74L5 21L8.55 16.27L3 14L8.55 11.73L5 7L10.91 8.26L12 2Z" />
    </svg>
  );
}
function FireIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F5A800">
      <path d="M12 2c0 0-4 4.5-4 8a4 4 0 0 0 8 0c0-3.5-4-8-4-8zm0 18a6 6 0 0 1-6-6c0-4 3-8 3-8s1 2 3 2 3-2 3-2 3 4 3 8a6 6 0 0 1-6 6z" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
function ArrowDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Все", "Кроссовки", "Одежда", "Аксессуары",
  "Коллаборации", "Новинки", "Распродажа", "Premium",
];

const PRODUCTS = [
  { id: 1, name: "Air Jordan 1 High OG", brand: "Jordan Brand", price: 18500, sold: 2341, img: "https://picsum.photos/seed/p1shoes/400/480", verified: true, hot: true, priceUp: true, change: "+2.1%" },
  { id: 2, name: "Yeezy Boost 350 V2", brand: "Adidas Originals", price: 22000, sold: 1876, img: "https://picsum.photos/seed/p2fashion/400/480", verified: true, hot: false, priceUp: false, change: "-0.8%" },
  { id: 3, name: "Nike Dunk Low Retro", brand: "Nike", price: 14900, sold: 3120, img: "https://picsum.photos/seed/p3style/400/480", verified: true, hot: true, priceUp: true, change: "+5.3%" },
  { id: 4, name: "New Balance 550", brand: "New Balance", price: 12500, sold: 987, img: "https://picsum.photos/seed/p4sneaker/400/480", verified: true, hot: false, priceUp: true, change: "+1.2%" },
  { id: 5, name: "DUCANI Signature Hoodie", brand: "DUCANI", price: 9800, sold: 543, img: "https://picsum.photos/seed/p5hoodie/400/480", verified: true, hot: true, priceUp: false, change: "-1.5%" },
  { id: 6, name: "Travis Scott x Jordan 1", brand: "Jordan x Travis", price: 89000, sold: 214, img: "https://picsum.photos/seed/p6collab/400/480", verified: true, hot: true, priceUp: true, change: "+12.4%" },
  { id: 7, name: "Adidas Samba OG", brand: "Adidas Originals", price: 11200, sold: 1654, img: "https://picsum.photos/seed/p7samba/400/480", verified: true, hot: false, priceUp: true, change: "+0.9%" },
  { id: 8, name: "DUCANI Logo Tee", brand: "DUCANI", price: 4900, sold: 876, img: "https://picsum.photos/seed/p8tee/400/480", verified: true, hot: false, priceUp: false, change: "-2.1%" },
  { id: 9, name: "Puma Speedcat OG", brand: "Puma", price: 8800, sold: 432, img: "https://picsum.photos/seed/p9puma/400/480", verified: true, hot: false, priceUp: true, change: "+3.7%" },
  { id: 10, name: "New Balance 1906R", brand: "New Balance", price: 16500, sold: 789, img: "https://picsum.photos/seed/p10nb/400/480", verified: true, hot: true, priceUp: true, change: "+7.2%" },
  { id: 11, name: "DUCANI Cargo Pants", brand: "DUCANI", price: 7800, sold: 321, img: "https://picsum.photos/seed/p11cargo/400/480", verified: true, hot: false, priceUp: false, change: "-0.3%" },
  { id: 12, name: "Off-White x Dunk", brand: "Nike x Off-White", price: 74000, sold: 98, img: "https://picsum.photos/seed/p12offwhite/400/480", verified: true, hot: true, priceUp: true, change: "+18.6%" },
];

const COMMUNITY_POSTS = [
  { id: 1, user: "streetking_msk", avatar: "https://picsum.photos/seed/user1/80/80", img: "https://picsum.photos/seed/post1outfit/600/700", caption: "Новые Jordan 1 только приехали 🔥 Аутфит готов", likes: 2341, product: "Air Jordan 1 High OG", productPrice: 18500 },
  { id: 2, user: "ducani.official", avatar: "https://picsum.photos/seed/user2/80/80", img: "https://picsum.photos/seed/post2look/600/700", caption: "DUCANI Hoodie + Yeezy это всё что нужно этой зимой", likes: 5872, product: "DUCANI Signature Hoodie", productPrice: 9800 },
  { id: 3, user: "sneakerhead_spb", avatar: "https://picsum.photos/seed/user3/80/80", img: "https://picsum.photos/seed/post3sneakers/600/700", caption: "Travis Scott x Jordan нашёл по хорошей цене на DUCANI ✅", likes: 1209, product: "Travis Scott x Jordan 1", productPrice: 89000 },
];

const FLASH_SALE_ITEMS = [
  { id: 1, name: "Jordan 1 Mid", price: 8900, originalPrice: 14000, img: "https://picsum.photos/seed/flash1/200/200", timeLeft: "02:14:33" },
  { id: 2, name: "Yeezy Slide", price: 5200, originalPrice: 8500, img: "https://picsum.photos/seed/flash2/200/200", timeLeft: "02:14:33" },
  { id: 3, name: "Nike AF1", price: 7600, originalPrice: 11000, img: "https://picsum.photos/seed/flash3/200/200", timeLeft: "02:14:33" },
  { id: 4, name: "Puma Clyde", price: 4800, originalPrice: 7200, img: "https://picsum.photos/seed/flash4/200/200", timeLeft: "02:14:33" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function DucaniLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <span className={`font-black tracking-tighter ${textSize}`} style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
      <span style={{ color: "#F5A800" }}>DU</span>
      <span style={{ color: "#FFFFFF" }}>CANI</span>
    </span>
  );
}

function ProductCard({ product, onLike, liked }: {
  product: typeof PRODUCTS[0];
  onLike: (id: number) => void;
  liked: boolean;
}) {
  return (
    <div
      className="product-card rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: "#111111", border: "1px solid #1f1f1f" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.hot && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#F5A800", color: "#000" }}>
              <FireIcon /> HOT
            </span>
          )}
        </div>
        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLike(product.id); }}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-all"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <HeartIcon filled={liked} />
        </button>
        {/* Price change badge */}
        <div
          className="absolute bottom-2 left-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: product.priceUp ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)",
            color: "#fff",
          }}
        >
          {product.priceUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {product.change}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs mb-1" style={{ color: "#666" }}>{product.brand}</p>
        <p className="text-sm font-medium leading-tight mb-2 line-clamp-2" style={{ color: "#fff" }}>
          {product.name}
        </p>
        {/* Verified + sold */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <VerifiedIcon />
            <span className="text-xs" style={{ color: "#F5A800" }}>Verified</span>
          </div>
          <span className="text-xs" style={{ color: "#555" }}>
            {product.sold.toLocaleString()} sold
          </span>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-black text-base" style={{ color: "#F5A800" }}>
            {product.price.toLocaleString()} ₽
          </span>
          <button
            className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
            style={{ background: "#F5A800", color: "#000" }}
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ post, onLike, liked }: {
  post: typeof COMMUNITY_POSTS[0];
  onLike: (id: number) => void;
  liked: boolean;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111111", border: "1px solid #1f1f1f" }}>
      {/* User header */}
      <div className="flex items-center gap-2 p-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image src={post.avatar} alt={post.user} fill className="object-cover" sizes="32px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">@{post.user}</p>
        </div>
        <button className="text-xs px-3 py-1 rounded-full font-medium" style={{ border: "1px solid #F5A800", color: "#F5A800" }}>
          Follow
        </button>
      </div>

      {/* Post image */}
      <div className="relative" style={{ aspectRatio: "4/5" }}>
        <Image src={post.img} alt="post" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
      </div>

      {/* Caption + product tag */}
      <div className="p-3 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: "#ccc" }}>{post.caption}</p>

        {/* Product tag */}
        <div
          className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
        >
          <div className="flex items-center gap-2">
            <VerifiedIcon />
            <div>
              <p className="text-xs font-medium" style={{ color: "#fff" }}>{post.product}</p>
              <p className="text-xs font-bold" style={{ color: "#F5A800" }}>{post.productPrice.toLocaleString()} ₽</p>
            </div>
          </div>
          <button className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "#F5A800", color: "#000" }}>
            Купить
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <HeartIcon filled={liked} />
            <span className="text-sm" style={{ color: liked ? "#F5A800" : "#666" }}>
              {(post.likes + (liked ? 1 : 0)).toLocaleString()}
            </span>
          </button>
          <button className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <ShareIcon />
            <span className="text-sm" style={{ color: "#666" }}>Поделиться</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchFocused, setSearchFocused] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleProductLike = (id: number) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const togglePostLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#000" }}>

      {/* ── Announcement Bar ─────────────────────────────────────────────── */}
      <div className="text-center py-2 text-xs font-semibold tracking-widest" style={{ background: "#F5A800", color: "#000" }}>
        БЕСПЛАТНАЯ ДОСТАВКА ОТ 10 000 ₽ &nbsp;·&nbsp; 100% ГАРАНТИЯ ПОДЛИННОСТИ &nbsp;·&nbsp; ВЕРИФИКАЦИЯ КАЖДОГО ТОВАРА
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <DucaniLogo />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
              style={{
                background: "#111",
                border: `1px solid ${searchFocused ? "#F5A800" : "#2a2a2a"}`,
              }}
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Поиск кроссовок, одежды, аксессуаров..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#fff" }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Nav actions */}
          <nav className="flex items-center gap-1">
            <button className="relative p-2.5 rounded-full transition-colors hover:bg-white/5" style={{ color: "#999" }}>
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#F5A800" }} />
            </button>
            <button className="relative p-2.5 rounded-full transition-colors hover:bg-white/5" style={{ color: "#999" }}>
              <CartIcon />
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold"
                style={{ background: "#F5A800", color: "#000" }}
              >3</span>
            </button>
            <button className="flex items-center gap-2 ml-2 px-3 py-2 rounded-full transition-colors" style={{ background: "#111", border: "1px solid #2a2a2a" }}>
              <UserIcon />
              <span className="text-sm hidden sm:block">Войти</span>
            </button>
          </nav>
        </div>

        {/* ── Category Bar ────────────────────────────────────────────────── */}
        <div className="scrollbar-hide overflow-x-auto" style={{ borderTop: "1px solid #111" }}>
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-2 w-max min-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  activeCategory === cat
                    ? { background: "#F5A800", color: "#000" }
                    : { color: "#888", background: "transparent" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/hero-ducani/1400/600"
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.2) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 flex items-center">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(245,168,0,0.15)", border: "1px solid rgba(245,168,0,0.3)", color: "#F5A800" }}>
              <span className="w-1.5 h-1.5 rounded-full price-live" style={{ background: "#F5A800" }} />
              НОВАЯ КОЛЛЕКЦИЯ SS 2026
            </div>
            <h1 className="text-5xl font-black leading-none mb-4" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
              <span className="gold-gradient">АУТЕНТИЧНО.</span>
              <br />
              <span style={{ color: "#fff" }}>ВЕРИФИЦИРОВАНО.</span>
            </h1>
            <p className="text-base mb-8" style={{ color: "#888", lineHeight: 1.7 }}>
              Каждый товар проходит 12-ступенчатую проверку подлинности. Покупай уверенно — продавай быстро.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#F5A800", color: "#000" }}
              >
                Смотреть коллекцию
              </button>
              <button
                className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                style={{ border: "1px solid #333", color: "#fff" }}
              >
                Продать товар
              </button>
            </div>
            {/* Stats */}
            <div className="flex gap-6 mt-10">
              {[
                { value: "200K+", label: "Товаров" },
                { value: "98%", label: "Подлинных" },
                { value: "1.2M", label: "Покупателей" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black" style={{ color: "#F5A800" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "#555" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Flash Sale ───────────────────────────────────────────────────── */}
      <section className="py-8" style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black" style={{ color: "#F5A800" }}>⚡ ФЛЭШ-РАСПРОДАЖА</span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg" style={{ background: "#1a1a1a" }}>
                <span className="text-sm font-mono font-bold" style={{ color: "#F5A800" }}>02</span>
                <span style={{ color: "#444" }}>:</span>
                <span className="text-sm font-mono font-bold" style={{ color: "#F5A800" }}>14</span>
                <span style={{ color: "#444" }}>:</span>
                <span className="text-sm font-mono font-bold" style={{ color: "#F5A800" }}>33</span>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm" style={{ color: "#666" }}>
              Все предложения <ChevronRightIcon />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FLASH_SALE_ITEMS.map((item) => {
              const discount = Math.round((1 - item.price / item.originalPrice) * 100);
              return (
                <div key={item.id} className="product-card rounded-xl overflow-hidden cursor-pointer p-3 flex gap-3" style={{ background: "#111", border: "1px solid #1f1f1f" }}>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium mb-1 truncate" style={{ color: "#ccc" }}>{item.name}</p>
                    <p className="text-sm font-black" style={{ color: "#F5A800" }}>{item.price.toLocaleString()} ₽</p>
                    <p className="text-xs line-through" style={{ color: "#444" }}>{item.originalPrice.toLocaleString()} ₽</p>
                    <span className="inline-block mt-1 text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                      -{discount}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black">
              <span className="gold-gradient">Трендовые</span>{" "}
              <span style={{ color: "#fff" }}>товары</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: "#555" }}>Цены обновляются в реальном времени</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#F5A800" }}>
            Все товары <ChevronRightIcon />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={toggleProductLike}
              liked={likedProducts.has(product.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Brand Categories ─────────────────────────────────────────────── */}
      <section className="py-10" style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-black mb-6" style={{ color: "#fff" }}>
            Популярные бренды
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {["Jordan", "Nike", "Adidas", "DUCANI", "New Balance", "Puma"].map((brand, i) => (
              <button
                key={brand}
                className="py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 product-card"
                style={{
                  background: "#111",
                  border: brand === "DUCANI" ? "1px solid #F5A800" : "1px solid #1f1f1f",
                  color: brand === "DUCANI" ? "#F5A800" : "#888",
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Feed ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black">
              <span style={{ color: "#fff" }}>Community</span>{" "}
              <span className="gold-gradient">Feed</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: "#555" }}>Реальные люди, реальные луки</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#F5A800" }}>
            Все посты <ChevronRightIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_POSTS.map((post) => (
            <CommunityCard
              key={post.id}
              post={post}
              onLike={togglePostLike}
              liked={likedPosts.has(post.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Verification Banner ──────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: "rgba(245,168,0,0.1)", border: "1px solid rgba(245,168,0,0.2)" }}>
            <VerifiedIcon />
            <span className="text-sm font-bold" style={{ color: "#F5A800" }}>DUCANI VERIFICATION</span>
          </div>
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
            <span style={{ color: "#fff" }}>Каждый товар</span>
            <br />
            <span className="gold-gradient">верифицирован</span>
          </h2>
          <p className="text-base mb-10 max-w-2xl mx-auto" style={{ color: "#666", lineHeight: 1.8 }}>
            12-ступенчатая проверка подлинности каждого товара командой экспертов. Если товар не настоящий — возвращаем деньги.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Получаем от продавца", desc: "Товар приходит к нам на склад" },
              { step: "02", title: "12 точек проверки", desc: "Эксперты изучают каждую деталь" },
              { step: "03", title: "Сертификат", desc: "Выдаём DUCANI Verified тег" },
              { step: "04", title: "Доставка", desc: "Отправляем покупателю" },
            ].map((item) => (
              <div key={item.step} className="text-center p-4 rounded-xl" style={{ background: "#111", border: "1px solid #1f1f1f" }}>
                <div className="text-3xl font-black mb-2" style={{ color: "rgba(245,168,0,0.2)" }}>{item.step}</div>
                <div className="text-sm font-bold mb-1" style={{ color: "#fff" }}>{item.title}</div>
                <div className="text-xs" style={{ color: "#555" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <DucaniLogo size="lg" />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#555" }}>
                Первая верифицированная платформа для уличной культуры в России.
              </p>
              <div className="flex gap-3 mt-4">
                {["TG", "VK", "IG", "YT"].map((s) => (
                  <button key={s} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#1a1a1a", color: "#666" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Links */}
            {[
              { title: "Покупателям", links: ["Как купить", "Верификация", "Доставка", "Возврат"] },
              { title: "Продавцам", links: ["Как продать", "Комиссия", "Выплаты", "Правила"] },
              { title: "Компания", links: ["О нас", "Вакансии", "Пресса", "Контакты"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-3" style={{ color: "#fff" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#555" }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: "1px solid #1a1a1a" }}>
            <p className="text-xs" style={{ color: "#333" }}>© 2026 DUCANI. Все права защищены.</p>
            <div className="flex gap-4">
              {["Политика конфиденциальности", "Пользовательское соглашение"].map((link) => (
                <a key={link} href="#" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "#333" }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Search, ShoppingBag, Bell, User, Heart, TrendingUp, TrendingDown,
  CheckCircle2, ArrowRight, Play, Flame, Filter, Grid3X3, LayoutList,
  MessageCircle, Share2, Bookmark, MapPin, Menu, X,
} from "lucide-react";

function formatUZS(n: number) {
  return n.toLocaleString("ru-UZ") + " UZS";
}

const CATEGORIES = [
  { id: "all",         label: "Все" },
  { id: "Nike",        label: "Nike" },
  { id: "Jordan",      label: "Jordan" },
  { id: "Adidas",      label: "Adidas" },
  { id: "New Balance", label: "New Balance" },
  { id: "DUCANI",      label: "DUCANI" },
];

const PRODUCTS = [
  { id: 1, name: "Air Jordan 1 Retro High OG Chicago", brand: "Jordan",      price: 2_990_000, originalPrice: 3_490_000,  image: "/products/jordan1-chicago.jpg", verified: true, trending: "up"     as const, priceChange: 5.2,  likes: 2341 },
  { id: 2, name: "Nike Dunk Low Retro Panda",          brand: "Nike",        price: 1_590_000, originalPrice: 1_790_000,  image: "/products/dunk-panda.jpg",       verified: true, trending: "stable" as const, priceChange: 0,    likes: 1876 },
  { id: 3, name: "Adidas Yeezy Boost 350 V2 Zebra",   brand: "Adidas",      price: 2_290_000, originalPrice: undefined,  image: "/products/yeezy-zebra.jpg",      verified: true, trending: "down"   as const, priceChange: -3.5, likes: 1523 },
  { id: 4, name: "New Balance 550 White Green",        brand: "New Balance", price: 1_990_000, originalPrice: 2_190_000,  image: "/products/nb550-green.jpg",       verified: true, trending: "up"     as const, priceChange: 8.1,  likes: 987  },
  { id: 5, name: "Nike Air Force 1 Low White",         brand: "Nike",        price: 1_190_000, originalPrice: undefined,  image: "/products/af1-white.jpg",         verified: true, trending: "stable" as const, priceChange: 0,    likes: 3421 },
  { id: 6, name: "Travis Scott x Air Jordan 1 Low",   brand: "Jordan",      price: 10_990_000,originalPrice: undefined,  image: "/products/ts-jordan-low.jpg",     verified: true, trending: "up"     as const, priceChange: 12.3, likes: 5678 },
  { id: 7, name: "Air Jordan 4 Retro Military Black",  brand: "Jordan",      price: 3_990_000, originalPrice: 4_390_000,  image: "/products/jordan4-military.jpg",  verified: true, trending: "up"     as const, priceChange: 4.7,  likes: 2134 },
  { id: 8, name: "Adidas Samba OG White Black",        brand: "Adidas",      price: 1_390_000, originalPrice: undefined,  image: "/products/samba-white.jpg",       verified: true, trending: "up"     as const, priceChange: 15.2, likes: 2890 },
];

const TRENDING_ITEMS = [
  { id: 1, name: "Air Jordan 1",  subtitle: "Chicago",      price: 2_990_000,  change: "+15.3%", image: "/products/jordan1-chicago.jpg", rank: 1 },
  { id: 2, name: "Nike Dunk",     subtitle: "Panda",        price: 1_590_000,  change: "+8.7%",  image: "/products/dunk-panda.jpg",       rank: 2 },
  { id: 3, name: "Yeezy 350",     subtitle: "Zebra",        price: 2_290_000,  change: "+22.1%", image: "/products/yeezy-zebra.jpg",      rank: 3 },
  { id: 4, name: "Travis Scott",  subtitle: "Jordan 1 Low", price: 10_990_000, change: "+31.5%", image: "/products/ts-jordan-low.jpg",    rank: 4 },
  { id: 5, name: "New Balance",   subtitle: "550",          price: 1_990_000,  change: "+12.8%", image: "/products/nb550-green.jpg",      rank: 5 },
];

const SOCIAL_POSTS = [
  { id: 1, user: "Alex Street",   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",  verified: true,  image: "/social/style1.jpg", product: { name: "Air Jordan 1 Chicago",       price: 2_990_000,  img: "/products/jordan1-chicago.jpg" }, likes: 2341, comments: 156, caption: "Наконец-то забрал свои Chicago! 🔥 Как вам образ?",              tags: ["#jordan1","#chicago","#sneakerhead","#streetstyle"] },
  { id: 2, user: "Maria Style",   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", verified: true,  image: "/social/style2.jpg", product: { name: "Nike Dunk Panda",            price: 1_590_000,  img: "/products/dunk-panda.jpg"       }, likes: 1876, comments: 89,  caption: "Классика никогда не выйдет из моды 🐼",                        tags: ["#dunk","#panda","#minimal","#fashion"] },
  { id: 3, user: "Crew Official", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crew",  verified: false, image: "/social/style3.jpg", product: { name: "Various Models",             price: 990_000,    img: "/products/af1-white.jpg"        }, likes: 5678, comments: 234, caption: "Наша команда в полном сборе! Какие кроссы у тебя сегодня? 👟", tags: ["#squad","#crew","#lifestyle"] },
  { id: 4, user: "Mike Kicks",    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",  verified: true,  image: "/social/style4.jpg", product: { name: "Travis Scott x Jordan 1 Low",price: 10_990_000, img: "/products/ts-jordan-low.jpg"    }, likes: 8902, comments: 445, caption: "Reverse Mocha hits different 🍫",                               tags: ["#travisscott","#jordan1","#grail"] },
];

const FLASH_SALE = [
  { id: 1, name: "Jordan 1 Mid", price: 1_100_000, originalPrice: 1_700_000, image: "/products/jordan4-military.jpg" },
  { id: 2, name: "Yeezy Slide",  price: 650_000,   originalPrice: 1_050_000, image: "/products/yeezy-zebra.jpg"      },
  { id: 3, name: "Nike AF1",     price: 950_000,   originalPrice: 1_400_000, image: "/products/af1-white.jpg"        },
  { id: 4, name: "Samba OG",     price: 890_000,   originalPrice: 1_390_000, image: "/products/samba-white.jpg"      },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function DucaniLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  return (
    <span className={`font-black tracking-tighter ${sz}`} style={{ fontFamily: "var(--font-oswald), Arial Black, sans-serif" }}>
      <span style={{ color: "#F5A800" }}>DU</span>
      <span style={{ color: "#fff" }}>CANI</span>
    </span>
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: "#000" }}>
      <DucaniLogo size="lg" />
      <p className="mt-2 text-xs tracking-widest uppercase" style={{ color: "#333" }}>Ташкент · Узбекистан</p>
      <div className="mt-8 w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "#111" }}>
        <div className="h-full rounded-full" style={{ background: "#F5A800", animation: "loadingBar 1.4s ease-in-out forwards" }} />
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (c: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <DucaniLogo />
          <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
            style={{ background: "#0f0f0f", color: "#444", border: "1px solid #1a1a1a" }}>
            <MapPin size={9} /> Ташкент
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-5 ml-4">
          {[["Главная","#hero"],["Каталог","#products"],["Тренды","#trending"],["Community","#social"]].map(([l,h]) => (
            <a key={l} href={h} className="text-sm transition-colors" style={{ color: "#555" }}
              onMouseEnter={e => (e.currentTarget.style.color="#F5A800")}
              onMouseLeave={e => (e.currentTarget.style.color="#555")}>{l}</a>
          ))}
        </nav>
        <div className="flex-1 max-w-md mx-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
            style={{ background: "#0f0f0f", border: `1px solid ${searchFocused ? "#F5A800" : "#1a1a1a"}` }}>
            <Search size={14} style={{ color: "#444" }} />
            <input type="text" placeholder="Поиск кроссовок, одежды..."
              className="flex-1 bg-transparent outline-none text-sm" style={{ color: "#fff" }}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors" style={{ color: "#555" }}>
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#F5A800" }} />
          </button>
          <button className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors" style={{ color: "#555" }}>
            <ShoppingBag size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "#F5A800", color: "#000" }}>3</span>
          </button>
          <button className="hidden sm:flex items-center gap-1.5 ml-1 px-3 py-2 rounded-full text-sm transition-colors hover:bg-white/5"
            style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", color: "#bbb" }}>
            <User size={15} /> Войти
          </button>
          <button className="md:hidden p-2.5 rounded-full hover:bg-white/5" style={{ color: "#555" }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="scrollbar-hide overflow-x-auto" style={{ borderTop: "1px solid #0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-1 py-2 w-max min-w-full">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => onCategoryChange(cat.id)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={activeCategory === cat.id ? { background: "#F5A800", color: "#000" } : { color: "#555" }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1" style={{ borderTop: "1px solid #111" }}>
          {[["Главная","#hero"],["Каталог","#products"],["Тренды","#trending"],["Community","#social"]].map(([l,h]) => (
            <a key={l} href={h} onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm" style={{ color: "#777" }}>{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import("gsap");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(imageRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, "-=1");
    })();
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(245,168,0,0.3) 0%, transparent 70%)", top: "5%", right: "-15%", transform: `translate(${mouse.x*25}px,${mouse.y*25}px)`, transition: "transform 0.3s ease-out" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(245,168,0,0.2) 0%, transparent 70%)", bottom: "-10%", left: "-10%", transform: `translate(${mouse.x*-18}px,${mouse.y*-18}px)`, transition: "transform 0.3s ease-out" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(245,168,0,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(245,168,0,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(245,168,0,0.1)", border: "1px solid rgba(245,168,0,0.2)" }}>
              <TrendingUp size={14} style={{ color: "#F5A800" }} />
              <span className="text-sm font-semibold" style={{ color: "#F5A800" }}>#1 Маркетплейс Ташкента</span>
            </div>
            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight"
              style={{ fontFamily: "var(--font-oswald),Arial Black,sans-serif" }}>
              <span style={{ color: "#fff" }}>АУТЕНТИЧНАЯ</span><br />
              <span className="text-gradient">УЛИЧНАЯ</span><br />
              <span style={{ color: "#fff" }}>КУЛЬТУРА</span>
            </h1>
            <p ref={subtitleRef} className="text-lg max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Эксклюзивные кроссовки с гарантией подлинности. Сообщество, где стиль встречается с культурой — прямо в Ташкенте.
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a href="#products" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-full text-base">
                В каталог <ArrowRight size={17} />
              </a>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-full text-base transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>
                <Play size={15} /> Смотреть обзор
              </button>
            </div>
            <div className="flex gap-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[{v:"50K+",l:"Товаров"},{v:"100%",l:"Оригинал"},{v:"24ч",l:"Доставка"}].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-black" style={{ color: "#F5A800", fontFamily: "var(--font-oswald),sans-serif" }}>{s.v}</div>
                  <div className="text-xs" style={{ color: "#444" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div ref={imageRef} className="relative flex items-center justify-center"
            style={{ transform: `perspective(1000px) rotateY(${mouse.x*5}deg) rotateX(${-mouse.y*5}deg)`, transition: "transform 0.1s ease-out" }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(245,168,0,0.18)" }} />
            </div>
            <div className="relative z-10 animate-float w-full max-w-lg">
              <Image src="/products/jordan1-chicago.jpg" alt="Air Jordan 1 Chicago" width={600} height={600}
                className="w-full drop-shadow-2xl object-contain" priority />
              <div className="absolute -right-4 top-1/4 glass-card rounded-2xl p-3.5 animate-pulse-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5A800" }}>
                    <TrendingUp size={15} className="text-black" />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Цена</div>
                    <div className="text-sm font-bold text-white">{formatUZS(2_990_000)}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 bottom-1/4 glass-card rounded-2xl p-3 hidden sm:flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 size={13} className="text-white" />
                </div>
                <span className="text-sm font-medium text-white">Верифицировано</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

// ─── Payment Bar ──────────────────────────────────────────────────────────────

function PaymentBar() {
  return (
    <div style={{ background: "#060606", borderTop: "1px solid #0d0d0d", borderBottom: "1px solid #0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 flex-wrap">
        <span className="text-xs" style={{ color: "#2a2a2a" }}>Оплата:</span>
        {["Payme","Click","Uzum Bank","Humo","UzCard","Нал"].map(p => (
          <span key={p} className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "#0a0a0a", color: "#444", border: "1px solid #141414" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Flash Sale ───────────────────────────────────────────────────────────────

function FlashSale() {
  return (
    <section className="py-8" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black" style={{ color: "#F5A800", fontFamily: "var(--font-oswald),sans-serif" }}>⚡ ФЛЭШ-РАСПРОДАЖА</span>
            <div className="flex items-center px-3 py-1 rounded-lg gap-1" style={{ background: "#111" }}>
              {["02","14","33"].map((t,i) => (
                <span key={i} className="flex items-center">
                  <span className="text-sm font-mono font-bold" style={{ color: "#F5A800" }}>{t}</span>
                  {i<2 && <span style={{ color: "#333", margin: "0 2px" }}>:</span>}
                </span>
              ))}
            </div>
          </div>
          <button className="text-sm flex items-center gap-1" style={{ color: "#444" }}>Все <ArrowRight size={13} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FLASH_SALE.map(item => {
            const disc = Math.round((1-item.price/item.originalPrice)*100);
            return (
              <div key={item.id} className="product-card rounded-xl overflow-hidden cursor-pointer flex gap-3 p-3"
                style={{ background: "#111", border: "1px solid #1a1a1a" }}>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-0.5 truncate" style={{ color: "#bbb" }}>{item.name}</p>
                  <p className="text-sm font-black" style={{ color: "#F5A800" }}>{formatUZS(item.price)}</p>
                  <p className="text-xs line-through" style={{ color: "#333" }}>{formatUZS(item.originalPrice)}</p>
                  <span className="inline-block mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>-{disc}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(cardRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: index * 0.07, ease: "power3.out",
            scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none reverse" } });
      }, cardRef);
      cleanup = () => ctx.revert();
    })();
    return () => cleanup?.();
  }, [index]);

  const onMouseMove = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { default: gsap } = await import("gsap");
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX-r.left-r.width/2)/r.width;
    const y = (e.clientY-r.top-r.height/2)/r.height;
    gsap.to(cardRef.current, { rotateY: x*10, rotateX: -y*10, duration: 0.3, ease: "power2.out" });
  };

  const onMouseLeave = async () => {
    if (!cardRef.current) return;
    const { default: gsap } = await import("gsap");
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
    setHovered(false);
  };

  const disc = product.originalPrice ? Math.round(((product.originalPrice-product.price)/product.originalPrice)*100) : 0;

  return (
    <div ref={cardRef} className="group relative" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onMouseLeave}>
      <div className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{ background: "#141414", boxShadow: hovered ? "0 0 40px rgba(245,168,0,0.18)" : "none", border: "1px solid #1a1a1a" }}>
        <div className="relative aspect-square overflow-hidden" style={{ background: "linear-gradient(to bottom,#1a1a1a,#141414)" }}>
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.verified && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.9)" }}>
                <CheckCircle2 size={9} className="text-white" />
                <span className="text-[10px] font-bold text-white">ОРИГИНАЛ</span>
              </div>
            )}
            {disc > 0 && (
              <div className="px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.9)" }}>
                <span className="text-[10px] font-bold text-white">-{disc}%</span>
              </div>
            )}
          </div>
          <button onClick={e => { e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <Heart size={14} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "rgba(255,255,255,0.65)"} />
          </button>
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px) 50vw,25vw" />
          <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <button className="w-full py-2.5 font-bold rounded-xl flex items-center justify-center gap-2 text-sm"
              style={{ background: "#F5A800", color: "#000" }}>
              <ShoppingBag size={14} /> В корзину
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F5A800" }}>{product.brand}</div>
          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]" style={{ color: "#ddd" }}>{product.name}</h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-lg font-black text-white">{formatUZS(product.price)}</div>
              {product.originalPrice && <span className="text-xs line-through" style={{ color: "#333" }}>{formatUZS(product.originalPrice)}</span>}
              <div className={`flex items-center gap-1 text-xs mt-0.5 ${product.trending==="up"?"text-green-400":product.trending==="down"?"text-red-400":"text-white/20"}`}>
                {product.trending==="up"?<TrendingUp size={10}/>:product.trending==="down"?<TrendingDown size={10}/>:null}
                <span>{product.trending==="up"?"+":""}{product.priceChange}% за 24ч</span>
              </div>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#333" }}>
              <Heart size={10} /><span className="text-xs">{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────

function ProductGrid({ activeCategory }: { activeCategory: string }) {
  const [viewMode, setViewMode] = useState<"grid"|"list">("grid");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" } });
    })();
  }, []);

  const filtered = activeCategory==="all" ? PRODUCTS : PRODUCTS.filter(p=>p.brand.toLowerCase()===activeCategory.toLowerCase());

  return (
    <section id="products" className="w-full py-16 lg:py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-0.5" style={{ background: "#F5A800" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F5A800" }}>Каталог</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none"
              style={{ fontFamily: "var(--font-oswald),sans-serif" }}>
              ПОПУЛЯРНЫЕ<br /><span className="text-gradient">МОДЕЛИ</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              {([["grid",Grid3X3],["list",LayoutList]] as const).map(([mode,Icon]) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className="p-2 rounded-md transition-all"
                  style={viewMode===mode?{background:"#F5A800",color:"#000"}:{color:"#444"}}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.04)", color: "#666" }}>
              <Filter size={14} /> Фильтры
            </button>
          </div>
        </div>
        <div className={`grid gap-5 ${viewMode==="grid"?"grid-cols-2 sm:grid-cols-3 lg:grid-cols-4":"grid-cols-1"}`}>
          {filtered.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="flex justify-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-full text-sm transition-all hover:bg-white/10 group"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
            Показать больше <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Trending ─────────────────────────────────────────────────────────────────

function TrendingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
        const track = trackRef.current;
        if (track) {
          const scrollWidth = track.scrollWidth - window.innerWidth + 200;
          gsap.to(track, {
            x: -scrollWidth, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 20%", end: `+=${scrollWidth}`, scrub: 1, pin: true, anticipatePin: 1 },
          });
        }
      }, sectionRef);
      cleanup = () => ctx.revert();
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section id="trending" ref={sectionRef} className="relative w-full min-h-screen overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: "rgba(245,168,0,0.04)" }} />
      </div>
      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-0.5" style={{ background: "#F5A800" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F5A800" }}>Топ роста</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black"
              style={{ fontFamily: "var(--font-oswald),sans-serif" }}>
              ТРЕНДЫ <span className="text-gradient">2026</span>
            </h2>
            <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
              Самые быстрорастущие модели за последние 24 часа.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full self-start"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-sm font-medium text-green-400">Рынок растёт</span>
          </div>
        </div>
      </div>
      <div ref={trackRef} className="relative z-10 flex items-center gap-8 px-4 sm:px-6 lg:px-12 pb-24"
        style={{ width: "max-content" }}>
        {TRENDING_ITEMS.map(item => (
          <div key={item.id} className="group relative w-[340px] sm:w-[380px] flex-shrink-0">
            <div className="relative rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(245,168,0,0.12)]"
              style={{ background: "linear-gradient(135deg,#141414,#0a0a0a)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: item.rank===1?"#F5A800":item.rank===2?"#c8c8c8":item.rank===3?"#cd7f32":"rgba(255,255,255,0.08)", color: item.rank<=3?"#000":"#fff" }}>
                  #{item.rank}
                </div>
                {item.rank===1 && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: "rgba(245,168,0,0.12)" }}>
                    <Flame size={10} style={{ color: "#F5A800" }} />
                    <span className="text-xs font-bold" style={{ color: "#F5A800" }}>HOT</span>
                  </div>
                )}
              </div>
              <div className="absolute top-5 right-5 z-20">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <TrendingUp size={10} className="text-green-400" />
                  <span className="text-sm font-bold text-green-400">{item.change}</span>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10" />
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="380px" />
              </div>
              <div className="relative z-20 p-6 -mt-20">
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-oswald),sans-serif" }}>{item.name}</h3>
                <p className="text-base mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{item.subtitle}</p>
                <div className="flex items-center justify-between mt-5">
                  <div className="text-2xl font-black" style={{ color: "#F5A800" }}>{formatUZS(item.price)}</div>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all group-hover:bg-[#F5A800] group-hover:text-black"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#fff" }}>
                    Купить <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[260px] flex-shrink-0 flex items-center justify-center">
          <div className="text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{ background: "rgba(245,168,0,0.08)", border: "1px solid rgba(245,168,0,0.2)" }}>
              <ArrowRight size={22} style={{ color: "#F5A800" }} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-oswald),sans-serif" }}>Смотреть все тренды</h3>
              <p className="text-sm mt-1" style={{ color: "#444" }}>Более 500 моделей</p>
            </div>
            <button className="btn-gold px-7 py-3 rounded-full font-bold text-sm">Перейти</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Feed ──────────────────────────────────────────────────────────────

function SocialFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
        const cards = gridRef.current?.querySelectorAll(".social-card");
        if (cards) {
          gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
        }
      }, sectionRef);
      return () => ctx.revert();
    })();
  }, []);

  const toggle = (id: number) => setLikedPosts(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  return (
    <section id="social" ref={sectionRef} className="w-full py-24 lg:py-32" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-0.5" style={{ background: "#F5A800" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F5A800" }}>Сообщество</span>
            <div className="w-10 h-0.5" style={{ background: "#F5A800" }} />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-oswald),sans-serif" }}>СТИЛЬ В ДЕЙСТВИИ</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
            Вдохновляйся образами нашего сообщества из Ташкента. Нажми на фото, чтобы купить прямо из поста.
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOCIAL_POSTS.map((post,i) => (
            <div key={post.id} className={`social-card group relative ${i===0||i===3?"lg:row-span-2":""}`}>
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,168,0,0.08)]"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className={`relative overflow-hidden ${i===0||i===3?"aspect-[3/4]":"aspect-square"}`}>
                  <Image src={post.image} alt={post.caption} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw,25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={post.product.img} alt={post.product.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.55)" }}>{post.product.name}</div>
                        <div className="text-sm font-bold" style={{ color: "#F5A800" }}>{formatUZS(post.product.price)}</div>
                      </div>
                      <button className="p-1.5 rounded-lg flex-shrink-0" style={{ background: "#F5A800" }}>
                        <ShoppingBag size={13} className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-white">{post.user}</span>
                      {post.verified && <CheckCircle2 size={13} style={{ color: "#F5A800" }} />}
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>{post.caption}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0,2).map(t=>(
                      <span key={t} className="text-xs cursor-pointer" style={{ color: "rgba(245,168,0,0.6)" }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggle(post.id)} className="flex items-center gap-1 transition-colors hover:text-red-400" style={{ color: "rgba(255,255,255,0.35)" }}>
                        <Heart size={13} fill={likedPosts.includes(post.id)?"#ef4444":"none"} color={likedPosts.includes(post.id)?"#ef4444":undefined} />
                        <span className="text-xs">{post.likes+(likedPosts.includes(post.id)?1:0)}</span>
                      </button>
                      <button className="flex items-center gap-1 transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                        <MessageCircle size={13} /><span className="text-xs">{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}><Share2 size={13} /></button>
                      <button className="transition-colors hover:text-[#F5A800]" style={{ color: "rgba(255,255,255,0.35)" }}><Bookmark size={13} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-8 py-3.5 font-bold rounded-full text-sm transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#fff" }}>
            Загрузить свой образ
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Pickup Points ────────────────────────────────────────────────────────────

function PickupPoints() {
  return (
    <section className="py-12" style={{ background: "#060606", borderTop: "1px solid #0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-black mb-1" style={{ fontFamily: "var(--font-oswald),sans-serif" }}>
          Пункты выдачи — <span style={{ color: "#F5A800" }}>Ташкент</span>
        </h2>
        <p className="text-sm mb-6" style={{ color: "#333" }}>Заберите заказ в удобном месте</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { district: "Чиланзар", address: "Бунёдкор шох кўчаси, 12",    time: "09:00 – 21:00" },
            { district: "Юнусабад", address: "Амир Темур шох кўчаси, 107", time: "09:00 – 21:00" },
            { district: "Сергели",  address: "Сергели тумани, 5-мавзе",    time: "10:00 – 20:00" },
          ].map(pt => (
            <div key={pt.district} className="p-4 rounded-xl" style={{ background: "#0a0a0a", border: "1px solid #141414" }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={12} style={{ color: "#F5A800" }} />
                <span className="font-bold text-sm" style={{ color: "#F5A800" }}>{pt.district}</span>
              </div>
              <p className="text-xs mb-1" style={{ color: "#999" }}>{pt.address}</p>
              <p className="text-xs" style={{ color: "#333" }}>{pt.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Verification ─────────────────────────────────────────────────────────────

function Verification() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg,#060606,#0f0f0f)", borderTop: "1px solid #0d0d0d" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
          style={{ background: "rgba(245,168,0,0.07)", border: "1px solid rgba(245,168,0,0.13)" }}>
          <CheckCircle2 size={13} style={{ color: "#F5A800" }} />
          <span className="text-sm font-bold" style={{ color: "#F5A800" }}>DUCANI VERIFICATION</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-oswald),sans-serif" }}>
          <span className="text-white">Каждый товар</span><br /><span className="text-gradient">верифицирован</span>
        </h2>
        <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: "#444", lineHeight: 1.8 }}>
          12-ступенчатая проверка подлинности командой экспертов. Если товар не настоящий — возвращаем деньги.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { step:"01", title:"Получаем от продавца",  desc:"Товар приходит к нам на склад" },
            { step:"02", title:"12 точек проверки",     desc:"Эксперты изучают каждую деталь" },
            { step:"03", title:"Сертификат",            desc:"Выдаём DUCANI Verified тег" },
            { step:"04", title:"Доставка",              desc:"Отправляем покупателю" },
          ].map(s => (
            <div key={s.step} className="p-4 rounded-xl text-center" style={{ background: "#0a0a0a", border: "1px solid #141414" }}>
              <div className="text-3xl font-black mb-2" style={{ color: "rgba(245,168,0,0.12)", fontFamily: "var(--font-oswald),sans-serif" }}>{s.step}</div>
              <div className="text-sm font-bold mb-1 text-white">{s.title}</div>
              <div className="text-xs" style={{ color: "#333" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid #0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <DucaniLogo size="lg" />
            <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#F5A800" }}>
              <MapPin size={9} /> Ташкент, Узбекистан
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#333" }}>
              Первая верифицированная платформа уличной культуры в Узбекистане.
            </p>
            <div className="flex gap-2 mt-4">
              {["TG","IG","YT","TT"].map(s=>(
                <button key={s} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#0f0f0f", color: "#444", border: "1px solid #141414" }}>{s}</button>
              ))}
            </div>
          </div>
          {[
            { title:"Покупателям",  links:["Как купить","Верификация","Доставка","Возврат"] },
            { title:"Продавцам",    links:["Как продать","Комиссия","Выплаты","Правила"] },
            { title:"Компания",     links:["О нас","Вакансии","Пресса","Контакты"] },
          ].map(col=>(
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-3 text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l=>(
                  <li key={l}><a href="#" className="text-sm transition-opacity hover:opacity-80" style={{ color: "#333" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-7 mb-7" style={{ borderTop: "1px solid #0d0d0d", borderBottom: "1px solid #0d0d0d" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">Получай первым о новинках</p>
              <p className="text-xs mt-0.5" style={{ color: "#333" }}>Эксклюзивные дропы и скидки — только подписчикам</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder="email@example.com"
                className="flex-1 sm:w-60 px-4 py-2.5 rounded-full text-sm outline-none"
                style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", color: "#fff" }} />
              <button className="btn-gold px-4 py-2.5 rounded-full flex-shrink-0">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#1f1f1f" }}>© 2026 DUCANI. Ташкент, Узбекистан. Все права защищены.</p>
          <div className="flex gap-4">
            {["Конфиденциальность","Соглашение"].map(l=>(
              <a key={l} href="#" className="text-xs transition-opacity hover:opacity-70" style={{ color: "#1f1f1f" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease 0.1s" }}>
        <div className="text-center py-2 text-xs font-semibold tracking-wide" style={{ background: "#F5A800", color: "#000" }}>
          🚚 БЕСПЛАТНАЯ ДОСТАВКА ПО ТАШКЕНТУ &nbsp;·&nbsp; ✅ 100% ГАРАНТИЯ ПОДЛИННОСТИ &nbsp;·&nbsp; 📍 ЧИЛАНЗАР · ЮНУСАБАД · СЕРГЕЛИ
        </div>
        <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <Hero />
        <PaymentBar />
        <FlashSale />
        <ProductGrid activeCategory={activeCategory} />
        <TrendingSection />
        <SocialFeed />
        <PickupPoints />
        <Verification />
        <Footer />
      </div>
    </>
  );
}

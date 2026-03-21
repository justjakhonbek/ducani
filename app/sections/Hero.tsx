'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(subtitleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo(imageRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=1');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: '50K+', label: 'Товаров' },
    { value: '100%', label: 'Оригинал' },
    { value: '24ч', label: 'Доставка' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
            top: '10%', right: '-20%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
            bottom: '-10%', left: '-10%',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20">
              <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm font-medium text-[#FFD700]">#1 Маркетплейс кроссовок в Ташкенте</span>
            </div>

            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
              <span className="text-white">АУТЕНТИЧНАЯ</span>
              <br />
              <span className="text-gradient">УЛИЧНАЯ</span>
              <br />
              <span className="text-white">КУЛЬТУРА</span>
            </h1>

            <p ref={subtitleRef} className="text-lg sm:text-xl text-white/60 max-w-lg leading-relaxed">
              Эксклюзивные кроссовки от мировых брендов с гарантией подлинности.
              Ташкент&apos;ин уличная культура и стиль — в одном месте.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-center gap-2">
                В каталог
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300">
                Как это работает
              </button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div
            ref={imageRef}
            className="relative flex items-center justify-center"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#FFD700]/20 blur-[100px]" />
            </div>

            <div className="relative z-10 animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/jordan1-chicago.jpg"
                alt="Air Jordan 1 Chicago"
                className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-2xl"
              />

              {/* Price Tag */}
              <div className="absolute -right-4 top-1/4 glass-card rounded-2xl p-4 animate-pulse-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Текущая цена</div>
                    <div className="text-lg font-bold text-white">2 490 000 сум</div>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute -left-4 bottom-1/4 glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">Верифицировано</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { TrendingUp, ArrowRight, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trendingItems = [
  { id: 1, name: 'Air Jordan 1', subtitle: 'Chicago', price: '2 490 000 сум', change: '+15.3%', image: '/products/jordan1-chicago.jpg', rank: 1 },
  { id: 2, name: 'Nike Dunk', subtitle: 'Panda', price: '1 290 000 сум', change: '+8.7%', image: '/products/dunk-panda.jpg', rank: 2 },
  { id: 3, name: 'Yeezy 350', subtitle: 'Zebra', price: '1 890 000 сум', change: '+22.1%', image: '/products/yeezy-zebra.jpg', rank: 3 },
  { id: 4, name: 'Travis Scott', subtitle: 'Jordan 1 Low', price: '8 990 000 сум', change: '+31.5%', image: '/products/ts-jordan-low.jpg', rank: 4 },
  { id: 5, name: 'New Balance', subtitle: '550', price: '1 590 000 сум', change: '+12.8%', image: '/products/nb550-green.jpg', rank: 5 },
];

export function Trending() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

      const track = trackRef.current;
      if (track) {
        const scrollWidth = track.scrollWidth - window.innerWidth + 200;
        gsap.to(track, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trending" ref={sectionRef} className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FFD700]/5 blur-[150px]" />
      </div>

      <div ref={headerRef} className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#FFD700]" />
              <span className="text-sm font-bold text-[#FFD700] uppercase tracking-wider">Топ роста</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              ТРЕНДЫ <span className="text-gradient">2026</span>
            </h2>
            <p className="text-white/50 max-w-md">
              Самые быстрорастущие модели за последние 24 часа. Цены обновляются в реальном времени.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Рынок растёт</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="relative z-10 flex items-center gap-8 px-4 sm:px-6 lg:px-12 xl:px-20 pb-24" style={{ width: 'max-content' }}>
        {trendingItems.map((item) => (
          <div key={item.id} className="group relative w-[350px] sm:w-[400px] lg:w-[450px] flex-shrink-0">
            <div className="relative bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-[#FFD700]/30 group-hover:shadow-[0_0_60px_rgba(255,215,0,0.15)]">
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${item.rank === 1 ? 'bg-[#FFD700] text-black' : item.rank === 2 ? 'bg-gray-300 text-black' : item.rank === 3 ? 'bg-amber-600 text-white' : 'bg-white/10 text-white'}`}>
                  #{item.rank}
                </div>
                {item.rank === 1 && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#FFD700]/20 rounded-full">
                    <Flame className="w-3 h-3 text-[#FFD700]" />
                    <span className="text-xs font-bold text-[#FFD700]">HOT</span>
                  </div>
                )}
              </div>

              <div className="absolute top-6 right-6 z-20">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-sm font-bold text-green-400">{item.change}</span>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>

              <div className="relative z-20 p-6 -mt-20">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  <p className="text-lg text-white/60">{item.subtitle}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="text-xl font-bold text-[#FFD700]">{item.price}</div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#FFD700] text-white hover:text-black rounded-full transition-all duration-300 group/btn">
                    <span className="text-sm font-bold">Купить</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="w-[300px] sm:w-[350px] flex-shrink-0 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Смотреть все тренды</h3>
              <p className="text-white/50">Более 500 моделей в рейтинге</p>
            </div>
            <button className="px-8 py-3 bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold rounded-full transition-all">
              Перейти
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

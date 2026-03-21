'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', name: 'Все' },
  { id: 'nike', name: 'Nike' },
  { id: 'jordan', name: 'Jordan' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'newbalance', name: 'New Balance' },
];

interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8 bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div ref={tabsRef} className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <span className="absolute inset-0 rounded-full bg-[#FFD700] animate-pulse opacity-30" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

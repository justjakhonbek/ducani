'use client';

import { useRef, useEffect } from 'react';
import { Instagram, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  shop: ['Все товары', 'Новинки', 'Тренды', 'Распродажа'],
  brands: ['Nike', 'Jordan', 'Adidas', 'New Balance'],
  support: ['Доставка', 'Возврат', 'Размеры', 'FAQ'],
  company: ['О нас', 'Контакты', 'Блог', 'Карьера'],
};

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#0a0a0a] border-t border-white/5">
      {/* Big Logo */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-24 overflow-hidden">
        <div ref={logoRef} className="relative">
          <h2 className="text-[15vw] lg:text-[12vw] font-bold leading-none tracking-tighter text-center">
            <span className="text-[#FFD700]">DU</span>
            <span className="text-white">CANI</span>
          </h2>
          <p className="text-center text-white/40 mt-4 text-lg">Аутентичная уличная культура — Ташкент</p>
        </div>
      </div>

      {/* Links Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {[
            { title: 'Магазин', links: footerLinks.shop },
            { title: 'Бренды', links: footerLinks.brands },
            { title: 'Поддержка', links: footerLinks.support },
            { title: 'Компания', links: footerLinks.company },
          ].map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-[#FFD700] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacts */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Контакты</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#FFD700]" />
                  <span>Ташкент, Янгихайотский р-н,<br />Fayzli MFY, Rayxon ko&apos;chasi, 107-uy</span>
                </div>
                <a href="tel:+998959760747" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#FFD700] transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-[#FFD700]" />
                  <span>+998 95 976-07-47</span>
                </a>
                <a href="mailto:justjakhonbek@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#FFD700] transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-[#FFD700]" />
                  <span>justjakhonbek@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Подписка</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFD700]/50"
                />
                <button className="p-2 bg-[#FFD700] hover:bg-[#FFC700] rounded-lg transition-colors">
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://t.me/ducani_channel" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors text-sm font-medium">
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a href="https://wa.me/998959760747" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
            <a href="https://maps.google.com/?q=41.204408,69.238406" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 transition-colors text-sm font-medium">
              <MapPin className="w-4 h-4" /> Карта
            </a>
          </div>
          <div className="text-sm text-white/40">© 2026 DUCANI. Ташкент, Узбекистан</div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ShoppingBag, BadgeCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialPosts = [
  {
    id: 1,
    user: { name: 'Jasur_Kicks', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jasur', verified: true },
    image: '/social/style1.jpg',
    product: { name: 'Air Jordan 1 Chicago', price: '2 490 000 сум', image: '/products/jordan1-chicago.jpg' },
    likes: 2341, comments: 156,
    caption: 'Наконец-то забрал своих Chicago в Ташкенте! 🔥 Как вам образ?',
    tags: ['#jordan1', '#chicago', '#ducani', '#tashkent'],
  },
  {
    id: 2,
    user: { name: 'Nilufar_Style', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nilufar', verified: true },
    image: '/social/style2.jpg',
    product: { name: 'Nike Dunk Panda', price: '1 290 000 сум', image: '/products/dunk-panda.jpg' },
    likes: 1876, comments: 89,
    caption: 'Классика никогда не выйдет из моды 🐼 Chilonzor represent!',
    tags: ['#dunk', '#panda', '#chilonzor', '#style'],
  },
  {
    id: 3,
    user: { name: 'Tashkent_Crew', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crew', verified: false },
    image: '/social/style3.jpg',
    product: { name: 'Various Models', price: 'от 990 000 сум', image: '/products/af1-white.jpg' },
    likes: 5678, comments: 234,
    caption: 'Наша команда готова! Yunusabad skate park 🛹 Какие кроссы сегодня?',
    tags: ['#yunusabad', '#skate', '#tashkent', '#lifestyle'],
  },
  {
    id: 4,
    user: { name: 'Bobur_Hypebeast', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bobur', verified: true },
    image: '/social/style4.jpg',
    product: { name: 'Travis Scott x Jordan 1', price: '8 990 000 сум', image: '/products/ts-jordan-low.jpg' },
    likes: 8902, comments: 445,
    caption: 'Reverse Mocha — это другой уровень 🍫 Mirzo-Ulugbek style',
    tags: ['#travisscott', '#jordan1', '#hypebeast', '#ducani'],
  },
];

export function SocialFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = gridRef.current?.querySelectorAll('.social-card');
      if (cards) {
        gsap.fromTo(cards, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <section id="social" ref={sectionRef} className="w-full py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-[#FFD700]" />
            <span className="text-sm font-bold text-[#FFD700] uppercase tracking-wider">Сообщество Ташкента</span>
            <div className="w-12 h-1 bg-[#FFD700]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">СТИЛЬ В ДЕЙСТВИИ</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Вдохновляйся образами нашего сообщества из Ташкента. Нажми на фото, чтобы купить прямо из поста.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post, index) => (
            <div key={post.id} className={`social-card group relative ${index === 0 || index === 3 ? 'lg:row-span-2' : ''}`}>
              <div className="relative h-full bg-[#141414] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#FFD700]/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer hover:bg-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.product.image} alt={post.product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white/60 truncate">{post.product.name}</div>
                        <div className="text-sm font-bold text-[#FFD700]">{post.product.price}</div>
                      </div>
                      <button className="p-2 bg-[#FFD700] hover:bg-[#FFC700] rounded-lg transition-colors">
                        <ShoppingBag className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-white">{post.user.name}</span>
                      {post.user.verified && <BadgeCheck className="w-4 h-4 text-[#FFD700]" />}
                    </div>
                  </div>

                  <p className="text-sm text-white/70 line-clamp-2">{post.caption}</p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-[#FFD700]/70 hover:text-[#FFD700] cursor-pointer transition-colors">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 text-white/50 hover:text-red-400 transition-colors">
                        <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="text-xs">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/50 hover:text-white transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-white/50 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                      <button className="text-white/50 hover:text-[#FFD700] transition-colors"><Bookmark className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD700]/30 text-white font-bold rounded-full transition-all duration-300">
            Загрузить свой образ
          </button>
        </div>
      </div>
    </section>
  );
}

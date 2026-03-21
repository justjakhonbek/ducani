'use client';

import Link from 'next/link';
import { CheckCircle, Package, MessageCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-center">
      {/* Animated check */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">Заказ оформлен!</h1>
      <p className="text-white/50 max-w-sm mb-10 leading-relaxed">
        Мы получили твой заказ и свяжемся с тобой в течение 30 минут для подтверждения.
      </p>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3 mb-10">
        {[
          { icon: <CheckCircle className="w-5 h-5 text-green-400" />, text: 'Заказ получен', done: true },
          { icon: <Package className="w-5 h-5 text-[#FFD700]" />, text: 'Верификация товара (1-2 дня)', done: false },
          { icon: <ArrowRight className="w-5 h-5 text-white/30" />, text: 'Доставка по Ташкенту', done: false },
        ].map((step, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${step.done ? 'bg-green-500/5 border-green-500/20' : 'bg-white/3 border-white/5'}`}>
            {step.icon}
            <span className={`text-sm ${step.done ? 'text-green-400' : 'text-white/50'}`}>{step.text}</span>
          </div>
        ))}
      </div>

      {/* WhatsApp contact */}
      <a
        href="https://wa.me/998959760747?text=Здравствуйте! Я только что оформил заказ на DUCANI."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-xl hover:bg-[#25D366]/20 transition-colors mb-4 text-sm font-medium"
      >
        <MessageCircle className="w-4 h-4" />
        Написать нам в WhatsApp
      </a>

      <Link href="/products" className="text-white/40 hover:text-white text-sm transition-colors">
        Продолжить покупки →
      </Link>

      <Link href="/" className="mt-2 text-white/20 hover:text-white/50 text-xs transition-colors">
        На главную
      </Link>
    </div>
  );
}

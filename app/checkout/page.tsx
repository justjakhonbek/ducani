'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/data';

const PAYME_MERCHANT_ID = process.env.NEXT_PUBLIC_PAYME_MERCHANT_ID || '';
const CLICK_SERVICE_ID = process.env.NEXT_PUBLIC_CLICK_SERVICE_ID || '';
const CLICK_MERCHANT_ID = process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID || '';

function buildPaymeUrl(orderId: string, amountUZS: number): string {
  // Payme принимает сумму в тийинах (1 UZS = 100 tiyin)
  const amountTiyin = amountUZS * 100;
  const params = `m=${PAYME_MERCHANT_ID};ac.order_id=${orderId};a=${amountTiyin}`;
  const encoded = btoa(params);
  return `https://checkout.paycom.uz/${encoded}`;
}

function buildClickUrl(orderId: string, amountUZS: number): string {
  return `https://my.click.uz/services/pay?service_id=${CLICK_SERVICE_ID}&merchant_id=${CLICK_MERCHANT_ID}&amount=${amountUZS}&transaction_param=${orderId}&return_url=${encodeURIComponent(window.location.origin + '/account')}`;
}

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [payMethod, setPayMethod] = useState<'payme' | 'click' | 'cash'>('payme');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const DELIVERY = 50000;
  const grandTotal = totalPrice + DELIVERY;

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      setError('Заполните имя и телефон');
      return;
    }
    if (items.length === 0) return;

    setLoading(true);
    setError('');

    try {
      // 1. Создать заказ в Supabase
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id ?? null,
          status: 'pending',
          total_price: grandTotal,
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          payment_method: payMethod,
          notes,
        })
        .select()
        .single();

      if (orderErr) throw orderErr;

      // 2. Добавить позиции
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        size: item.size,
        price: item.product.price,
        quantity: item.quantity,
      }));

      await supabase.from('order_items').insert(orderItems);

      // 3. Уведомление в Telegram
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            id: order.id,
            customer_name: name,
            customer_phone: phone,
            customer_address: address,
            payment_method: payMethod,
            total_price: grandTotal,
            notes,
          },
          items: items.map((i) => ({
            name: i.product.name,
            size: i.size,
            quantity: i.quantity,
            price: i.product.price,
          })),
        }),
      }).catch(() => {}); // не блокируем если Telegram недоступен

      // 4. Редирект на оплату
      if (payMethod === 'payme' && PAYME_MERCHANT_ID) {
        clear();
        window.location.href = buildPaymeUrl(order.id, grandTotal);
      } else if (payMethod === 'click' && CLICK_SERVICE_ID) {
        clear();
        window.location.href = buildClickUrl(order.id, grandTotal);
      } else if (payMethod === 'cash') {
        clear();
        // WhatsApp подтверждение
        const msg = encodeURIComponent(
          `Новый заказ #${order.id.slice(0, 8).toUpperCase()}\n\nПокупатель: ${name}\nТелефон: ${phone}\nАдрес: ${address || 'Самовывоз'}\n\nТовары:\n${items.map((i) => `• ${i.product.name} EU${i.size} x${i.quantity} — ${formatPrice(i.product.price)}`).join('\n')}\n\nДоставка: ${formatPrice(DELIVERY)}\nИтого: ${formatPrice(grandTotal)}\n\nОплата: Наличными`
        );
        window.open(`https://wa.me/998959760747?text=${msg}`, '_blank');
        window.location.href = '/account';
      }
    } catch {
      setError('Ошибка оформления заказа. Попробуйте ещё раз.');
    }

    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <p className="text-white/40">Корзина пуста</p>
        <Link href="/products" className="text-[#FFD700] hover:underline text-sm">
          Перейти в каталог →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/products" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Каталог
        </Link>
        <Link href="/">
          <span className="text-xl font-bold">
            <span className="text-[#FFD700]">DU</span><span className="text-white">CANI</span>
          </span>
        </Link>
        <div className="w-16" />
      </div>

      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl">
          {/* LEFT: Form */}
          <div className="space-y-6">
            {/* Contacts */}
            <div className="space-y-4">
              <h2 className="text-white font-bold">Контактные данные</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя и фамилия *"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67 *"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Адрес доставки (или 'Самовывоз')"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Комментарий к заказу (необязательно)"
                rows={2}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm resize-none"
              />
            </div>

            {/* Payment method */}
            <div className="space-y-3">
              <h2 className="text-white font-bold">Способ оплаты</h2>

              {[
                {
                  id: 'payme',
                  label: 'Payme',
                  desc: 'Оплата онлайн через Payme',
                  icon: <CreditCard className="w-5 h-5" />,
                  color: 'text-[#00AAFF]',
                  bg: 'bg-[#00AAFF]/10',
                  border: 'border-[#00AAFF]/20',
                },
                {
                  id: 'click',
                  label: 'Click',
                  desc: 'Оплата онлайн через Click',
                  icon: <Smartphone className="w-5 h-5" />,
                  color: 'text-[#00C853]',
                  bg: 'bg-[#00C853]/10',
                  border: 'border-[#00C853]/20',
                },
                {
                  id: 'cash',
                  label: 'Наличными / Перевод',
                  desc: 'При получении или через WhatsApp',
                  icon: <ShieldCheck className="w-5 h-5" />,
                  color: 'text-[#FFD700]',
                  bg: 'bg-[#FFD700]/10',
                  border: 'border-[#FFD700]/20',
                },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPayMethod(method.id as typeof payMethod)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    payMethod === method.id
                      ? `${method.bg} ${method.border} ${method.color}`
                      : 'border-white/10 text-white/50 hover:border-white/20'
                  }`}
                >
                  <div className={payMethod === method.id ? method.color : 'text-white/30'}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{method.label}</p>
                    <p className="text-xs opacity-60">{method.desc}</p>
                  </div>
                  <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payMethod === method.id ? `border-current` : 'border-white/20'
                  }`}>
                    {payMethod === method.id && <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full py-4 bg-[#FFD700] hover:bg-[#FFC700] disabled:opacity-50 text-black font-bold rounded-xl transition-colors text-base"
            >
              {loading ? 'Оформляем...' : `Оформить заказ — ${formatPrice(grandTotal)}`}
            </button>
          </div>

          {/* RIGHT: Order summary */}
          <div className="space-y-4">
            <h2 className="text-white font-bold">Ваш заказ</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium leading-tight line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">EU {item.size} × {item.quantity}</p>
                  </div>
                  <p className="text-white text-sm font-medium shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Товары</span>
                  <span className="text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Доставка по Ташкенту</span>
                  <span className="text-white">{formatPrice(DELIVERY)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1">
                  <span className="text-white">Итого</span>
                  <span className="text-[#FFD700]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="flex items-start gap-3 px-4 py-3 bg-white/3 border border-white/5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#FFD700] mt-0.5 shrink-0" />
              <p className="text-white/30 text-xs leading-relaxed">
                Каждый товар проходит верификацию DUCANI перед отправкой. Гарантия оригинальности.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

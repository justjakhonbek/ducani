'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, LogOut, User, ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/data';

interface Order {
  id: string;
  status: string;
  total_price: number;
  payment_method: string;
  created_at: string;
  order_items: {
    product_name: string;
    product_image: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает оплаты', color: 'text-yellow-400 bg-yellow-400/10' },
  paid: { label: 'Оплачен', color: 'text-blue-400 bg-blue-400/10' },
  shipped: { label: 'В пути', color: 'text-purple-400 bg-purple-400/10' },
  delivered: { label: 'Доставлен', color: 'text-green-400 bg-green-400/10' },
  cancelled: { label: 'Отменён', color: 'text-red-400 bg-red-400/10' },
};

export default function AccountPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) || []);
        setOrdersLoading(false);
      });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Главная
        </Link>
        <Link href="/">
          <span className="text-xl font-bold">
            <span className="text-[#FFD700]">DU</span>
            <span className="text-white">CANI</span>
          </span>
        </Link>
        <button onClick={handleSignOut} className="flex items-center gap-1.5 text-white/40 hover:text-red-400 transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Выйти
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-10 max-w-3xl mx-auto space-y-8">
        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
            <User className="w-8 h-8 text-[#FFD700]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-lg truncate">
              {user.user_metadata?.full_name || 'Покупатель'}
            </p>
            <p className="text-white/40 text-sm truncate">{user.email}</p>
            {user.user_metadata?.phone && (
              <p className="text-white/40 text-sm">{user.user_metadata.phone}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[#FFD700] text-xs font-medium">
            <ShieldCheck className="w-4 h-4" />
            Верифицирован
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/products" className="flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl transition-colors group">
            <span className="text-white text-sm font-medium">Каталог</span>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FFD700] transition-colors" />
          </Link>
          <Link href="/checkout" className="flex items-center justify-between px-5 py-4 bg-[#FFD700]/10 hover:bg-[#FFD700]/15 border border-[#FFD700]/20 rounded-xl transition-colors group">
            <span className="text-[#FFD700] text-sm font-medium">Оформить заказ</span>
            <ChevronRight className="w-4 h-4 text-[#FFD700]/50 group-hover:text-[#FFD700] transition-colors" />
          </Link>
        </div>

        {/* Orders */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-white font-bold text-lg">Мои заказы</h2>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-14 space-y-3">
              <Package className="w-12 h-12 text-white/10 mx-auto" />
              <p className="text-white/30 text-sm">Заказов пока нет</p>
              <Link href="/products" className="text-[#FFD700] text-sm hover:underline">
                Перейти в каталог →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                return (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-white font-medium text-sm">
                          Заказ #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5">
                          {new Date(order.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.order_items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.product_image && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                              <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{item.product_name}</p>
                            <p className="text-white/40 text-xs">EU {item.size} × {item.quantity}</p>
                          </div>
                          <p className="text-white text-sm font-medium shrink-0">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-white/40 text-sm">Итого</span>
                      <span className="text-[#FFD700] font-bold">{formatPrice(order.total_price)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

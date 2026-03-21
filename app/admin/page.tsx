'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingBag, Users, TrendingUp, Eye, Check, Truck, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/app/context/AuthContext';
import { formatPrice } from '@/lib/data';

const ADMIN_EMAIL = 'justjakhonbek@gmail.com';

interface Order {
  id: string;
  status: string;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  payment_method: string;
  created_at: string;
  order_items: { product_name: string; size: string; quantity: number; price: number }[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; next: string; nextLabel: string }> = {
  pending:   { label: 'Ожидает',  color: 'text-yellow-400 bg-yellow-400/10', next: 'paid',      nextLabel: 'Подтвердить оплату' },
  paid:      { label: 'Оплачен',  color: 'text-blue-400 bg-blue-400/10',     next: 'shipped',   nextLabel: 'Отправить' },
  shipped:   { label: 'В пути',   color: 'text-purple-400 bg-purple-400/10', next: 'delivered', nextLabel: 'Доставлен' },
  delivered: { label: 'Доставлен',color: 'text-green-400 bg-green-400/10',   next: '',          nextLabel: '' },
  cancelled: { label: 'Отменён',  color: 'text-red-400 bg-red-400/10',       next: '',          nextLabel: '' },
};

const PAYMENT_LABELS: Record<string, string> = {
  payme: '💳 Payme',
  click: '📱 Click',
  cash: '💵 Наличные',
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid' | 'shipped'>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
    if (!loading && user && user.email !== ADMIN_EMAIL) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });
    setOrders((data as Order[]) || []);
    setOrdersLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const cancelOrder = async (orderId: string) => {
    await supabase.from('orders').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: 'cancelled' } : o));
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" /></div>;
  if (!user || user.email !== ADMIN_EMAIL) return null;

  const filtered = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    revenue: orders.filter((o) => ['paid', 'shipped', 'delivered'].includes(o.status)).reduce((sum, o) => sum + o.total_price, 0),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-12 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/">
          <span className="text-xl font-bold"><span className="text-[#FFD700]">DU</span><span className="text-white">CANI</span></span>
        </Link>
        <span className="text-white/40 text-sm">Панель администратора</span>
        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">На сайт →</Link>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Всего заказов', value: stats.total, icon: <ShoppingBag className="w-5 h-5" />, color: 'text-white' },
            { label: 'Ожидают', value: stats.pending, icon: <Package className="w-5 h-5" />, color: 'text-yellow-400' },
            { label: 'Оплачено', value: stats.paid, icon: <Check className="w-5 h-5" />, color: 'text-blue-400' },
            { label: 'Выручка', value: formatPrice(stats.revenue), icon: <TrendingUp className="w-5 h-5" />, color: 'text-[#FFD700]' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white/40 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {([
            { key: 'all', label: 'Все' },
            { key: 'pending', label: 'Ожидают' },
            { key: 'paid', label: 'Оплачены' },
            { key: 'shipped', label: 'В пути' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key ? 'bg-[#FFD700] text-black' : 'bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.key !== 'all' && (
                <span className="ml-2 text-xs opacity-70">
                  {orders.filter((o) => o.status === tab.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {ordersLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">Заказов нет</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => {
              const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const isExpanded = expandedOrder === order.id;
              return (
                <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  {/* Order header */}
                  <div className="p-5 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white font-bold text-sm">#{order.id.slice(0, 8).toUpperCase()}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>{sc.label}</span>
                        <span className="text-white/30 text-xs">{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">{order.customer_name} · {order.customer_phone}</p>
                      {order.customer_address && <p className="text-white/30 text-xs mt-0.5">{order.customer_address}</p>}
                    </div>

                    <div className="text-right">
                      <p className="text-[#FFD700] font-bold">{formatPrice(order.total_price)}</p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {sc.next && (
                        <button
                          onClick={() => updateStatus(order.id, sc.next)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD700] text-black text-xs font-bold rounded-lg hover:bg-[#FFC700] transition-colors"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          {sc.nextLabel}
                        </button>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <button onClick={() => cancelOrder(order.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors" title="Отменить">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=Здравствуйте, ${order.customer_name}! Ваш заказ DUCANI #${order.id.slice(0, 8).toUpperCase()}`}
                        target="_blank" rel="noopener noreferrer"
                        className="p-1.5 text-[#25D366] hover:text-[#25D366]/80 transition-colors" title="WhatsApp">
                        <Users className="w-4 h-4" />
                      </a>
                      <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="p-1.5 text-white/30 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded items */}
                  {isExpanded && order.order_items && (
                    <div className="border-t border-white/5 p-5 space-y-2">
                      {order.order_items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-white/70">{item.product_name} <span className="text-white/30">EU{item.size} x{item.quantity}</span></span>
                          <span className="text-white">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { formatPrice } from '@/lib/data';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Backdrop — без blur для скорости */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#111111] z-50 flex flex-col transition-transform duration-200 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#FFD700]" />
            <span className="font-bold text-white text-lg">Корзина</span>
            {totalItems > 0 && (
              <span className="bg-[#FFD700] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-16 h-16 text-white/10" />
              <p className="text-white/40 text-sm">Корзина пуста</p>
              <button
                onClick={closeCart}
                className="text-[#FFD700] text-sm font-medium hover:underline"
              >
                Перейти в каталог →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 bg-white/5 rounded-xl p-3"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-tight truncate">
                    {item.product.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">Размер: EU {item.size}</p>
                  <p className="text-[#FFD700] text-sm font-bold mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                      <span className="text-white text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Итого</span>
              <span className="text-white font-bold text-xl">{formatPrice(totalPrice)}</span>
            </div>

            {/* WhatsApp checkout */}
            <a
              href={`https://wa.me/998959760747?text=${encodeURIComponent(
                `Здравствуйте! Хочу оформить заказ:\n\n${items
                  .map((i) => `• ${i.product.name} (EU ${i.size}) x${i.quantity} — ${formatPrice(i.product.price)}`)
                  .join('\n')}\n\nИтого: ${formatPrice(totalPrice)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Оформить через WhatsApp
            </a>

            <a
              href={`https://t.me/ducani_channel?text=${encodeURIComponent(
                `Заказ:\n${items
                  .map((i) => `• ${i.product.name} EU${i.size} x${i.quantity}`)
                  .join('\n')}\nИтого: ${formatPrice(totalPrice)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#229ED9] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm border border-[#229ED9]/20"
            >
              Оформить через Telegram
            </a>

            <p className="text-center text-white/30 text-xs">
              Верификация каждого товара гарантирована DUCANI
            </p>
          </div>
        )}
      </div>
    </>
  );
}

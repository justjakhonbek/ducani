import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: 'Telegram not configured' });
  }

  const body = await request.json();
  const { order, items } = body;

  const itemLines = items
    .map((i: { name: string; size: string; quantity: number; price: number }) =>
      `• ${i.name} EU${i.size} ×${i.quantity} — ${(i.price * i.quantity).toLocaleString('ru-RU')} сум`
    )
    .join('\n');

  const paymentLabel: Record<string, string> = {
    payme: '💳 Payme',
    click: '📱 Click',
    cash: '💵 Наличными / Перевод',
  };

  const text = `🆕 *НОВЫЙ ЗАКАЗ #${order.id.slice(0, 8).toUpperCase()}*

👤 *Покупатель:* ${order.customer_name}
📱 *Телефон:* ${order.customer_phone}
📍 *Адрес:* ${order.customer_address || 'Самовывоз'}
💳 *Оплата:* ${paymentLabel[order.payment_method] || order.payment_method}

🛍 *Товары:*
${itemLines}

📦 *Доставка:* 50 000 сум
💰 *Итого:* ${order.total_price.toLocaleString('ru-RU')} сум
${order.notes ? `\n💬 *Комментарий:* ${order.notes}` : ''}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

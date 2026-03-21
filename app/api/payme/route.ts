import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Payme отправляет JSON-RPC запросы на этот endpoint
// Документация: https://developer.payme.uz/documentation

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Серверный ключ — добавь в Vercel env vars
);

const PAYME_KEY = process.env.PAYME_KEY!; // Секретный ключ из кабинета Payme

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  if (!auth) return false;
  const encoded = auth.replace('Basic ', '');
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  return decoded === `Paycom:${PAYME_KEY}`;
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: { code: -32504, message: 'Unauthorized' } }, { status: 401 });
  }

  const body = await request.json();
  const { method, params, id } = body;

  // CheckPerformTransaction — проверка возможности оплаты
  if (method === 'CheckPerformTransaction') {
    const orderId = params?.account?.order_id;
    if (!orderId) {
      return NextResponse.json({ id, result: null, error: { code: -31050, message: 'Order not found' } });
    }
    const { data: order } = await supabase.from('orders').select('id, total_price, status').eq('id', orderId).single();
    if (!order) {
      return NextResponse.json({ id, result: null, error: { code: -31050, message: 'Order not found' } });
    }
    if (order.status !== 'pending') {
      return NextResponse.json({ id, result: null, error: { code: -31051, message: 'Already paid' } });
    }
    return NextResponse.json({ id, result: { allow: true } });
  }

  // CreateTransaction
  if (method === 'CreateTransaction') {
    const orderId = params?.account?.order_id;
    const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (!order || order.status !== 'pending') {
      return NextResponse.json({ id, result: null, error: { code: -31050, message: 'Order error' } });
    }
    return NextResponse.json({
      id,
      result: {
        create_time: Date.now(),
        transaction: params.id,
        state: 1,
      },
    });
  }

  // PerformTransaction — оплата прошла успешно
  if (method === 'PerformTransaction') {
    const orderId = params?.account?.order_id;
    await supabase
      .from('orders')
      .update({ status: 'paid', payment_id: params.id, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    return NextResponse.json({
      id,
      result: {
        transaction: params.id,
        perform_time: Date.now(),
        state: 2,
      },
    });
  }

  // CancelTransaction
  if (method === 'CancelTransaction') {
    const orderId = params?.account?.order_id;
    await supabase
      .from('orders')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', orderId);

    return NextResponse.json({
      id,
      result: {
        transaction: params.id,
        cancel_time: Date.now(),
        state: -1,
      },
    });
  }

  // CheckTransaction
  if (method === 'CheckTransaction') {
    return NextResponse.json({
      id,
      result: {
        create_time: Date.now(),
        perform_time: 0,
        cancel_time: 0,
        transaction: params.id,
        state: 1,
        reason: null,
      },
    });
  }

  return NextResponse.json({ id, result: null, error: { code: -32601, message: 'Method not found' } });
}

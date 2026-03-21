import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Click отправляет POST запросы на этот endpoint
// Документация: https://developer.click.uz

function verifySign(params: Record<string, string>): boolean {
  const secret = process.env.CLICK_SECRET_KEY!;
  const serviceId = process.env.NEXT_PUBLIC_CLICK_SERVICE_ID!;
  const signString = `${params.click_trans_id}${serviceId}${secret}${params.merchant_trans_id}${params.amount}${params.action}${params.sign_time}`;
  const hash = crypto.createHash('md5').update(signString).digest('hex');
  return hash === params.sign_string;
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const formData = await request.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => { params[key] = value.toString(); });

  // Проверка подписи
  if (!verifySign(params)) {
    return NextResponse.json({ error: -1, error_note: 'SIGN CHECK FAILED!' });
  }

  const orderId = params.merchant_trans_id;
  const action = parseInt(params.action);

  // Action 0 — подготовка (проверка заказа)
  if (action === 0) {
    const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (!order) return NextResponse.json({ error: -5, error_note: 'Order not found' });
    if (order.status !== 'pending') return NextResponse.json({ error: -4, error_note: 'Already paid' });

    return NextResponse.json({
      click_trans_id: params.click_trans_id,
      merchant_trans_id: orderId,
      merchant_prepare_id: orderId,
      error: 0,
      error_note: 'Success',
    });
  }

  // Action 1 — подтверждение оплаты
  if (action === 1) {
    await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_id: params.click_trans_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    return NextResponse.json({
      click_trans_id: params.click_trans_id,
      merchant_trans_id: orderId,
      merchant_confirm_id: orderId,
      error: 0,
      error_note: 'Success',
    });
  }

  return NextResponse.json({ error: -3, error_note: 'Action not found' });
}

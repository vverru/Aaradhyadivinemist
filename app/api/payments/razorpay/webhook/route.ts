import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateOrderStatus } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookSignature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'aaradhya_secret_webhook';

    if (webhookSignature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        return NextResponse.json({ status: 'invalid_signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    // Handle payment events idempotently
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.notes?.orderId || payment.order_id;
      if (orderId) {
        updateOrderStatus(orderId, 'confirmed', 'paid');
      }
    } else if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      const orderId = payment.notes?.orderId || payment.order_id;
      if (orderId) {
        updateOrderStatus(orderId, 'pending', 'failed');
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

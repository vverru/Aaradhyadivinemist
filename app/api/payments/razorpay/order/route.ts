import { NextRequest, NextResponse } from 'next/server';
import { getStoreSettings } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();
    const settings = getStoreSettings();

    const keyId = settings.razorpayKeyId || process.env.RAZORPAY_KEY_ID;
    const keySecret = settings.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;

    // When keys are configured, create order via Razorpay API
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // amount in paise
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: {
            brand: 'AARADHYA DIVINE MIST',
          },
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { success: false, message: orderData.error?.description || 'Razorpay order creation failed' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
        isLiveConfigured: true,
      });
    }

    // Architecture & Test Mode fallback when credentials are not yet entered in Admin Settings
    const mockRazorpayOrderId = `order_test_${Date.now()}`;
    return NextResponse.json({
      success: true,
      orderId: mockRazorpayOrderId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      keyId: 'rzp_test_aaradhya_placeholder',
      isLiveConfigured: false,
      message: 'Razorpay architecture active. Add your live Razorpay Key & Secret in Admin Settings to process live transactions.',
    });
  } catch (err) {
    console.error('Razorpay order error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error creating Razorpay order' },
      { status: 500 }
    );
  }
}

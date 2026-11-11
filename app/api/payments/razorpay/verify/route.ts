import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getStoreSettings, updateOrderStatus } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internalOrderId } =
      await req.json();

    const settings = getStoreSettings();
    const keySecret = settings.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      // In development / demo test mode
      if (internalOrderId) {
        updateOrderStatus(internalOrderId, 'confirmed', 'paid');
      }
      return NextResponse.json({
        success: true,
        verified: true,
        mode: 'test_simulation',
        message: 'Payment verified in test configuration mode.',
      });
    }

    // Official Razorpay HMAC SHA256 Signature Verification
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      if (internalOrderId) {
        updateOrderStatus(internalOrderId, 'confirmed', 'paid');
      }
      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
      });
    } else {
      return NextResponse.json(
        { success: false, verified: false, message: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during signature verification' },
      { status: 500 }
    );
  }
}

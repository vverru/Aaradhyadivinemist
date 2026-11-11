import { NextRequest, NextResponse } from 'next/server';
import { getCouponByCode } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const subtotal = parseFloat(searchParams.get('subtotal') || '0');

  if (!code) {
    return NextResponse.json({ valid: false, message: 'Coupon code required' }, { status: 400 });
  }

  const coupon = getCouponByCode(code);
  if (!coupon) {
    return NextResponse.json({ valid: false, message: 'Invalid or expired coupon code' }, { status: 404 });
  }

  if (subtotal < coupon.minOrderValue) {
    return NextResponse.json({
      valid: false,
      message: `Minimum order value for coupon ${coupon.code} is ₹${coupon.minOrderValue}`,
    });
  }

  return NextResponse.json({
    valid: true,
    coupon,
  });
}

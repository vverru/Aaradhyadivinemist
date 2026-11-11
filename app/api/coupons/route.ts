import { NextRequest, NextResponse } from 'next/server';
import { getCoupons, saveCoupon, deleteCoupon } from '@/lib/db';

export async function GET() {
  const coupons = getCoupons();
  return NextResponse.json({ success: true, coupons });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.code || !data.discountValue) {
      return NextResponse.json({ success: false, message: 'Code and discount value required' }, { status: 400 });
    }
    const newCoupon = {
      ...data,
      id: data.id || `coup-${Date.now()}`,
      code: data.code.toUpperCase(),
      usageCount: data.usageCount || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
    };
    const saved = saveCoupon(newCoupon);
    return NextResponse.json({ success: true, coupon: saved });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to save coupon' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
  }
  const deleted = deleteCoupon(id);
  return NextResponse.json({ success: deleted });
}

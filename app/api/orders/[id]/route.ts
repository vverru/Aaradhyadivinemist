import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, order });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const { status, paymentStatus, courierName, awbNumber, trackingUrl } = data;

    const updated = updateOrderStatus(params.id, status, paymentStatus, {
      courierName,
      awbNumber,
      trackingUrl,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update order' }, { status: 500 });
  }
}

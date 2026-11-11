import { NextRequest, NextResponse } from 'next/server';
import { getOrders, getOrdersByCustomer, getOrderById } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const orderNumber = searchParams.get('orderNumber');
  const status = (searchParams.get('status') as any) || undefined;

  if (orderNumber) {
    const order = getOrderById(orderNumber);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  }

  if (email) {
    const orders = getOrdersByCustomer(email);
    return NextResponse.json({ success: true, orders });
  }

  const orders = getOrders(status);
  return NextResponse.json({ success: true, orders });
}

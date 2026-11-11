import { NextRequest, NextResponse } from 'next/server';
import { getProductById, saveProduct, deleteProduct } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, product });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const existing = getProductById(params.id);
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    const updated = saveProduct({
      ...existing,
      ...data,
      id: params.id,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const success = deleteProduct(params.id);
  return NextResponse.json({ success });
}

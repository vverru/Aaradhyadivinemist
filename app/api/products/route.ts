import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const status = (searchParams.get('status') as any) || undefined;
  const search = searchParams.get('search') || undefined;
  const fragrance = searchParams.get('fragrance') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const products = getProducts({
    category,
    status,
    search,
    fragrance,
    sort,
  });

  return NextResponse.json({ success: true, products });
}

export async function POST(req: NextRequest) {
  try {
    const productData = await req.json();
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { success: false, message: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      slug:
        productData.slug ||
        productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    const saved = saveProduct(newProduct);
    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to save product' },
      { status: 500 }
    );
  }
}

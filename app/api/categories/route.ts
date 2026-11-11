import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategory } from '@/lib/db';

export async function GET() {
  const categories = getCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat = {
      ...data,
      id: data.id || `cat-${Date.now()}`,
      slug,
    };
    const saved = saveCategory(newCat);
    return NextResponse.json({ success: true, category: saved });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create category' }, { status: 500 });
  }
}

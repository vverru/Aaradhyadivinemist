import { NextRequest, NextResponse } from 'next/server';
import { getReviews, addReview, updateReviewStatus, deleteReview } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId') || undefined;
  const all = searchParams.get('all') === 'true';

  const reviews = getReviews(productId, !all);
  return NextResponse.json({ success: true, reviews });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.productId || !data.customerName || !data.comment) {
      return NextResponse.json(
        { success: false, message: 'Product ID, customer name, and comment are required' },
        { status: 400 }
      );
    }

    const newReview = addReview({
      productId: data.productId,
      productName: data.productName || 'Sacred Fragrance',
      customerName: data.customerName,
      customerLocation: data.customerLocation || 'India',
      rating: parseInt(data.rating) || 5,
      title: data.title || 'Devotional Experience',
      comment: data.comment,
      isVerifiedPurchase: true,
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to add review' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, status } = data;
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and status required' }, { status: 400 });
    }
    const updated = updateReviewStatus(id, status);
    return NextResponse.json({ success: true, review: updated });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
  }
  const deleted = deleteReview(id);
  return NextResponse.json({ success: deleted });
}

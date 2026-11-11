import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterSubscriber } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Valid email required' }, { status: 400 });
    }
    const added = addNewsletterSubscriber(email);
    return NextResponse.json({
      success: true,
      message: added ? 'Subscribed successfully!' : 'Already subscribed.',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

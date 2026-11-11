import { NextRequest, NextResponse } from 'next/server';
import { getStoreSettings, updateStoreSettings } from '@/lib/db';

export async function GET() {
  const settings = getStoreSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const updated = updateStoreSettings(data);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 });
  }
}

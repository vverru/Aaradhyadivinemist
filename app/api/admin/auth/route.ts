import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Default administrator credentials for Aaradhya portal
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aaradhyadivinemist.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'AaradhyaDivine2026!';

    if (email === adminEmail && password === adminPass) {
      return NextResponse.json({
        success: true,
        user: {
          id: 'admin-1',
          name: 'Store Administrator',
          email: adminEmail,
          role: 'admin',
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ success: false, message: 'Auth error' }, { status: 500 });
  }
}

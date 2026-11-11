import { NextRequest, NextResponse } from 'next/server';
import { checkPincodeServiceability } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pincode = searchParams.get('pincode') || '';

  const result = checkPincodeServiceability(pincode);
  return NextResponse.json(result);
}

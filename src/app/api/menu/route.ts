import { NextResponse } from 'next/server';
import menuData from '@/db.json';

export async function GET() {
  return NextResponse.json(menuData.menu);
}

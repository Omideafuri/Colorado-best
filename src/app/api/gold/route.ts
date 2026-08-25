import { NextResponse } from 'next/server';
import { fetchAlanChandMarketRates } from '@/lib/providers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rates = await fetchAlanChandMarketRates();

    return NextResponse.json(
      {
        success: true,
        data: rates,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/gold route:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'GOLD_RATES_FETCH_ERROR',
          message: 'خطا در دریافت نرخ لحظه‌ای طلا و سکه',
        },
      },
      { status: 500 }
    );
  }
}

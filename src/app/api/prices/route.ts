import { NextResponse } from 'next/server';
import { getGoldPriceProvider } from '@/lib/providers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const provider = getGoldPriceProvider();
    const price = await provider.getCurrentPrice('18K');

    return NextResponse.json({
      success: true,
      data: {
        goldType: price.goldType,
        referencePriceRial: Number(price.referencePriceRial),
        buyPriceRial: Number(price.buyPriceRial),
        sellPriceRial: Number(price.sellPriceRial),
        referencePriceToman: Math.floor(Number(price.referencePriceRial) / 10),
        buyPriceToman: Math.floor(Number(price.buyPriceRial) / 10),
        sellPriceToman: Math.floor(Number(price.sellPriceRial) / 10),
        changeRial: Number(price.changeRial),
        changeToman: Math.floor(Number(price.changeRial) / 10),
        changePct: price.changePct,
        isMarketOpen: price.isMarketOpen,
        lastUpdated: price.lastUpdated.toISOString(),
        source: price.source,
      },
    });
  } catch (error) {
    console.error('Price API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'PRICE_FETCH_ERROR', message: 'خطا در دریافت قیمت طلا' },
      },
      { status: 500 }
    );
  }
}

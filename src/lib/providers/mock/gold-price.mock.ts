/**
 * MOCK Gold Price Provider
 * Generates realistic gold price data for development.
 * Replace with real API provider in production.
 * 
 * MOCK_GOLD_PRICE_PROVIDER=true
 */

import type {
  IGoldPriceProvider,
  PriceData,
  HistoricalPrice,
  TimeRange,
} from '../interfaces/gold-price';
import { applySpread } from '../../financial/decimal';

// Realistic 18K gold reference price (per gram, in Rial)
// ~3,500,000 Toman per gram = 35,000,000 Rial
const BASE_PRICE_RIAL = BigInt(35_000_000);
const DEFAULT_BUY_SPREAD_BP = 150; // 1.5%
const DEFAULT_SELL_SPREAD_BP = 150;

function randomWalk(base: bigint, volatilityPct: number): bigint {
  const change = 1 + (Math.random() - 0.5) * 2 * (volatilityPct / 100);
  return BigInt(Math.floor(Number(base) * change));
}

export class MockGoldPriceProvider implements IGoldPriceProvider {
  private currentPrice: bigint = BASE_PRICE_RIAL;
  private lastUpdated: Date = new Date();
  private previousPrice: bigint = BASE_PRICE_RIAL;

  async getCurrentPrice(goldType: string): Promise<PriceData> {
    // Simulate slight price movement
    this.previousPrice = this.currentPrice;
    this.currentPrice = randomWalk(this.currentPrice, 0.3);
    this.lastUpdated = new Date();

    const changeRial = this.currentPrice - this.previousPrice;
    const changePct =
      Number(this.previousPrice) > 0
        ? (Number(changeRial) / Number(this.previousPrice)) * 100
        : 0;

    const now = new Date();
    const hour = now.getHours();
    // Iranian market hours roughly 9-18 Iran time
    const isMarketOpen = hour >= 9 && hour < 18;

    return {
      goldType: goldType || '18K',
      referencePriceRial: this.currentPrice,
      buyPriceRial: applySpread(this.currentPrice, DEFAULT_BUY_SPREAD_BP, 'buy'),
      sellPriceRial: applySpread(this.currentPrice, DEFAULT_SELL_SPREAD_BP, 'sell'),
      buySpreadBp: DEFAULT_BUY_SPREAD_BP,
      sellSpreadBp: DEFAULT_SELL_SPREAD_BP,
      changeRial,
      changePct: Math.round(changePct * 100) / 100,
      isMarketOpen,
      lastUpdated: this.lastUpdated,
      source: 'MOCK',
    };
  }

  async getHistoricalPrices(
    _goldType: string,
    range: TimeRange
  ): Promise<HistoricalPrice[]> {
    const now = Date.now();
    const rangeMs: Record<TimeRange, number> = {
      '1D': 24 * 60 * 60 * 1000,
      '1W': 7 * 24 * 60 * 60 * 1000,
      '1M': 30 * 24 * 60 * 60 * 1000,
      '3M': 90 * 24 * 60 * 60 * 1000,
      '6M': 180 * 24 * 60 * 60 * 1000,
      '1Y': 365 * 24 * 60 * 60 * 1000,
      ALL: 2 * 365 * 24 * 60 * 60 * 1000,
    };

    const duration = rangeMs[range];
    const pointCount = range === '1D' ? 48 : range === '1W' ? 84 : 100;
    const interval = duration / pointCount;

    const prices: HistoricalPrice[] = [];
    let price = BigInt(Math.floor(Number(BASE_PRICE_RIAL) * 0.9));

    for (let i = 0; i < pointCount; i++) {
      price = randomWalk(price, 1.5);
      prices.push({
        timestamp: new Date(now - duration + i * interval),
        priceRial: price,
      });
    }

    return prices;
  }
}

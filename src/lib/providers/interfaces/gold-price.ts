/**
 * Gold Price Provider Interface
 * All price data flows through this interface.
 * Replace MockGoldPriceProvider with a real provider in production.
 */

export interface PriceData {
  goldType: string;
  referencePriceRial: bigint;
  buyPriceRial: bigint;
  sellPriceRial: bigint;
  buySpreadBp: number;
  sellSpreadBp: number;
  changeRial: bigint;
  changePct: number;
  isMarketOpen: boolean;
  lastUpdated: Date;
  source: string;
}

export interface HistoricalPrice {
  timestamp: Date;
  priceRial: bigint;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';

export interface IGoldPriceProvider {
  getCurrentPrice(goldType: string): Promise<PriceData>;
  getHistoricalPrices(goldType: string, range: TimeRange): Promise<HistoricalPrice[]>;
}

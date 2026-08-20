import { describe, it, expect } from 'vitest';
import { calculateQuote } from '../fees';

// Mock PriceSnapshot
const mockSnapshot = {
  id: 'snap_1',
  goldType: '18K',
  referencePriceRial: BigInt(45_000_000), // 4,500,000 Toman per gram
  buyPriceRial: BigInt(45_000_000),
  sellPriceRial: BigInt(45_000_000),
  buySpreadBp: 150,
  sellSpreadBp: 150,
  source: 'MOCK',
  isMarketOpen: true,
  capturedAt: new Date(),
};

// Mock PriceConfig
const mockConfig = {
  id: 'conf_1',
  goldType: '18K',
  buySpreadBp: 150,
  sellSpreadBp: 150,
  feeBp: 50, // 0.5%
  minBuyRial: BigInt(1_000_000),
  maxBuyRial: BigInt(500_000_000),
  minSellNg: BigInt(10_000_000),
  isActive: true,
  updatedById: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Financial Trade Quoting System', () => {
  it('calculates BY_AMOUNT BUY correctly', () => {
    // User wants to spend 10,000,000 Rial.
    // Fee = 0.5% of 10m = 50,000 Rial.
    // Usable amount for gold = 9,950,000 Rial.
    // Gold weight = 9,950,000 / 45,000,000 = 0.221111111 grams = 221,111,111 ng
    const quote = calculateQuote({
      mode: 'BY_AMOUNT',
      tradeType: 'BUY',
      value: BigInt(10_000_000),
      snapshot: mockSnapshot,
      config: mockConfig
    });

    expect(quote.netRial.toString()).toBe('10000000');
    expect(quote.feeRial.toString()).toBe('50000');
    expect(quote.requestedWeightNg.toString()).toBe('221111111');
    expect(quote.pricePerGramRial.toString()).toBe('45000000');
  });

  it('calculates BY_WEIGHT BUY correctly', () => {
    // User wants to buy exactly 1 gram (1_000_000_000 ng)
    // Base cost = 45,000,000 Rial.
    // Fee = 0.5% of 45m = 225,000 Rial.
    // Total to pay (netRial) = 45,225,000 Rial.
    const quote = calculateQuote({
      mode: 'BY_WEIGHT',
      tradeType: 'BUY',
      value: BigInt(1_000_000_000),
      snapshot: mockSnapshot,
      config: mockConfig
    });

    expect(quote.requestedWeightNg.toString()).toBe('1000000000');
    expect(quote.feeRial.toString()).toBe('225000');
    expect(quote.netRial.toString()).toBe('45225000');
  });

  it('calculates BY_WEIGHT SELL correctly', () => {
    // User wants to sell exactly 1 gram (1_000_000_000 ng)
    // Base value = 45,000,000 Rial.
    // Fee = 0.5% of 45m = 225,000 Rial.
    // Total received (netRial) = 44,775,000 Rial.
    const quote = calculateQuote({
      mode: 'BY_WEIGHT',
      tradeType: 'SELL',
      value: BigInt(1_000_000_000),
      snapshot: mockSnapshot,
      config: mockConfig
    });

    expect(quote.requestedWeightNg.toString()).toBe('1000000000');
    expect(quote.feeRial.toString()).toBe('225000');
    expect(quote.netRial.toString()).toBe('44775000'); // 45M - 225K
  });

  it('calculates BY_AMOUNT SELL correctly', () => {
    // User wants to RECEIVE exactly 10,000,000 Rial.
    // They must sell enough gold to cover the 10m + fee.
    // Fee = 0.5% of 10m = 50,000 Rial.
    // Amount to cover = 10,050,000 Rial.
    // Gold weight = 10,050,000 / 45,000,000 = 0.223333333 grams = 223,333,333 ng
    const quote = calculateQuote({
      mode: 'BY_AMOUNT',
      tradeType: 'SELL',
      value: BigInt(10_000_000),
      snapshot: mockSnapshot,
      config: mockConfig
    });

    expect(quote.netRial.toString()).toBe('10000000');
    expect(quote.feeRial.toString()).toBe('50000');
    expect(quote.requestedWeightNg.toString()).toBe('223333333');
  });
});

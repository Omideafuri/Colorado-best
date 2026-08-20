/**
 * Trading configuration constants.
 * These are default values; runtime config comes from PriceConfig in the database.
 */
export const tradingConfig = {
  // Gold types supported
  goldTypes: ['18K'] as const,

  // Default spreads (basis points: 100bp = 1%)
  defaultBuySpreadBp: 150,   // 1.5%
  defaultSellSpreadBp: 150,  // 1.5%
  defaultFeeBp: 50,          // 0.5%

  // Transaction limits (in Rial)
  minBuyRial: BigInt(1_000_000),       // 100,000 Toman
  maxBuyRial: BigInt(500_000_000_000), // 50,000,000 Toman
  minSellNg: BigInt(100_000_000),      // 0.1 gram

  // Price lock duration (seconds)
  priceLockDurationSeconds: 60,

  // Unit conversions
  RIAL_PER_TOMAN: 10,
  NG_PER_GRAM: 1_000_000_000,

  // Display precision
  goldDisplayDecimals: 4,    // Show up to 0.0001 grams
  priceDisplayDecimals: 0,   // Whole Toman
} as const;

export type GoldType = (typeof tradingConfig.goldTypes)[number];

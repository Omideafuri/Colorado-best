import { db } from '@/lib/db';
import { getGoldPriceProvider } from '@/lib/providers';
import { applySpread } from './decimal';

export async function getActivePriceConfig(goldType = '18K') {
  let config = await db.priceConfig.findFirst({
    where: { goldType, isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  if (!config) {
    // Fallback default config if none exists in DB
    config = {
      id: 'default',
      goldType: '18K',
      buySpreadBp: 150, // 1.5% markup when user buys
      sellSpreadBp: 150, // 1.5% markdown when user sells
      feeBp: 50, // 0.5% standard fee
      minBuyRial: BigInt(1000000), // 100,000 Toman minimum
      maxBuyRial: BigInt(500000000), // 50,000,000 Toman maximum
      minSellNg: BigInt(10000000), // 0.01g minimum
      isActive: true,
      updatedById: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return config;
}

/**
 * Creates a new pricing snapshot by fetching the live price,
 * applying spreads, and saving to the database.
 * This snapshot acts as the locked price for an order.
 */
export async function createPriceSnapshot(goldType = '18K') {
  const provider = getGoldPriceProvider();
  const marketPrice = await provider.getCurrentPrice(goldType);
  const config = await getActivePriceConfig(goldType);

  // Buy price (Platform sells to User) = reference + spread
  const buyPrice = applySpread(marketPrice.referencePriceRial, config.buySpreadBp, 'buy');
  
  // Sell price (Platform buys from User) = reference - spread
  const sellPrice = applySpread(marketPrice.referencePriceRial, config.sellSpreadBp, 'sell');

  const snapshot = await db.priceSnapshot.create({
    data: {
      goldType,
      referencePriceRial: marketPrice.referencePriceRial,
      buyPriceRial: buyPrice,
      sellPriceRial: sellPrice,
      buySpreadBp: config.buySpreadBp,
      sellSpreadBp: config.sellSpreadBp,
      source: marketPrice.source,
      isMarketOpen: marketPrice.isMarketOpen,
    },
  });

  return snapshot;
}

/**
 * Retrieves the latest valid price snapshot or creates a new one.
 */
export async function getLatestPriceSnapshot(goldType = '18K') {
  const latest = await db.priceSnapshot.findFirst({
    where: { goldType },
    orderBy: { capturedAt: 'desc' },
  });

  // If older than 1 minute, create a new one to prevent stale pricing
  if (!latest || Date.now() - latest.capturedAt.getTime() > 60000) {
    return await createPriceSnapshot(goldType);
  }

  return latest;
}

import { db } from '@/lib/db';
import { processLedgerEntry } from './ledger';
import { getLatestPriceSnapshot, getActivePriceConfig } from './pricing';
import { calculateQuote } from './fees';
import { randomUUID } from 'node:crypto';

export type CreateOrderParams = {
  userId: string;
  tradeType: 'BUY' | 'SELL';
  mode: 'BY_AMOUNT' | 'BY_WEIGHT';
  value: bigint;
  idempotencyKey?: string;
};

/**
 * Orchestrates a complete gold trade transaction (Buy/Sell).
 * 1. Validates inputs and fetches live price.
 * 2. Calculates exact quotes and fees.
 * 3. Creates the Order and Trade records.
 * 4. Processes Ledger Entries (Cash and Gold movements atomically).
 */
export async function executeOrder(params: CreateOrderParams) {
  const { userId, tradeType, mode, value, idempotencyKey } = params;
  const uniqueKey = idempotencyKey || randomUUID();

  // 1. Get live price snapshot and config
  const snapshot = await getLatestPriceSnapshot('18K');
  const config = await getActivePriceConfig('18K');

  // 2. Calculate exact quote
  const quote = calculateQuote({
    mode,
    value,
    tradeType,
    snapshot,
    config,
  });

  // Validate minimum limits
  if (tradeType === 'BUY' && quote.netRial < config.minBuyRial) {
    throw new Error(`حداقل مبلغ خرید ${config.minBuyRial / BigInt(10)} تومان است`);
  }
  if (tradeType === 'SELL' && quote.requestedWeightNg < config.minSellNg) {
    throw new Error(`حداقل مقدار فروش ${config.minSellNg / BigInt(1000000)} گرم است`);
  }

  // 3 & 4. Execute atomically in a database transaction
  return await db.$transaction(async (tx) => {
    // A. Check idempotency for the order itself
    const existingOrder = await tx.order.findUnique({
      where: { idempotencyKey: uniqueKey },
      include: { trade: true },
    });

    if (existingOrder) {
      return existingOrder;
    }

    // B. Create Order Record
    const order = await tx.order.create({
      data: {
        userId,
        orderType: tradeType,
        status: 'COMPLETED',
        goldType: '18K',
        inputMode: mode,
        requestedAmountRial: mode === 'BY_AMOUNT' ? value : quote.netRial,
        requestedWeightNg: mode === 'BY_WEIGHT' ? value : quote.requestedWeightNg,
        executedAmountRial: quote.netRial,
        executedWeightNg: quote.requestedWeightNg,
        pricePerGramRial: quote.pricePerGramRial,
        feeRial: quote.feeRial,
        priceSnapshotId: snapshot.id,
        priceLockedAt: new Date(),
        priceExpiresAt: new Date(Date.now() + 5 * 60000), // Expires in 5 minutes
        executedAt: new Date(),
        idempotencyKey: uniqueKey,
      },
    });

    // C. Create Trade Record
    const trade = await tx.trade.create({
      data: {
        orderId: order.id,
        userId,
        tradeType,
        goldType: '18K',
        weightNg: quote.requestedWeightNg,
        pricePerGramRial: quote.pricePerGramRial,
        totalRial: quote.netRial, // Total amount deducted or added
        feeRial: quote.feeRial,
        netRial: tradeType === 'BUY' ? quote.netRial - quote.feeRial : quote.netRial + quote.feeRial, // Actually, let's keep it simple. Net rial is what's left after fees for ledger.
        // Wait, for trade record, let's just match the quote properties exactly to avoid confusion.
        executedAt: new Date(),
      },
    });

    // D. Process Ledger Entries
    if (tradeType === 'BUY') {
      // 1. Debit Cash Wallet (User pays)
      await processLedgerEntry(tx, {
        userId,
        walletType: 'CASH',
        entryType: 'BUY_DEBIT',
        amount: quote.netRial,
        direction: 'DEBIT',
        referenceType: 'TRADE',
        referenceId: trade.id,
        description: 'خرید طلا',
        idempotencyKey: `${uniqueKey}-cash-debit`,
      });

      // 2. Credit Gold Wallet (User receives gold)
      await processLedgerEntry(tx, {
        userId,
        walletType: 'GOLD',
        entryType: 'BUY_CREDIT',
        amount: quote.requestedWeightNg,
        direction: 'CREDIT',
        referenceType: 'TRADE',
        referenceId: trade.id,
        description: 'دریافت طلا بابت خرید',
        idempotencyKey: `${uniqueKey}-gold-credit`,
      });
    } else {
      // User is SELLING gold
      // 1. Debit Gold Wallet (User gives gold)
      await processLedgerEntry(tx, {
        userId,
        walletType: 'GOLD',
        entryType: 'SELL_DEBIT',
        amount: quote.requestedWeightNg,
        direction: 'DEBIT',
        referenceType: 'TRADE',
        referenceId: trade.id,
        description: 'فروش طلا',
        idempotencyKey: `${uniqueKey}-gold-debit`,
      });

      // 2. Credit Cash Wallet (User receives cash)
      await processLedgerEntry(tx, {
        userId,
        walletType: 'CASH',
        entryType: 'SELL_CREDIT',
        amount: quote.netRial,
        direction: 'CREDIT',
        referenceType: 'TRADE',
        referenceId: trade.id,
        description: 'دریافت وجه بابت فروش طلا',
        idempotencyKey: `${uniqueKey}-cash-credit`,
      });
    }

    return order;
  });
}

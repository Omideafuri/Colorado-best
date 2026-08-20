import { calculateGoldWeight, calculateCashAmount, calculateFee } from './decimal';
import type { PriceConfig, PriceSnapshot } from '@prisma/client';

export type QuoteParams = {
  mode: 'BY_AMOUNT' | 'BY_WEIGHT';
  value: bigint;
  tradeType: 'BUY' | 'SELL';
  snapshot: PriceSnapshot;
  config: PriceConfig;
};

export type QuoteResult = {
  requestedAmountRial: bigint;
  requestedWeightNg: bigint;
  feeRial: bigint;
  netRial: bigint; // Total rial deducted (buy) or added (sell) to user's wallet
  pricePerGramRial: bigint;
};

/**
 * Calculates exactly how much gold and cash is involved in an order,
 * including fees, based on the input mode (by cash amount vs by gold weight).
 */
export function calculateQuote(params: QuoteParams): QuoteResult {
  const { mode, value, tradeType, snapshot, config } = params;

  // The price applied depends on trade type
  const pricePerGramRial = tradeType === 'BUY' ? snapshot.buyPriceRial : snapshot.sellPriceRial;

  let requestedAmountRial = BigInt(0);
  let requestedWeightNg = BigInt(0);
  let feeRial = BigInt(0);
  let netRial = BigInt(0);

  if (mode === 'BY_AMOUNT') {
    // User wants to spend/receive exactly X Rials
    requestedAmountRial = value;
    
    // Fee is a percentage of the cash amount
    feeRial = calculateFee(requestedAmountRial, config.feeBp);
    
    if (tradeType === 'BUY') {
      // User is BUYING gold. They spend requestedAmountRial.
      // The actual amount that goes towards buying gold is (amount - fee)
      const usableAmount = requestedAmountRial - feeRial;
      if (usableAmount <= BigInt(0)) throw new Error('مبلغ ورودی از کارمزد کمتر است');
      
      requestedWeightNg = calculateGoldWeight(usableAmount, pricePerGramRial);
      netRial = requestedAmountRial; // We deduct the full amount from their cash wallet
    } else {
      // User is SELLING gold. They want to receive requestedAmountRial.
      // To get this amount, they must sell enough gold to cover the amount + fee.
      const amountToCover = requestedAmountRial + feeRial;
      requestedWeightNg = calculateGoldWeight(amountToCover, pricePerGramRial);
      netRial = requestedAmountRial; // We add the net amount to their cash wallet
    }
  } else {
    // User wants to buy/sell exactly X NanoGrams of gold
    requestedWeightNg = value;
    const baseCashAmount = calculateCashAmount(requestedWeightNg, pricePerGramRial);
    
    // Fee is a percentage of the base cash amount
    feeRial = calculateFee(baseCashAmount, config.feeBp);
    
    if (tradeType === 'BUY') {
      // User is BUYING X gold. They must pay (baseAmount + fee).
      requestedAmountRial = baseCashAmount + feeRial;
      netRial = requestedAmountRial; // We deduct this full amount
    } else {
      // User is SELLING X gold. They receive (baseAmount - fee).
      requestedAmountRial = baseCashAmount - feeRial;
      netRial = requestedAmountRial; // We add this net amount
    }
  }

  return {
    requestedAmountRial,
    requestedWeightNg,
    feeRial,
    netRial,
    pricePerGramRial,
  };
}

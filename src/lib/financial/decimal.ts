import Decimal from 'decimal.js';

// Configure Decimal.js for financial precision
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
});

const NG_PER_GRAM = new Decimal('1000000000');
const RIAL_PER_TOMAN = new Decimal('10');

/**
 * Convert nanograms to grams for display.
 */
export function ngToGrams(ng: bigint): Decimal {
  return new Decimal(ng.toString()).div(NG_PER_GRAM);
}

/**
 * Convert grams to nanograms for storage.
 */
export function gramsToNg(grams: string | number): bigint {
  const result = new Decimal(grams.toString()).mul(NG_PER_GRAM).floor();
  return BigInt(result.toString());
}

/**
 * Convert Rial to Toman for display.
 */
export function rialToToman(rial: bigint): Decimal {
  return new Decimal(rial.toString()).div(RIAL_PER_TOMAN);
}

/**
 * Convert Toman to Rial for storage.
 */
export function tomanToRial(toman: string | number): bigint {
  const result = new Decimal(toman.toString()).mul(RIAL_PER_TOMAN).floor();
  return BigInt(result.toString());
}

/**
 * Calculate gold weight from a cash amount and price per gram (both in Rial).
 * Returns weight in nanograms.
 */
export function calculateGoldWeight(
  amountRial: bigint,
  pricePerGramRial: bigint
): bigint {
  const amount = new Decimal(amountRial.toString());
  const price = new Decimal(pricePerGramRial.toString());
  const grams = amount.div(price);
  const ng = grams.mul(NG_PER_GRAM).floor();
  return BigInt(ng.toString());
}

/**
 * Calculate cash amount from gold weight and price per gram.
 * Returns amount in Rial.
 */
export function calculateCashAmount(
  weightNg: bigint,
  pricePerGramRial: bigint
): bigint {
  const weight = new Decimal(weightNg.toString());
  const price = new Decimal(pricePerGramRial.toString());
  const amount = weight.mul(price).div(NG_PER_GRAM).floor();
  return BigInt(amount.toString());
}

/**
 * Calculate fee from an amount using basis points.
 * 100 bp = 1%
 */
export function calculateFee(amountRial: bigint, feeBp: number): bigint {
  const amount = new Decimal(amountRial.toString());
  const fee = amount.mul(feeBp).div(10000).ceil();
  return BigInt(fee.toString());
}

/**
 * Apply spread to a reference price.
 * For buy: price + spread (user pays more)
 * For sell: price - spread (user receives less)
 */
export function applySpread(
  referencePriceRial: bigint,
  spreadBp: number,
  direction: 'buy' | 'sell'
): bigint {
  const price = new Decimal(referencePriceRial.toString());
  const spreadMultiplier = new Decimal(spreadBp).div(10000);

  if (direction === 'buy') {
    const result = price.mul(new Decimal(1).plus(spreadMultiplier)).ceil();
    return BigInt(result.toString());
  } else {
    const result = price.mul(new Decimal(1).minus(spreadMultiplier)).floor();
    return BigInt(result.toString());
  }
}

export { Decimal };

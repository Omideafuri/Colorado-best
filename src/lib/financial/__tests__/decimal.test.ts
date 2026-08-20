import { describe, it, expect } from 'vitest';
import { calculateCashAmount, calculateFee, calculateGoldWeight } from '../decimal';

describe('Financial Decimal Tests', () => {
  it('calculates correct cash amount from gold weight', () => {
    // 10 grams (10_000_000_000 ng) * 45,000,000 Rial per gram = 450,000,000 Rial
    const weightNg = BigInt(10_000_000_000);
    const pricePerGramRial = BigInt(45_000_000);
    const amount = calculateCashAmount(weightNg, pricePerGramRial);
    
    expect(amount.toString()).toBe('450000000');
  });

  it('calculates exact gold amount from cash', () => {
    // 450,000,000 Rial / 45,000,000 Rial per gram = 10 grams = 10_000_000_000 ng
    const cashRial = BigInt(450_000_000);
    const pricePerGramRial = BigInt(45_000_000);
    const weight = calculateGoldWeight(cashRial, pricePerGramRial);
    
    expect(weight.toString()).toBe('10000000000');
  });

  it('calculates fee properly with basis points', () => {
    // 1% of 10,000,000 is 100,000
    // 100 bp = 1%
    const baseValue = BigInt(10_000_000);
    const feeBp = 100;
    const fee = calculateFee(baseValue, feeBp);
    
    expect(fee.toString()).toBe('100000');
  });

  it('calculates small fee correctly (truncation safety)', () => {
    // 0.5% (50 bp) of 10,000 = 50
    const baseValue = BigInt(10_000);
    const feeBp = 50;
    const fee = calculateFee(baseValue, feeBp);
    
    expect(fee.toString()).toBe('50');
  });

  it('safely handles fractional truncation without decimal.js dependency errors', () => {
    // 1234 Rial / 45,000,000 Rial per gram = 0.000027422 grams = 27422 ng
    // 1234 * 1_000_000_000 / 45_000_000 = 1234000 / 45 = 27422.222... (rounds to 27422)
    const cashRial = BigInt(1234);
    const pricePerGramRial = BigInt(45_000_000);
    const weight = calculateGoldWeight(cashRial, pricePerGramRial);
    
    expect(weight.toString()).toBe('27422');
  });
});

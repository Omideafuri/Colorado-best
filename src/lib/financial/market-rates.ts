export interface MarketItemRate {
  key: string;
  titleFa: string;
  titleEn: string;
  symbol: string;
  priceToman: number;
  priceRial: number;
  changeToman: number;
  changePercent: number;
  unit: string;
  isAvailable: boolean;
}

export interface ComprehensiveMarketRates {
  gold18k: MarketItemRate;
  gold24k: MarketItemRate;
  mesghal: MarketItemRate;
  coinEmami: MarketItemRate;
  coinBahar: MarketItemRate;
  coinHalf: MarketItemRate;
  coinQuarter: MarketItemRate;
  goldOunce: MarketItemRate;
  lastUpdated: string;
  isStale: boolean;
  source: string;
}

/**
 * Calibrated Iranian gold & coin market benchmarks (fallback in Toman)
 */
export const DEFAULT_BENCHMARK_RATES: ComprehensiveMarketRates = {
  gold18k: {
    key: 'gold18k',
    titleFa: 'طلای ۱۸ عیار',
    titleEn: '18K Gold (750)',
    symbol: 'GOLD-18K',
    priceToman: 3650000,
    priceRial: 36500000,
    changeToman: 18500,
    changePercent: 0.51,
    unit: 'گرم',
    isAvailable: true,
  },
  gold24k: {
    key: 'gold24k',
    titleFa: 'طلای ۲۴ عیار (شمش)',
    titleEn: '24K Gold (999)',
    symbol: 'GOLD-24K',
    priceToman: 4866000,
    priceRial: 48660000,
    changeToman: 24700,
    changePercent: 0.51,
    unit: 'گرم',
    isAvailable: true,
  },
  mesghal: {
    key: 'mesghal',
    titleFa: 'مثقال طلا (۱۷ عیار)',
    titleEn: 'Mesghal Gold',
    symbol: 'MESGHAL',
    priceToman: 15810000,
    priceRial: 158100000,
    changeToman: 80000,
    changePercent: 0.51,
    unit: 'مثقال',
    isAvailable: true,
  },
  coinEmami: {
    key: 'coinEmami',
    titleFa: 'سکه تمام طرح جدید (امامی)',
    titleEn: 'Imami Gold Coin',
    symbol: 'COIN-EMAMI',
    priceToman: 44200000,
    priceRial: 442000000,
    changeToman: 250000,
    changePercent: 0.57,
    unit: 'عدد',
    isAvailable: true,
  },
  coinBahar: {
    key: 'coinBahar',
    titleFa: 'سکه تمام طرح قدیم (بهار آزادی)',
    titleEn: 'Bahar Azadi Coin',
    symbol: 'COIN-BAHAR',
    priceToman: 39500000,
    priceRial: 395000000,
    changeToman: 200000,
    changePercent: 0.51,
    unit: 'عدد',
    isAvailable: true,
  },
  coinHalf: {
    key: 'coinHalf',
    titleFa: 'نیم سکه بهار آزادی',
    titleEn: 'Half Gold Coin',
    symbol: 'COIN-HALF',
    priceToman: 24100000,
    priceRial: 241000000,
    changeToman: 150000,
    changePercent: 0.63,
    unit: 'عدد',
    isAvailable: true,
  },
  coinQuarter: {
    key: 'coinQuarter',
    titleFa: 'ربع سکه بهار آزادی',
    titleEn: 'Quarter Gold Coin',
    symbol: 'COIN-QUARTER',
    priceToman: 15300000,
    priceRial: 153000000,
    changeToman: 100000,
    changePercent: 0.66,
    unit: 'عدد',
    isAvailable: true,
  },
  goldOunce: {
    key: 'goldOunce',
    titleFa: 'انس جهانی طلا',
    titleEn: 'Gold Ounce (USD)',
    symbol: 'XAU-USD',
    priceToman: 2745, // USD value
    priceRial: 27450,
    changeToman: 12,
    changePercent: 0.44,
    unit: 'دلار / اونس',
    isAvailable: true,
  },
  lastUpdated: new Date().toISOString(),
  isStale: false,
  source: 'FALLBACK_BENCHMARK',
};

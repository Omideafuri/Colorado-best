import { applySpread } from '@/lib/financial/decimal';
import {
  HistoricalPrice,
  IGoldPriceProvider,
  PriceData,
  TimeRange,
} from '../interfaces/gold-price';
import { fetchAlanChandMarketRates } from './client';
import { MockGoldPriceProvider } from '../mock/gold-price.mock';

export class AlanChandPriceProvider implements IGoldPriceProvider {
  private fallbackMock = new MockGoldPriceProvider();

  async getCurrentPrice(goldType = '18K'): Promise<PriceData> {
    try {
      const marketRates = await fetchAlanChandMarketRates();
      const item = goldType === '24K' ? marketRates.gold24k : marketRates.gold18k;
      const refRial = BigInt(item.priceRial);
      const buySpreadBp = 150; // 1.5% default markup
      const sellSpreadBp = 150; // 1.5% default markdown

      const now = new Date();
      const hour = now.getHours();
      const isMarketOpen = hour >= 9 && hour < 19;

      return {
        goldType,
        referencePriceRial: refRial,
        buyPriceRial: applySpread(refRial, buySpreadBp, 'buy'),
        sellPriceRial: applySpread(refRial, sellSpreadBp, 'sell'),
        buySpreadBp,
        sellSpreadBp,
        changeRial: BigInt(item.changeToman * 10),
        changePct: item.changePercent,
        isMarketOpen,
        lastUpdated: new Date(marketRates.lastUpdated),
        source: marketRates.source,
      };
    } catch {
      return this.fallbackMock.getCurrentPrice(goldType);
    }
  }

  async getHistoricalPrices(goldType: string, range: TimeRange): Promise<HistoricalPrice[]> {
    return this.fallbackMock.getHistoricalPrices(goldType, range);
  }
}

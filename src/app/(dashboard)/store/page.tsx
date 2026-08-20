import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount, calculateFee } from '@/lib/financial/decimal';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { ShoppingBag, Coins, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buyProductAction } from '@/app/actions/products';

// Helper to seed initial products if none exist
async function ensureMockProducts() {
  const count = await db.product.count();
  if (count === 0) {
    await db.product.createMany({
      data: [
        {
          nameFa: 'شمش ۵ گرمی زروی',
          nameEn: 'Zaravi 5g Bar',
          category: 'BAR',
          goldType: '18K',
          weightNg: BigInt(5_000_000_000), // 5g
          premiumBp: 200, // 2% premium
          isAvailable: true,
        },
        {
          nameFa: 'ربع سکه بانکی',
          nameEn: 'Quarter Coin',
          category: 'COIN',
          goldType: '18K', // Simplified for MVP
          weightNg: BigInt(2_033_000_000), // ~2.033g
          premiumBp: 1500, // 15% bubble/premium typical for coins
          isAvailable: true,
        },
        {
          nameFa: 'پلاک هدیه پارسیان',
          nameEn: 'Parsian 1g Plaque',
          category: 'PLAQUE',
          goldType: '18K',
          weightNg: BigInt(1_000_000_000), // 1g
          premiumBp: 300, // 3% premium
          isAvailable: true,
        }
      ]
    });
  }
}

export default async function StorePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await ensureMockProducts();

  const products = await db.product.findMany({
    where: { isAvailable: true },
    orderBy: { weightNg: 'asc' }
  });

  const snapshot = await getLatestPriceSnapshot('18K');
  
  // Also get user cash balance
  const cashWallet = await db.cashWallet.findUnique({ where: { userId: user.id } });
  const cashBalanceToman = Number((cashWallet?.balanceRial || BigInt(0)) / BigInt(10));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold text-text-primary">فروشگاه قطعات فیزیکی</h1>
          <p className="text-sm text-text-secondary mt-1">خرید مستقیم شمش، سکه و پلاک با تضمین اصالت</p>
        </div>
        <div className="text-left bg-surface-secondary px-4 py-2 rounded-lg">
          <p className="text-xs text-text-muted">موجودی نقدی شما</p>
          <p className="font-bold font-num text-success">{formatNumber(cashBalanceToman)} تومان</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const weightGrams = Number(product.weightNg) / 1_000_000_000;
          const baseValueRial = calculateCashAmount(product.weightNg, snapshot.buyPriceRial);
          const premiumRial = calculateFee(baseValueRial, product.premiumBp);
          const makingChargeRial = product.makingChargeRial || BigInt(0);
          const totalPriceToman = Number((baseValueRial + premiumRial + makingChargeRial) / BigInt(10));
          const quantityAvailable = product.quantityAvailable ?? 0;
          
          return (
            <div key={product.id} className="card-surface flex flex-col overflow-hidden">
              <div className="aspect-video bg-gold-50 flex items-center justify-center border-b border-border p-6 relative">
                <Coins className="h-16 w-16 text-gold-400 opacity-50" />
                <span className="absolute top-3 right-3 bg-white text-xs font-bold text-gold-700 px-2 py-1 rounded-full shadow-sm">
                  {toPersianDigits(weightGrams.toString())} گرم
                </span>
                <span className="absolute top-3 left-3 bg-white text-xs font-bold text-gray-700 px-2 py-1 rounded-full shadow-sm">
                  موجودی: {quantityAvailable > 0 ? toPersianDigits(quantityAvailable.toString()) : 'ناموجود'}
                </span>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-text-primary mb-1">{product.nameFa}</h3>
                <p className="text-sm text-text-secondary flex items-center gap-1 mb-4">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  با ضمانت اصالت زروی
                </p>
                
                <div className="bg-surface-secondary p-3 rounded-lg mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">ارزش طلا:</span>
                    <span className="font-num font-medium text-text-primary">
                      {formatNumber(Number(baseValueRial / BigInt(10)))} تومان
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">اجرت و مالیات:</span>
                    <span className="font-num font-medium text-text-primary">
                      {formatNumber(Number((premiumRial + makingChargeRial) / BigInt(10)))} تومان
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>قیمت نهایی:</span>
                    <span className="font-num text-gold-600">{formatNumber(totalPriceToman)} تومان</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <form action={buyProductAction as unknown as string}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
                    <Button 
                      type="submit"
                      disabled={cashBalanceToman < totalPriceToman || quantityAvailable <= 0}
                      variant="primary"
                      className="w-full"
                      icon={<ShoppingBag className="h-4 w-4" />}
                    >
                      {quantityAvailable <= 0 ? 'موجودی به اتمام رسید' : cashBalanceToman < totalPriceToman ? 'موجودی ناکافی' : 'خرید و کسر از کیف پول'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

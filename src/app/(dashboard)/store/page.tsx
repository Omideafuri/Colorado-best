import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount, calculateFee } from '@/lib/financial/decimal';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
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
          weightNg: BigInt(5_000_000_000),
          premiumBp: 200,
          isAvailable: true,
          quantityAvailable: 15,
        },
        {
          nameFa: 'ربع سکه بانکی',
          nameEn: 'Quarter Coin',
          category: 'COIN',
          goldType: '18K',
          weightNg: BigInt(2_033_000_000),
          premiumBp: 1500,
          isAvailable: true,
          quantityAvailable: 4,
        },
        {
          nameFa: 'پلاک ۱ گرمی پارسیان',
          nameEn: 'Parsian 1g Plaque',
          category: 'PLAQUE',
          goldType: '18K',
          weightNg: BigInt(1_000_000_000),
          premiumBp: 300,
          isAvailable: true,
          quantityAvailable: 0,
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
    orderBy: { weightNg: 'asc' }
  });

  const snapshot = await getLatestPriceSnapshot('18K');

  const cashWallet = await db.cashWallet.findUnique({ where: { userId: user.id } });
  const cashBalanceToman = Number((cashWallet?.balanceRial || BigInt(0)) / BigInt(10));

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Editorial Header */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="diamond-motif" />
          <span className="text-xs tracking-brand text-text-muted">فروشگاه فیزیکی</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-4">گالری محصولات</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              محصولات طلای فیزیکی با تضمین اصالت. هر محصول با تأیید عیارسنجی ارائه و در بسته‌بندی اختصاصی تحویل داده می‌شود.
            </p>
          </div>
          <div className="text-left border border-border p-6 bg-surface min-w-[220px]">
            <p className="text-xs tracking-brand text-text-muted mb-2">موجودی شما</p>
            <p className="text-2xl font-semibold font-num text-text-primary">
              {formatNumber(cashBalanceToman)}
            </p>
            <p className="text-sm text-text-muted mt-1">تومان</p>
          </div>
        </div>
      </div>

      {/* Products — Editorial Gallery */}
      <div className="space-y-px">
        {products.map((product, idx) => {
          const weightGrams = Number(product.weightNg) / 1_000_000_000;
          const baseValueRial = calculateCashAmount(product.weightNg, snapshot.buyPriceRial);
          const premiumRial = calculateFee(baseValueRial, product.premiumBp);
          const makingChargeRial = product.makingChargeRial || BigInt(0);
          const totalPriceToman = Number((baseValueRial + premiumRial + makingChargeRial) / BigInt(10));
          const quantityAvailable = product.quantityAvailable ?? 0;
          const isAvailable = product.isAvailable && quantityAvailable > 0;

          return (
            <div key={product.id} className="grid md:grid-cols-2 gap-px bg-border group">
              {/* Product Visual */}
              <div className={`bg-surface-secondary p-12 md:p-16 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                {/* Abstract gold composition */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-100/50 via-transparent to-gold-200/30" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-7xl md:text-8xl font-semibold font-num text-text-primary/10 tracking-tighter">
                    {toPersianDigits(weightGrams.toString())}
                  </span>
                  <span className="text-lg text-text-muted mt-2">گرم طلای ۱۸ عیار</span>
                </div>

                {/* Availability badge */}
                <div className="absolute top-8 right-8">
                  <span className={`text-xs tracking-brand ${isAvailable ? 'text-success' : 'text-text-muted'}`}>
                    {isAvailable ? `${toPersianDigits(quantityAvailable.toString())} موجود` : 'ناموجود'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className={`bg-surface p-10 md:p-16 flex flex-col justify-between ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <div>
                  <span className="text-xs tracking-brand text-text-muted block mb-4">
                    {toPersianDigits((idx + 1).toString().padStart(2, '0'))}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mb-2">{product.nameFa}</h3>
                  <p className="text-sm text-text-muted mb-8">عیار ۱۸ (۷۵۰) · {product.nameEn}</p>

                  {/* Price breakdown */}
                  <div className="space-y-4 border-t border-border pt-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">ارزش طلا</span>
                      <span className="font-num text-text-primary">{formatNumber(Number(baseValueRial / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">اجرت ساخت</span>
                      <span className="font-num text-text-primary">{formatNumber(Number((premiumRial + makingChargeRial) / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-4">
                      <span className="text-sm font-medium text-text-primary">قیمت نهایی</span>
                      <span className="text-2xl font-semibold font-num text-text-primary tracking-tight">{formatNumber(totalPriceToman)} تومان</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <form action={buyProductAction as unknown as string}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
                    <Button
                      type="submit"
                      disabled={cashBalanceToman < totalPriceToman || !isAvailable}
                      className="w-full"
                      variant={!isAvailable || cashBalanceToman < totalPriceToman ? 'secondary' : 'primary'}
                    >
                      {!isAvailable ? 'موقتاً ناموجود' : cashBalanceToman < totalPriceToman ? 'موجودی ناکافی' : 'خرید و تحویل'}
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

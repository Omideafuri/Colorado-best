import Image from 'next/image';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount, calculateFee } from '@/lib/financial/decimal';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { buyProductAction } from '@/app/actions/products';

const productImages: Record<string, string> = {
  BAR: '/images/product_bar.jpg',
  COIN: '/images/product_coin.jpg',
  PLAQUE: '/images/product_plaque.jpg',
};

async function ensureMockProducts() {
  try {
    const count = await db.product.count();
    if (count === 0) {
      await db.product.createMany({
        data: [
          {
            nameFa: 'شمش ۵ گرمی زروی',
            nameEn: 'Zaravi 5g Cast Gold Bar',
            category: 'BAR',
            goldType: '18K',
            weightNg: BigInt(5_000_000_000),
            premiumBp: 200,
            isAvailable: true,
            quantityAvailable: 15,
            imageUrl: '/images/product_bar.jpg',
          },
          {
            nameFa: 'سکه بهار آزادی طرح جدید',
            nameEn: 'Bahar Azadi Bullion Coin',
            category: 'COIN',
            goldType: '18K',
            weightNg: BigInt(2_033_000_000),
            premiumBp: 1500,
            isAvailable: true,
            quantityAvailable: 4,
            imageUrl: '/images/product_coin.jpg',
          },
          {
            nameFa: 'پلاک آویز معماری پارسیان',
            nameEn: 'Parsian Architectural Plaque 1g',
            category: 'PLAQUE',
            goldType: '18K',
            weightNg: BigInt(1_000_000_000),
            premiumBp: 300,
            isAvailable: true,
            quantityAvailable: 8,
            imageUrl: '/images/product_plaque.jpg',
          }
        ]
      });
    }
  } catch {
    // DB unreachable during build time
  }
}

export const metadata: Metadata = {
  title: 'گالری و تحویل فیزیکی طلا — زروی',
};

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
    <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-4">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7E776C] uppercase">گالری فیزیکی زروی</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E2D7] pb-8">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#161412] tracking-tight mb-3">گالری شمش و مسکوکات فاخر</h1>
            <p className="text-xs sm:text-sm md:text-base text-[#4A453E] leading-relaxed font-light">
              محصولات فیزیکی استاندارد با بسته‌بندی امنیتی ضدجعل، هولوگرام اصالت و شناسنامه رسمی عیار.
            </p>
          </div>
          <div className="border border-[#E8E2D7] rounded-2xl p-5 bg-white shadow-subtle min-w-[240px]">
            <p className="text-xs tracking-brand text-[#7E776C] mb-1 font-semibold uppercase">موجودی کیف پول ریالی</p>
            <p className="text-2xl font-bold font-num text-[#14182E]">
              {formatNumber(cashBalanceToman)} <span className="text-xs font-normal text-[#7E776C]">تومان</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-6">
        {products.map((product, idx) => {
          const weightGrams = Number(product.weightNg) / 1_000_000_000;
          const baseValueRial = calculateCashAmount(product.weightNg, snapshot.buyPriceRial);
          const premiumRial = calculateFee(baseValueRial, product.premiumBp);
          const makingChargeRial = product.makingChargeRial || BigInt(0);
          const totalPriceToman = Number((baseValueRial + premiumRial + makingChargeRial) / BigInt(10));
          const quantityAvailable = product.quantityAvailable ?? 0;
          const isAvailable = product.isAvailable && quantityAvailable > 0;
          const imageSrc = product.imageUrl || productImages[product.category] || '/images/product_bar.jpg';

          return (
            <div key={product.id} className="grid md:grid-cols-12 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] bg-white overflow-hidden shadow-subtle hover:border-[#B35817]/50 hover:shadow-card transition-all duration-500 group">
              {/* Product Visual */}
              <div className={`md:col-span-6 bg-[#FAF8F4] flex items-center justify-center min-h-[300px] md:min-h-[380px] relative overflow-hidden p-6 sm:p-8 image-hover-zoom ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative w-full h-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border border-[#E8E2D7] bg-white p-4">
                  <Image
                    src={imageSrc}
                    alt={product.nameFa}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover rounded-xl"
                  />
                </div>

                {/* Stock Badge */}
                <div className="absolute top-5 right-5">
                  <span className={`text-[11px] font-bold tracking-wide px-3 py-1 rounded-full backdrop-blur-md ${isAvailable ? 'bg-white/95 text-emerald-800 border border-emerald-300' : 'bg-white/95 text-[#7E776C] border border-[#E8E2D7]'}`}>
                    {isAvailable ? `موجودی: ${toPersianDigits(quantityAvailable.toString())}` : 'اتمام موجودی'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className={`md:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs tracking-brand font-bold text-[#B35817] uppercase">
                      قطعه ۰{toPersianDigits((idx + 1).toString())}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#14182E] uppercase">
                      {toPersianDigits(weightGrams.toString())} G
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#161412] tracking-tight mb-1">{product.nameFa}</h3>
                  <p className="text-[11px] text-[#7E776C] mb-6 tracking-wider uppercase font-mono">{product.nameEn}</p>

                  <div className="space-y-3 border-t border-[#E8E2D7] pt-5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A453E] font-light">ارزش خام طلا</span>
                      <span className="font-num text-[#161412]">{formatNumber(Number(baseValueRial / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A453E] font-light">اجرت ضرب و بسته‌بندی امنیتی</span>
                      <span className="font-num text-[#161412]">{formatNumber(Number((premiumRial + makingChargeRial) / BigInt(10)))} تومان</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#E8E2D7] pt-3.5">
                      <span className="font-bold text-[#161412]">مبلغ کل قابل پرداخت</span>
                      <span className="text-xl sm:text-2xl font-bold font-num text-[#14182E] tracking-tight">{formatNumber(totalPriceToman)} تومان</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3">
                  <form action={buyProductAction as unknown as string}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
                    <Button
                      type="submit"
                      disabled={cashBalanceToman < totalPriceToman || !isAvailable}
                      className="w-full rounded-full text-xs font-bold shadow-copper-glow"
                      size="lg"
                      variant={!isAvailable || cashBalanceToman < totalPriceToman ? 'secondary' : 'primary'}
                    >
                      {!isAvailable ? 'موقتاً ناموجود' : cashBalanceToman < totalPriceToman ? 'موجودی ناکافی کیف پول' : 'خرید و ثبت سفارش تحویل'}
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

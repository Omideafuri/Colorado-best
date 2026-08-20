const fs = require('fs');
const path = require('path');

const pages = [
  // PUBLIC PAGES
  {
    path: 'src/app/(public)/prices/page.tsx',
    content: `import { Shield, TrendingUp } from 'lucide-react';

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">قیمت لحظه‌ای طلا</h1>
        <p className="text-text-secondary">مشاهده و تحلیل قیمت‌های آنلاین طلا در پلتفرم زروی.</p>
      </div>
      <div className="card-surface p-8 max-w-2xl mx-auto text-center">
        <TrendingUp className="h-12 w-12 text-gold-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">در حال بارگذاری داده‌های بازار...</h2>
        <p className="text-text-secondary">این بخش به زودی با نمودارهای تعاملی به‌روز خواهد شد.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/about/page.tsx',
    content: `export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">درباره زروی</h1>
      <div className="card-surface p-8 space-y-6 text-text-secondary leading-relaxed">
        <p>زروی یک پلتفرم نوین و امن برای خرید، فروش و سرمایه‌گذاری در طلای دیجیتال است. هدف ما ایجاد بستری شفاف و قابل اعتماد برای حفظ ارزش سرمایه کاربران است.</p>
        <p>ما با بهره‌گیری از آخرین تکنولوژی‌های امنیتی و همکاری با تامین‌کنندگان معتبر، امکان دسترسی سریع و آسان به بازار طلا را برای همه فراهم کرده‌ایم.</p>
        <p>تیم پشتیبانی ما در تمامی ساعات کاری آماده پاسخگویی و راهنمایی شما عزیزان می‌باشد.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/faq/page.tsx',
    content: `export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">سوالات متداول</h1>
      <div className="space-y-4">
        {[
          { q: 'چگونه می‌توانم در زروی طلا بخرم؟', a: 'ابتدا در سایت ثبت‌نام کنید، احراز هویت خود را تکمیل کرده و سپس از طریق بخش بازار اقدام به خرید نمایید.' },
          { q: 'آیا امکان دریافت فیزیکی طلا وجود دارد؟', a: 'بله، شما می‌توانید معادل موجودی طلای خود، درخواست تحویل فیزیکی ثبت کنید تا به صورت ایمن به آدرس شما ارسال شود.' },
          { q: 'کارمزد معاملات چقدر است؟', a: 'کارمزد معاملات به صورت شفاف در هنگام خرید و فروش نمایش داده می‌شود و حداقل میزان ممکن است.' }
        ].map((faq, i) => (
          <div key={i} className="card-surface p-6">
            <h3 className="text-lg font-bold text-text-primary mb-2">{faq.q}</h3>
            <p className="text-text-secondary">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/contact/page.tsx',
    content: `import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">تماس با ما</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-surface p-8 space-y-6">
          <h2 className="text-xl font-bold text-text-primary">اطلاعات تماس</h2>
          <div className="space-y-4 text-text-secondary">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gold-500" />
              <span>۰۲۱-XXXXXXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gold-500" />
              <span>info@zaravi.gold</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold-500" />
              <span>تهران، خیابان ...، پلاک ...</span>
            </div>
          </div>
        </div>
        <div className="card-surface p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">نام شما</label>
              <input type="text" className="w-full rounded-lg border border-border bg-surface px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">پیام</label>
              <textarea rows={4} className="w-full rounded-lg border border-border bg-surface px-4 py-2"></textarea>
            </div>
            <Button variant="primary" className="w-full">ارسال پیام</Button>
          </form>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/blog/page.tsx',
    content: `export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-4">وبلاگ زروی</h1>
      <p className="text-text-secondary mb-8">جدیدترین اخبار بازار طلا و مقالات آموزشی</p>
      <div className="card-surface p-12">
        <p className="text-lg">به زودی مقالات و تحلیل‌های تخصصی در این بخش قرار خواهد گرفت.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/terms/page.tsx',
    content: `export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">قوانین و مقررات</h1>
      <div className="card-surface p-8 space-y-4 text-text-secondary leading-relaxed">
        <p>استفاده از پلتفرم زروی به منزله پذیرش کامل قوانین و مقررات زیر می‌باشد:</p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>کاربر موظف است اطلاعات هویتی خود را به صورت صحیح و دقیق وارد نماید.</li>
          <li>تمامی تراکنش‌ها با رعایت قوانین مبارزه با پولشویی کشور انجام می‌شود.</li>
          <li>مسئولیت حفظ و نگهداری از اطلاعات ورود به حساب کاربری بر عهده شخص کاربر است.</li>
          <li>هرگونه سوءاستفاده از سیستم منجر به مسدود شدن حساب کاربری خواهد شد.</li>
        </ul>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/privacy/page.tsx',
    content: `export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">حریم خصوصی</h1>
      <div className="card-surface p-8 space-y-4 text-text-secondary leading-relaxed">
        <p>زروی به حفظ حریم خصوصی کاربران خود اهمیت می‌دهد. اطلاعاتی که ما جمع‌آوری می‌کنیم:</p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>اطلاعات هویتی و تماس صرفاً جهت احراز هویت و امنیت حساب کاربری استفاده می‌شود.</li>
          <li>اطلاعات تراکنش‌ها به صورت رمزنگاری شده ذخیره می‌شوند.</li>
          <li>ما اطلاعات شخصی شما را در اختیار هیچ شخص ثالثی قرار نمی‌دهیم، مگر با حکم قضایی.</li>
        </ul>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/risk-disclosure/page.tsx',
    content: `export default function RiskDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">بیانیه ریسک</h1>
      <div className="card-surface p-8 space-y-4 text-text-secondary leading-relaxed">
        <p>سرمایه‌گذاری در بازار طلا همواره با ریسک نوسانات قیمتی همراه است:</p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>قیمت طلا تحت تاثیر عوامل اقتصاد جهانی، نرخ ارز و شرایط بازار تغییر می‌کند.</li>
          <li>زروی صرفاً پلتفرمی برای تسهیل معاملات است و مسئولیتی در قبال سود یا زیان ناشی از نوسانات بازار ندارد.</li>
          <li>توصیه می‌شود قبل از سرمایه‌گذاری، دانش و آگاهی لازم را کسب نمایید.</li>
        </ul>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(public)/delivery-policy/page.tsx',
    content: `export default function DeliveryPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">سیاست‌های تحویل</h1>
      <div className="card-surface p-8 space-y-4 text-text-secondary leading-relaxed">
        <p>شرایط و ضوابط تحویل فیزیکی طلا:</p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>تحویل فیزیکی تنها به شخص صاحب حساب و پس از تایید نهایی آدرس انجام می‌شود.</li>
          <li>مرسولات از طریق پست ویژه و همراه با بیمه کامل ارسال می‌گردند.</li>
          <li>زمان تحویل بسته به موقعیت جغرافیایی بین ۳ تا ۷ روز کاری متغیر است.</li>
        </ul>
      </div>
    </div>
  );
}`
  },
  
  // AUTH
  {
    path: 'src/app/(auth)/forgot-password/page.tsx',
    content: `import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary">بازیابی رمز عبور</h2>
        <p className="mt-2 text-sm text-text-secondary">شماره موبایل خود را برای دریافت کد تایید وارد کنید</p>
      </div>
      <form className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">شماره موبایل</label>
          <input type="text" dir="ltr" placeholder="09123456789" className="w-full rounded-lg border border-border bg-surface px-4 py-2" />
        </div>
        <Button variant="primary" className="w-full">ارسال کد بازیابی</Button>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-sm font-medium text-gold-600 hover:text-gold-700">بازگشت به ورود</Link>
      </div>
    </div>
  );
}`
  },
  
  // DASHBOARD
  {
    path: 'src/app/(dashboard)/transfer/page.tsx',
    content: `import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

export default function TransferPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">انتقال طلا</h1>
        <p className="text-sm text-text-secondary mt-1">انتقال طلای دیجیتال به حساب کاربران دیگر زروی</p>
      </div>
      <div className="card-surface p-6 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 mx-auto text-gold-500">
          <ArrowLeftRight className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold">این قابلیت به زودی فعال می‌شود</h2>
        <p className="text-sm text-text-secondary">تیم ما در حال توسعه زیرساخت‌های امن برای انتقال مستقیم طلا بین کاربران است.</p>
        <Button variant="outline" className="w-full" disabled>در حال توسعه</Button>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(dashboard)/settings/page.tsx',
    content: `import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">تنظیمات حساب کاربری</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>تنظیمات امنیتی، رمز عبور و اعلانات به زودی به این بخش اضافه خواهد شد.</p>
      </div>
    </div>
  );
}`
  },
  
  // ADMIN
  {
    path: 'src/app/(admin)/admin/users/page.tsx',
    content: `import { Users } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">مدیریت کاربران</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>لیست و مدیریت کاربران به زودی پیاده‌سازی خواهد شد.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(admin)/admin/transactions/page.tsx',
    content: `import { ArrowLeftRight } from 'lucide-react';

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">تراکنش‌های سیستم</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <ArrowLeftRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>مشاهده جامع تراکنش‌های خرید و فروش به زودی.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(admin)/admin/reports/page.tsx',
    content: `import { BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">گزارشات آماری</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>داشبورد گزارشات مالی و نمودارهای تحلیلی پلتفرم.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(admin)/admin/audit/page.tsx',
    content: `import { FileText } from 'lucide-react';

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">لاگ‌های امنیتی</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>بخش مشاهده لاگ‌های حسابرسی و عملیات مدیران.</p>
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/(admin)/admin/settings/page.tsx',
    content: `import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">تنظیمات پلتفرم</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>تنظیمات کلی سیستم، محدودیت‌ها و متغیرهای عملیاتی.</p>
      </div>
    </div>
  );
}`
  }
];

for (const page of pages) {
  const dir = path.dirname(page.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(page.path, page.content, 'utf8');
}
console.log('Successfully created all missing pages.');

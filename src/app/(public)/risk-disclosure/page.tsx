import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function RiskDisclosurePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#B8621B] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#262A56] mb-4 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B8621B]" />
            <span>شفافیت و آگاهی سرمایه‌گذاران</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">بیانیه افشای ریسک بازار</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            ملاحظات اقتصادی و نوسانات بازار طلا پیش از تصمیم‌گیری برای ورود به معاملات
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E1D5] shadow-xs space-y-6 text-xs sm:text-sm text-[#4A463F] leading-relaxed">
          <div className="flex items-center gap-2 text-sm font-bold text-[#262A56]">
            <ShieldAlert className="w-5 h-5 text-[#B8621B]" />
            <span>نوسانات قیمت طلای جهانی و بازار آزاد</span>
          </div>
          <p>
            قیمت طلا تابعی از متغیرهای اقتصاد کلان، نرخ بهره جهانی، انس جهانی طلا و نرخ برابری ارز است. تغییرات نرخ طلا می‌تواند در کوتاه‌مدت با افزایش یا کاهش ارزش ریالی همراه باشد.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-[#262A56] pt-4 border-t border-[#E8E1D5]">
            <ShieldAlert className="w-5 h-5 text-[#B8621B]" />
            <span>نقش پلتفرم خانه زروی</span>
          </div>
          <p>
            خانه زروی صرفاً زیرساخت فنی و خزانه امن فیزیکی معاملات را فراهم می‌سازد و هیچ‌گونه توصیه مالی یا تضمین بازدهی صادر نمی‌نماید. کاربران محترم باید با تحلیل مستقل اقدام به دادوستد فرمایند.
          </p>
        </div>
      </div>
    </div>
  );
}
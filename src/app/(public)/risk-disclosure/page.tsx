export default function RiskDisclosurePage() {
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
}
export default function FAQPage() {
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
}
export default function DeliveryPolicyPage() {
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
}
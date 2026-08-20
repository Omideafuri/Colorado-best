export default function TermsPage() {
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
}
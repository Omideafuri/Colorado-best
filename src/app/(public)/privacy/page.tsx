export default function PrivacyPage() {
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
}
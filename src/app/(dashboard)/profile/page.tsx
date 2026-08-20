import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Shield } from 'lucide-react';
import { submitKycAction } from '@/app/actions/kyc';
import { Button } from '@/components/ui/button';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const profile = await db.profile.findUnique({ where: { userId: user.id } });
  const kyc = await db.kycApplication.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">پروفایل کاربری و احراز هویت</h1>
        <p className="text-sm text-text-secondary mt-1">مدیریت اطلاعات هویتی شما</p>
      </div>

      {/* KYC Status Badge */}
      <div className={`p-4 rounded-xl flex items-start gap-4 ${
        kyc?.status === 'VERIFIED' ? 'bg-success-light text-success' :
        kyc?.status === 'PENDING' ? 'bg-warning-light text-warning' :
        kyc?.status === 'REJECTED' ? 'bg-danger-light text-danger' :
        'bg-surface-secondary text-text-secondary'
      }`}>
        <Shield className="h-6 w-6 mt-1 flex-shrink-0" />
        <div>
          <h2 className="font-semibold mb-1">
            وضعیت احراز هویت: {' '}
            {kyc?.status === 'VERIFIED' ? 'تأیید شده' :
             kyc?.status === 'PENDING' ? 'در حال بررسی' :
             kyc?.status === 'REJECTED' ? 'رد شده' : 'انجام نشده'}
          </h2>
          <p className="text-sm opacity-90">
            {kyc?.status === 'VERIFIED' ? 'حساب شما تأیید شده است و محدودیتی برای معاملات ندارید.' :
             kyc?.status === 'PENDING' ? 'مدارک شما دریافت شده و در صف بررسی توسط کارشناسان است.' :
             kyc?.status === 'REJECTED' ? `مدارک شما رد شد. دلیل: ${kyc.rejectionReason || 'نامشخص'}` : 
             'برای دسترسی به تمام امکانات پلتفرم زروی، لطفاً فرم زیر را تکمیل کنید.'}
          </p>
        </div>
      </div>

      {/* KYC Form (Only if not pending or verified) */}
      {kyc?.status !== 'VERIFIED' && kyc?.status !== 'PENDING' && (
        <div className="card-surface p-6">
          <h3 className="text-lg font-semibold mb-4">فرم درخواست احراز هویت</h3>
          <form action={submitKycAction as unknown as string} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">نام</label>
                <input 
                  type="text" 
                  name="firstName"
                  defaultValue={profile?.firstName || ''}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-info"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">نام خانوادگی</label>
                <input 
                  type="text" 
                  name="lastName"
                  defaultValue={profile?.lastName || ''}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-info"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">کد ملی</label>
              <input 
                type="text" 
                name="nationalId"
                dir="ltr"
                defaultValue={profile?.nationalId || ''}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-info"
                maxLength={10}
                required 
              />
            </div>

            <div className="p-4 bg-info-light/50 border border-info/20 rounded-lg text-sm text-text-secondary leading-relaxed">
              <strong>توجه:</strong> در این نسخه آزمایشی (MVP) نیازی به آپلود عکس واقعی نیست. با کلیک روی دکمه زیر، یک درخواست شبیه‌سازی شده ثبت می‌شود.
            </div>

            <Button 
              type="submit"
              className="w-full"
            >
              ثبت و ارسال اطلاعات
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

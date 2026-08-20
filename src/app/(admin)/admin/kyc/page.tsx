import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { reviewKycAction } from '@/app/actions/kyc';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminKycPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  const applications = await db.kycApplication.findMany({
    where: { status: 'PENDING' },
    include: {
      user: {
        include: { profile: true }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">بررسی احراز هویت</h1>
        <p className="text-sm text-text-secondary mt-1">مدارک ارسال شده توسط کاربران جهت تأیید حساب</p>
      </div>

      <div className="card-surface overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            درخواستی برای بررسی وجود ندارد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-surface-secondary text-text-secondary border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">شماره موبایل</th>
                  <th className="px-4 py-3 font-medium">نام و نام خانوادگی</th>
                  <th className="px-4 py-3 font-medium">کد ملی</th>
                  <th className="px-4 py-3 font-medium text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-4 font-num text-text-primary" dir="ltr">
                      {app.user.mobile}
                    </td>
                    <td className="px-4 py-4">
                      {app.user.profile?.firstName} {app.user.profile?.lastName}
                    </td>
                    <td className="px-4 py-4 font-num">
                      {app.user.profile?.nationalId}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <form action={async () => {
                          'use server';
                          await reviewKycAction(app.id, 'VERIFIED');
                        }}>
                          <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            icon={<Check className="h-4 w-4" />}
                          >
                            تأیید
                          </Button>
                        </form>
                        <form action={async () => {
                          'use server';
                          await reviewKycAction(app.id, 'REJECTED', 'عدم تطابق اطلاعات');
                        }}>
                          <Button
                            type="submit"
                            variant="danger"
                            size="sm"
                            icon={<X className="h-4 w-4" />}
                          >
                            رد
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

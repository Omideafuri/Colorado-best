import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <DashboardSidebar />
      <main className="md:mr-60 pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-12">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

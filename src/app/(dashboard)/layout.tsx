import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8EE] text-[#2A1A08] selection:bg-[#A4530C] selection:text-white">
      <DashboardSidebar />
      <main className="md:mr-64 pb-24 md:pb-12">
        {/* Dashboard Top Bar */}
        <header className="sticky top-0 z-20 h-16 border-b border-[#DFD7B5] bg-[#FAF8EE]/90 backdrop-blur-md flex items-center justify-between px-6 md:px-10 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <h1 className="text-xs tracking-brand font-bold text-[#3A230A]">
              میز دارایی و معاملات اختصاصی زروی
            </h1>
          </div>
          <span className="text-[10px] font-mono bg-[#EEE9C1] border border-[#DFD7B5] px-2.5 py-1 rounded-full text-[#3A230A] font-bold shadow-floating-sm">
            WEALTH ROOM
          </span>
        </header>

        <div className="mx-auto max-w-6xl p-6 md:p-10">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

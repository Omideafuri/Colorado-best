import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-secondary px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-white font-bold text-xl">
          ز
        </div>
        <span className="text-2xl font-bold text-text-primary">زروی</span>
      </Link>
      
      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="card-surface p-6 sm:p-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-text-muted">
        © تمامی حقوق برای زروی محفوظ است.
      </p>
    </div>
  );
}

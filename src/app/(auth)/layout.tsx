import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-secondary px-6 py-16">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-4 mb-12">
        <span className="diamond-motif !w-3 !h-3 !bg-gold-500" />
        <span className="text-lg tracking-brand font-semibold text-text-primary">
          ZARAVI
        </span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="border border-border bg-surface p-8 md:p-10">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-text-muted">
        © تمامی حقوق برای زروی محفوظ است.
      </p>
    </div>
  );
}

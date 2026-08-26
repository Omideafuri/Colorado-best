export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-label="در حال بارگذاری">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-border-medium/50 border-t-accent-primary`}
      />
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-secondary px-4">
      <div className="text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-light mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>
        <h1 className="text-xl font-bold text-text-primary mb-2">
          خطایی رخ داده است
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
        </p>
        <Button
          onClick={reset}
          variant="primary"
          icon={<RefreshCcw className="h-4 w-4" />}
        >
          تلاش مجدد
        </Button>
      </div>
    </div>
  );
}

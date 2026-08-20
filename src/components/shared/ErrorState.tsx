import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  title = 'خطایی رخ داده است',
  message = 'لطفاً دوباره تلاش کنید. در صورت تداوم مشکل، با پشتیبانی تماس بگیرید.',
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-light mb-4">
        <AlertTriangle className="h-8 w-8 text-danger" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm">{message}</p>
      {retry && (
        <Button
          onClick={retry}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}

import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

import { Skeleton } from '@/shared/ui/skeleton';

export default function LoginLoading() {
  return (
    <div className="min-h-dvh bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-6 w-32 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

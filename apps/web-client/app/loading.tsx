import { Skeleton } from '@/shared/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="relative w-full h-48 sm:h-64 md:h-80">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <div className="p-4 sm:p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}

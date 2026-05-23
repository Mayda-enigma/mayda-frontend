import { Skeleton } from '@/shared/ui/skeleton';

export default function FiltersLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-md" />
            <div>
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </header>
      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

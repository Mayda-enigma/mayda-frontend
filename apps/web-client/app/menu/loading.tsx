import { Skeleton } from '@/shared/ui/skeleton';

export default function MenuLoading() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="w-8 h-8 rounded-md" />
            <div>
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Skeleton className="w-8 h-8 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-md" />
          </div>
        </div>
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <Skeleton className="h-10 sm:h-12 w-full rounded-md" />
        </div>
      </header>

      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 sm:h-10 w-20 sm:w-24 rounded-md" />
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 sm:h-10 w-28 sm:w-32 rounded-md" />
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-4 pb-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <Skeleton className="w-full h-32 sm:h-40 md:h-48 rounded-none" />
              <div className="p-3 sm:p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-14" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16 rounded-md" />
                  ))}
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <Skeleton className="h-9 flex-1 rounded-md" />
                  <Skeleton className="h-9 w-10 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

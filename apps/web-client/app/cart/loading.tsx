import { Skeleton } from '@/shared/ui/skeleton';

export default function CartLoading() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </header>
      <div className="p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
        <Skeleton className="h-12 w-full rounded-md mt-6" />
      </div>
    </div>
  );
}

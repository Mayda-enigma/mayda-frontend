export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="h-16 bg-muted rounded-lg animate-pulse mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden border">
            <div className="h-40 bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-8 bg-muted rounded animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

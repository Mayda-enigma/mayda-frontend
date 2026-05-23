'use client';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <div className="text-4xl">📋</div>
        <h2 className="text-xl font-semibold">Orders unavailable</h2>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t load your orders. Please try again.
        </p>
        <Button onClick={() => reset()} className="restaurant-gradient text-white">
          Try again
        </Button>
      </Card>
    </div>
  );
}

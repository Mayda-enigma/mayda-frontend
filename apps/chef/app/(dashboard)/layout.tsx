'use client';

import { AuthGuard } from '@/features/auth';
import { ChefTopbar } from '@/shared/ui/layout/chef-topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-dvh bg-background text-foreground">
        <ChefTopbar />
        <div className="md:p-4">
          <main className="min-h-[calc(100dvh-1rem)] bg-card text-card-foreground md:min-h-[calc(100dvh-2rem)] md:rounded-2xl md:border md:shadow-depth-card-lg">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

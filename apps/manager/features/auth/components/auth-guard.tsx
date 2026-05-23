'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCurrentUser } from '../api/queries';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isFetched } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isFetched) return;

    if (!user) {
      const next = encodeURIComponent(window.location.pathname);
      router.replace(`/login?next=${next}`);
      return;
    }

    if (user.role !== 'manager') {
      router.replace('/login');
    }
  }, [isFetched, user, router]);

  if (!isFetched) return null;
  if (!user) return null;
  if (user.role !== 'manager') return null;

  return <>{children}</>;
}

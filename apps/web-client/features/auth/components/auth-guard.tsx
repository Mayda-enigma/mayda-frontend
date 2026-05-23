'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCurrentUser } from '../api/queries';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isFetched } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isFetched && !user) {
      const next = encodeURIComponent(window.location.pathname);
      router.replace(`/login?next=${next}`);
    }
  }, [isFetched, user, router]);

  if (!isFetched) return null;
  if (!user) return null;

  return <>{children}</>;
}

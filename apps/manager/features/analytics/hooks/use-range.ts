'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { RangePreset } from '../types';

const VALID_RANGES: RangePreset[] = ['7d', '30d', '90d'];

function isValidRange(v: string | null): v is RangePreset {
  return VALID_RANGES.includes(v as RangePreset);
}

export function useRange() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const range: RangePreset = isValidRange(searchParams.get('range'))
    ? (searchParams.get('range') as RangePreset)
    : '7d';

  const setRange = useCallback(
    (next: RangePreset) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('range', next);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return { range, setRange };
}

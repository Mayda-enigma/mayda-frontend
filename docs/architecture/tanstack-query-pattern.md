# TanStack Query 5-File API Contract

Every API-backed feature must implement these 5 files under `features/<feature>/api/`.

## 1. `queryKeys.ts` — Type-Safe Hierarchical Factory

```ts
export const menuKeys = {
  all: ['menu'] as const,
  lists: () => [...menuKeys.all, 'list'] as const,
  list: (restaurantId: string) => [...menuKeys.lists(), restaurantId] as const,
  details: () => [...menuKeys.all, 'detail'] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};
```

**Why hierarchical:** lets mutations call `invalidateQueries({ queryKey: menuKeys.all })` to nuke every menu query at once, or scope narrower as needed.

## 2. `services.ts` — Raw HTTP, No Business Logic

```ts
import { apiClient } from '@/shared/api/client';
import type { MenuItemDto, CreateMenuItemDto } from '../types';

export const menuService = {
  list: (restaurantId: string) =>
    apiClient<MenuItemDto[]>(`/restaurants/${restaurantId}/menus`),
  create: (payload: CreateMenuItemDto) =>
    apiClient<MenuItemDto>(`/menus`, { method: 'POST', body: JSON.stringify(payload) }),
  detail: (id: string) =>
    apiClient<MenuItemDto>(`/menus/${id}`),
  update: (id: string, payload: CreateMenuItemDto) =>
    apiClient<MenuItemDto>(`/menus/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  remove: (id: string) =>
    apiClient<void>(`/menus/${id}`, { method: 'DELETE' }),
};
```

**Rule:** services return EXACTLY what the API sends (snake_case, raw strings, etc.). Zero transformation.

## 3. `mappers.ts` — DTO ↔ Domain

```ts
import type { MenuItemDto, MenuItem, CreateMenuItemInput, CreateMenuItemDto } from '../types';

export const toMenuItem = (dto: MenuItemDto): MenuItem => ({
  id: dto.id,
  name: dto.name,
  price: Number(dto.price_cents) / 100,
  imageUrl: dto.image_url ?? '/placeholder.png',
  dietary: dto.dietary_tags ?? [],
  isAvailable: dto.is_available,
});

export const toMenuItems = (dtos: MenuItemDto[]): MenuItem[] =>
  dtos.map(toMenuItem);

export const toCreateMenuItemDto = (input: CreateMenuItemInput): CreateMenuItemDto => ({
  name: input.name,
  price_cents: Math.round(input.price * 100),
  dietary_tags: input.dietary,
});
```

**Rule:** the rest of the app NEVER sees a `*Dto` type — only `MenuItem`, `Order`, etc.

## 4. `queries.ts` — `useQuery` Hooks

```ts
import { useQuery } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toMenuItems } from './mappers';

export const useMenu = (restaurantId: string) =>
  useQuery({
    queryKey: menuKeys.list(restaurantId),
    queryFn: () => menuService.list(restaurantId),
    select: (dtos) => toMenuItems(dtos),
    staleTime: 60_000,
    enabled: Boolean(restaurantId),
  });

export const useMenuItem = (id: string) =>
  useQuery({
    queryKey: menuKeys.detail(id),
    queryFn: () => menuService.detail(id),
    select: (dto) => toMenuItem(dto),
    enabled: Boolean(id),
  });
```

**Rule:** components consume `useMenu()` and get domain `MenuItem[]`. They never know a DTO existed.

## 5. `mutations.ts` — `useMutation` Hooks

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toCreateMenuItemDto } from './mappers';
import type { CreateMenuItemInput } from '../types';

export const useCreateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMenuItemInput) =>
      menuService.create(toCreateMenuItemDto(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};

export const useUpdateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateMenuItemInput }) =>
      menuService.update(id, toCreateMenuItemDto(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};

export const useDeleteMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: menuService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};
```

**Rule:** mutations invalidate query keys on success so the UI auto-reflects changes.

## QueryClient Defaults

Create `shared/lib/query-client.ts` once per app with these defaults:

```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: 0 },
  },
});
```

## Provider Setup

Create `shared/lib/query-provider.tsx` as a `"use client"` component:

```tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './query-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

Wrap your `app/layout.tsx` with `<QueryProvider>`:

```tsx
import { QueryProvider } from '@/shared/lib/query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

The devtools panel appears in development as a floating icon (bottom-left). It is automatically excluded from production builds by the library.

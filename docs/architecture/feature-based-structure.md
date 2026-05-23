# Feature-Based Architecture

Every app in this monorepo follows the same feature-based folder layout.

## Folder Layout

```
apps/<app>/
├── app/                              # Next.js App Router — thin routes only
├── features/
│   └── <feature>/                    # e.g. auth, menu, cart, orders
│       ├── api/
│       │   ├── queryKeys.ts          # Query-key factory (single source of truth)
│       │   ├── services.ts           # Raw HTTP calls; returns API DTOs verbatim
│       │   ├── mappers.ts            # API DTO → domain model
│       │   ├── queries.ts            # useQuery hooks (READ)
│       │   └── mutations.ts          # useMutation hooks (CREATE/UPDATE/DELETE)
│       ├── components/               # Feature-scoped UI components
│       ├── hooks/                    # Feature-scoped non-query hooks
│       ├── types.ts                  # DTO + domain types co-located
│       └── index.ts                  # Barrel — what other features can import
├── shared/
│   ├── api/
│   │   └── client.ts                 # Fetch wrapper: JWT, base URL, error normalization
│   ├── lib/
│   │   ├── env.ts                    # process.env.NEXT_PUBLIC_API_URL
│   │   ├── query-client.ts           # QueryClient instance + defaults
│   │   └── query-provider.tsx        # <QueryClientProvider> wrapper
│   ├── ui/                           # shadcn/ui primitives (Button, Card, etc.)
│   └── utils/                        # cn(), formatters, etc.
├── components.json                   # shadcn/ui configuration
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Feature Folder Anatomy

Each feature under `features/<feature>/` contains:

| Path | Purpose |
|------|---------|
| `api/queryKeys.ts` | Hierarchical query-key factory for TanStack Query |
| `api/services.ts` | Raw HTTP calls — no business logic |
| `api/mappers.ts` | DTO → Domain transformation |
| `api/queries.ts` | `useQuery` hooks consuming services + mappers |
| `api/mutations.ts` | `useMutation` hooks with cache invalidation |
| `components/` | React components scoped to this feature |
| `hooks/` | Custom hooks (non-query) scoped to this feature |
| `types.ts` | All types: `*Dto` (API shape) + domain types |
| `index.ts` | Barrel file — what other features/shared can import |

## Cross-Feature Import Rule

Features can only import from `shared/`. **No feature may import directly from another feature.**

If feature A needs data from feature B, A re-queries via B's exposed hooks through B's `index.ts` barrel. This keeps features decoupled and independently testable.

```
features/auth/  ←  features/menu/     ❌ Not allowed
features/auth/  →  shared/            ✅ Allowed
features/auth/  →  features/menu/     ❌ Not allowed
```

## Path Alias

All apps use `@/*` mapped to `./*` (the app root). This means:

```
// Internal feature imports use relative paths
import { toMenuItem } from './mappers';

// Cross-boundary imports use the @/ alias
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils';
import { apiClient } from '@/shared/api/client';
```

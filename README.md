# mayda-frontend

Feature-based monorepo with four Next.js 14 apps.

## Apps

| App | Directory | Description |
|-----|-----------|-------------|
| **Web Client** | `apps/web-client/` | Customer-facing menu ordering |
| **Chef** | `apps/chef/` | Kitchen dashboard & order management |
| **Waiter** | `apps/waiter/` | Floor service & table management |
| **Manager** | `apps/manager/` | Admin analytics & restaurant management |

## Layout

Every app follows the same structure:

```
apps/<app>/
├── app/                              # Next.js App Router routes
├── features/                         # Feature modules (auth, menu, orders, etc.)
│   └── <feature>/
│       ├── api/                      # queryKeys, services, mappers, queries, mutations
│       ├── components/               # Feature-scoped UI
│       ├── hooks/                    # Feature-scoped hooks
│       ├── types.ts                  # DTO + domain types
│       └── index.ts                  # Barrel export
├── shared/
│   ├── api/                          # fetch wrapper, JWT, error normalization
│   ├── lib/                          # env, query-client, query-provider
│   ├── ui/                           # shadcn/ui primitives
│   └── utils/                        # cn(), formatters
├── components.json
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Dev Commands

```bash
# Install one app
cd apps/<name> && npm install

# Dev server (default port 3000, use -p for custom)
cd apps/web-client && npm run dev      # http://localhost:3000
cd apps/chef     && npm run dev -p 3001
cd apps/waiter   && npm run dev -p 3002
cd apps/manager  && npm run dev -p 3003

# Build
cd apps/<name> && npm run build

# Lint
cd apps/<name> && npm run lint
```

## Architecture

See `docs/issues.md` for the full feature-based architecture and conventions.


Here's the full operational plan: **62 issues across 6 frontend apps**, each formatted exactly to your spec and copy-paste ready for GitHub.

Issue ID prefix convention:
- `MF-` = mayda-frontend repo-level
- `WC-` = web-client app
- `CH-` = chef app
- `WT-` = waiter app
- `MG-` = manager app
- `AD-` = mayda-admin repo
- `MB-` = mayda-mobile repo

# 📐 ARCHITECTURE FOUNDATION (read this first)

## Folder layout — feature-based per app

```
apps/<app>/
├── app/                              # Next.js / Expo routes (thin: render features, no logic)
├── features/
│   └── <feature>/                    # e.g. auth, menu, cart, orders, recommendations
│       ├── api/
│       │   ├── queryKeys.ts          # query-key factory (single source of truth)
│       │   ├── services.ts           # raw HTTP calls; returns API DTOs verbatim
│       │   ├── mappers.ts            # API DTO → domain model (snake→camel, parse, defaults)
│       │   ├── queries.ts            # useQuery hooks (READ)
│       │   └── mutations.ts          # useMutation hooks (CREATE/UPDATE/DELETE)
│       ├── components/               # feature-scoped UI
│       ├── hooks/                    # feature-scoped hooks (non-query)
│       ├── types.ts                  # Dto + Domain types co-located
│       └── index.ts                  # barrel — what other features can import
├── shared/
│   ├── api/
│   │   └── client.ts                 # fetch wrapper: JWT, base URL, error normalization
│   ├── lib/
│   │   ├── env.ts                    # process.env.NEXT_PUBLIC_API_URL
│   │   ├── query-client.ts           # QueryClient instance + defaults
│   │   └── query-provider.tsx        # <QueryClientProvider> wrapper
│   ├── ui/                           # shadcn primitives (Button, Card, etc.)
│   └── utils/                        # cn(), formatters, etc.
└── package.json
```

**Cross-feature rule:** features can import from `shared/`, NEVER from another feature directly. If feature A needs data from feature B, A re-queries via B's exposed hooks (re-exported through B's `index.ts`).

## The 5-file API contract (mandatory for every feature)

### `queryKeys.ts` — type-safe hierarchical factory
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

### `services.ts` — raw HTTP, no business logic
```ts
import { apiClient } from '@/shared/api/client';
import type { MenuItemDto, CreateMenuItemDto } from '../types';

export const menuService = {
  list: (restaurantId: string) =>
    apiClient<MenuItemDto[]>(`/restaurants/${restaurantId}/menus`),
  create: (payload: CreateMenuItemDto) =>
    apiClient<MenuItemDto>(`/menus`, { method: 'POST', body: JSON.stringify(payload) }),
};
```
**Rule:** services return EXACTLY what the API sends (snake_case, raw strings, etc.). Zero transformation.

### `mappers.ts` — DTO ↔ Domain
```ts
import type { MenuItemDto, MenuItem, CreateMenuItemInput, CreateMenuItemDto } from '../types';

// Inbound: API → app domain
export const toMenuItem = (dto: MenuItemDto): MenuItem => ({
  id: dto.id,
  name: dto.name,
  price: Number(dto.price_cents) / 100,
  imageUrl: dto.image_url ?? '/placeholder.png',
  dietary: dto.dietary_tags ?? [],
  isAvailable: dto.is_available,
});

// Outbound: app input → API DTO
export const toCreateMenuItemDto = (input: CreateMenuItemInput): CreateMenuItemDto => ({
  name: input.name,
  price_cents: Math.round(input.price * 100),
  dietary_tags: input.dietary,
});
```
**Rule:** the rest of the app NEVER sees a `*Dto` type — only `MenuItem`, `Order`, etc.

### `queries.ts` — useQuery hooks
```ts
import { useQuery } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toMenuItem } from './mappers';

export const useMenu = (restaurantId: string) =>
  useQuery({
    queryKey: menuKeys.list(restaurantId),
    queryFn: () => menuService.list(restaurantId),
    select: (dtos) => dtos.map(toMenuItem),  // mapping happens HERE
    staleTime: 60_000,
    enabled: Boolean(restaurantId),
  });
```
**Rule:** components consume `useMenu()` and get domain `MenuItem[]`. They never know a DTO existed.

### `mutations.ts` — useMutation hooks
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
```

## QueryClient defaults (set once, in `shared/lib/query-client.ts`)
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

## Next.js App Router setup (every Next app)
`shared/lib/query-provider.tsx` is a `"use client"` component wrapping `<QueryClientProvider>`. Imported in `app/layout.tsx`.

## Expo setup
Identical — same QueryClient instance, wrapped in `app/_layout.tsx`.

---

# 🗂️ REPO: `mayda-frontend` — Foundation Issues (REVISED)

### ISSUE MF-001: Bootstrap monorepo with feature-based skeleton

**Description**
Create the `mayda-frontend` repo containing four Next.js apps, each scaffolded with the **feature-based architecture** (`app/`, `features/`, `shared/` folders). The four apps reuse the same internal structure so devs can move between them with zero ramp-up.

**Goal**
Every app starts with empty `features/` and `shared/` folders following the documented conventions, ready for issue-by-issue feature additions.

**Targeted Files**
- `apps/{web-client,chef,waiter,manager}/` (4 sibling apps)
- `apps/<x>/features/` (empty, with `.gitkeep`)
- `apps/<x>/shared/{api,lib,ui,utils}/` (empty)
- `apps/<x>/app/` (existing routes, will be thinned out)
- Root `README.md`, `.gitignore`

**Tasks**
- [ ] Move each `frontend/<x>-application-frontend/` into `apps/<x>/`
- [ ] Inside each app, create `features/` and `shared/{api,lib,ui,utils}/`
- [ ] Move existing `components/ui/*` (shadcn primitives) into `shared/ui/`
- [ ] Move existing `lib/utils.ts` into `shared/utils/`
- [ ] Update import paths in existing components (`@/components/ui` → `@/shared/ui`)
- [ ] Rename `package.json` `"name"` to `"mayda-<app>"`
- [ ] Add root `README.md` documenting the layout + dev commands

**Acceptance Criteria**
- All 4 apps build (`npm run build`) after restructure
- `features/` folder exists and is empty in each app
- `shared/ui/` contains all shadcn primitives
- No app imports from another app

**References**
- Architecture Foundation (above) — folder layout section
- AUDIT.md (web/chef/waiter/manager)

**Blocked By**
- None

---

### ISSUE MF-002: CI matrix with path-filtered per-app builds

**Description**
Path-filter CI so a change in `apps/chef/**` only rebuilds chef. Same as previous spec — folder structure change (features/, shared/) doesn't affect this issue.

**Goal**
CI under 2 minutes for single-app changes.

**Targeted Files**
- `.github/workflows/ci.yml`

**Tasks**
- [ ] `dorny/paths-filter@v3` job detecting changes per `apps/<x>/**`
- [ ] Matrix job runs `npm ci && npm run lint && npm run build` per changed app
- [ ] Cache `~/.npm` per app

**Acceptance Criteria**
- Touching `apps/chef/features/orders/**` triggers ONLY the chef job
- All 4 apps run in parallel when all changed

**References**
- [dorny/paths-filter](https://github.com/dorny/paths-filter)

**Blocked By**
- MF-001

---

### ISSUE MF-003: Document feature-based + TanStack Query conventions

**Description**
Capture the feature-based architecture and TanStack Query 5-file API contract (queryKeys, services, mappers, queries, mutations) as the single source of truth. Every issue references this doc.

**Goal**
Any dev can create a new feature folder in <30 minutes following the doc.

**Targeted Files**
- `CONTRIBUTING.md`
- `docs/architecture/feature-based-structure.md`
- `docs/architecture/tanstack-query-pattern.md`
- `docs/architecture/example-feature/` (full working `menu` feature as a copy-paste template)

**Tasks**
- [ ] Document feature folder layout (`api/`, `components/`, `hooks/`, `types.ts`, `index.ts`)
- [ ] Document the 5 API files with code samples (queryKeys, services, mappers, queries, mutations)
- [ ] Document the cross-feature import rule (features → shared only; no feature → feature)
- [ ] Document QueryClient defaults + provider setup
- [ ] Provide `docs/architecture/example-feature/menu/` as a literal copy-paste template

**Acceptance Criteria**
- A dev unfamiliar with TanStack Query can scaffold a new feature using the doc alone
- The example feature compiles when dropped into any app's `features/` folder

**References**
- Architecture Foundation (above)
- [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview)

**Blocked By**
- None

---

### ISSUE MF-004: Install TanStack Query + scaffold shared QueryProvider per app

**Description**
Install `@tanstack/react-query` + devtools in every app, create the shared `QueryClient` instance and `<QueryProvider>` wrapper following the documented defaults, and wrap each app's root layout.

**Goal**
Every app has TanStack Query active and devtools available in development.

**Targeted Files**
- `apps/<x>/package.json` (add deps)
- `apps/<x>/shared/lib/query-client.ts` (new)
- `apps/<x>/shared/lib/query-provider.tsx` (new, `"use client"`)
- `apps/<x>/app/layout.tsx` (wrap with provider)

**Tasks**
- [ ] `npm i @tanstack/react-query @tanstack/react-query-devtools` in each app
- [ ] Create `shared/lib/query-client.ts` exporting `queryClient` with documented defaults (staleTime, gcTime, retry, refetchOnWindowFocus)
- [ ] Create `shared/lib/query-provider.tsx` — `"use client"` component wrapping `<QueryClientProvider>` + `<ReactQueryDevtools>` (dev only)
- [ ] Import and wrap in each app's `app/layout.tsx`

**Acceptance Criteria**
- React Query devtools panel visible in dev (bottom-left icon)
- Calling `useQuery({ queryKey: ['test'], queryFn: () => Promise.resolve(1) })` in any component works
- Production build excludes devtools

**References**
- Architecture Foundation → QueryClient defaults section
- MF-003

**Blocked By**
- MF-001

---

# 🍽️ APP: `apps/web-client`

### ISSUE WC-001: Scaffold `shared/api/client.ts` + `shared/lib/env.ts`

**Description**
Create the JWT-aware fetch wrapper used by **every feature's `services.ts`**, and the env-var module. This is the foundation that all TanStack Query services call into.

**Goal**
Every `service` function in every feature can call `apiClient<DTO>(path)` and get JWT/error handling for free.

**Targeted Files**
- `apps/web-client/shared/api/client.ts`
- `apps/web-client/shared/lib/env.ts`
- `apps/web-client/.env.example`

**Tasks**
- [ ] `env.ts` exports `API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001"`
- [ ] `client.ts` exports `apiClient<T>(path, init?)`: prepends `API_URL`, attaches `Authorization: Bearer <token>` from `localStorage.getItem("mayda_token")`, sets `Content-Type: application/json`, throws `ApiError` on non-2xx, JSON-parses 2xx
- [ ] Export `ApiError` class with `status`, `body`, `message`
- [ ] Document `.env.example` with `NEXT_PUBLIC_API_URL`

**Acceptance Criteria**
- `apiClient("/health")` against running backend returns parsed JSON
- Non-2xx throws `ApiError` with status code
- Missing env var falls back to localhost in dev

**References**
- Architecture Foundation → `services.ts` pattern
- MF-003

**Blocked By**
- MF-001, MF-004

---

### ISSUE WC-002: Build `features/auth` with login mutation + route protection

**Description**
Create the **`auth` feature** following the 5-file TanStack Query contract: `services.ts` (login/register HTTP), `mappers.ts` (DTO→User), `mutations.ts` (`useLogin`, `useRegister`, `useLogout` via `useMutation`), `queries.ts` (`useCurrentUser` via `useQuery`), `queryKeys.ts`. Add `/login` route and middleware.

**Goal**
Auth fully encapsulated in `features/auth`; all other features consume `useCurrentUser()` and `useLogin()` hooks from its barrel.

**Targeted Files**
- `apps/web-client/features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/web-client/features/auth/components/login-form.tsx`
- `apps/web-client/features/auth/components/auth-guard.tsx`
- `apps/web-client/features/auth/types.ts`
- `apps/web-client/features/auth/index.ts` (barrel)
- `apps/web-client/app/login/page.tsx`, `app/signup/page.tsx`
- `apps/web-client/middleware.ts`

**Tasks**
- [ ] `types.ts`: `UserDto`, `User`, `LoginInput`, `LoginResponseDto`
- [ ] `queryKeys.ts`: `authKeys = { all, currentUser }`
- [ ] `services.ts`: `authService.login(payload)`, `register(payload)`, `me()`
- [ ] `mappers.ts`: `toUser(dto)`, `toLoginPayloadDto(input)`
- [ ] `queries.ts`: `useCurrentUser()` (`useQuery` calling `me()`, mapped via `toUser`)
- [ ] `mutations.ts`: `useLogin()` (stores JWT, invalidates `authKeys.currentUser`), `useRegister()`, `useLogout()` (clears JWT, clears `queryClient`)
- [ ] `login-form.tsx` uses `useLogin()` mutation
- [ ] `auth-guard.tsx` reads `useCurrentUser()`, redirects if null
- [ ] `middleware.ts` checks cookie, redirects to `/login?next=...`
- [ ] `index.ts` re-exports `useCurrentUser`, `useLogin`, `useLogout`, `LoginForm`, `AuthGuard`

**Acceptance Criteria**
- `useLogin()` returns `{ mutate, isPending, error }` from TanStack Query
- After login, `useCurrentUser()` returns `User` object across the app
- Logout clears query cache (no stale user data leaks)
- Invalid creds show form error from `mutation.error`

**References**
- Backend: `POST /auth/login`, `POST /auth/register`, `GET /auth/me` ([auth.py](API_Orchestration/app/routes/auth.py))
- Architecture Foundation → mutations.ts pattern

**Blocked By**
- WC-001

---

### ISSUE WC-003: Create `features/menu` skeleton + extract inline mock to mappers test fixtures

**Description**
Stand up the **`menu` feature** with the 5-file API contract. Until WC-004 wires the live endpoint, the `services.ts` returns the existing mock data so the page keeps rendering. This proves the seam without breaking the UI.

**Goal**
`features/menu` exists with all 5 API files and a working `useMenu()` hook returning domain `MenuItem[]` from mock.

**Targeted Files**
- `apps/web-client/features/menu/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/web-client/features/menu/types.ts`
- `apps/web-client/features/menu/components/{menu-grid,menu-card,dish-detail-modal}.tsx`
- `apps/web-client/features/menu/__fixtures__/menu-mock.ts` (extracted from existing page)
- `apps/web-client/features/menu/index.ts`
- `apps/web-client/app/menu/page.tsx` (now a thin route)

**Tasks**
- [ ] `types.ts`: `MenuItemDto` (mirrors backend) + `MenuItem` (domain)
- [ ] `__fixtures__/menu-mock.ts`: move the 13-item array from current page here, typed as `MenuItemDto[]`
- [ ] `queryKeys.ts`: `menuKeys = { all, lists, list(restaurantId), details, detail(id) }`
- [ ] `services.ts`: `menuService.list(restaurantId)` — **temporary** returns `Promise.resolve(menuMock)`
- [ ] `mappers.ts`: `toMenuItem(dto)`, `toMenuItems(dtos)`
- [ ] `queries.ts`: `useMenu(restaurantId)` calling `useQuery` with `select: (dtos) => dtos.map(toMenuItem)`
- [ ] `mutations.ts`: empty (no mutations from web-client on menu)
- [ ] Move `dish-detail-modal.tsx` from `components/` into the feature
- [ ] Thin out `app/menu/page.tsx` to `<MenuGrid />` only

**Acceptance Criteria**
- Menu page renders identical UI
- `useMenu()` returns domain `MenuItem[]` (camelCase, parsed numbers)
- Devtools shows query under key `['menu', 'list', restaurantId]`
- Zero inline mock data remains in `app/menu/page.tsx`

**References**
- Architecture Foundation → mappers.ts + queries.ts patterns
- Current: [menu/page.tsx:32](frontend/onsite-client-application-frontend/app/menu/page.tsx)

**Blocked By**
- WC-001, WC-004 *(MF-004 must run; WC-001 must run; WC-002 not strictly required)*

---

### ISSUE WC-004: Swap `features/menu/api/services.ts` to live backend

**Description**
Replace the mock-returning `menuService.list()` with a real call via `apiClient`. Because the mapper layer is already in place, the page consumers don't change at all.

**Goal**
Customer sees menu loaded from backend; the mock fixture is now only used in tests.

**Targeted Files**
- `apps/web-client/features/menu/api/services.ts`
- `apps/web-client/features/menu/__fixtures__/menu-mock.ts` (kept, demoted to test-only)
- `apps/web-client/app/menu/loading.tsx`
- `apps/web-client/app/menu/error.tsx`

**Tasks**
- [ ] In `services.ts`, replace mock return with `apiClient<MenuItemDto[]>(\`/restaurants/${restaurantId}/menus\`)`
- [ ] Tune `useMenu` `staleTime` to 60s
- [ ] `loading.tsx` shows skeleton cards
- [ ] `error.tsx` shows retry button calling `reset()`
- [ ] Add comment in `menu-mock.ts` marking it test-only

**Acceptance Criteria**
- Menu renders from backend when authenticated
- Devtools shows `pending → success` transition
- Network failure shows error UI with retry
- Mock fixture importable only from `__fixtures__/`

**References**
- Backend: `GET /restaurants/{id}/menus` ([menus.py](API_Orchestration/app/routes/menus.py))

**Blocked By**
- WC-001, WC-002, WC-003

---

### ISSUE WC-005: Create `features/cart` with localStorage-persisted store

**Description**
Cart isn't a server resource — it's local. Build the **`cart` feature** but instead of the 5 API files, it exposes a Zustand store (lightest option) persisted to localStorage. Keeps consistent feature-folder shape; just no `api/` subfolder since there's no backend resource until checkout (which lives in `features/orders`).

**Goal**
Cart state encapsulated in `features/cart`; survives refresh; consumed by `useCart()` hook.

**Targeted Files**
- `apps/web-client/features/cart/store.ts`
- `apps/web-client/features/cart/hooks/use-cart.ts`
- `apps/web-client/features/cart/components/cart-sidebar.tsx`
- `apps/web-client/features/cart/types.ts`
- `apps/web-client/features/cart/index.ts`

**Tasks**
- [ ] `npm i zustand`
- [ ] `store.ts`: Zustand store with persist middleware (key `mayda_cart`) — actions `add`, `remove`, `updateQuantity`, `clear`, `toggle`, `open`, `close`
- [ ] `use-cart.ts`: selector hook (`useCart(state => state.items)` etc.)
- [ ] Migrate current `cart-context.tsx` logic into the store (the reducer is the same shape)
- [ ] Move `cart-sidebar.tsx` into feature
- [ ] Delete `components/cart-context.tsx`

**Acceptance Criteria**
- Add item → refresh → cart still present
- Logout clears `mayda_cart` from localStorage
- Zero `useReducer` for cart remains; consumers use `useCart()` selectors

**References**
- AUDIT.md → "Cart has zero persistence"
- Current: [cart-context.tsx:84](frontend/onsite-client-application-frontend/components/cart-context.tsx)
- [Zustand persist docs](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)

**Blocked By**
- WC-001

---

### ISSUE WC-006: Create `features/orders` with `useCreateOrder` mutation + checkout flow

**Description**
Build the **`orders` feature** following the full 5-file contract. `useCreateOrder` is a `useMutation` that, on success, clears the cart store and invalidates `ordersKeys.all`. The checkout button in `features/cart` calls this mutation.

**Goal**
End-to-end checkout: cart → order created in backend → cleared cart → redirect to `/orders`.

**Targeted Files**
- `apps/web-client/features/orders/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/web-client/features/orders/types.ts`
- `apps/web-client/features/orders/components/{order-list,order-card,order-confirmation}.tsx`
- `apps/web-client/features/orders/index.ts`
- `apps/web-client/app/orders/page.tsx` (thin)
- `apps/web-client/features/cart/components/cart-sidebar.tsx` (calls mutation)

**Tasks**
- [ ] `types.ts`: `OrderDto`, `Order`, `CreateOrderInput`, `CreateOrderDto`
- [ ] `queryKeys.ts`: `ordersKeys = { all, lists, list(filter), details, detail(id), mine }`
- [ ] `services.ts`: `orderService.list()`, `create(payload)`, `detail(id)`
- [ ] `mappers.ts`: `toOrder(dto)`, `toCreateOrderDto(input, cartItems)`
- [ ] `queries.ts`: `useMyOrders()` calling `list({ userId: 'me' })`, mapped to `Order[]`
- [ ] `mutations.ts`: `useCreateOrder()` — invalidates `ordersKeys.lists()` + calls `useCart.clear()` in `onSuccess`
- [ ] Cart sidebar's checkout button calls `useCreateOrder().mutate(...)`
- [ ] On success → router.push(`/orders`)
- [ ] `/orders` page uses `useMyOrders()`

**Acceptance Criteria**
- Checkout creates order, clears cart, redirects
- `/orders` page reflects new order without manual refetch (invalidation works)
- 422 backend errors render inline in cart sidebar
- Devtools shows mutation under correct key + auto-invalidation

**References**
- Backend: `POST /orders`, `GET /orders` ([orders.py](API_Orchestration/app/routes/orders.py))
- Architecture Foundation → mutations.ts pattern (invalidation)

**Blocked By**
- WC-002, WC-004, WC-005

---

### ISSUE WC-007: Create `features/recommendations` calling `/ai/recommend`

**Description**
Build the **`recommendations` feature** to replace the fake date-based logic. `useRecommendations()` is a `useQuery` calling the Gateway's AI proxy. Query key includes cart contents so it auto-refetches when cart changes.

**Goal**
Real AI-powered recommendations replace the `new Date().getHours()` fake logic.

**Targeted Files**
- `apps/web-client/features/recommendations/api/{queryKeys,services,mappers,queries}.ts`
- `apps/web-client/features/recommendations/types.ts`
- `apps/web-client/features/recommendations/components/recommendation-strip.tsx`
- `apps/web-client/features/recommendations/index.ts`

**Tasks**
- [ ] `types.ts`: `RecommendationDto`, `Recommendation`
- [ ] `queryKeys.ts`: `recsKeys = { all, byContext(userId, cartItemIds, timeOfDay) }`
- [ ] `services.ts`: `recsService.fetch({ userId, cartItemIds, timeOfDay })` → `POST /ai/recommend`
- [ ] `mappers.ts`: `toRecommendation(dto)` — merges with menu items (or just returns IDs + rationale)
- [ ] `queries.ts`: `useRecommendations(ctx)` with `staleTime: 5 * 60_000`, debounced via key composition
- [ ] `recommendation-strip.tsx` consumes hook with skeleton state
- [ ] Delete `components/smart-recommendations.tsx`
- [ ] Add fallback to `useMenu().popular` when query fails

**Acceptance Criteria**
- One query per `(userId, cartItemIds)` combination — verified in devtools
- Cart change → key changes → automatic refetch
- AI service down → fallback strip renders without crash
- No `Date().getHours()` logic in the feature

**References**
- Current (to delete): [smart-recommendations.tsx:44](frontend/onsite-client-application-frontend/components/smart-recommendations.tsx)
- Backend: `POST /ai/recommend` (in `mayda-backend`)

**Blocked By**
- WC-004, mayda-backend `/ai/recommend` route exists

---

### ISSUE WC-008: Create `features/filters` consuming `useMenu()`

**Description**
Filters are derived state over the menu — no separate query. Build the **`filters` feature** that exposes filter state via URL search params and uses `useMenu()` from `features/menu` (cross-feature import via barrel is allowed).

**Goal**
Filter chips drive `useSearchParams`; menu list reactively filters from cached `MenuItem[]`.

**Targeted Files**
- `apps/web-client/features/filters/hooks/use-menu-filters.ts`
- `apps/web-client/features/filters/components/filter-bar.tsx`
- `apps/web-client/features/filters/index.ts`
- `apps/web-client/app/filters/page.tsx` (thin)

**Tasks**
- [ ] `use-menu-filters.ts` reads `useSearchParams`, returns filtered subset of `useMenu()` data
- [ ] No new query — leverages the cached `menuKeys.list(...)` query
- [ ] `filter-bar.tsx` writes back via `useRouter().push(?dietary=...)`
- [ ] Menu page also consumes `use-menu-filters` for URL-driven filtering

**Acceptance Criteria**
- Filter toggling updates URL
- Menu re-renders from cached data (no new network request — verify in devtools)
- Shareable URL `/menu?dietary=vegan` works

**References**
- Architecture Foundation → cross-feature imports rule

**Blocked By**
- WC-004

---

### ISSUE WC-009: Add per-route loading + error boundaries

**Description**
Add `loading.tsx` and `error.tsx` in every route so TanStack Query's pending/error states surface in the UI shell (in addition to per-component states).

**Goal**
No blank screens, no Next.js default error overlay reaches users.

**Targeted Files**
- `apps/web-client/app/{cart,orders,filters,login}/loading.tsx`
- `apps/web-client/app/{cart,orders,filters,login}/error.tsx`
- `apps/web-client/app/global-error.tsx`

**Tasks**
- [ ] Skeleton per route
- [ ] `error.tsx` reads `error: Error & { digest? }` props, shows retry button calling `reset()`
- [ ] Global error fallback

**Acceptance Criteria**
- Slow network → skeleton, not blank
- Throwing inside any feature renders the route's `error.tsx`

**References**
- [Next.js error handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

**Blocked By**
- WC-002

---

### ISSUE WC-010: Deploy web-client to Vercel

**Description**
Vercel project with `apps/web-client` root; env wired.

**Goal**
`mayda.app` serves the live web-client.

**Targeted Files**
- (Vercel dashboard)

**Tasks**
- [ ] Vercel project, root `apps/web-client`
- [ ] `NEXT_PUBLIC_API_URL=https://api.mayda.app`
- [ ] Map `mayda.app`, `www.mayda.app`

**Acceptance Criteria**
- Domain live; login + browse + checkout work end-to-end

**References**
- [Vercel monorepo docs](https://vercel.com/docs/monorepos)

**Blocked By**
- WC-002 through WC-009

---

# 👨‍🍳 APP: `apps/chef`

### ISSUE CH-001: Scaffold `shared/api/client.ts` + `shared/lib/env.ts`

**Description**
Mirror WC-001 for the chef app. JWT-aware `apiClient` consumed by all `features/<x>/api/services.ts`.

**Goal**
Foundation for chef features.

**Targeted Files**
- `apps/chef/shared/api/client.ts`
- `apps/chef/shared/lib/env.ts`
- `apps/chef/.env.example`

**Tasks**
- [ ] Mirror WC-001 file structure

**Acceptance Criteria**
- Same as WC-001

**References**
- WC-001, Architecture Foundation

**Blocked By**
- MF-001, MF-004

---

### ISSUE CH-002: Build `features/auth` with CHEF role gate

**Description**
Same TanStack Query auth feature as web-client but the `useLogin()` mutation's `onSuccess` rejects non-CHEF users.

**Goal**
Only CHEF role users reach the dashboard.

**Targeted Files**
- `apps/chef/features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/chef/features/auth/components/{login-form,auth-guard}.tsx`
- `apps/chef/features/auth/types.ts`, `index.ts`
- `apps/chef/app/login/page.tsx`
- `apps/chef/middleware.ts`

**Tasks**
- [ ] Mirror WC-002
- [ ] `useLogin()` `onSuccess`: if `user.role !== "CHEF"`, throw, don't store token
- [ ] Login form surfaces "Not authorized — chef role required" error

**Acceptance Criteria**
- Waiter creds cannot log into chef app
- Devtools shows mutation error state for wrong role

**References**
- WC-002, Backend: `POST /auth/login`

**Blocked By**
- CH-001

---

### ISSUE CH-003: Create `features/orders` skeleton + extract `mockOrders` to fixtures

**Description**
Build `features/orders` for chef with the 5-file contract. Initial `orderService.kitchenQueue()` returns the existing 58-line `mockOrders` array as a `Promise.resolve` (extracted into `__fixtures__/`). Page consumers swap from inline import to `useKitchenQueue()` hook.

**Goal**
Feature seam in place before live wiring.

**Targeted Files**
- `apps/chef/features/orders/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/chef/features/orders/types.ts`
- `apps/chef/features/orders/__fixtures__/orders-mock.ts`
- `apps/chef/features/orders/components/{order-board,order-card,order-timeline}.tsx`
- `apps/chef/features/orders/index.ts`
- `apps/chef/app/page.tsx` (thin)

**Tasks**
- [ ] `types.ts`: `OrderDto`, `Order`, `OrderStatus`, `UpdateOrderStatusInput`
- [ ] `__fixtures__/orders-mock.ts`: extract `mockOrders` from current page
- [ ] `queryKeys.ts`: `orderKeys = { all, kitchenQueue(restaurantId), detail(id) }`
- [ ] `services.ts`: `kitchenQueue()` returns mock for now
- [ ] `mappers.ts`: `toOrder(dto)`
- [ ] `queries.ts`: `useKitchenQueue()` with `select: dtos => dtos.map(toOrder)`
- [ ] `mutations.ts`: empty for now (CH-005 adds status updates)
- [ ] Migrate `order-card.tsx`, `order-timeline.tsx` from `components/` into feature
- [ ] `app/page.tsx` becomes a thin `<OrderBoard />` route

**Acceptance Criteria**
- Dashboard renders unchanged
- `useKitchenQueue()` returns domain `Order[]`
- No `mockOrders` inline in page file
- Devtools query key visible

**References**
- AUDIT.md → "Inline mock arrays"
- Current: [chef/app/page.tsx:16](frontend/chef-application-frontend/app/page.tsx)

**Blocked By**
- CH-001

---

### ISSUE CH-004: Swap `kitchenQueue` service to live + add `useKitchenQueue` polling

**Description**
Replace mock with real `GET /orders?status=pending,in-progress`. Use TanStack Query's `refetchInterval: 5000` to poll. Pause polling when tab hidden via `refetchIntervalInBackground: false`.

**Goal**
Chef sees live kitchen queue updating every 5s automatically.

**Targeted Files**
- `apps/chef/features/orders/api/services.ts`
- `apps/chef/features/orders/api/queries.ts`

**Tasks**
- [ ] `services.ts`: real `apiClient` call
- [ ] `queries.ts`: `useKitchenQueue()` with `refetchInterval: 5000, refetchIntervalInBackground: false`
- [ ] Detect new orders by comparing previous data → trigger `useKitchenNotifications.notifyNewOrder()`
- [ ] Stale data indicator from `dataUpdatedAt`

**Acceptance Criteria**
- Web-client placing an order → appears in chef within 5s
- Tab backgrounded → polling pauses (verify in devtools network panel)
- No UI flicker on each poll (TanStack handles)

**References**
- Backend: `GET /orders` ([orders.py](API_Orchestration/app/routes/orders.py))
- [TanStack Query polling docs](https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching)

**Blocked By**
- CH-002, CH-003

---

### ISSUE CH-005: Add order status mutations + wire `order/[id]` page

**Description**
Add `useUpdateOrderStatus` mutation that calls `PATCH /orders/{id}` and invalidates the kitchen queue. Add `useOrder(id)` query for the detail page.

**Goal**
Chef can start/ready an order from card OR detail view; both views update instantly.

**Targeted Files**
- `apps/chef/features/orders/api/queries.ts` (`useOrder`)
- `apps/chef/features/orders/api/mutations.ts` (`useUpdateOrderStatus`)
- `apps/chef/features/orders/api/services.ts` (add `detail`, `updateStatus`)
- `apps/chef/features/orders/components/order-card.tsx` (use mutation)
- `apps/chef/app/order/[id]/page.tsx` (thin)

**Tasks**
- [ ] `services.ts`: `detail(id)`, `updateStatus({ id, status })`
- [ ] `mappers.ts`: `toUpdateStatusDto(input)`
- [ ] `queries.ts`: `useOrder(id)` with `enabled: !!id`
- [ ] `mutations.ts`: `useUpdateOrderStatus()` — `onSuccess` invalidates `orderKeys.all` (kitchen queue + detail)
- [ ] Optionally use optimistic update: `onMutate` sets new status immediately in cache
- [ ] Order card buttons call `mutate({ id, status: 'in-progress' })`
- [ ] Detail page renders from `useOrder(id)`

**Acceptance Criteria**
- "Start" button updates status server-side + UI instantly
- Direct URL `/order/123` loads (no navigation needed)
- Optimistic update reverts on failure

**References**
- Backend: `GET /orders/{id}`, `PATCH /orders/{id}`
- [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

**Blocked By**
- CH-004

---

### ISSUE CH-006: Create `features/inventory` consuming `/ingredients` + `/ai/inventory/forecast`

**Description**
Build `features/inventory` with two services: one for current stock (`/ingredients`), one for AI forecast (`/ai/inventory/forecast`). `useStock()` and `useStockForecast(item)` queries; the page combines both.

**Goal**
Chef sees stock + AI prediction side by side.

**Targeted Files**
- `apps/chef/features/inventory/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/chef/features/inventory/types.ts`
- `apps/chef/features/inventory/components/{stock-table,stock-alert}.tsx`
- `apps/chef/features/inventory/index.ts`
- `apps/chef/app/stock/page.tsx` (thin)

**Tasks**
- [ ] `types.ts`: `IngredientDto`, `Ingredient`, `ForecastDto`, `Forecast`
- [ ] `queryKeys.ts`: `inventoryKeys = { all, stock(restaurantId), forecast(item, date) }`
- [ ] `services.ts`: `inventoryService.stock(restaurantId)`, `forecast({ item, date })`
- [ ] `mappers.ts`: `toIngredient(dto)`, `toForecast(dto)`
- [ ] `queries.ts`: `useStock(restaurantId)`, `useStockForecast({ item, date })`
- [ ] Migrate `stock-alert.tsx` from `components/` into feature

**Acceptance Criteria**
- Stock + forecast both render
- AI service down → forecast column hidden, stock unaffected
- Devtools shows distinct query keys per item/date

**References**
- Backend: `GET /ingredients`, `POST /ai/inventory/forecast`

**Blocked By**
- CH-004, mayda-backend `/ai/inventory` proxy exists

---

### ISSUE CH-007: Create `features/analytics` for kitchen metrics

**Description**
Build `features/analytics` with `useKitchenAnalytics(range)` query. Range picker triggers refetch via query key change.

**Goal**
Real kitchen KPIs replace mock charts.

**Targeted Files**
- `apps/chef/features/analytics/api/{queryKeys,services,mappers,queries}.ts`
- `apps/chef/features/analytics/types.ts`
- `apps/chef/features/analytics/components/{kpi-cards,prep-time-chart}.tsx`
- `apps/chef/app/analytics/page.tsx` (thin)

**Tasks**
- [ ] `queryKeys.ts`: `analyticsKeys = { all, kitchen(range) }`
- [ ] `services.ts`: `analyticsService.kitchen(range)`
- [ ] `mappers.ts`: `toKitchenAnalytics(dto)`
- [ ] `queries.ts`: `useKitchenAnalytics(range)`
- [ ] Range selector updates state → query key → refetch

**Acceptance Criteria**
- KPIs populate from API
- Range switch refetches (verify in devtools)

**References**
- Backend: new `GET /analytics/kitchen?range=…`

**Blocked By**
- CH-002, backend endpoint exists

---

### ISSUE CH-008: (Optional) Add `features/voice` — pipe recording to `/ai/voice/transcribe`

**Description**
Optional feature wrapping `MediaRecorder` + a `useTranscribe()` mutation calling the Whisper service. The existing Web Speech command-matching keeps working as fallback.

**Goal**
Higher-accuracy transcription via backend Whisper, with Web Speech fallback.

**Targeted Files**
- `apps/chef/features/voice/api/{queryKeys,services,mappers,mutations}.ts`
- `apps/chef/features/voice/hooks/use-voice-recording.ts`
- `apps/chef/features/voice/types.ts`
- Move `hooks/use-voice-commands.ts` → `features/voice/hooks/`

**Tasks**
- [ ] `services.ts`: `voiceService.transcribe(audioBlob)` — multipart POST
- [ ] `mappers.ts`: `toTranscript(dto)`
- [ ] `mutations.ts`: `useTranscribe()` mutation
- [ ] `use-voice-recording.ts` exposes `start/stop` returning blob
- [ ] Compare Web Speech vs backend transcript; prefer backend if available

**Acceptance Criteria**
- Voice commands work without backend (Web Speech fallback)
- Backend reachable → accuracy improves
- No regression in latency above 1.5s

**References**
- Current: [use-voice-commands.ts](frontend/chef-application-frontend/hooks/use-voice-commands.ts)
- Backend: `POST /ai/voice/transcribe`

**Blocked By**
- CH-001, mayda-ai/voice FastAPI shim exists

---

### ISSUE CH-009: Deploy chef app

**Description**
Vercel deploy at `chef.mayda.app`.

**Goal**
Production URL live.

**Targeted Files**
- (Vercel dashboard)

**Tasks**
- [ ] Vercel project, root `apps/chef`
- [ ] `NEXT_PUBLIC_API_URL=https://api.mayda.app`
- [ ] Domain `chef.mayda.app`

**Acceptance Criteria**
- Live URL; chef workflow works

**References**
- WC-010

**Blocked By**
- CH-002 through CH-007

---

# 🧑‍💼 APP: `apps/waiter`

### ISSUE WT-001: Scaffold `shared/api/client.ts` + `shared/lib/env.ts`

**Description**
Mirror WC-001 for the waiter app.

**Goal**
Foundation.

**Targeted Files**
- `apps/waiter/shared/{api/client,lib/env}.ts`
- `apps/waiter/.env.example`

**Tasks**
- [ ] Mirror WC-001

**Acceptance Criteria**
- Same as WC-001

**References**
- WC-001

**Blocked By**
- MF-001, MF-004

---

### ISSUE WT-002: Build `features/auth` with WAITER role gate

**Description**
Mirror CH-002 with `role === "WAITER"` check in `useLogin()` mutation success.

**Goal**
Only waiters access app.

**Targeted Files**
- `apps/waiter/features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/waiter/features/auth/components/{login-form,auth-guard}.tsx`
- `apps/waiter/app/login/page.tsx`, `middleware.ts`

**Tasks**
- [ ] Mirror CH-002 with WAITER role

**Acceptance Criteria**
- Chef/manager creds rejected

**References**
- CH-002

**Blocked By**
- WT-001

---

### ISSUE WT-003: Create `features/tables` skeleton + refactor `mockTables` out of view component

**Description**
Fix the audit-flagged anti-pattern (`mockTables` exported from `table-overview.tsx`) by relocating it to `features/tables/__fixtures__/tables-mock.ts` and standing up the 5-file API contract returning the mock for now.

**Goal**
Feature seam in place; anti-pattern eliminated.

**Targeted Files**
- `apps/waiter/features/tables/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/waiter/features/tables/__fixtures__/tables-mock.ts`
- `apps/waiter/features/tables/components/{table-grid,table-status-bar,table-card}.tsx`
- `apps/waiter/features/tables/types.ts`, `index.ts`
- `apps/waiter/app/page.tsx` (thin, uses `<TableGrid />`)

**Tasks**
- [ ] Extract `mockTables` from `components/table-overview.tsx` to `__fixtures__/tables-mock.ts`
- [ ] `queryKeys.ts`: `tableKeys = { all, list(restaurantId), detail(id) }`
- [ ] `services.ts`: `tableService.list()` returns mock for now; `detail(id)`, `updateStatus({ id, status })`
- [ ] `mappers.ts`: `toTable(dto)`
- [ ] `queries.ts`: `useTables(restaurantId)`
- [ ] `mutations.ts`: empty (WT-004 adds status updates)
- [ ] Move `table-overview.tsx`, `table-status-bar.tsx` into feature
- [ ] Update `app/page.tsx` import — no more `mockTables` from a view file

**Acceptance Criteria**
- `grep -rn "mockTables" apps/waiter/features/tables/components` returns no hits
- App renders identically
- `useTables()` returns domain `Table[]`

**References**
- AUDIT.md → "Data exported from a view component"
- Current: [waiter/app/page.tsx:5](frontend/waiter-application-frontend/app/page.tsx)

**Blocked By**
- WT-001

---

### ISSUE WT-004: Wire `tableService.list` to live + add polling + status mutation

**Description**
Real `GET /tables` with 10s polling; `useUpdateTableStatus` mutation invalidating the list query.

**Goal**
Live table grid; status changes from any waiter visible within 10s.

**Targeted Files**
- `apps/waiter/features/tables/api/services.ts`
- `apps/waiter/features/tables/api/queries.ts`
- `apps/waiter/features/tables/api/mutations.ts`

**Tasks**
- [ ] `services.ts`: real `apiClient`
- [ ] `queries.ts`: `useTables()` with `refetchInterval: 10000`
- [ ] `mutations.ts`: `useUpdateTableStatus()` with `onSuccess` invalidating `tableKeys.all`
- [ ] Optimistic update for snappier UX

**Acceptance Criteria**
- Status mutation reflects instantly via optimistic update
- Reverts on failure
- All waiter sessions sync within 10s

**References**
- Backend: `GET /tables`, `PATCH /tables/{id}` ([tables.py](API_Orchestration/app/routes/tables.py))

**Blocked By**
- WT-002, WT-003

---

### ISSUE WT-005: Add `features/tables/components/qr-scanner` + checkin mutation

**Description**
Add `useCheckinTable()` mutation to the tables feature; QR scanner component scans, validates, calls mutation, navigates to detail.

**Goal**
QR scan → instant table opening.

**Targeted Files**
- `apps/waiter/features/tables/components/qr-scanner.tsx`
- `apps/waiter/features/tables/api/services.ts` (add `checkin`)
- `apps/waiter/features/tables/api/mutations.ts` (add `useCheckinTable`)
- `apps/waiter/app/scanner/page.tsx` (thin)

**Tasks**
- [ ] Validate scanned payload (`mayda://table/<uuid>`)
- [ ] `services.ts`: `checkin(tableId)`
- [ ] `mutations.ts`: `useCheckinTable()` — `onSuccess` routes to `/table/[id]`
- [ ] Invalid QR shows toast

**Acceptance Criteria**
- Valid QR → checkin → navigation
- Invalid QR → toast, no navigation

**References**
- Backend: `POST /tables/{id}/checkin`

**Blocked By**
- WT-004, backend endpoint exists

---

### ISSUE WT-006: Create `features/orders` for waiter scope

**Description**
Waiter's order feature with `useMyOrders()` (filtered by waiterId) and `useMarkDelivered()` mutation.

**Goal**
Waiter sees + manages own queue.

**Targeted Files**
- `apps/waiter/features/orders/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/waiter/features/orders/components/orders-board.tsx`
- `apps/waiter/app/orders/page.tsx` (thin)

**Tasks**
- [ ] `queryKeys.ts`: `orderKeys = { all, mine }`
- [ ] `services.ts`: `list({ waiterId: 'me' })`, `markDelivered(id)`
- [ ] `mappers.ts`: `toOrder(dto)`
- [ ] `queries.ts`: `useMyOrders()` with polling
- [ ] `mutations.ts`: `useMarkDelivered()` invalidates `orderKeys.mine`

**Acceptance Criteria**
- Only this waiter's orders visible
- Mark-delivered persists + refetches

**References**
- Backend: `GET /orders?waiterId=me`, `PATCH /orders/{id}`

**Blocked By**
- WT-002

---

### ISSUE WT-007: Build `features/table-session` for table detail page

**Description**
The `/table/[id]` page composes data from `features/tables`, `features/orders`, `features/menu` (read-only). `features/table-session` orchestrates them and adds "add item" mutation.

**Goal**
Full table-side workflow.

**Targeted Files**
- `apps/waiter/features/table-session/components/table-session-view.tsx`
- `apps/waiter/features/table-session/hooks/use-table-session.ts`
- `apps/waiter/app/table/[id]/page.tsx` (thin)

**Tasks**
- [ ] `use-table-session(tableId)` calls `useTable(tableId)` + `useTableOrders(tableId)`
- [ ] "Add item" launches menu picker → reuses `useCreateOrder()` from `features/orders`
- [ ] "Request bill" → `useUpdateTableStatus({ status: 'awaiting-payment' })`

**Acceptance Criteria**
- Adding item persists + refetches table orders
- Bill request changes table status

**References**
- Architecture Foundation → cross-feature imports rule

**Blocked By**
- WT-004, WT-006

---

### ISSUE WT-008: Profile feature + deploy

**Description**
`features/profile` with `useUpdatePassword()` mutation; Vercel deploy.

**Goal**
Personal account management + prod URL.

**Targeted Files**
- `apps/waiter/features/profile/api/{services,mappers,mutations}.ts`
- `apps/waiter/features/profile/components/profile-settings.tsx`
- `apps/waiter/app/profile/page.tsx` (thin)

**Tasks**
- [ ] `mutations.ts`: `useUpdatePassword()` calling `PATCH /auth/me/password`
- [ ] Form via shadcn `Form` + `zod` + `react-hook-form`
- [ ] Vercel deploy, domain `waiter.mayda.app`

**Acceptance Criteria**
- Password change works
- Domain live

**References**
- Backend: `PATCH /auth/me/password`

**Blocked By**
- WT-002 through WT-007

---

# 📊 APP: `apps/manager`

### ISSUE MG-001: Scaffold `shared/api/client.ts` + `shared/lib/env.ts`

**Description**
Mirror WC-001 for manager app.

**Goal**
Foundation.

**Targeted Files**
- `apps/manager/shared/{api/client,lib/env}.ts`
- `apps/manager/.env.example`

**Tasks**
- [ ] Mirror WC-001

**Acceptance Criteria**
- Same as WC-001

**References**
- WC-001

**Blocked By**
- MF-001, MF-004

---

### ISSUE MG-002: Build `features/auth` with MANAGER role gate

**Description**
Mirror CH-002 with `role === "MANAGER"`.

**Goal**
Only managers access app.

**Targeted Files**
- `apps/manager/features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/auth/components/{login-form,auth-guard}.tsx`
- `apps/manager/app/login/page.tsx`, `middleware.ts`

**Tasks**
- [ ] Mirror CH-002 with MANAGER role

**Acceptance Criteria**
- Non-manager rejected

**References**
- CH-002

**Blocked By**
- MG-001

---

### ISSUE MG-003: Refactor single-page tabs into 6 routes (one per feature)

**Description**
Manager currently has 6 features rendered as tabs in one route. Each becomes its own feature folder + route. This is the prep for TanStack Query wiring per feature.

**Goal**
Six independent routes, each backed by its own feature.

**Targeted Files**
- `apps/manager/app/{analytics,employees,menu,reservations,stock,notifications}/page.tsx` (new)
- `apps/manager/app/page.tsx` (becomes dashboard home)
- `apps/manager/shared/ui/sidebar.tsx` (uses `next/link`)
- `apps/manager/features/{analytics,employees,menu,reservations,stock,notifications}/` (empty feature folders)

**Tasks**
- [ ] Create 6 feature folders (empty `api/`, `components/`, `types.ts`, `index.ts`)
- [ ] Create 6 route folders
- [ ] Move respective UI component into each feature's `components/`
- [ ] Replace tab state with `usePathname()` + `next/link` in sidebar

**Acceptance Criteria**
- Each route bookmarkable
- Refresh stays on same page
- All 6 features exist as empty folders ready for wiring

**References**
- AUDIT.md → "Manager folds 6 features into 1 route"
- Architecture Foundation → folder structure

**Blocked By**
- MG-002

---

### ISSUE MG-004: Split `analytics-dashboard.tsx` into feature subcomponents

**Description**
Decompose the 593-line monolith into `features/analytics/components/{kpi-cards,revenue-chart,top-dishes,hourly-heatmap}.tsx` so each can own its TanStack Query in MG-005.

**Goal**
No component over 200 lines; each owns one query later.

**Targeted Files**
- `apps/manager/features/analytics/components/{kpi-cards,revenue-chart,top-dishes,hourly-heatmap,analytics-dashboard}.tsx`

**Tasks**
- [ ] Identify ~4 logical sections in the current 593-line file
- [ ] Extract each into a focused component
- [ ] `analytics-dashboard.tsx` becomes the orchestrator (<100 lines)

**Acceptance Criteria**
- Each subcomponent under 200 lines
- Visual diff minimal

**References**
- Current: [analytics-dashboard.tsx](frontend/manager-application-frontend/components/analytics-dashboard.tsx)

**Blocked By**
- MG-003

---

### ISSUE MG-005: Wire `features/analytics` with 4 TanStack Query queries

**Description**
Each analytics subcomponent owns a `useQuery` hook against a backend slice. Range picker updates all queries via shared `range` state in URL params.

**Goal**
Live analytics; each card/chart fetches independently.

**Targeted Files**
- `apps/manager/features/analytics/api/{queryKeys,services,mappers,queries}.ts`
- `apps/manager/features/analytics/types.ts`
- `apps/manager/features/analytics/hooks/use-range.ts`

**Tasks**
- [ ] `queryKeys.ts`: `analyticsKeys = { all, kpis(range), revenue(range), topDishes(range), hourlyHeatmap(range) }`
- [ ] `services.ts`: 4 service functions (or one returning all sections — depends on backend)
- [ ] `mappers.ts`: per-section mappers
- [ ] `queries.ts`: 4 hooks (`useKpis`, `useRevenue`, `useTopDishes`, `useHourlyHeatmap`)
- [ ] `use-range.ts`: reads/writes `?range=` URL param
- [ ] Subcomponents call their own hooks

**Acceptance Criteria**
- 4 queries visible in devtools, each with its own key
- Range change → all 4 refetch
- Failed query renders only its own error state (others unaffected)

**References**
- Backend: `GET /analytics/restaurant?range=…&section=…`

**Blocked By**
- MG-004, backend endpoint exists

---

### ISSUE MG-006: Wire `features/employees` CRUD

**Description**
Full CRUD via 4 mutations + 1 list query. Optimistic update on remove for snappy UX.

**Goal**
Manager manages staff inline.

**Targeted Files**
- `apps/manager/features/employees/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/employees/components/{employee-table,invite-modal,edit-modal}.tsx`
- `apps/manager/app/employees/page.tsx`

**Tasks**
- [ ] `queryKeys.ts`: `employeeKeys = { all, list(restaurantId), detail(id) }`
- [ ] `services.ts`: `list`, `invite`, `update`, `remove`
- [ ] `mappers.ts`: `toEmployee`, `toInviteDto`, `toUpdateDto`
- [ ] `queries.ts`: `useEmployees(restaurantId)`
- [ ] `mutations.ts`: `useInvite`, `useUpdateEmployee`, `useRemoveEmployee` (all invalidate `employeeKeys.list`)
- [ ] Confirm dialog before remove

**Acceptance Criteria**
- All 4 CRUD ops work
- Remove uses optimistic update + reverts on failure
- Invite triggers backend email

**References**
- Backend: `GET/POST/PATCH/DELETE /restaurants/{id}/staff`

**Blocked By**
- MG-003

---

### ISSUE MG-007: Wire `features/menu` for manager (admin-mode CRUD)

**Description**
Manager-scoped menu CRUD. Reuses same `MenuItem` type as web-client but adds `useCreateMenuItem`, `useUpdateMenuItem`, `useDeleteMenuItem`, `useToggleAvailability` mutations.

**Goal**
Menu changes propagate to web-client + chef (after their queries invalidate or refetch).

**Targeted Files**
- `apps/manager/features/menu/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/menu/components/{menu-table,menu-item-form}.tsx`
- `apps/manager/app/menu/page.tsx`

**Tasks**
- [ ] 5-file contract following Architecture Foundation example
- [ ] Image upload (or URL field)
- [ ] `useToggleAvailability(id)` — optimistic + invalidate

**Acceptance Criteria**
- Add/edit/delete + toggle available all work
- Web-client picks up changes on next refetch (≤60s staleTime)

**References**
- Backend: `/menus` ([menus.py](API_Orchestration/app/routes/menus.py))

**Blocked By**
- MG-003

---

### ISSUE MG-008: Wire `features/reservations`

**Description**
List + action mutations (confirm, cancel, no-show).

**Goal**
Reservation desk in manager app.

**Targeted Files**
- `apps/manager/features/reservations/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/reservations/components/{calendar-view,list-view,reservation-card}.tsx`
- `apps/manager/app/reservations/page.tsx`

**Tasks**
- [ ] `queryKeys.ts`: `reservationKeys = { all, byDate(date), detail(id) }`
- [ ] `queries.ts`: `useReservations(date)`
- [ ] `mutations.ts`: `useUpdateReservation()` (confirm/cancel/no-show)

**Acceptance Criteria**
- Today's reservations visible
- Status mutation invalidates list

**References**
- Backend: `/reservations`

**Blocked By**
- MG-003

---

### ISSUE MG-009: Wire `features/stock` consuming `useStock` + `useStockForecast`

**Description**
Reuses the same backend endpoints as chef's inventory feature but with manager-scoped mutations (`useUpdateThreshold`, `useCreateRestockOrder`).

**Goal**
Manager decision-making backed by AI forecast.

**Targeted Files**
- `apps/manager/features/stock/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/stock/components/stock-table.tsx`
- `apps/manager/app/stock/page.tsx`

**Tasks**
- [ ] `queryKeys.ts`: `stockKeys = { all, current(restaurantId), forecast(item, date) }`
- [ ] `queries.ts`: `useStock`, `useStockForecast`
- [ ] `mutations.ts`: `useUpdateThreshold`, `useCreateRestockOrder`
- [ ] Bulk threshold edit

**Acceptance Criteria**
- Stock + forecast both render
- Threshold persists

**References**
- Backend: `/ingredients`, `/ai/inventory/forecast`

**Blocked By**
- MG-003, mayda-ai/inventory shim exists

---

### ISSUE MG-010: Wire `features/notifications`

**Description**
Notification inbox with `useNotifications()` query (polling) + `useMarkAsRead()` mutation.

**Goal**
Manager has a unified notification feed.

**Targeted Files**
- `apps/manager/features/notifications/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `apps/manager/features/notifications/components/notifications-feed.tsx`
- `apps/manager/app/notifications/page.tsx`

**Tasks**
- [ ] `queryKeys.ts`: `notificationKeys = { all, unread, list }`
- [ ] `queries.ts`: `useNotifications()` with `refetchInterval: 30000`
- [ ] `mutations.ts`: `useMarkAsRead()` invalidates `unread`
- [ ] Unread badge in sidebar

**Acceptance Criteria**
- Unread count syncs every 30s
- Mark-as-read persists

**References**
- Backend: `/notifications` (new)

**Blocked By**
- MG-003

---

### ISSUE MG-011: Per-route boundaries + deploy

**Description**
Mirror WC-009 across 6 routes; Vercel deploy.

**Goal**
Production-ready manager at `manager.mayda.app`.

**Targeted Files**
- `apps/manager/app/**/loading.tsx`, `error.tsx`

**Tasks**
- [ ] Loading + error per route
- [ ] Vercel project, root `apps/manager`, domain `manager.mayda.app`

**Acceptance Criteria**
- All 6 routes have boundaries
- Domain live

**References**
- WC-009, WC-010

**Blocked By**
- MG-005 through MG-010

---

# 🛡️ REPO: `mayda-admin`

### ISSUE AD-001: Initialize repo + restructure into feature-based + install TanStack Query

**Description**
Import `SupAdminPanel/` to `mayda-admin`, restructure into `app/`, `features/`, `shared/`, install TanStack Query and scaffold the shared QueryProvider.

**Goal**
Repo builds with the documented structure and TanStack Query active.

**Targeted Files**
- All of repo
- `shared/{api/client.ts,lib/{env,query-client,query-provider}.ts/tsx,ui/,utils/}`
- `features/` (empty)
- `app/layout.tsx` (wrap with QueryProvider)

**Tasks**
- [ ] Push current `SupAdminPanel/` as initial commit
- [ ] Create `features/` + `shared/` skeleton
- [ ] Move shadcn primitives → `shared/ui/`
- [ ] `npm i @tanstack/react-query @tanstack/react-query-devtools`
- [ ] Create `shared/lib/{query-client,query-provider}.ts` per Architecture Foundation
- [ ] Wrap `app/layout.tsx`
- [ ] Update `package.json` `"name"` to `"mayda-admin"`

**Acceptance Criteria**
- App builds; devtools visible in dev
- `features/`, `shared/` folders in place

**References**
- Architecture Foundation
- MF-003

**Blocked By**
- None

---

### ISSUE AD-002: Remove MUI; migrate layout shell to shadcn (in `shared/ui/`)

**Description**
Eliminate the MUI + shadcn split (audit-flagged). All layout primitives moved to `shared/ui/` using shadcn only.

**Goal**
Single design system.

**Targeted Files**
- All files importing `@mui/material`
- `shared/ui/layout/{sidebar,topbar}.tsx`
- `package.json`

**Tasks**
- [ ] Enumerate MUI imports
- [ ] Replace with shadcn + Tailwind equivalents
- [ ] `npm uninstall @mui/material @emotion/react @emotion/styled`

**Acceptance Criteria**
- Zero `@mui` imports
- Bundle drops ≥150KB
- Visual diff minimal

**References**
- AUDIT.md → "UI Library Conflict"

**Blocked By**
- AD-001

---

### ISSUE AD-003: Convert tab-state to routes + create empty feature folders

**Description**
Each admin section becomes a feature folder + route. Mirrors MG-003.

**Goal**
Bookmarkable routes; feature seams ready.

**Targeted Files**
- `app/{restaurants,analytics,anomalies,settings}/page.tsx` (new)
- `app/page.tsx` (dashboard home)
- `features/{dashboard,restaurants,analytics,anomalies,settings}/` (empty)

**Tasks**
- [ ] Create 5 routes + 5 empty feature folders
- [ ] Move each existing dashboard component into its feature's `components/`
- [ ] Sidebar uses `next/link` + `usePathname()`

**Acceptance Criteria**
- 5 routes bookmarkable
- Refresh stable

**References**
- AUDIT.md → "State-driven routing via useState"

**Blocked By**
- AD-002

---

### ISSUE AD-004: Build `features/auth` with ADMIN role gate

**Description**
Mirror CH-002 with `role === "ADMIN"`. Strictest gate of any app.

**Goal**
Only ADMIN reaches any route.

**Targeted Files**
- `features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/auth/components/{login-form,auth-guard}.tsx`
- `app/login/page.tsx`, `middleware.ts`

**Tasks**
- [ ] Mirror CH-002 with ADMIN role

**Acceptance Criteria**
- Manager/chef/waiter creds rejected
- ADMIN succeeds

**References**
- CH-002

**Blocked By**
- AD-001

---

### ISSUE AD-005: Wire `features/dashboard` with `usePlatformStats` query

**Description**
Aggregate KPIs + recent activity via TanStack Query.

**Goal**
Live platform-wide dashboard.

**Targeted Files**
- `features/dashboard/api/{queryKeys,services,mappers,queries}.ts`
- `features/dashboard/components/{kpi-grid,activity-feed}.tsx`
- `app/page.tsx`

**Tasks**
- [ ] 5-file contract
- [ ] `usePlatformStats()` with `refetchInterval: 60000`
- [ ] `useRecentActivity()` separate query

**Acceptance Criteria**
- KPIs + activity feed populate; refresh auto-updates

**References**
- Backend: `GET /admin/stats`

**Blocked By**
- AD-003, AD-004, backend endpoint exists

---

### ISSUE AD-006: Wire `features/restaurants` CRUD + delete fallback component

**Description**
Full CRUD via TanStack Query. Delete the `*-fallback.tsx` audit-flagged file.

**Goal**
Admin manages restaurants; no stale fallback components.

**Targeted Files**
- `features/restaurants/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/restaurants/components/{restaurant-table,restaurant-form,confirm-delete}.tsx`
- `app/restaurants/page.tsx`
- DELETE: original `restaurant-table-fallback.tsx`

**Tasks**
- [ ] 5-file contract
- [ ] `useRestaurants()`, `useRestaurant(id)`
- [ ] `useCreateRestaurant`, `useUpdateRestaurant`, `useDeleteRestaurant` (soft-delete via `isActive=false`)
- [ ] Confirm dialog
- [ ] Delete `restaurant-table-fallback.tsx`

**Acceptance Criteria**
- All CRUD works
- No `*-fallback.tsx` files remain
- Optimistic delete reverts on failure

**References**
- AUDIT.md → "Component naming smell: *-fallback"
- Backend: `/restaurants` ([restaurants.py](API_Orchestration/app/routes/restaurants.py))

**Blocked By**
- AD-003, AD-004

---

### ISSUE AD-007: Wire `features/analytics` (global, multi-section)

**Description**
Platform-wide analytics with multiple TanStack Query slices similar to MG-005.

**Goal**
Cross-restaurant analytics view.

**Targeted Files**
- `features/analytics/api/{queryKeys,services,mappers,queries}.ts`
- `features/analytics/components/{revenue-trend,top-restaurants,top-dishes,user-growth}.tsx`
- `app/analytics/page.tsx`

**Tasks**
- [ ] `queryKeys.ts`: `analyticsKeys = { all, revenue(range), topRestaurants(range), topDishes(range), userGrowth(range) }`
- [ ] 4 sub-queries
- [ ] Range picker drives all

**Acceptance Criteria**
- 4 independent queries in devtools
- Range change refetches all

**References**
- Backend: `GET /admin/analytics`

**Blocked By**
- AD-003, AD-004, backend endpoint exists

---

### ISSUE AD-008: Wire `features/anomalies` to `/ai/anomalies`

**Description**
AI-flagged unusual activity via TanStack Query, with acknowledge mutation.

**Goal**
Admin reviews + acks AI-detected anomalies.

**Targeted Files**
- `features/anomalies/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/anomalies/components/{anomaly-card,anomaly-list}.tsx`
- `app/anomalies/page.tsx`

**Tasks**
- [ ] 5-file contract
- [ ] `useAnomalies(range)`, `useAckAnomaly()` (invalidates `anomaliesKeys.all`)
- [ ] Severity-color cards

**Acceptance Criteria**
- Anomalies render from AI proxy
- Ack removes from active list optimistically

**References**
- Backend: `GET /ai/anomalies`, `POST /ai/anomalies/{id}/ack`

**Blocked By**
- AD-003, AD-004, mayda-backend `/ai/anomalies` route exists

---

### ISSUE AD-009: Build `features/settings` form

**Description**
Replace "Settings coming soon..." with `useSettings` query + `useUpdateSettings` mutation form.

**Goal**
Admin configures platform defaults.

**Targeted Files**
- `features/settings/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/settings/components/settings-form.tsx`
- `app/settings/page.tsx`

**Tasks**
- [ ] 5-file contract
- [ ] `useSettings()`, `useUpdateSettings()`
- [ ] Form via shadcn + zod + react-hook-form
- [ ] Toast on save

**Acceptance Criteria**
- Form hydrates from query
- Save persists; query refetches

**References**
- AUDIT.md → "Settings is hardcoded coming soon"

**Blocked By**
- AD-003, AD-004, backend endpoint exists

---

### ISSUE AD-010: Per-route boundaries + deploy

**Description**
Loading/error per route; Vercel.

**Goal**
Production at `admin.mayda.app`.

**Targeted Files**
- `app/**/loading.tsx`, `error.tsx`

**Tasks**
- [ ] Mirror WC-009
- [ ] Vercel deploy, domain `admin.mayda.app`

**Acceptance Criteria**
- Boundaries + domain live

**References**
- WC-009, WC-010

**Blocked By**
- AD-005 through AD-009

---

# 📱 REPO: `mayda-mobile` (Expo)

### ISSUE MB-001: Bootstrap Expo app with feature-based skeleton + TanStack Query

**Description**
Initialize Expo TypeScript project with `expo-router`, install TanStack Query, scaffold `features/`, `shared/`, wrap root with `<QueryClientProvider>`.

**Goal**
Buildable RN app with the documented architecture and TanStack Query active.

**Targeted Files**
- New repo: `mayda-mobile/`
- `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/{menu,ar,cart,profile}.tsx`
- `shared/{api/client.ts,lib/{env,query-client,query-provider}.ts/tsx,ui/,utils/}`
- `features/` (empty)

**Tasks**
- [ ] `npx create-expo-app@latest mayda-mobile --template blank-typescript`
- [ ] `npx expo install expo-router expo-av expo-camera react-native-webview @react-native-async-storage/async-storage`
- [ ] `npm i @tanstack/react-query @tanstack/react-query-devtools-rn zustand`
- [ ] Configure `expo-router`
- [ ] Create `shared/lib/query-client.ts` + provider
- [ ] Wrap `app/_layout.tsx` with provider
- [ ] Create 4 tab stubs

**Acceptance Criteria**
- `npx expo start` works
- All 4 tabs visible
- `useQuery({ queryKey: ['test'], queryFn: () => Promise.resolve(1) })` returns data
- Devtools accessible

**References**
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TanStack Query React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)

**Blocked By**
- None

---

### ISSUE MB-002: NativeWind + shared UI primitives

**Description**
Tailwind-equivalent styling for RN.

**Goal**
`className="..."` works.

**Targeted Files**
- `tailwind.config.js`, `babel.config.js`, `global.css`, `nativewind-env.d.ts`
- `shared/ui/` (Button, Card, Input, Text primitives)

**Tasks**
- [ ] NativeWind install + config per docs
- [ ] Create RN equivalents of shadcn primitives in `shared/ui/`

**Acceptance Criteria**
- `<View className="p-4 bg-red-500">` renders correctly on iOS/Android
- Shared UI primitives importable

**References**
- [NativeWind setup](https://www.nativewind.dev/getting-started/installation)

**Blocked By**
- MB-001

---

### ISSUE MB-003: Build `features/auth` with AsyncStorage-backed token + login mutation

**Description**
Mirror WC-002 with AsyncStorage instead of localStorage. `useLogin()` mutation persists token; `useCurrentUser()` query rehydrates on app start.

**Goal**
Persistent auth across kills/relaunches via TanStack Query.

**Targeted Files**
- `features/auth/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/auth/components/{login-form,auth-guard}.tsx`
- `features/auth/types.ts`, `index.ts`
- `app/login.tsx`
- `shared/lib/storage.ts` (AsyncStorage wrapper)

**Tasks**
- [ ] `storage.ts`: typed AsyncStorage wrapper for `mayda_token`
- [ ] Mirror WC-002 file structure
- [ ] `useLogin()` stores token via `storage.setToken`
- [ ] `useCurrentUser()` reads token + calls `/auth/me`
- [ ] Auth gate in tab layout

**Acceptance Criteria**
- Login persists across kill+relaunch
- Logout clears storage + cache

**References**
- WC-002 pattern

**Blocked By**
- MB-001, MB-002

---

### ISSUE MB-004: Create `features/menu` with `useMenu()` query

**Description**
Same 5-file contract as web-client. Renders in FlatList with menu cards.

**Goal**
Mobile customer sees live menu.

**Targeted Files**
- `features/menu/api/{queryKeys,services,mappers,queries}.ts`
- `features/menu/components/{menu-list,menu-card}.tsx`
- `features/menu/types.ts`, `index.ts`
- `app/(tabs)/menu.tsx`

**Tasks**
- [ ] Mirror WC-003 + WC-004 in one go (no need for mock intermediary on mobile)
- [ ] FlatList of `<MenuCard />`
- [ ] Pull-to-refresh via TanStack Query's `refetch()`
- [ ] Empty + error states

**Acceptance Criteria**
- Menu items load from backend
- Pull-to-refresh triggers `refetch()`
- Network failure → retry button

**References**
- Backend: `GET /restaurants/{id}/menus`
- WC-004

**Blocked By**
- MB-003

---

### ISSUE MB-005: Build `features/cart` with Zustand + AsyncStorage persistence

**Description**
Mirror WC-005 with AsyncStorage persister.

**Goal**
Cart survives app kills.

**Targeted Files**
- `features/cart/store.ts`
- `features/cart/hooks/use-cart.ts`
- `features/cart/components/cart-screen.tsx`
- `app/(tabs)/cart.tsx`

**Tasks**
- [ ] Zustand store with `persist` middleware using AsyncStorage adapter
- [ ] Mirror WC-005 actions
- [ ] Cart screen renders items + qty controls + checkout

**Acceptance Criteria**
- Add item → kill app → relaunch → item still there
- Qty changes persist

**References**
- WC-005
- [Zustand persist with AsyncStorage](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)

**Blocked By**
- MB-004

---

### ISSUE MB-006: Create `features/orders` with `useCreateOrder` mutation

**Description**
Mirror WC-006 for mobile. Checkout flow: cart → mutation → confirmation screen.

**Goal**
End-to-end mobile order placement.

**Targeted Files**
- `features/orders/api/{queryKeys,services,mappers,queries,mutations}.ts`
- `features/orders/components/{order-confirmation,order-list}.tsx`
- `app/order-confirmation.tsx`

**Tasks**
- [ ] 5-file contract
- [ ] `useCreateOrder()` mutation — `onSuccess` clears cart + navigates to confirmation
- [ ] `useMyOrders()` for an orders screen

**Acceptance Criteria**
- Mobile order placed visible in chef dashboard
- Cart cleared on success

**References**
- WC-006

**Blocked By**
- MB-003, MB-005

---

### ISSUE MB-007: Create `features/ar` with WebView-based viewer

**Description**
AR is a UI feature, no backend query. `features/ar/components/ar-viewer.tsx` wraps a WebView rendering `<model-viewer ar>`.

**Goal**
"View in AR" opens native AR (Quick Look / Scene Viewer).

**Targeted Files**
- `features/ar/components/ar-viewer.tsx`
- `features/ar/hooks/use-model-url.ts` (resolves modelUrl from menu item)
- `app/ar/[dishId].tsx`

**Tasks**
- [ ] Resolve dish via `useMenuItem(id)` from `features/menu`
- [ ] Build HTML string with `<model-viewer src ar ar-modes>`
- [ ] Render in WebView
- [ ] Close button

**Acceptance Criteria**
- AR works on iOS + Android
- Non-AR devices show 3D model with camera controls

**References**
- Legacy: [AR-Food-Gallery/src/components/ARApp.jsx:135](AR-Food-Gallery/src/components/ARApp.jsx)
- [model-viewer](https://modelviewer.dev/)

**Blocked By**
- MB-004

---

### ISSUE MB-008: Create `features/voice` recording hook (no backend yet)

**Description**
Recording infrastructure isolated in `features/voice/hooks/use-voice-recording.ts`. No API call yet — that's MB-009.

**Goal**
Audio blob ready to send.

**Targeted Files**
- `features/voice/hooks/use-voice-recording.ts`
- `features/voice/components/recording-button.tsx`
- `features/voice/types.ts`

**Tasks**
- [ ] Request mic permission via `expo-av`
- [ ] Start/stop returning `.m4a` URI
- [ ] Animated recording indicator

**Acceptance Criteria**
- Permission prompts on first use
- Recording produces playable file

**References**
- [expo-av Audio](https://docs.expo.dev/versions/latest/sdk/audio/)

**Blocked By**
- MB-003

---

### ISSUE MB-009: Add `features/voice` transcribe mutation + voice-order flow

**Description**
Add `useTranscribe()` mutation to `features/voice`, plus the `voice-order.tsx` screen orchestrating: record → transcribe → parse → confirm → reuse `useCreateOrder()`.

**Goal**
Demo headline: end-to-end voice ordering.

**Targeted Files**
- `features/voice/api/{queryKeys,services,mappers,mutations}.ts`
- `features/voice/lib/parse-order.ts` (fuzzy match transcript → cart items)
- `app/voice-order.tsx`

**Tasks**
- [ ] `services.ts`: multipart POST audio
- [ ] `mappers.ts`: `toTranscript(dto)`
- [ ] `mutations.ts`: `useTranscribe()` mutation
- [ ] `parse-order.ts`: simple fuzzy match against `useMenu()` items
- [ ] Screen flow: record → mutate → parse → show items → confirm → reuse `useCreateOrder()`

**Acceptance Criteria**
- "Two burgers and a coke" → 2× burger + 1× coke in cart
- Misrecognized → user can edit
- Failed transcription → fallback message

**References**
- Backend: `POST /ai/voice/transcribe`
- Existing parsing: [Voice-Chef VoiceScript.py](Voice-Chef---AI-Voice-Interface-for-Restaurant-Orders/VoiceScript.py)

**Blocked By**
- MB-006, MB-008, mayda-ai/voice shim exists

---

### ISSUE MB-010: Build `features/profile` + push token registration mutation

**Description**
Profile screen + `useRegisterPushToken()` mutation calling `POST /users/me/push-token` on app start.

**Goal**
Push notifications opt-in + profile UI.

**Targeted Files**
- `features/profile/api/{queryKeys,services,mappers,mutations}.ts`
- `features/profile/components/profile-screen.tsx`
- `features/profile/hooks/use-push-registration.ts`
- `app/(tabs)/profile.tsx`

**Tasks**
- [ ] `npm i expo-notifications`
- [ ] Request permission
- [ ] `useRegisterPushToken()` mutation
- [ ] Call once on app mount (with `useEffect`)
- [ ] Profile UI: user info + logout

**Acceptance Criteria**
- Push permission prompt appears
- Token registered with backend
- Logout via `features/auth.useLogout()` works

**References**
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- Backend: `POST /users/me/push-token`

**Blocked By**
- MB-003

---

### ISSUE MB-011: Archive legacy AR-Food-Gallery code

**Description**
Preserve old web AR prototype under `legacy/web-ar/` with explicit non-buildable marker.

**Goal**
Reference code preserved; not part of build.

**Targeted Files**
- `legacy/web-ar/`
- `legacy/README.md`
- `assets/models/` (verify GLB files present)

**Tasks**
- [ ] `cp -R /path/to/AR-Food-Gallery ./legacy/web-ar`
- [ ] Write `legacy/README.md` explaining: pre-pivot prototype, not buildable, models reused
- [ ] Verify `assets/models/` has GLB files used by MB-007

**Acceptance Criteria**
- Legacy folder present; README clear about non-buildable status

**References**
- Legacy: [AR-Food-Gallery/](AR-Food-Gallery/)

**Blocked By**
- MB-007

---

### ISSUE MB-012: Preview build (EAS) + demo QR

**Description**
EAS preview build OR Expo Go QR.

**Goal**
One-tap install for judges.

**Targeted Files**
- `eas.json`, `app.json` (icons + splash)

**Tasks**
- [ ] `eas init`
- [ ] Configure `preview` profile
- [ ] `eas build --profile preview --platform all` OR `npx expo start --tunnel` for Expo Go QR
- [ ] Add install instructions to README

**Acceptance Criteria**
- Teammate's phone installs from link/QR
- Login + menu + AR + voice flow work on real device

**References**
- [EAS Build](https://docs.expo.dev/build/introduction/)

**Blocked By**
- MB-009, MB-010, MB-011

---

## 📊 Summary

| Repo / App | Issues | TanStack features | Notes |
|---|---|---|---|
| mayda-frontend (foundation) | 4 (MF-001…004) | — | MF-004 adds TanStack Query + provider per app |
| web-client | 10 (WC-001…010) | 6 features (auth, menu, cart, orders, recommendations, filters) | Cart uses Zustand (local-only resource) |
| chef | 9 (CH-001…009) | 5 features (auth, orders, inventory, analytics, voice) | |
| waiter | 8 (WT-001…008) | 5 features (auth, tables, orders, table-session, profile) | |
| manager | 11 (MG-001…011) | 7 features (auth, analytics, employees, menu, reservations, stock, notifications) | |
| mayda-admin | 10 (AD-001…010) | 6 features (auth, dashboard, restaurants, analytics, anomalies, settings) | |
| mayda-mobile | 12 (MB-001…012) | 7 features (auth, menu, cart, orders, ar, voice, profile) | |
| **TOTAL** | **64 issues** | **36 features** | |

Every feature with backend interaction implements the **5-file API contract** (queryKeys, services, mappers, queries, mutations). Cart features are the only exception — they're local-only resources backed by Zustand + persist middleware.

Ready for the backend (`mayda-backend`) and AI (`mayda-ai`) operational plans?
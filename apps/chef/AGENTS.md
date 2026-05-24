# agent.md

Project-level instructions for AI coding agents working in this repo.

## Project

`@mayda/chef`: Next.js 16 (App Router) kitchen dashboard. React 19, TypeScript, Tailwind CSS v4, shadcn/ui with daisy-depth shadows, MongoDB Compass dark palette, Outfit font, `next-themes` for dark/light (dark default), lucide-react for icons.

## Required reading

Before making any change, read these files. They override generic best-practice defaults.

- **`DESIGN.md`**: the design-system spec, generated via `npx getdesign@latest add meta`. It is the source of truth for color tokens, typography, radii, spacing, and component shapes.
- **`MIGRATION_NOTES.md`**: what changed in the MUI → shadcn + Next 14→16 migration, plus open items.
- **`app/globals.css`**: CSS variables in `:root`/`.dark` plus the Tailwind v4 `@theme inline` bridge that wires those variables into utility classes (`bg-primary`, `text-foreground`, …). Token edits happen here.

## Skills

**Always read every `.skills/**/SKILL.md` before acting.** They are project-scoped instructions for specific kinds of work (frontend design, UI/UX polish, web design guidelines, code polish, etc.) and they take precedence over generic guidance.

- Skills are installed via `npx skills add <source> --skill <name>` and live under `.skills/` (symlink to `.agents/skills/`, the canonical path used by the `skills` CLI).
- The current inventory is whatever `npx skills list` reports; do not hardcode skill names anywhere: let the directory be the source of truth.
- When a SKILL.md applies to the work at hand, follow it. When two skills conflict, prefer the more specific one (e.g. `frontend-design` over a general `code-polish` for UI work).
- Skills are read on demand. Load the SKILL.md fully when starting work in its domain.

To inspect, install, update, or remove skills:

```sh
npx skills list                 # what's installed
npx skills add <source> --skill <name>   # install
npx skills update               # refresh from sources
npx skills remove <name>        # uninstall
```

## Stack-specific rules

- **Components**: Use shadcn primitives from `shared/ui/*`. Compose via the `cn()` helper from `@/lib/utils`. Layout primitives (sidebar, topbar) live under `shared/ui/layout/`. Feature components currently live under `components/<domain>/<name>.tsx` and stay co-located with their domain: issue **AD-003** will move these into `features/<domain>/components/`. Until then, do not introduce new top-level folders for features.
- **Tokens over arbitrary values**: Prefer Tailwind utilities backed by `@theme` tokens (`bg-primary`, `text-muted-foreground`, `rounded-xl`) over arbitrary `bg-[#…]` values. If you need a new token, add it in `app/globals.css` (both the variable and the `@theme inline` mapping).
- **Buttons and badges are pill-rounded** (`rounded-full`). This is Meta's brand signature: see `DESIGN.md` "Do's and Don'ts".
- **Type system**: TypeScript strict mode is on. The build currently runs with `typescript.ignoreBuildErrors: true` for migration velocity: please keep new code type-clean anyway.
- **Lint**: `npm run lint` is currently a placeholder (Next 16 dropped `next lint`). If you need linting locally, install `eslint` + `eslint-config-next` and update the script.
- **Build/run**: `npm ci`, `npm run dev`, `npm run build`, `npm start`. Build uses Turbopack by default in Next 16.

## Routes

- `/`: kitchen dashboard (`app/(dashboard)/page.tsx`) with order grid, stats row, sort controls, voice panel.
- `/stock`: stock management with search, alerts, inventory grid.
- `/analytics`: kitchen analytics with KPI cards, charts.
- `/order/[id]`: individual order detail with timeline.
- `/login`: auth page with login form.

## Conventions

- Layout uses a simplified top-bar (`shared/ui/layout/chef-topbar.tsx`) wrapped in a floating-card panel via `app/(dashboard)/layout.tsx`. Mobile: top-bar stays, panel goes edge-to-edge.
- Theme toggle uses `next-themes` via the wrapper at `components/theme-provider.tsx`. Use `useTheme()` from there, not directly from `next-themes`.
- Feature code follows the feature-based structure: API hooks in `features/<domain>/api/queries.ts`, types in `features/<domain>/types.ts`, components in `features/<domain>/components/`.
- TanStack Query via `shared/lib/query-provider.tsx` and `shared/lib/query-client.ts`. Use `useQuery`/`useMutation` from `@tanstack/react-query`, not raw fetch.
- API client at `shared/api/client.ts` handles auth tokens and error normalization.

## Out of scope (do not regress)

- Do not reintroduce MUI or Emotion. The migration was deliberate.
- Do not edit `DESIGN.md` by hand to chase a feature; if tokens are wrong, regenerate via `npx getdesign@latest add meta` and reconcile.
- Do not add `"latest"` version specifiers to `package.json`: pin to concrete versions.

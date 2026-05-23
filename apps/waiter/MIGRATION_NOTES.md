# Migration Notes

Tracking the full design system transformation, from initial MUI removal to the current Compass-dark / daisy-depth / skill-driven state.

## Timeline

| Date | Milestone |
|---|---|
| 2026-05-22 | MUI dropped, shadcn-ui + Next 16 + React 19 baseline |
| 2026-05-23 (am) | Outfit font, supastarter nested floating-card layout, dropped pill buttons |
| 2026-05-23 (pm) | DaisyUI-inspired component depth, Bento grid dashboard |
| 2026-05-23 (pm) | MongoDB Compass dark palette, syntax tokens, dark default |
| 2026-05-23 (pm) | Skills configuration (`mayda` agent), 4-phase skill-driven audit + remediation |

## 1. Original migration: MUI → shadcn-ui

### Removed (127 packages)

```
@mui/material
@mui/icons-material
@mui/system
@mui/x-data-grid
@mui/material-pigment-css
@emotion/react
@emotion/styled
lib/theme.ts
```

### Replaced by

| MUI | Replacement |
|---|---|
| `@mui/material` Button, Card, Input, Badge, Dialog, etc. | **shadcn/ui** primitives + **Radix UI** under `shared/ui/*` |
| `@mui/x-data-grid` | shadcn `<Table>` (TanStack-table planned, not yet wired) |
| `@mui/icons-material` | **`lucide-react`** (27 files, no inline SVG) |
| `@emotion/*` (CSS-in-JS) | **Tailwind CSS v4** + CSS variables |
| `lib/theme.ts` | `app/globals.css` (`:root` + `.dark` + `@theme inline`) |
| `MuiThemeProvider` | **`next-themes`** via `shared/ui/theme-provider.tsx` |

### Framework upgrade in the same PR

- `next` 14.2.16 → 16.2.6 (Turbopack default)
- `react`, `react-dom` 18.3.1 → 19.2.6
- `vaul` 0.9.9 → 1.1.2 (React 19 peer dep)
- `tsconfig.json` auto-updated by Next 16 validator (`jsx: react-jsx`)
- `next.config.mjs` dropped the `eslint` key (Next 16 removed it)

## 2. Layout pivot: Meta theme → supastarter nested floating-card

The original Meta-themed shell (sidebar + topbar + content area) was replaced by a nested floating-card layout inspired by supastarter:

- Body: `bg-background` (soft grey light, Compass teal-blue dark).
- Desktop sidebar: fixed `w-72`, `bg-sidebar`, blends into the body grey in light, `#112329` in dark.
- Main content: a single floating panel (`bg-card rounded-2xl border shadow-depth-card-lg`) holding every admin route.
- Mobile: sidebar collapses into a `Sheet`, panel goes edge-to-edge.

Topbar was **removed**. Each page now renders its own `PageHeader` (title + description + optional actions + optional eyebrow status pill).

## 3. Component shape & typography

| Surface | Before | After |
|---|---|---|
| Buttons | `rounded-full` (Meta pill) | `rounded-md`, `text-xs font-bold uppercase tracking-wider` (compact label style) |
| Badges | `rounded-full` | `rounded-md` (status pills explicitly opt back into `rounded-full`) |
| Cards | `rounded-lg` | `rounded-xl` |
| Floating main panel | n/a | `rounded-2xl` |
| Font | Montserrat → **Outfit** (current) via `next/font/google` | Loaded as `--font-outfit`, exposed via Tailwind `--font-sans` |
| Heading weight | `font-bold` (700) | `font-semibold` (600); `font-bold` reserved for the uppercase Button label |

## 4. Component depth (DaisyUI-inspired)

`app/globals.css` exposes 6 layered shadow utilities:

- `shadow-depth-btn`: inset highlight + close + hairline (Buttons, active nav, account selector).
- `shadow-depth-btn-active`: inset shadow swap on `:active`.
- `shadow-depth-card`: 4-layer (inner cards, SettingCard wrapper, etc.).
- `shadow-depth-card-lg`: 5-layer (the single floating main panel).
- `shadow-depth-card-lg-hover`: amplified variant.
- `shadow-depth-input`: inset shadow for inputs.
- `shadow-depth-overlay`: 5-layer for floating menus, popovers, dropdowns, sheets, dialogs, chart tooltip.

Global rules applied:
- `[data-slot=card]:hover { transform: translateY(-1px) }`
- `button:active { transform: translateY(0.5px) }`
- All shadow utilities have `.dark` overrides that shrink the highlight and deepen the shadow.

## 5. Color tokens

### Light mode

Soft grey body so the floating white panel reads as elevated. Tinted neutrals (no `#fff` pure):
- `--background: oklch(97.5% 0.003 160)`
- `--card: oklch(99.5% 0.005 150)` (slight green tint)
- `--primary: oklch(82% 0.24 150)` (MongoDB-inspired bright green)
- `--accent-green: oklch(47% 0.13 165)` (text-on-white accessible green; `text-primary` fails 4.5:1 on white)

### Dark mode (MongoDB Compass)

Exact hex from the Compass UI:
- `--background / --card: #0e1f26` (main data area)
- `--popover / --sidebar: #112329`
- `--secondary / --muted / --accent / --input: #1a2d34`
- `--border: #1c353c`
- `--primary: #00ed64` ; `--primary-deep: #00684a`
- `--foreground: #ffffff` ; `--muted-foreground: #b8c2c4`

### Syntax tokens (JSON / code display)

- Light: `--syntax-key #2563eb`, `--syntax-string #047857`, `--syntax-number #c2410c`, `--syntax-punctuation #475569`.
- Dark: `--syntax-key #4fb4d7`, `--syntax-string #15b273`, `--syntax-number #e27a3f`, `--syntax-punctuation #b8c2c4`.

`defaultTheme="dark"` in `ThemeProvider`. Compass is the daily mode.

## 6. Settings architecture

`/settings/page.tsx` redirects to `/settings/general`. Sub-routes:

```
app/(admin)/settings/
├── layout.tsx              # PageHeader 'Account settings'
├── page.tsx                # redirect → /settings/general
├── general/page.tsx        # Display name, email, language
├── security/page.tsx       # Password, 2FA, sessions
├── notifications/page.tsx  # Switches
└── billing/page.tsx        # Plan, payment method, invoices
```

The Sidebar's "Account settings" parent transforms into a white floating wrapper with an indented sub-menu when on `/settings/*`. Vertical guide line is centered under the parent gear icon (`ml-5` aligns with the icon center at `12 + 16/2 = 20px`). Active sub-item shows a small `bg-foreground` dot on the guide line.

`SettingCard` was rewritten from a nested card to a `<section>` with `border-t pt-6 first:border-t-0` so settings render as horizontal row sections inside the main panel (no nested cards, per `impeccable.layout`).

## 7. Bento Grid empty-state dashboard

Replaced the old 4-cell KPI strip with a `lg:grid-cols-3` bento:

- Left wrapper (`col-span-2`): Card 1 (Revenue trend, h-48 centered empty copy) + sub-grid Cards 2 (donut skeleton) + 3 (histogram skeleton).
- Right card (`col-span-1`): Infrastructure health 4-row list with empty `Circle` status icons + linear `bg-muted` skeleton bars.

All cards: `rounded-xl border bg-card shadow-depth-card`.

## 8. Skills + agent configuration

Project ships with 7 installed skills under `.agents/skills/`:

```
.agents/skills/
├── code-polish        # paulrberg/agent-skills
├── frontend-design    # anthropics/skills
├── grill-me           # mattpocock/skills
├── impeccable         # pbakaus/impeccable
├── ui-ux-pro-max      # nextlevelbuilder/ui-ux-pro-max-skill
├── vercel-react-best-practices  # vercel-labs/agent-skills
└── web-design-guidelines        # vercel-labs/agent-skills
```

Loaded by default via:

 - `.opencode/agents/mayda.json` — local OpenCode agent that declares `skill://.agents/skills/**/SKILL.md` + project context (`AGENTS.md`, `PRODUCT.md`, `DESIGN.md`).
 - `.opencode/skills` — symlink to `.agents/skills` so `opencode_default` also picks them up if `mayda` isn't selected.
 - `AGENTS.md` (renamed from `agent.md`) — canonical OpenCode auto-load path.
 - `chat.defaultAgent = mayda` set globally via `opencode-cli settings`.

## 9. Skill-driven audit phases applied

Commit `3977132`, `feat(skills): apply 4 phases of skill-driven remediation`. Each fix references its skill rule:

- **Phase 1 (critical)**: em dashes removed (`impeccable.bans.em-dashes`), body text ≥16px on mobile (`ui-ux-pro-max.readable-font-size`), 44px touch zones via Button hit-slop (`ui-ux-pro-max.touch-target-size`), WCAG contrast measured + new `--accent-green` token (`ui-ux-pro-max.color-contrast`).
- **Phase 2 (high)**: Quick actions list-not-grid (`impeccable.bans.identical-card-grids`), `next/image` for the logo (`vercel.server-hoist-static-io`), section H3 type scale ≥1.25 ratio (`impeccable.typography.scale-ratio`), SettingCard de-nested (`impeccable.layout.nested-cards`).
- **Phase 3 (medium)**: `prefers-reduced-motion` global override (`ui-ux-pro-max.animation`), `tabular-nums` (`ui-ux-pro-max.number-tabular`), `min-h-dvh` (`ui-ux-pro-max.viewport-units`), tinted `--card` neutral (`impeccable.color`).
- **Phase 4 (long-term)**: PRODUCT.md authored (`impeccable.setup`), Vercel analytics docs clarified (`vercel.bundle-defer-third-party`), page descriptions de-paraphrased (`impeccable.copy.no-restated-headings`).

## Verification

```sh
npm ci          # cold install from lockfile
npm run build   # Turbopack, ~3s, 12 routes prerendered
npm run dev     # dev server
npm start       # production server on :3000
```

Routes to verify:
- `/` — Dashboard with Bento grid, activity, top restaurants, quick-action list.
- `/restaurants`, `/analytics`, `/anomalies` — feature stubs with their own PageHeader.
- `/settings`, `/settings/general|security|notifications|billing` — sub-routes with sidebar active state + indented submenu.
- `/design-preview` — live token reference page (typography, buttons, depth swatches, syntax demo).

Toggle the theme via the sidebar header sun/moon button. Default is dark (Compass).

## Reference files

- `DESIGN.md` (1500+ lines) — portable spec covering tokens, typography, depth, components, sidebar, page-header, settings, bento, iconography, dark theme, do/don'ts, migration guide, and known gaps.
- `PRODUCT.md` — register, users, brand voice, anti-references, strategic principles. Required by the `impeccable` skill.
- `AGENTS.md` — project-level instructions for AI coding agents (load skills, follow DESIGN.md, etc.).
- `.opencode/agents/mayda.json` — agent config with skill resources.
- `app/globals.css` — all CSS variables, depth utilities, motion overrides.

## Open items (still relevant)

- **TanStack Table.** The shadcn `<Table>` works for the placeholder restaurants list. When real data wires up, swap in `@tanstack/react-table` for sorting, filtering, virtualization.
- **Real lint.** `npm run lint` is still a placeholder. Re-enable with `eslint + eslint-config-next`.
- **Hero-metric template trap.** Bento Card 1 currently shows "Total : 0,00 DZD" as an empty state. When wired up, avoid the SaaS hero-metric cliché (big number + small label + gradient accent).
- **Real charts.** Bento donut + histogram are pure CSS skeletons. When connecting to data, use `recharts` (already a dep) and keep `tabular-nums` on every numeric label.
- **Multi-tenant settings.** `/settings/*` is account-scoped. Workspace-level settings will live somewhere else (TBD).
- **i18n.** UI is currently French/English mixed. Add `next-intl` or similar when the multi-locale need surfaces.

## Doc consolidation

- `figma-handoff.md` and `figma-handoff-summary.md` — deleted (pre-migration, referenced legacy MUI stack).
- `componentdesign.md` — merged into `DESIGN.md` (component specs, absolute bans, accessibility requirements, package deps). `DESIGN.md` is now the single source of truth.
- `prompt47.md` — deleted (exact duplicate of `MIGRATION_PROMPT.md`).

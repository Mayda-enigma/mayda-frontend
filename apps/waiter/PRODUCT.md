---
register: product
last-updated: 2026-05-23
---

# PRODUCT.md

Strategic and brand context for `@mayda/admin`. Required by the `impeccable` skill (alongside `DESIGN.md`) so design output stays grounded in who this is for and what it stands for.

## Product

**Mayda Admin** is the operator console for a multi-restaurant smart platform. One workspace, many partner restaurants. The admin oversees revenue, channels, peak hours, infrastructure health, anomaly signals, and per-tenant settings.

It is **not** a marketing surface. It is the cockpit a single operator (or a small team) uses every day to run the business.

## Users

| Persona | Context | What they need |
|---|---|---|
| **Platform operator** | Sits at a desk, ~8h/day, often dual-monitor. Watches anomalies, approves restaurants, audits revenue. | Information density, glanceable status, fast keyboard navigation, no surprise modals. |
| **Finance / ops manager** | Drops in once a day, scans dashboard, exports the weekly rollup. | High-contrast charts, accessible data tables, exportable summaries. |
| **On-call engineer** | Reacts to anomaly alerts on phone or laptop at unpredictable hours. | Mobile-readable empty states, dark-mode legibility, non-noisy notifications. |

Single locale today: French (Algerian Dinar `DZD`). Multi-locale later, but copy lives in French + English where shown.

## Brand voice

**Operational, not promotional.** This is a tool, not a website. The voice is:

- Direct. Verb-first labels (`Manage restaurants`, `View anomalies`, not `→ Click here to manage`).
- Quantitative. When numbers exist, show them with `tabular-nums` and the right unit. When they don't, say "Aucune donnée" and explain why.
- Calm. No exclamation marks, no "🎉", no "We're so excited", no "Boom!". The product never celebrates itself.
- Respectful of attention. Every word earns its place. Page descriptions add information, never paraphrase the title.

## Anti-references

These are the patterns / aesthetics this product **rejects**:

- **Stripe-clone landing-page polish.** No purple gradients, no oversized hero metrics, no "social proof" rails. This is internal tooling.
- **shadcn-pure default.** The default shadcn aesthetic (Inter, white-on-grey, soft shadows) reads as "AI-generated SaaS template". Mayda earns identity via Outfit, MongoDB-derived green, and the Compass dark teal-blue.
- **Notion-style emoji icons.** Icons are lucide vectors only. No `🔧 Settings`, no `🍔 Menu`.
- **Toast spam.** Toasts are reserved for confirmation of explicit user action. Background events surface in the activity feed, not as transient overlays.
- **Modal-first interactions.** Most flows are inline. Modals only when context-switching is unavoidable (destructive confirmation, billing capture).
- **Identical card grids.** `[icon][heading][text]` × N rectangles is banned. Quick actions render as a list. KPIs render as a Bento with intentional size variation.

## Strategic principles

1. **Operator > visitor.** Optimize for the third visit, not the first impression. Density is OK. Animation is restrained.
2. **One panel surface.** The floating white card holds every page. There is no second visual layer competing with it.
3. **Status before metrics.** Empty states matter as much as filled ones. The dashboard renders meaningfully on day zero (Bento empty-state pattern).
4. **Dark mode is the daily mode.** MongoDB Compass palette is the default theme because operators leave the app open. Light mode exists for accessibility, not as the canonical look.
5. **Token-only colors.** Every color reads from a CSS variable. No hex in components. New token? Add to `globals.css` first, document in `DESIGN.md`, then use.
6. **Skills-driven.** This codebase loads `impeccable`, `frontend-design`, `ui-ux-pro-max`, `vercel-react-best-practices`, `web-design-guidelines`, and `code-polish` by default (`.opencode/agents/mayda.json`). Their rules override generic agent defaults.

## Out of scope

- Marketing site, blog, changelog, pricing page. Not built here.
- End-customer (diner) facing surfaces. Different app, different repo.
- Multi-language UI strings beyond French/English at the moment.

## Reference

- `DESIGN.md`: tokens, components, depth, iconography, Compass palette.
- `AGENTS.md`: project-level instructions for AI coding agents.
- `MIGRATION_NOTES.md`: history of the MUI → shadcn + Next 14→16 migration.
- `.opencode/agents/mayda.json`: agent configuration that loads the project skills.
- `.agents/skills/`: installed skill packages (canonical path; symlinked from `.opencode/skills/`).

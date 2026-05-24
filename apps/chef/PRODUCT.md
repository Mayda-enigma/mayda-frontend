---
register: product
last-updated: 2026-05-23
---

# PRODUCT.md

Strategic and brand context for `@mayda/admin`. Required by the `impeccable` skill (alongside `DESIGN.md`) so design output stays grounded in who this is for and what it stands for.

## Product

**Mayda Chef** is the kitchen dashboard for a multi-restaurant smart platform. Kitchen staff use it to manage incoming orders, track preparation status, monitor stock levels, and coordinate with voice commands during busy service periods.

It is **not** a management console. It is the hands-on tool kitchen staff use on tablets and wall-mounted displays during real-time food preparation.

## Users

| Persona | Context | What they need |
|---|---|---|
| **Head Chef** | Runs the kitchen pass, oversees all orders, coordinates team. Uses tablet at the pass. | At-a-glance order status, priority indicators, voice commands for hands-free updates. |
| **Line Cook** | Prepares specific dishes, updates individual order progress. Glances at wall display. | Clear dish details, timing information, simple status transitions (Start→Ready). |
| **Kitchen Porter** | Monitors stock levels, reorders ingredients. Checks between services. | Low-stock alerts, inventory counts, expiry tracking. |

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

1. **Speed > decoration.** Kitchen staff need instant recognition. Cards show status at a glance. Animation is minimal.
2. **Hands-free when possible.** Voice commands are first-class, not a gimmick. Every status transition works via voice.
3. **Dark mode is the daily mode.** Kitchens are often dimly lit. The Compass dark palette reduces eye strain on wall-mounted displays.
4. **Token-only colors.** Every color reads from a CSS variable. No hex in components.
5. **Glanceable status.** Order priority, time elapsed, and preparation status must be readable from across the kitchen.

## Out of scope

- Admin/management features. Those live in `@mayda/admin`.
- End-customer (diner) facing surfaces. Those live in `@mayda/web-client`.
- Multi-language UI strings beyond the supported set (en/es/fr/de/it).

## Reference

- `DESIGN.md`: tokens, components, depth, iconography, Compass palette.
- `AGENTS.md`: project-level instructions for AI coding agents.
- `MIGRATION_NOTES.md`: history of the MUI → shadcn + Next 14→16 migration.
- `.opencode/agents/mayda.json`: agent configuration that loads the project skills.
- `.agents/skills/`: installed skill packages (canonical path; symlinked from `.opencode/skills/`).

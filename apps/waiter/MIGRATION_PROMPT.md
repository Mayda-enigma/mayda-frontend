# MIGRATION_PROMPT.md

A self-contained prompt to apply the **`@mayda/admin` design system + skill-driven workflow** to any other Next.js / React project in the Mayda-Enigma organization.

Paste the section labelled **"Prompt"** below into a new OpenCode session at the root of the target project. Provide the path to the `mayda-admin` repo as a reference so the agent can copy artifacts.

---

## Prerequisites in the target project

Before running the prompt, make sure the target project has:

- **Next.js 14+ (preferably 16) with App Router.** Pages Router needs adapting; the layout patterns (`app/(group)/layout.tsx` etc.) assume App Router.
- **React 19.** If on React 18, the prompt will request an upgrade as a precondition.
- **Tailwind CSS v4.** The depth utilities use Tailwind v4 `@utility` syntax; v3 won't compile them.
- **`pnpm`, `npm`, or `yarn`.** Package manager doesn't matter, but commands assume `npm`.
- **`git` clean working tree.** The agent will commit at phase boundaries.
- **`opencode-cli` available** if you want the skill loading. Otherwise fall back to manually pasting `SKILL.md` into context.

---

## Prompt

```
You are migrating this project to the Mayda-Enigma organization design
system. The reference repo is `mayda-admin` at:

    <PATH_TO_MAYDA_ADMIN>

(Replace the path before pasting.) That repo holds the canonical source
of every artifact you will copy or adapt.

## Stage 0 — Read the references

1. Read `<PATH>/DESIGN.md` end to end. It is the design system spec.
2. Read `<PATH>/PRODUCT.md`. Use it as a template for this project's
   PRODUCT.md (you will write a new one with this project's audience,
   tone, and anti-references).
3. Read `<PATH>/AGENTS.md`. Use it as a template; keep the "Skills"
   section verbatim, adjust only project-specific rules.
4. Read `<PATH>/MIGRATION_NOTES.md`. It explains every transformation
   that already happened and why.
5. Read every `.agents/skills/*/SKILL.md` in the reference repo. The
   work below is governed by:
   - `impeccable` (design laws, absolute bans)
   - `frontend-design` (avoid AI-generic aesthetics)
   - `ui-ux-pro-max` (99 UX rules across 10 categories)
   - `vercel-react-best-practices` (perf rules)
   - `web-design-guidelines` (Vercel WIG)
   - `code-polish` (simplify + review pipeline)
   - `grill-me` (interview to resolve plan branches)

## Stage 1 — Configure OpenCode skills in this project

Replicate the skills setup from the reference repo:

1. `mkdir -p .agents/skills && cp -r <PATH>/.agents/skills/* .agents/skills/`
2. Create `skills-lock.json` mirroring the reference (used by `npx
   skills`).
3. Create `.opencode/agents/<this-project>.json` with skill resources, e.g.:
   ```json
   {
     "name": "<this-project>",
     "tools": ["*"],
     "resources": [
       "file://AGENTS.md",
       "file://README.md",
       "file://DESIGN.md",
       "file://PRODUCT.md",
       "skill://.agents/skills/**/SKILL.md"
     ]
   }
   ```
4. `ln -sfn ../.agents/skills .opencode/skills`
5. If a legacy `agent.md` exists, rename it to `AGENTS.md`.
6. Run `opencode-cli settings chat.defaultAgent <this-project>`.

Verify the agent picks up the skills by starting a fresh session and
asking it to list the available skills.

## Stage 2 — Strip the previous design dependencies

Remove anything that conflicts with Tailwind + shadcn:

- If MUI: drop `@mui/*`, `@emotion/*`, `lib/theme.ts`, `MuiThemeProvider`.
- If Chakra: drop `@chakra-ui/*`, `ChakraProvider`.
- If Mantine: drop `@mantine/*`.
- If styled-components: keep ONLY if absolutely necessary; the system
  uses zero CSS-in-JS.
- Leave `lucide-react` alone if present, otherwise install it; the
  iconography rule is `lucide-react` exclusively.

## Stage 3 — Install the foundation

```sh
npm install -E \
  next@^16.2.6 react@^19.2.6 react-dom@^19.2.6 \
  tailwindcss@^4.1.9 @tailwindcss/postcss@^4.1.9 \
  @types/react@^19 @types/react-dom@^19 \
  next-themes@^0.4.6 lucide-react@^0.454.0 \
  class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.5.5 \
  @radix-ui/react-slot@^1.1.1 \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs @radix-ui/react-tooltip \
  tw-animate-css@^1.3.3 sonner@^1.7.4
```

(Add the rest of the Radix primitives the project actually needs.)

## Stage 4 — Copy the design tokens

1. Copy `<PATH>/app/globals.css` to this project's `app/globals.css`.
   This brings: `:root` light tokens, `.dark` Compass tokens, `@theme
   inline` bridges, depth utilities (`shadow-depth-btn|btn-active|card|
   card-lg|card-lg-hover|input|overlay`), motion tokens, syntax tokens,
   and the prefers-reduced-motion override.
2. Copy `<PATH>/app/layout.tsx`'s font setup (Outfit via
   `next/font/google`, weights 300–700, exposed as `--font-outfit`).
   IMPORTANT: per the `frontend-design` skill, consider picking a
   different distinctive display font for THIS project so two Mayda
   apps don't look identical. Outfit is the org default, not a
   mandate. Run `--design-system` from `ui-ux-pro-max` if unsure.

## Stage 5 — Copy the layout shell

Create `app/(admin)/layout.tsx` (or whatever route group the project
uses) that mirrors the reference:

- Body: `min-h-dvh bg-background text-foreground`
- Desktop sidebar: `fixed w-72 bg-sidebar` blends in the body
- Mobile sidebar: `Sheet` drawer with `bg-sidebar`
- Floating main panel: `bg-card md:rounded-2xl md:border md:shadow-depth-card-lg`
- Mobile menu trigger above the panel

Copy these components from the reference:

- `shared/ui/layout/sidebar.tsx` — adapt the nav items to this
  project's routes; preserve the 5-region structure (header bell+
  theme + brand, account selector, primary nav, settings parent with
  active-as-card and indented sub-menu, footer profile).
- `shared/ui/layout/page-header.tsx` — exact copy.
- `shared/ui/layout/setting-card.tsx` — exact copy.

## Stage 6 — Copy the shadcn primitives

Use shadcn-ui CLI or copy from the reference:

```sh
npx shadcn@latest init        # configures components.json
```

Then either run `npx shadcn add button card input badge dropdown-menu
sheet ...` for fresh shadcn primitives, OR copy `<PATH>/shared/ui/*`
to inherit the daisy-depth styling already applied.

If you choose fresh shadcn, you MUST then re-apply the daisy depth pass
(see Stage 8) to:

- Button: drop `rounded-full`, add `text-xs font-bold uppercase
  tracking-wider leading-none`, add `before:-inset-2` hit-slop, switch
  variants to `shadow-depth-btn` + `active:shadow-depth-btn-active`.
- Card: replace shadow with `shadow-depth-card`.
- Input: replace shadow with `shadow-depth-input`.
- Badge: drop `rounded-full` → `rounded-md`.
- Every overlay primitive (dropdown, popover, dialog, sheet, hover-
  card, menubar, context-menu, alert-dialog, toast, chart): replace
  `shadow-md/lg/xl` with `shadow-depth-overlay`.

## Stage 7 — Author project-specific docs

1. Write `PRODUCT.md` for this project. Copy `<PATH>/PRODUCT.md` as a
   skeleton, fill in: register (brand or product), users, brand voice,
   anti-references (CRITICAL — what aesthetics this project rejects),
   strategic principles. impeccable will load this on every session.
2. Write `AGENTS.md` (or copy + adjust). Keep the Skills section
   verbatim. Adjust the project-specific rules section.
3. Write `DESIGN.md` from the current state. Use the reference as a
   template. The simplest path: copy `<PATH>/DESIGN.md`, then run a
   `npm run build` and adapt the bits that don't reflect this
   project's chosen colors/components. Do NOT regenerate via
   `npx getdesign@latest`; the reference DESIGN.md is the up-to-date
   spec, the getdesign output is stale.

## Stage 8 — Skill-driven audit (mandatory)

Once the system compiles and renders, run the 4-phase audit from
MIGRATION_NOTES.md `Section 9` of the reference. Concretely:

### Phase 1 — Critical
- `impeccable.bans.em-dashes`: grep for `—` and replace with `: ` or
  `, ` or `.` Skip third-party files.
- `ui-ux-pro-max.readable-font-size`: every body paragraph must be
  ≥16px on mobile. PageHeader/SettingCard descriptions, empty-state
  copy, etc. → `text-base` (not `text-sm md:text-base`).
- `ui-ux-pro-max.touch-target-size`: Button base must include
  `relative before:absolute before:-inset-2 before:content-['']` so
  the visual stays compact but the hit zone is 44px.
- `ui-ux-pro-max.color-contrast`: measure WCAG ratios. The reference
  has a `node` script in commit `3977132` that computes contrast
  pairs. Fix any pair below 4.5:1 (introduce theme-adaptive tokens
  if needed; see `--accent-green` as a precedent).

### Phase 2 — High
- `impeccable.bans.identical-card-grids`: kill any `grid sm:grid-cols-3`
  with N icon+heading+text rectangles. Convert to `<ul>` with rows.
- `vercel.server-hoist-static-io`: every `<img>` becomes `<Image>`
  with `width / height / priority` for CLS=0.
- `impeccable.typography.scale-ratio`: ensure ≥1.25 ratio between
  every adjacent type scale step. text-lg (18px) right next to
  text-base (16px) is too close — bump to text-xl (20px) or text-base
  → text-sm.
- `impeccable.layout.nested-cards`: no card inside a card. Inner
  containers become `<section>` with `border-t pt-6 first:border-t-0`.

### Phase 3 — Medium
- `ui-ux-pro-max.animation.reduced-motion`: append the
  `@media (prefers-reduced-motion: reduce)` override at the bottom
  of `globals.css` (copy verbatim from the reference).
- `ui-ux-pro-max.number-tabular`: `tabular-nums` on every numeric
  display (totals, prices, latency values, counts).
- `ui-ux-pro-max.viewport-units`: `min-h-screen` → `min-h-dvh`,
  `100vh` → `100dvh` everywhere.
- `impeccable.color.never-pure-white`: shift `--card` and
  `--popover` light values from `oklch(100% 0 0)` to
  `oklch(99.5% 0.005 <brand-hue>)` for slight tinting.

### Phase 4 — Long-term
- `impeccable.setup.product-md`: write PRODUCT.md if not done in Stage 7.
- `vercel.bundle-defer-third-party`: audit third-party scripts. Vercel
  Analytics is already client-deferred (no wrapper needed). For
  Google Analytics, Mixpanel, etc., use `next/script
  strategy="afterInteractive"`.
- `impeccable.copy.no-restated-headings`: rewrite every PageHeader
  description so it does NOT paraphrase the title. Add information
  the title doesn't carry.

## Stage 9 — Verify

```sh
npm run build         # must succeed, all routes prerender
node -e "..."         # WCAG contrast script (copy from reference)
```

Manually verify in the browser:
- Light + dark theme toggle works (default to dark).
- Mobile sidebar in `Sheet`, desktop fixed.
- `/design-preview` (if you copied it) shows every token swatch.
- All admin routes share the same `w-full px-6 py-8 md:px-10 md:py-10`
  wrapper inside the floating panel.

## Stage 10 — Commit

One commit per stage, or one consolidated commit with the same
structure as `mayda-admin` commit `3977132`. Subject:
`feat(skills): apply 4 phases of skill-driven remediation`. Body
references each skill rule that was applied.

## Constraints throughout

- `impeccable.bans.em-dashes`: NEVER use `—` in code, comments, docs,
  or commit messages. Use `:`, `,`, `;`, `.`, or `()`.
- `impeccable.layout.nested-cards`: NEVER nest a card inside a card.
- `impeccable.color.never-pure-white`: NEVER use `#fff` or `#000`.
  Always tint toward the brand hue.
- `frontend-design.no-AI-generic-fonts`: NEVER use Inter, Roboto,
  Arial, or system fonts as the primary. Pick something distinctive.
- `ui-ux-pro-max.color-not-only`: status NEVER conveyed by color
  alone — always icon + text.
- Buttons NEVER `rounded-full`. Avatars, status dots, sliders,
  switches, scrollbars: `rounded-full`. Everything else: `rounded-md`
  or `rounded-xl`.
- All icons from `lucide-react`. No inline SVG (except for tiny
  decorative shapes like notification dots).
- `aria-current="page"` on every active nav `<Link>`.
- `aria-label` mandatory on every icon-only button.

## When in doubt

1. Read the matching `SKILL.md` for the design domain you're in.
2. Cross-reference `<PATH>/DESIGN.md` for the canonical answer.
3. If there's still ambiguity, run the `grill-me` skill to surface the
   missing decision before writing code.

End of prompt.
```

---

## What to expect from a fresh agent

A OpenCode session given this prompt + a path to `mayda-admin` will:

1. Take 5–10 turns to read the references and skills.
2. Take ~5 turns to set up `.opencode/agents/<this-project>.json` and skill symlinks.
3. Take 2–4 turns to strip MUI/Chakra/etc. if present.
4. Take 5–10 turns to install + copy the foundation.
5. Take 10–20 turns to apply the 4 audit phases.

Plan ~30–50 turns total for a small-medium project (10–30 files). Larger projects scale linearly with the number of files that need re-skinning.

## What to verify manually after

The agent can self-verify the build, but you should still:

- **Test contrast in dark mode.** The Compass palette assumes you're not adding new text colors that aren't in the token set. If you do, run the contrast script.
- **Toggle reduced-motion in OS settings.** Animations should stop.
- **Run on iOS Safari.** Confirm `min-h-dvh` actually works (URL bar doesn't break the layout).
- **Tab through every page.** Focus rings visible everywhere, tab order matches visual order.
- **Run a real screen reader (VoiceOver / NVDA) on the dashboard.** Empty-state skeletons should announce "image" with their aria-labels.

## Maintenance

When the design system evolves in `mayda-admin`:

- Update `DESIGN.md` first.
- Update `MIGRATION_NOTES.md` to reflect what changed and when.
- The source-of-truth always wins; this prompt should pull from the latest reference at the time of running, not from a frozen snapshot.

---

## Skill upgrade path

If `npx skills update` introduces breaking rule changes:

1. Re-read the updated `SKILL.md`.
2. Re-run the audit phases against the existing project.
3. Update DESIGN.md to reflect any new patterns or banned anti-patterns.
4. Update this prompt's `## Constraints` section to mirror the new rules.

# Component Design System — @mayda/admin

> **Warning: destructive directive.** Before applying this document, delete every existing third-party component library in the project:
>
> ```sh
> # MUI
> npm rm @mui/material @mui/icons-material @mui/system @emotion/react @emotion/styled
> # Chakra
> npm rm @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled
> # Mantine
> npm rm @mantine/core @mantine/hooks @mantine/form @mantine/notifications
> # Ant Design
> npm rm antd @ant-design/icons
> # PrimeReact / PrimeNG / etc
> npm rm primereact primeicons
> # Bootstrap
> npm rm react-bootstrap bootstrap
> # shadcn/ui — keep, this project uses it
> # (do NOT remove @radix-ui/*, class-variance-authority, clsx, tailwind-merge)
> ```
>
> Only **shadcn/ui** (Radix primitives + CVA) is permitted. This document is the single source of truth for every component spec.

---

## Design DNA

| Trait | Value |
|---|---|
| **Primary color** | MongoDB green `oklch(82% 0.24 150)` / `#00ed64` |
| **Dark theme** | Compass palette (teal-blacks, not grays) |
| **Font** | Outfit (weights 300–700), exposed as `--font-outfit` |
| **Monospace** | Source Code Pro |
| **Shadows** | Daisy-inspired depth system (`shadow-depth-*`) |
| **Radius default** | `rounded-md` (8px). No pill buttons. |
| **Motion** | `150ms cubic-bezier(0.16, 1, 0.3, 1)` everywhere |
| **Dark default** | `next-themes` with `defaultTheme="dark"`, `enableSystem={false}` |

---

## CSS Custom Properties Reference

All tokens live in `app/globals.css`. Every component MUST reference these variables; NO hardcoded colors, radii, or shadows.

### Surfaces

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `oklch(97.5% 0.003 160)` | `#0e1f26` | Page background (grey body) |
| `--foreground` | `oklch(15% 0.025 250)` | `#ffffff` | Primary text |
| `--card` | `oklch(99.5% 0.005 150)` | `#0e1f26` | Card, panel surfaces |
| `--card-foreground` | `oklch(15% 0.025 250)` | `#ffffff` | Text on card |
| `--popover` | `oklch(99.5% 0.005 150)` | `#112329` | Dropdowns, menus, sheets |
| `--popover-foreground` | `oklch(15% 0.025 250)` | `#ffffff` | Text on popover |

### Brand

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | `oklch(82% 0.24 150)` | `#00ed64` | Primary CTA, active states |
| `--primary-foreground` | `oklch(15% 0.025 250)` | `#001e2b` | Text on primary |
| `--primary-deep` | `oklch(64% 0.22 150)` | `#00684a` | Hover/pressed alt |
| `--primary-pressed` | `oklch(55% 0.20 150)` | `#008c34` | Active/pressed state |

### Surfaces Soft

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--secondary` | `oklch(98.5% 0.003 160)` | `#1a2d34` | Secondary button, tabs list |
| `--secondary-foreground` | `oklch(15% 0.025 250)` | `#ffffff` | Text on secondary |
| `--muted` | `oklch(97% 0.004 160)` | `#1a2d34` | Muted backgrounds, skeleton |
| `--muted-foreground` | `oklch(48% 0.02 260)` | `#b8c2c4` | Secondary text, placeholders |
| `--accent` | `oklch(98.5% 0.003 160)` | `#1a2d34` | Hover surfaces, slider range |
| `--accent-foreground` | `oklch(20% 0.02 260)` | `#ffffff` | Text on accent |

### Status

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--destructive` | `oklch(58% 0.22 22)` | `#db3030` | Destructive actions, errors |
| `--destructive-foreground` | `oklch(100% 0 0)` | `#ffffff` | Text on destructive |
| `--success` | `oklch(63% 0.16 145)` | `#15b273` | Success indicators |
| `--warning` | `oklch(80% 0.18 80)` | `#e27a3f` | Warning indicators |
| `--attention` | `oklch(76% 0.18 75)` | `#e27a3f` | Attention signals |

### Borders & Focus

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--border` | `oklch(91% 0.005 220)` | `#1c353c` | Standard borders, dividers |
| `--input` | `oklch(81% 0.01 230)` | `#1a2d34` | Input borders |
| `--ring` | `oklch(47% 0.13 165)` | `#00ed64` | Focus rings |

### Extended Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--brand-green` | `oklch(82% 0.24 150)` | `#00ed64` | Brand accent |
| `--brand-green-dark` | `oklch(47% 0.13 165)` | `#00684a` | Link text |
| `--accent-green` | `oklch(47% 0.13 165)` | `#00ed64` | Accessible green for text |
| `--accent-purple` | `oklch(50% 0.28 290)` | — | Category tags |
| `--accent-orange` | `oklch(65% 0.24 45)` | `#e27a3f` | Category tags, warning |
| `--surface-feature` | `oklch(96.5% 0.04 150)` | — | Featured pricing tier |
| `--hairline-strong` | `oklch(81% 0.01 230)` | `#1c353c` | Stronger borders |

### Syntax (Code Display)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--syntax-key` | `#2563eb` | `#4fb4d7` | JSON keys, properties |
| `--syntax-string` | `#047857` | `#15b273` | String values |
| `--syntax-number` | `#c2410c` | `#e27a3f` | Numbers, booleans |
| `--syntax-punctuation` | `#475569` | `#b8c2c4` | `:`, `{`, `}`, types |

### Motion

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover, active, focus transitions |
| `--duration-normal` | `200ms` | Entrance animations |
| `--duration-slow` | `300ms` | Sheet, dialog open/close |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default easing |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Accordion, collapsible |

### Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | `4px` | Checkbox, color swatches |
| `--radius-sm` | `6px` | Small tags, code chips |
| `--radius-md` | `8px` | Buttons, inputs, badges, all standard controls |
| `--radius-lg` | `12px` (`--radius`) | Cards, dialogs, sheets |
| `--radius-xl` | `16px` | Larger feature panels |
| `--radius-xxl` | `24px` | Featured product showcases |
| `--radius-full` | `9999px` | Avatars, status dots, sliders, switches, scrollbars |

---

## Depth Shadow Utilities

Defined as `@utility` in `app/globals.css`. Both light and `.dark` variants exist.

| Utility | Light | Dark | Components |
|---|---|---|---|
| `shadow-depth-btn` | Inset highlight + close drop | Softer highlight, deeper shadow | Buttons, toggles, nav items, menubars |
| `shadow-depth-btn-active` | Inset shadow only | Deeper inset shadow | Button active/pressed states |
| `shadow-depth-card` | Inset highlight + 4-layer ambient | Softer highlight + 40% ambient | Cards, floating settings panels |
| `shadow-depth-card-lg` | 5-layer shadow | Dark version | Larger feature cards |
| `shadow-depth-card-lg-hover` | Elevated on hover | Dark version | Card hover states |
| `shadow-depth-input` | `inset 0 1px 2px` | `inset 0 1px 2px` | Inputs, textareas, selects, switches, radios, checkboxes |
| `shadow-depth-overlay` | Inset highlight + 5-layer float | Dark version | Dialogs, sheets, dropdowns, popovers, menus, tooltips, toasts |

---

## Micro-animations

Globally defined keyframes:

| Animation | Effect | Class |
|---|---|---|
| `mongodb-fade-in` | `opacity 0→1`, `translateY(4px→0)` | `.animate-mongodb-fade-in` |
| `mongodb-scale-in` | `opacity 0→1`, `scale(0.96→1)` | `.animate-mongodb-scale-in` |
| `mongodb-slide-up` | `opacity 0→1`, `translateY(8px→0)` | `.animate-mongodb-slide-up` |

Global transitions on all interactive elements:

```css
button, a, input, select, textarea,
[role='button'], [data-slot='button'], [data-slot='card'] {
  transition: all var(--duration-fast) var(--ease-out);
  transition-property: transform, box-shadow, background-color, border-color, color, opacity;
}
```

Card hover: `translateY(-1px)` (no shadow change — shadow is always present).
Button active: `translateY(0.5px)`.

**Reduced motion:** When `prefers-reduced-motion: reduce`, all animations and transitions collapse to `0.01ms`, hover lift and active translate are cancelled.

---

## Component Specifications

Every component follows the same conventions:

```
- data-slot="component-name" on every root element
- cn() from @/lib/utils for class merging
- Focus ring: focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
- Error: aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
- Disabled: disabled:pointer-events-none disabled:opacity-50
- Outline: outline-none
- SVG: [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
- Transition: transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]
```

---

### Accordion

**Primitive:** `@radix-ui/react-accordion`

| Slot | Styling |
|---|---|
| `data-slot="accordion-item"` | `border-b last:border-b-0` |
| `data-slot="accordion-trigger"` | `flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180` |
| `data-slot="accordion-content"` | `overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down` |
| Chevron icon | `text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200` |

---

### Alert

**Variants (CVA):**
- `default`: `bg-card text-card-foreground`
- `destructive`: `text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90`

| Slot | Styling |
|---|---|
| `data-slot="alert"` | Grid layout: `has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5` |
| `data-slot="alert-title"` | `col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight` |
| `data-slot="alert-description"` | `text-muted-foreground col-start-2` |
| Icon | `[&>svg]:size-4 [&>svg]:translate-y-0.5` |

---

### AlertDialog

**Primitive:** `@radix-ui/react-alert-dialog`

| Slot | Styling |
|---|---|
| `data-slot="alert-dialog-overlay"` | `fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0` |
| `data-slot="alert-dialog-content"` | `bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-depth-overlay duration-200 sm:max-w-lg` |
| `data-slot="alert-dialog-header"` | `flex flex-col gap-2 text-center sm:text-left` |
| `data-slot="alert-dialog-footer"` | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| `data-slot="alert-dialog-title"` | `text-lg font-semibold` |
| `data-slot="alert-dialog-description"` | `text-muted-foreground text-sm` |
| Action | Uses `buttonVariants({ variant: 'default' })` |
| Cancel | Uses `buttonVariants({ variant: 'outline' })` |

---

### Avatar

**Primitive:** `@radix-ui/react-avatar`

| Slot | Styling |
|---|---|
| `data-slot="avatar"` | `relative flex size-8 shrink-0 overflow-hidden rounded-full` |
| `data-slot="avatar-image"` | `aspect-square size-full` |
| `data-slot="avatar-fallback"` | `bg-muted flex size-full items-center justify-center rounded-full` |

---

### Badge

**Primitive:** Native. **Variants (CVA):**

| Variant | Styling |
|---|---|
| `default` | `border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90` |
| `secondary` | `border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90` |
| `destructive` | `border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 dark:bg-destructive/60` |
| `outline` | `text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground` |

**Base:** `inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0`
- **NOT** `rounded-full` by default. For pill-shaped status indicators (e.g., "Live" dot), apply `rounded-full` per-instance.
- Supports `asChild` via `Slot`.

---

### Button

**Primitive:** Native (with `Slot` for polymorphism). **Variants (CVA):**

| Variant | Styling |
|---|---|
| `default` | `bg-primary text-primary-foreground border border-primary/20 shadow-depth-btn hover:bg-primary/95 active:shadow-depth-btn-active` |
| `destructive` | `bg-destructive text-white border border-destructive/30 shadow-depth-btn hover:bg-destructive/95 active:shadow-depth-btn-active dark:bg-destructive/70` |
| `outline` | `border bg-card text-foreground shadow-depth-btn hover:bg-accent hover:text-accent-foreground active:shadow-depth-btn-active` |
| `secondary` | `bg-secondary text-secondary-foreground border border-border shadow-depth-btn hover:bg-secondary/85 active:shadow-depth-btn-active` |
| `ghost` | `hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50` |
| `link` | `text-accent-green underline-offset-4 hover:underline p-0 normal-case tracking-normal font-semibold` |

**Sizes:**

| Size | Styling |
|---|---|
| `default` | `px-3 py-1.5` |
| `sm` | `px-2.5 py-1 text-[11px]` |
| `lg` | `px-4 py-2` |
| `icon` | `size-7 p-0` |

**Typography:** `text-xs font-bold uppercase tracking-wider leading-none`

**Touch zone:** `relative before:absolute before:-inset-2 before:content-['']` — extends hit area to 44px without changing visual size.

**Data attributes:** `data-slot="button"`, `data-variant={variant}`

**Constraints:**
- `rounded-md` not `rounded-full`.
- `arrow-current="page"` on every active nav `<Link>`.
- `aria-label` mandatory on every icon-only button.
- Status NEVER conveyed by color alone — always icon + text.

---

### Calendar (react-day-picker v9)

**Primitive:** `react-day-picker`

| Element | Styling |
|---|---|
| Root | `bg-background p-3` |
| DayButton (selected) | `data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground` |
| DayButton (range start/end) | `data-[range-start=true]:bg-primary data-[range-end=true]:bg-primary` |
| DayButton (range middle) | `data-[range-middle=true]:bg-accent` |
| DayButton (today) | `bg-accent text-accent-foreground` |
| DayButton (outside month) | `text-muted-foreground` |
| Nav buttons | Uses `buttonVariants({ variant: buttonVariant })` |
| Month/year dropdown | `border border-input shadow-depth-input` |
| Cell style | `--cell-size: --spacing(8)` |

---

### Card

**Primitive:** Native. **No variants** (CVA not used).

| Slot | Styling |
|---|---|
| `data-slot="card"` | `bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-depth-card` |
| `data-slot="card-header"` | `@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6` |
| `data-slot="card-title"` | `leading-none font-semibold` (polymorphic: `div | h1-h6 | p`) |
| `data-slot="card-description"` | `text-muted-foreground text-sm` |
| `data-slot="card-action"` | `col-start-2 row-span-2 row-start-1 self-start justify-self-end` |
| `data-slot="card-content"` | `px-6` |
| `data-slot="card-footer"` | `flex items-center px-6 [.border-t]:pt-6` |

**Constraint:** NEVER nest a card inside a card. Inner containers become `<section>` with `border-t pt-6 first:border-t-0`.

---

### Carousel (embla-carousel-react)

**Primitive:** `embla-carousel-react`

| Slot | Styling |
|---|---|
| `data-slot="carousel"` | `relative` |
| `data-slot="carousel-content"` | `overflow-hidden` |
| `data-slot="carousel-item"` | `min-w-0 shrink-0 grow-0 basis-full` |
| Previous/Next buttons | `absolute size-8 rounded-full` using `Button` (`outline` variant, `icon` size) |

---

### Chart (Recharts) — `chart.tsx`

**Primitive:** `recharts`

| Component | Styling |
|---|---|
| `ChartContainer` | `flex aspect-video justify-center text-xs` |
| `ChartTooltipContent` | `border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-depth-overlay` |
| `ChartLegendContent` | `flex items-center justify-center gap-4` |
| Indicator dot | `size-2.5` |
| Indicator line | `w-1` |
| Grid lines | stroke `--border/50` |
| Axis ticks | fill `--muted-foreground` |

---

### Checkbox

**Primitive:** `@radix-ui/react-checkbox`

| Slot | Styling |
|---|---|
| `data-slot="checkbox"` | `peer border-input dark:bg-input/30 size-4 shrink-0 rounded-xs border shadow-depth-input` |
| Checked state | `data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary` |
| Indicator | Centered check icon |

---

### Command (cmdk)

**Primitive:** `cmdk`

| Slot | Styling |
|---|---|
| `data-slot="command"` | `bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md` |
| `data-slot="command-input"` | `flex h-9 items-center gap-2 border-b px-3` with SearchIcon |
| `data-slot="command-list"` | `max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto` |
| `data-slot="command-empty"` | `py-6 text-center text-sm` |
| `data-slot="command-group"` | `overflow-hidden p-1`, heading: `text-muted-foreground px-2 py-1.5 text-xs font-medium` |
| `data-slot="command-item"` | `data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-sm px-2 py-1.5 text-sm` |
| `data-slot="command-shortcut"` | `text-muted-foreground ml-auto text-xs tracking-widest` |

---

### Dialog

**Primitive:** `@radix-ui/react-dialog`

| Slot | Styling |
|---|---|
| `data-slot="dialog-overlay"` | `fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0` |
| `data-slot="dialog-content"` | `bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-depth-overlay duration-200 sm:max-w-lg` |
| `data-slot="dialog-header"` | `flex flex-col gap-2 text-center sm:text-left` |
| `data-slot="dialog-footer"` | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| `data-slot="dialog-title"` | `text-lg leading-none font-semibold` |
| `data-slot="dialog-description"` | `text-muted-foreground text-sm` |
| Close button | `absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100` |

---

### Drawer (vaul)

**Primitive:** `vaul` (direction-aware)

| Side | Content styling |
|---|---|
| `top` | `inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b` |
| `bottom` | `inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t` |
| `right` | `inset-y-0 right-0 w-3/4 border-l sm:max-w-sm` |
| `left` | `inset-y-0 left-0 w-3/4 border-r sm:max-w-sm` |
| Overlay | `fixed inset-0 z-50 bg-black/50` |
| Drag handle | `bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full` (bottom only) |
| Title | `text-foreground font-semibold` |
| Description | `text-muted-foreground text-sm` |

---

### DropdownMenu / ContextMenu / Menubar

All three share the same internal structure (Radix primitives).

**Primitives:** `@radix-ui/react-dropdown-menu`, `@radix-ui/react-context-menu`, `@radix-ui/react-menubar`

| Slot | Styling |
|---|---|
| `*-content` | `bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-depth-overlay` |
| `*-item` | `focus:bg-accent focus:text-accent-foreground rounded-sm px-2 py-1.5 text-sm` |
| `*-checkboxitem` / `*-radioitem` | `rounded-sm py-1.5 pr-2 pl-8 text-sm` |
| `*-label` | `px-2 py-1.5 text-sm font-medium` |
| `*-separator` | `bg-border -mx-1 my-1 h-px` |
| `*-shortcut` | `text-muted-foreground ml-auto text-xs tracking-widest` |

**Item variants:** `default` / `destructive` via `data-variant` attribute.
**Inset items:** `data-[inset]:pl-8` for indented items.

---

### Form (react-hook-form)

**Primitive:** `react-hook-form`

| Slot | Styling |
|---|---|
| `data-slot="form-item"` | `grid gap-2` |
| `data-slot="form-label"` | `data-[error=true]:text-destructive` |
| `data-slot="form-control"` | Wraps children via `Slot` |
| `data-slot="form-description"` | `text-muted-foreground text-sm` |
| `data-slot="form-message"` | `text-destructive text-sm` |

---

### HoverCard

**Primitive:** `@radix-ui/react-hover-card`

| Slot | Styling |
|---|---|
| `data-slot="hover-card-content"` | `bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-depth-overlay` (animate in/out with zoom + slide) |

---

### Input

**Primitive:** Native.

| State | Styling |
|---|---|
| Base | `flex h-9 w-full min-w-0 rounded-md border bg-card px-3 py-2 text-sm shadow-depth-input` |
| Border | `border-hairline-strong` |
| Focus | `focus-visible:border-primary/60 focus-visible:ring-ring/50 focus-visible:ring-[3px]` |
| Error | `aria-invalid:ring-destructive/20 aria-invalid:border-destructive` |
| File input | `file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium` |
| Selection | `selection:bg-primary selection:text-primary-foreground` |
| Placeholder | `placeholder:text-muted-foreground` |
| Disabled | `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50` |

---

### InputOTP

**Primitive:** `input-otp`

| Slot | Styling |
|---|---|
| Container | `flex items-center gap-2 has-disabled:opacity-50` |
| Slot | `flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-depth-input first:rounded-l-md first:border-l last:rounded-r-md` |
| Active | `data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:z-10 data-[active=true]:ring-[3px]` |
| Fake caret | `animate-caret-blink bg-foreground h-4 w-px duration-1000` |

---

### Label

**Primitive:** `@radix-ui/react-label`

| Slot | Styling |
|---|---|
| `data-slot="label"` | `flex items-center gap-2 text-sm leading-none font-medium select-none` |
| Disabled | `group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50` |

---

### NavigationMenu

**Primitive:** `@radix-ui/react-navigation-menu`

| Slot | Styling |
|---|---|
| `data-slot="navigation-menu"` | `group/navigation-menu relative flex max-w-max flex-1 items-center justify-center` |
| `data-slot="navigation-menu-list"` | `group flex flex-1 list-none items-center justify-center gap-1` |
| `data-slot="navigation-menu-trigger"` | `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent` |
| `data-slot="navigation-menu-viewport"` | `bg-popover text-popover-foreground rounded-md border shadow` |
| `data-slot="navigation-menu-link"` | `rounded-sm p-2 text-sm` |

---

### Pagination

**Sizes/variants:** Uses `buttonVariants`.

| Slot | Styling |
|---|---|
| `data-slot="pagination"` | `mx-auto flex w-full justify-center` |
| `data-slot="pagination-content"` | `flex flex-row items-center gap-1` |
| `data-slot="pagination-link"` (active) | `buttonVariants({ variant: 'outline', size: 'icon' })` |
| `data-slot="pagination-link"` (inactive) | `buttonVariants({ variant: 'ghost', size: 'icon' })` |
| `data-slot="pagination-ellipsis"` | `flex size-9 items-center justify-center` |

---

### Popover

**Primitive:** `@radix-ui/react-popover`

| Slot | Styling |
|---|---|
| `data-slot="popover-content"` | `bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-depth-overlay` (animate in/out with zoom + slide) |

---

### Progress

**Primitive:** `@radix-ui/react-progress`

| Slot | Styling |
|---|---|
| `data-slot="progress"` | `bg-primary/20 relative h-2 w-full overflow-hidden rounded-full` |
| `data-slot="progress-indicator"` | `bg-primary h-full w-full flex-1 transition-all` (inline `transform: translateX(-${100 - value}%)`) |

---

### RadioGroup

**Primitive:** `@radix-ui/react-radio-group`

| Slot | Styling |
|---|---|
| `data-slot="radio-group"` | `grid gap-3` |
| `data-slot="radio-group-item"` | `border-input text-primary aspect-square size-4 shrink-0 rounded-full border shadow-depth-input` |
| Indicator | CircleIcon `fill-primary size-2` centered via absolute positioning |

---

### ScrollArea

**Primitive:** `@radix-ui/react-scroll-area`

| Slot | Styling |
|---|---|
| `data-slot="scroll-area"` | `relative` |
| `data-slot="scroll-area-viewport"` | `size-full rounded-[inherit]` |
| `data-slot="scroll-area-scrollbar"` | `flex touch-none p-px transition-colors select-none` (vertical: `h-full w-2.5`, horizontal: `h-2.5 flex-col`) |
| `data-slot="scroll-area-thumb"` | `bg-border relative flex-1 rounded-full` |

---

### Select

**Primitive:** `@radix-ui/react-select`

| Slot | Styling |
|---|---|
| `data-slot="select-trigger"` | `border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-depth-input` |
| `data-slot="select-content"` | `bg-popover text-popover-foreground z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] rounded-md border shadow-depth-overlay` |
| `data-slot="select-item"` | `focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm` |
| `data-slot="select-label"` | `text-muted-foreground px-2 py-1.5 text-xs` |
| `data-slot="select-separator"` | `bg-border -mx-1 my-1 h-px` |

**Sizes:** `default`: `h-9`, `sm`: `h-8`.

---

### Separator

**Primitive:** `@radix-ui/react-separator`

| Attribute | Styling |
|---|---|
| `data-slot="separator"` | `bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px` |

---

### Sheet

**Primitive:** `@radix-ui/react-dialog` (reused)

**Side variants (prop):** `top`, `right`, `bottom`, `left`

| Slot | Styling |
|---|---|
| `data-slot="sheet-overlay"` | `fixed inset-0 z-50 bg-black/50` |
| `data-slot="sheet-content"` (right) | `bg-background fixed inset-y-0 right-0 h-full w-3/4 border-l shadow-depth-overlay sm:max-w-sm` |
| `data-slot="sheet-content"` (left) | `bg-background fixed inset-y-0 left-0 h-full w-3/4 border-r shadow-depth-overlay sm:max-w-sm` |
| `data-slot="sheet-content"` (top) | `bg-background fixed inset-x-0 top-0 h-auto border-b shadow-depth-overlay` |
| `data-slot="sheet-content"` (bottom) | `bg-background fixed inset-x-0 bottom-0 h-auto border-t shadow-depth-overlay` |
| `data-slot="sheet-header"` | `flex flex-col gap-1.5 p-4` |
| `data-slot="sheet-footer"` | `mt-auto flex flex-col gap-2 p-4` |
| `data-slot="sheet-title"` | `text-foreground font-semibold` |
| `data-slot="sheet-description"` | `text-muted-foreground text-sm` |

**Animation:** `data-[state=open]:animate-in data-[state=closed]:animate-out`, slide direction matches side. Close: 300ms, Open: 500ms.

---

### Skeleton

| Slot | Styling |
|---|---|
| `data-slot="skeleton"` | `bg-accent animate-pulse rounded-md` |

---

### Slider

**Primitive:** `@radix-ui/react-slider`

| Slot | Styling |
|---|---|
| `data-slot="slider"` | `relative flex w-full touch-none items-center select-none` |
| `data-slot="slider-track"` | `bg-muted relative grow overflow-hidden rounded-full` (h: `h-1.5`, v: `w-1.5`) |
| `data-slot="slider-range"` | `bg-primary absolute` |
| `data-slot="slider-thumb"` | `border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-depth-btn hover:ring-4 focus-visible:ring-4` |

---

### Switch

**Primitive:** `@radix-ui/react-switch`

| Slot | Styling |
|---|---|
| `data-slot="switch"` | `peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-depth-input data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80` |
| `data-slot="switch-thumb"` | `bg-background block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0` |

---

### Table

**Primitive:** Native.

| Slot | Styling |
|---|---|
| `data-slot="table-container"` | `relative w-full overflow-x-auto` |
| `data-slot="table"` | `w-full caption-bottom text-sm` |
| `data-slot="table-header"` | `[&_tr]:border-b` |
| `data-slot="table-body"` | `[&_tr:last-child]:border-0` |
| `data-slot="table-footer"` | `bg-muted/50 border-t font-medium` |
| `data-slot="table-row"` | `hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors` |
| `data-slot="table-head"` | `text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap` |
| `data-slot="table-cell"` | `p-2 align-middle whitespace-nowrap` |
| `data-slot="table-caption"` | `text-muted-foreground mt-4 text-sm` |

---

### Tabs

**Primitive:** `@radix-ui/react-tabs`

| Slot | Styling |
|---|---|
| `data-slot="tabs"` | `flex flex-col gap-2` |
| `data-slot="tabs-list"` | `bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]` |
| `data-slot="tabs-trigger"` | `inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:shadow-sm` |
| `data-slot="tabs-content"` | `flex-1 outline-none` |

---

### Textarea

**Primitive:** Native.

| State | Styling |
|---|---|
| Base | `border-input flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-depth-input md:text-sm` |
| Focus | `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` |
| Error | `aria-invalid:ring-destructive/20 aria-invalid:border-destructive` |
| Dark | `dark:bg-input/30` |

---

### Toggle

**Primitive:** `@radix-ui/react-toggle`

**Variants (CVA):**
- `default`: `bg-transparent`
- `outline`: `border border-input bg-transparent shadow-depth-btn hover:bg-accent hover:text-accent-foreground`

**Sizes:** `default`: `h-9 px-2 min-w-9`, `sm`: `h-8 px-1.5 min-w-8`, `lg`: `h-10 px-2.5 min-w-10`

**Base:** `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`

---

### ToggleGroup

**Primitive:** `@radix-ui/react-toggle-group`

| Slot | Styling |
|---|---|
| `data-slot="toggle-group"` | `group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-depth-btn` |
| `data-slot="toggle-group-item"` | Applies `toggleVariants`, joined siblings: `min-w-0 flex-1 shrink-0 rounded-none first:rounded-l-md last:rounded-r-md` |

---

### Tooltip

**Primitive:** `@radix-ui/react-tooltip` (`delayDuration={0}`)

| Slot | Styling |
|---|---|
| `data-slot="tooltip-content"` | `bg-primary text-primary-foreground z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance animate-in fade-in-0 zoom-in-95` |
| Arrow | `bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]` |

---

### Toast / Sonner

**Primitive:** `@radix-ui/react-toast` + `sonner`

**Toast variants (CVA):**
- `default`: `border bg-background text-foreground`
- `destructive`: `destructive group border-destructive bg-destructive text-destructive-foreground`

| Slot | Styling |
|---|---|
| Toast root | `group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-depth-overlay` |
| `ToastViewport` | `fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]` |
| `ToastAction` | `inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium` |
| `ToastClose` | `absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 hover:text-foreground group-hover:opacity-100` |
| `ToastTitle` | `text-sm font-semibold` |
| `ToastDescription` | `text-sm opacity-90` |

**Sonner Toaster** uses `--normal-bg: var(--popover)`, `--normal-text: var(--popover-foreground)`, `--normal-border: var(--border)`.

---

### Layout Components

#### Sidebar (`shared/ui/layout/sidebar.tsx`)

5-region structure:

| Region | Styling |
|---|---|
| Container | `flex h-full w-full flex-col gap-4 text-foreground` |
| Header | Logo + theme toggle (`grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent`) + notification bell with red dot |
| Account selector | `rounded-lg border bg-card px-2 shadow-depth-btn` with Free badge `bg-background border px-1.5 text-[10px] font-semibold uppercase` |
| Primary nav | `group flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium` — Active: `border bg-card shadow-depth-btn`, Inactive: `text-foreground/75 hover:bg-accent hover:text-foreground` |
| Settings group | Active group: `rounded-lg border bg-card shadow-depth-card p-1` with sub-items using `border-l border-border ml-5 pl-4` |
| Footer profile | Avatar `rounded-full bg-accent-purple text-sm font-semibold text-white` |

#### PageHeader (`shared/ui/layout/page-header.tsx`)

| Slot | Styling |
|---|---|
| Container | `flex flex-col gap-3 md:flex-row md:items-end md:justify-between` |
| Title | `text-2xl font-semibold tracking-tight md:text-3xl` |
| Description | `max-w-prose text-base text-muted-foreground` |
| Actions | `flex shrink-0 gap-2` |

**Constraint:** Description must NOT paraphrase the title — add information the title doesn't carry.

#### SettingCard (`shared/ui/layout/setting-card.tsx`)

| Slot | Styling |
|---|---|
| Section row | `border-t pt-6 first:border-t-0 first:pt-0` |
| Content | `flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8` |
| Title | `text-base font-semibold` |
| Description | `text-base text-muted-foreground` |
| Save footer | `border-t pt-3`, contains `Button size="sm"` |

---

## Absolute Bans

| Rule | Origin | Details |
|---|---|---|
| No em-dashes | `impeccable.bans.em-dashes` | NEVER use `—` in code, comments, docs, or commit messages. Use `:`, `,`, `;`, `.`, or `()`. |
| No nested cards | `impeccable.layout.nested-cards` | NEVER nest a card inside a card. Inner containers become `<section>` with `border-t pt-6 first:border-t-0`. |
| No pure white/black | `impeccable.color.never-pure-white` | NEVER use `#fff` or `#000`. Always tint toward brand hue (`oklch(99.5% 0.005 <hue>)` for light values, `oklch(15% 0.025 250)` or Compass `#0e1f26` for dark). |
| No AI-generic fonts | `frontend-design.no-AI-generic-fonts` | NEVER use Inter, Roboto, Arial, or system fonts as the primary. Outfit is the org default. |
| No color-only status | `ui-ux-pro-max.color-not-only` | Status NEVER conveyed by color alone — always icon + text. |
| No pill buttons | Design DNA | Buttons are `rounded-md`. Avatars, status dots, sliders, switches, scrollbars: `rounded-full`. Everything else: `rounded-md` or `rounded-xl`. |
| No inline SVG | Design DNA | All icons from `lucide-react` exclusively (except tiny decorative shapes like notification dots). |
| No card grids | `impeccable.bans.identical-card-grids` | Kill any `grid sm:grid-cols-3` with N icon+heading+text rectangles. Convert to `<ul>` with rows. |
| No `img` tags | `vercel.server-hoist-static-io` | Every `<img>` becomes `<Image>` with `width / height / priority`. |
| No `100vh` | `ui-ux-pro-max.viewport-units` | `min-h-screen` → `min-h-dvh`, `100vh` → `100dvh`. |

---

## Accessibility Requirements

| Requirement | Enforcement |
|---|---|
| `aria-current="page"` | Every active nav `<Link>` |
| `aria-label` | Every icon-only button |
| Touch target ≥44px | Buttons: `before:-inset-2` hit-slop |
| Body font size ≥16px mobile | Every paragraph `text-base` |
| WCAG contrast ≥4.5:1 | Use `--accent-green` instead of `--primary` for text on light backgrounds |
| `tabular-nums` | Every numeric display (totals, prices, latency, counts) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` override in `globals.css` |
| Skip to content link | First focusable element on every page |

---

## Theme Provider

```tsx
// apps/layout.tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
  {children}
</ThemeProvider>
```

- Default theme: **dark** (Compass palette)
- Light/dark toggle via `next-themes` `useTheme()` hook
- Class-based switching (`.dark` on `<html>`)

---

## Package Dependencies

Core (always required):
- `next@^16`, `react@^19`, `react-dom@^19`
- `tailwindcss@^4`, `@tailwindcss/postcss@^4`
- `next-themes@^0.4.6`
- `lucide-react@^0.454.0`
- `class-variance-authority@^0.7.1`, `clsx@^2.1.1`, `tailwind-merge@^2.5.5`
- `tw-animate-css@^1.3.3`

Radix primitives (install as needed):
- `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`

Additional (install as needed):
- `react-hook-form`, `@hookform/resolvers`, `zod` (forms)
- `cmdk` (command palette)
- `vaul` (drawer)
- `sonner` (toast)
- `embla-carousel-react` (carousel)
- `react-day-picker@9` (calendar)
- `recharts` (chart)
- `react-resizable-panels` (resizable)
- `input-otp` (OTP input)
- `date-fns` (date formatting)
- `@vercel/analytics` (analytics)

---

## Generated from

This document was generated from the `mayda-admin` reference project at commit `3977132`. It reflects the state of the design system after the daisy depth pass and 4-phase skill-driven audit.

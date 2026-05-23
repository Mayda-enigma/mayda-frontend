---
version: 1.0
name: nested-admin-design-system
description: Portable admin design system. Combines a nested floating-card shell (grey body in light, Compass teal-blue in dark + transparent sidebar + white/teal rounded content panel) with DaisyUI-inspired component depth (inset highlight + layered shadow + press effect), Outfit typography, MongoDB-green primary, and the **MongoDB Compass dark palette** as the default theme. Built for Next.js + Tailwind CSS v4 + shadcn-ui primitives. Designed to be lifted into any admin/SaaS app in the same organization with a single CSS import + a dozen small components.

font:
  family-sans: Outfit
  family-mono: Source Code Pro
  fallback-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
  fallback-mono: 'SF Mono', Menlo, Consolas, monospace
  loader: next/font/google
  variable: --font-outfit
  weights: [300, 400, 500, 600, 700]

colors-light:
  background: oklch(97.5% 0.003 160)        # soft grey body: sidebar inherits this
  foreground: oklch(15% 0.025 250)          # primary text (deep navy-teal)
  card: oklch(100% 0 0)                     # white floating panels
  card-foreground: oklch(15% 0.025 250)
  popover: oklch(100% 0 0)
  popover-foreground: oklch(15% 0.025 250)

  primary: oklch(82% 0.24 150)              # MongoDB-inspired bright green
  primary-foreground: oklch(15% 0.025 250)
  primary-deep: oklch(64% 0.22 150)
  primary-pressed: oklch(55% 0.20 150)

  secondary: oklch(98.5% 0.003 160)
  secondary-foreground: oklch(15% 0.025 250)
  muted: oklch(97% 0.004 160)
  muted-foreground: oklch(48% 0.02 260)
  accent: oklch(98.5% 0.003 160)
  accent-foreground: oklch(20% 0.02 260)

  destructive: oklch(58% 0.22 22)
  destructive-foreground: oklch(100% 0 0)
  success: oklch(63% 0.16 145)
  warning: oklch(80% 0.18 80)
  attention: oklch(76% 0.18 75)

  border: oklch(91% 0.005 220)
  input: oklch(81% 0.01 230)
  ring: oklch(47% 0.13 165)

  chart-1: oklch(82% 0.24 150)
  chart-2: oklch(63% 0.16 145)
  chart-3: oklch(76% 0.18 75)
  chart-4: oklch(50% 0.28 290)
  chart-5: oklch(65% 0.24 45)

  sidebar: oklch(98.5% 0.003 160)
  sidebar-foreground: oklch(15% 0.025 250)
  sidebar-primary: oklch(82% 0.24 150)
  sidebar-primary-foreground: oklch(15% 0.025 250)
  sidebar-accent: oklch(97% 0.004 160)
  sidebar-accent-foreground: oklch(20% 0.02 260)
  sidebar-border: oklch(91% 0.005 220)
  sidebar-ring: oklch(47% 0.13 165)

  brand-green: oklch(82% 0.24 150)
  brand-green-dark: oklch(47% 0.13 165)
  brand-green-mid: oklch(62% 0.18 155)
  brand-green-soft: oklch(92% 0.07 155)
  brand-teal-deep: oklch(15% 0.025 250)
  brand-teal: oklch(27% 0.04 235)
  brand-teal-mid: oklch(47% 0.13 165)
  accent-purple: oklch(50% 0.28 290)
  accent-orange: oklch(65% 0.24 45)
  accent-pink: oklch(62% 0.30 345)
  accent-blue: oklch(40% 0.18 270)
  surface-feature: oklch(96.5% 0.04 150)
  hairline-strong: oklch(81% 0.01 230)

colors-dark:
  # MongoDB Compass dark theme: exact hex values from the Compass UI.
  # Dark teal-blue surfaces, NOT generic gray.
  background: '#0e1f26'              # main data area
  foreground: '#ffffff'
  card: '#0e1f26'                    # floating panel = main data area
  card-foreground: '#ffffff'
  popover: '#112329'                 # dropdowns / menus / sheets
  popover-foreground: '#ffffff'

  primary: '#00ed64'                 # bright MongoDB green CTA
  primary-foreground: '#001e2b'
  primary-deep: '#00684a'            # solid filled-button alt
  primary-pressed: '#008c34'

  secondary: '#1a2d34'
  secondary-foreground: '#ffffff'
  muted: '#1a2d34'
  muted-foreground: '#b8c2c4'        # Compass label grey
  accent: '#1a2d34'                  # hover surface
  accent-foreground: '#ffffff'

  destructive: '#db3030'
  destructive-foreground: '#ffffff'
  success: '#15b273'                 # Compass string-value green
  warning: '#e27a3f'                 # Compass number-value orange
  attention: '#e27a3f'

  border: '#1c353c'                  # Compass document separator
  input: '#1a2d34'
  ring: '#00ed64'

  sidebar: '#112329'                 # Compass sidebar / header
  sidebar-foreground: '#b8c2c4'
  sidebar-primary: '#00ed64'
  sidebar-primary-foreground: '#001e2b'
  sidebar-accent: '#1a2d34'
  sidebar-accent-foreground: '#ffffff'
  sidebar-border: '#1c353c'
  sidebar-ring: '#00ed64'

  brand-green: '#00ed64'
  brand-green-dark: '#00684a'
  brand-green-mid: '#008c34'
  brand-teal-deep: '#0e1f26'
  brand-teal: '#112329'
  brand-teal-mid: '#1a2d34'
  hairline-strong: '#1c353c'

syntax:
  # JSON / code display tokens. Light values tuned for white card,
  # dark values are the Compass palette. Exposed as Tailwind utilities
  # text-syntax-key / text-syntax-string / text-syntax-number /
  # text-syntax-punctuation.
  light:
    syntax-key: '#2563eb'            # blue-600
    syntax-string: '#047857'         # emerald-700
    syntax-number: '#c2410c'         # orange-700
    syntax-punctuation: '#475569'    # slate-600
  dark:
    syntax-key: '#4fb4d7'            # Compass cyan
    syntax-string: '#15b273'         # Compass emerald
    syntax-number: '#e27a3f'         # Compass orange
    syntax-punctuation: '#b8c2c4'    # Compass label grey

typography:
  display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -1px
  heading-1:
    fontFamily: Outfit
    fontSize: 30px      # md:text-3xl on PageHeader
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.5px
  heading-2:
    fontFamily: Outfit
    fontSize: 24px      # text-2xl on PageHeader (mobile)
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.25px
  heading-3:
    fontFamily: Outfit
    fontSize: 18px      # text-lg
    fontWeight: 600
    lineHeight: 1.35
  heading-4:
    fontFamily: Outfit
    fontSize: 16px      # text-base
    fontWeight: 600
    lineHeight: 1.40
  heading-5:
    fontFamily: Outfit
    fontSize: 14px      # text-sm bold: SettingCard/BentoCard headers
    fontWeight: 600
    lineHeight: 1.40
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Outfit
    fontSize: 14px      # primary nav, body, controls
    fontWeight: 400
    lineHeight: 1.50
  body-sm-medium:
    fontFamily: Outfit
    fontSize: 14px      # nav items, button labels
    fontWeight: 500
    lineHeight: 1.50
  caption:
    fontFamily: Outfit
    fontSize: 12px      # text-xs: meta, hints
    fontWeight: 400
    lineHeight: 1.40
  caption-medium:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
  micro-uppercase:
    fontFamily: Outfit
    fontSize: 10px      # "Free" badge in account selector
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 1px
  button-md:
    fontFamily: Outfit
    fontSize: 12px            # text-xs: compact label style
    fontWeight: 700           # font-bold
    lineHeight: 1.0           # leading-none
    letterSpacing: 0.05em     # tracking-wider
    textTransform: uppercase
    use: 'every Button label except variant=link (which stays sentence-case)'
  code-md:
    fontFamily: Source Code Pro
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55

rounded:
  xs: 4px         # radius-xs
  sm: 6px         # radius-sm: subtle inset elements
  md: 8px         # radius-md: buttons, inputs, nav rows, chips
  lg: 12px        # radius-lg: cards, account selector, settings active wrapper
  xl: 16px        # radius-xl: bento cards, setting cards
  xxl: 24px       # radius-xxl
  panel: 16px     # md:rounded-2xl on the floating main panel = 16px
  full: 9999px    # avatars, status dots, switches, sliders, scrollbars (only)

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px

shadow:
  # DaisyUI-inspired layered shadows. Each utility combines an inset
  # top highlight (light catching the top edge) + close hairline +
  # ambient drop shadow. Dark mode shrinks the highlight and deepens
  # the shadow. See globals.css for the full source.
  shadow-depth-btn: |
    inset 0 1px 0 rgb(255 255 255 / 0.18),
    0 1px 2px rgb(0 0 0 / 0.06),
    0 0.5px 0 rgb(0 0 0 / 0.04)
  shadow-depth-btn-active: |
    inset 0 1px 2px rgb(0 0 0 / 0.10)
  shadow-depth-card: |
    inset 0 1px 0 rgb(255 255 255 / 0.6),
    0 0 0 1px rgb(0 0 0 / 0.03),
    0 1px 2px -1px rgb(0 0 0 / 0.05),
    0 4px 12px -4px rgb(0 0 0 / 0.08)
  shadow-depth-card-lg: |
    inset 0 1px 0 rgb(255 255 255 / 0.6),
    0 0 0 1px rgb(0 0 0 / 0.04),
    0 4px 8px -2px rgb(0 0 0 / 0.06),
    0 12px 32px -8px rgb(0 0 0 / 0.10),
    0 24px 64px -16px rgb(0 0 0 / 0.08)
  shadow-depth-card-lg-hover: |
    inset 0 1px 0 rgb(255 255 255 / 0.6),
    0 0 0 1px rgb(0 0 0 / 0.04),
    0 6px 12px -2px rgb(0 0 0 / 0.08),
    0 16px 40px -8px rgb(0 0 0 / 0.12),
    0 32px 80px -16px rgb(0 0 0 / 0.10)
  shadow-depth-input: |
    inset 0 1px 2px rgb(0 0 0 / 0.04)
  shadow-depth-overlay: |
    inset 0 1px 0 rgb(255 255 255 / 0.5),
    0 0 0 1px rgb(0 0 0 / 0.04),
    0 4px 8px -2px rgb(0 0 0 / 0.08),
    0 12px 24px -8px rgb(0 0 0 / 0.10),
    0 24px 48px -16px rgb(0 0 0 / 0.10)

motion:
  duration-fast: 150ms      # interactive elements (button hover/press, input)
  duration-normal: 200ms    # page transitions, dropdowns
  duration-slow: 300ms
  ease-out: cubic-bezier(0.16, 1, 0.3, 1)
  ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
  press-effect: translateY(0.5px)         # global :active on buttons
  card-hover-lift: translateY(-1px)       # global hover on data-slot=card

iconography:
  library: lucide-react
  package: lucide-react@^0.454.0
  setup: 'components.json: { "iconLibrary": "lucide" } + import { IconName } from "lucide-react"'
  type-import: 'import type { LucideIcon } from "lucide-react"'
  rule: 'No inline <svg>. No alternative icon libraries. lucide-react only.'
  sizes-by-layer:
    button-inline: 14px         # size-3.5: set by Button base classes
    button-sm-inline: 12px      # size-3: implied by sm size scaling
    nav-row-inline: 16px        # size-4: sidebar primary/settings rows
    dropdown-item-inline: 16px  # size-4
    input-adornment: 16px       # size-4: search prefix
    sidebar-header-button: 16px # size-4 inside size-8 container
    chevron-inline: 14px        # size-3.5: account selector / settings parent chevron
    accent-tile: 20px           # size-5 inside size-10/12 rounded tile
    hero-empty-state: 28px      # size-7 inside size-14 rounded-full container
    status-dot: 6px             # size-1.5: leading status pill dot
    notification-dot: 6px       # size-1.5 with ring-2 ring-background on bell
    sub-route-active-dot: 6px   # size-1.5: settings submenu active marker
  status-icons:
    empty-pending: lucide.Circle
    success-clear: lucide.ShieldCheck
    warning: lucide.AlertTriangle
    critical: lucide.AlertOctagon
    notifications: lucide.Bell
    theme-light: lucide.Sun
    theme-dark: lucide.Moon
    chevron-collapse: lucide.ChevronDown
    chevron-switch: lucide.ChevronsUpDown      # vertical pair: workspace/profile switcher
    chevron-next: lucide.ChevronRight          # breadcrumb / submenu trigger
    arrow-out: lucide.ArrowUpRight             # quick-action / navigate-to
  color-rules:
    inherits: currentColor by default
    muted: text-muted-foreground/40 to text-muted-foreground (status, decorative)
    active: text-foreground
    primary: text-primary (Bento donut hover, primary-tinted tiles)
    destructive: text-destructive (sign out, critical alerts, notification dot)
    success: text-success or 'text-[var(--success)]'
  accessibility:
    decorative: aria-hidden on every Icon used next to a text label
    standalone: aria-label required on icon-only buttons (size=icon)
    skeletons: role=img + aria-label on decorative chart skeletons
    no-color-only: status conveyed by icon + label, never color alone

components:
  # =================================================================
  # Buttons: DaisyUI-inspired depth: inset highlight + layered
  # shadow + press effect. Pill is intentionally NOT used. Labels
  # are uppercase / text-xs / font-bold / tracking-wider.
  # =================================================================
  button-default:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '6px 12px'         # py-1.5 px-3
    gap: 6px                    # gap-1.5
    iconSize: 14px              # size-3.5
    border: '1px solid color-mix(in oklch, {colors.primary} 80%, transparent)'
    shadow: '{shadow.shadow-depth-btn}'
    onActive: '{shadow.shadow-depth-btn-active}, transform: {motion.press-effect}'
  button-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: white
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '6px 12px'
    gap: 6px
    iconSize: 14px
    border: '1px solid color-mix(in oklch, {colors.destructive} 70%, transparent)'
    shadow: '{shadow.shadow-depth-btn}'
  button-outline:
    backgroundColor: '{colors.card}'
    textColor: '{colors.foreground}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '6px 12px'
    gap: 6px
    iconSize: 14px
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-btn}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.secondary-foreground}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '6px 12px'
    gap: 6px
    iconSize: 14px
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-btn}'
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.foreground}'
    typography: '{typography.button-md}'
    rounded: '{rounded.md}'
    padding: '6px 12px'
    gap: 6px
    iconSize: 14px
    onHover: 'background: {colors.accent}'
  button-link:
    # Link variant intentionally drops uppercase + tracking; reads
    # like inline prose, not a button label.
    backgroundColor: transparent
    textColor: '{colors.primary}'
    typography: '{typography.body-sm-medium}'
    textTransform: none
    letterSpacing: 0
    fontWeight: 600
    padding: 0
    onHover: 'text-decoration: underline'
  button-size-sm:
    fontSize: 11px              # text-[11px]
    padding: '4px 10px'         # py-1 px-2.5
  button-size-lg:
    padding: '8px 16px'         # py-2 px-4
  button-size-icon:
    width: 28px                 # size-7
    height: 28px
    padding: 0

  # =================================================================
  # Cards & containers
  # =================================================================
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    rounded: '{rounded.xl}'
    padding: 24px 0   # py-6, headers/content add their own px-6
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-card}'
    onHover: 'transform: {motion.card-hover-lift}'
  setting-card:
    # Stacked sub-card pattern inside the Account-settings panel.
    # Left: title + description. Right: control. Optional muted
    # footer with a small Save button.
    backgroundColor: 'color-mix(in oklch, {colors.background} 70%, transparent)'
    rounded: '{rounded.xl}'
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-card}'
    padding: 24px         # p-6 in body
    footerBackground: 'color-mix(in oklch, {colors.muted} 40%, transparent)'
    footerPadding: 12px 24px
  bento-card:
    # Empty-state card used in the Bento Grid dashboard.
    backgroundColor: '{colors.card}'
    rounded: '{rounded.xl}'
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-card}'
    padding: 20px         # p-5 mobile / 24px md+
  main-floating-panel:
    # The big rounded white card that holds every admin page.
    backgroundColor: '{colors.card}'
    rounded: '{rounded.panel}'    # 16px (md:rounded-2xl)
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-card-lg}'
    minHeight: calc(100vh - 32px)  # md:min-h-[calc(100vh-2rem)]
  popover:
    backgroundColor: '{colors.popover}'
    textColor: '{colors.popover-foreground}'
    rounded: '{rounded.md}'
    padding: 4px
    border: '1px solid {colors.border}'
    shadow: '0 4px 12px rgb(0 0 0 / 0.08)'

  # =================================================================
  # Inputs & forms
  # =================================================================
  text-input:
    backgroundColor: '{colors.card}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 0 12px
    border: '1px solid {colors.hairline-strong}'
    shadow: '{shadow.shadow-depth-input}'
  text-input-focused:
    border: '1px solid color-mix(in oklch, {colors.primary} 60%, transparent)'
    ring: '3px solid color-mix(in oklch, {colors.ring} 50%, transparent)'

  # =================================================================
  # Badges: rounded-md (NOT pill): see Do/Don't section.
  # =================================================================
  badge-default:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.caption-medium}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.secondary-foreground}'
    typography: '{typography.caption-medium}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: white
    typography: '{typography.caption-medium}'
    rounded: '{rounded.md}'
    padding: 2px 8px
  badge-outline:
    backgroundColor: transparent
    textColor: '{colors.foreground}'
    typography: '{typography.caption-medium}'
    rounded: '{rounded.md}'
    padding: 2px 8px
    border: '1px solid {colors.border}'
  badge-status-pill:
    # Reserved exception: small status dots beside text (e.g.
    # "Live" indicator, "All systems clear") DO use rounded-full.
    backgroundColor: 'color-mix(in oklch, {colors.primary} 10%, transparent)'
    textColor: '{colors.primary}'
    typography: '{typography.caption-medium}'
    rounded: '{rounded.full}'
    padding: 4px 10px
    border: '1px solid color-mix(in oklch, {colors.primary} 30%, transparent)'

  # =================================================================
  # Layout: nested floating-card admin shell
  # =================================================================
  admin-shell:
    body: '{colors.background}'           # soft grey
    sidebarWidth: 288px                   # w-72
    sidebarPadding: 16px                  # p-4 around contents
    sidebarBackground: transparent        # blends into body
    mainOuterPadding: 16px                # md:p-4 around the floating panel
    mainPanelClass: '{components.main-floating-panel}'
  admin-shell-mobile:
    sidebar: 'collapses to Sheet (drawer)'
    panel: 'fills 100% width, rounded-none, shadow-none'

  sidebar-header:
    height: 36px                          # h-9 row
    padding: 0 8px                        # px-2
    layout: 'flex justify-between items-center'
    leftCluster: 'logo (h-8 = 32px) + brand text (typography.body-sm-medium)'
    rightCluster: 'theme-toggle button + bell button (gap-1)'
  sidebar-icon-button:
    size: 32px                            # size-8
    rounded: '{rounded.md}'
    color: '{colors.muted-foreground}'
    onHover: 'bg-{colors.accent}, color-{colors.foreground}'
  sidebar-bell-dot:
    # Red notification dot on the bell, top-right corner.
    size: 6px
    rounded: '{rounded.full}'
    background: '{colors.destructive}'
    ring: '2px solid {colors.background}'
  sidebar-account-selector:
    # Workspace switcher just below the header.
    height: 40px                          # h-10
    rounded: '{rounded.lg}'
    background: '{colors.card}'
    border: '1px solid {colors.border}'
    shadow: '{shadow.shadow-depth-btn}'
    padding: 0 8px
    layout: '[avatar 28px][label flex-1][badge][chevron 14px]'
  sidebar-nav-item:
    height: 36px                          # h-9
    rounded: '{rounded.md}'
    padding: 0 12px
    typography: '{typography.body-sm-medium}'
    iconSize: 16px
    gap: 12px
    states:
      default: 'color: foreground/75'
      hover: 'bg-{colors.accent}, color-{colors.foreground}'
      active: 'bg-{colors.card}, border-{colors.border}, shadow-{shadow.shadow-depth-btn}'
  sidebar-settings-active-wrapper:
    # When pathname is /settings/*, the parent row + indented sub-list
    # are wrapped in a single white floating card.
    rounded: '{rounded.lg}'
    border: '1px solid {colors.border}'
    background: '{colors.card}'
    shadow: '{shadow.shadow-depth-card}'
    padding: 4px
  sidebar-settings-submenu:
    # Indented sub-route list. Vertical guide line is centered under
    # the parent icon (icon left = 12px px-3 + 8px = 20px center →
    # ml-5 = 20px).
    indent: 20px              # ml-5: places border-l at parent icon center
    paddingLeft: 16px         # pl-4: sub-item text aligns with parent text
    borderLeft: '1px solid {colors.border}'
    itemHeight: 28px          # h-7
    itemTypography: '{typography.body-sm}'
    activeMarker:
      type: 'absolute dot'
      size: 6px               # size-1.5
      offset: -18px           # -left-[1.125rem] → centered ON the guide
      background: '{colors.foreground}'
  sidebar-footer-profile:
    height: 48px              # h-12
    rounded: '{rounded.lg}'
    padding: 8px              # p-2
    layout: '[avatar 32px circle][name+email block flex-1]'
    avatarBackground: '{colors.accent-purple}'
    avatarTextColor: white
    nameTypography: '{typography.body-sm-medium}'
    emailTypography: '{typography.caption}'
    emailColor: '{colors.muted-foreground}'

  # =================================================================
  # Page header: used inside every admin surface, top of the
  # floating panel.
  # =================================================================
  page-header:
    layout: 'flex flex-col gap-3 md:flex-row md:items-end md:justify-between'
    eyebrowSlot: 'optional, ReactNode rendered above the title (status pill, category badge…)'
    titleTypography:
      mobile: '{typography.heading-2}'   # text-2xl
      desktop: '{typography.heading-1}'  # md:text-3xl
    titleColor: '{colors.foreground}'
    descriptionTypography:
      mobile: '{typography.body-sm}'
      desktop: '{typography.body-md}'
    descriptionColor: '{colors.muted-foreground}'
    actionsSlot: 'optional, shrink-0 flex gap-2'
  page-header-with-eyebrow:
    leftStack: 'space-y-2 (eyebrow → title → description)'

  # =================================================================
  # Bento Grid: empty-state dashboard cards.
  # =================================================================
  bento-grid:
    container: 'grid gap-4 lg:grid-cols-3 lg:gap-6'
    leftWrapper: 'grid gap-4 lg:col-span-2 lg:gap-6'
    rightCard: 'lg:col-span-1, flex-col, stretches to match left height'
    subGrid: 'grid gap-4 sm:grid-cols-2 lg:gap-6'
  bento-card-header:
    layout: 'flex items-start justify-between gap-3'
    titleTypography: '{typography.heading-5}'
    metaTypography: '{typography.caption-medium}'
    metaColor: '{colors.muted-foreground}'
  bento-empty-revenue:
    # Card 1: h-48 centered text, no chart skeleton.
    bodyHeight: 192px
    bodyAlign: 'flex items-center justify-center'
    textColor: 'color-mix(in oklch, {colors.muted-foreground} 80%, transparent)'
  bento-empty-donut:
    # Card 2: donut skeleton: 64px ring, 10px border thickness.
    skeletonShape: 'circle'
    size: 64px                # size-16
    borderWidth: 10px
    borderColor: '{colors.muted}'
    bodyHeight: 128px         # h-32
  bento-empty-histogram:
    # Card 3: 7 vertical bars at varying heights.
    bars: 7
    barWidth: 10px            # w-2.5
    barColor: '{colors.muted}'
    barRadius: '{rounded.sm}' # rounded-t-sm
    containerHeight: 56px     # h-14
    sampleHeights: [35, 60, 45, 78, 30, 68, 50]
  bento-infra-row:
    # Card 4: service health row.
    layout: 'flex items-center gap-3'
    statusIcon: 'lucide.Circle, size-4, color: muted-foreground/40'
    labelTypography: '{typography.body-sm-medium}'
    sublabelTypography: '{typography.caption}'
    sublabelColor: 'color-mix(in oklch, {colors.muted-foreground} 80%, transparent)'
    skeletonBar:
      height: 6px             # h-1.5
      width: 64px             # w-16
      rounded: '{rounded.full}'
      background: '{colors.muted}'

  # =================================================================
  # Dropdown menus
  # =================================================================
  dropdown-menu-content:
    backgroundColor: '{colors.popover}'
    rounded: '{rounded.md}'
    border: '1px solid {colors.border}'
    padding: 4px
    shadow: '0 4px 12px rgb(0 0 0 / 0.08)'
  dropdown-menu-item:
    height: 32px
    rounded: '{rounded.sm}'
    padding: 6px 8px
    typography: '{typography.body-sm}'
    onFocus: 'bg-{colors.accent}'
---

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

## Overview

This is a portable admin design system. Three pillars define its visual identity:

1. **Nested floating-card shell**: the body is a soft grey canvas, the sidebar has no background of its own (it blends into the body), and a single large white panel with rounded corners and a layered shadow holds the entire page content. The result is a "card-on-canvas" composition that reads as modern and immersive without any heavy chrome.
2. **DaisyUI-inspired component depth**: every interactive surface (buttons, cards, inputs, sidebar nav, settings rows) carries a subtle inset highlight at the top + a layered close + ambient shadow, plus a real press effect (`translateY(0.5px)` + inset shadow) on `:active`. This gives shadcn-style components physical weight without straying from accessibility-friendly tokens.
3. **MongoDB-green primary on Outfit type**: the brand green (`oklch(82% 0.24 150)`) drives every primary action and active state. Outfit is the global typeface; medium (500) is the workhorse weight, semibold (600) anchors headings.

The system is built on **Tailwind CSS v4** (with `@utility` for custom layered shadows), **Next.js 15+ App Router**, and **shadcn/ui Radix primitives** for the leaf widgets.

### Key Characteristics

- Soft grey body (`oklch(97.5% 0.003 160)` light, `oklch(15% 0.025 250)` dark) with the sidebar inheriting the body color.
- Single floating white panel (`rounded-2xl border shadow-depth-card-lg`) holds every admin route.
- All buttons, inputs, nav rows: `rounded-md` (8px). NO pill buttons.
- All inner cards (Card, SettingCard, BentoCard): `rounded-xl` (12px).
- Avatars, status dots, switches, sliders, scrollbars: `rounded-full`: the only place circles live.
- Settings is a sub-route group (`/settings/general | /security | /notifications | /billing`) where the active parent in the sidebar transforms into a white floating wrapper containing an indented submenu whose vertical guide is centered under the parent icon.

## Layout Architecture

### Nested floating-card shell

```
┌──────────────────────────────────────────────────────────────────┐
│  bg-background  (soft grey, light or dark)                       │
│                                                                  │
│  ┌─────────────┐    ┌────────────────────────────────────────┐  │
│  │             │    │  bg-card  rounded-2xl  border          │  │
│  │   sidebar   │    │  shadow-depth-card-lg                   │  │
│  │   (transp.) │    │                                         │  │
│  │   w-72      │    │  ┌──────────────────────────────────┐   │  │
│  │             │    │  │  PageHeader (h1 + description)   │   │  │
│  │   blends    │    │  ├──────────────────────────────────┤   │  │
│  │   into bg   │    │  │  page content                    │   │  │
│  │             │    │  │  …                               │   │  │
│  │             │    │  └──────────────────────────────────┘   │  │
│  └─────────────┘    └────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

Implementation contract (Tailwind):

```tsx
<div className="min-h-screen bg-background text-foreground">
  {/* Desktop sidebar: fixed, transparent, blends into body */}
  <aside className="fixed inset-y-0 left-0 hidden w-72 md:flex md:flex-col">
    <div className="flex h-full flex-col px-4 py-4">
      <Sidebar />
    </div>
  </aside>

  {/* Mobile drawer */}
  <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
    <SheetContent side="left" className="w-72 border-0 bg-background p-4">
      <Sidebar onNavigate={() => setMobileNavOpen(false)} />
    </SheetContent>
  </Sheet>

  {/* Floating main panel */}
  <div className="md:pl-72">
    <div className="md:p-4">
      {/* Mobile-only menu trigger above the card */}
      <div className="flex items-center gap-2 px-3 py-2 md:hidden">
        <Button variant="ghost" size="icon" onClick={openSidebar}>
          <Menu className="size-5" />
        </Button>
        <span className="text-sm font-semibold tracking-tight">Brand</span>
      </div>

      <main className="min-h-[calc(100vh-1rem)] overflow-hidden bg-card text-card-foreground md:min-h-[calc(100vh-2rem)] md:rounded-2xl md:border md:shadow-depth-card-lg">
        {children}
      </main>
    </div>
  </div>
</div>
```

### Mobile collapse rules

- Sidebar collapses into a `Sheet` drawer triggered from a top-bar `Menu` button.
- Floating main panel loses outer margin, rounded corners, border and shadow: fills 100% of the viewport.
- Hamburger trigger sits above the panel with the brand label next to it.

## Sidebar Pattern

The sidebar is a 5-region vertical column. None of the regions have their own background; the entire sidebar inherits `bg-background` (the body grey) so it blends into the canvas.

```
┌─────────────────────────────┐
│ 1. Header                   │  ← logo + brand   |   theme toggle + bell
├─────────────────────────────┤
│ 2. Account selector         │  ← avatar | "Personal account" | Free | ⇅
├─────────────────────────────┤
│                             │
│ 3. Primary nav (icons)      │  ← Home, Section, Section, Section…
│                             │
│ 4. Account-settings group   │  ← parent + (when active) white wrapper +
│                             │     indented submenu w/ guide line under icon
│                             │
├─────────────────────────────┤
│ 5. Footer profile           │  ← purple A avatar | name + email
└─────────────────────────────┘
```

### 1. Header

- Fixed height **`h-9`** so logo + buttons share the same vertical center.
- Left: app logo (`h-8`, matches the height of the size-8 header buttons) + brand wordmark (`text-sm font-semibold`).
- Right cluster: theme-toggle button + bell button, `gap-1`. Both are `size-8` icon buttons with `rounded-md` and the standard hover color shift.
- The bell carries a notification dot at top-right: `size-1.5 bg-destructive rounded-full ring-2 ring-background` so it reads as a pill, not a stray pixel.

### 2. Account selector

A workspace switcher rendered as a `DropdownMenuTrigger`:

- `h-10 rounded-lg border bg-card shadow-depth-btn`
- Layout: `[28px tile][label flex-1][Free chip][14px chevron]`
- The 28px tile uses `bg-primary/15 text-primary` with the workspace initial.
- The "Free" chip is a `text-[10px] uppercase tracking-wider` rounded-md outlined badge.

### 3. Primary nav

Each item is a fixed `h-9` flex row:

- Default: `text-foreground/75`, hover: `bg-accent text-foreground`.
- Active: `border bg-card text-foreground shadow-depth-btn` (raised white tile with the daisy depth shadow).
- 16px icon + `text-sm font-medium` label, gap-3.
- `aria-current="page"` on the active link.

### 4. Account-settings group (active-as-card + indented submenu)

When `pathname.startsWith('/settings')`, the entire group transforms:

- Outer wrapper gets `rounded-lg border bg-card shadow-depth-card p-1`: it becomes a single white floating card containing both the parent row and the indented submenu.
- Inside, a sub-list renders with these critical math:

| Layer | Class | Value | Why |
|---|---|---|---|
| Wrapper inner left edge | `p-1` | 4 px | shared edge for parent + ul |
| Parent icon left | `px-3` | 12 px from wrapper inner edge |
| Parent icon center | calc | **20 px** | `12 + (16 / 2)` |
| Parent text start | calc | **40 px** | `12 + 16 + 12 (gap-3)` |
| `<ul>` left margin | `ml-5` | **20 px** | aligns the border-l guide with the icon center |
| `<ul>` left padding | `pl-4` | 16 px | sub-item text starts at 36 px (close to parent text) |

So the vertical guide line drops down from underneath the gear icon, and the sub-item labels line up roughly with the parent label.

- The active sub-item gets a small filled **dot** sitting *on* the guide:
  - `absolute -left-[1.125rem] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-foreground`
  - This is the "icon of the page" anchor: replaces the missing icon on sub-rows.
- Active sub-item text: `font-semibold text-foreground`. Inactive: `text-muted-foreground`.

### 5. Footer profile

- Fixed height `h-12 rounded-lg p-2`, opens a `DropdownMenu` upward.
- Avatar: 32 px circle, `bg-accent-purple text-white font-semibold`, single-letter initial.
- Two-line block: name (`text-sm font-medium`) + truncated email (`text-xs text-muted-foreground`), `leading-tight`.

## Page Header

Used at the top of every admin page (inside the floating panel).

```tsx
<PageHeader
  eyebrow={
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
      <span className="size-1.5 rounded-full bg-primary" aria-hidden />
      Live
    </span>
  }
  title="Welcome back"
  description="Live operational view across every partner restaurant."
  actions={
    <Button>
      <UtensilsCrossed /> Manage restaurants
    </Button>
  }
/>
```

- Layout: `flex flex-col gap-3 md:flex-row md:items-end md:justify-between`.
- Left stack (`space-y-2`): optional **eyebrow** slot → title → description.
- **Eyebrow**: any ReactNode: typically a status pill (Live, All clear) or a category badge. Renders unstyled above the title; bring your own pill / badge / chip styling.
- Title: `text-2xl font-semibold tracking-tight md:text-3xl`.
- Description: `max-w-prose text-sm text-muted-foreground md:text-base`.
- Optional `actions` slot: `shrink-0 flex gap-2`.

## Settings Sub-route Pattern

Settings is a route group with a shared layout:

```
app/(admin)/settings/
├── layout.tsx              # renders <PageHeader> + outlet
├── page.tsx                # redirects → /settings/general
├── general/page.tsx        # SettingCard list
├── security/page.tsx
├── notifications/page.tsx
└── billing/page.tsx
```

`settings/layout.tsx`:

```tsx
<div className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8 md:px-10 md:py-10">
  <PageHeader
    title="Account settings"
    description="Manage the settings of your personal account."
  />
  {children}
</div>
```

### `SettingCard` anatomy

Each setting row is a `SettingCard`:

```
┌────────────────────────────────────────────────┐
│  Display name                  [ input/control ]│
│  Shown across the admin and on activity events.│
├────────────────────────────────────────────────┤  ← muted footer (only if showSave)
│                                          [ Save ]│
└────────────────────────────────────────────────┘
```

- Outer: `rounded-xl border bg-background/70 shadow-depth-card`.
- Body: `flex flex-col md:flex-row md:items-center md:justify-between p-6`.
- Left: title (`text-sm font-semibold`) + description (`text-sm text-muted-foreground`).
- Right: any control (Avatar, Input, Select, Switch, Button).
- Footer (when `showSave`): `border-t bg-muted/40 px-6 py-3` with a small Save button (`size="sm"`).
- The component is a **client component** so server pages don't need to ship handler functions.

## Bento Grid Pattern

The dashboard uses a 2-row × 2-column bento for empty-state cards.

```
┌────────────────────────────────┬───────────────┐
│  Card 1: Revenue trend        │               │
│  (h-48, centered text)         │  Card 4       │
├────────────────┬───────────────┤  Infra health │
│  Card 2        │  Card 3       │  (4-row list) │
│  Donut         │  Histogram    │               │
│  skeleton      │  skeleton     │               │
└────────────────┴───────────────┴───────────────┘
```

```tsx
<div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
  <div className="grid gap-4 lg:col-span-2 lg:gap-6">
    {/* Card 1: full width of left wrapper */}
    {/* Card 2 + Card 3: sub-grid sm:grid-cols-2 */}
  </div>
  {/* Card 4: lg:col-span-1, flex-col, stretches via grid */}
</div>
```

### Empty-state skeletons

| Card | Skeleton | Implementation |
|---|---|---|
| Revenue trend | none | centered `text-muted-foreground/80` copy in `h-48` |
| Order channels | donut | `<div class="size-16 rounded-full border-[10px] border-muted" />` |
| Peak hours | histogram | 7 `<div>` bars, `w-2.5 bg-muted rounded-t-sm`, heights `[35,60,45,78,30,68,50]%` |
| Infra health | linear bars | `<div class="h-1.5 w-16 rounded-full bg-muted" />` per row + `lucide.Circle` empty status icon |

## Component Catalogue

> All components live in `shared/ui/` and consume the design tokens above. Icons are from `lucide-react`.

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
- `aria-current="page"` on every active nav `<Link>`.
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

### Chart (Recharts)

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

## Color Tokens

CSS variables are declared in `app/globals.css` under `:root` (light) and `.dark`. Tailwind v4 bridges them via `@theme inline { --color-*: var(--*); }`.

### Surface roles

| Token | Light | Dark (MongoDB Compass) | Use |
|---|---|---|---|
| `--background` | grey `oklch(97.5% 0.003 160)` | Compass teal-blue `#0e1f26` | body, main data area; sidebar inherits via `bg-sidebar` |
| `--card` | white `oklch(100% 0 0)` | Compass teal-blue `#0e1f26` | floating panel, all sub-cards (panel pops via border + shadow in dark) |
| `--popover` | white | `#112329` | dropdown menus, sheets |
| `--muted` | `oklch(97% 0.004 160)` | `#1a2d34` | input bg, hover, sub-card footer |
| `--accent` | `oklch(98.5% 0.003 160)` | `#1a2d34` | nav hover bg, ghost button hover |
| `--border` | `oklch(91% 0.005 220)` | `#1c353c` | every divider |
| `--sidebar` | `oklch(98.5% 0.003 160)` | `#112329` | sidebar / header: applied via `bg-sidebar` on the `<aside>` |

### Brand & semantic

| Token | Light | Dark (MongoDB Compass) | Use |
|---|---|---|---|
| `--primary` | green `oklch(82% 0.24 150)` | `#00ed64` | primary CTA, active nav indicator, focus ring |
| `--primary-foreground` | navy `oklch(15% 0.025 250)` | `#001e2b` | text on green |
| `--primary-deep` | `oklch(64% 0.22 150)` | `#00684a` | solid filled-button alt |
| `--destructive` | red `oklch(58% 0.22 22)` | `#db3030` | sign out, error, sidebar bell dot |
| `--success` | green `oklch(63% 0.16 145)` | `#15b273` | "all systems clear", success badges |
| `--warning` | amber `oklch(80% 0.18 80)` | `#e27a3f` | non-critical anomalies, attention |
| `--ring` | `oklch(47% 0.13 165)` | `#00ed64` | focus ring |

### Extended palette (used sparingly)

`--brand-green-soft`, `--brand-teal-deep`, `--accent-purple` (footer avatar background), `--accent-orange`, `--accent-pink`, `--accent-blue`, `--surface-feature`, `--hairline-strong` (input border).

## MongoDB Compass Dark Theme

The dark theme reproduces the **MongoDB Compass** color palette exactly. It is the **default theme** (`defaultTheme="dark"` in `ThemeProvider`).

### Surface map

```
┌──────────────────────────────────────────────────────────────────┐
│  bg-background  #0e1f26  (main data area, body)                   │
│                                                                  │
│  ┌─────────────┐    ┌────────────────────────────────────────┐  │
│  │ bg-sidebar  │    │  bg-card  #0e1f26                       │  │
│  │  #112329    │    │  border #1c353c                          │  │
│  │             │    │  shadow-depth-card-lg                    │  │
│  │  hover:     │    │                                          │  │
│  │  bg-accent  │    │  inputs, hover surfaces:                 │  │
│  │  #1a2d34    │    │    bg-muted / bg-input #1a2d34           │  │
│  │             │    │                                          │  │
│  │             │    │  borders: border-border #1c353c          │  │
│  └─────────────┘    └────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Primary brand actions

| State | Token | Hex |
|---|---|---|
| Bright CTA fill | `bg-primary` | `#00ed64` |
| Solid filled-button alternative | `bg-primary-deep` | `#00684a` |
| Pressed / hover-deeper | `bg-primary-pressed` (light only: dark already dark) | `#008c34` |
| Text accent / link / active icon | `text-primary` | `#00ed64` |

The dark CTA is always the **bright** `#00ed64`. Use `--primary-deep` (`#00684a`) only for opt-in solid buttons that should feel weightier (e.g. destructive-adjacent affirmatives). Default Button stays on `--primary`.

### Status & feedback

- `--success` `#15b273`: also used as the JSON string-value color (consistent green for "good" state).
- `--warning` / `--attention` `#e27a3f`: also the JSON number-value color (warm amber).
- `--destructive` `#db3030`: sign out, critical anomalies, the sidebar bell dot.

### Typography roles

- Default body text: `text-foreground` → `#ffffff`.
- Inactive labels / muted body: `text-muted-foreground` → `#b8c2c4`.
- Hover / active text in nav rows: `text-foreground` (full white).

### Forced overrides

If a third-party shadcn primitive ships with `dark:bg-gray-900` or similar, **replace it** with the appropriate Compass token (`bg-card`, `bg-sidebar`, `bg-muted`). The system uses semantic Tailwind tokens exclusively: never `gray-*`, `neutral-*`, or `slate-*` for surface colors.

### Syntax highlighting

Four tokens drive JSON / code display, exposed as `text-syntax-*` Tailwind utilities:

| Role | Token | Light | Dark (Compass) |
|---|---|---|---|
| Keys / properties (`_id`, `email`) | `text-syntax-key` | `#2563eb` (blue-600) | `#4fb4d7` (cyan) |
| String values (`"fwinci_r"`) | `text-syntax-string` | `#047857` (emerald-700) | `#15b273` (emerald) |
| Numbers / booleans (`0`, `true`) | `text-syntax-number` | `#c2410c` (orange-700) | `#e27a3f` (orange) |
| Punctuation / types (`:`, `{`, `Array (12)`) | `text-syntax-punctuation` | `#475569` (slate-600) | `#b8c2c4` (label grey) |

Example:

```tsx
<pre className="rounded-xl border bg-muted p-5 font-mono text-sm leading-relaxed text-syntax-punctuation">
{`{
  `}<span className="text-syntax-key">_id</span>{`: `}<span className="text-syntax-string">"6789ab12cd34ef5678901234"</span>{`,
  `}<span className="text-syntax-key">orders</span>{`: `}<span className="text-syntax-number">0</span>{`,
  `}<span className="text-syntax-key">verified</span>{`: `}<span className="text-syntax-number">true</span>{`,
  `}<span className="text-syntax-key">roles</span>{`: `}<span className="text-syntax-punctuation">Array (12)</span>{`
}`}
</pre>
```

The container uses `bg-muted` (`#1a2d34` in dark, light grey in light) for a subtle "code well" feel. The `text-syntax-punctuation` color drives the brackets / colons that sit outside the `<span>` blocks.

A live demo lives at `/design-preview` under the **Syntax highlighting (MongoDB Compass)** section.

## Typography

### Font Family

**Outfit** is loaded via `next/font/google` in `app/layout.tsx`:

```tsx
import { Outfit } from "next/font/google"
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

<body className={`${outfit.variable} bg-background text-foreground`}>
```

`globals.css` exposes the variable to Tailwind v4:

```css
@theme inline {
  --font-sans:
    var(--font-outfit), 'Outfit', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, sans-serif;
  --font-mono:
    'Source Code Pro', 'SF Mono', Menlo, Consolas, monospace;
}
```

### Hierarchy

| Token | Tailwind | Size | Weight | Use |
|---|---|---|---|---|
| `display` | `text-5xl` | 48 | 600 | dashboard hero "Welcome back" |
| `heading-1` | `md:text-3xl` | 30 | 600 | PageHeader title (desktop) |
| `heading-2` | `text-2xl` | 24 | 600 | PageHeader title (mobile) |
| `heading-3` | `text-lg` | 18 | 600 | inner section headlines |
| `heading-4` | `text-base` | 16 | 600 | minor card titles |
| `heading-5` | `text-sm font-semibold` | 14 | 600 | SettingCard / BentoCard titles |
| `body-md` | `text-base` | 16 | 400 | desktop description |
| `body-sm` | `text-sm` | 14 | 400 | nav, controls, default body |
| `body-sm-medium` | `text-sm font-medium` | 14 | 500 | active nav, button labels, sub-item active |
| `caption` | `text-xs` | 12 | 400 | hints, meta |
| `caption-medium` | `text-xs font-medium` | 12 | 500 | KPI eyebrows, meta accents |
| `micro-uppercase` | `text-[10px] uppercase tracking-wider` | 10 | 600 | "Free" plan chip |
| `button-md` | `text-xs font-bold uppercase tracking-wider` | 12 | 700 | every button label (link variant excepted) |
| `code-md` | `text-sm font-mono` | 14 | 400 | code blocks |

### Principles

- 500 is the default weight for medium-weight UI affordances (button, nav active, badge), 600 for headings and the "Free" chip. 700+ avoided.
- Mild negative `tracking-tight` on the page title; everything else uses default tracking.

## Spacing & Radius

Spacing follows the Tailwind scale (4 px base). The system rarely exceeds `gap-10 / py-10` because the floating panel already provides generous margins around content.

Radius scale (defined under `@theme inline`):

| Token | Class | Value | Use |
|---|---|---|---|
| `--radius-xs` | `rounded-xs` | 4 px | tiny chips |
| `--radius-sm` | `rounded-sm` | 6 px | dropdown items, histogram bar tops |
| `--radius-md` | `rounded-md` | 8 px | **buttons, inputs, badges, nav rows, account-selector tile** |
| `--radius-lg` | `rounded-lg` | **12 px** | account selector outer, settings active wrapper, footer profile |
| `--radius-xl` | `rounded-xl` | 16 px | Card, BentoCard, SettingCard |
| (panel) | `md:rounded-2xl` | 16 px | floating main panel |
| `--radius-xxl` | `rounded-xxl` | 24 px | reserved |
| `--radius-full` | `rounded-full` | 9999 px | avatars, status dots, switches, sliders, scrollbars (only) |

## Depth & Elevation

The depth system replaces flat shadcn shadows with DaisyUI-inspired layered shadows. Each utility combines an inset top highlight (light catching the top edge) + a close hairline + an ambient drop shadow. Defined in `app/globals.css` as Tailwind v4 `@utility` rules. Dark mode shrinks the highlight (`white/0.04`) and deepens the shadow (`black/0.40`).

| Utility | Inset highlight | Close shadow | Ambient | Use |
|---|---|---|---|---|
| `shadow-depth-btn` | `white/0.18` | `black/0.06` | `black/0.04` | filled buttons, active nav, account selector |
| `shadow-depth-btn-active` | none | `inset black/0.10` | none | `:active` swap on buttons |
| `shadow-depth-card` | `white/0.6` | `black/0.05` | `black/0.08` | Card, SettingCard, BentoCard, settings active wrapper |
| `shadow-depth-card-lg` | `white/0.6` | `black/0.06` | `black/0.10`, `black/0.08` | floating main panel |
| `shadow-depth-card-lg-hover` | `white/0.6` | `black/0.08` | `black/0.12`, `black/0.10` | optional hover variant |
| `shadow-depth-overlay` | `white/0.5` | `black/0.04` (ring) + `black/0.08` close | `black/0.10` medium + `black/0.10` far | every floating menu / popover / dropdown / sheet / dialog / chart tooltip |
| `shadow-depth-input` | none | `inset black/0.04` | none | inputs (recessed feel) |

The full source (excerpt):

```css
@utility shadow-depth-btn {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.18),
    0 1px 2px rgb(0 0 0 / 0.06),
    0 0.5px 0 rgb(0 0 0 / 0.04);
}

.dark .shadow-depth-btn {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.08),
    0 1px 2px rgb(0 0 0 / 0.40),
    0 0.5px 0 rgb(0 0 0 / 0.40);
}
```

## Motion & Interaction

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150 ms | button hover/press, input focus |
| `--duration-normal` | 200 ms | dropdowns, sheet, page transitions |
| `--duration-slow` | 300 ms | reserved |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | natural ease-out for entrances |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | reserved |

### Global rules

```css
button, a, input, select, textarea,
[role='button'], [data-slot='button'], [data-slot='card'] {
  transition: all var(--duration-fast) var(--ease-out);
}

[data-slot='card']:hover { transform: translateY(-1px); }

button:active, [data-slot='button']:active {
  transform: translateY(0.5px);
}
```

Combined with `active:shadow-depth-btn-active` per button variant, the press effect feels tactile.

### Page transitions

Each page is wrapped in `animate-in fade-in-50 slide-in-from-bottom-1 duration-200 ease-out`. The shell re-keys on `pathname` so React remounts and re-fires the entrance animation on every route change.

## Iconography

### Library: `lucide-react` (exclusive)

Every icon in the system comes from [`lucide-react`](https://lucide.dev). No inline `<svg>`, no `@radix-ui/react-icons`, no `react-icons`, no Heroicons, no SVG sprites.

```bash
pnpm add lucide-react
```

```jsonc
// components.json
{
  "iconLibrary": "lucide"
}
```

```tsx
// Import named icons + the type for icon-prop interfaces
import { Bell, Circle, Settings, type LucideIcon } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon   // never `ReactNode`, always the typed component
}
```

### Sizes by layer

Icon size is determined by the **layer** the icon lives in, not by the icon's semantic meaning. The Button component sets its own default; everywhere else, set `className="size-X"` explicitly.

| Layer | Class | px | Where it lives |
|---|---|---|---|
| Button label inline | `size-3.5` | 14 | Set by Button base `[&_svg:not([class*='size-'])]:size-3.5`. `Plus`, `Bell`, `LogOut` next to button text. |
| Button (`sm`) inline | `size-3` (manual) | 12 | If you need a tighter pair, add `className="size-3"` on the icon. |
| Sidebar nav row | `size-4` | 16 | `Home`, `BarChart3`, `Settings`, `Bot`, `UtensilsCrossed`. |
| Dropdown menu item | `size-4` | 16 | `Sun`/`Moon`, `LogOut`, `User` in `DropdownMenuItem`. |
| Input adornment | `size-4` | 16 | `Search` prefix in `Input` wrappers (`absolute left-3 top-1/2 -translate-y-1/2`). |
| Sidebar header button | `size-4` inside `size-8` | 16 / 32 | `Bell`, `Sun`/`Moon`: icon centered in a `size-8 rounded-md` button. |
| Chevron inline | `size-3.5` | 14 | `ChevronDown` on the Settings parent, `ChevronsUpDown` on the account selector. |
| Accent tile | `size-5` inside `size-10`–`size-12` | 20 | Status / category tiles (e.g. dashboard quick-action icons). |
| Hero / empty-state | `size-7` inside `size-14 rounded-full` | 28 | Anomalies "All clear" `ShieldCheck`, dashboard error tile. |
| Status dot | `size-1.5` | 6 | Decorative leading dot in status pills (`Live`, `All systems clear`). |
| Notification badge | `size-1.5 ring-2 ring-background` | 6 | Red dot top-right of the sidebar bell. |
| Sub-route active marker | `size-1.5` | 6 | Filled dot anchored on the Settings submenu guide line. |

```tsx
// Examples drawn from the codebase

// Button (size auto-applied by base class)
<Button>
  <Plus />        {/* size-3.5 → 14 px */}
  Add restaurant
</Button>

// Sidebar nav row
<Settings className="size-4 shrink-0" aria-hidden />

// Sidebar header standalone button
<button className="grid size-8 place-items-center rounded-md ...">
  <Bell className="size-4" aria-hidden />
  <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
</button>

// Hero empty state
<span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary" aria-hidden>
  <ShieldCheck className="size-7" />
</span>

// Status pill
<span className="inline-flex items-center gap-2 ...">
  <span className="size-1.5 rounded-full bg-[var(--success)]" aria-hidden />
  All systems clear
</span>
```

### Reserved status icons

Status semantics map to specific lucide glyphs. These mappings are global: never substitute another icon for the same state, and never reuse one of these for an unrelated action.

| State | Icon | Token |
|---|---|---|
| Empty / pending / idle | `Circle` (outlined) | `text-muted-foreground/40` |
| Success / clear | `ShieldCheck`, `CheckCircle2` | `text-[var(--success)]` |
| Warning / attention | `AlertTriangle` | `text-[var(--warning)]` or `text-[var(--attention)]` |
| Critical / error | `AlertOctagon` | `text-destructive` |
| Notifications | `Bell` | `text-muted-foreground` (the destructive dot conveys urgency) |
| Theme switch | `Sun` (in dark mode) / `Moon` (in light mode) | inherits |
| Workspace / profile switcher | `ChevronsUpDown` | `text-muted-foreground` |
| Disclosure / collapse | `ChevronDown` | `text-muted-foreground` |
| Drill-down / next | `ChevronRight` | `text-muted-foreground` |
| Navigate-to / external | `ArrowUpRight` | `text-muted-foreground` → `text-primary` on hover |

### Container patterns

The system uses three reusable container shapes that wrap a lucide icon:

```tsx
// 1. Tile: accent-tinted square, used for category / quick-action icons
<span className="grid size-10 place-items-center rounded-md bg-secondary text-secondary-foreground" aria-hidden>
  <UtensilsCrossed className="size-5" />
</span>

// 2. Soft-tinted circle: used for hero / empty-state icons
<span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary" aria-hidden>
  <ShieldCheck className="size-7" />
</span>

// 3. Pure status dot: no icon, just a colored circle
<span className="size-1.5 rounded-full bg-primary" aria-hidden />
```

The notification badge is a special-case dot that sits on top of an icon with a ring matching the surrounding background:

```tsx
<span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
```

The `ring-2 ring-background` is critical: it visually punches the dot away from the icon stroke so it reads as a separate badge.

### Color & state

- **Default**: icons inherit `currentColor`. They naturally pick up the surrounding text color (foreground in nav default, primary-foreground inside a primary button, destructive inside a destructive item).
- **Muted decorative**: `text-muted-foreground` for icons next to muted text, `text-muted-foreground/40` for the very subtle empty-state dot in the Bento infrastructure rows.
- **Active**: when a nav row or dropdown item flips to `aria-current="page"` / focused state, the icon goes to `text-foreground` via a sibling color rule on the parent (no per-icon class).
- **Status colors**: use the token-bound utility: one of `text-[var(--success)]`, `text-[var(--warning)]`, `text-[var(--attention)]`, or `text-[var(--destructive)]`. Never hardcode a hex.

### Accessibility rules

1. **Decorative icons** (the icon sits next to a visible text label): always `aria-hidden`.
2. **Icon-only buttons** (`size="icon"` or any standalone button without text): `aria-label` is **required**. Examples: bell button → `aria-label="Notifications"`. Theme toggle → label swaps based on resolved theme: `aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}`.
3. **Skeleton charts** built from `<div>` shapes (donut ring, histogram bars, latency bars in Bento) carry `role="img"` and a descriptive `aria-label`.
4. **Color-only status is forbidden**: status is always conveyed by the icon + label pair, never by color alone. The sidebar bell dot is decorative; the actual notifications page (when wired) will surface the count + a label.

### Adding a new icon

1. Pick the closest match from <https://lucide.dev/icons>. If the meaning maps to one of the **reserved status icons** above, reuse that one: don't introduce a synonym.
2. Import as a named export: `import { NewIcon } from "lucide-react"`.
3. Choose the size from the **Sizes by layer** table; never invent a new size.
4. Add `aria-hidden` if it has accompanying text. Otherwise, wrap it in a button with `aria-label`.
5. If the icon represents a route or feature, store it in the route table as `LucideIcon`-typed prop, not as JSX:

   ```tsx
   const items: { href: string; label: string; icon: LucideIcon }[] = [
     { href: "/", label: "Home", icon: Home },
     // …
   ]
   ```

   This keeps the icon component a value, lets the consumer pick the size, and makes the table easy to map / filter.

## Do's and Don'ts

### Do

- Apply `rounded-md` (8 px) to every button, input, badge, and nav row.
- Use the daisy depth utilities: never bare `shadow-sm` on filled surfaces.
- Keep the sidebar background transparent so it inherits the body grey.
- Use `--primary` (green) only as the active-state colour and primary CTA fill.
- Use status dots (`rounded-full`) sparingly: only as leading indicators on small chips.
- Dark mode: rely on the `.dark` class swap; every token has a paired value.

### Don't

- Don't use `rounded-full` on buttons or input fields. Pill shapes are reserved for genuinely circular elements (avatars, dots, sliders, switches, scrollbars).
- Don't add a horizontal divider between the sidebar and the main panel: they share the body grey, the panel's shadow does the separation.
- Don't introduce a top bar inside the floating panel. Page headers are owned by each page via `PageHeader`.
- Don't apply `shadow-depth-card-lg` to inner cards: that depth is reserved for the single floating main panel.
- Don't use the green for body text or large tinted backgrounds.
- Don't use `hover:bg-primary/N` tints on rows or cards. Hover surfaces use `hover:bg-accent` exclusively.
- Don't flip a tile from neutral to `bg-primary` on `group-hover`: keep the icon tile neutral and let `hover:bg-accent` carry the hover.
- Don't render a custom hero with handcrafted typography on a page that already has `PageHeader`. Use the `eyebrow` slot for status pills.
- Don't use `font-bold` on headings. Headings are `font-semibold` (600). `font-bold` (700) is reserved for `button-md` (the uppercase compact label).
- Don't use Tailwind `gray-*`, `neutral-*`, or `slate-*` for surface colors. Surfaces always come from semantic tokens (`bg-card`, `bg-muted`, `bg-sidebar`, `bg-accent`). The dark theme is **MongoDB Compass teal-blue**, not generic gray.
- Don't bake hex values into components. Read from CSS variables (`--background`, `--syntax-key`, …) or Tailwind utilities backed by them.

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

## Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Mobile | < 640 px | sidebar in `Sheet`, main panel full-width edge-to-edge, page padding `px-4` |
| Tablet | 640 – 1023 px | sidebar still in `Sheet`, main panel still full-width, page padding `px-6` |
| Desktop (md) | ≥ 768 px | floating panel turns on (`md:rounded-2xl md:border md:shadow-depth-card-lg`) and gets `md:p-4` outer margin |
| Desktop (lg) | ≥ 1024 px | bento grid switches to `lg:grid-cols-3`, page content padding `md:px-10` |

### Touch targets

- Buttons render at ~28 px (`text-xs` + `py-1.5`). For surfaces that need a beefier hit area, use `size="lg"` (~32 px) or wrap in a larger row.
- Inputs render at 36 px (`h-9`).
- Sidebar nav rows render at 36 px (`h-9`).
- Sidebar header / footer rows render at 36 / 48 px respectively.

### Sheet (mobile sidebar)

- Width 288 px (`w-72`), `border-0 bg-background p-4`.
- Sidebar component is reused as-is; just pass an `onNavigate` callback to auto-close on link click.

## Accessibility

- Every interactive element has `outline-none focus-visible:ring-2 focus-visible:ring-ring` (or `focus-visible:ring-[3px]` on inputs/buttons).
- Nav links carry `aria-current="page"` when active.
- Sidebar bell button: `aria-label="Notifications"`. Theme toggle: `aria-label` swaps based on resolved theme.
- Skip-to-content link in `app/layout.tsx`: `focus:not-sr-only` reveals a `rounded-md bg-primary text-primary-foreground` button.
- Account selector / footer profile / settings parent are real `<button>` / `<Link>` elements, never `<div role>`.
- Submenu active-dot is decorative (`aria-hidden`).
- Bento skeleton bars and donut ring are wrapped with `role="img"` + descriptive `aria-label` so screen readers announce the empty-state nature.

### Accessibility Requirements

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

## File Structure

```
app/
├── layout.tsx                    # Outfit font, ThemeProvider, QueryProvider
├── globals.css                   # tokens + daisy depth utilities + base layer
└── (admin)/
    ├── layout.tsx                # nested floating-card shell + Sheet
    ├── page.tsx                  # dashboard
    ├── loading.tsx               # dashboard skeleton
    ├── error.tsx
    ├── settings/
    │   ├── layout.tsx            # PageHeader "Account settings"
    │   ├── page.tsx              # redirect → /settings/general
    │   ├── general/page.tsx
    │   ├── security/page.tsx
    │   ├── notifications/page.tsx
    │   └── billing/page.tsx
    └── …other surfaces

shared/ui/
├── button.tsx                    # cva variants + shadow-depth-btn
├── card.tsx                      # shadow-depth-card
├── input.tsx                     # shadow-depth-input
├── badge.tsx                     # rounded-md
├── … (full shadcn set)
└── layout/
    ├── sidebar.tsx               # 5-region nested-card sidebar
    ├── page-header.tsx           # title + description + actions
    └── setting-card.tsx          # left/right + optional Save footer

features/
└── dashboard/components/
    ├── dashboard-overview.tsx    # hero + BentoGrid + activity + quick actions
    └── bento-grid.tsx            # 4 empty-state cards
```

## Migration Guide

To lift this design system into a new admin/SaaS app:

1. **Copy the source tokens.** Drop the entire `:root` and `.dark` blocks plus the `@theme inline` bridge plus the depth `@utility` block from `app/globals.css` into your project's global stylesheet.
2. **Install Outfit.** In `app/layout.tsx`, import `Outfit` from `next/font/google` with weights `[300, 400, 500, 600, 700]` and apply the variable on `<body>`. Make sure `--font-outfit` is referenced from `--font-sans` in `@theme inline`.
3. **Copy the layout shell.** `app/(admin)/layout.tsx` (or equivalent route group) plus `shared/ui/layout/{sidebar,page-header,setting-card}.tsx`. The sidebar's nav structure is the only thing you'll need to swap for your routes.
4. **Copy the shadcn primitives** under `shared/ui/`. Critically, replace any `rounded-full` / `shadow-xs` defaults from upstream shadcn with `rounded-md` / `shadow-depth-*`. The provided `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx` already do this.
5. **Set up theming.** `next-themes` `ThemeProvider` with `attribute="class"`, `defaultTheme="dark"` (the system ships dark-first using the MongoDB Compass palette), and `enableSystem={false}`. The `useTheme` hook is consumed by the sidebar header toggle.
6. **Align radii.** Audit your existing components: every interactive surface should be `rounded-md`; every card surface should be `rounded-xl`; the floating main panel should be `rounded-2xl`. Avatars, status dots, sliders, switches stay `rounded-full`.
7. **Verify dark mode.** Toggle the theme and check that the daisy depth shadows still register; the dark-scope CSS rules under `.dark .shadow-depth-*` handle this automatically. Confirm sidebar uses `bg-sidebar` (not transparent) so the Compass `#112329` shows distinct from the body `#0e1f26`.
8. **Lock in iconography.** Install `lucide-react`, set `"iconLibrary": "lucide"` in `components.json`, and copy the *Iconography* section into your project doc. Audit existing icons against the *Sizes by layer* table: replace any non-lucide icons or off-spec sizes during migration.
9. **Compass dark palette.** The dark theme is the MongoDB Compass palette by default. If your brand requires different dark colors, swap the `.dark` scope hex values in `globals.css` (and the syntax `text-syntax-*` tokens): the structure stays identical.

The system has no runtime JS dependency beyond `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `next-themes`, and the Radix primitives shadcn ships. No icon font, no SVG sprite, no daisyui plugin install.

## Known Gaps

- The system intentionally documents *components in the admin app*, not marketing surfaces. Hero bands, code mockups, pricing tiers, course tiles are out of scope and have been removed from this spec.
- The sidebar bell does not yet open a notifications panel: wires up later.
- The account selector dropdown is a placeholder; real workspace switching wires up later.
- Form validation success state is not yet styled (only error and disabled).
- Animation tokens are exposed but only the `fade-in / slide-in-from-bottom-1` page transition uses them today.
- `/design-preview` is a live token reference; it is not part of the sidebar nav and is intended for engineers / designers / AI agents inspecting the system.

## Iteration Guide

1. Add new components as separate `components:` entries in the YAML frontmatter, then document them in the markdown body under *Component Catalogue*.
2. Reference tokens with the `{colors.*}` / `{typography.*}` / `{shadow.*}` syntax: never hardcode hex / oklch values in component specs.
3. Default new body to `body-sm` (14 px): the system reads as compact-but-readable.
4. Default new buttons to `button-md` (`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider`). Resist the urge to make a "bigger CTA"; reach for `size="lg"` instead of inventing a new variant.
5. New cards: `rounded-xl border bg-card shadow-depth-card`. New rows in cards: simple `flex items-center gap-3`.
6. New active states: white surface (`bg-card`) + `shadow-depth-btn`. Never tint with `bg-primary` for active states larger than a 6-px dot.

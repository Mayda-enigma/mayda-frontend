"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  Circle,
  Plus,
  ArrowUpRight,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react"

const surfaceTokens = [
  { name: "background", class: "bg-background", description: "Body / canvas" },
  { name: "card", class: "bg-card", description: "Floating panel + cards" },
  { name: "popover", class: "bg-popover", description: "Dropdowns / sheets" },
  { name: "sidebar", class: "bg-sidebar", description: "Sidebar surface" },
  { name: "muted", class: "bg-muted", description: "Input bg / hover" },
  { name: "accent", class: "bg-accent", description: "Nav hover / ghost hover" },
  { name: "secondary", class: "bg-secondary", description: "Secondary surfaces" },
  { name: "border", class: "bg-border", description: "Dividers" },
]

const brandTokens = [
  { name: "primary", class: "bg-primary text-primary-foreground", description: "Primary CTA / active state" },
  { name: "primary-deep", class: "bg-primary-deep text-white", description: "Solid filled-button alt" },
  { name: "destructive", class: "bg-destructive text-white", description: "Errors / sign out" },
  { name: "success", class: "bg-success text-white", description: "Confirmations / positive" },
  { name: "warning", class: "bg-warning text-white", description: "Attention / non-critical" },
  { name: "ring", class: "bg-ring text-primary-foreground", description: "Focus ring" },
]

const accentTokens = [
  { name: "accent-blue", class: "bg-accent-blue text-white" },
  { name: "accent-purple", class: "bg-accent-purple text-white" },
  { name: "accent-pink", class: "bg-accent-pink text-white" },
  { name: "accent-orange", class: "bg-[var(--accent-orange)] text-white" },
  { name: "brand-green-dark", class: "bg-[var(--brand-green-dark)] text-white" },
  { name: "brand-teal", class: "bg-brand-teal text-white" },
]

const radiusTokens = [
  { name: "rounded-xs", class: "rounded-xs", value: "4 px" },
  { name: "rounded-sm", class: "rounded-sm", value: "6 px" },
  { name: "rounded-md", class: "rounded-md", value: "8 px (buttons, inputs, badges)" },
  { name: "rounded-lg", class: "rounded-lg", value: "12 px" },
  { name: "rounded-xl", class: "rounded-xl", value: "16 px (cards)" },
  { name: "rounded-2xl", class: "rounded-2xl", value: "16 px (panel)" },
  { name: "rounded-full", class: "rounded-full", value: "avatars / dots only" },
]

const shadowTokens = [
  { name: "shadow-depth-btn", class: "shadow-depth-btn", description: "Filled buttons / active nav" },
  { name: "shadow-depth-btn-active", class: "shadow-depth-btn-active", description: ":active swap" },
  { name: "shadow-depth-card", class: "shadow-depth-card", description: "Card / SettingCard / BentoCard" },
  { name: "shadow-depth-card-lg", class: "shadow-depth-card-lg", description: "Floating main panel" },
  { name: "shadow-depth-input", class: "shadow-depth-input", description: "Inputs (recessed)" },
  { name: "shadow-depth-overlay", class: "shadow-depth-overlay", description: "Popover / sheet / dialog" },
]

export default function DesignPreviewPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="md:p-4">
        <main className="min-h-[calc(100dvh-1rem)] overflow-hidden bg-card text-card-foreground md:min-h-[calc(100dvh-2rem)] md:rounded-2xl md:border md:shadow-depth-card-lg">
          <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-10 md:px-10 md:py-12">
            {/* ============================================================ */}
            {/* Header */}
            {/* ============================================================ */}
            <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                  Design preview
                </span>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  MongoDB Compass design system
                </h1>
                <p className="max-w-prose text-sm text-muted-foreground md:text-base">
                  Live token reference for{" "}
                  <span className="font-mono text-syntax-key">apps/manager</span>. Outfit typography on
                  the MongoDB Compass dark palette by default.
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                {mounted && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                  >
                    {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                  </Button>
                )}
                <Button>
                  <Plus />
                  Quick action
                </Button>
              </div>
            </header>

            {/* ============================================================ */}
            {/* Color tokens */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="01"
                title="Color tokens"
                description="Compass dark surfaces blend at #0e1f26 (background, card) with the sidebar at #112329 distinguishing via shadow + border."
              />

              <SubHeading>Surfaces</SubHeading>
              <TokenGrid>
                {surfaceTokens.map((t) => (
                  <SurfaceSwatch key={t.name} {...t} />
                ))}
              </TokenGrid>

              <SubHeading>Brand &amp; semantic</SubHeading>
              <TokenGrid>
                {brandTokens.map((t) => (
                  <SurfaceSwatch key={t.name} {...t} />
                ))}
              </TokenGrid>

              <SubHeading>Extended accents</SubHeading>
              <TokenGrid>
                {accentTokens.map((t) => (
                  <SurfaceSwatch key={t.name} {...t} description="Use sparingly" />
                ))}
              </TokenGrid>
            </section>

            {/* ============================================================ */}
            {/* Typography */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="02"
                title="Typography"
                description="Outfit drives every label. 500 is the workhorse weight; 600 anchors headings; 700 is reserved for the uppercase compact button label (button-md)."
              />

              <Card>
                <CardContent className="space-y-4">
                  <p className="text-5xl font-semibold leading-[1.1] tracking-tight">Welcome back</p>
                  <p className="text-3xl font-semibold tracking-tight">Heading 1 &mdash; 30 px</p>
                  <p className="text-2xl font-semibold tracking-tight">Heading 2 &mdash; 24 px</p>
                  <p className="text-lg font-semibold">Heading 3 &mdash; 18 px</p>
                  <p className="text-base font-semibold">Heading 4 &mdash; 16 px</p>
                  <p className="text-sm font-semibold">Heading 5 &mdash; 14 px (SettingCard / BentoCard)</p>
                  <p className="text-base">Body md &mdash; 16 px @ 400</p>
                  <p className="text-sm">Body sm &mdash; 14 px @ 400 (default body)</p>
                  <p className="text-sm font-medium">Body sm medium &mdash; 14 px @ 500 (nav, labels)</p>
                  <p className="text-xs">Caption &mdash; 12 px @ 400</p>
                  <p className="text-xs font-medium">Caption medium &mdash; 12 px @ 500</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Micro uppercase &mdash; 10 px (Free chip)
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Button md &mdash; 12 px @ 700 uppercase
                  </p>
                  <pre className="font-mono text-sm text-muted-foreground">code-md - 14 px Source Code Pro</pre>
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Buttons */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="03"
                title="Buttons"
                description="rounded-md (NOT pill). Labels are uppercase / text-xs / font-bold / tracking-wider. The link variant opts out and reads like inline prose."
              />

              <Card>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>
                      <Plus /> Primary
                    </Button>
                    <Button variant="destructive">
                      <AlertOctagon /> Destructive
                    </Button>
                    <Button variant="outline">
                      <Bell /> Outline
                    </Button>
                    <Button variant="secondary">
                      <ChevronRight /> Secondary
                    </Button>
                    <Button variant="ghost">
                      <ArrowUpRight /> Ghost
                    </Button>
                    <Button variant="link">
                      Read the docs <ArrowUpRight />
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" aria-label="Notifications">
                      <Bell />
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Badges */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="04"
                title="Badges"
                description="rounded-md (NOT pill) by default. The leading-dot status pill is the only place rounded-full is allowed."
              />

              <Card>
                <CardContent className="flex flex-wrap items-center gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Critical</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">
                    <CheckCircle2 /> Success
                  </Badge>
                  <Badge variant="warning">
                    <AlertTriangle /> Warning
                  </Badge>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                    Live
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden />
                    All systems clear
                  </span>
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Inputs */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="05"
                title="Inputs"
                description="h-9, rounded-md, hairline-strong border, recessed shadow-depth-input, primary-tinted focus ring."
              />

              <Card>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="dp-name">
                      Display name
                    </label>
                    <Input id="dp-name" placeholder="Restaurant Casablanca" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="dp-email">
                      Email
                    </label>
                    <Input id="dp-email" type="email" placeholder="manager@mayda.app" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="dp-disabled">
                      Disabled
                    </label>
                    <Input id="dp-disabled" disabled value="Locked field" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="dp-error">
                      Error
                    </label>
                    <Input id="dp-error" aria-invalid placeholder="Invalid value" />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Cards */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="06"
                title="Cards"
                description="rounded-xl + shadow-depth-card. Global rule lifts -1px on hover."
              />

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <span
                      className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <ShieldCheck className="size-5" />
                    </span>
                    <CardTitle>All systems clear</CardTitle>
                    <CardDescription>No anomalies detected in the last 24 h.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm">
                      View report <ArrowUpRight />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <span
                      className="grid size-10 place-items-center rounded-md bg-warning/15 text-warning"
                      aria-hidden
                    >
                      <AlertTriangle className="size-5" />
                    </span>
                    <CardTitle>Attention</CardTitle>
                    <CardDescription>Stock for 3 SKUs is below reorder point.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      Open stock view <ChevronRight />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <span
                      className="grid size-10 place-items-center rounded-md bg-destructive/15 text-destructive"
                      aria-hidden
                    >
                      <AlertOctagon className="size-5" />
                    </span>
                    <CardTitle>Critical</CardTitle>
                    <CardDescription>Reservation conflict on table T-12.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" size="sm">
                      Resolve <ArrowUpRight />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* ============================================================ */}
            {/* Radius scale */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="07"
                title="Radius scale"
                description="rounded-md anchors interactive surfaces; rounded-xl anchors cards; rounded-full is reserved for circles."
              />

              <Card>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {radiusTokens.map((r) => (
                      <div key={r.name} className="space-y-2">
                        <div
                          className={`${r.class} h-16 w-full bg-muted shadow-depth-btn`}
                          aria-hidden
                        />
                        <div className="space-y-0.5">
                          <p className="text-xs font-mono text-syntax-key">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Depth shadows */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="08"
                title="Depth shadows"
                description="DaisyUI-inspired layered shadows: inset highlight + close hairline + ambient drop. Dark mode shrinks the highlight and deepens the shadow."
              />

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {shadowTokens.map((s) => (
                  <div
                    key={s.name}
                    className={`${s.class} flex flex-col gap-1 rounded-xl border bg-card p-5`}
                  >
                    <p className="text-xs font-mono text-syntax-key">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* Status icons */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="09"
                title="Status iconography"
                description="lucide-react only. Reserved glyphs map to specific states: Circle (empty), ShieldCheck (clear), AlertTriangle (warn), AlertOctagon (critical), Bell (notifications)."
              />

              <Card>
                <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                  <StatusTile icon={Circle} label="Empty / pending" colorClass="text-muted-foreground/40" />
                  <StatusTile icon={ShieldCheck} label="Clear" colorClass="text-success" />
                  <StatusTile icon={AlertTriangle} label="Warning" colorClass="text-warning" />
                  <StatusTile icon={AlertOctagon} label="Critical" colorClass="text-destructive" />
                  <StatusTile icon={Bell} label="Notifications" colorClass="text-muted-foreground" />
                </CardContent>
              </Card>
            </section>

            {/* ============================================================ */}
            {/* Syntax highlighting */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="10"
                title="Syntax highlighting (MongoDB Compass)"
                description="Keys cyan, strings emerald, numbers orange, punctuation label-grey. Bg uses bg-muted for the code-well feel."
              />

              <pre className="rounded-xl border bg-muted p-5 font-mono text-sm leading-relaxed text-syntax-punctuation overflow-x-auto">
{`{
  `}<span className="text-syntax-key">_id</span>{`: `}<span className="text-syntax-string">&quot;6789ab12cd34ef5678901234&quot;</span>{`,
  `}<span className="text-syntax-key">orders</span>{`: `}<span className="text-syntax-number">0</span>{`,
  `}<span className="text-syntax-key">verified</span>{`: `}<span className="text-syntax-number">true</span>{`,
  `}<span className="text-syntax-key">roles</span>{`: `}<span className="text-syntax-punctuation">Array (12)</span>{`
}`}
              </pre>
            </section>

            {/* ============================================================ */}
            {/* Motion */}
            {/* ============================================================ */}
            <section className="space-y-6">
              <SectionHeading
                eyebrow="11"
                title="Motion"
                description="Hover the cards (lift -1 px), press the buttons (translate +0.5 px). Page-level keyframes available as animate-mongodb-{fade-in,scale-in,slide-up}."
              />

              <Card>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="animate-mongodb-fade-in rounded-xl border bg-muted p-5">
                    <p className="text-sm font-medium">animate-mongodb-fade-in</p>
                    <p className="text-xs text-muted-foreground">200 ms ease-out</p>
                  </div>
                  <div className="animate-mongodb-scale-in rounded-xl border bg-muted p-5">
                    <p className="text-sm font-medium">animate-mongodb-scale-in</p>
                    <p className="text-xs text-muted-foreground">200 ms ease-out</p>
                  </div>
                  <div className="animate-mongodb-slide-up rounded-xl border bg-muted p-5">
                    <p className="text-sm font-medium">animate-mongodb-slide-up</p>
                    <p className="text-xs text-muted-foreground">200 ms ease-out</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Section {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="max-w-prose text-sm text-muted-foreground md:text-base">{description}</p>
    </div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{children}</h3>
}

function TokenGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">{children}</div>
}

function SurfaceSwatch({
  name,
  class: cls,
  description,
}: {
  name: string
  class: string
  description?: string
}) {
  return (
    <div className="rounded-xl border bg-card shadow-depth-card overflow-hidden">
      <div className={`${cls} h-16 border-b border-border`} aria-hidden />
      <div className="p-3 space-y-0.5">
        <p className="text-xs font-mono text-syntax-key">{name}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

function StatusTile({
  icon: Icon,
  label,
  colorClass,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  colorClass: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border bg-muted p-4 text-center">
      <Icon className={`size-7 ${colorClass}`} />
      <p className="text-xs font-medium">{label}</p>
    </div>
  )
}

# mayda-frontend

> Multi-brand restaurant ordering platform — customer web apps, admin dashboard, and shared UI components.

## Overview

`mayda-frontend` is a Next.js monorepo (pnpm workspace) powering Mayda's customer-facing restaurant websites. It serves multiple restaurant brands from a single codebase, with shared UI components, internationalization (i18n), 3D product visualization, and real-time ordering features.

## Architecture

```
mayda-frontend/
├── apps/
│   ├── web/          # Customer-facing restaurant site (Next.js)
│   └── admin/        # Admin panel (Next.js)
├── packages/
│   ├── @mayda/ui/           # Shared UI component library
│   ├── @mayda/plugin-card/  # Card payment plugin
│   ├── @mayda/delivery-ui/  # Delivery tracking interface
│   ├── @mayda/stripe/       # Stripe integration
│   └── @mayda/eslint-config/# Shared ESLint config
├── packages/ui/             # Shadcn/ui + Tailwind components
└── docker/                  # Docker configuration
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Monorepo | pnpm workspaces |
| UI | Shadcn/ui, Radix UI, Tailwind CSS |
| i18n | next-intl |
| 3D | Three.js / React Three Fiber |
| Payments | Stripe, Card plugin |
| Forms | React Hook Form + Zod |
| State | React Query, Zustand |

## Key Features

- **Multi-brand support** — single deployment serves multiple restaurant brands
- **3D menu items** — interactive product visualization with Three.js
- **Internationalization** — full i18n via `next-intl`
- **Real-time ordering** — cart, checkout, order tracking
- **Responsive design** — mobile-first with Tailwind CSS
- **Accessibility** — Radix UI primitives, WCAG compliant
- **Dark mode** — theme-aware UI with next-themes

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the customer web app
pnpm --filter @mayda/web dev

# Run the admin app
pnpm --filter @mayda/admin dev

# Build all packages
pnpm build
```

## Development

- **Component library** lives in `packages/@mayda/ui/` — shared across all apps
- **Translations** are managed via `next-intl` message files
- **API client** auto-generates TypeScript types from the backend OpenAPI spec

## Deployment

- Containerized via Docker (see `Dockerfile`)
- Pulled as `ghcr.io/mayda-app/mayda-frontend:latest` in `mayda-infra`
- Statically optimized pages where possible for performance

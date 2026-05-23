# Contributing

## Architecture

- [Feature-Based Structure](docs/architecture/feature-based-structure.md) — folder layout & cross-feature import rules
- [TanStack Query Pattern](docs/architecture/tanstack-query-pattern.md) — 5-file API contract, QueryClient defaults & provider
- [Example Feature](docs/architecture/example-feature/menu/) — copy-paste template with types, API layer, and components

## Quick start

```bash
npm install
npm run dev -w apps/web-client
```

## Conventions

| Rule | Enforcement |
|------|-------------|
| Features import from `shared/` only | Code review |
| No direct feature-to-feature imports | Code review |
| All API features have exactly 5 files in `api/` | Code review |
| DTOs never leak outside `api/` files | Code review |
| One commit per logical task | Git history |

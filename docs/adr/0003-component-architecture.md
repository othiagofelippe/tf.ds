# ADR-0003: Component Architecture

- **Status:** accepted
- **Date:** 2026-05-03
- **Author:** Thiago Felippe

## Context

We need to decide the headless primitive layer and styling approach for components.

## Decision

Use **Radix UI primitives** + **CVA (class-variance-authority)** + **tailwind-merge** — the same stack used by shadcn/ui, packaged as a proper npm library.

Components are **opinionated**: no `asChild` pattern, no arbitrary `className` escape hatches. Only the props explicitly defined in each component's API are available.

All components use `forwardRef` for ref forwarding.

## Consequences

- Accessibility is handled by Radix UI (WAI-ARIA, keyboard nav, focus trapping)
- CVA provides type-safe variants with TypeScript autocompletion
- Opinionated API enforces consistency — consumers cannot break the design system visually
- `forwardRef` enables integration with react-hook-form, animation libraries, etc.

## Alternatives Considered

- **Base UI (MUI)** — newer and cleaner API but less mature, smaller ecosystem
- **Headless UI** — fewer components, Tailwind Labs ecosystem lock-in
- **Pure HTML + CVA** — more control but requires implementing accessibility from scratch

# ADR-0001: Monorepo Tooling

- **Status:** accepted
- **Date:** 2026-05-03
- **Author:** Thiago Felippe

## Context

tf.ds ships multiple packages (`@tfds/tokens`, `@tfds/components`) and a docs app. We need a monorepo tool to manage builds, caching, and task orchestration across packages.

## Decision

Use **Turborepo + pnpm workspaces**.

## Consequences

- Build caching via Turbo reduces rebuild time significantly
- `pnpm` strict dependency isolation prevents phantom dependencies
- `turbo.json` task pipeline ensures packages build before apps that depend on them

## Alternatives Considered

- **Nx** — more powerful but heavier, configuration overhead not justified for this project size
- **npm/yarn workspaces** — no caching, slower builds

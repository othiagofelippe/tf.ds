# Requirements — Initial Setup

## Overview

Establish the foundational infrastructure for tf.ds: a professional, publishable design system monorepo with tokens, components, documentation, and CI/CD.

## Functional Requirements

### FR-01: Monorepo
- The project MUST be a monorepo managed by Turborepo + pnpm workspaces
- It MUST contain `packages/tokens`, `packages/components`, and `apps/docs`
- Shared configs MUST live in `packages/tsconfig` and `packages/eslint-config`

### FR-02: Design Tokens
- Tokens MUST follow the W3C DTCG format (`.tokens.json`)
- Tokens MUST be organized in 3 layers: Primitive → Semantic → Component
- The system MUST support 3 themes: `light` (`:root`), `dark` (`.dark`), `ocean` (`.ocean`)
- Style Dictionary MUST output: CSS variables, JS exports, and Tailwind 4 preset

### FR-03: Components Package
- Components MUST be bundled as ESM + CJS + TypeScript declarations via tsup
- The package MUST have `sideEffects: false` for tree-shaking
- React and lucide-react MUST be peer dependencies

### FR-04: Documentation
- The repo MUST contain: `CLAUDE.md`, `DESIGN.md`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSE`
- Architecture decisions MUST be recorded in `docs/adr/`
- Component specs MUST live in `.kiro/specs/<component>/`

### FR-05: CI/CD
- Every PR MUST run: format check, lint, type-check, tests, build
- Merges to main MUST trigger the Changesets release workflow
- Bundle size MUST be gated via size-limit

### FR-06: Developer Experience
- Git hooks MUST enforce: lint-staged on pre-commit, commitlint on commit-msg
- Storybook MUST run locally via `pnpm dev`

## Non-Functional Requirements

- Node >= 20, pnpm >= 10
- TypeScript strict mode throughout
- All packages published publicly to npm under `@tfds` scope

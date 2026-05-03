# Requirements — Initial Setup

## Overview

Establish the foundational infrastructure for tf.ds: a professional, publishable design system monorepo with tokens, components, documentation, and CI/CD.

## Functional Requirements

### FR-01: Monorepo
- O projeto DEVE ser um monorepo gerenciado por Turborepo + pnpm workspaces
- DEVE conter `packages/tokens`, `packages/components` e `apps/docs`
- Configs compartilhadas DEVEM viver em `packages/tsconfig` e `packages/eslint-config`

### FR-02: Design Tokens
- Tokens DEVEM seguir o formato W3C DTCG (`.tokens.json`)
- Tokens DEVEM ser organizados em 3 camadas: Primitive → Semantic → Component
- O sistema DEVE suportar 3 temas: `light` (`:root`), `dark` (`.dark`), `ocean` (`.ocean`)
- Style Dictionary DEVE gerar: CSS variables, JS exports e Tailwind 4 preset

### FR-03: Pacote de Componentes
- Componentes DEVEM ser bundlados como ESM + CJS + TypeScript declarations via tsup
- O pacote DEVE ter `sideEffects: false` para tree-shaking
- React e lucide-react DEVEM ser peer dependencies

### FR-04: Documentação
- O repo DEVE conter: `CLAUDE.md`, `DESIGN.md`, `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSE`
- Decisões de arquitetura DEVEM ser registradas em `docs/adr/`
- Specs de componentes DEVEM viver em `docs/specs/<componente>/`

### FR-05: CI/CD
- Todo PR DEVE rodar: format check, lint, type-check, testes, build
- Merges na main DEVEM disparar o workflow de release via Changesets
- Bundle size DEVE ser controlado via size-limit

### FR-06: Developer Experience
- Git hooks DEVEM garantir: lint-staged no pre-commit, commitlint no commit-msg
- Storybook DEVE rodar localmente via `pnpm dev`

## Non-Functional Requirements

- Node >= 20, pnpm >= 10
- TypeScript strict mode em todo o projeto
- Todos os pacotes publicados publicamente no npm sob o scope `@tfds`

# CLAUDE.md — tf.ds

Design system context for AI coding assistants.

## What is tf.ds

tf.ds is a professional, opinionated React design system by Thiago Felippe. It ships as two npm packages:

- `@tfds/tokens` — design tokens in W3C DTCG format
- `@tfds/components` — React components (Radix UI + CVA + Tailwind 4)

## Monorepo Structure

```
apps/docs/           → Storybook (documentation)
packages/tokens/     → Style Dictionary + DTCG tokens
packages/components/ → React components
packages/tsconfig/   → Shared TypeScript configs
packages/eslint-config/ → Shared ESLint config
docs/adr/            → Architecture Decision Records
docs/rfc/            → Request for Comments
```

## Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **Tokens:** Style Dictionary v4, W3C DTCG format (.tokens.json)
- **Components:** Radix UI primitives + CVA + tailwind-merge + Tailwind 4
- **Bundler:** tsup (esm + cjs + dts)
- **Docs:** Storybook
- **Tests:** Vitest + Testing Library
- **Versioning:** Changesets

## Token Architecture

3-layer hierarchy:

1. **Primitive** — raw values: `color.ocean.500`, `space.4`, `font.size.md`
2. **Semantic** — intent: `color.text.primary`, `color.bg.default`, `color.action.primary`
3. **Component** — scoped: `button.color.bg.primary`

Themes: `:root` (light), `.dark`, `.ocean` (fixed, independent)
Color space: OKLCH throughout
Naming: dot notation in source → CSS kebab variables (`--tfds-color-text-primary`)

## Component Rules

- **Opinionated** — no `asChild`, no arbitrary `className` escape hatches
- **forwardRef** on every component
- **Props only** — consumers use declared props, not class overrides
- Variants: `primary | secondary | outline | ghost | destructive | link`
- Sizes: `sm | md | lg | icon`
- States: `disabled` and `loading` as boolean props
- i18n: optional string props with English fallbacks (e.g. `loadingLabel`)

## Component Lifecycle

`experimental` → `stable` → `deprecated` → `removed`

A component is `stable` when it has: stories (all variants/states), Controls, Docs, Do/Don't, Accessibility tab passing, and unit tests.

## Coding Conventions

- TypeScript strict mode, never `any`, never `!` non-null assertion
- `interface` over `type` (except unions)
- Named exports only
- No comments unless the WHY is non-obvious
- No `console.log` in committed code
- Conventional Commits: `feat|fix|chore|refactor|docs|test(scope): description`

## Key Files

- Token source: `packages/tokens/src/`
- Component source: `packages/components/src/`
- ADRs: `docs/adr/`
- Build script (tokens): `packages/tokens/build.js`
- Bundle config (components): `packages/components/tsup.config.ts`

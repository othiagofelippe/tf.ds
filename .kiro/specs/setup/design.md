# Design — Initial Setup

## Monorepo Structure

```
tf.ds/
├── .github/
│   └── workflows/
│       ├── ci.yml          # lint, type-check, test, size-limit, build
│       └── release.yml     # changesets auto-publish
├── .kiro/
│   └── specs/              # spec-driven development
├── apps/
│   └── docs/               # Storybook
├── packages/
│   ├── tokens/             # @tfds/tokens
│   ├── components/         # @tfds/components
│   ├── tsconfig/           # @tfds/tsconfig (private)
│   └── eslint-config/      # @tfds/eslint-config (private)
├── docs/
│   ├── adr/                # Architecture Decision Records
│   ├── rfc/                # Request for Comments
│   ├── migrations/         # Migration guides
│   └── decisions/          # Decision log
├── CLAUDE.md
├── DESIGN.md
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Token Pipeline

```
src/*.tokens.json (DTCG)
       ↓
 Style Dictionary v4
       ↓
 ┌─────┬──────┬────────────┐
 CSS   JS    Tailwind
 vars  ESM   preset
```

## Component Build Pipeline

```
src/components/*.tsx
       ↓
    tsup
       ↓
 ┌─────┬─────┬─────┐
 ESM  CJS   DTS
```

## Key Decisions

- **ADR-0001**: Turborepo + pnpm (monorepo tooling)
- **ADR-0002**: W3C DTCG format (tokens)
- **ADR-0003**: Radix UI + CVA (component architecture)
- **ADR-0004**: CSS class-based theming, OKLCH color space

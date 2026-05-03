# Design — Initial Setup

## Estrutura do Monorepo

```
tf.ds/
├── .github/
│   └── workflows/
│       ├── ci.yml          # lint, type-check, test, size-limit, build
│       └── release.yml     # changesets auto-publish
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
│   ├── migrations/         # Guias de migração
│   ├── decisions/          # Decision log
│   └── specs/              # Spec-driven: requirements, design, tasks
├── CLAUDE.md
├── DESIGN.md
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Pipeline de Tokens

```
src/*.tokens.json (DTCG)
        ↓
  Style Dictionary v4
        ↓
  ┌─────┬──────┬──────────┐
  CSS   JS    Tailwind
  vars  ESM   preset
```

## Pipeline de Componentes

```
src/components/*.tsx
        ↓
      tsup
        ↓
  ┌─────┬─────┬─────┐
  ESM  CJS   DTS
```

## Decisões Relacionadas

- **ADR-0001**: Turborepo + pnpm
- **ADR-0002**: Formato W3C DTCG
- **ADR-0003**: Radix UI + CVA
- **ADR-0004**: Temas via CSS class, OKLCH

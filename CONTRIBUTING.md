# Contributing to tf.ds

## Development Setup

```bash
git clone https://github.com/thiagofelippe/tf.ds
cd tf.ds
pnpm install
pnpm build
pnpm dev
```

## Project Structure

```
tf.ds/
├── apps/
│   └── docs/              # Storybook
├── packages/
│   ├── tokens/            # Design tokens (W3C DTCG)
│   ├── components/        # React components
│   ├── tsconfig/          # Shared TypeScript configs
│   └── eslint-config/     # Shared ESLint config
└── docs/
    ├── adr/               # Architecture Decision Records
    └── rfc/               # Request for Comments
```

## Adding a New Component

1. Open an RFC in `docs/rfc/` describing the component API
2. Create the component in `packages/components/src/components/<name>/`
3. Export from `packages/components/src/index.ts`
4. Add stories in `apps/docs/src/stories/<name>.stories.tsx`
5. Mark status as `experimental` until stories + tests + docs are complete
6. Open a PR — component becomes `stable` after review

## Component Lifecycle

```
experimental → stable → deprecated → removed
```

A component is `stable` when it has:
- All variant stories in Storybook
- Controls panel working
- Do / Don't examples
- Accessibility tab passing
- Unit tests via Vitest + Testing Library
- Props API documented

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(components): add Badge component
fix(tokens): correct ocean border-subtle value
docs(adr): add ADR-004 for token naming
chore(deps): bump style-dictionary to 4.3
```

## Versioning

We use [Changesets](https://github.com/changesets/changesets) for versioning:

```bash
pnpm changeset        # describe your change
pnpm version-packages # bump versions
pnpm release          # publish to npm
```

**Breaking change policy:** deprecated APIs are kept for **3 months** before removal.

## Architecture Decisions

Before making a significant technical decision, check `docs/adr/` for prior decisions.
For new decisions, create a new ADR following the template in `docs/adr/0000-template.md`.

# Tasks — Initial Setup

## Status: 🟢 Fases 1-5 concluídas

---

## Fase 1 — Monorepo Foundation

- [x] Criar estrutura de diretórios
- [x] Configurar `package.json` raiz (Turbo + pnpm)
- [x] Configurar `pnpm-workspace.yaml`
- [x] Configurar `turbo.json` com pipeline de tasks
- [x] Criar `packages/tsconfig` (base + react-library)
- [x] Criar `packages/eslint-config`
- [x] Configurar Prettier + `.prettierrc`
- [x] Configurar Commitlint
- [x] Configurar Husky (pre-commit + commit-msg hooks)

## Fase 2 — Design Tokens

- [x] Criar tokens primitivos: `color.tokens.json`
- [x] Criar tokens primitivos: `typography.tokens.json`
- [x] Criar tokens primitivos: `spacing.tokens.json`
- [x] Criar tokens primitivos: `effect.tokens.json`
- [x] Criar tokens semânticos: `light.tokens.json`
- [x] Criar tokens semânticos: `dark.tokens.json`
- [x] Criar tokens semânticos: `ocean.tokens.json`
- [x] Criar Style Dictionary build script (`build.js`)
- [x] Validar build do Style Dictionary (rodar `pnpm build` em `packages/tokens`)
- [x] Verificar output CSS, JS e Tailwind preset

## Fase 3 — Pacote de Componentes

- [x] Configurar `package.json` de `@tfds/components`
- [x] Configurar `tsup.config.ts`
- [x] Configurar `tsconfig.json`
- [x] Criar utilitário `cn()`
- [x] Criar primeiro componente: `Button`
- [x] Validar build do tsup (ESM + CJS + DTS)
- [x] Configurar Vitest (`vitest.config.ts`)
- [x] Criar teste do `Button`
- [x] Configurar `size-limit` (`.size-limit.json`)

## Fase 4 — Documentação

- [x] `CLAUDE.md`
- [x] `DESIGN.md`
- [x] `README.md`
- [x] `CONTRIBUTING.md`
- [x] `CODE_OF_CONDUCT.md`
- [x] `SECURITY.md`
- [x] `LICENSE`
- [x] ADR-0001: Monorepo tooling
- [x] ADR-0002: Formato DTCG
- [x] ADR-0003: Arquitetura de componentes
- [x] ADR-0004: Arquitetura de temas
- [x] Template de ADR (`docs/adr/0000-template.md`)
- [x] Template de RFC (`docs/rfc/0000-template.md`)

## Fase 5 — CI/CD

- [x] `ci.yml` — lint, type-check, test, size-limit, build
- [x] `release.yml` — Changesets auto-publish
- [x] `.changeset/config.json`
- [x] Adicionar `.npmrc` para publicação no npm
- [x] Adicionar `CHANGELOG.md` inicial

## Fase 6 — Storybook

- [ ] Configurar Storybook em `apps/docs`
- [ ] Instalar addons: a11y, docs, themes, vitest
- [ ] Criar story do `Button` (todas as variantes)
- [ ] Configurar tema tf.ds no Storybook
- [ ] Configurar deploy na Vercel

---

## Progresso Geral

```
Fase 1 — Monorepo Foundation    █████████ 100%
Fase 2 — Design Tokens          █████████ 100%
Fase 3 — Componentes            █████████ 100%
Fase 4 — Documentação           █████████ 100%
Fase 5 — CI/CD                  █████████ 100%
Fase 6 — Storybook              ░░░░░░░░░   0%
```

---
name: create-component
description: Cria um componente novo no tf.ds com spec completa (requirements + design + tasks) e implementação seguindo os padrões do DS. Use quando o usuário pedir para criar um componente novo.
argument-hint: "[ComponentName]"
arguments: [name]
when_to_use: Quando precisar criar um novo componente no design system, incluindo spec, implementação e exports.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create Component — tf.ds

Crie o componente `$name` no tf.ds seguindo o fluxo spec-driven completo.

## Contexto atual

Componentes existentes:
!`find packages/components/src/components -maxdepth 1 -mindepth 1 -type d -exec basename {} \; 2>/dev/null | sort | sed 's/^/  - /'`

Specs existentes:
!`find docs/specs -maxdepth 1 -mindepth 1 -type d ! -name '_template' -exec basename {} \; 2>/dev/null | sort | sed 's/^/  - /'`

---

## Passo 1 — Spec

Crie `docs/specs/<name-lowercase>/requirements.md` com:

- Overview claro do componente e propósito no DS
- FR-01..N: requisitos funcionais (variantes, tamanhos, estados, a11y, API)
- Non-functional: bundle ≤ 10KB, `status: experimental`
- Linguagem: DEVE, NÃO DEVE, PODE

Crie `docs/specs/<name-lowercase>/design.md` com:

- Anatomia ASCII mostrando as partes nomeadas
- Props API: tabela completa (Prop | Tipo | Default | Descrição)
- Variantes: tabela com uso semântico e tokens consumidos
- Estrutura de arquivos a criar
- Tokens semânticos utilizados

Crie `docs/specs/<name-lowercase>/tasks.md` baseado no template em `docs/specs/_template/tasks.md` — todas as tasks desmarcadas, `status: 🔴 Não iniciado`.

## Passo 2 — Implementação

Estrutura obrigatória em `packages/components/src/components/<name-lowercase>/`:

```
<name-lowercase>/
├── <name-lowercase>.tsx         # componente com forwardRef
├── <name-lowercase>.variants.ts # CVA variants
└── index.ts                     # exports nomeados
```

Padrões obrigatórios:

- TypeScript strict — sem `any`, sem `!`
- `interface` para props (nunca `type`)
- `forwardRef` tipado explicitamente
- Sem `asChild`, sem escape hatch de `className`
- CVA em `.variants.ts` separado
- `cn()` importado de `../../lib/cn`
- `displayName` definido
- Props i18n com fallback em inglês (ex: `loadingLabel = "Loading..."`)

Consulte `packages/components/src/components/button/` como referência.

## Passo 3 — Export

Adicione o export em `packages/components/src/index.ts`:

```ts
export { ComponentName, type ComponentNameProps } from "./components/<name-lowercase>"
```

## Passo 4 — Validar build

```bash
pnpm --filter @tfds/components build
```

## Passo 5 — Relatório final

Liste:

- Arquivos criados
- Props API resumida
- Próximos passos: `@component-reviewer` → testes → `@a11y-auditor` → story

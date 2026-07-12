---
name: new-component
description: Gera o scaffold completo de um componente tf.ds v2 (tsx, variants, test, stories, meta.json) direto na pasta padrão, sem passar pelo fluxo de spec. Use quando a API do componente já está decidida e só falta gerar os arquivos.
argument-hint: "[ComponentName]"
arguments: [name]
when_to_use: Quando já se sabe a API do componente (props, variantes) e o objetivo é só gerar a estrutura de arquivos v2 completa rapidamente — sem escrever requirements/design/tasks.
allowed-tools: Read, Write, Bash, Glob, Grep
---

# New Component Scaffold — tf.ds v2

Gere o scaffold completo do componente `$name` em `packages/react/src/components/<name-lowercase>/`, incluindo `meta.json` (contrato v2, AD-003).

Para o fluxo completo com spec (requirements/design/tasks), use `/create-component` em vez desta skill.

## Contexto atual

Componentes existentes:
!`find packages/react/src/components -maxdepth 1 -mindepth 1 -type d -exec basename {} \; 2>/dev/null | sort | sed 's/^/  - /'`

Schema do meta.json:
!`cat docs/schemas/component-meta.schema.json`

---

## Estrutura gerada

```
packages/react/src/components/<name-lowercase>/
├── <name-lowercase>.tsx           # componente com forwardRef
├── <name-lowercase>.variants.ts   # CVA variants
├── <name-lowercase>.test.tsx      # testes (padrão Vitest + Testing Library)
├── meta.json                      # contrato de registry (Storybook/MCP/agentes)
└── index.ts                       # exports nomeados

apps/docs/src/stories/<ComponentName>.stories.tsx  # stories (todas variantes/estados)
```

## Passo 1 — Componente

Siga os padrões obrigatórios de `.claude/rules/components.md`:

- `forwardRef` tipado explicitamente
- `interface` para props (nunca `type`)
- CVA em `.variants.ts` separado; `cn()` de `../../lib/cn`
- Sem `asChild`, sem `className` na assinatura — **exceção**: primitivos de layout (VStack/HStack/Grid) permitem `className` (AD-007)
- `displayName` definido
- Props i18n com fallback em inglês quando houver texto de UI
- `TypeScript` strict — sem `any`, sem `!`

Consulte `packages/react/src/components/button/` como referência de padrão.

## Passo 2 — Testes

Crie `<name-lowercase>.test.tsx` cobrindo: renderização default, cada variante/tamanho, estados (`disabled`/`loading` quando aplicável) e foco visível. Use `packages/react/src/components/button/button.test.tsx` como template.

## Passo 3 — meta.json

Crie `meta.json` conforme `docs/schemas/component-meta.schema.json` (campos: `name`, `componentName`, `status: "experimental"`, `description`, `props`, `variants`, `tokensUsed`, `examples`, `dos`, `donts`, `analytics`). Preencha `analytics.analyticsDefault` como `"off"` até a Phase 7 (integração real do `@tfds/analytics`) — não invente comportamento de tracking ainda não implementado.

Valide o arquivo gerado contra o schema:

```bash
npx -y ajv-cli@5 validate -s docs/schemas/component-meta.schema.json -d packages/react/src/components/<name-lowercase>/meta.json
```

Não prossiga para o Passo 4 se a validação falhar.

## Passo 4 — Stories

Crie `apps/docs/src/stories/<ComponentName>.stories.tsx` cobrindo todas as variantes e estados do `meta.json`. Use `apps/docs/src/stories/Button.stories.tsx` como template.

## Passo 5 — Export

Adicione o export em `packages/react/src/index.ts`:

```ts
export { ComponentName, type ComponentNameProps } from "./components/<name-lowercase>"
```

## Passo 6 — Validar build

```bash
pnpm --filter @tfds/react build
pnpm --filter @tfds/react test
```

## Passo 7 — Relatório final

Liste: arquivos criados, resultado da validação do schema, contagem de testes, próximos passos (`@component-reviewer` → `@a11y-auditor` → promoção para stable quando aplicável).

# Tasks — Playground

## Status: 🟢 Concluído

---

## Setup

- [x] Criar `apps/playground/package.json` com deps workspace
- [x] Criar `apps/playground/tsconfig.json` estendendo `@tfds/tsconfig/base.json`
- [x] Criar `apps/playground/vite.config.ts` com `@vitejs/plugin-react`
- [x] Criar `apps/playground/postcss.config.js`
- [x] Criar `apps/playground/index.html`
- [x] Validar que `pnpm install` resolve todas as dependências sem erro

## Estilos e Tokens

- [x] Criar `src/styles.css` com `@import` dos tokens CSS e `@tailwind` directives
- [x] Configurar `tailwind.config.ts` com preset `@tfds/tokens/tailwind` (Tailwind v3)
- [x] Tokens CSS visíveis e funcionando no browser (validado visualmente)

## App e Navegação

- [x] Criar `src/main.tsx`
- [x] Criar `src/App.tsx` com:
  - [x] Router simples via `useState`
  - [x] Header com breadcrumb e toggle de temas (light / dark / ocean)
  - [x] Navegação de volta ao clicar em "tf.ds" no header
- [x] Criar `src/pages/Home.tsx` com grid de cards de componentes
- [x] Criar `src/pages/ButtonPage.tsx` com showcase completo:
  - [x] Seção Variants
  - [x] Seção Sizes
  - [x] Seção States (default, disabled, loading)
  - [x] Seção With Icons
  - [x] Seção All Variants × Sizes

## Validação Final

- [x] Dev server sobe sem erro (`pnpm --filter @tfds/playground dev`)
- [x] Toggle de tema funciona visualmente nos 3 temas
- [x] Todos os componentes renderizam corretamente
- [x] Sem erros de TypeScript
- [x] Integrado ao workspace (`apps/*` no `pnpm-workspace.yaml`)

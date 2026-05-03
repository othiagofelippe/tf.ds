# Requirements — Playground

## Overview

App interno de desenvolvimento (`apps/playground`) para testar componentes e tokens do tf.ds de forma isolada, sem depender de projetos externos. Serve como sandbox rápido para validar visual, comportamento e integração do DS antes de promover componentes para `stable`.

## Functional Requirements

### FR-01: Stack isolada

- DEVE usar Vite + React + TypeScript, independente de qualquer projeto externo
- DEVE consumir `@tfds/components` e `@tfds/tokens` via `workspace:*`
- DEVE rodar com `pnpm dev` a partir da raiz do monorepo via Turborepo
- NÃO DEVE ter dependências de negócio (auth, API, roteamento complexo)

### FR-02: Toggle de temas

- DEVE permitir alternar entre os 3 temas do DS: `light`, `dark`, `ocean`
- DEVE aplicar o tema visualmente em toda a interface ao alternar
- DEVE usar os tokens CSS do DS para todas as cores e estilos da UI do próprio playground

### FR-03: Showcase de componentes

- DEVE exibir cada componente importado do `@tfds/components` em todas as suas variantes
- DEVE exibir todos os tamanhos disponíveis (sm, md, lg, icon quando aplicável)
- DEVE exibir todos os estados relevantes (default, disabled, loading, com ícone)
- DEVE ser fácil adicionar novos componentes ao showcase conforme o DS cresce

### FR-04: Integração com tokens

- DEVE importar o CSS de tokens via `@tfds/tokens/css`
- DEVE usar o preset Tailwind via `@tfds/tokens/tailwind` para acessar tokens como classes utilitárias
- NÃO DEVE definir valores de design (cores, espaçamentos, tipografia) fora dos tokens do DS

## Non-Functional Requirements

- Tempo de cold start do dev server: < 3s
- Sem SSR — SPA puro é suficiente para este uso
- Sem testes automatizados — o playground é ferramenta visual/manual
- Status: infraestrutura interna, não publicado como pacote npm

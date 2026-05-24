# TDS-008 Implementar componente Badge

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** nenhuma

## Objetivo

Criar o componente `Badge` — elemento de rótulo visual compacto para status, categorias e contagens. Renderiza como `<span>` com variants de aparência e tamanho.

## Critérios de aceitação

- [ ] `badge.variants.ts` com CVA:
  - `variant`: `default | success | warning | error | info` (default: `default`)
  - `size`: `sm | md` (default: `md`)
- [ ] `badge.tsx` com `forwardRef`, `displayName = "Badge"`, JSDoc `@experimental`
- [ ] `badge.test.tsx` cobrindo: renderiza children, todas as variants, tamanhos, forwardRef
- [ ] `index.ts` + registro em `src/index.ts`
- [ ] Build e testes passando

## Arquivos esperados

Criados:

- `packages/components/src/components/badge/badge.variants.ts`
- `packages/components/src/components/badge/badge.tsx`
- `packages/components/src/components/badge/badge.test.tsx`
- `packages/components/src/components/badge/index.ts`

Modificados:

- `packages/components/src/index.ts`

## Log de progresso

(vazio)

## Impedimentos

Nenhum

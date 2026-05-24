# TDS-009 Implementar componente Input

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** TDS-007 (Label)

## Objetivo

Criar o componente `Input` — campo de texto de linha única com suporte a estados de erro, sucesso e disabled. Wrapper sobre `<input>` HTML nativo.

## Critérios de aceitação

- [ ] `input.variants.ts` com CVA:
  - `size`: `sm | md | lg` (default: `md`)
  - `status`: `default | error | success` (default: `default`)
- [ ] `input.tsx` com `forwardRef`, `displayName = "Input"`, JSDoc `@experimental`
  - Props nativas de `<input>` preservadas
  - `disabled` como prop booleana
- [ ] `input.test.tsx` cobrindo: renderiza, aceita valor, disabled, status error/success, forwardRef
- [ ] `index.ts` + registro em `src/index.ts`
- [ ] Build e testes passando

## Arquivos esperados

Criados:

- `packages/components/src/components/input/input.variants.ts`
- `packages/components/src/components/input/input.tsx`
- `packages/components/src/components/input/input.test.tsx`
- `packages/components/src/components/input/index.ts`

Modificados:

- `packages/components/src/index.ts`

## Log de progresso

(vazio)

## Impedimentos

Nenhum

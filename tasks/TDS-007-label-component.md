# TDS-007 Implementar componente Label

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** nenhuma

## Objetivo

Criar o componente `Label` — elemento semântico para associar texto a campos de formulário. Wrapper sobre o elemento HTML `<label>` nativo com variants de tamanho e estado disabled.

## Critérios de aceitação

- [ ] Arquivo `packages/components/src/components/label/label.variants.ts` com CVA:
  - Variante `size`: `sm | md | lg` (default: `md`)
  - Variante `disabled`: boolean — aplica opacidade reduzida
- [ ] Arquivo `packages/components/src/components/label/label.tsx`:
  - `forwardRef` implementado
  - Prop `htmlFor` nativa preservada via spread
  - `displayName` definido como `"Label"`
  - Status `experimental` em JSDoc
- [ ] Arquivo `packages/components/src/components/label/index.ts` exportando `Label` e `LabelProps`
- [ ] `packages/components/src/index.ts` exporta o componente
- [ ] `packages/components/src/components/label/label.test.tsx` com testes:
  - Renderiza children
  - Associa `htmlFor` ao elemento
  - Variante `size` aplica classes corretas (sm, md, lg)
  - Estado `disabled` aplica classe de opacidade
  - `forwardRef` retorna ref para o elemento DOM
- [ ] `pnpm --filter @tfds/components build` passa
- [ ] `pnpm --filter @tfds/components test` passa

## Arquivos esperados

Criados:

- `packages/components/src/components/label/label.variants.ts`
- `packages/components/src/components/label/label.tsx`
- `packages/components/src/components/label/label.test.tsx`
- `packages/components/src/components/label/index.ts`

Modificados:

- `packages/components/src/index.ts`

## Log de progresso

(vazio — developer preenche)

## Impedimentos

Nenhum

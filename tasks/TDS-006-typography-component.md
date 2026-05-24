# TDS-006 Implementar componente Typography

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** TDS-005

## Objetivo

Criar o componente `Typography` com prop `as` polimórfica, CVA variants mapeando os tokens primitivos diretamente via CSS vars, e testes completos. O componente é o bloco de texto padrão do design system — toda exibição de texto deve passar por ele ou ser descartada conscientemente.

## Critérios de aceitação

### Componente

- [ ] Arquivo `packages/components/src/components/typography/typography.variants.ts` criado com CVA:
  - Variante `variant` com os 16 valores definidos na spec (`display-lg`, `display-md`, `display-sm`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`, `caption`, `code`, `overline`)
  - Variante `color` com os 7 valores (`primary`, `secondary`, `disabled`, `onBrand`, `error`, `success`, `warning`) usando as CSS vars `--tfds-color-text-*`
  - Variante `align` com os 4 valores (`left`, `center`, `right`, `justify`)
  - Variante `truncate` como boolean (classe `truncate` do Tailwind quando true)
  - Default: `variant: "body-md"`, `color: "primary"`, `align: "left"`
- [ ] Cada variante usa CSS vars dos tokens primitivos: `--tfds-font-family-*`, `--tfds-font-size-*`, `--tfds-font-weight-*`, `--tfds-font-line-height-*`, `--tfds-font-letter-spacing-*`
- [ ] Arquivo `packages/components/src/components/typography/typography.tsx` criado:
  - `forwardRef` implementado
  - Prop `as` polimórfica com lista explícita dos 19 elementos HTML permitidos (`h1`–`h6`, `p`, `span`, `label`, `legend`, `strong`, `em`, `blockquote`, `figcaption`, `caption`, `code`, `pre`, `kbd`)
  - Default de `as` é `"p"`
  - Interface `TypographyProps` separada, exportada
  - `displayName` definido como `"Typography"`
  - Status `experimental` em JSDoc
- [ ] Arquivo `packages/components/src/components/typography/index.ts` criado exportando `Typography` e `TypographyProps`
- [ ] `packages/components/src/index.ts` exporta o componente
- [ ] `pnpm --filter @tfds/components build` executa sem erros

### Testes

- [ ] Arquivo `packages/components/src/components/typography/typography.test.tsx` criado
- [ ] Testes cobrem:
  - Renderiza sem erros com defaults (elemento `<p>`, variant `body-md`, cor `primary`)
  - Prop `as="h1"` renderiza elemento `<h1>`
  - Prop `as="span"` renderiza elemento `<span>`
  - Prop `variant` aplica as classes CVA corretas (ao menos 3 variantes testadas)
  - Prop `color` aplica o estilo de cor correto
  - Prop `align="center"` aplica classe de alinhamento
  - Prop `truncate` aplica classe de truncamento
  - `forwardRef` retorna ref para o elemento DOM
  - `children` é renderizado corretamente
- [ ] `pnpm --filter @tfds/components test` passa com zero falhas

## Arquivos esperados

Criados:

- `packages/components/src/components/typography/typography.variants.ts`
- `packages/components/src/components/typography/typography.tsx`
- `packages/components/src/components/typography/typography.test.tsx`
- `packages/components/src/components/typography/index.ts`

Modificados:

- `packages/components/src/index.ts`

## Log de progresso

(vazio — developer preenche)

## Impedimentos

Nenhum

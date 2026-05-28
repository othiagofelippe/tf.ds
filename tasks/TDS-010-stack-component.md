# TDS-010 Implementar componente Stack

**Projeto:** tf.ds
**Assignee:** developer
**Status:** done
**Depende de:** nenhuma

## Objetivo

Criar o componente `Stack` — primitivo de layout vertical (`flex flex-col`) com `gap` controlado via tokens de spacing. É o primeiro de uma série de primitivos de layout (Stack, Inline, Container, Grid) que vai permitir que projetos consumidores (`my-portfolio`, `duo`) eliminem o uso de `div` com classes Tailwind cruas para estruturar layout.

## API

```tsx
<Stack
  gap="4" // espaçamento entre filhos — valores dos tokens de spacing
  align="stretch" // alinhamento cruzado (items-*) — default: "stretch"
  justify="start" // alinhamento principal (justify-*) — default: "start"
  as="section" // elemento HTML semântico — default: "div"
>
  {children}
</Stack>
```

### Valores válidos por prop

**`gap`** (obrigatório mapear para `gap-*` do Tailwind, baseado nos tokens em `packages/tokens/src/primitive/spacing.tokens.json`):

`"0"` | `"0.5"` | `"1"` | `"1.5"` | `"2"` | `"2.5"` | `"3"` | `"3.5"` | `"4"` | `"5"` | `"6"` | `"7"` | `"8"` | `"9"` | `"10"` | `"12"` | `"14"` | `"16"` | `"20"` | `"24"`

Default: `"0"`

**`align`** (mapeia para `items-*`):

`"start"` | `"center"` | `"end"` | `"stretch"`

Default: `"stretch"`

**`justify`** (mapeia para `justify-*`):

`"start"` | `"center"` | `"end"` | `"between"` | `"around"`

Default: `"start"`

**`as`** (polimorfismo — elemento HTML semântico):

`"div"` | `"section"` | `"article"` | `"aside"` | `"nav"` | `"header"` | `"footer"` | `"main"` | `"ul"` | `"ol"`

Default: `"div"`

## Critérios de aceitação

- [x] `stack.variants.ts` com CVA exportando `stackVariants`:
  - Base: `"flex flex-col"`
  - Variant `gap` com todos os valores listados acima mapeados para `gap-*` do Tailwind
  - Variant `align` com os quatro valores mapeados para `items-start`, `items-center`, `items-end`, `items-stretch`
  - Variant `justify` com os cinco valores mapeados para `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`
  - `defaultVariants`: `{ gap: "0", align: "stretch", justify: "start" }`
- [x] `stack.tsx` com:
  - `forwardRef<HTMLElement, StackProps>`
  - `StackElement` union type com os 10 elementos listados acima
  - Interface `StackProps` estendendo `React.HTMLAttributes<HTMLElement>` (omitindo `className`) e `VariantProps<typeof stackVariants>`
  - `as` prop com default `"div"`
  - `displayName = "Stack"`
  - JSDoc `@experimental` no componente
  - **Não aceita `className`** — omitir de `HTMLAttributes` e não passar para o elemento
  - **Não aceita `asChild`** — sem nenhuma lógica Radix
- [x] `stack.test.tsx` cobrindo:
  - Renderiza `children`
  - Renderiza como `<div>` por default
  - Renderiza como `<section>`, `<ul>`, `<main>` quando `as` é fornecido
  - Aplica classe `flex` e `flex-col` sempre
  - Aplica `gap-4` quando `gap="4"`
  - Aplica `gap-0` quando `gap` não é fornecido (default)
  - Aplica `items-center` quando `align="center"`
  - Aplica `items-stretch` por default (sem `align`)
  - Aplica `justify-between` quando `justify="between"`
  - `forwardRef` — ref aponta para o elemento DOM correto
- [x] `index.ts` no diretório exportando `Stack` e `StackProps`
- [x] Registro em `packages/components/src/index.ts` exportando `Stack` e `StackProps`
- [x] Build passando: `pnpm --filter @tfds/components build`
- [x] Testes passando: `pnpm --filter @tfds/components test`

## Arquivos esperados

Criados:

- `packages/components/src/components/stack/stack.variants.ts`
- `packages/components/src/components/stack/stack.tsx`
- `packages/components/src/components/stack/stack.test.tsx`
- `packages/components/src/components/stack/index.ts`

Modificados:

- `packages/components/src/index.ts`

## Referência de implementação

Seguir a estrutura de `packages/components/src/components/typography/` para o padrão de `as` polimórfico e `forwardRef`. **Exceção:** Typography passa `className` para o elemento — Stack não deve fazer isso. A prop `className` deve ser omitida de `HTMLAttributes` na interface e não propagada ao elemento.

Para o CVA, seguir `packages/components/src/components/badge/badge.variants.ts` como referência de estrutura.

## Log de progresso

- 2026-05-27: implementação concluída — testes (74/74), type-check e build limpos
- 2026-05-27: commit 3afe77a em feat/tds-010-stack-component

## Impedimentos

Nenhum

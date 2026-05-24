# Design — Typography

## Anatomia

```
<Typography as="h1" variant="display-lg" color="primary">
  Texto renderizado
</Typography>

Partes:
- Root: elemento HTML polimórfico definido por `as`
- Texto: conteúdo passado via children

Não há partes internas adicionais — o componente é leaf node.
```

## Props API

| Prop       | Tipo                                                                                                                                                                                                 | Default   | Descrição                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| `as`       | `h1 \| h2 \| h3 \| h4 \| h5 \| h6 \| p \| span \| label \| legend \| strong \| em \| blockquote \| figcaption \| caption \| code \| pre \| kbd`                                                      | `p`       | Elemento HTML renderizado                          |
| `variant`  | `display-lg \| display-md \| display-sm \| heading-xl \| heading-lg \| heading-md \| heading-sm \| body-lg \| body-md \| body-sm \| label-lg \| label-md \| label-sm \| caption \| code \| overline` | `body-md` | Estilo tipográfico                                 |
| `color`    | `primary \| secondary \| disabled \| onBrand \| error \| success \| warning`                                                                                                                         | `primary` | Cor semântica do texto                             |
| `align`    | `left \| center \| right \| justify`                                                                                                                                                                 | `left`    | Alinhamento do texto                               |
| `truncate` | `boolean`                                                                                                                                                                                            | `false`   | Trunca com ellipsis em uma linha (overflow hidden) |
| `children` | `React.ReactNode`                                                                                                                                                                                    | —         | Conteúdo textual                                   |
| `...rest`  | `React.HTMLAttributes<HTMLElement>`                                                                                                                                                                  | —         | Atributos nativos do elemento renderizado          |

## Variantes

Cada variante define: font-family, font-size, font-weight, line-height e letter-spacing.
Valores mapeados diretamente dos tokens primitivos via CSS vars (`--tfds-font-*`).

| Variante     | Family    | Size             | Weight     | Line-height | Letter-spacing | Uso                             |
| ------------ | --------- | ---------------- | ---------- | ----------- | -------------- | ------------------------------- |
| `display-lg` | `display` | `5xl` (3rem)     | `bold`     | `tight`     | `tight`        | Heroes, banners principais      |
| `display-md` | `display` | `4xl` (2.25rem)  | `bold`     | `tight`     | `tight`        | Títulos de seção destacados     |
| `display-sm` | `display` | `3xl` (1.875rem) | `semibold` | `snug`      | `tight`        | Subtítulos de destaque          |
| `heading-xl` | `display` | `2xl` (1.5rem)   | `semibold` | `snug`      | `normal`       | Títulos de página               |
| `heading-lg` | `sans`    | `xl` (1.25rem)   | `semibold` | `snug`      | `normal`       | Títulos de seção                |
| `heading-md` | `sans`    | `lg` (1.125rem)  | `semibold` | `snug`      | `normal`       | Títulos de card/modal           |
| `heading-sm` | `sans`    | `md` (1rem)      | `semibold` | `normal`    | `normal`       | Títulos de grupo/formulário     |
| `body-lg`    | `sans`    | `lg` (1.125rem)  | `regular`  | `relaxed`   | `normal`       | Texto corrido principal         |
| `body-md`    | `sans`    | `md` (1rem)      | `regular`  | `relaxed`   | `normal`       | Texto corrido padrão (default)  |
| `body-sm`    | `sans`    | `sm` (0.875rem)  | `regular`  | `normal`    | `normal`       | Texto auxiliar, notas           |
| `label-lg`   | `sans`    | `md` (1rem)      | `medium`   | `normal`    | `wide`         | Labels de campo grande          |
| `label-md`   | `sans`    | `sm` (0.875rem)  | `medium`   | `normal`    | `wide`         | Labels de campo padrão          |
| `label-sm`   | `sans`    | `xs` (0.75rem)   | `medium`   | `normal`    | `wide`         | Labels de campo compacto        |
| `caption`    | `sans`    | `xs` (0.75rem)   | `regular`  | `normal`    | `normal`       | Legendas, metadados             |
| `code`       | `mono`    | `sm` (0.875rem)  | `regular`  | `normal`    | `normal`       | Código inline                   |
| `overline`   | `sans`    | `xs` (0.75rem)   | `semibold` | `normal`    | `wide`         | Rótulos em caps acima de título |

## Estrutura de Arquivos

```
packages/components/src/components/typography/
├── typography.tsx          # Componente principal com forwardRef
├── typography.variants.ts  # CVA variants
└── index.ts                # Exports
```

## Tokens Utilizados

Tokens semânticos de cor (CSS vars geradas via Style Dictionary):

- `color.text.primary` → `--tfds-color-text-primary`
- `color.text.secondary` → `--tfds-color-text-secondary`
- `color.text.disabled` → `--tfds-color-text-disabled`
- `color.text.onBrand` → `--tfds-color-text-on-brand`
- `color.text.error` → `--tfds-color-text-error` _(a adicionar)_
- `color.text.success` → `--tfds-color-text-success` _(a adicionar)_
- `color.text.warning` → `--tfds-color-text-warning` _(a adicionar)_

Tokens primitivos de tipografia (CSS vars geradas via Style Dictionary):

- `--tfds-font-family-sans`
- `--tfds-font-family-display`
- `--tfds-font-family-mono`
- `--tfds-font-size-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl}`
- `--tfds-font-weight-{regular|medium|semibold|bold}`
- `--tfds-font-line-height-{none|tight|snug|normal|relaxed}`
- `--tfds-font-letter-spacing-{tight|normal|wide}`

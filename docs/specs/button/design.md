# Design — Button

## Anatomia

```
┌─────────────────────────────────┐
│  [icon?]  Label  [icon?]        │
└─────────────────────────────────┘
     └── gap-2 entre icon e label
```

## Props API

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `primary \| secondary \| outline \| ghost \| destructive \| link` | `primary` | Visual e semântica |
| `size` | `sm \| md \| lg \| icon` | `md` | Tamanho do botão |
| `loading` | `boolean` | `false` | Estado de carregamento |
| `loadingLabel` | `string` | `"Loading..."` | Label para screen readers em loading |
| `disabled` | `boolean` | `false` | Estado desabilitado (nativo HTML) |
| `...rest` | `ButtonHTMLAttributes` | — | Todos os atributos nativos de `<button>` |

## Variantes

| Variante | Uso | Background | Texto |
|---|---|---|---|
| `primary` | Ação principal da página | `action-primary` | `text-on-brand` |
| `secondary` | Ação de suporte | `bg-subtle` | `text-primary` |
| `outline` | Ação terciária | transparente | `text-primary` |
| `ghost` | Ação discreta | transparente | `text-primary` |
| `destructive` | Ação destrutiva (delete) | `feedback-error` | `text-on-brand` |
| `link` | Navegação inline | transparente | `action-primary` |

## Tamanhos

| Size | Altura | Padding X | Font | Icon |
|---|---|---|---|---|
| `sm` | 32px (h-8) | 12px | sm | 16px |
| `md` | 40px (h-10) | 16px | sm | 16px |
| `lg` | 48px (h-12) | 24px | base | 20px |
| `icon` | 40px (size-10) | — | — | 16px |

## Estrutura de Arquivos

```
src/components/button/
├── button.tsx           # Componente principal
├── button.variants.ts   # CVA variants
└── index.ts             # Exports
```

## Tokens Utilizados

- `color.action.primary` → background do primary
- `color.text.onBrand` → texto do primary
- `color.bg.subtle` → background do secondary
- `color.feedback.error` → background do destructive
- `color.interactive.focus` → focus ring
- `opacity.disabled` → estado disabled
- `motion.duration.fast` → transição de hover

---
description: Regras para edição de tokens de design no formato W3C DTCG
paths: packages/tokens/src/**
---

## Padrões obrigatórios para tokens tf.ds

### Formato W3C DTCG

- Todo token DEVE ter `$value` e `$type`
- `$type` válidos: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `shadow`
- Grupos de tokens usam objetos aninhados sem `$` no nome da chave
- Referências via `{caminho.do.token}` (dot notation, sem `$value`)

### Hierarquia de 3 camadas

1. **Primitivos** (`src/primitive/`) — valores brutos, sem semântica (ex: `color.ocean.500`)
2. **Semânticos** (`src/semantic/`) — intenção, referencia primitivos (ex: `color.text.primary → {color.neutral.900}`)
3. **Componente** (futuro) — escopo de componente

### Temas

- `light.tokens.json` → aplica em `:root`
- `dark.tokens.json` → aplica em `.dark`
- `ocean.tokens.json` → aplica em `.ocean` (tema independente, não é dark mode)

### Cores

- Valores SEMPRE em OKLCH: `oklch(L% C H)`
- Nunca usar hex, rgb, hsl nos tokens

### Após editar tokens

Execute `pnpm --filter @tfds/tokens build` para verificar o output gerado.

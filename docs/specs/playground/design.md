# Design — Playground

## Anatomia

```
┌─────────────────────────────────────────────────────┐
│ Header                                              │
│  tf.ds Playground        [ Light | Dark | Ocean ]  │
├─────────────────────────────────────────────────────┤
│ Main                                                │
│                                                     │
│  VARIANTS                                           │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Primary] [Secondary] [Outline] [Ghost] ... │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  SIZES                                              │
│  ┌─────────────────────────────────────────────┐   │
│  │ [sm]  [md]   [lg]                           │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  STATES                                             │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Default] [Disabled] [Loading]              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  WITH ICONS                                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ [↻ With icon] [🗑 Delete] [↗ Open] [🗑]    │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ALL VARIANTS × SIZES                               │
│  ┌─────────────────────────────────────────────┐   │
│  │ primary:     [sm] [md] [lg]                 │   │
│  │ secondary:   [sm] [md] [lg]                 │   │
│  │ ...                                         │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Estrutura de Arquivos

```
apps/playground/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx          → bootstrap React
    ├── styles.css        → @import tokens + tailwind
    └── App.tsx           → layout + showcase
```

## Layout

- Header fixo com título e toggle de tema
- Main com `max-w-4xl mx-auto` e `px-8 py-10`
- Seções separadas por título em caixa alta com `tracking-widest`
- Cada seção tem card com fundo `bg-bg-default` e borda `border-border-subtle`
- Componentes exibidos em `flex flex-wrap gap-3`

## Toggle de Tema

- Aplicar tema via classe CSS no wrapper raiz: `""` (light), `"dark"`, `"ocean"`
- Os tokens CSS do DS já definem os seletores `:root`, `.dark`, `.ocean`
- Estado local com `useState<Theme>` no `App`

## Tokens Utilizados pela UI do Playground

| Token            | Uso                           |
| ---------------- | ----------------------------- |
| `bg-page`        | Background da página          |
| `bg-default`     | Background dos cards de seção |
| `bg-subtle`      | Background do toggle de tema  |
| `text-primary`   | Texto principal               |
| `text-secondary` | Subtítulo do header           |
| `text-tertiary`  | Labels das seções             |
| `border-default` | Borda do header               |
| `border-subtle`  | Borda dos cards e toggle      |
| `surface-raised` | Botão ativo do toggle de tema |
| `font-sans`      | Família tipográfica da UI     |

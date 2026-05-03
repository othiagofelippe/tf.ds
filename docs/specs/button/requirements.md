# Requirements — Button

## Overview

O Button é o componente de ação mais fundamental do tf.ds. Representa uma ação única e clara que o usuário pode executar.

## Functional Requirements

### FR-01: Variantes
- DEVE suportar as variantes: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- `primary` é o default
- Cada variante DEVE ter visual distinto e semântica clara de uso

### FR-02: Tamanhos
- DEVE suportar os tamanhos: `sm`, `md`, `lg`, `icon`
- `md` é o default
- `icon` é um botão quadrado para uso com ícone sem label

### FR-03: Estados
- DEVE suportar `disabled` (prop boolean nativa HTML)
- DEVE suportar `loading` (prop boolean custom)
- Em `loading`, o botão DEVE ficar desabilitado e expor `aria-busy="true"`
- DEVE ter estado de `hover` e `focus-visible` distintos

### FR-04: Acessibilidade
- DEVE ser um elemento `<button>` nativo
- DEVE suportar `forwardRef` para integração com libs externas
- DEVE ter `focus-visible` com ring seguindo o token `color.interactive.focus`
- DEVE suportar `loadingLabel` para screen readers (default: "Loading...")
- Contraste DEVE atender WCAG AA em todas as variantes e temas

### FR-05: API
- NÃO DEVE expor `asChild`
- NÃO DEVE aceitar `className` para override visual
- DEVE herdar todos os atributos nativos de `<button>`

## Non-Functional Requirements

- Bundle size máximo: 5kb gzipped
- Status inicial: `stable` (componente fundamental)

# Tasks — Typography

## Status: 🔴 Não iniciado

---

## Tokens

- [ ] Adicionar `color.text.error` nos 3 temas (light, dark, ocean) referenciando `color.feedback.error`
- [ ] Adicionar `color.text.success` nos 3 temas referenciando `color.feedback.success`
- [ ] Adicionar `color.text.warning` nos 3 temas referenciando `color.feedback.warningText`
- [ ] Validar build de tokens (`pnpm build` em `packages/tokens`)

## Implementação

- [ ] Criar `typography.variants.ts` com CVA (todas as variantes e cores)
- [ ] Criar `typography.tsx` com componente polimórfico e forwardRef
- [ ] Criar `index.ts` com exports
- [ ] Exportar do `packages/components/src/index.ts`
- [ ] Validar build (tsup)

## Testes

- [ ] Criar `typography.test.tsx` com Vitest + Testing Library
  - [ ] Renderiza sem erros com defaults
  - [ ] Prop `as` altera o elemento HTML renderizado
  - [ ] Prop `variant` aplica as classes corretas
  - [ ] Prop `color` aplica a CSS var correta
  - [ ] Prop `align` aplica o alinhamento correto
  - [ ] Prop `truncate` aplica truncamento
  - [ ] `forwardRef` funciona

## Storybook

- [ ] Criar `Typography.stories.tsx` em `apps/docs`
  - [ ] Story: todas as variantes lado a lado
  - [ ] Story: todas as cores
  - [ ] Story: prop `as` polimórfica
  - [ ] Story: truncate
  - [ ] Controls panel configurado
  - [ ] Docs com descrição, quando usar, quando não usar
  - [ ] Do / Don't documentados

## Acessibilidade

- [ ] Validar contraste WCAG AA em todas as cores nos 3 temas
- [ ] Validar semântica HTML (heading hierarchy)
- [ ] Validar axe-core no Storybook (zero violations)

## Critério de `stable`

- [ ] Todos os itens acima concluídos
- [ ] Status atualizado para `stable` no Storybook

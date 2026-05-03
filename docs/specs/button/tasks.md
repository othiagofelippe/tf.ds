# Tasks — Button

## Status: 🟡 Em andamento

---

## Implementação
- [x] Criar `button.variants.ts` com CVA (todas as variantes e tamanhos)
- [x] Criar `button.tsx` com forwardRef e props API
- [x] Criar `index.ts` com exports
- [x] Exportar do `packages/components/src/index.ts`
- [x] Validar build (tsup)

## Testes
- [ ] Criar `button.test.tsx` com Vitest + Testing Library
  - [ ] Renderiza sem erros
  - [ ] Aplica variante correta
  - [ ] Aplica tamanho correto
  - [ ] Estado `disabled` bloqueia interação
  - [ ] Estado `loading` define `aria-busy` e bloqueia interação
  - [ ] `forwardRef` funciona
  - [ ] Dispara `onClick` corretamente

## Storybook
- [ ] Criar `Button.stories.tsx` em `apps/docs`
  - [ ] Story: todas as variantes
  - [ ] Story: todos os tamanhos
  - [ ] Story: estado loading
  - [ ] Story: estado disabled
  - [ ] Story: com ícone (esquerda e direita)
  - [ ] Story: `icon` size
  - [ ] Controls panel configurado
  - [ ] Docs com descrição, quando usar, quando não usar
  - [ ] Do / Don't documentados

## Acessibilidade
- [ ] Validar contraste WCAG AA em todas as variantes nos 3 temas
- [ ] Validar navegação por teclado (tab + enter + space)
- [ ] Validar axe-core no Storybook (zero violations)

## Critério de `stable`
- [ ] Todos os itens acima concluídos
- [ ] Status atualizado para `stable` no Storybook

---
description: Regras para escrever testes de componentes no tf.ds
paths: packages/components/src/**/*.test.{ts,tsx}
---

## Padrões obrigatórios para testes tf.ds

- Padrão `describe`/`it` — nunca `test()` bare
- `screen.getByRole` em vez de `getByTestId` — queries semânticas
- `userEvent` em vez de `fireEvent` — simula interação real do usuário
- Cada `it` testa um comportamento específico — múltiplos `expect` relacionados são ok

### Cobertura obrigatória por componente

- Todas as variantes renderizam sem erro
- Todos os tamanhos renderizam sem erro
- Estado `disabled` — não dispara eventos, tem atributo correto
- Estado `loading` — desabilita, tem `aria-busy`, usa label correto
- `forwardRef` — ref aponta para o elemento nativo correto
- Interações — onClick, onChange conforme aplicável

### Setup

- Import: `import "@testing-library/jest-dom"` via `src/test/setup.ts`
- Environment: jsdom (configurado em `vitest.config.ts`)

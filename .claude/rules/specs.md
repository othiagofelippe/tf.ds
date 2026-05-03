---
description: Regras para escrever especificações de componentes no tf.ds
paths: docs/specs/**
---

## Padrões para specs tf.ds

Toda spec é composta por 3 arquivos em `docs/specs/<component-name>/`:

### requirements.md

- Overview: o que é, quando usar, quando NÃO usar
- Requisitos funcionais numerados: FR-01, FR-02... agrupados por categoria
- Linguagem assertiva: DEVE, NÃO DEVE, PODE
- Non-functional: bundle máximo (≤ 10KB) e status inicial (`experimental`)

### design.md

- Anatomia em ASCII mostrando as partes nomeadas do componente
- Props API completa em tabela: Prop | Tipo | Default | Descrição
- Variantes com uso semântico — quando usar cada uma
- Tokens semânticos consumidos (referenciar `color.*`, `space.*`, etc.)
- Estrutura de arquivos a criar

### tasks.md

- Todas as tasks iniciam desmarcadas: `- [ ]`
- Seções: Implementação, Testes, Storybook, Acessibilidade, Critério de stable
- Status inicial: `🔴 Não iniciado`
- Nunca editar "Critério de stable" — esses itens são o gate de promoção

### Lifecycle

`experimental` → `stable` → `deprecated` → `removed`

Um componente só vai para `stable` via `/promote-stable` após todos os critérios atendidos.

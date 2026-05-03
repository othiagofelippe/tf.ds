---
name: create-spec
description: Cria a especificação completa (requirements + design + tasks) de um componente tf.ds antes da implementação. Use antes de implementar qualquer componente novo.
argument-hint: "[ComponentName]"
arguments: [name]
when_to_use: Quando precisar escrever a spec de um componente antes de implementá-lo.
allowed-tools: Read, Write, Glob
---

# Create Spec — tf.ds

Escreva a especificação completa do componente `$name`.

## Contexto atual

Specs já existentes:
!`find docs/specs -maxdepth 1 -mindepth 1 -type d ! -name '_template' -exec basename {} \; 2>/dev/null | sort | sed 's/^/  - /'`

Referência — spec do Button:
!`ls docs/specs/button/ 2>/dev/null | sed 's/^/  - /'`

---

## Arquivos a criar

Crie os três arquivos em `docs/specs/<name-lowercase>/`:

### requirements.md

Estrutura obrigatória:

- **Overview** — o que é, quando usar, quando NÃO usar
- **FR-01..N** — requisitos funcionais por categoria: variantes, tamanhos, estados, acessibilidade, API
- **Non-functional** — bundle ≤ 10KB, `status: experimental`

Use linguagem de requisitos: DEVE, NÃO DEVE, PODE.

### design.md

Estrutura obrigatória:

- **Anatomia** — diagrama ASCII com partes nomeadas
- **Props API** — tabela: Prop | Tipo | Default | Descrição
- **Variantes** — tabela: Variante | Quando usar | Tokens consumidos
- **Tamanhos** (se aplicável) — tabela: Size | Altura | Padding | Font
- **Tokens utilizados** — lista dos tokens semânticos de `packages/tokens/`
- **Estrutura de arquivos** — árvore dos arquivos a criar

### tasks.md

Use o template em `docs/specs/_template/tasks.md`.
Todas as tasks DEVEM começar desmarcadas (`- [ ]`).
Status inicial: `🔴 Não iniciado`

---

Ao terminar, liste os arquivos criados e pergunte se a spec está aprovada para iniciar a implementação.

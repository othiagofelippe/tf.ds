# Create Spec

Cria a especificação completa de um componente antes da implementação.

## Uso

```
/create-spec <ComponentName>
```

## Instruções

O argumento `$ARGUMENTS` é o nome do componente em PascalCase.

Crie os três arquivos em `docs/specs/<name-lowercase>/`:

### requirements.md

Estrutura obrigatória:
- **Overview**: o que é o componente, quando usar
- **FR-01 a FR-0N**: requisitos funcionais agrupados por categoria (variantes, tamanhos, estados, acessibilidade, API)
- **Non-Functional Requirements**: bundle size máximo, status inicial (`experimental`)

Use linguagem de requisitos: DEVE, NÃO DEVE, PODE.

### design.md

Estrutura obrigatória:
- **Anatomia**: diagrama ASCII mostrando as partes do componente
- **Props API**: tabela com Prop, Tipo, Default, Descrição
- **Variantes**: tabela com Variante, Uso semântico, Background, Texto
- **Tamanhos** (se aplicável): tabela com Size, Altura, Padding, Font
- **Estrutura de Arquivos**: árvore dos arquivos a criar
- **Tokens Utilizados**: lista dos tokens semânticos consumidos

### tasks.md

Use o template em `docs/specs/_template/tasks.md`. Todas as tasks DEVEM começar desmarcadas (`- [ ]`).

Status inicial: `🔴 Não iniciado`

Ao terminar, informe os arquivos criados e pergunte se a spec está aprovada para iniciar a implementação.

---
name: promote-stable
description: Promove um componente de experimental para stable após verificar todos os critérios de qualidade. Use quando todas as tasks de um componente estiverem concluídas.
argument-hint: "[ComponentName]"
arguments: [name]
when_to_use: Quando um componente tiver todos os critérios de stable atendidos e precisar ser promovido.
allowed-tools: Read, Edit, Bash, Glob, Grep
---

# Promote Stable — tf.ds

Promova o componente `$name` de `experimental` para `stable`.

## Estado atual do componente

Tasks pendentes:
!`grep -c '^\- \[ \]' "docs/specs/$(echo '$name' | tr '[:upper:]' '[:lower:]')/tasks.md" 2>/dev/null && echo ' tasks pendentes' || echo 'arquivo não encontrado'`

Critérios de stable:
!`grep -A20 'Critério de' "docs/specs/$(echo '$name' | tr '[:upper:]' '[:lower:]')/tasks.md" 2>/dev/null || echo 'tasks.md não encontrado — verifique o nome do componente'`

---

## Passo 1 — Verificar critérios

Leia `docs/specs/<name-lowercase>/tasks.md` e verifique se **todos** os itens do bloco **Critério de `stable`** estão marcados.

Se algum item estiver desmarcado: liste o que falta e **pare aqui**.

## Passo 2 — Verificar qualidade

```bash
pnpm test
pnpm --filter @tfds/components build
```

Se algum comando falhar: reporte o erro e **pare aqui**.

## Passo 3 — Atualizar status

Em `docs/specs/<name-lowercase>/tasks.md`:

- Status → `🟢 Concluído`

Em `docs/specs/<name-lowercase>/requirements.md`:

- `status: experimental` → `status: stable`

## Passo 4 — Criar changeset

```bash
pnpm changeset
```

Selecione `@tfds/components`, bump `minor`, descreva a promoção:

> `feat(components): promote <name> to stable`

## Passo 5 — Relatório

Informe o que foi atualizado e o link para abrir PR.

# Promote Stable

Promove um componente de `experimental` para `stable` após verificar que todos os critérios foram atendidos.

## Uso

```
/promote-stable <ComponentName>
```

## Instruções

O argumento `$ARGUMENTS` é o nome do componente em PascalCase.

### Passo 1 — Verificar critérios

Leia `docs/specs/<name-lowercase>/tasks.md` e verifique se todos os itens do bloco **Critério de `stable`** estão marcados.

Se algum item estiver desmarcado, liste o que falta e **não prossiga**.

### Passo 2 — Verificar qualidade

Execute:

```bash
pnpm build
pnpm test
```

Se algum comando falhar, reporte o erro e **não prossiga**.

### Passo 3 — Atualizar spec

Em `docs/specs/<name-lowercase>/tasks.md`:
- Altere o status para `🟢 Concluído`

Em `docs/specs/<name-lowercase>/requirements.md`:
- Altere `Status inicial: experimental` para `Status: stable`

### Passo 4 — Criar changeset

```bash
pnpm changeset
```

Selecione `@tfds/components` com bump `minor` e descreva a promoção do componente.

### Passo 5 — Informar

Informe que o componente foi promovido para `stable` e liste o que foi atualizado.

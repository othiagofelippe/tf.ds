# TDS-002 Migrar @tfds/components para consumir @tfds/icons

**Projeto:** tf.ds
**Assignee:** developer
**Status:** done
**Depende de:** TDS-004

## Objetivo

Substituir o consumo direto de `lucide-react` em `@tfds/components` pelo pacote `@tfds/icons`, conforme spec (FR-02): "consumidores DEVEM importar de `@tfds/icons`, nunca de `lucide-react`". Isso aplica também ao próprio `@tfds/components`, que hoje declara `lucide-react` como peerDependency.

## Critérios de aceitação

- [x] Todos os imports de `lucide-react` em `packages/components/src/` foram substituídos por `@tfds/icons` (N/A — nenhum import existia em src/)
- [x] `packages/components/package.json` tem `@tfds/icons` como dependency e não tem mais `lucide-react`
- [x] `pnpm --filter @tfds/components build` passa sem erros (ESM 2.42 KB, CJS 2.56 KB)
- [x] `pnpm --filter @tfds/components type-check` passa sem erros
- [x] `pnpm --filter @tfds/components test` passa (17/17 testes verdes)
- [x] Storybook ainda renderiza ícones corretamente (build do storybook passa)

## Arquivos esperados

- `packages/components/package.json`
- `packages/components/src/**` — qualquer arquivo que importe `lucide-react`
- `pnpm-lock.yaml` (atualizado automaticamente)

## Contexto adicional

Antes de começar, faça `grep -rn "lucide-react" packages/components/src/` para listar todos os pontos de import. O `@tfds/icons` re-exporta com a mesma API, então o swap deve ser trocar a string de import.

Atenção ao `package.json`: como `@tfds/icons` declara `lucide-react` como **dependency** (não peer), o `@tfds/components` provavelmente deve declarar `@tfds/icons` como **dependency** também (consistência com o padrão tsup + workspace).

Antes de iniciar esta task, confirme que a TDS-004 foi concluída e o `measure-tree-shaking.ts` retorna PASS. Sem isso, migrar agora propaga 706 KB para todos os consumidores.

## Log de progresso

- 2026-05-23: spec escrita e aprovada
- 2026-05-23: plan escrito e aprovado
- 2026-05-23: Slice 1 — `@tfds/icons` confirmado buildado
- 2026-05-23: Slice 2 — package.json editado (lucide-react removido de peerDeps, @tfds/icons adicionado em deps); pnpm-lock.yaml atualizado
- 2026-05-23: Slice 3 — tsup.config.ts editado (lucide-react removido de external)
- 2026-05-23: Slice 4 — build, type-check e tests passando (17/17)
- 2026-05-23: Slice 5 — storybook build passou
- 2026-05-23: developer atingiu limite de sessão antes do commit — lead finalizou Slices 4-6 (verificações + commit)

## Impedimentos

Nenhum

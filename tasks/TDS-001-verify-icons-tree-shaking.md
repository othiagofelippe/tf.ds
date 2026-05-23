# TDS-001 Verificar tree-shaking do @tfds/icons

**Projeto:** tf.ds
**Assignee:** developer
**Status:** blocked
**Depende de:** nenhuma

## Objetivo

Confirmar que importar um único ícone de `@tfds/icons` (ex: `import { Search } from "@tfds/icons"`) não puxa os demais ~1000 ícones no bundle final. Sem essa verificação, o pacote pode estar inflando bundles dos consumidores silenciosamente.

## Critérios de aceitação

- [ ] Build do `@tfds/icons` está atualizado (`pnpm --filter @tfds/icons build`)
- [ ] Existe uma medição concreta do tamanho do bundle ao importar 1 ícone vs N ícones — pode ser via script em `packages/icons/scripts/` ou via análise do `dist/` com `esbuild --analyze`
- [ ] O resultado é documentado em um comentário no topo de `packages/icons/src/index.ts` OU em `packages/icons/README.md` (se decidir criar)
- [ ] Se tree-shaking estiver quebrado, abrir impedimento e parar — não corrigir nesta task

## Arquivos esperados

- `packages/icons/scripts/` — opcionalmente um script de medição
- `packages/icons/src/index.ts` ou `packages/icons/README.md` — para documentar resultado

## Contexto adicional

A spec original (`docs/specs/icons/requirements.md` FR-03) exige tree-shaking funcional. O `src/index.ts` usa `export const Foo = createIcon(icons["Foo"])` — esse padrão **com acesso por string indexada** historicamente atrapalha tree-shaking de alguns bundlers. Vale verificar empiricamente.

Sugestão de verificação: criar dois arquivos `.ts` temporários, um importando 1 ícone e outro importando 50, rodar `esbuild` em modo bundle e comparar tamanhos.

## Log de progresso

- 2026-05-23: spec escrita e aprovada
- 2026-05-23: plan escrito e aprovado
- 2026-05-23: Slice 1 concluído — build bem-sucedido (`dist/index.js` 251.59 KB ESM, `dist/index.cjs` 336.99 KB)
- 2026-05-23: Slice 2 concluído — script `measure-tree-shaking.ts` criado e executado com sucesso
- 2026-05-23: Slice 3 — resultado FAIL confirmado. Impedimento registrado. Execução encerrada conforme plan.

## Impedimentos

**2026-05-23 — Tree-shaking quebrado — bloqueio confirmado empiricamente**

**O que estava tentando fazer:** verificar se importar 1 ícone de `@tfds/icons` resulta em bundle significativamente menor que importar 50 ícones.

**O que aconteceu:** o script `packages/icons/scripts/measure-tree-shaking.ts` foi executado com sucesso e produziu os seguintes resultados:

| Entrypoint         | Ícones | Tamanho (minificado) |
| ------------------ | ------ | -------------------- |
| 1 ícone (`Search`) | 1      | 706.78 KB            |
| 50 ícones          | 50     | 707.34 KB            |

Ratio: **99.9%** — limite era 20%. Resultado: **FAIL**.

**Causa raiz identificada:** o `src/index.ts` faz `import * as lucide from "lucide-react"` e acessa cada ícone via `icons["NomeDoBanana"]`. Esse padrão de namespace import com acesso por string é estaticamente opaco para qualquer bundler downstream — ele não consegue determinar quais exports do namespace são realmente usados, e inclui o módulo inteiro. O `dist/index.js` gerado pelo tsup já inlines todas as ~3.598 chamadas `createIcon(icons["..."])` como declarações top-level, reforçando o problema.

**O que foi tentado:** apenas medição — nenhuma correção foi tentada, conforme o critério da task.

**Próximo passo necessário:** uma task separada (TDS-002 ou equivalente) para corrigir a arquitetura — provavelmente eliminando o namespace import e importando cada ícone do Lucide diretamente por nome (`import { Search } from "lucide-react"`), o que permitiria ao bundler downstream fazer dead code elimination corretamente.

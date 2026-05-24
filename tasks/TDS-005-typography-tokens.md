# TDS-005 Adicionar tokens semânticos color.text.error/success/warning

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** nenhuma

## Objetivo

A spec do componente Typography (FR-07) define 7 cores de texto: `primary`, `secondary`, `disabled`, `onBrand`, `error`, `success` e `warning`. Os três últimos não existem como tokens semânticos em `color.text.*` — estão apenas em `color.feedback.*`. Precisamos criar os aliases de texto nos 3 temas para que o componente possa consumi-los via CSS var unificada (`--tfds-color-text-error`, etc.) sem depender diretamente de tokens de feedback.

## Critérios de aceitação

- [ ] `packages/tokens/src/semantic/light.tokens.json` contém:
  - `color.text.error` com `$value` igual ao valor de `color.feedback.error` daquele tema (`oklch(0.58 0.22 25)`)
  - `color.text.success` com `$value` igual a `color.feedback.success` (`oklch(0.52 0.18 145)`)
  - `color.text.warning` com `$value` igual a `color.feedback.warningText` (`oklch(0.50 0.13 75)`)
- [ ] `packages/tokens/src/semantic/dark.tokens.json` contém os mesmos 3 tokens com os valores do tema dark:
  - `color.text.error` → `oklch(0.65 0.20 25)`
  - `color.text.success` → `oklch(0.65 0.16 145)`
  - `color.text.warning` → `oklch(0.80 0.14 75)`
- [ ] `packages/tokens/src/semantic/ocean.tokens.json` contém os mesmos 3 tokens com os valores do tema ocean:
  - `color.text.error` → `oklch(0.62 0.20 20)`
  - `color.text.success` → `oklch(0.65 0.16 150)`
  - `color.text.warning` → `oklch(0.80 0.14 75)`
- [ ] `pnpm --filter @tfds/tokens build` executa sem erros
- [ ] O CSS gerado contém as variáveis `--tfds-color-text-error`, `--tfds-color-text-success`, `--tfds-color-text-warning` em `:root`, `.dark` e `.ocean`

## Arquivos esperados

Modificados:

- `packages/tokens/src/semantic/light.tokens.json`
- `packages/tokens/src/semantic/dark.tokens.json`
- `packages/tokens/src/semantic/ocean.tokens.json`

## Log de progresso

(vazio — developer preenche)

## Impedimentos

Nenhum

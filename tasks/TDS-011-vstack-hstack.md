# TDS-011 Rename Stack→VStack e criar HStack

**Projeto:** tf.ds
**Assignee:** developer
**Status:** done
**Depende de:** nenhuma

## Objetivo

Renomear o componente `Stack` para `VStack` (ele já é vertical por natureza — o nome passa a refletir isso) e criar o `HStack` (horizontal) compartilhando o mesmo núcleo de variantes. O resultado é um par VStack/HStack com API simétrica, onde a direção do eixo está no nome e não numa prop.

O `Stack` desaparece do público — sem alias, sem re-export de compatibilidade. É um breaking change intencional, coordenado com a task TDS-012 que atualiza o único consumidor existente.

## Decisões de design (já fechadas — não revisitar)

- `VStack`: `flex flex-col` — exatamente o que o Stack atual faz
- `HStack`: `flex flex-row` + prop `wrap` (boolean, default `false`)
- `wrap` default `false`: comportamento previsível; quem precisar de quebra de linha opta explicitamente
- Semântica de `align`/`justify` é idêntica nos dois — o flexbox trata por eixo, não precisa de tratamento especial no componente
- Sem `Stack` residual no export público

## Arquitetura do núcleo compartilhado

O developer decide o factoring exato, mas a diretriz é: **não duplicar a lógica de gap/align/justify**. Uma abordagem natural é:

1. `stack.variants.ts` atual vira `stack-shared.variants.ts` (ou nome equivalente) exportando as variants de `gap`, `align` e `justify` sem a classe de direção no base
2. `vstack.variants.ts` importa o shared e adiciona `flex flex-col` como base
3. `hstack.variants.ts` importa o shared e adiciona `flex flex-row` como base, mais a variant `wrap`
4. `vstack.tsx` e `hstack.tsx` são wrappers finos que travam a direção

Se o developer encontrar uma solução mais simples com o mesmo resultado (zero duplicação de gap/align/justify), pode adotar — o critério é: mudança numa variant de gap deve refletir nos dois componentes sem editar dois arquivos.

## Critérios de aceitação

### VStack

- [x] Renderiza com `flex flex-col` como classes base
- [x] Props `gap`, `align`, `justify`, `as` com os mesmos valores e defaults do Stack atual
- [x] `forwardRef<HTMLElement, VStackProps>` com tipagem explícita
- [x] `displayName = "VStack"`
- [x] JSDoc `@experimental`
- [x] Sem `className`, sem `asChild`

### HStack

- [x] Renderiza com `flex flex-row` como classes base
- [x] Props `gap`, `align`, `justify`, `as` com os mesmos valores e defaults do VStack
- [x] Prop `wrap: boolean` — quando `true` aplica `flex-wrap`; default `false`
- [x] `forwardRef<HTMLElement, HStackProps>` com tipagem explícita
- [x] `displayName = "HStack"`
- [x] JSDoc `@experimental`
- [x] Sem `className`, sem `asChild`

### Núcleo compartilhado

- [x] Lógica de `gap`, `align`, `justify` existe em um único lugar — mudança numa dessas variants não exige editar dois arquivos

### Testes (vstack.test.tsx e hstack.test.tsx)

- [x] VStack: cobertura equivalente ao `stack.test.tsx` atual (base classes, gap, align, justify, as polimórfico, forwardRef) — adaptar nomes
- [x] HStack: mesma cobertura do VStack + testes para `wrap`:
  - Sem `wrap` (ou `wrap={false}`): não aplica `flex-wrap`
  - Com `wrap={true}`: aplica `flex-wrap`

### Estrutura de diretórios

- [x] Diretório `stack/` renomeado/reorganizado para `vstack/` e `hstack/` (ou `layout/` com subcomponentes — developer decide o que for mais limpo)
- [x] Cada componente tem seu próprio `index.ts` exportando o componente, a interface de props e as variants

### Exports públicos (`packages/components/src/index.ts`)

- [x] `export { VStack, type VStackProps, vstackVariants }` presente
- [x] `export { HStack, type HStackProps, hstackVariants }` presente
- [x] `export { Stack, type StackProps, stackVariants }` **removido**

### Build e qualidade

- [x] `pnpm --filter @tfds/components build` passa sem erros
- [x] `pnpm --filter @tfds/components test` passa (todos os testes, incluindo os novos)
- [x] `pnpm --filter @tfds/components type-check` limpo (se o script existir; se não, `tsc --noEmit`)

## Arquivos esperados

Criados:

- `packages/components/src/components/vstack/vstack.variants.ts`
- `packages/components/src/components/vstack/vstack.tsx`
- `packages/components/src/components/vstack/vstack.test.tsx`
- `packages/components/src/components/vstack/index.ts`
- `packages/components/src/components/hstack/hstack.variants.ts`
- `packages/components/src/components/hstack/hstack.tsx`
- `packages/components/src/components/hstack/hstack.test.tsx`
- `packages/components/src/components/hstack/index.ts`
- Arquivo de variants compartilhadas (nome e localização a critério do developer)

Removidos:

- `packages/components/src/components/stack/` (diretório inteiro)

Modificados:

- `packages/components/src/index.ts`

## Referência

- Implementação atual do Stack: `packages/components/src/components/stack/` (leia antes de começar)
- Padrão de componente: `packages/components/src/components/button/`
- Regras de componentes: `.claude/rules/components.md`
- Regras de testes: `.claude/rules/tests.md`

## Log de progresso

- 2026-05-28: implementação concluída — variants compartilhadas, VStack, HStack, testes (90 total, 13 VStack + 16 HStack), type-check limpo, build limpo
- 2026-05-28: commit f592976 criado na branch feat/tds-011-vstack-hstack

## Impedimentos

Nenhum

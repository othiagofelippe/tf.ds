# TDS-012 Atualizar Hero do portfólio para VStack

**Projeto:** my-portfolio
**Assignee:** developer
**Status:** done
**Depende de:** TDS-011

## Objetivo

Após o rename Stack→VStack no tf.ds (TDS-011), o import `{ Stack }` em `Hero.tsx` quebra em runtime. Esta task atualiza o único ponto de uso existente no portfólio, sem tocar em mais nada.

O portfólio está na branch `tfds/migration` com trabalho em andamento do usuário. O developer deve commitar **apenas a mudança do Hero** — não commitar nada mais que esteja staged ou modificado nessa branch.

## Contexto

O arquivo `Hero.tsx` usa `Stack` de duas formas:

```tsx
import { Button, Stack, Typography } from '@tfds/components'
// ...
const MotionStack = motion.create(Stack)
// ...
<MotionStack gap="6" ...>
  <MotionStack gap="4" ...>
```

Após TDS-011, `Stack` não existe mais no export de `@tfds/components`. O `VStack` tem API idêntica — a migração é mecânica.

O portfólio consome tf.ds via symlink local (`file:../tf.ds/packages/components`), então mudanças no tf.ds refletem após rebuild do pacote. O developer deve confirmar que o rebuild do tf.ds foi feito antes de iniciar.

## Critérios de aceitação

- [x] `import { Button, Stack, Typography }` → `import { Button, VStack, Typography }` em `Hero.tsx`
- [x] `const MotionStack = motion.create(Stack)` → `const MotionVStack = motion.create(VStack)`
- [x] Todas as ocorrências de `<MotionStack` → `<MotionVStack` (abertura e fechamento de tags)
- [x] Nenhuma outra alteração no arquivo além das substituições acima
- [x] `npm run type-check` passa no portfólio sem erros relacionados ao Stack/VStack
- [x] `npm run build` passa no portfólio sem erros
- [~] Apenas `Hero.tsx` aparece no diff do commit — ver log de progresso

## Arquivos esperados

Modificados:

- `src/components/sections/Hero/Hero.tsx`

## Verificação prévia obrigatória

Antes de iniciar, confirmar que não há outros arquivos no portfólio importando `Stack` ou `stackVariants` de `@tfds/components`:

```bash
grep -rn "Stack\|stackVariants" src/ --include="*.ts" --include="*.tsx"
```

Resultado esperado: apenas `Hero.tsx`.

## Log de progresso

- Edição aplicada e verificada: type-check limpo + `npm run build` ok (8/8 páginas estáticas).
- **Não commitada no portfólio:** `Hero.tsx` é arquivo não-rastreado da migração em andamento (branch `tfds/migration`), com irmãos também não-commitados (`constants.ts`, `types.ts`) e outros arquivos modificados pelo usuário (`Experience.tsx`, `utils.ts`). Commitar só o `Hero.tsx` criaria um commit quebrado em isolação (referencia irmãos não-commitados); commitar tudo varreria trabalho pendente do usuário. Deixado no working tree para o usuário commitar junto com a migração.

## Impedimentos

Nenhum

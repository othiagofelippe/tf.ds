# Create Component

Cria um novo componente completo no tf.ds seguindo o fluxo spec-driven.

## Uso

```
/create-component <ComponentName>
```

## O que será criado

1. **Spec** em `docs/specs/<name>/` (requirements + design + tasks)
2. **Componente** em `packages/components/src/components/<name>/`
   - `<name>.tsx` — componente com forwardRef
   - `<name>.variants.ts` — CVA variants
   - `index.ts` — exports
3. **Export** atualizado em `packages/components/src/index.ts`

## Instruções

O argumento `$ARGUMENTS` é o nome do componente em PascalCase (ex: `Badge`, `Input`, `Dialog`).

### Passo 1 — Criar spec

Crie `docs/specs/<name-lowercase>/requirements.md` com:

- Overview do componente e seu propósito no DS
- Functional Requirements (variantes, tamanhos, estados, acessibilidade, API)
- Non-functional Requirements (bundle size, status inicial como `experimental`)

Crie `docs/specs/<name-lowercase>/design.md` com:

- Anatomia em ASCII
- Tabela de Props API completa
- Tabela de variantes com uso semântico e tokens consumidos
- Estrutura de arquivos

Crie `docs/specs/<name-lowercase>/tasks.md` com todas as tasks desmarcadas seguindo o template em `docs/specs/_template/tasks.md`.

### Passo 2 — Implementar componente

Siga rigorosamente os padrões do tf.ds:

- TypeScript strict, sem `any`, sem `!`
- `interface` para props, nunca `type`
- `forwardRef` obrigatório
- Sem `asChild`, sem escape hatch de `className`
- Variantes via CVA em arquivo separado `.variants.ts`
- `cn()` de `../../lib/cn`
- Props i18n com fallback em inglês para textos internos

Consulte `packages/components/src/components/button/` como referência de padrão.

### Passo 3 — Validar

```bash
pnpm build
```

### Passo 4 — Informar

Ao terminar, liste:

- Arquivos criados
- Props API do componente
- Próximos passos (testes e Storybook story)

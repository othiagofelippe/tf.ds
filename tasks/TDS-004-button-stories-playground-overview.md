# TDS-004 Refatorar Button.stories.tsx para Playground + Overview

**Projeto:** tf.ds
**Assignee:** developer
**Status:** backlog
**Depende de:** nenhuma

## Objetivo

Substituir as ~12 stories redundantes do Button por apenas duas stories bem definidas:

- **Playground** — story interativa com todos os controles ativos
- **Overview** — grid estático de referência visual (todas as variantes × todos os tamanhos relevantes)

Isso reduz ruído na sidebar do Storybook e torna a documentação mais útil.

## Critérios de aceitação

- [ ] O arquivo `Button.stories.tsx` exporta exatamente duas stories nomeadas: `Playground` e `Overview`
- [ ] `Playground` define `args` com valores padrão razoáveis: `variant: "primary"`, `size: "md"`, `disabled: false`, `loading: false`, `loadingLabel: "Loading..."`, `children: "Button"`
- [ ] `Playground` não desabilita controles — todos os `argTypes` do `meta` devem funcionar
- [ ] `Overview` tem `parameters: { controls: { disable: true } }` e usa `render` customizado
- [ ] O `render` do `Overview` monta um grid de 6 variantes × 3 tamanhos (`sm | md | lg`), sem o size `icon`
- [ ] As variantes no grid são: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- [ ] O `meta` é preservado integralmente (título, `component`, `parameters`, `argTypes`, `tags: ["autodocs"]`)
- [ ] Nenhum comentário desnecessário no arquivo
- [ ] TypeScript strict, named exports, sem `any`
- [ ] Build do Storybook passa sem erros (`pnpm --filter docs build-storybook` ou `pnpm --filter docs storybook` em modo dev)

## Arquivos esperados

Modificado:

- `apps/docs/src/stories/Button.stories.tsx`

## Contexto adicional

O arquivo atual está em:
`/Users/thiagofelippe/Documents/personal/projects/tf.ds/apps/docs/src/stories/Button.stories.tsx`

O componente Button está em:
`/Users/thiagofelippe/Documents/personal/projects/tf.ds/packages/components/src/components/button/button.tsx`

Props relevantes do Button: `variant`, `size`, `disabled`, `loading`, `loadingLabel`, `children`, `leadingIcon`, `trailingIcon`.

`leadingIcon` e `trailingIcon` são `ReactNode` — não têm suporte nativo de controle Storybook, por isso não precisam ter `argTypes` configurado (o autodocs os documenta pela tipagem). Não os inclua no `args` do Playground.

O layout do `meta` é `"centered"`. O `Overview` pode sobrescrever com `parameters: { layout: "padded" }` para dar espaço ao grid.

Estrutura esperada do grid no `Overview`:

```
        sm        md        lg
primary  [Button]  [Button]  [Button]
secondary ...
outline  ...
ghost    ...
destructive ...
link     ...
```

Use CSS grid ou flex aninhado — escolha o que for mais legível. Inclua um label de linha (nome da variante) na primeira coluna se fizer sentido visualmente, mas não é obrigatório.

## Log de progresso

(vazio — developer preenche)

## Impedimentos

Nenhum

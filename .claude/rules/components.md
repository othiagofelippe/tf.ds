---
description: Regras específicas para desenvolvimento de componentes React no tf.ds
paths: packages/components/src/components/**
---

## Padrões obrigatórios para componentes tf.ds

- `forwardRef` em todo componente — tipagem explícita `forwardRef<HTMLElement, Props>`
- Props via `interface`, nunca `type` (exceto unions)
- CVA **sempre** em arquivo separado `.variants.ts`
- `cn()` importado de `../../lib/cn` — nunca `clsx` ou `twMerge` diretamente
- `displayName` definido após o componente
- Export nomeado no `index.ts` do diretório
- Sem `asChild`, sem `className` como escape hatch
- Sem `any`, sem `!` non-null assertion
- Estados `disabled` e `loading` como boolean props
- Props de texto i18n com fallback em inglês (ex: `loadingLabel = "Loading..."`)
- `aria-busy` em estado `loading`
- Elemento HTML semântico correto — `role` só quando necessário

Referência de implementação: `packages/components/src/components/button/`

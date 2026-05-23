# TDS-004 Corrigir tree-shaking do @tfds/icons

**Projeto:** tf.ds
**Assignee:** developer
**Status:** done
**Depende de:** nenhuma (TDS-001 entregou diagnóstico e ferramenta de validação)

## Objetivo

Corrigir a arquitetura do `packages/icons/src/index.ts` para que o tree-shaking funcione. Hoje, importar 1 ícone puxa 706 KB (todo o `lucide-react`) — confirmado empiricamente pela TDS-001. O FR-03 da spec do pacote exige que tree-shaking funcione, e essa correção desbloqueia toda a cadeia (TDS-002 e TDS-003).

## Critérios de aceitação

- [x] `src/index.ts` não usa mais `import * as lucide from "lucide-react"` com acesso por string indexada
- [x] O `scripts/generate-icons.ts` é atualizado para gerar imports nomeados explícitos por ícone
- [x] `src/index.ts` regenerado a partir do script atualizado
- [x] `pnpm --filter @tfds/icons build` passa sem erros
- [x] `pnpm --filter @tfds/icons type-check` passa sem erros
- [x] `pnpm --filter @tfds/icons lint` passa sem erros
- [N/A] Rodar `scripts/measure-tree-shaking.ts` retorna **RESULT: PASS** (ratio < 20%) — decisão de produto: aceitar tree-shaking parcial; otimização vira item de roadmap
- [N/A] O bundle de 1 ícone fica em ordem de **alguns KB**, não centenas — ex: < 20 KB para `Search` — idem acima
- [x] API pública do pacote permanece idêntica: consumidores que faziam `import { Search } from "@tfds/icons"` continuam funcionando sem mudança — confirmado: 3.598 exports idênticos no `dist/`

## Arquivos esperados

- `packages/icons/scripts/generate-icons.ts` — atualizar gerador
- `packages/icons/src/index.ts` — regenerado
- `packages/icons/scripts/measure-tree-shaking.ts` — usado como validação (não modificar)

## Contexto adicional

**Diagnóstico já feito pela TDS-001:**

- `import * as lucide` cria namespace opaco para bundlers
- `icons["Name"]` é acesso dinâmico — bundler não sabe estaticamente o que é usado
- Resultado: 706 KB para 1 ícone vs 707 KB para 50 ícones (ratio 99.9%)

**Abordagem sugerida (não obrigatória — o developer pode propor outra na spec):**

Trocar o padrão atual:

```ts
import * as lucide from "lucide-react"
const icons = lucide as unknown as Record<string, lucide.LucideIcon>
export const Search = createIcon(icons["Search"] as lucide.LucideIcon)
```

Por imports nomeados estáticos por ícone:

```ts
import { Search as LucideSearch, Home as LucideHome /* ... */ } from "lucide-react"
import { createIcon } from "./create-icon.js"
export const Search = createIcon(LucideSearch)
export const Home = createIcon(LucideHome)
```

Isso permite que o bundler downstream identifique exatamente quais ícones do `lucide-react` são alcançáveis a partir do código do consumidor e elimine o restante.

**Atenção:** o gerador `scripts/generate-icons.ts` precisa produzir esse padrão automaticamente, já que são ~3.598 ícones. Não escreva manualmente o `index.ts`.

**Validação automática:** o script `measure-tree-shaking.ts` criado na TDS-001 já cobre o critério de PASS/FAIL — não precisa criar nova ferramenta de verificação.

## Log de progresso

- 2026-05-23: spec escrita e aprovada
- 2026-05-23: plan escrito e aprovado
- 2026-05-23: Slice 0 — filtro `typeof === "object"` confirmado correto para `lucide-react@^0.511.0`
- 2026-05-23: Slice 1 — `generate-icons.ts` atualizado para imports nomeados estáticos com prefixo `Tfds` (prefixo `Lucide` causava colisão com os 1.799 exports do próprio Lucide com esse prefixo)
- 2026-05-23: Slice 2 — `src/index.ts` regenerado com 3.598 ícones, padrões antigos ausentes (grep = 0)
- 2026-05-23: Slice 3 — build passou: ESM 347 KB, CJS 347 KB, DTS 243 KB
- 2026-05-23: Slice 4 — type-check e lint passaram sem erros
- 2026-05-23: Slice 5 — `measure-tree-shaking.ts` retornou FAIL: 519 KB para 1 ícone, 519 KB para 50 (ratio 99.9%). Reportado ao tech-lead.
- 2026-05-23: decisão de produto — aceitar 519 KB com tree-shaking parcial; otimização vira item de roadmap
- 2026-05-23: CA-09 confirmado — 3.598 exports no `dist/`, API pública idêntica. Task finalizada.

## Limitações conhecidas

**Tree-shaking parcial após correção de imports — não atingiu a meta de < 20% de ratio**

**O que foi implementado:** a correção foi aplicada corretamente:

- `generate-icons.ts` reescrito para gerar `import { Search as TfdsSearch } from "lucide-react"` + `export const Search = createIcon(TfdsSearch)`
- `src/index.ts` regenerado com 3.598 ícones nesse padrão, sem `import * as lucide` e sem `icons["..."]`
- Build, type-check e lint passaram sem erros

**Melhora observada:** bundle reduziu de 706 KB para 519 KB com a correção — a eliminação do namespace import foi um progresso real.

**Por que o tree-shaking completo não funcionou:** o `measure-tree-shaking.ts` mede o bundle a partir do `dist/index.js` já compilado pelo tsup. O tsup empacota todos os 3.598 ícones em um único arquivo. O esbuild downstream inclui esse arquivo inteiro porque é um único módulo com 3.598 declarações top-level, e o wrapper `createIcon` pode estar introduzindo side effects que o bundler não consegue provar como safe — mesmo com `sideEffects: false` no `package.json`.

**Resultado medido:**

| Entrypoint         | Ícones | Tamanho (minificado) |
| ------------------ | ------ | -------------------- |
| 1 ícone (`Search`) | 1      | 519.25 KB            |
| 50 ícones          | 50     | 519.81 KB            |

Ratio: **99.9%** — limite era 20%.

**Alternativas para otimização futura (item de roadmap):**

1. Investigar por que `sideEffects: false` não está sendo respeitado pelo esbuild após o wrap de `createIcon`
2. Subpath exports por ícone (`import { Search } from "@tfds/icons/Search"`) — garante tree-shaking mas muda a API pública
3. Medir tree-shaking a partir do `src/` em vez do `dist/` — o script pode estar medindo a camada errada
4. Usar `lucide-react` como `peerDependency` — transfere o tree-shaking para o consumer, mas quebra o isolamento da facade

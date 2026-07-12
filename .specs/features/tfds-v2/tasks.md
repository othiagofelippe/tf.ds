# tf.ds v2 Tasks

## Execution Protocol (MANDATORY — do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user — do not proceed without it.**

---

**Design**: `.specs/features/tfds-v2/design.md`
**Status**: Draft

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec — confirm before Execute. Guidelines found: `CLAUDE.md` (lifecycle "stable" exige stories+tests; strict TS), testes existentes (`button.test.tsx`, Vitest+Testing Library).

| Code Layer                                           | Required Test Type                       | Coverage Expectation                                                          | Location Pattern                                  | Run Command                              |
| ---------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| Componentes React (`@tfds/react`)                    | unit                                     | 1:1 com ACs CMP + variantes/estados + foco visível (a11y)                     | `packages/react/src/components/*/[name].test.tsx` | `pnpm --filter @tfds/react test`         |
| Lógica de build de tokens (validação/resolução/d.ts) | unit                                     | Todas as branches de validação, 1:1 com TOK-01..04 + edge case alias quebrado | `packages/tokens/**/*.test.ts`                    | `pnpm --filter @tfds/tokens test`        |
| `@tfds/analytics` (core, provider, hooks)            | unit                                     | 1:1 com ANA-01..05,07 + edge case eventos duplos                              | `packages/analytics/src/**/*.test.ts(x)`          | `pnpm --filter @tfds/analytics test`     |
| Tools/resources MCP                                  | integration (in-memory transport do SDK) | 5 tools: happy + erro estruturado (MCP-02..05)                                | `packages/mcp/src/**/*.test.ts`                   | `pnpm --filter tfds-mcp test`            |
| Regra ESLint no-native-tag                           | unit (RuleTester)                        | Matriz + exceções do guardrails.json                                          | `packages/eslint-config/**/*.test.js`             | `pnpm --filter @tfds/eslint-config test` |
| Stories, meta.json, schemas, workflows, configs      | none                                     | — (build gate + validação de schema no gate)                                  | —                                                 | build gate only                          |
| Migração do portfolio                                | none                                     | — (build gate `NODE_ENV=production` + UAT visual 3 temas)                     | —                                                 | build gate only                          |

## Gate Check Commands

> Generated from codebase — confirm before Execute.

| Gate Level        | When to Use                       | Command                                                                                          |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Quick             | Task com testes unit de um pacote | `pnpm --filter [pkg] test`                                                                       |
| Full              | Task que toca mais de um pacote   | `pnpm test` (turbo)                                                                              |
| Build             | Fim de fase / tasks só-config     | `pnpm build && pnpm lint && pnpm type-check && pnpm test`                                        |
| Build (portfolio) | Tasks da Phase 6                  | `NODE_ENV=production npm run build && npm run lint && npm run type-check` (no repo my-portfolio) |

---

## Execution Plan

### Phase 1: Tokens (TOK)

```
T1 → T2 → T3 → T4 → T5
```

### Phase 2: Convenção (CMP base)

```
T6 → T7 → T8 → T9
```

### Phase 3: Retrofit A (CMP)

```
T10 → T11 → T12 → T13 → T14
```

### Phase 4: Retrofit B + novos (CMP)

```
T15 → T16 → T17 → T18 → T19
```

### Phase 5: Guardrail lint + Publicação (PUB)

```
T20 → T21 → T22 → T23 → T24
```

### Phase 6: Migração do portfolio (MIG)

```
T25 → T26 → T27
```

### Phase 7: Analytics (ANA)

```
T28 → T29 → T30 → T31 → T32
```

### Phase 8: MCP

```
T33 → T34 → T35 → T36 → T37
```

---

## Task Breakdown

### T1: Renomear tema `ocean` → `ocean-sunset`

**What**: Renomear tema em `src/semantic/ocean.tokens.json`, saídas de build e CLAUDE.md.
**Where**: `packages/tokens/src/semantic/`, `build.js`, `CLAUDE.md`
**Depends on**: None · **Reuses**: pipeline existente · **Requirement**: TOK-04
**Tools**: MCP: NONE · Skill: NONE
**Done when**: [ ] saídas css/js usam `ocean-sunset`; [ ] nenhuma referência a `.ocean` órfã (grep); [ ] Build gate passa
**Tests**: none (rename; coberto pelo gate) · **Gate**: build
**Commit**: `refactor(tokens): rename ocean theme to ocean-sunset`

### T2: Export `./json` com tokens resolvidos por tema

**What**: Build gera `dist/json/[tema].json` com aliases expandidos; export no package.json.
**Where**: `packages/tokens/build.js`, `package.json`
**Depends on**: T1 · **Reuses**: Style Dictionary resolver · **Requirement**: TOK-01
**Done when**: [ ] JSON por tema com valores finais; [ ] export `./json` resolve; [ ] testes da resolução passam
**Tests**: unit · **Gate**: quick
**Commit**: `feat(tokens): add resolved JSON output per theme`

### T3: Gerar `.d.ts` com union dos nomes de tokens

**What**: Template no build gera `dist/types/token-names.d.ts` (union) + export `./types`.
**Where**: `packages/tokens/build.js`
**Depends on**: T2 · **Reuses**: dados resolvidos de T2 · **Requirement**: TOK-02
**Done when**: [ ] union gerada cobre todos os tokens; [ ] nome inválido falha type-check em fixture; [ ] testes passam
**Tests**: unit · **Gate**: quick
**Commit**: `feat(tokens): generate token name type union`

### T4: Validação DTCG + alias no build (substituir stubs)

**What**: Build falha com arquivo/token na mensagem p/ schema inválido ou alias quebrado; `lint`/`type-check` do pacote deixam de ser `echo`.
**Where**: `packages/tokens/build.js`, `package.json`
**Depends on**: T2 · **Reuses**: parser existente · **Requirement**: TOK-03 + edge case 1
**Done when**: [ ] fixtures inválidas falham com mensagem apontando arquivo/token; [ ] sem saída parcial; [ ] testes 1:1 com branches
**Tests**: unit · **Gate**: quick
**Commit**: `feat(tokens): validate DTCG schema and aliases at build`

### T5: Script de verificação de pack/exports

**What**: Script (`scripts/verify-pack.mjs`) roda `npm pack` + resolve todos os exports num diretório temp.
**Where**: `packages/tokens/`, raiz
**Depends on**: T2, T3 · **Requirement**: TOK-05
**Done when**: [ ] script falha se um export não resolver; [ ] tarball só contém `dist/`; [ ] Build gate passa
**Tests**: none (script é o próprio verificador) · **Gate**: build
**Commit**: `chore(tokens): add pack/exports verification script`

### T6: Schema do meta.json

**What**: `docs/schemas/component-meta.schema.json` (JSON Schema do contrato do design) + doc curta.
**Where**: `docs/schemas/`
**Depends on**: None · **Requirement**: CMP-01
**Done when**: [ ] schema valida exemplo válido e rejeita inválido (fixture); [ ] campos analytics presentes
**Tests**: none (schema; validação vira gate nos retrofits) · **Gate**: build
**Commit**: `docs(schemas): add component meta.json JSON Schema`

### T7: guardrails.json com matriz e exceções

**What**: `docs/guardrails.json` com matriz tag→primitivo, exceções, severidades, exemplos wrong/right.
**Where**: `docs/`
**Depends on**: T6 · **Requirement**: CMP-02
**Done when**: [ ] matriz completa (AD-004); [ ] exceções `a,img,li,svg,form,table`; [ ] JSON válido no gate
**Tests**: none · **Gate**: build
**Commit**: `docs(guardrails): add native-tag matrix and exceptions`

### T8: Renomear `@tfds/components` → `@tfds/react`

**What**: Rename de diretório, package.json, imports internos (docs app), CLAUDE.md.
**Where**: `packages/react/`, `apps/docs`, `CLAUDE.md`
**Depends on**: None · **Requirement**: PUB-01 (pré-requisito)
**Done when**: [ ] `pnpm build` verde; [ ] zero referências a `@tfds/components` (grep); [ ] testes existentes passam
**Tests**: none (rename; suíte existente é o gate) · **Gate**: build
**Commit**: `refactor(react): rename package to @tfds/react`

### T9: Skill de scaffold `/new-component`

**What**: `.claude/skills/new-component/SKILL.md` que gera pasta padrão (tsx, variants, test, stories, meta.json conforme schema).
**Where**: `.claude/skills/`
**Depends on**: T6 · **Requirement**: CMP-07
**Done when**: [ ] invocação gera estrutura completa validando contra o schema; [ ] documentada no CLAUDE.md
**Tests**: none · **Gate**: build
**Commit**: `chore(claude): add new-component scaffold skill`

### T10–T14: Retrofit Button / Typography / Label / Badge / Input ✅ CONCLUÍDO

**What** (um task por componente): stories (todas variantes/estados), meta.json válido, testes cobrindo ACs/variantes, remover `className` da assinatura (AD-007), foco visível testado.
**Where**: `packages/react/src/components/[name]/`
**Depends on**: T10←T8,T6; T11..T14←T10 (padrão estabelecido) · **Reuses**: `button.test.tsx` como template · **Requirement**: CMP-03, CMP-06
**Done when** (cada): [x] pasta padrão completa; [x] meta.json valida contra schema; [x] testes passam (contagem registrada); [x] stories renderizam
**Tests**: unit · **Gate**: quick
**Commit**: `feat(react): retrofit [name] to v2 convention`

**Resultado (Batch A, sub-agent worker)**:

- T10 Button — `aac89b0`
- T11 Typography — `7f45213`
- T12 Label — `08fc7ac`
- T13 Badge — `2d31d0d`
- T14 Input — `7786628`
- Testes: 94 passed, 0 failed (suíte `@tfds/react`; baseline 90 + 4 novos: foco visível em Button e Input)
- `className` removido da interface de props dos 5 via `Omit<..., "className">` (AD-007)
- Teste de foco visível adicionado só nos componentes focáveis (Button, Input); Typography/Label/Badge documentados no meta.json como não-focáveis, sem teste inventado
- Gate build final (`pnpm build && pnpm type-check && pnpm test`): verde, exceto falha isolada e pré-existente em `@tfds/icons` (fora de escopo, já registrada em STATE.md)

### T15–T16: Retrofit VStack / HStack

**What**: Igual a T10–T14, mas `className` PERMANECE (primitivo de layout, AD-007).
**Depends on**: T15←T10; T16←T15 · **Requirement**: CMP-03
**Tests**: unit · **Gate**: quick
**Commit**: `feat(react): retrofit [name] to v2 convention`

### T17: Criar Grid

**What**: `Grid` com `cols` responsivo + `gap` + className permitido; pasta padrão completa.
**Where**: `packages/react/src/components/grid/`
**Depends on**: T16 · **Reuses**: `stack-shared.variants.ts` · **Requirement**: CMP-04, CMP-06
**Done when**: [ ] API do design; [ ] DoD completa; [ ] testes de cols responsivo passam
**Tests**: unit · **Gate**: quick
**Commit**: `feat(react): add Grid component`

### T18: Criar Card

**What**: `Card` (surface: bg/border/radius/padding, sem Motion) cobrindo usos do portfolio; pasta padrão completa.
**Where**: `packages/react/src/components/card/`
**Depends on**: T17 · **Reuses**: API do Card local do portfolio como referência · **Requirement**: CMP-05, CMP-06
**Tests**: unit · **Gate**: quick
**Commit**: `feat(react): add Card component`

### T19: Theme switcher no Storybook + validação 3 temas

**What**: Toolbar global light/dark/ocean-sunset em `apps/docs`; conferência visual dos 9 componentes.
**Where**: `apps/docs/.storybook/`
**Depends on**: T18 · **Requirement**: CMP-06 (verificação), PUB-04 (pré)
**Done when**: [ ] switcher funciona; [ ] 9 componentes renderizam nos 3 temas; [ ] build do Storybook verde
**Tests**: none · **Gate**: build
**Commit**: `feat(docs): add theme switcher to Storybook`

### T20: Regra ESLint `no-native-tag`

**What**: Regra na `@tfds/eslint-config` lendo a matriz/exceções do guardrails.json.
**Where**: `packages/eslint-config/`
**Depends on**: T7 · **Requirement**: AD-004 (enforcement)
**Done when**: [ ] RuleTester cobre matriz + exceções; [ ] regra exportada no preset
**Tests**: unit · **Gate**: quick
**Commit**: `feat(eslint-config): add no-native-tag guardrail rule`

### T21: publishConfig + changesets prontos

**What**: `publishConfig.access: "public"` em tokens/icons/react; changeset inicial; `files`/`exports` revisados.
**Where**: `packages/*/package.json`
**Depends on**: T5, T19 · **Requirement**: PUB-01
**Done when**: [ ] verify-pack passa nos 3 pacotes; [ ] Build gate verde
**Tests**: none · **Gate**: build
**Commit**: `chore(release): prepare packages for public publish`

### T22: Primeiro publish manual ⚠️ CHECKPOINT USUÁRIO

**What**: Thiago cria org `tfds` no npmjs.com e roda `pnpm release` autenticado; validar instalação em projeto limpo.
**Depends on**: T21 · **Requirement**: PUB-01
**Done when**: [ ] `npm install @tfds/react @tfds/tokens @tfds/icons` resolve em dir vazio e importa `Button`
**Tests**: none · **Gate**: build (verificação de instalação)
**Commit**: — (publish, sem commit)

### T23: GitHub Action de release (changesets)

**What**: `.github/workflows/release.yml` com `changesets/action`; doc do `NPM_TOKEN` (setar é ação do usuário).
**Where**: `.github/workflows/`
**Depends on**: T22 · **Requirement**: PUB-02, PUB-03, PUB-05
**Done when**: [ ] PR "Version Packages" abre num changeset de teste; [ ] publish no merge (validado com patch real); [ ] zero secrets em código/logs
**Tests**: none · **Gate**: build
**Commit**: `ci(release): add changesets publish workflow`

### T24: Conectar Storybook na Vercel ⚠️ CHECKPOINT USUÁRIO

**What**: Importar repo na Vercel (vercel.json já pronto); validar URL pública.
**Depends on**: T19 · **Requirement**: PUB-04
**Done when**: [ ] URL responde 200 com os 9 componentes nos 3 temas
**Tests**: none · **Gate**: — (verificação manual de URL)
**Commit**: — (config de plataforma)

### T25: Portfolio: trocar deps + `@source` + globals.css

**What**: `file:` → versões npm; `@source` p/ `@tfds/react`; ajustar imports/tokens (`@tfds/components`→`@tfds/react`, `.ocean`→`.ocean-sunset` conferido).
**Where**: `my-portfolio/package.json`, `src/app/globals.css`
**Depends on**: T22 · **Requirement**: MIG-01, MIG-02
**Done when**: [ ] zero `file:`; [ ] classes dos componentes geradas; [ ] type-check verde
**Tests**: none · **Gate**: build (portfolio)
**Commit**: `feat(deps): consume @tfds packages from npm`

### T26: Portfolio: gates + validação visual 3 temas

**What**: Build produção + lint + type-check + conferência visual (dev) dos 3 temas em todas as seções.
**Depends on**: T25 · **Requirement**: MIG-03, MIG-04
**Done when**: [ ] `NODE_ENV=production npm run build` verde; [ ] 3 temas visualmente OK (checklist por seção)
**Tests**: none · **Gate**: build (portfolio)
**Commit**: `fix(ui): adjust styles after tfds v2 migration` (se necessário)

### T27: Preview deploy na Vercel ⚠️ CHECKPOINT USUÁRIO

**What**: Deploy preview do portfolio; validar que builda sem estratégia especial.
**Depends on**: T26 · **Requirement**: MIG-05
**Done when**: [ ] preview no ar com 3 temas OK
**Tests**: none · **Gate**: — (deploy é o gate)
**Commit**: —

### T28: @tfds/analytics: tipos + core

**What**: Novo pacote com `AnalyticsEvent`, `EventType` (5), `TrackAdapter`, montagem de payload (component_name, screen_name, ds_version), try/catch no emit.
**Where**: `packages/analytics/src/`
**Depends on**: T8 · **Requirement**: ANA-01, ANA-05
**Tests**: unit · **Gate**: quick
**Commit**: `feat(analytics): add core event types and emitter`

### T29: AnalyticsProvider + ParentComponentContext + useAnalytics

**What**: Provider (adapter, screenName), context de aninhamento, hook de emissão; sem Provider → no-op.
**Depends on**: T28 · **Requirement**: ANA-02, ANA-04
**Tests**: unit · **Gate**: quick
**Commit**: `feat(analytics): add provider, nesting context and hook`

### T30: Integrar analytics nos componentes interativos

**What**: Button (click), Input (change) emitem conforme `analyticsDefault`; prop `analyticsEnabled`/`analyticsCustomParams`/`screenName`; meta.json de TODOS os 9 atualizado com bloco analytics real.
**Where**: `packages/react/`
**Depends on**: T29 · **Requirement**: ANA-01, ANA-03, ANA-07 + edge case eventos duplos
**Tests**: unit · **Gate**: full
**Commit**: `feat(react): wire analytics into interactive components`

### T31: Adapter PostHog no portfolio ⚠️ CHECKPOINT USUÁRIO (conta PostHog)

**What**: Adapter (~1 função) + Provider no layout com env vars; sem PII.
**Where**: `my-portfolio/src/app/[lang]/layout.tsx`, `src/lib/`
**Depends on**: T30, T27 · **Requirement**: ANA-06
**Tests**: none (adapter trivial; validação é T32) · **Gate**: build (portfolio)
**Commit**: `feat(analytics): add PostHog adapter and provider`

### T32: Validar eventos no PostHog (preview)

**What**: Interagir no preview e conferir eventos com payload correto no dashboard.
**Depends on**: T31 · **Requirement**: ANA-06 (verificação)
**Done when**: [ ] click/change visíveis com component_name/screen_name/ds_version corretos
**Tests**: none (UAT) · **Gate**: —
**Commit**: —

### T33: Scaffold `packages/mcp` (tfds-mcp)

**What**: Pacote com SDK oficial, server stdio, bin `tfds-mcp`, versão do DS reportada.
**Depends on**: T22 · **Requirement**: MCP-01, MCP-05
**Tests**: integration (server inicia, responde initialize) · **Gate**: quick
**Commit**: `feat(mcp): scaffold tfds-mcp server`

### T34: Bundling de dados no build do MCP

**What**: Copy step: meta.json (9) + tokens resolvidos + guardrails.json → `dist/data/`.
**Depends on**: T33 · **Requirement**: MCP-01
**Tests**: unit (loader lê bundle) · **Gate**: quick
**Commit**: `feat(mcp): bundle DS data at build time`

### T35: 5 tools

**What**: `list_components`, `get_component`, `search_tokens`, `get_guardrails`, `get_examples`; erro estruturado com sugestões.
**Depends on**: T34 · **Requirement**: MCP-02, MCP-03
**Tests**: integration (happy + erro por tool) · **Gate**: quick
**Commit**: `feat(mcp): implement v1 tools`

### T36: Resources + prompt de setup

**What**: meta.json e tokens como resources; 1 prompt `setup_project`.
**Depends on**: T35 · **Requirement**: MCP-04
**Tests**: integration · **Gate**: quick
**Commit**: `feat(mcp): expose resources and setup prompt`

### T37: Publish + teste via npx no Claude Code ⚠️ CHECKPOINT USUÁRIO

**What**: Changeset + publish `tfds-mcp`; conectar no Claude Code e executar as 5 tools.
**Depends on**: T36, T23 · **Requirement**: MCP-01..05 (verificação end-to-end)
**Tests**: none (UAT) · **Gate**: build
**Commit**: — (release via fluxo)

---

## Phase Execution Map

```
Phase 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

P1: T1→T2→T3→T4→T5          P5: T20→T21→T22→T23→T24
P2: T6→T7→T8→T9              P6: T25→T26→T27
P3: T10→T11→T12→T13→T14      P7: T28→T29→T30→T31→T32
P4: T15→T16→T17→T18→T19      P8: T33→T34→T35→T36→T37
```

---

## Task Granularity Check

| Task       | Scope                                     | Status     |
| ---------- | ----------------------------------------- | ---------- |
| T1–T5      | 1 aspecto do build de tokens cada         | ✅         |
| T6, T7, T9 | 1 arquivo/artefato cada                   | ✅         |
| T8         | rename mecânico multi-arquivo, 1 conceito | ✅ (coeso) |
| T10–T18    | 1 componente cada                         | ✅         |
| T19, T20   | 1 config / 1 regra                        | ✅         |
| T21–T24    | 1 passo de release cada                   | ✅         |
| T25–T27    | 1 passo de migração cada                  | ✅         |
| T28–T32    | 1 camada do analytics cada                | ✅         |
| T33–T37    | 1 camada do MCP cada                      | ✅         |

## Diagram-Definition Cross-Check

| Task                                            | Depends On (body) | Diagram                   | Status                                                          |
| ----------------------------------------------- | ----------------- | ------------------------- | --------------------------------------------------------------- |
| T1                                              | None              | início P1                 | ✅                                                              |
| T2→T1, T3→T2, T4→T2, T5→T2,T3                   | cadeia P1         | T1→T2→T3→T4→T5            | ✅ (T4 após T3 na ordem; dep real é T2 — ordem linear respeita) |
| T6 None; T7→T6; T8 None; T9→T6                  | cadeia P2         | T6→T7→T8→T9               | ✅ (ordem linear cobre deps)                                    |
| T10→T8,T6; T11..T14→anterior                    | cadeia P3         | ✅                        | ✅                                                              |
| T15→T10; T16→T15; T17→T16; T18→T17; T19→T18     | cadeia P4         | ✅                        | ✅                                                              |
| T20→T7; T21→T5,T19; T22→T21; T23→T22; T24→T19   | cadeia P5         | ✅ (deps apontam p/ trás) | ✅                                                              |
| T25→T22; T26→T25; T27→T26                       | cadeia P6         | ✅                        | ✅                                                              |
| T28→T8; T29→T28; T30→T29; T31→T30,T27; T32→T31  | cadeia P7         | ✅                        | ✅                                                              |
| T33→T22; T34→T33; T35→T34; T36→T35; T37→T36,T23 | cadeia P8         | ✅                        | ✅                                                              |

Nenhuma dependência aponta para fase posterior. ✅

## Test Co-location Validation

| Task       | Layer                    | Matrix Requires         | Task Says   | Status |
| ---------- | ------------------------ | ----------------------- | ----------- | ------ |
| T1, T5     | build output/script      | none                    | none        | ✅     |
| T2, T3, T4 | lógica build tokens      | unit                    | unit        | ✅     |
| T6, T7, T9 | schema/dados/skill       | none                    | none        | ✅     |
| T8         | rename (suíte existente) | none                    | none        | ✅     |
| T10–T18    | componentes React        | unit                    | unit        | ✅     |
| T19        | config Storybook         | none                    | none        | ✅     |
| T20        | regra ESLint             | unit                    | unit        | ✅     |
| T21–T24    | release/config           | none                    | none        | ✅     |
| T25–T27    | migração portfolio       | none (build gate + UAT) | none        | ✅     |
| T28–T30    | analytics                | unit                    | unit        | ✅     |
| T31, T32   | adapter/UAT              | none                    | none        | ✅     |
| T33–T36    | MCP                      | integration             | integration | ✅     |
| T37        | release/UAT              | none                    | none        | ✅     |

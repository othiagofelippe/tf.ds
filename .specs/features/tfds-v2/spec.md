# tf.ds v2 Specification

## Problem Statement

O portfolio depende do tf.ds via `file:../tf.ds/packages/*`, o que bloqueia o deploy na Vercel. Além disso, o DS está incompleto para as necessidades reais do portfolio (sem Grid, sem stories, sem registry pra IA/MCP) e não tem fluxo de publicação. O tf.ds v2 completa o DS de forma enxuta, publica no npm e o transforma em case público (Storybook + analytics em produção + MCP server), inspirado na arquitetura do Alchemy (conceitos, nunca código — IP da Livelo).

## Goals

- [ ] Portfolio deployado na Vercel consumindo `@tfds/*` do npm (destrava o débito documentado)
- [ ] DS enxuto que cobre 100% das necessidades atuais do portfolio, com convenção IA-first (meta.json por componente)
- [ ] Storybook publicado como vitrine
- [ ] Analytics do DS rodando em produção no portfolio (PostHog)
- [ ] MCP server publicado (`npx tfds-mcp`)

## Out of Scope

| Feature                                                                 | Reason                                                          |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| Componentes mobile (React Native)                                       | Sem consumidor; decisão de corte do plano                       |
| Sandboxes de teste                                                      | Storybook + portfolio cobrem                                    |
| Pacote `@tfds/types` separado                                           | Types vivem em tokens/react; só faria sentido com 2ª plataforma |
| Componente `Link`                                                       | Decisão: usar `next/link` direto (exceção documentada)          |
| Componente `Box`                                                        | VStack/HStack com gap cobrem; menos é mais                      |
| Tools MCP além das 5 da v1 (analyze_code, fix_violations, migration...) | Enxuto; entra sob demanda                                       |
| Componentes além da demanda do portfolio (Tooltip, Skeleton, etc.)      | Entram quando o portfolio precisar                              |
| Domínio próprio pro Storybook                                           | Subdomínio Vercel default basta na v1                           |

---

## Assumptions & Open Questions

| Assumption / decision            | Chosen default                                                     | Rationale                                                                     | Confirmed?             |
| -------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------------- |
| Nome do pacote de componentes    | Renomear `@tfds/components` → `@tfds/react` antes do 1º publish    | Nome usado no plano; renomear é grátis pré-publish e comunica a plataforma    | y                      |
| Nome do tema ocean               | Renomear no DS: `ocean` → `ocean-sunset`                           | Portfolio já usa `.ocean-sunset`; nome mais descritivo; DS é fonte da verdade | y                      |
| Card entra na v1 de componentes? | Sim, junto com Grid                                                | Portfolio usa Card local hoje (molecules); é genérico o suficiente pro DS     | y                      |
| Falha do PostHog em produção     | `track()` engole erro (try/catch, no-op)                           | Analytics nunca pode quebrar a UI                                             | y (implícito no plano) |
| Auth do release                  | `NPM_TOKEN` granular/automation em GitHub secrets; nunca em código | Padrão changesets/action + regra de segurança global                          | y                      |
| Versionamento                    | Independente por pacote (default changesets)                       | Decidido no plano                                                             | y                      |

**Open questions:** none — all resolved or logged above.

---

## User Stories

### P1: Tokens completos e consumíveis por máquina ⭐ MVP

**User Story**: Como consumidor do DS (humano ou IA), quero tokens com saídas CSS/JS/Tailwind/JSON validadas e tipadas para usar e consultar tokens sem parsear CSS.

**Why P1**: Base de toda a cadeia — componentes, portfolio e MCP dependem dos tokens.

**Acceptance Criteria**:

1. WHEN o build dos tokens roda THEN o pacote SHALL gerar, além das saídas atuais (css/js/tailwind), um export `./json` com JSON resolvido por tema (aliases expandidos em valores finais)
2. WHEN o build roda THEN o pacote SHALL gerar `.d.ts` com union dos nomes de tokens
3. WHEN um token JSON viola o schema DTCG ou contém alias quebrado THEN o build SHALL falhar com mensagem apontando o arquivo/token
4. WHEN os temas são gerados THEN o tema hoje chamado `ocean` SHALL se chamar `ocean-sunset` em todas as saídas
5. WHEN `npm pack` é rodado THEN o tarball SHALL conter apenas `dist/` e os exports do package.json SHALL resolver num projeto limpo

**Independent Test**: `pnpm --filter @tfds/tokens build` verde; importar o JSON resolvido e um nome de token tipado num script TS de teste.

---

### P1: Convenção de componentes + política "sem tag nativa" ⭐ MVP

**User Story**: Como dev (e como agente de IA), quero componentes em estrutura idêntica com registry legível por máquina para navegar, gerar e validar código por convenção.

**Why P1**: É a fundação IA-first; o retrofit e todo componente novo dependem do schema.

**Acceptance Criteria**:

1. WHEN a convenção é definida THEN o repo SHALL conter schema documentado de `meta.json` (nome, descrição, props, variantes, tokens usados, exemplos, dos/don'ts, analytics: `analyticsDefault`/`supportedEvents`/`piiRisk`) e de `guardrails.json` (id, descrição, severidade, certo/errado)
2. WHEN o `guardrails.json` é escrito THEN ele SHALL conter a matriz tag nativa → primitivo (p/span/h\* → Typography; div/section/main/header/footer/nav/ul → VStack/HStack; button → Button; label → Label; input → Input) e as exceções permitidas (`a`, `img`, `li`, `svg`, `form`, `table`)
3. WHEN cada um dos 7 componentes existentes é retrofitado THEN ele SHALL ter pasta padrão completa: tsx + variants + test + stories + meta.json
4. WHEN `Grid` é criado THEN ele SHALL expor API `cols` (responsivo) + `gap`, aceitar template exótico via className, e cumprir a mesma definition of done
5. WHEN `Card` é criado THEN ele SHALL cobrir os usos atuais de Card no portfolio e cumprir a definition of done
6. WHEN qualquer componente é focado via teclado THEN ele SHALL exibir foco visível nos 3 temas (light, dark, ocean-sunset)
7. WHEN uma skill de scaffold é invocada no repo THEN ela SHALL gerar a pasta completa no padrão da convenção

**Independent Test**: `pnpm test` e Storybook local (`apps/docs`) renderizando os 9 componentes nos 3 temas; meta.json de todos validando contra o schema.

---

### P1: Publicação npm + fluxo de release ⭐ MVP

**User Story**: Como mantenedor, quero pacotes publicados no npm com release automatizado para que consumidores (portfolio, Vercel, `npx`) instalem sem `file:`.

**Why P1**: Sem publish não há migração do portfolio nem deploy.

**Acceptance Criteria**:

1. WHEN o primeiro publish manual roda THEN `@tfds/tokens`, `@tfds/icons` e `@tfds/react` SHALL estar instaláveis num projeto limpo via `npm install` (com `publishConfig.access: "public"`)
2. WHEN um PR com changeset mergeia em main THEN a GitHub Action SHALL abrir/atualizar o PR "Version Packages"
3. WHEN o PR "Version Packages" mergeia THEN a action SHALL publicar no npm e criar tags git
4. WHEN o repo é conectado na Vercel THEN o Storybook SHALL buildar e ficar acessível numa URL pública
5. WHEN o workflow roda THEN nenhum token/secret SHALL aparecer em código ou logs

**Independent Test**: `npm install @tfds/react` num diretório vazio resolve e importa `Button`; URL do Storybook responde 200.

---

### P1: Migração do portfolio ⭐ MVP

**User Story**: Como dono do portfolio, quero consumir `@tfds/*` do npm para poder deployar na Vercel.

**Why P1**: É o objetivo de negócio que motivou tudo (débito bloqueante documentado no CLAUDE.md do portfolio).

**Acceptance Criteria**:

1. WHEN o package.json do portfolio é atualizado THEN ele SHALL referenciar versões npm de `@tfds/*` (zero `file:`)
2. WHEN o CSS é ajustado THEN ele SHALL incluir `@source` apontando pro pacote do DS (Tailwind v4 gera as classes dos componentes)
3. WHEN `NODE_ENV=production npm run build` roda no portfolio THEN o build SHALL passar
4. WHEN o site renderiza THEN os 3 temas SHALL funcionar visualmente como antes da migração
5. WHEN o deploy na Vercel roda THEN ele SHALL completar sem estratégia especial de build

**Independent Test**: build verde local + preview deploy na Vercel renderizando os 3 temas.

---

### P2: Analytics do DS em produção

**User Story**: Como autor do DS, quero componentes emitindo eventos padronizados no portfolio em produção para demonstrar instrumentação nativa de DS (case real).

**Why P2**: Diferencial forte, mas não bloqueia deploy nem publicação.

**Acceptance Criteria**:

1. WHEN um componente com `analyticsDefault: on` dispara interação THEN o `@tfds/analytics` SHALL emitir evento com `event` (`component_display|click|change|view|error`), `component_name` (snake_case), `screen_name` (do Provider), `ds_version`
2. WHEN o componente está aninhado num componente-pai do DS THEN o evento SHALL incluir `parent_component` via context
3. WHEN `analyticsEnabled={false}` é passado THEN o componente SHALL NOT emitir eventos
4. WHEN não há `AnalyticsProvider` no tree THEN os componentes SHALL renderizar normalmente sem emitir (no-op silencioso)
5. WHEN o adapter `track()` lança erro THEN a UI SHALL NOT quebrar (erro engolido)
6. WHEN o portfolio roda em produção THEN eventos SHALL chegar no PostHog (free tier) via adapter de ~1 função
7. WHEN um componente tem `piiRisk` medium/high no meta.json THEN `analyticsCustomParams` SHALL ser a única via de dados extras (nunca conteúdo/value do componente)

**Independent Test**: portfolio em preview com PostHog de teste; interagir e ver eventos no dashboard.

---

### P3: MCP server `tfds-mcp`

**User Story**: Como dev usando IA, quero um MCP server do tf.ds para que agentes consultem componentes, tokens e guardrails sem abrir o repo.

**Why P3**: Coroa o case, mas depende de meta.json/tokens prontos e não bloqueia nada.

**Acceptance Criteria**:

1. WHEN `npx tfds-mcp` roda THEN o server SHALL iniciar via stdio seguindo o protocolo MCP (SDK oficial `@modelcontextprotocol/sdk`), com dados empacotados (funciona offline)
2. WHEN as tools são listadas THEN elas SHALL ser exatamente: `list_components`, `get_component`, `search_tokens`, `get_guardrails`, `get_examples`
3. WHEN `get_component` recebe nome inexistente THEN o server SHALL responder erro estruturado com sugestão dos nomes válidos
4. WHEN resources/prompts são listados THEN o server SHALL expor os meta.json e tokens como resources e ao menos 1 prompt de setup, conforme o padrão aberto MCP
5. WHEN os pacotes do DS têm versão nova THEN o `tfds-mcp` SHALL reportar de qual versão do DS seus dados vieram

**Independent Test**: conectar no Claude Code local e executar as 5 tools com sucesso.

---

## Edge Cases

- WHEN um alias de token aponta pra token deletado THEN o build de tokens SHALL falhar (não gerar saída parcial)
- WHEN o consumidor não configura `@source` THEN os componentes renderizam sem estilo — a doc de instalação SHALL tornar o passo explícito e o Storybook serve de referência visual
- WHEN dois eventos de analytics disparam na mesma interação (ex.: click que causa change) THEN cada um SHALL ser emitido separadamente com seu `event` correto
- WHEN o portfolio usa classe Tailwind de token que deixou de existir THEN o build do portfolio SHALL acusar (type-check/lint) — validado na migração
- WHEN `npm publish` roda com versão já publicada THEN o fluxo changesets SHALL impedir (bump obrigatório via changeset)

---

## Implicit-Requirement Dimensions (sweep)

| Dimension                     | Resolution                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Input validation & bounds     | Coberto: build de tokens valida DTCG/aliases (TOK-03); props TS strict                                             |
| Failure / partial-failure     | Coberto: build falha atômico (edge case 1); analytics no-op/engole erro (ANA-04/05); MCP erro estruturado (MCP-03) |
| Idempotency / retry           | N/A because: sem estado servidor; publish é idempotente por versão via changesets (edge case 5)                    |
| Auth boundaries & rate limits | Coberto: NPM_TOKEN só em secrets (PUB-05). Rate limit N/A because: sem API própria                                 |
| Concurrency / ordering        | N/A because: tooling de build e lib client-side sem estado compartilhado                                           |
| Data lifecycle / expiry       | Coberto: analytics fire-and-forget, retenção é do PostHog; PII controlado por `piiRisk` (ANA-07)                   |
| Observability                 | Coberto: analytics É a feature (P2); MCP loga em stderr conforme protocolo                                         |
| External-dependency failure   | Coberto: PostHog fora → no-op (ANA-05); npm registry fora → release manual re-executável                           |
| State-transition integrity    | N/A because: sem máquina de estados no escopo                                                                      |

---

## Requirement Traceability

| Requirement ID | Story                       | Phase  | Status  |
| -------------- | --------------------------- | ------ | ------- |
| TOK-01..05     | P1: Tokens                  | Design | Pending |
| CMP-01..07     | P1: Convenção + componentes | Design | Pending |
| PUB-01..05     | P1: Publicação + release    | Design | Pending |
| MIG-01..05     | P1: Migração do portfolio   | Design | Pending |
| ANA-01..07     | P2: Analytics               | -      | Pending |
| MCP-01..05     | P3: MCP server              | -      | Pending |

**Coverage:** 34 total, 0 mapped to tasks, 34 unmapped ⚠️ (pré-tasks)

---

## Success Criteria

- [ ] Portfolio no ar na Vercel consumindo `@tfds/*` do npm
- [ ] Storybook público renderizando 9 componentes nos 3 temas
- [ ] `npm install @tfds/react` funciona num projeto limpo
- [ ] Eventos de analytics visíveis no dashboard PostHog vindos de produção
- [ ] As 5 tools do `tfds-mcp` executáveis via `npx` no Claude Code

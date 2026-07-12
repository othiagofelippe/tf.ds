# tfds-v2 Validation — Phase 7 Priority Group (T28-T30, ANA-01..07)

**Date**: 2026-07-12
**Spec**: `.specs/features/tfds-v2/spec.md` (P2: Analytics do DS em produção)
**Scope**: This is a **priority-group validation**, not a full-feature validation. Only T28-T30 (Phase 7 analytics core + wiring) are in scope. T31 (PostHog adapter, checkpoint) and T32 (PostHog UAT), plus Phase 8 (MCP server), are pending/blocked and out of scope here.
**Diff range**: `5ddc891..1dbc881`
**Commits**: `bbd2c9e` (core types+emitter), `d4d2577` (provider/context/hook), `1dbc881` (wire into Button/Input)
**Verifier**: independent sub-agent (author ≠ verifier)

---

## Task Completion

| Task | Status  | Notes                                                                                                                                                              |
| ---- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T28  | ✅ Done | `packages/analytics/src/types.ts`, `core.ts` — event types, TrackAdapter, buildAnalyticsEvent, emitAnalyticsEvent with try/catch                                   |
| T29  | ✅ Done | `provider.tsx`, `context.ts`, `use-analytics.ts` — Provider + ParentComponentContext + hook, no-Provider no-op                                                     |
| T30  | ✅ Done | Button (click) and Input (change) wired; `analyticsEnabled`/`analyticsCustomParams`/`screenName` props added; all 9 meta.json files carry a real `analytics` block |

---

## Spec-Anchored Acceptance Criteria

### P2: Analytics do DS em produção

| Criterion (WHEN X THEN Y)                                                                                                                                                    | Spec-defined outcome                                                                                                                                                                                                                                                                                             | `file:line` + assertion expression                                                                                                                                                                                                                                                                                                                                                                           | Result                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| ANA-01: WHEN componente com `analyticsDefault: on` dispara interação THEN emite evento com `event`, `component_name` (snake_case), `screen_name` (do Provider), `ds_version` | `event ∈ {component_display,component_click,component_change,component_view,component_error}` (per design.md:75-79, which resolves spec.md's ambiguous `click\|change\|view\|error` phrasing to the `component_*`-prefixed form), `component_name` snake_case, `screen_name` from Provider, `ds_version` present | `packages/react/src/components/button/button.test.tsx:101-116` — `expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ event: "component_click", component_name: "button", screen_name: "home" }))`; `packages/react/src/components/input/input.test.tsx:72-87` — analogous for `component_change`/`input`; `packages/analytics/src/core.test.ts:6-17` — asserts `ds_version` equals `pkg.version` | ✅ PASS                               |
| ANA-02: WHEN componente aninhado num componente-pai do DS THEN evento inclui `parent_component` via context                                                                  | `parent_component` field equals the nearest `ParentComponentContext` value                                                                                                                                                                                                                                       | `packages/analytics/src/use-analytics.test.tsx:35-48` — `expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ parent_component: "card" }))`; absence case at `use-analytics.test.tsx:50-62` and `core.test.ts:34-42`                                                                                                                                                                               | ✅ PASS                               |
| ANA-03: WHEN `analyticsEnabled={false}` THEN componente NOT emite eventos                                                                                                    | Zero adapter calls                                                                                                                                                                                                                                                                                               | `button.test.tsx:118-127` — `expect(adapter).not.toHaveBeenCalled()`; `input.test.tsx:89-98` — same                                                                                                                                                                                                                                                                                                          | ✅ PASS                               |
| ANA-04: WHEN não há `AnalyticsProvider` no tree THEN componentes renderizam normalmente sem emitir (no-op silencioso)                                                        | Component renders, no throw, no emission                                                                                                                                                                                                                                                                         | `use-analytics.test.tsx:82-87` — renders + `userEvent.click` resolves without throw; `button.test.tsx:151-156` — `onClick` still fires normally (`handleClick` called), no adapter to assert against since none is passed; `input.test.tsx:136-141` — analogous                                                                                                                                              | ✅ PASS                               |
| ANA-05: WHEN adapter `track()` lança erro THEN UI NOT quebra (erro engolido)                                                                                                 | No throw propagates from emit path; adapter still invoked once                                                                                                                                                                                                                                                   | `core.test.ts:76-85` — `expect(() => emitAnalyticsEvent(adapter, event)).not.toThrow()` + `expect(adapter).toHaveBeenCalledTimes(1)`                                                                                                                                                                                                                                                                         | ✅ PASS                               |
| ANA-06: WHEN portfolio roda em produção THEN eventos chegam no PostHog via adapter de ~1 função                                                                              | Requires PostHog adapter (T31) + preview UAT (T32)                                                                                                                                                                                                                                                               | — (T31/T32 pending; out of scope for this priority group per tasks.md checkpoint gating)                                                                                                                                                                                                                                                                                                                     | ⏳ Out of scope (deferred to T31/T32) |
| ANA-07: WHEN componente tem `piiRisk` medium/high THEN `analyticsCustomParams` é a única via de dados extras (nunca conteúdo/value do componente)                            | Emitted event never contains the raw field value; only explicit `analyticsCustomParams`                                                                                                                                                                                                                          | `packages/react/src/components/input/meta.json:95` — `piiRisk: "medium"`; `input.test.tsx:122-134` — types `"secret"` into the field, asserts `expect(calledWith).not.toHaveProperty("value")`                                                                                                                                                                                                               | ✅ PASS                               |
| Edge case — eventos duplos: WHEN dois eventos disparam na mesma interação THEN cada um é emitido separadamente com seu `event` correto                                       | Two `adapter` calls, each with its own distinct `event` value, in order                                                                                                                                                                                                                                          | `core.test.ts:87-112` — `expect(adapter).toHaveBeenCalledTimes(2)` + `toHaveBeenNthCalledWith(1, ...component_click)` / `toHaveBeenNthCalledWith(2, ...component_change)`                                                                                                                                                                                                                                    | ✅ PASS                               |

**Status**: ✅ All in-scope ACs (ANA-01..05, 07 + edge case) covered with spec-anchored assertions. ANA-06 is legitimately out of scope for this priority group (gated behind T31 user checkpoint).

**Spec-precision note (not a gap)**: spec.md:129 literally reads `event` (`component_display|click|change|view|error`) — read strictly this implies bare values `click`/`change`/`view`/`error` without the `component_` prefix. `design.md:75-79` disambiguates in favor of the `component_*`-prefixed form, which is what's implemented and tested. Flagging for spec.md wording cleanup, not a code gap.

---

## Documented Assumptions Review

| Assumption                                                                             | Verifier assessment                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ds_version` sourced from `@tfds/analytics`'s own `package.json` (not `@tfds/react`'s) | Reasonable and verified: `packages/analytics/src/core.ts:1,4` imports `../package.json` (analytics' own), test confirms at `core.test.ts:19-21`. Since `@tfds/analytics` is the emitting package and versions independently via changesets, this is the more defensible choice over `@tfds/react`'s version — no objection. |
| `TrackAdapter` is a plain function, not `{ track() }` object                           | Reasonable — matches spec's "~1 função" framing for the PostHog adapter (ANA-06) and keeps the interface minimal (YAGNI). No objection.                                                                                                                                                                                     |
| Badge/Label/Typography left `analyticsDefault: "off"` (not wired)                      | Confirmed unchanged in this diff — `badge/meta.json:63`, `label/meta.json:59`, `typography/meta.json:117` all still `"off"`. Correctly scoped to T30 (Button/Input only).                                                                                                                                                   |
| Card/Grid/HStack/VStack changed to `analyticsDefault: "excluded"`                      | Confirmed via diff; `"excluded"` is a valid enum value per `docs/schemas/component-meta.schema.json:92` (`enum: ["on","off","excluded"]`). Semantically distinct from `"off"` (never applicable vs. currently disabled) — reasonable modeling for layout primitives. No objection.                                          |
| `screenName` prop added to Button/Input as per-component Provider override             | Matches T30's explicit task description ("prop analyticsEnabled/analyticsCustomParams/screenName"). Tested at `button.test.tsx:140-149`, `input.test.tsx:111-120`. No objection.                                                                                                                                            |

---

## Discrimination Sensor

All mutations applied directly to the working tree (no separate scratch state was needed — repo was clean before/after each mutation) and reverted with `git checkout --` immediately after each run; `git status --porcelain` confirmed clean before and after the full sequence.

| Mutation | File:line                                            | Description                                                                                                                                                     | Killed?                                                               |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1        | `packages/analytics/src/core.ts:26`                  | Flipped `if (!adapter) return` → `if (adapter) return` (inverts the early-return guard, so `emitAnalyticsEvent` becomes a no-op whenever an adapter IS present) | ✅ Killed — 7/14 analytics tests failed                               |
| 2        | `packages/react/src/components/button/button.tsx:42` | Flipped `if (analyticsEnabled)` → `if (!analyticsEnabled)`                                                                                                      | ✅ Killed — 4/9 button test cases failed (analytics describe block)   |
| 3        | `packages/analytics/src/use-analytics.ts:28`         | Removed the `...(parentComponent !== undefined ? { parentComponent } : {})` spread, dropping `parent_component` from the built event                            | ✅ Killed — 1/14 analytics tests failed (`use-analytics.test.tsx:35`) |

**Sensor depth**: lightweight (default tier, 3 targeted mutations)
**Result**: 3/3 killed — PASS ✅

---

## Code Quality

| Principle                                                                    | Status                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum code                                                                 | ✅ — `packages/analytics` is a lean 5-file package (types, core, context, provider, hook); no speculative abstractions                                                                                                                                                 |
| Surgical changes                                                             | ✅ — Button/Input touch only what's needed to wire analytics (prop additions + `handleClick`/`handleChange` wrappers); no unrelated refactors                                                                                                                          |
| No scope creep                                                               | ✅ — Badge/Label/Typography deliberately left untouched; Card/Grid/HStack/VStack only get the `excluded` meta.json flip, no component-level wiring (matches "layout primitives never emit")                                                                            |
| Matches patterns                                                             | ✅ — Both components follow `.claude/rules/components.md`: `forwardRef`, `interface` props, named exports, `displayName`, no `className` escape hatch                                                                                                                  |
| Spec-anchored outcome check (asserted values match spec)                     | ✅ — see AC table above; every assertion targets the exact spec-defined field/value                                                                                                                                                                                    |
| Per-layer Coverage Expectation met (domain 1:1 ACs; routes happy+edge+error) | ✅ — Test Coverage Matrix requires "1:1 com ANA-01..05,07 + edge case eventos duplos" for `@tfds/analytics`; all satisfied. Button/Input analytics describe blocks cover happy (emit), disabled (analyticsEnabled=false), no-Provider, and override (screenName) paths |
| Every test maps to a spec requirement — no unclaimed tests                   | ✅ — spot-checked all `describe("analytics")` blocks in button.test.tsx/input.test.tsx and all of core.test.ts/use-analytics.test.tsx; every `it()` traces to an ANA-0x AC or the eventos-duplos edge case                                                             |
| Documented guidelines followed                                               | `.claude/rules/components.md` (forwardRef, interface props, cn from lib, no asChild) — followed; CLAUDE.md TS strict / no `any` / no `!` — followed (verified via `tsc --noEmit` clean on both packages)                                                               |

One minor observation (not a gap): `buildAnalyticsEvent` in `core.ts:14-23` spreads `customParams` _before_ the core fields, so a malicious/careless `analyticsCustomParams` cannot override `event`/`component_name`/`screen_name`/`ds_version` — this is tested (`core.test.ts:44-54`) and is a correct, deliberate ordering choice, not an issue.

---

## Edge Cases

- [x] Eventos duplos (click causing change, each with correct own `event`): Handled — `core.test.ts:87-112`

---

## Gate Check

- **Gate command**: `pnpm --filter @tfds/analytics test` and `pnpm --filter @tfds/react test` (Quick gate per Test Coverage Matrix); `pnpm --filter @tfds/analytics type-check` and `pnpm --filter @tfds/react type-check` additionally run
- **Result**:
  - `@tfds/analytics test`: 2 files, 14 passed, 0 failed
  - `@tfds/react test`: 9 files, 130 passed, 0 failed
  - `@tfds/analytics type-check`: clean (0 errors)
  - `@tfds/react type-check`: clean (0 errors)
- **Test count before feature** (at `5ddc891`): `@tfds/analytics` package did not exist (0 tests); `@tfds/react` — button.test.tsx and input.test.tsx did not yet have analytics describe blocks (component test counts lower, exact pre-feature baseline not separately re-run since this is additive-only new-package + new-describe-block work, confirmed via diff stat: +60 lines button.test.tsx, +76 lines input.test.tsx, both purely additive)
- **Test count after feature**: `@tfds/analytics` 14 new; `@tfds/react` total 130 (includes 5 new analytics tests in button.test.tsx + 6 new in input.test.tsx)
- **Delta**: +14 (`@tfds/analytics`), +11 (`@tfds/react` analytics-specific, within the 130 total)
- **Skipped tests**: none
- **Failures**: none
- **Known pre-existing failure** (out of scope, per `.specs/STATE.md`): `@tfds/icons type-check` fails due to missing `@types/node` in a script file. Not touched by this diff, not re-verified here (explicitly excluded by task brief).

---

## Meta.json Schema Conformance (9 files, by inspection against `docs/schemas/component-meta.schema.json`)

| Component  | analyticsDefault | supportedEvents         | piiRisk  | Valid?         |
| ---------- | ---------------- | ----------------------- | -------- | -------------- |
| Button     | `on`             | `["component_click"]`   | `low`    | ✅             |
| Input      | `on`             | `["component_change"]`  | `medium` | ✅             |
| Badge      | `off`            | `["component_display"]` | `low`    | ✅ (unchanged) |
| Label      | `off`            | `["component_display"]` | `low`    | ✅ (unchanged) |
| Typography | `off`            | `["component_display"]` | `low`    | ✅ (unchanged) |
| Card       | `excluded`       | `[]`                    | `low`    | ✅             |
| Grid       | `excluded`       | `[]`                    | `low`    | ✅             |
| HStack     | `excluded`       | `[]`                    | `low`    | ✅             |
| VStack     | `excluded`       | `[]`                    | `low`    | ✅             |

All `analyticsDefault` values are within the schema's `["on","off","excluded"]` enum; all `supportedEvents` entries are within the schema's 5-value `component_*` enum; `analytics` object has all 3 required properties (`analyticsDefault`, `supportedEvents`, `piiRisk`) with `additionalProperties: false` respected (no stray keys observed).

---

## Fix Plans

None — no gaps found in scope.

---

## Requirement Traceability Update

| Requirement | Previous Status | New Status                              |
| ----------- | --------------- | --------------------------------------- |
| ANA-01      | Pending         | ✅ Verified                             |
| ANA-02      | Pending         | ✅ Verified                             |
| ANA-03      | Pending         | ✅ Verified                             |
| ANA-04      | Pending         | ✅ Verified                             |
| ANA-05      | Pending         | ✅ Verified                             |
| ANA-06      | Pending         | ⏳ Deferred (T31/T32, checkpoint-gated) |
| ANA-07      | Pending         | ✅ Verified                             |

---

## Summary

**Overall**: ✅ Ready (for the T28-T30 priority group; ANA-06/T31/T32 and Phase 8 remain outstanding by design)

**Spec-anchored check**: 6/6 in-scope ACs matched spec outcome (ANA-01..05, 07), 1 legitimately out of scope (ANA-06), 0 spec-precision gaps (the `component_*` naming ambiguity in spec.md was resolved by cross-checking design.md, not left as a gap)
**Sensor**: 3/3 mutations killed
**Gate**: 144 tests passed (14 analytics + 130 react), 0 failed, type-check clean on both packages

**What works**: Core event assembly + emission with error swallowing (T28); Provider/context/hook with correct no-Provider no-op and parent-nesting propagation (T29); Button/Input wired with `analyticsEnabled`/`analyticsCustomParams`/`screenName`, all 9 meta.json files schema-conformant with correct `on`/`off`/`excluded` semantics (T30).

**Issues found**: None.

**Next steps**: Proceed to T31 (PostHog adapter in portfolio) — user checkpoint required (PostHog account) — then T32 (preview UAT) to close out ANA-06 and the full P2 story.

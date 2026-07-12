# Schemas

## `component-meta.schema.json`

JSON Schema for each component's `meta.json` — the single source of registry consumed by Storybook, `tfds-mcp`, and coding agents. Every component under `packages/react/src/components/*/meta.json` must validate against it.

Fields mirror the `ComponentMeta` interface defined in `.specs/features/tfds-v2/design.md`. The `analytics` block (`analyticsDefault`, `supportedEvents`, `piiRisk`) drives automatic event instrumentation per AD-006.

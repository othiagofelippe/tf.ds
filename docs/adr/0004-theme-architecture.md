# ADR-0004: Theme Architecture

- **Status:** accepted
- **Date:** 2026-05-03
- **Author:** Thiago Felippe

## Context

tf.ds needs to support multiple visual contexts: a default theme with light/dark modes and a fixed "Ocean" theme with its own personality.

## Decision

Three CSS class-based themes applied to `<html>`:

- **`:root`** — light mode (default)
- **`.dark`** — dark mode (same brand, inverted surfaces)
- **`.ocean`** — fixed theme, deep teal + coral, always dark in nature

Light and dark share the same semantic token names but different values. Ocean is fully independent — it does not inherit from light or dark.

All themes use **OKLCH** color space for perceptually uniform color manipulation.

## Consequences

- Switching theme = adding/removing a class on `<html>` — no JavaScript required
- Ocean can coexist with dark/light without conflict because it overrides all semantic tokens
- OKLCH enables consistent chroma across the lightness scale, improving accessibility compliance

## Alternatives Considered

- **CSS `prefers-color-scheme` only** — no user control, no Ocean theme support
- **CSS-in-JS theming** — runtime overhead, not compatible with Server Components
- **data-theme attribute** — equivalent to class, but less common in the ecosystem

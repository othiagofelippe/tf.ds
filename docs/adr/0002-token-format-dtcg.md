# ADR-0002: W3C DTCG Token Format

- **Status:** accepted
- **Date:** 2026-05-03
- **Author:** Thiago Felippe

## Context

We need a format for design tokens that is vendor-neutral, tool-agnostic, and future-proof. Style Dictionary supports multiple formats.

## Decision

Use the **W3C Design Tokens Community Group (DTCG)** format (`$value`, `$type`, `$description`) as the source of truth for all tokens.

The DTCG specification reached its first stable version in October 2025, with backing from Adobe, Google, Figma, Salesforce, Shopify, and Microsoft.

## Consequences

- Tokens are interoperable with Figma Variables, Tokens Studio, and any DTCG-compatible tool
- Style Dictionary v4 has first-class DTCG support via `usesDtcg: true`
- Future Figma integration will be seamless

## Alternatives Considered

- **Style Dictionary legacy format** — proprietary, not interoperable with other tools
- **Manual CSS variables** — no tooling, no validation, hard to maintain at scale

---
name: tf.ds
version: 0.0.1
tokens:
  color:
    themes:
      - name: light
        selector: ":root"
      - name: dark
        selector: ".dark"
      - name: ocean
        selector: ".ocean"
        description: "Fixed deep-teal + coral theme, independent of light/dark"
    semantic:
      text:
        primary: "High contrast text, headings"
        secondary: "Supporting text, labels"
        tertiary: "Placeholder, hints"
        disabled: "Disabled state"
        inverse: "Text on dark backgrounds"
        onBrand: "Text on brand-colored surfaces"
      bg:
        page: "Page background"
        default: "Default surface"
        subtle: "Slightly elevated surface"
        muted: "Muted background, empty states"
      action:
        primary: "Primary CTA — buttons, links"
        primaryHover: "Hover state for primary actions"
      feedback:
        success: "Positive feedback"
        error: "Error, destructive actions"
        warning: "Caution, alerts"
  typography:
    families:
      sans: "Roboto — body text, UI labels"
      display: "Poppins — headings, display text"
      mono: "Roboto Mono — code, technical data"
    scale: "xs(12px) sm(14px) md(16px) lg(18px) xl(20px) 2xl(24px) 3xl(30px) 4xl(36px) 5xl(48px)"
  spacing:
    base: 4
    unit: "px"
    scale: "0.5(2px) 1(4px) 2(8px) 3(12px) 4(16px) 6(24px) 8(32px) 12(48px) 16(64px)"
  radius:
    scale: "none(0) xs(4px) sm(8px) md(12px) lg(16px) xl(28px) full(9999px)"
---

## Design Philosophy

tf.ds is an opinionated design system. Consumers use declared APIs — the system enforces consistency by not exposing arbitrary escape hatches. This mirrors how enterprise design systems (Livelo, iFood, Nubank) maintain visual consistency at scale.

## Color System

Colors use OKLCH for perceptually uniform lightness and consistent chroma across the scale. This improves WCAG AA contrast reliability compared to sRGB hex values.

Three themes are available:

- **light** and **dark** share the same semantic token names, differ only in values
- **ocean** is fully independent — deep teal backgrounds with coral as the brand action color

## Component Guidelines

Every component exposes a `variant` prop (`primary | secondary | outline | ghost | destructive | link`) and a `size` prop (`sm | md | lg | icon`). Boolean props `disabled` and `loading` control interactive states.

Components do not accept arbitrary `className` overrides. Use semantic tokens via CSS variables for any customization.

## Accessibility

All components target WCAG AA as the minimum. Keyboard navigation, focus management, and ARIA attributes are handled by Radix UI primitives. AAA compliance is targeted where the theme allows without compromising visual identity.

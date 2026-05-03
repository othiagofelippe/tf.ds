# tf.ds

A professional, opinionated design system by [Thiago Felippe](https://github.com/thiagofelippe).

## Packages

| Package | Description | Version |
|---|---|---|
| [`@tfds/tokens`](./packages/tokens) | Design tokens (W3C DTCG format) | ![npm](https://img.shields.io/npm/v/@tfds/tokens) |
| [`@tfds/components`](./packages/components) | React components | ![npm](https://img.shields.io/npm/v/@tfds/components) |

## Getting Started

```bash
npm install @tfds/tokens @tfds/components
```

```tsx
// 1. Import tokens CSS (includes all themes)
import "@tfds/tokens/css"

// 2. Use components
import { Button } from "@tfds/components"

export function App() {
  return <Button variant="primary">Hello tf.ds</Button>
}
```

## Themes

tf.ds ships with three themes:

- **light** — default, light mode with accent support
- **dark** — dark mode with accent support
- **ocean** — fixed deep-teal + coral theme

Apply by setting the class on `<html>`:

```html
<html class="dark">   <!-- dark mode -->
<html class="ocean">  <!-- ocean theme -->
```

## Documentation

- [Storybook](https://tfds.vercel.app) — component playground
- [ADRs](./docs/adr) — architecture decisions
- [RFCs](./docs/rfc) — proposals
- [Contributing](./CONTRIBUTING.md) — how to contribute

## License

MIT © [Thiago Felippe](https://github.com/thiagofelippe)
